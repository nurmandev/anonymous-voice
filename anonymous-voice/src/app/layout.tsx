import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers";

const comfortaa = localFont({
  src: [
    {
      path: "./fonts/Comfortaa-Light.woff",
      weight: "300",
    },
    {
      path: "./fonts/Comfortaa-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/Comfortaa-Medium.woff",
      weight: "500",
    },
    {
      path: "./fonts/Comfortaa-Bold.woff",
      weight: "800",
    },
  ],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Anonymous Voice",
  description:
    "Your safe space for mental health support and anonymous communication",
  metadataBase: new URL("https://anonymous-voting.vercel.app"),
  keywords: ["mental health", "anonymous chat", "support", "counseling"],
  authors: [{ name: "Anonymous Voice Team" }],
  creator: "Anonymous Voice",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anonymous-voice.com",
    title: "Anonymous Voice",
    description:
      "Your safe space for mental health support and anonymous communication",
    siteName: "Anonymous Voice",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anonymous Voice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Voice",
    description:
      "Your safe space for mental health support and anonymous communication",
    images: ["/images/twitter-card.png"],
    site: "@anonymousvoice",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
