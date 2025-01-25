import { Check } from "lucide-react";
import Image from "next/image";

export default function ListenerSection() {
  const requirements = [
    "Strong communication, active listening, and interpersonal skills",
    "Empathy, compassion, patience, and a non-judgmental attitude",
    "Basic understanding of mental health issues",
    "Ability to handle sensitive topics with maturity and discretion",
    "Fluency in both Bangla and English speaking and writing",
    "Availability for at least 2 hours daily",
    "Prior experience in mental health or counseling (preferred but not mandatory)",
    "Commitment to the mission of the organization",
  ];

  const benefits = [
    "Gain valuable skills in active listening and mental health support.",
    "Make a meaningful impact on individuals' lives.",
    "Receive training and mentorship from mental health professionals.",
    "Be part of a supportive and purpose-driven team.",
  ];

  const responsibilities = [
    "Patiently listening to individuals who reach out for support.",
    "Responding with empathy and understanding, creating a safe and non-judgmental space.",
    "Maintaining strict confidentiality of all conversations.",
    "Providing information about mental health resources and support services.",
    "Attend training sessions to develop and enhance listening skills.",
    "Report any concerns about user safety following the organization’s protocols.",
    "Collaborate with a team of listeners and coordinators to ensure quality service.",
  ];

  return (
    <section className="w-full px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-violet">Listener</h1>
        <h2 className="text-xl md:text-2xl font-bold text-center text-soft-paste mt-6">
          Become a Listener
        </h2>

        <div className="space-y-12 mt-4">
          {/* Text Content */}
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed text-sm text-center lg:text-start">
              Anonymous Voices is a youth-driven mental wellness organization in
              Bangladesh. We provide confidential support to individuals seeking
              a safe space to share their feelings. As a volunteer listener, you
              will play a crucial role in offering empathetic, non-judgmental,
              and active listening to our users.
            </p>

            {/* Role of a Volunteer Listener Section */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Role of a Volunteer Listener
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-soft-paste mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Required Qualifications
                </h3>
                <ul className="space-y-3 text-sm font-medium">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-soft-paste mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative w-full rounded-2xl overflow-hidden mt-6">
                <Image
                  src="/images/requirements.png"
                  alt="Mobile app interface showing task management"
                  className="object-cover"
                  fill
                  loading="lazy"
                />
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Benefits
                </h3>
                <ul className="space-y-3 text-sm font-medium">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-soft-paste mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative w-full rounded-2xl overflow-hidden mt-6">
                <Image
                  src="/images/benefits.png"
                  alt="Document management interface"
                  className="object-cover"
                  fill
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
