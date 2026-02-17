"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import GitHubButton from "@/components/GitHubButton";
import LinkedInButton from "@/components/LinkedInButton";

import { Imperial_Script } from "next/font/google";

const imperialScript = Imperial_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-imperial",
});

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
        bg-black/90 md:backdrop-blur-xl md:bg-white/5 border border-white/10 
        rounded-2xl px-6 md:px-8 py-3 flex items-center justify-between gap-10 shadow-lg
        w-[90%] max-w-5xl"
      >
        <Link href="/" className="group flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <div className={`${imperialScript.className} text-3xl relative cursor-pointer`}>
            {/* Outline / Stroke Layer */}
            <span
              className="relative z-10 block"
              style={{
                WebkitTextStroke: '0.5px rgba(255,255,255,0.6)',
                color: 'transparent',
              }}
            >
              &nbsp;Swarup&nbsp;
            </span>

            {/* Fill / Hover Layer */}
            <span
              className="absolute inset-0 z-20 text-[#37FF8B] overflow-hidden transition-[width] duration-500 ease-in-out w-0 group-hover:w-full"
              style={{
                WebkitTextStroke: '0.5px #37FF8B',
                borderRight: '4px solid #37FF8B',
                filter: 'drop-shadow(0 0 10px #37FF8B)',
              }}
            >
              &nbsp;Swarup&nbsp;
            </span>
          </div>
        </Link>

        {/* Desktop Links and Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/studio" className="hover:text-white transition">
              System Map
            </Link>
            <Link href="/englivo" className="hover:text-white transition">
              Englivo
            </Link>
            <Link href="/wehostt" className="hover:text-white transition">
              WeHostt
            </Link>
            <Link href="/vibespark" className="hover:text-white transition">
              VibeSpark
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
          </div>

          <div className="flex gap-3">
            <GitHubButton />
            <LinkedInButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="flex flex-col items-center gap-8 text-xl text-white/80 font-light"
            >
              {[
                { href: "/", label: "Home" },
                { href: "/studio", label: "System Map" },
                { href: "/englivo", label: "Englivo" },
                { href: "/wehostt", label: "WeHostt" },
                { href: "/vibespark", label: "VibeSpark" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-10 flex items-center gap-2 text-sm text-white/40"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Core Online</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
