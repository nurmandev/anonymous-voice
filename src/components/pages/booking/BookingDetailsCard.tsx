"use client";

import Image from "next/image";
import { Star, Clock, Users, Award } from "lucide-react";
import { TimeSlot } from "@/types/booking";
import Availability from "./Availability";
import { Card } from "@/components/ui/card";
// import { useBookingStore } from "@/store/useBookingStore";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

interface BookingDetailsProps {
  showAvailability?: boolean;
  name: string;
  userName: string;
  title: string;
  profileImage?: string;
  yearsExperience: number;
  bookingsCompleted: number;
  expertise: { name: string }[];
  description: string;
  date: string;
  timeSlots: TimeSlot[];
}

const ProfileSection = ({
  name,
  title,
  // profileImage,
  yearsExperience,
  bookingsCompleted,
  expertise,
  description,
}: BookingDetailsProps) => (
  <div className="flex-1 flex flex-col justify-between lg:w-4/6">
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="w-2/5 bg-muted-foreground/20 rounded-lg overflow-hidden shrink-0 h-full">
        <Image
          src="/images/avatar.png"
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover text-xs"
        />
      </div>

      <div className="w-3/5 flex flex-col justify-start gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground mt-0.5">{title}</p>
        </div>

        <div>
          <div className="flex gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-soft-paste fill-softptext-soft-paste"
              />
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-soft-paste" />
              <span className="text-sm text-muted-foreground">
                {yearsExperience}+ Years experience
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-soft-paste" />
              <span className="text-sm text-muted-foreground">
                Session Completed ({bookingsCompleted}+)
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {expertise?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-softptext-soft-paste/10 rounded-md"
              >
                <Award className="w-3.5 h-3.5 text-soft-paste" />
                <span className="text-sm text-soft-paste">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* <div className="flex gap-3 mt-6">
      <button className="flex-1 h-11 bg-softptext-soft-paste text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#6BBBBB] transition-colors">
        Book Call
      </button>
      <button className="flex-1 h-11 bg-[#B4A5E8] text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#A394D7] transition-colors">
        <MessageCircle className="w-4 h-4" />
        Chat
      </button>
    </div> */}
    <div>
      <p className="text-sm text-muted-foreground leading-relaxed mt-4 pr-6">
        {description}
      </p>
    </div>
  </div>
);

export default function BookingDetailsCard({
  showAvailability = false,
  ...props
}: BookingDetailsProps) {
  return (
    <Card className="w-full border">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileSection {...props} />

          <div className="lg:w-2/6">
            {showAvailability && (
              <Availability date={props.date} timeSlots={props.timeSlots} />
            )}
          </div>

          {/* <div className="flex gap-3 mt-4">
              <Button
                onClick={handleProceedToBook}
                disabled={!selectedTimeSlot}
                className={`flex-1 h-11 rounded-md flex items-center justify-center gap-2 transition-colors
                  ${selectedTimeSlot
                    ? "bg-softptext-soft-paste hover:bg-[#6BBBBB] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {isBooked ? (
                  <>
                    <CheckCheck className="w-4 h-4" />
                    <span>Slot Booked</span>
                  </>
                ) : selectedTimeSlot ? (
                  "Proceed to Book"
                ) : (
                  "Select Time Slot"
                )}
              </Button>
            </div> */}
        </div>
      </div>
    </Card>
  );
}
