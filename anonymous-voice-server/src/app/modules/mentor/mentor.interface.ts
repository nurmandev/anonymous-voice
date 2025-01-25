import { Model, Types } from "mongoose";

export interface IMentorSchedule {
  userName: Types.ObjectId | string;
  schedule: Array<{ time: string; isAvailable: boolean }>;
}

export type IMentor = {
  id: string;
  name: string; //embedded object
  userName: string;
  bio: string;
  designation: string;
  specialization: string;
  isOnline: boolean;
  adminApproval: boolean;
  email: string;
  profileImage: string;
  scheduleId: Types.ObjectId | IMentorSchedule;
};

export type MentorModel = Model<IMentor, Record<string, unknown>>;
export type MentorScheduleModel = Model<
  IMentorSchedule,
  Record<string, unknown>
>;

export type IMentorFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
