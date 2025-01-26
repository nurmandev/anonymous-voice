import { create } from "zustand";

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

interface ChatContactsStore {
  filteredContacts: ChatContact[];
  setFilteredContacts: (contacts: ChatContact[]) => void;
}

export const useChatContactsStore = create<ChatContactsStore>((set) => ({
  filteredContacts: [],
  setFilteredContacts: (contacts) => set({ filteredContacts: contacts }),
}));
