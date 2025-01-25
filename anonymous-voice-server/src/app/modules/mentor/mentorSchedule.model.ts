import { Schema, model } from "mongoose";

import { IMentorSchedule, MentorScheduleModel } from "./mentor.interface";

const MentorScheduleSchema = new Schema<IMentorSchedule, MentorScheduleModel>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: {
      type: [
        {
          time: {
            type: String,
            required: true,
          },
          isAvailable: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      ],
    },
    //Schedule object example
    // schedule: [
    //   { time: '1:00 PM - 2:00PM ', isAvailable: false },
    //   { time: '2:00 PM', isAvailable: false },
    // ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const MentorSchedule = model<IMentorSchedule, MentorScheduleModel>(
  "MentorSchedule",
  MentorScheduleSchema
);
