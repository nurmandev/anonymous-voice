import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Undo2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import { useChatStore } from "@/store/useChatStore";
import { useChatContactsStore } from "@/store/chat-contacts.store";

interface ChatContact {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp?: string;
  isActive?: boolean;
  hasHeart?: boolean;
  mentorName?: string;
}

interface ChatSidebarProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<ChatContact | null>>;
  selectedUser: ChatContact | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  setSelectedUser,
  selectedUser,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession, setChatSelectedUser } = useChatStore();
  const { filteredContacts } = useChatContactsStore();

  const currentActiveuser = React.useMemo(() => {
    try {
      return AuthService.getStoredUser();
    } catch {
      return null;
    }
  }, []);

  const handleUserSelect = React.useCallback(
    (contact: ChatContact) => {
      if (!currentActiveuser) {
        router.push("/login");
        return;
      }

      setSelectedUser(contact);

      const params = new URLSearchParams(searchParams);
      const isMentor = currentActiveuser.role === "mentor";

      params.set(
        "mentee",
        isMentor ? contact.username : currentActiveuser.userName,
      );
      params.set(
        "mentor",
        isMentor ? currentActiveuser.userName : contact.username,
      );
      router.push(`/chat?${params.toString()}`);

      setSession(
        isMentor ? currentActiveuser.userName : contact.username,
        isMentor ? contact.username : currentActiveuser.userName,
      );
      setChatSelectedUser(contact);
    },
    [
      setSelectedUser,
      searchParams,
      currentActiveuser,
      router,
      setSession,
      setChatSelectedUser,
    ],
  );

  const getEmptyStateMessage = () => {
    if (currentActiveuser?.role === "mentor") {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            No Active Mentees
          </p>
          <p className="text-xs text-muted-foreground">
            Wait for mentees to book appointments with you
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          No Active Appointments
        </p>
        <p className="text-xs text-muted-foreground">
          Book an appointment with a mentor to start chatting
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="p-2.5 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Undo2 size={20} />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-muted-foreground">Chats</h1>
      </div>

      <ScrollArea className="flex-1 border-t mt-3">
        {filteredContacts.length > 0
          ? filteredContacts.map((contact) => (
              <div
                key={contact.id}
                role="button"
                aria-pressed={selectedUser?.username === contact.username}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b border-muted/40",
                  contact.isActive && "bg-accent",
                  selectedUser?.username === contact.username && "bg-blue-100",
                )}
                onClick={() => handleUserSelect(contact)}
              >
                <Avatar className="w-8 h-8 border rounded-full">
                  <AvatarImage src={contact.avatar} alt={contact.username} />
                  <AvatarFallback>{contact.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">
                      {contact.username}
                    </span>
                    {contact.mentorName && (
                      <span className="text-sm text-muted-foreground ml-2">
                        (Mentor: {contact.mentorName})
                      </span>
                    )}
                    {contact.isActive && (
                      <span className="text-xs text-green-500 ml-auto">
                        Active
                      </span>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                  )}
                </div>
              </div>
            ))
          : getEmptyStateMessage()}
      </ScrollArea>
    </>
  );
};

export default React.memo(ChatSidebar);
