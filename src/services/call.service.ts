import { Socket } from "socket.io-client";
import { CallInvitation } from "@/types/call";

export class CallService {
  static generateRoomId(): string {
    return `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static sendCallInvitation(socket: Socket, invitation: CallInvitation) {
    console.log("Sending call invitation:", invitation);
    socket.emit("call:invite", invitation, (response: { error?: string }) => {
      if (response.error) {
        console.error("Error sending call invitation:", response.error);
      } else {
        console.log("Call invitation sent successfully");
      }
    });
  }

  static listenForCallInvitations(
    socket: Socket,
    callback: (invitation: CallInvitation) => void,
  ) {
    socket.on("call:invite", (invitation: CallInvitation) => {
      console.log("Received call invitation:", invitation);
      callback(invitation);
    });
  }

  static acceptCall(socket: Socket, roomId: string) {
    socket.emit("call:accept", { roomId });
  }

  static rejectCall(socket: Socket, roomId: string) {
    socket.emit("call:reject", { roomId });
  }

  static endCall(socket: Socket, roomId: string) {
    socket.emit("call:end", { roomId });
  }
}
