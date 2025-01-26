import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AppointmentService } from "@/services/appointment.service";
import { useToast } from "@/hooks/use-toast";
import { useAppointments } from "@/hooks/useAppointments";

interface ChatContact {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp?: string;
  isActive?: boolean;
  hasHeart?: boolean;
}

interface UserProfileProps {
  selectedUser: ChatContact;
  onStatusUpdate?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  selectedUser,
  onStatusUpdate,
}) => {
  const [showCompleteDialog, setShowCompleteDialog] = React.useState(false);
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);
  const { refetch } = useAppointments();
  const { toast } = useToast();

  const handleComplete = async () => {
    try {
      await AppointmentService.updateAppointment(selectedUser.id, {
        status: "completed",
      });
      toast({
        title: "Success",
        description: "Appointment marked as completed",
      });
      await refetch();
      onStatusUpdate?.();
      setShowCompleteDialog(false);
    } catch (error) {
      console.error("Failed to complete appointment", error);
      toast({
        title: "Error",
        description: "Failed to complete appointment",
        variant: "destructive",
      });
    }
  };

  const handleCancel = async () => {
    try {
      await AppointmentService.updateAppointment(selectedUser.id, {
        status: "cancelled",
      });
      toast({
        title: "Success",
        description: "Appointment cancelled successfully",
      });
      await refetch();
      onStatusUpdate?.();
      setShowCancelDialog(false);
    } catch (error) {
      console.error("Failed to cancel appointment", error);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="h-full rounded-none border-0">
        <div className="flex flex-col items-center p-6 text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/images/avatar.svg" alt={selectedUser.username} />
            <AvatarFallback>{selectedUser.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span>10 min Call</span>
            <span>•</span>
            <span>3:00 pm</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-500">Active Now</span>
          </div>

          <div className="flex w-[60%] flex-col gap-4 mt-6">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => setShowCompleteDialog(true)}
            >
              Complete
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>

      {/* Complete Dialog */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this appointment as completed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCompleteDialog(false)}
            >
              No, keep it
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleComplete}
            >
              Yes, complete it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              No, keep it
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Yes, cancel it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfile;
