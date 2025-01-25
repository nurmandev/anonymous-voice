import { EventEmitter } from "events";
import { Socket } from "socket.io-client";
import { MediaConfig } from "./types";

const CONNECTION_TIMEOUT = 30000; // 30 seconds

export class RoomManager extends EventEmitter {
  private pc: RTCPeerConnection;
  private localStream: MediaStream | null = null;
  private connectionTimer: NodeJS.Timeout | null = null;

  constructor(
    private socket: Socket,
    private roomId: string,
    private config: RTCConfiguration,
  ) {
    super();
    this.pc = this.createPeerConnection();
    this.setupPeerEvents();
    this.setupSignaling();
  }

  private createPeerConnection(): RTCPeerConnection {
    const pc = new RTCPeerConnection(this.config);

    // Connection state monitoring
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed") {
        this.emit("error", new Error("Connection failed"));
        this.reconnect();
      }
    };

    return pc;
  }

  private async reconnect() {
    try {
      this.pc.close();
      this.pc = this.createPeerConnection();
      this.setupPeerEvents();

      // Re-add tracks if we have a local stream
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => {
          if (this.localStream) {
            this.pc.addTrack(track, this.localStream);
          }
        });
      }

      this.emit("reconnecting");
      await this.join({ video: true, audio: true }, true);
      this.emit("reconnected");
    } catch (error) {
      console.log(error);
      this.emit("error", new Error("Reconnection failed"));
    }
  }

  private setupPeerEvents() {
    this.pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.socket.emit("webrtc:ice-candidate", {
          roomId: this.roomId,
          candidate,
        });
      }
    };

    this.pc.ontrack = ({ streams }) => {
      if (streams?.[0]) {
        this.emit("remoteStream", streams[0]);
      }
    };

    // Monitor ICE connection state
    this.pc.oniceconnectionstatechange = () => {
      if (this.pc.iceConnectionState === "failed") {
        this.emit("error", new Error("ICE connection failed"));
      }
    };
  }

  private setupSignaling() {
    this.socket.on("webrtc:offer", async ({ offer }) => {
      try {
        await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        this.socket.emit("webrtc:answer", { roomId: this.roomId, answer });
      } catch (error) {
        console.log(error);
        this.emit("error", new Error("Failed to process offer"));
      }
    });

    this.socket.on("webrtc:answer", async ({ answer }) => {
      try {
        await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.log(error);
        this.emit("error", new Error("Failed to process answer"));
      }
    });

    this.socket.on("webrtc:ice-candidate", async ({ candidate }) => {
      try {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.log(error);
        this.emit("error", new Error("Failed to add ICE candidate"));
      }
    });

    this.socket.on("room:joined", () => {
      this.clearConnectionTimeout();
      this.emit("roomJoined");
    });

    this.socket.on("room:user_left", () => {
      this.emit("userLeft");
    });
  }

  private setConnectionTimeout() {
    this.connectionTimer = setTimeout(() => {
      this.emit("error", new Error("Connection timeout"));
      this.leave();
    }, CONNECTION_TIMEOUT);
  }

  private clearConnectionTimeout() {
    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
      this.connectionTimer = null;
    }
  }

  async join(mediaConfig: MediaConfig, isCaller: boolean) {
    try {
      // Stop any existing streams
      await this.stopExistingStream();

      // Get user media
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: mediaConfig.audio,
        video: mediaConfig.video,
      });

      // Add tracks to peer connection
      this.localStream.getTracks().forEach((track) => {
        if (this.localStream) {
          this.pc.addTrack(track, this.localStream);
        }
      });

      // Set connection timeout
      this.setConnectionTimeout();

      // Join room
      this.socket.emit("room:join", { roomId: this.roomId });

      // If caller, create and send offer
      if (isCaller) {
        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer);
        this.socket.emit("webrtc:offer", { roomId: this.roomId, offer });
      }

      return this.localStream;
    } catch (error) {
      console.log(error);
      this.emit(
        "error",
        error instanceof Error ? error : new Error("Join failed"),
      );
      throw error;
    }
  }

  private async stopExistingStream() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
  }

  async createAnswer() {
    try {
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      this.socket.emit("webrtc:answer", { roomId: this.roomId, answer });
    } catch (error) {
      console.log(error);
      this.emit("error", new Error("Failed to create answer"));
      throw error;
    }
  }

  toggleAudio(enabled: boolean) {
    this.localStream?.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });
  }

  toggleVideo(enabled: boolean) {
    this.localStream?.getVideoTracks().forEach((track) => {
      track.enabled = enabled;
    });
  }

  leave() {
    this.clearConnectionTimeout();
    this.stopExistingStream();
    this.pc.close();
    this.socket.emit("room:leave", { roomId: this.roomId });
    this.removeAllListeners();
  }
}
