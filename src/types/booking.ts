import { z } from "zod";
import { PlanOption } from "./plan";

export const AppointmentTypeSchema = z
  .enum(["booking-call", "quick-call", "chat"])
  .transform((type) => {
    const typeMap = {
      "booking-call": "Booking Call",
      "quick-call": "Quick Call",
      chat: "Chat",
    } as const;
    return typeMap[type];
  });

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  avatarUrl: z.string().nullable(),
  email: z.string().email(),
});

export const BookingStatusSchema = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "running",
]);

export const TimeSlotSchema = z.object({
  time: z.string(),
  available: z.boolean(),
  date: z.string(),
});

export const BookingSchema = z.object({
  id: z.string(),
  user: UserSchema,
  schedule: z.string(),
  duration: z.string(),
  status: BookingStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Type Inferences
export type AppointmentType = z.infer<typeof AppointmentTypeSchema>;
export type User = z.infer<typeof UserSchema>;
export type BookingStatus = z.infer<typeof BookingStatusSchema>;
export type TimeSlot = z.infer<typeof TimeSlotSchema>;
export type Booking = z.infer<typeof BookingSchema>;

// Constants
export const DURATION_OPTIONS = [
  { value: "10", label: "10 min call" },
  { value: "20", label: "20 min call" },
  { value: "30", label: "30 min call" },
] as const;

// Session Configuration
export const SESSION_CONFIG: Record<AppointmentType, SessionConfig> = {
  "Booking Call": {
    requiresTimeSlot: true,
    requiresDate: true,
    requiresDuration: true,
    title: "Schedule a Booking Call",
  },
  "Quick Call": {
    requiresTimeSlot: false,
    requiresDate: false,
    requiresDuration: true,
    title: "Quick Call Session",
  },
  Chat: {
    requiresTimeSlot: false,
    requiresDate: false,
    requiresDuration: false,
    title: "Chat Session",
  },
};

// Component Props Interfaces
export interface SessionConfig {
  requiresTimeSlot: boolean;
  requiresDate: boolean;
  requiresDuration: boolean;
  title: string;
}

export interface ChoosePlanProps {
  mentorUsername: string;
  onPlanSelect?: (plan: PlanOption) => void;
}

export interface PlanFieldProps {
  label: string;
  value: string;
  hasDropdown?: boolean;
  onDurationChange?: (value: string) => void;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  duration: string;
  date: string | null;
  timeSlot: string | null;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface BookingPageProps {
  mentorUsername: string;
  sessionType: AppointmentType;
}

export interface VolunteerDetails {
  name: string;
  userName: string;
  title: string;
  avatarUrl: string;
  yearsExperience: number;
  bookingsCompleted: number;
  expertise: { name: string }[];
  description: string;
  date: string;
  timeSlots: TimeSlot[];
}

export interface BookingDetailsProps extends VolunteerDetails {
  showAvailability: boolean;
}

export interface ChatBooking extends Booking {
  chatRoomId?: string;
  lastMessageAt?: string;
  isActive: boolean;
}
