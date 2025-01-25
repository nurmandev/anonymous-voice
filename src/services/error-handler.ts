import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export class BookingError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "BookingError";
  }
}

export function handleBookingError(error: Error | AxiosError): BookingError {
  if (axios.isAxiosError(error)) {
    return new BookingError(
      error.response?.status?.toString() || "UNKNOWN",
      error.response?.data?.message || error.message,
      error.response?.data,
    );
  }
  return new BookingError("UNKNOWN", "An unexpected error occurred", error);
}

export const handleAuthError = (error: unknown) => {
  let errorMessage = "Authentication failed. Please try again.";

  if (error instanceof Error) {
    errorMessage = error.message;
    console.error("Auth Error:", {
      message: error.message,
      stack: error.stack,
    });
  } else {
    console.error("Unknown Auth Error:", error);
  }

  toast.error(errorMessage);
  return errorMessage;
};
