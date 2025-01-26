import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  return (
    <section className="w-full px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-violet mb-2">
          Contact Us
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-12">
          Any questions or remarks? Just write us a message!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
