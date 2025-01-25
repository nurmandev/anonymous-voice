import { Schema, model } from "mongoose";

import { IUserDetails, UserDetailsModel } from "./userDetails.interface";

const UserDetailsSchema = new Schema<IUserDetails, UserDetailsModel>(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const UserDetails = model<IUserDetails, UserDetailsModel>(
  "UserDetails",
  UserDetailsSchema
);
