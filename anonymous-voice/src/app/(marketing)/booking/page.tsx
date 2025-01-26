"use client";

import Loading from "@/app/loading";
import BookingDetailsCard from "@/components/pages/booking/BookingDetailsCard";
import ChoosePlan from "@/components/pages/booking/ChoosePlan";
import useVolunteers from "@/hooks/useVolunteers";
import { AppointmentType, SESSION_CONFIG } from "@/types/booking";
import { Volunteer } from "@/types/volunteer";
import { useSearchParams } from "next/navigation";

const DEFAULT_SESSION_TYPE: AppointmentType = "Booking Call";

export default function Booking() {
  const { volunteers, loading } = useVolunteers<Volunteer[]>();
  const searchParams = useSearchParams();
  const mentorUserName = searchParams.get("mentor") || "";

  // Get the session type with a fallback
  const rawType = searchParams.get("type") || "";
  const sessionType = Object.keys(SESSION_CONFIG).includes(rawType)
    ? (rawType as AppointmentType)
    : DEFAULT_SESSION_TYPE;

  const sessionConfig = SESSION_CONFIG[sessionType];
  console.log("Session Type:", sessionType);
  console.log("Session Config:", sessionConfig);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto mt-4 px-2">
      {volunteers.slice(0, 1).map((volunteer) => (
        <BookingDetailsCard
          key={volunteer.id}
          {...volunteer}
          showAvailability={sessionConfig?.requiresTimeSlot ?? true}
        />
      ))}
      <ChoosePlan
        mentorUsername={mentorUserName}
        sessionType={sessionType}
        sessionConfig={sessionConfig}
      />
    </div>
  );
}
