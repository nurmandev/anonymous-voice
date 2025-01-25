"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { socket } from "@/lib/webrtc/socket";
import { WebRTCService } from "@/lib/webrtc/webrtc-service";
import { SOCKET_EVENTS } from "@/lib/webrtc/constants";
import { Mic, MicOff, PhoneOff } from "lucide-react";

interface CallRoomProps {
  params: {
    roomId: string;
  };
}

export default function CallRoom({ params }: CallRoomProps) {
  const [isMuted, setIsMuted] = useState(false);
  const webRTCRef = useRef<WebRTCService | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleEndCall = useCallback(() => {
    webRTCRef.current?.endCall();
    socket.emit(SOCKET_EVENTS.CALL_END, { roomId: params.roomId });
    router.push("/chat");
  }, [params.roomId, router]);

  useEffect(() => {
    webRTCRef.current = new WebRTCService({
      socket,
      onRemoteStream: (stream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }
      },
      onError: (error) => {
        toast({
          title: "Call Error",
          description: error.message,
          variant: "destructive",
        });
        handleEndCall();
      },
    });

    socket.on(SOCKET_EVENTS.CALL_END, handleEndCall);

    return () => {
      webRTCRef.current?.endCall();
      socket.off(SOCKET_EVENTS.CALL_END);
    };
  }, [handleEndCall, toast]);

  const toggleMute = () => {
    const tracks = webRTCRef.current?.localStream?.getAudioTracks();
    if (tracks?.length) {
      tracks[0].enabled = isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-[300px] p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
            <Mic className="w-12 h-12 text-primary-foreground" />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">Voice Call</h2>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>

          <audio ref={audioRef} autoPlay />

          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={toggleMute}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
