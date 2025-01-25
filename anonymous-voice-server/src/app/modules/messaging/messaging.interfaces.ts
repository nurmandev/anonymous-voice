import { Model } from "mongoose";

export type IMessage = {
  sentBy: String;
  sentTo: String;
  message: String;
  isSeen: boolean;
};

export type MessageModel = Model<IMessage, Record<string, unknown>>;

export type IMessageFilters = {
  searchTerm?: string;
};
