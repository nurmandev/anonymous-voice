export interface PlanOption {
  type: string;
  duration: string;
  time: string;
  date: string;
  validity: string;
  price?: number;
}

export interface AppointmentPayload {
  appointmentType: "Booking Call" | "Quick Call" | "Chat";
  status: "confirmed" | "pending" | "cancelled";
  content: string;
  selectedSlot: {
    time: string;
    isAvailable: boolean;
  };
  mentorUserName: string;
  menteeUserName: string;
}
