import { TimeSlot } from "@/types/booking";

const today = new Date().toISOString().split("T")[0];

export const mockTimeSlots: TimeSlot[] = [
  {
    time: "09:00 AM",
    available: true,
    date: today,
  },
  {
    time: "10:30 AM",
    available: true,
    date: today,
  },
  {
    time: "11:00 AM",
    available: false,
    date: today,
  },
  {
    time: "02:00 PM",
    available: true,
    date: today,
  },
  {
    time: "03:30 PM",
    available: true,
    date: today,
  },
  {
    time: "04:00 PM",
    available: false,
    date: today,
  },
];
