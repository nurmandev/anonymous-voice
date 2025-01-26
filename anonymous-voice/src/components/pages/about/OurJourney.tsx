import Image from "next/image";

export default function OurJourney() {
  return (
    <section className="w-full px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-violet mb-10">
          Our Journey
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative w-full h-96 lg:h-full rounded-xl border overflow-hidden shadow-lg">
            <Image
              src="/images/who-we-are.png"
              alt="Supportive mental health consultation"
              className="w-full object-cover"
              layout="fill"
              loading="lazy"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 text-center lg:text-start">
            <h3 className="text-xl md:text-2xl font-bold text-soft-paste leading-tight">
              Committed to Your Mental Wellness with Compassionate Care
            </h3>

            <div className="space-y-4 text-muted-foreground text-sm">
              <p className="leading-relaxed">
                At Anonymous Voice, we believe that every voice deserves to be
                heard, especially when it comes to mental health. We are
                dedicated to creating a safe, supportive space where individuals
                can seek guidance, share their experiences, and find solace
                without judgment. Our team of compassionate professionals is
                committed to providing personalized mental health services that
                prioritize your unique journey. We understand that reaching out
                for help can be daunting, which is why we focus on creating a
                comfortable and confidential environment.
              </p>

              <p className="leading-relaxed">
                At Anonymous Voice, we believe that every voice deserves to be
                heard, especially when it comes to mental health. We are
                dedicated to creating a safe, supportive space where individuals
                can seek guidance, share their experiences, and find solace
                without judgment. Our team of compassionate professionals is
                committed to providing personalized mental health services that
                prioritize your unique journey. We understand that reaching out
                for help can be daunting, which is why we focus on creating a
                comfortable and confidential environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
