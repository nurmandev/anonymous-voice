"use client";

import { useState } from "react";
import { useMentorRequests } from "@/hooks/useMentorRequests";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogState } from "@/types/mentor.types";
import { MentorTable } from "./ _components/MentorTable";
import { MentorDialog } from "./ _components/MentorDialog";

export default function MentorRequests() {
  const {
    mentorRequests,
    isLoading,
    error,
    approveMentor,
    rejectMentor,
    refetch,
  } = useMentorRequests();
  const [dialogState, setDialogState] = useState<DialogState>({
    type: null,
    mentor: null,
  });

  const handleAction = async (type: "approve" | "reject") => {
    if (!dialogState.mentor) return Promise.resolve();

    try {
      if (type === "approve") {
        await approveMentor(dialogState.mentor.userName);
      } else {
        await rejectMentor(dialogState.mentor.id);
      }
      await refetch();
    } catch (error) {
      console.error(`Failed to ${type} mentor:`, error);
    } finally {
      setDialogState({ type: null, mentor: null });
    }

    return Promise.resolve();
  };

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-lg text-soft-paste-dark font-bold">
          {isLoading ? <Skeleton className="h-8 w-48" /> : "Mentor Requests"}
        </h1>
      </header>

      <div className="border rounded-sm">
        <MentorTable
          mentorRequests={mentorRequests}
          isLoading={isLoading}
          onApprove={(mentor) => setDialogState({ type: "approve", mentor })}
          onReject={(mentor) => setDialogState({ type: "reject", mentor })}
        />
      </div>

      <MentorDialog
        open={Boolean(dialogState.type)}
        onOpenChange={(open) =>
          !open && setDialogState({ type: null, mentor: null })
        }
        title={`${dialogState.type === "approve" ? "Approve" : "Reject"} Mentor Request`}
        description={
          dialogState.type === "approve"
            ? `Are you sure you want to approve ${dialogState.mentor?.name} as a mentor? They will gain access to mentor features on the platform.`
            : `Are you sure you want to reject ${dialogState.mentor?.name}'s mentor request? This action cannot be undone.`
        }
        onConfirm={() => handleAction(dialogState.type as "approve" | "reject")}
        confirmLabel={dialogState.type === "approve" ? "Approve" : "Reject"}
        confirmVariant={
          dialogState.type === "approve" ? "default" : "destructive"
        }
      />
    </div>
  );
}
