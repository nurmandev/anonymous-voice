import { Socket, io } from "socket.io-client";

export class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | null = null;

  private constructor() {}

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  async connect(url: string, auth: { username: string }): Promise<Socket> {
    if (this.socket?.connected) {
      return this.socket;
    }

    return new Promise((resolve, reject) => {
      try {
        this.socket = io(url, {
          auth,
          transports: ["websocket"],
          reconnection: true,
          reconnectionAttempts: 3,
          reconnectionDelay: 5000,
        });

        this.socket.on("connect", () => {
          console.log("Socket connected:", this.socket?.id);
          resolve(this.socket!);
        });

        this.socket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          reject(error);
        });
      } catch (error) {
        console.error("Socket connection error:", error);
        reject(error);
      }
    });
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
