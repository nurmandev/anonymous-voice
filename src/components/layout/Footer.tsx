"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import api from "@/config/axios.config";
import { AxiosError } from "axios";

// Newsletter subscription schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Footer() {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    // { href: "/crisis", label: "Crisis" },
    { href: "/privacy", label: "Privacy & Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await api.post("/newsletter/subscribe", {
        email: data.email,
      });

      toast({
        title: "Subscription Successful",
        description: "You've been added to our newsletter.",
      });

      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Subscription Failed",
          description:
            error.response?.data?.message || "Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "An unknown error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <footer className="w-full bg-violet text-white">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="mb-12">
          <Image
            src="/images/av.png"
            alt="Anonymous Voice"
            width={60}
            height={60}
            priority
            className="w-auto h-auto"
          />
        </div>

        <div className="w-full max-w-xl mb-10 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Subscribe To Our Newsletter
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4 px-4"
          >
            <div className="flex-1">
              <Input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="h-11 bg-transparent border-white/80 text-white placeholder:text-white/80 font-semibold"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className=" bg-white text-violet hover:bg-white/90 transition-colors disabled:opacity-50 font-semibold"
            >
              {isSubmitting ? "Subscribing..." : "Submit"}
            </Button>
          </form>
        </div>

        <nav className="w-full max-w-4xl mb-8">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center text-xs font-semibold">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:underline underline-offset-4 transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Separator className="w-full max-w-4xl mb-4" />

        <div className="text-xs text-white/80">
          © Copyright {currentYear} - Anonymous Voice. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
