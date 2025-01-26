export interface MentorRequest {
  id: string;
  name: string;
  userName: string;
  designation: string;
  status: "pending" | "approved" | "rejected";
  profileImage: string;
  adminApproval: boolean;
  email: string;
  availability: string;
  specialization: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}

export interface DialogState {
  type: "approve" | "reject" | null;
  mentor: MentorRequest | null;
}

export interface MentorTableProps {
  mentorRequests: MentorRequest[];
  isLoading: boolean;
  onApprove: (mentor: MentorRequest) => void;
  onReject: (mentor: MentorRequest) => void;
}

export interface MentorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  confirmLabel: string;
  confirmVariant: "default" | "destructive";
}
