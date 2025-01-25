import React from "react";
import { Footer } from "@/components/layout";
import Header from "@/components/layout/header/Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
