import React from "react";

interface QuoteCardProps {
  children: React.ReactNode;
}

export default function QuoteCard({ children }: QuoteCardProps) {
  return (
    <div
      className="bg-soft-paste bg-opacity-80 rounded-xl px-6 py-8 relative overflow-hidden"
      style={{ backgroundImage: "url('/images/header_title_bg.png')" }}
    >
      {/* Decorative Corners */}
      <div className="absolute top-2 left-2 w-6 h-6 text-white">✤</div>
      <div className="absolute bottom-2 right-2 w-6 h-6 text-white">✤</div>

      <p
        className="text-white text-center px-4 font-semibold text-sm md:text-lg"
        dangerouslySetInnerHTML={{ __html: children as string }}
      ></p>
    </div>
  );
}
