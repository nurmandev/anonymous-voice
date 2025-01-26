import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "What is AV?",
    answer:
      "Anonymous Voices (AV) is a platform that provides a safe and confidential space for individuals to share their thoughts, emotions, and experiences anonymously.",
  },
  {
    question: "How do I become a listener on Anonymous Voices?",
    answer:
      'Interested individuals can apply through our official platform to become listeners on Anonymous Voices. If you meet the requirements and are interested in becoming a listener, please fill out our "Become a Listener" form, and we will contact you for the next steps.',
  },
  {
    question: "Is my conversation anonymous?",
    answer:
      "Yes, your conversations are entirely anonymous. We don't request personal information like your name, email, or contact details while providing support. Everything you share remains confidential, ensuring your privacy throughout your experience on our platform.",
  },
  {
    question: "Is the service free?",
    answer:
      "Yes, initially, Anonymous Voices operates under a freemium model, meaning that the service is completely free for users.",
  },
  {
    question: "Can I reach out for support anytime?",
    answer:
      "You can reach out for support anytime through our chat service. Please remember that our phone call service is available from 2 PM to 2 AM.",
  },
  {
    question: "Will Anonymous Voices replace professional therapy?",
    answer:
      "No, Anonymous Voices is not a replacement for professional therapy. We provide a listening ear and emotional support, but if you need clinical help, we recommend seeking out a licensed mental health professional.",
  },
  {
    question: "How can I provide feedback or report issues?",
    answer:
      "You can provide feedback or report any issues by contacting us directly through the platform's Contact Us section.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-medium text-center text-[#9B8ACB] mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Find answers to common questions about Anonymous Voices
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Didn&apos;t find what you are looking for?
          </p>
          <Button asChild className="bg-[#86C6C6] hover:bg-[#78b7b7]">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
