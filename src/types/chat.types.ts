export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastActive?: string;
  email?: string;
  role?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: number;
}
