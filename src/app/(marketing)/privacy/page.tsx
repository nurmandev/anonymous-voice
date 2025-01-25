import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Overview",
    content: `We appreciate your presence at Anonymous Voices (&quot;Anonymous Voices&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). Anonymous Voices is committed to protecting your privacy. This policy is set out with respect to privacy and Personally-Identifying Information (PII). By using our platform, you consent to the collection and use of your information as described in this policy.`,
  },
  {
    title: "Information We Collect",
    content: `Without the Age and Gender, you do not need to provide us any other Personally-Identifying-Information (PII) in order to use the services available at Anonymous Voices. Please note that your age and gender will be kept strictly confidential and will only be used to provide you with the best possible service.`,
  },
  {
    title: "When do We Collect Information?",
    content: `We collect PII (your Age, Gender) from you when you register, log in, use our chat and call features, or interact with our websites/services.`,
  },
  {
    title: "How We Use Your Information",
    content: `We will not disclose your PII data to brokers, advertisers, third parties, or to anyone else for marketing purposes. We will use your information and PII for the following purposes:
              <ul>
                <li>To collect anonymous data, such as usage statistics and trends, may be necessary to improve our services.</li>
                <li>To allow us to better serve you in responding to customer service requests.</li>
              </ul>`,
  },
  {
    title: "Children&apos;s Privacy",
    content: `Our platform is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you are under 16, please do not use our platform.`,
  },
  {
    title: "Policy Updates",
    content: `From time to time, we may change this Privacy Policy. If we decide to change this Privacy Policy, in whole or in part, we will inform you by posting the revised Privacy Policy on our website. Those changes will go into effect on the effective date disclosed in the revised Privacy Policy.`,
  },
  {
    title: "Contact Information",
    content: `If you have any questions or comments about this privacy policy or how we handle PII you may contact us through our email address.
              <p class="font-medium">anonymous.voices.av@gmail.com</p>`,
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-medium text-center text-violet mb-2">
          Privacy Policy
        </h1>
        <p className="text-center text-[#86C6C6] font-medium mb-4">
          Your privacy is our priority
        </p>
        <p className="text-center text-xs mb-12 opacity-50">
          LAST MODIFIED: 11/12/2024
        </p>

        {sections.map((section, index) => (
          <Card
            key={index}
            className="mb-8 bg-transparent border-none shadow-none"
          >
            <CardHeader>
              <CardTitle className="text-lg text-[#86C6C6]">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none text-sm">
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </CardContent>
          </Card>
        ))}

        <Separator className="my-8" />

        <div className="text-center text-xs opacity-50">
          <p>
            Remember, you have a community behind you. By sharing your story,
            you&apos;re taking a step toward healing and growth. Thank you for
            trusting Anonymous Voices.
          </p>
        </div>
      </div>
    </section>
  );
}
