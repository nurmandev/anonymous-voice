import { Button } from "@/components/ui/button";
import Image from "next/image";
import { VideoSection } from "../stat/VideoSection";
import { MoveRight } from "lucide-react";

export default function WhyAnonymousVoice() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6 text-center lg:text-start">
            <h2 className="text-2xl lg:text-3xl font-bold text-violet">
              Why Anonymous Voice
            </h2>

            <h2 className="text-lg md:text-4xl font-bold text-soft-paste leading-tight">
              Compassionate Care, Trusted Mental Health Support
            </h2>

            <p className="text-sm opacity-60 md:text-lg leading-relaxed">
              At Anonymous Voice, we believe that every voice deserves to be
              heard, especially when it comes to mental health. We are dedicated
              to creating a safe, supportive space where individuals can seek
              guidance, share their experiences, and find solace without
              judgment. Our team of compassionate professionals is committed to
              providing personalized mental health services that prioritize your
              unique journey. We understand that reaching out for help can be
              daunting, which is why we focus on creating a comfortable and
              confidential environment.
            </p>
            <Button className="bg-soft-paste rounded-md">
              Learn More
              <span className="ml-2">
                <MoveRight />
              </span>
            </Button>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full bg-[#86C6C6]/10" />
              <div className="absolute right-[10%] top-[40%] -translate-y-1/2 w-[140%] aspect-square rounded-full bg-[#9B8ACB]/10" />
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/why-av.png"
                alt="Mental health professionals in a supportive group session"
                className="w-full h-full object-cover"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
      <VideoSection
        imageUrl="/images/why-av-vid.png"
        videoUrl="/meditation-video.mp4"
      />
    </section>
  );
}
