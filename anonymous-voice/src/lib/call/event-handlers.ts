import { EventEmitter } from "events";
import { ConnectionStateManager } from "./connection-state";
import { SignalingService } from "./signalling";
import { RTCPeerManager } from "./peer";

export class RoomEventHandlers {
  constructor(
    private emitter: EventEmitter,
    private peer: RTCPeerManager,
    private signaling: SignalingService,
    private connectionState: ConnectionStateManager,
  ) {}

  async handleOffer({ offer }: { offer: RTCSessionDescriptionInit }) {
    try {
      if (!this.connectionState.canNegotiate()) {
        console.log("Ignoring offer - already negotiating");
        return;
      }

      this.connectionState.setNegotiating(true);
      const answer = await this.peer.handleOffer(offer);
      if (answer) {
        await this.signaling.sendAnswer(answer);
      }
      this.connectionState.setNegotiating(false);
    } catch (error) {
      console.error("Error handling offer:", error);
      this.connectionState.setNegotiating(false);
      this.emitter.emit("error", new Error("Failed to handle offer"));
    }
  }

  async handleAnswer({ answer }: { answer: RTCSessionDescriptionInit }) {
    try {
      await this.peer.handleAnswer(answer);
      this.connectionState.setNegotiating(false);
    } catch (error) {
      console.error("Error handling answer:", error);
      this.connectionState.setNegotiating(false);
      this.emitter.emit("error", new Error("Failed to handle answer"));
    }
  }

  async handleIceCandidate({ candidate }: { candidate: RTCIceCandidateInit }) {
    try {
      await this.peer.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }
}
