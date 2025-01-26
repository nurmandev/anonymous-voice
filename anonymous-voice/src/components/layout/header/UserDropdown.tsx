import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { UserRole } from "@/types/user.types";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

// Define dropdown items for each role
const roleDropdownItems = {
  mentee: [],
  mentor: [
    { label: "Dashboard", href: "/dashboard/booked-calls" },
    // { label: "Settings", href: "/settings" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/mentors" },
    // { label: "Settings", href: "/settings" },
    // { label: "User Management", href: "/admin/users" },
    // { label: "Analytics", href: "/admin/analytics" },
  ],
};

interface UserDropdownProps {
  userRole: {
    role: UserRole;
    logout: () => void;
  };
}

export function UserDropdown({ userRole }: UserDropdownProps) {
  const dropdownItems = roleDropdownItems[userRole.role] || [];
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-soft-paste-light-hover rounded-full p-1 ring-0 focus:ring-0 focus:ring-offset-0 border-0 outline-none"
        >
          <User size={32} className="text-soft-paste-dark" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {userRole.role !== "mentee" ? (
          <DropdownMenuLabel className="capitalize">
            {user?.userName}
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className="capitalize">
            {user?.userName}
          </DropdownMenuLabel>
        )}
        <Separator />
        <DropdownMenuSeparator />

        {dropdownItems.map((item) => (
          <DropdownMenuItem key={item.href}>
            <Link href={item.href} className="w-full text-left">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={userRole.logout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
