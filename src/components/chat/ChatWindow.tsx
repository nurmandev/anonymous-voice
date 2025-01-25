import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export const ChatWindow = ({
  user,
  messages,
  onSendMessage,
  onComplete,
  onCancel,
}: {
  user: { name: string; avatar: string };
  messages: Array<{ id: string; content: string; isOutgoing: boolean }>;
  onSendMessage: (content: string) => void;
  onComplete?: () => void;
  onCancel?: () => void;
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader
        user={user}
        callDuration="10 min Call"
        callTime="3:00 pm"
        isActive={true}
        onComplete={onComplete}
        onCancel={onCancel}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isOutgoing={message.isOutgoing}
            avatar={!message.isOutgoing ? user.avatar : undefined}
          />
        ))}
      </div>

      <ChatInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSend}
      />
    </div>
  );
};
