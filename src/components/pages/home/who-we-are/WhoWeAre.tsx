"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhoWeAreProps {
  image: string;
  altImg: string;
  title: string;
  subtitle: string;
  description: string;
  extendedDescription?: string;
  buttonText: string;
  onLearnMore?: () => void;
}

const whoWeAreData: WhoWeAreProps = {
  image: "/images/who-we-are.png",
  altImg: "Who We Are",
  title: "Who We Are",
  subtitle: "Committed to Your Mental Wellness with Compassionate Care",
  description:
    "At Anonymous Voice, we believe that every voice deserves to be heard, especially when it comes to mental health. We are dedicated to creating a safe, supportive space where individuals can seek guidance, share their experiences, and find solace without judgment.",
  extendedDescription:
    "Our team of compassionate professionals is committed to providing personalized mental health services that prioritize your unique journey. We understand that reaching out for help can be daunting, which is why we focus on creating a comfortable and confidential environment.",
  buttonText: "Learn More",
  onLearnMore: () => {},
};

export default function WhoWeAre() {
  const {
    image,
    altImg,
    title,
    subtitle,
    description,
    extendedDescription,
    // buttonText,
    // onLearnMore,
  } = whoWeAreData;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-12 space-y-10 overflow-hidden">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-violet-dark text-center"
        {...fadeIn}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>

      {/* Chat Icon - Only visible on larger screens */}
      <motion.div
        className="absolute top-4 right-4 border-2 border-soft-paste-hover bg-soft-paste p-1 rounded-full"
        {...fadeIn}
        transition={{ delay: 0.8 }}
      >
        <MessageCircle className="w-6 h-6 text-soft-paste-light" />
      </motion.div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center lg:space-x-12 gap-6">
        {/* Image Container */}
        <motion.div
          className="relative w-full lg:w-1/2 aspect-[4/2] lg:aspect-[12/7] max-w-2xl rounded-2xl overflow-hidden bg-violet-200 p-2"
          {...fadeIn}
        >
          <Image
            src={image}
            alt={altImg}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text Content Container */}
        <div className="flex-1 space-y-4">
          <motion.h3
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-soft-paste-dark text-center lg:text-left"
            {...fadeIn}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.h3>

          <motion.p
            className="text-sm text-center lg:text-left text-muted-foreground font-normal"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>

          <motion.p
            className="text-sm text-center lg:text-left text-muted-foreground font-normal"
            {...fadeIn}
            transition={{ delay: 0.5 }}
          >
            {extendedDescription}
          </motion.p>

          {/* <motion.div
            className="flex justify-center lg:justify-start"
            {...fadeIn}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onLearnMore}
              className="bg-soft-paste text-white px-8 py-2 rounded-lg transition-colors"
            >
              {buttonText} →
            </Button>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
