import { PlayCircle } from "lucide-react";
import Image from "next/image";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  videoUrl: string;
}

export default function VideoCard({
  thumbnail,
  title,
  // videoUrl,
}: VideoCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-video">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          layout="fill"
        />
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <PlayCircle className="w-12 h-12 text-white opacity-90 transition-transform group-hover:scale-110" />
      </div>
    </div>
  );
}
