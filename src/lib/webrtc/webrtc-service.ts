import { Socket } from "socket.io-client";
import { ICE_SERVERS, SOCKET_EVENTS } from "./constants";
import { WebRTCConfig } from "./types";

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private readonly socket: Socket;
  private readonly onRemoteStream?: (stream: MediaStream) => void;
  private readonly onError?: (error: Error) => void;

  constructor(config: WebRTCConfig) {
    this.socket = config.socket;
    this.onRemoteStream = config.onRemoteStream;
    this.onError = config.onError;
    this.setupPeerConnection();
  }

  private setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit(SOCKET_EVENTS.WEBRTC_ICE, {
          candidate: event.candidate,
        });
      }
    };

    this.peerConnection.ontrack = (event) => {
      if (event.streams[0] && this.onRemoteStream) {
        this.onRemoteStream(event.streams[0]);
      }
    };
  }

  async startCall(targetUserId: string) {
    try {
      await this.initializeLocalStream();
      const offer = await this.peerConnection!.createOffer();
      await this.peerConnection!.setLocalDescription(offer);

      this.socket.emit(SOCKET_EVENTS.WEBRTC_OFFER, {
        offer,
        targetUserId,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private async initializeLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    console.error("WebRTC Error:", error);
    if (this.onError) {
      this.onError(error instanceof Error ? error : new Error(String(error)));
    }
  }

  endCall() {
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnection?.close();
    this.peerConnection = null;
    this.localStream = null;
  }
}
