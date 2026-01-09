import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Swarup — Product Engineer & Orchestrator",
  description:
    "Product Studio showcasing AI systems, marketplaces, and SaaS platforms",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Nav />
        {children}
      </body>
    </html>
  );
}




