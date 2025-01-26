import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  appointmentType: "Booking Call" | "Quick Call" | "Chat";
  mentorUsername: string | null;
  selectedTimeSlot: string | null;
  selectedDate: string | null;
  selectedDuration: string;
  showPlanDetails: boolean;
  validityTime: string;

  setSelectedTimeSlot: (time: string | null) => void;
  setSelectedDate: (date: string | null) => void;
  setShowPlanDetails: (show: boolean) => void;
  setDuration: (duration: string) => void;
  setMentorUsername: (userName: string) => void;
  setAppointmentType: (type: "Booking Call" | "Quick Call" | "Chat") => void;
  startCountdown: () => void;
  resetBooking: () => void;
}

const initialState = {
  selectedTimeSlot: null,
  selectedDate: null,
  selectedDuration: "10",
  mentorUsername: null,
  showPlanDetails: false,
  appointmentType: "Booking Call" as const,
  validityTime: "24:00",
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSelectedTimeSlot: (time) => set({ selectedTimeSlot: time }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setShowPlanDetails: (show) => set({ showPlanDetails: show }),
      setDuration: (duration) => set({ selectedDuration: duration }),
      setMentorUsername: (userName) => set({ mentorUsername: userName }),
      setAppointmentType: (type) => set({ appointmentType: type }),

      startCountdown: () => {
        const countdownInterval = setInterval(() => {
          const [hours, minutes] = get().validityTime.split(":").map(Number);
          const totalMinutes = hours * 60 + minutes - 1;

          if (totalMinutes < 0) {
            clearInterval(countdownInterval);
            return;
          }

          const newHours = Math.floor(totalMinutes / 60);
          const newMinutes = totalMinutes % 60;

          set({
            validityTime: `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`,
          });
        }, 60000);
      },

      resetBooking: () => set(initialState),
    }),
    {
      name: "booking-storage",
      partialize: (state) => ({
        selectedDuration: state.selectedDuration,
        appointmentType: state.appointmentType,
        validityTime: state.validityTime,
      }),
    },
  ),
);

// import { AppointmentType } from "@/types/booking";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface BookingState {
//   appointmentType: AppointmentType;
//   mentorUsername: string | null;
//   selectedTimeSlot: string | null;
//   selectedDate: string | null;
//   selectedDuration: string;
//   showPlanDetails: boolean;

//   setSelectedTimeSlot: (time: string | null) => void;
//   setSelectedDate: (date: string | null) => void;
//   setShowPlanDetails: (show: boolean) => void;
//   setDuration: (duration: string) => void;
//   setMentorUsername: (userName: string) => void;
//   setAppointmentType: (type: "Booking Call" | "Quick Call" | "Chat") => void;
//   resetBooking: () => void;
// }

// export const useBookingStore = create<BookingState>()(
//   persist(
//     (set) => ({
//       selectedTimeSlot: null,
//       selectedDate: null,
//       selectedDuration: "10",
//       mentorUsername: null,
//       showPlanDetails: false,
//       appointmentType: "Booking Call",

//       setSelectedTimeSlot: (time) => set({ selectedTimeSlot: time }),
//       setSelectedDate: (date) => set({ selectedDate: date }),
//       setShowPlanDetails: (show) => set({ showPlanDetails: show }),
//       setDuration: (duration) => set({ selectedDuration: duration }),
//       setMentorUsername: (userName) => set({ mentorUsername: userName }),
//       setAppointmentType: (type) => set({ appointmentType: type }),
//       resetBooking: () =>
//         set({
//           selectedTimeSlot: null,
//           selectedDate: null,
//           selectedDuration: "10",
//           mentorUsername: null,
//           showPlanDetails: false,
//           appointmentType: "Booking Call",
//         }),
//     }),
//     {
//       name: "booking-storage",
//       partialize: (state) => ({
//         selectedDuration: state.selectedDuration,
//         appointmentType: state.appointmentType,
//       }),
//     },
//   ),
// );
