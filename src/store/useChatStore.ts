import { create } from "zustand";

// Types
interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  status: string;
  timestamp: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastActive: string;
  email: string;
}

interface ChatContact {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
}

interface ChatState {
  // Chat Session
  mentor: string | null;
  mentee: string | null;
  selectedUser: ChatContact | null;
  callActive: boolean;

  // Chat Messages
  messages: ChatMessage[];
  activeRoom: string | null;
  activeUser: ChatUser | null;

  // Actions
  setSession: (mentor: string, mentee: string) => void;
  setSelectedUser: (user: ChatContact) => void;
  setCallActive: (active: boolean) => void;
  resetSession: () => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setActiveRoom: (roomId: string | null) => void;
  setActiveUser: (user: ChatUser | null) => void;
  updateMessageStatus: (messageId: string, status: string) => void;
  setChatSelectedUser: (user: ChatContact) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  // Initial state
  mentor: null,
  mentee: null,
  selectedUser: null,
  callActive: false,
  messages: [],
  activeRoom: null,
  activeUser: null,

  // Actions
  setSession: (mentor, mentee) => set({ mentor, mentee }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setCallActive: (active) => set({ callActive: active }),
  resetSession: () =>
    set({
      mentor: null,
      mentee: null,
      selectedUser: null,
      callActive: false,
    }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
  setActiveRoom: (roomId) => set({ activeRoom: roomId }),
  setActiveUser: (user) => set({ activeUser: user }),
  updateMessageStatus: (messageId, status) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, status } : msg,
      ),
    })),
  setChatSelectedUser: (user) => set({ selectedUser: user }),
}));
