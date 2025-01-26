import { Socket } from "socket.io-client";

export interface WebRTCConfig {
  socket: Socket;
  onRemoteStream?: (stream: MediaStream) => void;
  onError?: (error: Error) => void;
}

export interface CallPayload {
  from: string;
  to: string;
  fromName?: string;
  roomId: string;
}
