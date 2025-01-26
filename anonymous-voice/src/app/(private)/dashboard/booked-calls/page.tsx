"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { AppointmentService } from "@/services/appointment.service";
import { AppointmentSection } from "./_components/AppointmentSection";
import { AppointmentSectionSkeleton } from "./_components/AppointmentSectionSkeleton";

export default function BookedCallsPage() {
  const { appointments, isLoading, refetch } = useAppointments();

  const bookingCallAppointments = appointments.filter(
    (appointment) => appointment.appointmentType === "Booking Call",
  );

  const appointmentsByStatus = {
    pending: bookingCallAppointments.filter(
      (appointment) => appointment.status === "pending",
    ),
    confirmed: bookingCallAppointments.filter(
      (appointment) => appointment.status === "confirmed",
    ),
    completed: bookingCallAppointments.filter(
      (appointment) => appointment.status === "completed",
    ),
    cancelled: bookingCallAppointments.filter(
      (appointment) => appointment.status === "cancelled",
    ),
  };

  const handleAccept = async (appointmentId: string) => {
    await AppointmentService.updateAppointment(appointmentId, {
      status: "confirmed",
    });
    refetch();
  };

  const handleReject = async (appointmentId: string) => {
    await AppointmentService.updateAppointment(appointmentId, {
      status: "cancelled",
    });
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <AppointmentSectionSkeleton />
        <AppointmentSectionSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AppointmentSection
        title="User Request"
        description="Pending call requests from users"
        appointments={appointmentsByStatus.pending}
        appointmentType="Booking Call"
        onAccept={handleAccept}
        onReject={handleReject}
        emptyMessage="No pending requests"
      />

      {/* <AppointmentSection
        title="Confirmed User"
        description="List of confirmed and running calls"
        appointments={appointmentsByStatus.confirmed}
        appointmentType="Booking Call"
        emptyMessage="No confirmed bookings"
      /> */}

      {/* <AppointmentSection
        title="Completed Calls"
        description="List of completed calls"
        appointments={appointmentsByStatus.completed}
        emptyMessage="No completed bookings"
      />

      <AppointmentSection
        title="Cancelled Calls"
        description="List of cancelled calls"
        appointments={appointmentsByStatus.cancelled}
        emptyMessage="No cancelled bookings"
      /> */}
    </div>
  );
}
