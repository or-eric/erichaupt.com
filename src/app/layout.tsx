import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";
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
  title: "Eric Haupt",
  description: "Strategist. Operator. Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} bg-bone text-deep-slate antialiased relative`}
      >
        <Header />
        <CommandPalette />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>

    </html>
  );
}
