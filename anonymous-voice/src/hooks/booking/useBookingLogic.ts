import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { useBookSession } from "@/hooks/useBookSession";
import { AppointmentType } from "@/types/booking";

export const useBookingLogic = (
  mentorUsername: string,
  sessionType: AppointmentType,
) => {
  const router = useRouter();
  const bookingStore = useBookingStore();
  const setMentorUsername = useBookingStore((state) => state.setMentorUsername);
  const setAppointmentType = useBookingStore(
    (state) => state.setAppointmentType,
  );
  const { bookSession, isLoading } = useBookSession();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setMentorUsername(mentorUsername);
    setAppointmentType(
      sessionType === "Booking Call"
        ? "Booking Call"
        : sessionType === "Quick Call"
          ? "Quick Call"
          : "Chat",
    );
  }, [mentorUsername, sessionType, setMentorUsername, setAppointmentType]);

  const handleDurationChange = (value: string) => {
    bookingStore.setDuration(value);
  };

  const handleConfirmBooking = async () => {
    const response = await bookSession();
    if (response?.data?.data._id) {
      setShowConfirmDialog(false);
      bookingStore.resetBooking();
      router.push(`/booking/confirmation?id=${response.data.data._id}`);
    }
  };

  const isBookingDisabled = useMemo(() => {
    if (!bookingStore.mentorUsername) return true;

    return sessionType === "Booking Call"
      ? !bookingStore.selectedTimeSlot || !bookingStore.selectedDate
      : false;
  }, [
    sessionType,
    bookingStore.mentorUsername,
    bookingStore.selectedTimeSlot,
    bookingStore.selectedDate,
  ]);

  return {
    duration: bookingStore.selectedDuration,
    isLoading,
    showConfirmDialog,
    setShowConfirmDialog,
    handleDurationChange,
    handleConfirmBooking,
    isBookingDisabled,
  };
};
