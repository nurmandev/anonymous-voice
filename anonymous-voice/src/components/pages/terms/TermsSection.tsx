import { AlertTriangle, Phone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    title: "General Information",
    content: `Anonymous Voices is intended to provide general information and a safe space for individuals to express their thoughts and emotions. It is not a source of medical advice or treatment recommendations.`,
  },
  {
    title: "Medical Disclaimer",
    content: `If you have concerns about your mental, emotional, or physical health, please seek help from a qualified healthcare professional. Any decisions made from the information provided on this platform are your own responsibility, and Anonymous Voices holds no liability.`,
  },
  {
    title: "Agreement",
    content: `By using Anonymous Voices, you agree to these Terms of Use.`,
  },
];

export default function TermsSection() {
  return (
    <section className="w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#9B8ACB] mb-12">
          Terms of Use
        </h1>

        {sections.map((section, index) => (
          <Card
            key={index}
            className="mb-8 bg-transparent border-none shadow-none"
          >
            <CardHeader>
              <CardTitle className="text-xl text-[#86C6C6]">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none text-sm">
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </CardContent>
          </Card>
        ))}

        <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription className="text-sm">
            This is not a crisis hotline. If you are in an immediate crisis,
            please call 999 or your local emergency services.
          </AlertDescription>
        </Alert>

        <Card className="bg-[#9B8ACB] text-white max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 justify-center">
              <Phone className="h-6 w-6" />
              <p className="text-lg font-medium">Emergency? Call 999</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
