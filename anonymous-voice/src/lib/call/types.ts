import { SocketManager } from "./socket-manager";

export interface MediaConfig {
  video: boolean;
  audio: boolean;
}

export interface CallEvents {
  onTrack: (stream: MediaStream) => void;
  onError: (error: Error) => void;
}

export interface CallInvitation {
  roomId: string;
  from: string;
  to: string;
  type: "video" | "audio";
}

export interface RoomEvents {
  remoteStream: (stream: MediaStream) => void;
  userLeft: () => void;
  error: (error: Error) => void;
  roomJoined: () => void;
  reconnecting: () => void;
  reconnected: () => void;
}

export interface RoomManagerConfig {
  socketManager: SocketManager;
  roomId: string;
  rtcConfig: RTCConfiguration;
}

export interface CallState {
  isInitialized: boolean;
  error: string | null;
  roomId: string | null;
}
