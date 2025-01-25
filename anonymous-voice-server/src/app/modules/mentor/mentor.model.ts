import { Schema, model } from "mongoose";

import { IMentor, MentorModel } from "./mentor.interface";

const MentorSchema = new Schema<IMentor, MentorModel>(
  {
    userName: {
      type: String,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    designation: {
      type: String,
    },
    specialization: {
      type: String,
    },
    isOnline: {
      type: Boolean,
    },
    adminApproval: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "MentorSchedule",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Mentor = model<IMentor, MentorModel>("Mentor", MentorSchema);
