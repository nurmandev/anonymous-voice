import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatUser } from "@/types/chat.types";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

const UserDetailSheet = ({ user }: { user: ChatUser }) => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <DialogTitle>
          <h3 className="font-semibold text-lg">{user.name}</h3>
        </DialogTitle>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            10 min Call • 3:00 pm
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span className="text-sm text-green-500">Active Now</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-2 pt-4">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
          Completed
        </Button>
        <Button variant="destructive" className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UserDetailSheet;
