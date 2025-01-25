import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { useBookSession } from "@/hooks/useBookSession";
import { useToast } from "@/hooks/use-toast";

export const useBookingFlow = (mentorUsername: string) => {
  const router = useRouter();
  const { toast } = useToast();
  const { bookSession, isLoading } = useBookSession();
  const bookingStore = useBookingStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  console.log("[useBookingFlow] mentorUsername: ", mentorUsername);

  const handleConfirmBooking = useCallback(async () => {
    try {
      const response = await bookSession();
      if (response?.data?.data._id) {
        bookingStore.resetBooking();
        router.push(
          `/booking/confirmation?status=${response.data.data.status}&user=${response.data.data.menteeUserName}&booking_id=${response.data.data._id}`,
        );
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to complete your booking. Please try again.",
        variant: "destructive",
      });
      console.error("Booking failed:", error);
    } finally {
      setShowConfirmDialog(false);
    }
  }, [bookSession, bookingStore, router, toast]);

  return {
    isLoading,
    showConfirmDialog,
    setShowConfirmDialog,
    handleConfirmBooking,
    isBookingDisabled:
      isLoading || !bookingStore.selectedTimeSlot || !bookingStore.selectedDate,
  };
};
