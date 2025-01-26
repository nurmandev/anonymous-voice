import TitleHeader from "@/components/common/TitleHeader";
import ContactSection from "@/components/pages/contact/ContactSection";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <TitleHeader title="Make a Difference Today" />
      <ContactSection />
    </div>
  );
};

export default ContactPage;
