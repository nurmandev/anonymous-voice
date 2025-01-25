import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the role of a Listener?",
    answer:
      "A Listener provides emotional support and a compassionate ear to individuals seeking someone to talk to. They create a safe, non-judgmental space for people to express their thoughts and feelings.",
  },
  {
    question: "Do I need previous experience to apply as a Listener?",
    answer:
      "While previous experience in mental health support is valuable, it's not mandatory. We provide comprehensive training to all our Listeners. What's most important is your commitment to helping others and willingness to learn.",
  },
  {
    question:
      "How many hours per week am I expected to volunteer as a Listener?",
    answer:
      "We typically ask for a minimum commitment of 4-6 hours per week, which can be flexibly scheduled according to your availability.",
  },
  {
    question: "What kind of training will I receive as a Listener?",
    answer:
      "Our training program covers active listening skills, crisis intervention, mental health awareness, ethical guidelines, and platform-specific protocols. The training is comprehensive and interactive.",
  },
  {
    question: "What qualifications are required for the Placement Program?",
    answer:
      "We look for individuals with a background or strong interest in psychology, counseling, or social work. Good communication skills, empathy, and emotional stability are essential.",
  },
  {
    question: "How long does the Placement Program last?",
    answer:
      "The Placement Program typically runs for 6 months, allowing sufficient time for training, practical experience, and meaningful impact.",
  },
  {
    question:
      "Will I receive a certificate upon completing the Placement Program?",
    answer:
      "Yes, upon successful completion of the program, you will receive a certificate acknowledging your training and service as a Listener.",
  },
  {
    question: "Is the Placement Program paid?",
    answer:
      "The Placement Program is a volunteer opportunity and is not paid. However, it provides valuable experience and training in mental health support.",
  },
];

export default function ListenerFAQ() {
  return (
    <section className="w-full px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-bold mb-6">FAQ</h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-sm hover:text-soft-paste-dark">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
