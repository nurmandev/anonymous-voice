import { EventEmitter } from "events";

export class RTCPeerManager extends EventEmitter {
  private pc: RTCPeerConnection | null = null;
  private connectionTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 3;

  constructor(private config: RTCConfiguration) {
    super();
  }

  async initialize() {
    this.cleanup(); // Cleanup any existing connection
    this.pc = new RTCPeerConnection(this.config);
    this.setupPeerEvents();
    return this.pc;
  }

  private setupPeerEvents() {
    if (!this.pc) return;

    this.pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.emit("iceCandidate", candidate);
      }
    };

    this.pc.ontrack = ({ streams }) => {
      if (streams?.[0]) {
        this.emit("track", streams[0]);
      }
    };

    this.pc.oniceconnectionstatechange = () => {
      this.handleConnectionStateChange();
    };

    this.pc.onnegotiationneeded = async () => {
      try {
        await this.handleNegotiationNeeded();
      } catch (error) {
        console.error("Negotiation failed:", error);
        this.emit("error", new Error("Negotiation failed"));
      }
    };

    // Monitor connection state
    this.pc.onconnectionstatechange = () => {
      this.handleConnectionStateChange();
    };
  }

  private async handleNegotiationNeeded() {
    if (!this.pc) return;

    try {
      const offer = await this.pc.createOffer();
      if (this.pc.signalingState !== "stable") return;

      await this.pc.setLocalDescription(offer);
      this.emit("negotiationNeeded", offer);
    } catch (error) {
      console.error("Negotiation failed:", error);
      this.emit("error", new Error("Negotiation failed"));
    }
  }

  private handleConnectionStateChange() {
    if (!this.pc) return;

    const state = this.pc.connectionState;
    this.emit("connectionState", state);

    switch (state) {
      case "connected":
        this.clearConnectionTimeout();
        this.reconnectAttempts = 0;
        break;
      case "failed":
        this.handleConnectionFailure();
        break;
      case "disconnected":
        this.startReconnectTimer();
        break;
    }
  }

  private startReconnectTimer() {
    this.connectionTimeout = setTimeout(() => {
      this.handleConnectionFailure();
    }, 10000); // 10 seconds timeout
  }

  private clearConnectionTimeout() {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
  }

  private async handleConnectionFailure() {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      this.emit("error", new Error("Connection failed after maximum attempts"));
      return;
    }

    this.reconnectAttempts++;
    try {
      await this.initialize();
      this.emit("reconnecting", this.reconnectAttempts);
    } catch (error) {
      console.error("Negotiation failed:", error);
      this.emit("error", new Error("Reconnection failed"));
    }
  }

  async addTracks(stream: MediaStream) {
    if (!this.pc) return;

    // Remove existing tracks
    const senders = this.pc.getSenders();
    senders.forEach((sender) => this.pc?.removeTrack(sender));

    // Add new tracks
    stream.getTracks().forEach((track) => {
      this.pc?.addTrack(track, stream);
    });
  }

  async createOffer() {
    if (!this.pc) return null;

    try {
      const offer = await this.pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        iceRestart: true,
      });
      await this.pc.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Negotiation failed:", error);
      this.emit("error", new Error("Failed to create offer"));
      return null;
    }
  }

  async createAnswer() {
    if (!this.pc) return null;

    try {
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Negotiation failed:", error);
      this.emit("error", new Error("Failed to create answer"));
      return null;
    }
  }

  async handleOffer(offer: RTCSessionDescriptionInit) {
    if (!this.pc) return null;

    try {
      if (this.pc.signalingState !== "stable") {
        await Promise.all([
          this.pc.setLocalDescription({ type: "rollback" }),
          this.pc.setRemoteDescription(new RTCSessionDescription(offer)),
        ]);
      } else {
        await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
      }

      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Negotiation failed:", error);
      this.emit("error", new Error("Failed to handle offer"));
      return null;
    }
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.pc) return;

    try {
      await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Negotiation failed:", error);
      this.emit("error", new Error("Failed to handle answer"));
    }
  }

  async addIceCandidate(candidate: RTCIceCandidateInit) {
    if (!this.pc) return;

    try {
      await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Negotiation failed:", error);
      // Only emit error if we're not in the middle of an offer/answer exchange
      if (this.pc.remoteDescription && this.pc.localDescription) {
        this.emit("error", new Error("Failed to add ICE candidate"));
      }
    }
  }

  cleanup() {
    this.clearConnectionTimeout();
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    this.removeAllListeners();
  }
}
