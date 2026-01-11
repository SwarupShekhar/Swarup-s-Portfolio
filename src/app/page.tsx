"use client";

import { FireBall } from "@/components/fireball";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// Staggered Text Component
const StaggeredText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div className={`inline-block whitespace-pre-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] align-top">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.05 + 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parent container variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    },
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-start pt-24 md:pt-32 pb-20">
      {/* CORE ENGINE */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <FireBall
          blobRadius={6}
          ballColor="#7c3aed"
          colors={["#9c88ff", "#7c3aed", "#a855f7", "#c084fc"]}
          followMouse={true}
          intensity={0.2}
          containerRef={containerRef}
        />
      </div>

      {/* MASK */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black z-10 pointer-events-none" />

      {/* IDENTITY */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-20 text-center max-w-5xl px-6 flex flex-col items-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-emerald-400 uppercase tracking-widest text-xs mb-8 font-mono"
        >
          Product Engineer & Orchestrator
        </motion.p>

        {/* Handwriting Signature */}
        <motion.div variants={itemVariants} className="mb-2">
          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 2,
              ease: "easeOut"
            }}
            className="text-7xl md:text-9xl text-white/90"
            style={{ fontFamily: "var(--font-windsong)" }}
          >
            Swarup Shekhar
          </motion.p>
        </motion.div>

        {/* Main Title - Split/Staggered */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white leading-[1.1]">
            <span className="block">I design and engineer</span>
            <motion.span
              initial={{ backgroundPosition: "0% 50%", opacity: 0 }}
              animate={{ backgroundPosition: "100% 50%", opacity: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay: 1 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-[length:200%_auto]"
            >
              digital systems
            </motion.span>
          </h1>
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          From AI-powered learning engines to real-time platforms and revenue systems.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
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

        {/* OPERATOR SIGNALS */}
        <motion.div
          variants={containerVariants}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
        >
          <SpotlightCard
            color="emerald"
            title="Market Intelligence"
            description="I began as a market research analyst, trained to identify demand, pricing power, and growth signals across global education and services markets."
            delay={0}
          />

          <SpotlightCard
            color="violet"
            title="AI-Augmented Engineering"
            description="I use AI and modern IDEs to rapidly architect full-stack systems, from data models and APIs to production-grade user experiences."
            delay={0.1}
          />

          <SpotlightCard
            color="fuchsia"
            title="Business-First Products"
            description="With a foundation in commerce, I design software around revenue, scalability, and operational efficiency, not just features."
            delay={0.2}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}

function SpotlightCard({ color, title, description, delay = 0 }: { color: string, title: string, description: string, delay?: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const colorMap: Record<string, { rgb: string, text: string }> = {
    emerald: { rgb: "16 185 129", text: "text-emerald-400" },
    violet: { rgb: "139 92 246", text: "text-violet-400" },
    fuchsia: { rgb: "217 70 239", text: "text-fuchsia-400" },
  };

  const { rgb, text: textColor } = colorMap[color] || { rgb: "255 255 255", text: "text-white" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 + delay, duration: 0.6 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur p-6 group h-full"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${rgb}, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <p className={`${textColor} text-xs uppercase tracking-widest mb-2`}>{title}</p>
        <p className="text-white/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
