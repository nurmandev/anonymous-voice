import { Socket } from "socket.io-client";
import { MediaService } from "./media.service";

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 3;
  private readonly RESTART_ICE_TIMEOUT = 5000;
  private statsInterval: NodeJS.Timeout | null = null;

  private readonly configuration: RTCConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
    iceTransportPolicy: "all",
    iceCandidatePoolSize: 10,
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require",
  };

  async initializeConnection(socket: Socket) {
    if (!socket) {
      throw new Error("Socket connection is required");
    }

    // Check if mediaDevices API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Media devices not supported in this browser");
    }

    if (this.peerConnection) {
      await this.cleanup();
    }

    this.peerConnection = new RTCPeerConnection(this.configuration);

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 640, ideal: 1280 },
          height: { min: 480, ideal: 720 },
        },
        audio: true,
      });

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });

      return this.localStream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      if (error instanceof DOMException) {
        if (error.name === "NotFoundError") {
          throw new Error(
            "No camera or microphone found. Please check your device connections.",
          );
        } else if (error.name === "NotAllowedError") {
          throw new Error(
            "Camera and microphone access denied. Please enable access in your browser settings.",
          );
        } else {
          throw new Error(`Error accessing media devices: ${error.message}`);
        }
      } else {
        throw new Error(
          "An unexpected error occurred while accessing media devices.",
        );
      }
    }
  }

  async initialize(
    socket: Socket,
    videoEnabled: boolean = true,
  ): Promise<MediaStream> {
    this.socket = socket;
    await this.setupPeerConnection();

    try {
      this.localStream = await MediaService.getMediaStream(videoEnabled);
      this.addLocalStreamTracks();
      return this.localStream;
    } catch (error) {
      this.cleanup();
      throw error;
    }
  }

  private async setupPeerConnection() {
    if (this.peerConnection) {
      await this.cleanup();
    }

    this.peerConnection = new RTCPeerConnection(this.configuration);

    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate && this.socket?.connected) {
        this.socket.emit("webrtc:ice-candidate", { candidate });
      }
    };

    this.peerConnection.ontrack = ({ streams: [stream] }) => {
      if (stream) {
        this.remoteStream = stream;
      }
    };

    this.setupICEHandling();
  }

  private setupICEHandling() {
    if (!this.peerConnection) return;

    this.peerConnection.oniceconnectionstatechange = async () => {
      const state = this.peerConnection?.iceConnectionState;

      switch (state) {
        case "failed":
          if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
            this.reconnectAttempts++;
            await this.restartICE();
          }
          break;
        case "connected":
        case "completed":
          this.reconnectAttempts = 0;
          break;
        case "disconnected":
          await this.handleDisconnection();
          break;
      }
    };
  }

  private async restartICE() {
    if (!this.peerConnection) return;

    try {
      const offer = await this.peerConnection.createOffer({ iceRestart: true });
      await this.peerConnection.setLocalDescription(offer);
      this.socket?.emit("webrtc:offer", { offer });
    } catch (error) {
      console.error("ICE restart failed:", error);
      throw new Error("Failed to restart ICE connection");
    }
  }

  private setupConnectionStateHandling() {
    if (!this.peerConnection) return;

    this.peerConnection.onconnectionstatechange = () => {
      switch (this.peerConnection?.connectionState) {
        case "failed":
          this.emit("connection:failed");
          break;
        case "disconnected":
          this.emit("connection:disconnected");
          break;
        case "connected":
          this.emit("connection:connected");
          break;
      }
    };
  }

  private emit(event: string, data?: unknown) {
    this.socket?.emit(event, data);
  }

  private async handleDisconnection() {
    if (this.peerConnection?.iceConnectionState === "disconnected") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (this.peerConnection?.iceConnectionState === "disconnected") {
        await this.restartICE();
      }
    }
  }

  private addLocalStreamTracks() {
    if (!this.peerConnection || !this.localStream) return;

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, this.localStream!);
    });
  }

  async createOffer(): Promise<RTCSessionDescriptionInit | null> {
    if (!this.peerConnection) return null;

    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.peerConnection) return;

    try {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    } catch (error) {
      console.error("Error handling answer:", error);
      throw error;
    }
  }

  async handleOffer(
    offer: RTCSessionDescriptionInit,
  ): Promise<RTCSessionDescriptionInit | null> {
    if (!this.peerConnection) return null;

    try {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Error handling offer:", error);
      throw error;
    }
  }

  async handleIceCandidate(candidate: RTCIceCandidateInit) {
    if (!this.peerConnection) return;

    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
      throw error;
    }
  }

  async cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        track.stop();
        this.localStream?.removeTrack(track);
      });
      this.localStream = null;
    }

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((track) => {
        track.stop();
        this.remoteStream?.removeTrack(track);
      });
      this.remoteStream = null;
    }

    if (this.peerConnection) {
      this.peerConnection.ontrack = null;
      this.peerConnection.onicecandidate = null;
      this.peerConnection.oniceconnectionstatechange = null;
      this.peerConnection.onconnectionstatechange = null;
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }

    this.reconnectAttempts = 0;
    this.socket = null;
  }

  getLocalStream() {
    return this.localStream;
  }

  getRemoteStream() {
    return this.remoteStream;
  }
}

export const webRTCService = new WebRTCService();
