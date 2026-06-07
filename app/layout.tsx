import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Varcheck — We build things embarrassingly good.",
  description:
    "Varcheck is a software and design studio led by Sumit Wod. Full-stack development, UI/UX design, and mobile apps. Based in India. Ships fast. No compromises.",
  keywords: [
    "web development",
    "UI/UX design",
    "Next.js",
    "React Native",
    "Flutter",
    "software studio",
    "India",
    "Varcheck",
    "Sumit Wod",
  ],
  authors: [{ name: "Sumit Wod", url: "https://sumitwod.vercel.app" }],
  creator: "Sumit Wod",
  metadataBase: new URL("https://varcheck.in"),
  openGraph: {
    title: "Varcheck — We build things embarrassingly good.",
    description:
      "Full-stack development, UI/UX design, and mobile apps. Based in India.",
    url: "https://varcheck.in",
    siteName: "Varcheck Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varcheck — We build things embarrassingly good.",
    description:
      "Full-stack development, UI/UX design, and mobile apps. Based in India.",
    creator: "@sumit_wod",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {/* Structured data for crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Varcheck Studio",
              description:
                "Full-stack software development, UI/UX design, and mobile app studio based in India. Led by Sumit Wod.",
              url: "https://varcheck.in",
              logo: "https://varcheck.in/logo.svg",
              image: "https://varcheck.in/opengraph-image",
              founder: {
                "@type": "Person",
                name: "Sumit Wod",
                url: "https://sumitwod.vercel.app",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              serviceType: [
                "Web Development",
                "UI/UX Design",
                "Mobile App Development",
                "Design Systems",
              ],
              areaServed: "Worldwide",
              priceRange: "₹₹₹",
            }),
          }}
        />
        <SmoothScroll />
        <CustomCursor />
        {/* Cinematic overlays */}
        <div className="grain-overlay" aria-hidden="true" />
        <div className="vignette-overlay" aria-hidden="true" />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
