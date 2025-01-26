"use client";

import TitleHeader from "@/components/common/TitleHeader";
import WhatToExpect from "@/components/pages/howitworks/WhatToExpect";
import { motion } from "framer-motion";
import {
  User,
  HandshakeIcon,
  MessageSquare,
  FileText,
  Heart,
} from "lucide-react";
import Image from "next/image";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up / Log In",
    description:
      "Create a free, anonymous account in a few easy steps, to get full access.",
    icon: <User className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Connect with a Volunteer",
    description: "Get matched with a trained volunteer based on your needs.",
    icon: <HandshakeIcon className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Begin Your Journey",
    description:
      "Start conversations and receive compassionate mental health support.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Access Resources",
    description: "Browse articles, mental health resources, and helpful tools.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Get Ongoing Support",
    description:
      "Continue your journey with ongoing volunteer support or expert referrals.",
    icon: <Heart className="w-6 h-6" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="w-full bg-[url('/images/watermark_bg.png')] bg-cover bg-center">
        <TitleHeader title="Easy Steps to Access Support" />

        <div className="container max-w-2xl mx-auto px-4 py-12">
          {/* Subtitle */}
          <div className="text-center mb-8">
            <h3 className="text-violet text-2xl font-bold mb-4">
              Step-by-Step Guideline
            </h3>
            <div className="inline-flex items-center bg-soft-paste rounded-full px-6 py-2 text-white gap-4">
              Follow These Simple Steps
              <Image
                src="/images/arrow_hand.png"
                alt="Arrow Hand"
                width={10}
                height={10}
              />
            </div>
          </div>

          {/* Steps */}
          <motion.div
            className="space-y-12 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center space-y-4"
                variants={itemVariants}
              >
                <div className="rounded-lg border-2 border-[#A393EB] px-6 py-1 text-[#A393EB] font-medium mb-4">
                  Step {step.id}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#8CD7D0]/20 flex items-center justify-center text-[#8CD7D0]">
                    {step.icon}
                  </div>
                  <h4 className="text-base font-bold text-gray-800">
                    {step.title}
                  </h4>
                </div>

                <p className="text-sm text-muted-foreground max-w-md">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section>
        <WhatToExpect />
      </section>
    </div>
  );
}
