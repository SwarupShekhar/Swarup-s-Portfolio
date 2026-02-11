import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WindSong } from "next/font/google";
import Nav from "@/components/Nav";
import ScrollRestoration from "@/components/ScrollRestoration";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-windsong",
});

export const metadata: Metadata = {
  title: "Swarup - Product Engineer & Orchestrator",
  description:
    "Product Studio showcasing AI systems, marketplaces, and SaaS platforms",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${windSong.variable} bg-black text-white overflow-x-hidden`} suppressHydrationWarning>
        <CustomCursor />
        <ScrollRestoration />
        <PremiumBackground />
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}




