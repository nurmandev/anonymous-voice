import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/types/booking";

interface StatusBadgeProps {
  status: BookingStatus;
}

const statusConfig: Record<BookingStatus, { color: string; label: string }> = {
  pending: { color: "bg-gray-500", label: "Pending" },
  running: { color: "bg-yellow-500", label: "Running" },
  confirmed: { color: "bg-purple-500", label: "Confirmed" },
  completed: { color: "bg-green-500", label: "Completed" },
  cancelled: { color: "bg-red-500", label: "Cancelled" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="secondary" className={`${config.color} text-white`}>
      {config.label}
    </Badge>
  );
}
