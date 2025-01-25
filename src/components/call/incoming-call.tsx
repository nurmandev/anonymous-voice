"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { socket } from "@/lib/webrtc/socket";
import { SOCKET_EVENTS } from "@/lib/webrtc/constants";
import { Phone, PhoneOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface IncomingCallProps {
  fromUserId: string;
  fromName: string;
  roomId: string;
  onReject: () => void;
}

export function IncomingCall({
  fromUserId,
  fromName,
  roomId,
  onReject,
}: IncomingCallProps) {
  const router = useRouter();

  const handleAccept = () => {
    socket.emit(SOCKET_EVENTS.CALL_ACCEPT, { to: fromUserId, roomId });
    router.push(`/call-room/${roomId}`);
  };

  const handleReject = () => {
    socket.emit(SOCKET_EVENTS.CALL_REJECT, { to: fromUserId });
    onReject();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Incoming Call</CardTitle>
        <CardDescription>{fromName} is calling you</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse">
          <Phone className="w-8 h-8 text-primary-foreground" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          className="w-[45%]"
          onClick={handleReject}
        >
          <PhoneOff className="mr-2 h-4 w-4" />
          Decline
        </Button>
        <Button variant="default" className="w-[45%]" onClick={handleAccept}>
          <Phone className="mr-2 h-4 w-4" />
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
}
