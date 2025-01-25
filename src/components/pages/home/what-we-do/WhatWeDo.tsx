"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface TrainingStep {
  title: string;
  description: string;
}

interface WhatWeDoProps {
  title: string;
  subtitle: string;
  description: string;
  videoThumbnail: string;
  trainingSteps: TrainingStep[];
}

const whatWeDoData: WhatWeDoProps = {
  title: "What We Do",
  subtitle: "How Our Volunteers Are Trained",
  description:
    "A short paragraph introducing the work done by volunteers, highlighting the training they receive and how that equips them to help users.",
  videoThumbnail: "/images/what-we-do.png",
  trainingSteps: [
    {
      title: "Initial Screening",
      description:
        "Background checks, interviews, and mental health evaluations.",
    },
    {
      title: "Comprehensive Training",
      description:
        "Courses on mental health, empathy training, and crisis handling.",
    },
    {
      title: "Ongoing Education",
      description:
        "Continuous learning through workshops and mental health experts.",
    },
  ],
};

export default function WhatWeDo() {
  const { title, subtitle, description, videoThumbnail, trainingSteps } =
    whatWeDoData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const renderTrainingSteps = () => (
    <ul className="space-y-6">
      {trainingSteps.map((step, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="flex items-start gap-4"
        >
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold">{step.title}:</h4>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-violet">{title}</h2>
            <h3 className="text-xl md:text-3xl font-bold text-soft-paste">
              {subtitle}
            </h3>
          </div>

          <p className="text-muted-foreground lg:hidden text-sm">
            {description}
          </p>

          <div className="relative aspect-video rounded-2xl overflow-hidden lg:hidden">
            <Image
              src={videoThumbnail}
              alt="Volunteer training video thumbnail"
              fill
              className="object-cover"
              priority
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
            </button>
          </div>

          <div className="hidden lg:block">
            <p className="text-muted-foreground max-w-prose mb-8">
              {description}
            </p>
            {renderTrainingSteps()}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hidden lg:block">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={videoThumbnail}
              alt="Volunteer training video thumbnail"
              fill
              className="object-cover"
              priority
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
              aria-label="Play video"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <Play className="w-10 h-10 text-primary ml-1" />
              </div>
            </button>
          </div>
        </motion.div>

        <div className="lg:hidden">{renderTrainingSteps()}</div>
      </motion.div>
    </section>
  );
}
