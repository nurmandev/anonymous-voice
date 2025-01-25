import { Schema, model } from "mongoose";

import { IMessage, MessageModel } from "./messaging.interfaces";

const MessageSchema = new Schema<IMessage, MessageModel>(
  {
    sentBy: {
      type: String,
      required: true,
    },
    sentTo: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Message = model<IMessage, MessageModel>("Message", MessageSchema);
