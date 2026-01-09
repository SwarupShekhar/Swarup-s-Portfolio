import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WindSong } from "next/font/google";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import PremiumBackground from "@/components/PremiumBackground";

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-windsong",
});

export const metadata: Metadata = {
  title: "Swarup — Product Engineer & Orchestrator",
  description:
    "Product Studio showcasing AI systems, marketplaces, and SaaS platforms",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${windSong.variable} bg-black text-white`}>
        <PremiumBackground />
        <Nav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}




