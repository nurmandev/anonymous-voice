import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateToLocale } from "@/lib/date";
import { useBookingStore } from "@/store/useBookingStore";
import { AppointmentType } from "@/types/booking";

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionType: AppointmentType;
  duration: string;
  isLoading: boolean;
}

export const BookingConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  sessionType,
  duration,
  isLoading,
}: BookingConfirmationProps) => {
  const bookingStore = useBookingStore();

  const getDialogDescription = () => {
    if (sessionType === "Booking Call") {
      return `You are about to book a ${duration} minute call on ${formatDateToLocale(bookingStore.selectedDate)} at ${bookingStore.selectedTimeSlot}`;
    }
    return `You are about to start a ${duration} minute ${sessionType.toLowerCase()} session`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm {sessionType}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-soft-paste hover:bg-soft-paste-active"
          >
            {isLoading ? "Confirming..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { AppointmentType } from "@/types/booking";

// interface BookingConfirmationProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   sessionType: AppointmentType;
//   duration: string;
//   isLoading: boolean;
// }

// export const BookingConfirmationDialog = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   sessionType,
//   duration,
//   isLoading,
// }: BookingConfirmationProps) => (
//   <Dialog open={isOpen} onOpenChange={onClose}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Confirm {sessionType}</DialogTitle>
//         <DialogDescription>
//           You are about to book a {duration} minute {sessionType.toLowerCase()}
//         </DialogDescription>
//       </DialogHeader>
//       <DialogFooter>
//         <Button variant="outline" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button
//           onClick={onConfirm}
//           disabled={isLoading}
//           className="bg-soft-paste hover:bg-soft-paste-active"
//         >
//           {isLoading ? "Confirming..." : "Confirm Booking"}
//         </Button>
//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
// );
