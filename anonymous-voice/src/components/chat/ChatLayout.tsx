import React from "react";

export const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex">{children}</div>
    </div>
  );
};
