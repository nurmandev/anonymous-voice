"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import Loading from "../loading";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (!loading) {
    if (!user) {
      redirect("/login");
      return null;
    }

    // if (user.role === "mentee") {
    //   redirect("/mentee-profile");
    //   return null;
    // }
  }

  if (loading) {
    return <Loading />;
  }

  return <div className="bg-soft-paste-light">{children}</div>;
}
