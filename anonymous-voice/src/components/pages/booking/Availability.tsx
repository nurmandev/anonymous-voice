"use client";

import React from "react";
import { TimeSlot } from "@/types/booking";
import { Badge } from "@/components/ui/badge";
import { useBookingStore } from "@/store/useBookingStore";
import { Separator } from "@/components/ui/separator";
import { mockTimeSlots } from "../../../../public/data/availabilitySlots";

interface AvailabilityProps {
  date?: string;
  timeSlots: TimeSlot[];
}

const TimeSlotItem = ({
  slot,
  onSelect,
  isSelected,
}: {
  slot: TimeSlot;
  onSelect: () => void;
  isSelected: boolean;
}) => (
  <div className="flex items-center justify-between gap-2">
    <div className="relative">
      <div className="flex items-center justify-center gap-4 px-6 py-1 border border-soft-paste-light-active rounded-lg text-sm">
        <span className="tracking-wide text-md">{slot.time}</span>
      </div>
    </div>

    <Badge
      className={`px-4 py-1 min-w-32 rounded-md text-white font-semibold ${
        slot.available ? "bg-[#34D399]" : "bg-gray-300"
      }`}
    >
      <span className="text-sm text-center w-full font-medium">
        {slot.available ? "Available" : "Not Available"}
      </span>
    </Badge>

    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => {
        if (slot.available) {
          onSelect();
        }
      }}
      disabled={!slot.available}
      className="w-5 h-5 rounded-none border-gray-300 text-soft-paste-active
        focus:ring-soft-paste-active disabled:opacity-50 cursor-pointer
        checked:bg-soft-paste-active checked:border-soft-paste-active"
    />
  </div>
);

export default function Availability({ timeSlots }: AvailabilityProps) {
  console.log("Time slots: ", timeSlots);
  const { selectedTimeSlot, setSelectedTimeSlot, setSelectedDate } =
    useBookingStore();

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(today);

  const handleSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setSelectedDate(today.toISOString());
  };

  return (
    <div className="w-full mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-soft-paste text-lg font-normal">Availability</h2>
        <span className="text-sm font-normal">{formattedDate}</span>
      </div>

      <Separator className="bg-soft-paste" />

      <div className="space-y-4">
        {mockTimeSlots.length > 0 ? (
          mockTimeSlots.map((slot, index) => (
            <TimeSlotItem
              key={index}
              slot={slot}
              onSelect={() => handleSlotSelect(slot.time)}
              isSelected={selectedTimeSlot === slot.time}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-xs">
            No time slots available.
          </p>
        )}
      </div>
    </div>
  );
}
