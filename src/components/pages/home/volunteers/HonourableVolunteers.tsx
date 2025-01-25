"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Volunteer = {
  id: number;
  name: string;
  title: string;
  image: string;
};

const volunteers: Volunteer[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    title: "Volunteer",
    image: "/images/sarah.png",
  },
  {
    id: 2,
    name: "John Martinez",
    title: "Volunteer",
    image: "/images/john.png",
  },
  {
    id: 3,
    name: "Emily Chen",
    title: "Volunteer",
    image: "/images/emily.png",
  },
  {
    id: 4,
    name: "Michael Patel",
    title: "Volunteer",
    image: "/images/michael.png",
  },
];

export default function HonourableVolunteers() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="container w-full mx-auto py-12 md:py-16 space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-start text-soft-paste">
        Honourable Volunteers
      </h2>

      <div className="relative w-[95vw] mx-auto md:w-full">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            bulletActiveClass: "bg-violet opacity-100",
            bulletClass:
              "inline-block w-2 h-2 rounded-full bg-gray-300 mx-1 cursor-pointer transition-all duration-300",
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="px-4 pb-12"
        >
          {volunteers.map((volunteer) => (
            <SwiperSlide key={volunteer.id} className="">
              <motion.div
                // initial={{ opacity: 0, scale: 0.9 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full h-48  rounded-3xl overflow-hidden">
                  <Image
                    src={volunteer.image}
                    alt={volunteer.name}
                    fill
                    className="object-cover"
                    priority={volunteer.id <= 4}
                  />
                </div>
                <h4 className="mt-4 font-semibold">{volunteer.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {volunteer.title}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="bg-soft-paste text-white font-semibold border-none"
          size="lg"
        >
          See More
        </Button>
      </div> */}
    </section>
  );
}
