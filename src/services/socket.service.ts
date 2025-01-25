import api from "@/config/axios.config";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  sentBy: string;
  sentTo: string;
  message: string;
  isSeen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
      throw new Error("NEXT_PUBLIC_SOCKET_URL is not defined");
    }

    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Socket connected");
    });

    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  on<T>(event: string, callback: (data: T) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit<T>(event: string, data: T) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  off<T>(event: string, callback: (data: T) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // API methods
  async saveMessage(data: {
    sentBy: string;
    sentTo: string;
    message: string;
    isSeen: boolean;
  }): Promise<ApiResponse<Message>> {
    try {
      const response = await api.post<ApiResponse<Message>>(
        "/api/v1/message/create-message",
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  }

  async getMessagesByUsername(
    username: string,
  ): Promise<ApiResponse<Message[]>> {
    try {
      const response = await api.get<ApiResponse<Message[]>>(
        `/api/v1/message`,
        {
          params: { username },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  async getMessageById(messageId: string): Promise<ApiResponse<Message>> {
    try {
      const response = await api.get<ApiResponse<Message>>(
        `/api/v1/message/${messageId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error;
    }
  }
}

export const socketService = new SocketService();
