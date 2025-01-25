import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

import { logger } from "../shared/logger";

let io: SocketIOServer;

const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*", // Adjust this according to your CORS policy
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    console.log(" From Use Username:", username);
    socket.username = username;
    next();
  });

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);
    logger.info(`Socket connected: ${socket.id}`);

    // Private message event handler
    socket.on("private message", (data: { to: string; message: any }) => {
      console.log("Private message:", data);

      // Find the target socket by username instead of socket ID
      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.username === data.to
      );

      if (targetSocket) {
        // Emit the private message to the specific user
        targetSocket.emit("private message", {
          from: socket.id,
          fromUsername: socket.username,
          message: data.message,
        });

        // Optional: Send confirmation to the sender
        socket.emit("message sent", {
          to: data.to,
          message: data.message,
        });
      } else {
        // If target socket not found, send an error back to the sender
        socket.emit("private message error", {
          to: data.to,
          message: "User not found",
        });
      }
    });

    socket.onAny((eventName: any) => {
      console.log(`Socket event: ${eventName}`);
    });

    socket.on(
      "call:invite",
      ({
        from,
        to,
        roomId,
        type,
      }: {
        from: string;
        to: string;
        roomId: string;
        type: string;
      }) => {
        console.log(`call:invite`, from, to, roomId, type);

        const targetSocket = Array.from(io.sockets.sockets.values()).find(
          (s) => s.username === to
        );

        if (targetSocket) {
          socket.join(roomId);
          targetSocket.emit("call:invite", {
            from,
            to,
            roomId,
            type,
          });
        }
      }
    );

    socket.on("call:accept", ({ roomId }: { roomId: string }) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("call:accept", { roomId });
    });

    socket.on(
      "call-offer",
      ({ offer, roomId }: { offer: any; roomId: string }) => {
        socket.broadcast.to(roomId).emit("call-offer", { offer, roomId });
      }
    );

    socket.on(
      "call-answer",
      ({ answer, roomId }: { answer: any; roomId: string }) => {
        socket.broadcast.to(roomId).emit("call-answer", { answer });
      }
    );

    socket.on(
      "ice-candidate",
      ({ candidate, roomId }: { candidate: any; roomId: string }) => {
        socket.broadcast.to(roomId).emit("ice-candidate", { candidate });
      }
    );

    socket.on("call:end", ({ roomId }: { roomId: string }) => {
      socket.to(roomId).emit("call:end", { roomId });
    });

    // Send connected users list to the client
    const updateUserList = () => {
      const users = [];
      for (const [id, socket] of io.of("/").sockets) {
        users.push({
          userID: id,
          username: socket.username,
          key: id,
        });
      }
      io.emit("users", users);
      console.log("Connected users:", users);
    };

    // Initial user list update
    updateUserList();

    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
      key: socket.id,
      self: false,
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      logger.info(`Socket disconnected: ${socket.id}`);

      // Update user list after disconnection
      updateUserList();
    });
  });

  return io;
};

export { initializeSocket, io };
