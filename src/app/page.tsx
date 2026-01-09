"use client";

import { FireBall } from "@/components/fireball";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* CORE ENGINE */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5, width: "100%", height: "100%" }}>
        <FireBall
          blobRadius={6}
          ballColor="#ff2d75"
          colors={["#ff2d75", "#ff5500", "#ffcc00", "#ff9900"]}
          followMouse={true}
          intensity={0.2}
          containerRef={containerRef}
        />
      </div>

      {/* MASK */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black z-10" />

      {/* IDENTITY */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center max-w-4xl px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-emerald-400 uppercase tracking-widest text-xs mb-6 font-mono"
        >
          Product Engineer & Orchestrator
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4"
        >
          I design and engineer
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400"
          >
            digital systems
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          From AI-powered learning engines to real-time platforms and revenue systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            href="/studio"
            className="group px-10 py-4 rounded-xl bg-white text-black font-semibold hover:bg-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/50"
          >
            Enter System Map
          </Link>
          <Link
            href="/englivo"
            className="group px-10 py-4 rounded-xl border border-white/20 hover:border-violet-400 text-white transition-all duration-300 hover:bg-white/5 hover:scale-105"
          >
            Explore Englivo
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}


