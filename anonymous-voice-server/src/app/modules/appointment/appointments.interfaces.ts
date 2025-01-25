import { Model } from "mongoose";

export type IAppointmentSlot = {
  time: string;
  isAvailable: boolean;
};

export type IAppointment = {
  appointmentType: String;
  appointmentDate: Date;
  status: String;
  content: String;
  selectedSlot: IAppointmentSlot[];
  mentorUserName: String;
  menteeUserName: String;
};

export type AppointmentModel = Model<IAppointment, Record<string, unknown>>;

export type IAppointmentFilters = {
  searchTerm?: string;
};
