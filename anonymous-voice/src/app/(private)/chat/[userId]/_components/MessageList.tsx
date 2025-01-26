"use client";

import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: number;
  status?: "sent" | "delivered" | "read";
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isLoading?: boolean;
  error?: string;
  isTyping?: boolean;
  typingUserId?: string;
}

const MessageList = ({
  messages,
  currentUserId,
  isLoading,
  error,
  isTyping,
  typingUserId,
}: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Group messages logic
  const groupedMessages = React.useMemo(() => {
    return messages.reduce((groups, message) => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup[0].senderId === message.senderId) {
        lastGroup.push(message);
      } else {
        groups.push([message]);
      }
      return groups;
    }, [] as Message[][]);
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4 overflow-y-auto">
      <AnimatePresence initial={false}>
        {groupedMessages.map((group) => (
          <motion.div
            key={group[0].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "flex mb-4",
              group[0].senderId === currentUserId
                ? "justify-end"
                : "justify-start",
            )}
          >
            {/* Rest of your existing JSX */}
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && typingUserId !== currentUserId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 ml-10"
        >
          <span className="text-sm text-muted-foreground">Typing</span>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex gap-1"
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </motion.div>
        </motion.div>
      )}

      <div ref={scrollRef} />
    </ScrollArea>
  );
};

export default MessageList;
