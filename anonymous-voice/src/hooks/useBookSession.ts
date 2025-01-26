import { useState } from "react";
import { AxiosError } from "axios";
import { useToast } from "./use-toast";
import { AppointmentPayload } from "@/types/plan";
import { AuthService } from "@/services/auth.service";
import { AppointmentService } from "@/services/appointment.service";
import { BookingError } from "@/services/error-handler";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { calculateValidity, formatDateToLocale } from "@/lib/date";

type AppointmentType = "Booking Call" | "Quick Call" | "Chat";

interface ValidationRule {
  condition: boolean;
  message: string;
}

interface UserInfo {
  userName: string;
  isVerified: boolean;
  role: string;
  userDetails: string;
}

export const useBookSession = () => {
  const { toast } = useToast();
  const router = useRouter();
  const bookingStore = useBookingStore();
  const [isLoading, setIsLoading] = useState(false);

  const getValidationRules = (
    appointmentType: AppointmentType,
  ): ValidationRule[] => {
    const baseRules: ValidationRule[] = [
      {
        condition: !bookingStore.mentorUsername,
        message: "Mentor username is required",
      },
    ];

    if (appointmentType === "Booking Call") {
      return [
        ...baseRules,
        {
          condition: !bookingStore.selectedTimeSlot,
          message: "Time slot must be selected",
        },
        {
          condition: !bookingStore.selectedDate,
          message: "Date must be selected",
        },
      ];
    }

    return baseRules;
  };

  const createAppointmentContent = (
    appointmentType: AppointmentType,
  ): string => {
    if (appointmentType === "Booking Call") {
      return `${appointmentType} on ${bookingStore.selectedDate} at ${bookingStore.selectedTimeSlot} (${bookingStore.selectedDuration} min)`;
    }

    const currentDate = formatDateToLocale(new Date().toISOString());
    const validity = calculateValidity();
    return `${appointmentType} on ${currentDate} (Valid for: ${validity})`;
  };

  const createAppointmentPayload = (
    currentUser: UserInfo,
  ): AppointmentPayload => ({
    appointmentType: bookingStore.appointmentType,
    status:
      bookingStore.appointmentType === "Booking Call" ? "pending" : "confirmed",
    content: createAppointmentContent(bookingStore.appointmentType),
    selectedSlot: {
      time:
        bookingStore.appointmentType === "Booking Call"
          ? bookingStore.selectedTimeSlot!
          : `${bookingStore.selectedDuration} minutes`,
      isAvailable: true,
    },
    mentorUserName: bookingStore.mentorUsername!,
    menteeUserName: currentUser.userName,
  });

  const handleBookingError = (error: unknown) => {
    console.error("Booking Error Caught:", error);

    if (error instanceof AxiosError) {
      console.error("Booking Error Details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during booking";

    toast({
      title: "Booking Failed",
      description: errorMessage,
      variant: "destructive",
    });

    throw error;
  };

  const bookSession = async () => {
    if (isLoading) return null;
    setIsLoading(true);

    try {
      const currentUser = AuthService.getStoredUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (!currentUser.isVerified) {
        currentUser.isVerified = false;
      }

      const validationErrors = getValidationRules(bookingStore.appointmentType)
        .filter((rule) => rule.condition)
        .map((rule) => rule.message);

      if (validationErrors.length > 0) {
        throw new BookingError("VALIDATION_ERROR", validationErrors.join(", "));
      }

      const appointmentPayload = createAppointmentPayload(
        currentUser as UserInfo,
      );
      const response =
        await AppointmentService.createAppointment(appointmentPayload);

      toast({
        title: "Request Sent Successfully!",
        description: `Your ${bookingStore.appointmentType} request has been submitted`,
        duration: 1000,
      });

      return response;
    } catch (error) {
      handleBookingError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { bookSession, isLoading };
};
