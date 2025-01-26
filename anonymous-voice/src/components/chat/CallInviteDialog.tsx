import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Phone } from "lucide-react";

interface CallInviteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  caller: string;
  callType: "video" | "audio";
  onAccept: () => void;
  onReject: () => void;
}

const CallInviteDialog: React.FC<CallInviteDialogProps> = ({
  isOpen,
  onOpenChange,
  caller,
  callType,
  onAccept,
  onReject,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incoming {callType} Call</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            {callType === "video" ? (
              <Video className="h-4 w-4" />
            ) : (
              <Phone className="h-4 w-4" />
            )}
            {caller} is calling you
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="destructive" onClick={onReject}>
            Decline
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallInviteDialog;
