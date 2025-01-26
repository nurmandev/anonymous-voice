import { TimeSlot } from "./booking";

export interface Volunteer {
  id: string;
  name: string;
  userName: string;
  title: string;
  profileImage: string;
  yearsExperience: number;
  bookingsCompleted: number;
  expertise: { name: string }[];
  description: string;
  date: string;
  timeSlots: TimeSlot[];
  rating: number;
  sessionsCompleted: number;
  isActive: boolean | undefined;
  adminApproval: boolean;
}
