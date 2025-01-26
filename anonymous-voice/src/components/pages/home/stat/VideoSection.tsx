"use client";

import { PlayCircle } from "lucide-react";
import { VideoSectionProps } from "./types";
import Image from "next/image";

export function VideoSection({ imageUrl, videoUrl }: VideoSectionProps) {
  const handlePlay = () => {
    // Handle video playback logic here
    console.log("Play video:", videoUrl);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-20">
      <div
        className="relative rounded-3xl overflow-hidden aspect-video cursor-pointer group"
        onClick={handlePlay}
      >
        <Image
          src={imageUrl}
          alt="Meditation at sunset"
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity group-hover:bg-black/30">
          <PlayCircle className="w-16 h-16 text-white opacity-90 transition-transform group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
