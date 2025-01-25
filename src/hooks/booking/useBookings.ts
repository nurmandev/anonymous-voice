import { useState, useEffect } from "react";
import type { Booking } from "@/types/booking";
import { updateBookingStatus } from "@/services/booking.service";

interface UseBookingsReturn {
  pendingBookings: Booking[];
  confirmedBookings: Booking[];
  completedBookings: Booking[];
  cancelledBookings: Booking[];
  loading: boolean;
  error: Error | null;
  handleAccept: (bookingId: string, appointmentType: string) => Promise<void>;
  handleReject: (bookingId: string) => Promise<void>;
  handleChat: (bookingId: string) => Promise<void>;
  refreshBookings: () => Promise<void>;
}

export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://run.mocky.io/v3/f91d4a28-c79f-4aba-8ee0-64d89351b418",
      );
      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId: string, appointmentType: string) => {
    try {
      const status =
        appointmentType === "chat" || appointmentType === "quick-call"
          ? "confirmed"
          : "pending";

      await updateBookingStatus(bookingId, status);
      await refreshBookings();
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "cancelled");
      refreshBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChat = async (bookingId: string) => {
    console.log("Opening chat for booking:", bookingId);
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  return {
    pendingBookings: bookings.filter((booking) => booking.status === "pending"),
    confirmedBookings: bookings.filter(
      (booking) => booking.status === "confirmed",
    ),
    completedBookings: bookings.filter(
      (booking) => booking.status === "completed",
    ),
    cancelledBookings: bookings.filter(
      (booking) => booking.status === "cancelled",
    ),
    loading,
    error,
    handleAccept,
    handleReject,
    handleChat,
    refreshBookings,
  };
}
