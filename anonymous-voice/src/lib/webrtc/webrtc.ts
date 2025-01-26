import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "./socket";

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private socket: Socket;
  private remoteUserId: string | null = null;

  constructor(socket: Socket) {
    this.socket = socket;
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    // Listen for WebRTC signaling events
    this.socket.on(SOCKET_EVENTS.OFFER, async ({ offer, from }) => {
      console.log("Received offer from:", from);
      this.remoteUserId = from;
      await this.handleOffer(offer);
    });

    this.socket.on(SOCKET_EVENTS.ANSWER, async ({ answer }) => {
      console.log("Received answer");
      await this.handleAnswer(answer);
    });

    this.socket.on(SOCKET_EVENTS.ICE_CANDIDATE, async ({ candidate }) => {
      console.log("Received ICE candidate");
      await this.handleNewICECandidate(candidate);
    });
  }

  private async initializePeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.remoteUserId) {
        this.socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: this.remoteUserId,
        });
      }
    };

    this.peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      this.handleRemoteStream(remoteStream);
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });
    }
  }

  public async startCall(remoteUserId: string) {
    console.log("Starting call with:", remoteUserId);
    this.remoteUserId = remoteUserId;

    try {
      await this.initializeLocalStream();
      await this.initializePeerConnection();

      // Create and send offer
      const offer = await this.peerConnection!.createOffer();
      await this.peerConnection!.setLocalDescription(offer);

      this.socket.emit(SOCKET_EVENTS.OFFER, {
        offer,
        to: remoteUserId,
        from: this.socket.id,
      });
    } catch (error) {
      console.error("Error starting call:", error);
      throw error;
    }
  }

  private async initializeLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
      throw error;
    }
  }

  private async handleOffer(offer: RTCSessionDescriptionInit) {
    await this.initializeLocalStream();
    await this.initializePeerConnection();
    await this.peerConnection!.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);

    this.socket.emit("answer", {
      answer,
      to: this.remoteUserId,
    });
  }

  private async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection!.setRemoteDescription(
      new RTCSessionDescription(answer),
    );
  }

  private async handleNewICECandidate(candidate: RTCIceCandidateInit) {
    if (this.peerConnection) {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  private handleRemoteStream(remoteStream: MediaStream) {
    const audioElement = document.createElement("audio");
    audioElement.srcObject = remoteStream;
    audioElement.autoplay = true;
    document.body.appendChild(audioElement);
  }

  public endCall() {
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnection?.close();
    this.peerConnection = null;
    this.localStream = null;
    this.remoteUserId = null;

    // Remove any audio elements
    document.querySelectorAll("audio").forEach((el) => el.remove());
  }
}
