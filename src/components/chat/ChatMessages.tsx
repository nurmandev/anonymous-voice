import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Undo2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { cn } from "@/lib/utils";
import { useChatContactsStore } from "@/store/chat-contacts.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter, useSearchParams } from "next/navigation";
import { useChatStore } from "@/store/useChatStore";
import { AuthService } from "@/services/auth.service";
import Link from "next/link";

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
  mentorName?: string;
}

interface Message {
  id: string;
  sentBy: string;
  sentTo: string;
  message: string;
  isSeen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessagesProps {
  selectedUser: ChatContact | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<ChatContact | null>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  messages: Message[];
  currentUser: currentMentorUser;
  currentActiveUser: { userName: string };
  handleSendMessage: (e: React.FormEvent) => void;
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onPhoneClick: () => void;
}

const ChatMessages = ({
  selectedUser,
  setSelectedUser,
  isSidebarOpen,
  setIsSidebarOpen,
  isProfileOpen,
  setIsProfileOpen,
  isLoading,
  messages,
  currentUser,
  currentActiveUser,
  handleSendMessage,
  messageInput,
  setMessageInput,
  messagesEndRef,
  onPhoneClick,
}: ChatMessagesProps) => {
  const { filteredContacts } = useChatContactsStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession, setChatSelectedUser } = useChatStore();

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

  const renderChatView = () => {
    if (!selectedUser) return null;

    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-background to-muted/20">
        <ChatHeader
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          currentUser={currentUser}
          onPhoneClick={onPhoneClick}
        />

        <ScrollArea className="flex-1 px-4 py-6 overflow-y-auto">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <AnimatePresence initial={false}>
              {messages?.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "flex mb-4 items-end gap-2",
                    message.sentBy === currentActiveUser?.userName
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  {message.sentBy !== currentActiveUser?.userName && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src="/images/avatar.png"
                        alt={message.sentBy}
                      />
                      <AvatarFallback>{message.sentBy[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
                      message.sentBy === currentActiveUser?.userName
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.message}</p>
                    <span className="text-[9px] font-semibold opacity-50 block">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          )}
        </ScrollArea>

        <footer className="p-4 border-t bg-background/80 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 rounded-full bg-muted border-none"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            />
            <Button type="submit" size="icon" className="rounded-full">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </footer>
      </div>
    );
  };

  const renderContactList = () => (
    <div className="flex flex-col h-full lg:hidden bg-background">
      <header className="py-4 px-8 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-xs">
            <Undo2 size={20} /> Back
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Chats</h1>
      </header>

      <div className="flex-1">
        <ScrollArea className="h-full">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleContactSelect(contact)}
            >
              <div className="flex items-center gap-3 p-4 border-b">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/images/avatar.png"
                    alt={contact.username}
                  />
                  <AvatarFallback>{contact.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{contact.username}</h3>
                    {contact.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {contact.timestamp}
                      </span>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  )}
                </div>
                {contact.isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            Select a Conversation
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose from your contacts to start chatting
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex-1 flex flex-col">
      {selectedUser ? renderChatView() : renderContactList()}
    </main>
  );
};

export default ChatMessages;
