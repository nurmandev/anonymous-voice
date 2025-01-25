import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/useBookingStore";
import { useBookSession } from "@/hooks/useBookSession";
import { useRouter } from "next/navigation";

export function SessionConfirmDialog() {
  const router = useRouter();
  const bookingStore = useBookingStore();
  const { bookSession, isLoading } = useBookSession();

  const getSessionDetails = () => {
    switch (bookingStore.appointmentType) {
      case "Chat":
        return {
          title: "Start Chat Session",
          description: "Start an instant chat session",
          buttonText: "Start Chat",
        };
      case "Quick Call":
        return {
          title: "Start Quick Call",
          description: "Start an instant voice call",
          buttonText: "Start Call",
        };
      default:
        return {
          title: "Start Session",
          description: "Start your session",
          buttonText: "Start",
        };
    }
  };

  const sessionDetails = getSessionDetails();

  const handleConfirm = async () => {
    try {
      const response = await bookSession();
      bookingStore.setShowPlanDetails(false);

      if (response && response.data) {
        router.push(
          `/booking/confirmation?status=${response.data.data.status}&user=${response.data.data.menteeUserName}&booking_id=${response.data.data._id}`,
        );
      }
    } catch (error) {
      console.error("Session creation failed:", error);
    }
  };

  return (
    <Dialog
      open={bookingStore.showPlanDetails}
      onOpenChange={bookingStore.setShowPlanDetails}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sessionDetails.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            {sessionDetails.description} with {bookingStore.mentorUsername}
          </p>
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive confirmation details after submission
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => bookingStore.setShowPlanDetails(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#B4A5E8] hover:bg-[#A394D7]"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : sessionDetails.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
