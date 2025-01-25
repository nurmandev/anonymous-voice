import api from "@/config/axios.config";
import { socketService } from "./socket.service";

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

interface TypingStatus {
  roomId: string;
  isTyping: boolean;
}

interface PresenceUpdate {
  roomId: string;
  status: string;
}

interface SocketData {
  type: "message" | "typing" | "presence";
  message?: ChatMessage;
  status?: TypingStatus;
  presence?: PresenceUpdate;
}

export class ChatService {
  static async initializeSession(bookingId: string) {
    const room = await this.createRoom(bookingId);

    socketService.on(`chat:${room.id}`, (data: SocketData) => {
      switch (data.type) {
        case "message":
          this.handleNewMessage(data.message!);
          break;
        case "typing":
          this.handleTypingStatus(data.status!);
          break;
        case "presence":
          this.handlePresenceUpdate(data.presence!);
          break;
        default:
          break;
      }
    });

    return room;
  }

  static async createRoom(bookingId: string) {
    try {
      const response = await api.post("/api/v1/chat/rooms", { bookingId });
      return response.data;
    } catch (error) {
      console.error("Error creating chat room:", error);
      throw error;
    }
  }

  static async sendMessage(roomId: string, message: ChatMessage) {
    // Encrypt message
    const encrypted = await this.encryptMessage(message);

    // Send via socket
    socketService.emit("chat:message", {
      roomId,
      message: encrypted,
    });
  }

  static async encryptMessage(message: ChatMessage) {
    // Implement encryption logic here
    return message;
  }

  static handleNewMessage(message: ChatMessage) {
    // Handle new message
    console.log("New message:", message);
  }

  static handleTypingStatus(status: TypingStatus) {
    // Handle typing status
    console.log("Typing status:", status);
  }

  static handlePresenceUpdate(presence: PresenceUpdate) {
    // Handle presence update
    console.log("Presence update:", presence);
  }
}
