import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function ContactInfo() {
  return (
    <div
      className="bg-violet text-white p-8 rounded-2xl bg-cover bg-center"
      style={{ backgroundImage: "url('/images/contact_info_bg.png')" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <p className="text-sm mb-8">Say something to start a live chat!</p>

      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-6">📞</div>
          <p>+1012 3456 789</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6">✉️</div>
          <p>anonymous.voices.av@gmail.com</p>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-6">📍</div>
          <p>132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
        </div>
      </div>

      <div className="flex gap-4 bg-white/20 w-fit p-2 rounded-full">
        <Link href="#" className="hover:opacity-80">
          <Facebook className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:opacity-80">
          <Instagram className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:opacity-80">
          <Linkedin className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:opacity-80">
          <Youtube className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:opacity-80">
          <MessageCircle className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
