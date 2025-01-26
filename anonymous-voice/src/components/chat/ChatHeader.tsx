import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CallButton } from "../call/call-button";
import { useChatContactsStore } from "@/store/chat-contacts.store";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import { useChatStore } from "@/store/useChatStore";
import { useRouter, useSearchParams } from "next/navigation";

interface currentMentorUser {
  username: string;
  role: string;
}

interface ChatContact {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp?: string;
  isActive?: boolean;
  hasHeart?: boolean;
}

interface ChatHeaderProps {
  selectedUser: ChatContact;
  setSelectedUser: React.Dispatch<React.SetStateAction<ChatContact | null>>;
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contactName?: string;
  lastActiveTime?: string;
  currentUser: currentMentorUser;
  onPhoneClick: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedUser,
  setSelectedUser,
  isSidebarOpen,
  setIsSidebarOpen,
  lastActiveTime,
  currentUser,
  onPhoneClick,
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

  const handleContactSelect = (contact: ChatContact) => {
    const currentActiveuser = AuthService.getStoredUser();
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
  };

  return (
    <header className="flex items-center gap-3 p-4 border-b">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 p-0 flex flex-col">
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b z-10">
            <div className="p-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              {currentActiveuser?.role === "mentor" ? (
                <p className="text-xs text-muted-foreground">Your mentees</p>
              ) : (
                <p className="text-xs text-muted-foreground">Your mentor</p>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  role="button"
                  aria-pressed={selectedUser?.username === contact.username}
                  className={cn(
                    "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b border-muted/40",
                    contact.isActive && "bg-accent/50",
                    selectedUser?.username === contact.username &&
                      "bg-primary/10",
                  )}
                  onClick={() => {
                    handleContactSelect(contact);
                    setIsSidebarOpen(false);
                  }}
                >
                  <Avatar className="w-10 h-10 border rounded-full">
                    <AvatarImage
                      src="/images/avatar.png"
                      alt={contact.username}
                    />
                    <AvatarFallback>
                      {contact.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">
                        {contact.username}
                      </span>
                      {contact.isActive && (
                        <span className="text-xs text-green-500 font-medium">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {contact.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                      )}
                      {contact.timestamp && (
                        <span className="text-xs text-muted-foreground shrink-0">
                          {contact.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4">{getEmptyStateMessage()}</div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Avatar className="h-10 w-10">
        <AvatarImage src="/images/avatar.svg" alt={selectedUser.username} />
        <AvatarFallback>{selectedUser.username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold truncate">{selectedUser.username}</h2>
        <p className="text-xs text-muted-foreground truncate">
          {lastActiveTime || "Active 9m ago"}
        </p>
      </div>

      {currentUser.role === "mentor" && (
        <CallButton onPhoneClick={onPhoneClick} />
      )}
    </header>
  );
};
