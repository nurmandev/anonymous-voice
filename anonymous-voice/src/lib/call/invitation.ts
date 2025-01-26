import { Socket } from "socket.io-client";
import { EventEmitter } from "events";

export interface RoomInvitation {
  roomId: string;
  from: string;
  to: string;
  type: "video" | "audio";
}

export class InvitationService extends EventEmitter {
  constructor(private socket: Socket) {
    super();
    this.setupEvents();
  }

  private setupEvents() {
    this.socket.on("room:invite", (invitation: RoomInvitation) => {
      console.log("InvitationService: Received room invitation", invitation);
      this.emit("roomInvite", invitation);
    });

    this.socket.on("room:accept", (data) => {
      console.log("InvitationService: Room invitation accepted", data);
      this.emit("roomAccepted", data);
    });

    this.socket.on("room:reject", (data) => {
      console.log("InvitationService: Room invitation rejected", data);
      this.emit("roomRejected", data);
    });
  }

  sendInvitation(
    to: string,
    roomId: string,
    type: "video" | "audio" = "video",
  ) {
    console.log("InvitationService: Sending room invitation");
    this.socket.emit("room:invite", { to, roomId, type });
  }

  acceptInvitation(invitation: RoomInvitation) {
    console.log("InvitationService: Accepting room invitation");
    this.socket.emit("room:accept", invitation);
  }

  rejectInvitation(invitation: RoomInvitation) {
    console.log("InvitationService: Rejecting room invitation");
    this.socket.emit("room:reject", invitation);
  }

  cleanup() {
    this.removeAllListeners();
    this.socket.removeAllListeners("room:invite");
    this.socket.removeAllListeners("room:accept");
    this.socket.removeAllListeners("room:reject");
  }
}
