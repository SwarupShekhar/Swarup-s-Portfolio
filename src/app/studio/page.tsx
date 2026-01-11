"use client";

import { studio } from "@/content/studio";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function StudioPage() {
  const [filter, setFilter] = useState<"all" | "professional" | "independent">("all");

  const filteredProjects = studio.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  const tabs = [
    { id: "all", label: "All Systems" },
    { id: "professional", label: "Professional" },
    { id: "independent", label: "Independent Labs" },
  ];

  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-start pt-24 md:pt-32 pb-24 px-6">

      {/* 2. DATA FIELD BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep neural gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_70%)] opacity-60" />

        {/* Subtle particle noise (CSS driven or simplified here) */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        <motion.div
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            System Control
          </h1>
          <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase opacity-80">
            Active Neural Network • Production Grade
          </p>
        </motion.div>

        {/* 3. FILTER CONTROLS */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`
                relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
                ${filter === tab.id ? "text-black" : "text-white/60 hover:text-white"}
              `}
            >
              {filter === tab.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-emerald-400 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 5. CONSTELLATION GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <SystemCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

interface Project {
  id: string;
  name: string;
  status: string;
  description: string;
  ownership: string;
  type: string;
  link: string | null;
}

function SystemCard({ project, index }: { project: Project, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // 3. STATUS AURA LOGIC
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Production": return "text-emerald-400 border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]";
      case "Live": return "text-sky-400 border-sky-500/30 shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)]";
      case "In Development": return "text-amber-400 border-amber-500/30"; // No glow, just color
      default: return "text-white border-white/10";
    }
  };

  const statusStyle = getStatusColor(project.status);
  const isDev = project.status === "In Development";

  // Staggered layout offset for odd items
  const marginTop = index % 2 !== 0 ? "md:mt-12" : "";

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group h-full p-8 rounded-3xl backdrop-blur-md bg-white/[0.02] 
        border transition-all duration-500 ease-out
        ${marginTop}
        ${isHovered ? "bg-white/[0.05] border-white/20" : "border-white/5"}
      `}
    >
      {/* 4. SYSTEM BOOT EFFECT (Internal Glow) */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${statusStyle.split(' ')[2] || ''}`}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                {project.name}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-emerald-400/80 mt-1 font-mono">
                {project.ownership}
              </p>
            </div>

            {/* Status Pill with Pulse/Flicker */}
            <div className={`
              px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border 
              ${statusStyle.split(' ')[0]} ${statusStyle.split(' ')[1]} bg-black/50
            `}>
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${isDev ? 'animate-pulse' : 'animate-ping'}`} />
                {project.status}
              </span>
            </div>
          </div>

          <p className="text-white/60 leading-relaxed text-sm mb-8">
            {project.description}
          </p>
        </div>

        {/* Launch Affordance */}
        {project.link ? (
          <div className="flex items-center gap-3 text-white/40 group-hover:text-emerald-400 transition-colors duration-300">
            <span className="text-xs font-mono uppercase tracking-widest">
              Initialize System
            </span>
            <motion.span
              animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.5 }}
            >
              →
            </motion.span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/20">
            <span className="text-xs font-mono uppercase tracking-widest">
              System Offline
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (!project.link) return CardContent;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {CardContent}
    </a>
  );
}
