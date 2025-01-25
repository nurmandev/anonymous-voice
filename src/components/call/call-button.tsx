"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallButtonProps {
  onPhoneClick: () => void;
}

export function CallButton({ onPhoneClick }: CallButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={onPhoneClick}
    >
      <Phone className="h-5 w-5" />
    </Button>
  );
}
