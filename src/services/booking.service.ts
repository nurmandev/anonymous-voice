import { BookingSchema, Booking } from "@/types/booking";
import { APIError } from "@/types/error";

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await fetch(
      "https://run.mocky.io/v3/f91d4a28-c79f-4aba-8ee0-64d89351b418",
    );
    if (!response.ok) {
      throw new APIError(
        "Failed to fetch bookings",
        response.status,
        "FETCH_ERROR",
      );
    }
    const data = await response.json();
    return BookingSchema.array().parse(data);
  } catch (error: unknown) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      "Failed to process bookings data",
      500,
      "PROCESSING_ERROR",
    );
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string,
): Promise<void> => {
  const response = await fetch(`/api/bookings/${bookingId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update booking status");
  }
};
