"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { AppointmentService } from "@/services/appointment.service";
import { AppointmentSectionSkeleton } from "../booked-calls/_components/AppointmentSectionSkeleton";
import { AppointmentSection } from "../booked-calls/_components/AppointmentSection";

export default function Messages() {
  const { appointments, isLoading, refetch } = useAppointments();

  console.log("Appointments:", appointments);

  const chatAppointments = appointments.filter(
    (appointment) => appointment.appointmentType === "Chat",
  );

  const appointmentsByStatus = {
    pending: chatAppointments.filter(
      (appointment) => appointment.status === "pending",
    ),
    confirmed: chatAppointments.filter(
      (appointment) => appointment.status === "confirmed",
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
        title="Pending Chats"
        description="Chat requests waiting for approval"
        appointments={appointmentsByStatus.pending}
        appointmentType="Chat"
        onAccept={handleAccept}
        onReject={handleReject}
        emptyMessage="No pending chat requests"
      />

      <AppointmentSection
        title="Confirmed Chats"
        description="Active chat sessions"
        appointments={appointmentsByStatus.confirmed}
        appointmentType="Chat"
        emptyMessage="No confirmed chats"
      />
    </div>
  );
}
