"use client";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row flex-1 gap-4 min-h-screen">
      <div className="sticky top-0 left-0 hidden w-60 flex-col border-r bg-white md:flex">
        <DashboardSidebar />
      </div>
      <div className="flex-1 px-4">
        <DashboardHeader />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}
