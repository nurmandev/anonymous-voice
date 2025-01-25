import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatUser } from "@/types/chat.types";

const CallInterface = ({ user }: { user: ChatUser }) => {
  return (
    <Card className="hidden lg:block lg:w-1/4 rounded-none border-l p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h3 className="font-medium">{user.name}</h3>
          <div className="text-sm text-muted-foreground">
            10 min Call • 3:00 pm
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span className="text-sm text-green-500">Active Now</span>
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
    </Card>
  );
};

export default CallInterface;
