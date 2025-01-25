"use client";

import Hero from "@/components/pages/home/hero/Hero";
import OurPartner from "@/components/pages/home/partner/OurPartner";
import Stat from "@/components/pages/home/stat/Stat";
import HonourableVolunteers from "@/components/pages/home/volunteers/HonourableVolunteers";
import WhatWeDo from "@/components/pages/home/what-we-do/WhatWeDo";
import WhoWeAre from "@/components/pages/home/who-we-are/WhoWeAre";
import WhyAnonymousVoice from "@/components/pages/home/why/WhyAnonymousVoice";

export default function Page() {
  return (
    <div className="[url('/images/watermark_bg.png')]">
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <HonourableVolunteers />
      <WhyAnonymousVoice />
      <Stat />
      <OurPartner title="Our Partners" />
    </div>
  );
}
