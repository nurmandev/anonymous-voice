"use client";

import { RTCConfig } from "@/lib/call/config";
import { RoomManager } from "@/lib/call/room";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface UseVideoCallProps {
  roomId: string;
  isCaller: boolean;
  username: string;
}

export function useVideoCall({
  roomId,
  isCaller,
  username,
}: UseVideoCallProps) {
  const [room, setRoom] = useState<RoomManager | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let socket: Socket | null = null;
    let roomManager: RoomManager | null = null;

    const initializeCall = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
          throw new Error("Socket URL not configured");
        }

        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
          auth: { username },
          transports: ["websocket"],
        });

        await new Promise<void>((resolve, reject) => {
          socket?.on("connect", resolve);
          socket?.on("connect_error", reject);
          setTimeout(
            () => reject(new Error("Socket connection timeout")),
            5000,
          );
        });

        roomManager = new RoomManager(socket, roomId, RTCConfig);
        setRoom(roomManager);

        roomManager.on("remoteStream", setRemoteStream);

        const stream = await roomManager.join(
          { video: isVideoEnabled, audio: isAudioEnabled },
          isCaller,
        );

        setLocalStream(stream);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize call",
        );
      }
    };

    initializeCall();

    return () => {
      roomManager?.leave();
      socket?.disconnect();
    };
  }, [roomId, isCaller, username, isAudioEnabled, isVideoEnabled]);

  const toggleAudio = () => {
    if (room) {
      const newState = !isAudioEnabled;
      room.toggleAudio(newState);
      setIsAudioEnabled(newState);
    }
  };

  const toggleVideo = () => {
    if (room) {
      const newState = !isVideoEnabled;
      room.toggleVideo(newState);
      setIsVideoEnabled(newState);
    }
  };

  return {
    room,
    localStream,
    remoteStream,
    isAudioEnabled,
    isVideoEnabled,
    error,
    toggleAudio,
    toggleVideo,
  };
}
