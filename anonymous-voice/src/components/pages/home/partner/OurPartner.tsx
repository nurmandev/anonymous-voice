"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { PartnersProps } from "./types.partner";

const partners = [
  {
    name: "Axis Bank",
    logo: "/images/axis-bank.png",
    alt: "Axis Bank logo",
  },
  {
    name: "HDFC Bank",
    logo: "/images/hdfc-bank.png",
    alt: "HDFC Bank logo",
  },
  {
    name: "ICICI Bank",
    logo: "/images/icici-bank.png",
    alt: "ICICI Bank logo",
  },
  {
    name: "SBI",
    logo: "/images/sbi-bank.png",
    alt: "SBI logo",
  },
  {
    name: "Kotak Bank",
    logo: "/images/kotak-bank.png",
    alt: "Kotak Bank logo",
  },
  {
    name: "Federal Bank",
    logo: "/images/federal-bank.png",
    alt: "Federal Bank logo",
  },
];

export default function OurPartner({ title }: PartnersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="container w-full mx-auto py-12 md:py-16 space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-violet">
        {title}
      </h2>

      <div className="relative w-[95vw] mx-auto md:w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          className="px-4"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={`${partner.name}-${index}`}>
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-white shadow-md transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl" />
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      // fill
                      width={150}
                      height={150}
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 10vw, (max-width: 768px) 20vw, (max-width: 1024px) 15vw, 12vw"
                      priority={index < 4}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
