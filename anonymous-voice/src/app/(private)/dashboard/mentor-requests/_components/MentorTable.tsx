import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { MentorTableProps } from "@/types/mentor.types";
import { LoadingTableRow } from "./LoadingTableRow";

export const MentorTable = ({
  mentorRequests,
  isLoading,
  onApprove,
  onReject,
}: MentorTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Designation</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <LoadingTableRow key={index} />
        ))
      ) : !mentorRequests.length ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center text-gray-500 py-8">
            No mentor requests found
          </TableCell>
        </TableRow>
      ) : (
        mentorRequests.map((mentor) => (
          <TableRow key={mentor.id}>
            <TableCell className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={mentor.profileImage} alt={mentor.name} />
                <AvatarFallback>{mentor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{mentor.name}</p>
                <p className="text-xs text-muted-foreground">{mentor.email}</p>
              </div>
            </TableCell>
            <TableCell>{mentor.designation}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                  onClick={() => onApprove(mentor)}
                  disabled={mentor.adminApproval}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Approve</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onReject(mentor)}
                  disabled={mentor.adminApproval}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Reject</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);
