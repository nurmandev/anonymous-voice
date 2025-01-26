import { Button } from "@/components/ui/button";
import VideoCard from "./VideoCard";

const videos = [
  {
    title: "Meditation by the Beach",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "/videos/meditation-beach.mp4",
  },
  {
    title: "Understanding Mental Health",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "/videos/mental-health.mp4",
  },
  {
    title: "Forest Meditation",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "/videos/forest-meditation.mp4",
  },
];

export default function VideosSection() {
  return (
    <section className="w-full px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium text-[#86C6C6] mb-12">
          Videos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-[#86C6C6] text-white hover:bg-[#78b7b7] border-0"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}
