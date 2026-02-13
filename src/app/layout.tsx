import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Eric Haupt',
    default: 'Eric Haupt',
  },
  description: "Executive Strategy at the Intersection of Cyber, AI, and National Security. Strategic Counsel for Leaders navigating Digital Transformation, NIST Governance, and DevSecOps.",
  keywords: ["Fractional CTO", "Technical Due Diligence", "SaaS Architecture", "Cyber Risk Management", "AI Strategy", "Digital Transformation", "Executive Advisor", "National Security", "Business Protection", "Safe AI Adoption", "Tech Advisor for CEOs", "Stop Data Leaks"],
  metadataBase: new URL('https://erichaupt.com'),
  openGraph: {
    title: 'Eric Haupt',
    description: "Decision Advantage at the Intersection of Cyber, AI, and Leadership.",
    url: 'https://erichaupt.com',
    siteName: 'Eric Haupt',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eric Haupt',
    creator: '@erichaupt',
  },
};

export const runtime = 'edge';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Eric Joel Haupt Jr.",
    "jobTitle": "Cyber Strategy & AI Executive",
    "worksFor": [
      {
        "@type": "Organization",
        "name": "United States Army Cyber Command"
      },
      {
        "@type": "Organization",
        "name": "Obsidian Rowe"
      }
    ],
    "description": "Strategic Counsel on AI, Cybersecurity, NIST Governance, and Digital Transformation for Executives and National Security Leaders.",
    "url": "https://erichaupt.com",
    "sameAs": [
      "https://linkedin.com/in/erichaupt",
      "https://x.com/erichaupt"
    ],
    "knowsAbout": ["Cybersecurity Strategy", "Artificial Intelligence", "NIST Framework", "DevSecOps", "Executive Leadership", "National Security"],
    "brand": {
      "@type": "Brand",
      "name": "Obsidian Rowe"
    }
  };

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} bg-bone text-deep-slate antialiased relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <CommandPalette />
        <ScrollToTop />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
