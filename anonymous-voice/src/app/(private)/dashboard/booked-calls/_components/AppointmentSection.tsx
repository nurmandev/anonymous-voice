import React from "react";
import { BookingCallsCard } from "@/components/cards/BookingCallsCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/store/useChatStore";

interface Appointment {
  _id: string;
  appointmentType: string;
  status: string;
  menteeUserName: string;
  menteeEmail?: string;
  selectedSlot: { time: string }[];
  createdAt: string;
  updatedAt: string;
}

interface AppointmentSectionProps {
  title: string;
  description: string;
  appointments: Appointment[];
  appointmentType: string;
  onAccept?: (id: string) => Promise<void>;
  onReject?: (id: string) => Promise<void>;
  emptyMessage: string;
}

const mapApiStatusToBookingStatus = (
  status: string,
): "pending" | "confirmed" | "completed" | "cancelled" | "running" => {
  switch (status.toLowerCase()) {
    case "pending":
      return "pending";
    case "confirmed":
      return "confirmed";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    case "running":
      return "running";
    default:
      return "pending";
  }
};

export const AppointmentSection = ({
  title,
  description,
  appointments,
  appointmentType,
  onAccept,
  onReject,
  emptyMessage,
}: AppointmentSectionProps) => {
  const router = useRouter();
  const setChatUser = useChatStore((state) => state.setActiveUser);
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.appointmentType === appointmentType,
  );

  const handleChat = async (appointment: Appointment) => {
    const chatUser = {
      id: appointment._id,
      name: appointment.menteeUserName,
      avatar: "/placeholder.svg",
      status: "online",
      lastActive: "9m ago",
      email: appointment.menteeEmail || "",
    };
    setChatUser(chatUser);
    setActiveRoom(appointment._id);
    router.push(`/chat/${appointment._id}`);
    console.log("Starting chat for:", appointment._id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <BookingCallsCard
              key={appointment._id}
              booking={{
                id: appointment._id,
                status: mapApiStatusToBookingStatus(appointment.status),
                user: {
                  id: appointment.menteeUserName,
                  username: appointment.menteeUserName,
                  name: appointment.menteeUserName,
                  email: appointment.menteeEmail || "",
                  avatarUrl: null,
                },
                schedule: appointment.selectedSlot[0].time,
                duration: "30",
                createdAt: appointment.createdAt,
                updatedAt: appointment.updatedAt,
              }}
              onAccept={onAccept}
              onReject={onReject}
              onChat={
                appointment.status === "confirmed"
                  ? () => handleChat(appointment)
                  : undefined
              }
              isPending={appointment.status === "pending"}
            />
          ))}
          {filteredAppointments.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              {emptyMessage}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
