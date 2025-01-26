// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useChat } from "@/hooks/useChat";
// import { useAuth } from "@/hooks/useAuth";
// import MessageList from "./_components/MessageList";
// import CallInterface from "./_components/CallInterface";
// import ChatHeader from "./_components/ChatHeader";
// import { ChatMessage, Message } from "@/types/chat.types";
// import MessageInput from "./_components/MessageInput";
// import Loading from "@/app/loading";
// import { useChatStore } from "@/store/useChatStore";

// interface ChatState {
//   isLoading: boolean;
//   error: string | null;
// }

// export default function OneToOneChatInterface() {
//   const { user: currentUser } = useAuth();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [chatState, setChatState] = useState<ChatState>({
//     isLoading: true,
//     error: null,
//   });
//   const { userId } = useParams();
//   const { messages: chatMessages, sendMessage } = useChat(userId as string);
//   const activeUser = useChatStore((state) => state.activeUser);
//   const setActiveUser = useChatStore((state) => state.setActiveUser);

//   useEffect(() => {
//     const fetchChatData = async () => {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setChatState({ isLoading: false, error: null });
//       } catch (error) {
//         setChatState({ isLoading: false, error: "Failed to load chat data" });
//         console.log("Failed to fetch chat data:", error);
//       }
//     };

//     const fetchUserData = async () => {
//       try {
//         setActiveUser(activeUser);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     if (userId) {
//       fetchChatData();
//       fetchUserData();
//     }
//   }, [userId, setActiveUser, activeUser]);

//   useEffect(() => {
//     if (activeUser) {
//       console.log("Active user:", activeUser);
//     }
//   }, [activeUser]);

//   const handleSendMessage = (message: string) => {
//     sendMessage(message);
//   };

//   if (chatState.isLoading || !activeUser) {
//     return <Loading />;
//   }

//   if (chatState.error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">{chatState.error}</p>
//       </div>
//     );
//   }

//   // Map ChatMessage to Message
//   const messages: Message[] = chatMessages.map((msg: ChatMessage) => ({
//     ...msg,
//     timestamp: new Date(msg.timestamp).getTime(),
//   }));

//   return (
//     <div className="flex min-h-screen bg-background">
//       <main className="lg:w-3/4 flex-1 flex flex-col">
//         <ChatHeader
//           user={activeUser}
//           isProfileOpen={isProfileOpen}
//           setIsProfileOpen={setIsProfileOpen}
//         />

//         <MessageList
//           messages={messages}
//           currentUserId={currentUser?.id || ""}
//         />

//         <MessageInput onSendMessage={handleSendMessage} />
//       </main>

//       <CallInterface user={activeUser} />
//     </div>
//   );
// }
