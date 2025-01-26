import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "../../app/(private)/dashboard/booked-calls/_components/StatusBadge";
import { BookingStatus } from "@/types/booking";

interface BookingCallsCardProps {
  booking: {
    id: string;
    status: BookingStatus;
    user: {
      id: string;
      username: string;
      name: string;
      email: string;
      avatarUrl: string | null;
    };
    schedule: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
  };
  onAccept?: (id: string) => Promise<void>;
  onReject?: (id: string) => Promise<void>;
  onChat?: (id: string) => void;
  isPending?: boolean;
}

export const BookingCallsCard = ({
  booking,
  onAccept,
  onReject,
  onChat,
  isPending = false,
}: BookingCallsCardProps) => {
  const setChatUser = useChatStore((state) => state.setActiveUser);

  const handleAction = async (
    action: (id: string) => Promise<void>,
    id: string,
  ) => {
    try {
      await action(id);
    } catch (error) {
      console.error(`Failed to perform action:`, error);
    }
  };

  const handleChat = () => {
    const chatUser = {
      id: booking.user.id,
      name: booking.user.name,
      avatar: booking.user.avatarUrl ?? "/placeholder.svg",
      status: "online",
      lastActive: "9m ago",
      email: booking.user.email,
    };
    setChatUser(chatUser);
    if (onChat) onChat(booking.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={booking.user.avatarUrl ?? ""}
            alt={booking.user.username}
          />
          <AvatarFallback>{booking.user.name}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{booking.user.name}</p>
          <p className="text-sm text-muted-foreground">{booking.schedule}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isPending && onAccept && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-green-500 hover:text-green-600"
            onClick={() => handleAction(onAccept, booking.id)}
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Accept</span>
          </Button>
        )}
        {isPending && onReject && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-red-500 hover:text-red-600"
            onClick={() => handleAction(onReject, booking.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Reject</span>
          </Button>
        )}
        {!isPending && (
          <>
            {onChat && (
              <Badge
                variant="secondary"
                className="border border-dashed rounded-full bg-soft-paste-light-hover h-6 text-xs font-semibold cursor-pointer flex items-center"
                onClick={handleChat}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Badge>
            )}
            <StatusBadge status={booking.status} />
          </>
        )}
      </div>
    </div>
  );
};
