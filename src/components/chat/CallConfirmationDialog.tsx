import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CallConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedUser: { username: string } | null;
  handleConfirmCall: () => void;
}

const CallConfirmationDialog: React.FC<CallConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  handleConfirmCall,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a Call</DialogTitle>
        </DialogHeader>
        <p>Do you want to start a call with {selectedUser?.username}?</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmCall}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallConfirmationDialog;
