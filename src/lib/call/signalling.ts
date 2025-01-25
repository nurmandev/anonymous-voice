import { Socket } from "socket.io-client";
import { EventEmitter } from "events";

export class SignalingService extends EventEmitter {
  private signalingState: "stable" | "have-local-offer" | "have-remote-offer" =
    "stable";

  constructor(
    private socket: Socket,
    private roomId: string,
  ) {
    super();
    this.setupEvents();
  }

  private setupEvents() {
    this.socket.on("webrtc:offer", (data) => {
      if (this.signalingState !== "stable") {
        console.log("Ignoring offer - wrong signaling state");
        return;
      }
      this.signalingState = "have-remote-offer";
      this.emit("offer", data);
    });

    this.socket.on("webrtc:answer", (data) => {
      if (this.signalingState !== "have-local-offer") {
        console.log("Ignoring answer - wrong signaling state");
        return;
      }
      this.signalingState = "stable";
      this.emit("answer", data);
    });

    this.socket.on("webrtc:ice-candidate", (data) => {
      this.emit("iceCandidate", data);
    });
  }

  sendOffer(offer: RTCSessionDescriptionInit) {
    if (this.signalingState !== "stable") {
      console.log("Cannot send offer - wrong signaling state");
      return;
    }
    this.signalingState = "have-local-offer";
    this.socket.emit("webrtc:offer", { roomId: this.roomId, offer });
  }

  sendAnswer(answer: RTCSessionDescriptionInit) {
    if (this.signalingState !== "have-remote-offer") {
      console.log("Cannot send answer - wrong signaling state");
      return;
    }
    this.signalingState = "stable";
    this.socket.emit("webrtc:answer", { roomId: this.roomId, answer });
  }

  sendIceCandidate(candidate: RTCIceCandidateInit) {
    this.socket.emit("webrtc:ice-candidate", {
      roomId: this.roomId,
      candidate,
    });
  }

  cleanup() {
    this.socket.emit("room:leave", { roomId: this.roomId });
    this.removeAllListeners();
  }
}
