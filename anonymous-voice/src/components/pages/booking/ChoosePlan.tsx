"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/useBookingStore";
import { useBookingLogic } from "@/hooks/booking/useBookingLogic";
import { PlanField } from "./_components/PlanField";
import { formatDateToLocale } from "@/lib/date";
import { AppointmentType, SessionConfig } from "@/types/booking";
import { BookingConfirmationDialog } from "./_components/ConfirmationDialog";

interface ChoosePlanProps {
  mentorUsername: string;
  sessionType: AppointmentType;
  sessionConfig: SessionConfig;
}

export default function ChoosePlan({
  mentorUsername,
  sessionType,
  sessionConfig,
}: ChoosePlanProps) {
  const {
    duration,
    isLoading,
    showConfirmDialog,
    setShowConfirmDialog,
    handleDurationChange,
    handleConfirmBooking,
    isBookingDisabled,
  } = useBookingLogic(mentorUsername, sessionType);
  const setMentorUsername = useBookingStore((state) => state.setMentorUsername);
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot);
  const selectedDate = useBookingStore((state) => state.selectedDate);

  useEffect(() => {
    setMentorUsername(mentorUsername);
  }, [mentorUsername, setMentorUsername]);

  return (
    <div className="w-full my-10">
      <h1 className="text-center text-xl md:text-2xl font-bold text-violet-hover mb-8">
        Choose Plan
      </h1>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-end">
          {sessionConfig.requiresDuration && (
            <PlanField
              label="Duration"
              value={`${duration} min`}
              onDurationChange={handleDurationChange}
              hasDropdown={true}
            />
          )}
          {sessionConfig.requiresTimeSlot && (
            <PlanField label="Time" value={selectedTimeSlot || "Select time"} />
          )}
          {sessionConfig.requiresDate && (
            <PlanField label="Date" value={formatDateToLocale(selectedDate)} />
          )}
          <Button
            onClick={() => setShowConfirmDialog(true)}
            disabled={isBookingDisabled}
          >
            Book {sessionType}
          </Button>

          <BookingConfirmationDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleConfirmBooking}
            sessionType={sessionType}
            duration={duration}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
