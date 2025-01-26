"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VoiceCall } from "@/components/chat/VoiceCall";

export default function VoiceCallPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const socket = useSocket();

  const roomId = searchParams.get("roomId");
  const isCaller = searchParams.get("caller") === "true";

  useEffect(() => {
    if (!roomId || !socket) {
      router.push("/chat");
    }
  }, [roomId, socket, router]);

  if (!roomId || !socket) {
    return null;
  }

  const handleEndCall = () => {
    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-background">
      <VoiceCall
        socket={socket}
        roomId={roomId}
        isCaller={isCaller}
        onEndCall={handleEndCall}
      />
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { AuthService } from "@/services/auth.service";
// import { usePathname, useRouter } from "next/navigation";
// import Loading from "@/app/loading";
// import VideoCall from "@/components/chat/VideoCall";
// import { webRTCService } from "@/services/webrtc.service";
// import PreJoinScreen from "@/components/chat/PreJoinScreen";
// import { MediaDeviceError } from "@/types/error";

// const VoiceCallPage: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [hasJoined, setHasJoined] = useState(false);
//   const [isInitializing, setIsInitializing] = useState(true);

//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);

//   useEffect(() => {
//     const currentActiveUser = AuthService.getStoredUser();
//     if (!currentActiveUser?.userName) {
//       setError("User is not authenticated");
//       setIsInitializing(false);
//       return;
//     }

//     const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       auth: { username: currentActiveUser.userName },
//     });

//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       setIsConnected(true);
//       initializeMedia(newSocket);
//     });

//     newSocket.on("disconnect", () => setIsConnected(false));
//     newSocket.on("connect_error", (err) => {
//       setError(`Connection error: ${err.message}`);
//       setIsInitializing(false);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const initializeMedia = async (socket: Socket) => {
//     try {
//       const stream = await webRTCService.initialize(socket, true);
//       setLocalStream(stream);
//       setIsInitializing(false);
//     } catch (error) {
//       if (error instanceof MediaDeviceError) {
//         setError(error.message);
//       } else {
//         setError("Failed to initialize media devices");
//       }
//       setIsInitializing(false);
//     }
//   };

//   useEffect(() => {
//     if (!socket || !hasJoined) return;

//     socket.emit("join room", { roomId: pathname });

//     const handleOffer = async (data: { offer: RTCSessionDescriptionInit }) => {
//       await webRTCService.handleAnswer(data.offer);
//       const answer = await webRTCService.createOffer();
//       if (answer) {
//         socket.emit("answer", { roomId: pathname, answer });
//       }
//     };

//     const handleAnswer = async (data: {
//       answer: RTCSessionDescriptionInit;
//     }) => {
//       await webRTCService.handleAnswer(data.answer);
//     };

//     const handleIceCandidate = async (data: {
//       candidate: RTCIceCandidateInit;
//     }) => {
//       await webRTCService.handleIceCandidate(data.candidate);
//     };

//     socket.on("offer", handleOffer);
//     socket.on("answer", handleAnswer);
//     socket.on("ice-candidate", handleIceCandidate);

//     return () => {
//       socket.off("offer", handleOffer);
//       socket.off("answer", handleAnswer);
//       socket.off("ice-candidate", handleIceCandidate);
//     };
//   }, [socket, hasJoined, pathname]);

//   const handleJoinCall = async () => {
//     if (!socket) return;

//     setHasJoined(true);
//     const offer = await webRTCService.createOffer();
//     if (offer) {
//       socket.emit("offer", { roomId: pathname, offer });
//     }
//   };

//   const toggleAudio = () => {
//     if (localStream) {
//       const audioTracks = localStream.getAudioTracks();
//       audioTracks.forEach((track) => {
//         track.enabled = !track.enabled;
//       });
//       setIsAudioEnabled(!isAudioEnabled);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       const videoTracks = localStream.getVideoTracks();
//       videoTracks.forEach((track) => {
//         track.enabled = !track.enabled;
//       });
//       setIsVideoEnabled(!isVideoEnabled);
//     }
//   };

//   const handleLeaveCall = () => {
//     if (socket) {
//       socket.emit("leave room", { roomId: pathname });
//       webRTCService.cleanup();
//       router.push("/chat");
//     }
//   };

//   if (isInitializing) return <Loading />;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!isConnected) return <Loading />;

//   return hasJoined ? (
//     <VideoCall
//       localStream={localStream}
//       remoteStream={remoteStream}
//       onLeaveCall={handleLeaveCall}
//       isAudioEnabled={isAudioEnabled}
//       isVideoEnabled={isVideoEnabled}
//       toggleAudio={toggleAudio}
//       toggleVideo={toggleVideo}
//     />
//   ) : (
//     <PreJoinScreen
//       onJoin={handleJoinCall}
//       localStream={localStream}
//       isAudioEnabled={isAudioEnabled}
//       isVideoEnabled={isVideoEnabled}
//       toggleAudio={toggleAudio}
//       toggleVideo={toggleVideo}
//     />
//   );
// };

// export default VoiceCallPage;
