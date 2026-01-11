"use client";

import { useScroll, useTransform, useSpring, useMotionTemplate, motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FireBall } from "@/components/fireball";
import { ParticleCircle } from "@/components/particle-circle";
import { ScrambleText } from "@/components/ui/scramble-text";
import { GalaxyField } from "@/components/GalaxyField";
import { ArrowRight, Lock, CheckCircle2, ChevronUp } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. MICRO-LAG (Smooth Scroll) ---
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4
  });

  // --- PARALLAX LAYERS (Using smoothScroll) ---
  // --- PARALLAX LAYERS (Using smoothScroll) ---
  // Clamp parallax at end (0.8) for "Lock-in" effect
  const bgY = useTransform(smoothScroll, [0, 0.8, 1], ["0%", "-20%", "-20%"]);
  // Galaxy moves slower for deep space effect
  const galaxyY = useTransform(smoothScroll, [0, 0.8, 1], ["0%", "-15%", "-15%"]);
  const fireballY = useTransform(smoothScroll, [0, 0.8, 1], ["0%", "-40%", "-40%"]);

  // Scene-based Galaxy Visibility
  // Identity (0-0.2): Barely visible
  // Analyst (0.2-0.5): Faint
  // Builder (0.5-0.7): Visible
  // Orchestrator (0.7+): Clear
  const galaxyOpacity = useTransform(
    smoothScroll,
    [0, 0.2, 0.5, 0.7, 1],
    [0.05, 0.1, 0.2, 0.35, 0.35]
  );

  // --- 2. COLOR TEMPERATURE SHIFTS ---
  // 0.3 (Analyst) -> Blue
  // 0.6 (Builder) -> Violet
  // 0.8 (Orchestrator) -> Electric Green/Emerald
  const fireColorRaw = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 0.8, 1],
    ["#7c3aed", "#3b82f6", "#8b5cf6", "#10b981", "#7c3aed"] // Violet -> Blue -> Violet -> Emerald -> Violet
  );

  const hueRotate = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 0.8, 1],
    [0, -30, 0, 140, 0]
  );

  // --- FIREBALL CINEMATICS ---
  const fireballScale = useTransform(
    smoothScroll,
    [0, 0.05, 0.28, 0.45, 0.58, 0.62, 0.82, 1],
    [1.0, 1.1, 0.9, 1.2, 1.0, 1.5, 1.0, 1.0]
  );

  // Slower blur curve: Widen the clear spots
  const blurValue = useTransform(
    smoothScroll,
    [0, 0.28, 0.45, 0.58, 0.62, 0.82, 1],
    ["0px", "5px", "2px", "12px", "0px", "2px", "5px"]
  );

  // CHROMATIC ABERRATION SHOCK (At 0.58-0.62)
  const chromaticShift = useTransform(
    smoothScroll,
    [0.58, 0.6, 0.62],
    ["0px", "4px", "0px"]
  );

  // Particle Surge at 0.58-0.62 (Orchestrator Reveal)
  const particleOpacity = useTransform(
    smoothScroll,
    [0.45, 0.55, 0.58, 0.62, 0.82],
    [0, 0.3, 1, 1, 0]
  );

  const particleScale = useTransform(
    smoothScroll,
    [0.55, 0.6, 0.65],
    [1, 1.2, 1]
  );

  const particleRotate = useTransform(
    smoothScroll,
    [0.55, 0.6, 0.65],
    [0, 180, 0]
  );

  return (
    <main ref={containerRef} className="relative bg-black min-h-[600vh] selection:bg-emerald-500/30">

      <div className="absolute inset-0 pointer-events-none" />

      {/* --- LAYER 0: GALAXY ENGINE --- */}
      <motion.div
        style={{ y: galaxyY, opacity: galaxyOpacity }}
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <GalaxyField />
      </motion.div>

      {/* --- LAYER 1: BACKGROUND --- */}
      <motion.div style={{ y: bgY }} className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* 3. AMBIENT NOISE OVERLAY */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay z-50 pointer-events-none bg-noise"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        {/* 4. LIGHT SWEEP */}
        <motion.div
          style={{
            x: useTransform(smoothScroll, [0, 1], ["-100%", "100%"]),
            opacity: useTransform(smoothScroll, [0.4, 0.5, 0.6], [0, 0.1, 0])
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-40 pointer-events-none"
        />
      </motion.div>

      {/* --- LAYER 2: SYSTEM CORE --- */}
      <motion.div
        style={{ y: fireballY }}
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        {/* Chromatic Aberration Wrapper */}
        <div className="relative">
          {/* RGB SPLIT LAYERS (Only visible during shock) */}
          <motion.div
            style={{ x: chromaticShift, opacity: useTransform(chromaticShift, v => parseFloat(v as string) > 0 ? 0.5 : 0) }}
            className="absolute inset-0 mix-blend-screen pointer-events-none"
          >
            <div className="w-full h-full bg-red-500/30 blur-xl scale-110" />
          </motion.div>
          <motion.div
            style={{ x: useTransform(chromaticShift, v => `-${parseFloat(v as string)}px`), opacity: useTransform(chromaticShift, v => parseFloat(v as string) > 0 ? 0.5 : 0) }}
            className="absolute inset-0 mix-blend-screen pointer-events-none"
          >
            <div className="w-full h-full bg-blue-500/30 blur-xl scale-110" />
          </motion.div>

          <motion.div
            style={{
              scale: fireballScale,
              filter: useMotionTemplate`blur(${blurValue}) hue-rotate(${hueRotate}deg)`
            }}
            className="relative z-10 transition-colors duration-500 ease-out"
          >
            <FireBall
              blobRadius={5}
              ballColor="#7c3aed"
              colors={["#9c88ff", "#7c3aed", "#a855f7", "#c084fc"]}
              intensity={0.3}
            />
          </motion.div>
        </div>

        {/* Particles attached to System Layer */}
        <motion.div
          style={{
            opacity: particleOpacity,
            scale: particleScale,
            rotate: particleRotate
          }}
          className="absolute z-0"
        >
          <ParticleCircle
            size={800}
            particleCount={80}
            particleSize={[2, 6]}
            colors={["#34d399", "#a78bfa", "#f472b6"]}
          />
        </motion.div>
      </motion.div>

      {/* --- LAYER 3 NARRATIVE --- */}
      <div className="fixed inset-0 pointer-events-none z-20">

        {/* SCENE 1: IDENTITY - VISIBLE ON LOAD */}
        <Scene1 smoothScroll={smoothScroll} />

        {/* SCENE 2: THE ANALYST */}
        <Scene range={[0.25, 0.48]} smoothScroll={smoothScroll} overlap>
          <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <p className="text-violet-400 uppercase tracking-[0.2em] text-sm font-mono mb-6">
              <ScrambleText text="Origin · Market Intelligence" />
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter max-w-4xl">
              From Research to <br />
              <span className="text-white/40">Real Decisions</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-8 max-w-2xl">
              Analyzed large-scale market signals before writing a single line of code.
            </p>

            <div className="flex flex-col gap-3 text-lg text-white/60 font-light items-center">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <p>Market trend analysis across education & services</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <p>Direct interviews with operators & end users</p>
              </div>
            </div>

            <p className="text-white/30 text-sm font-mono mt-8">
              Background: Market Research Analyst, Vaidik Eduservices
            </p>
          </div>
        </Scene>

        {/* SCENE 3: THE BUILDER (UPDATED) */}
        <Scene range={[0.42, 0.6]} smoothScroll={smoothScroll} overlap>
          <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-sm font-mono mb-6">
              <ScrambleText text="Execution · Product Engineering" />
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight mb-8">
              From Insight to <br />
              <span className="text-white/40">Working Software</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light mb-12">
              I use AI-assisted development to rapidly convert validated ideas into real, usable platforms.
            </p>

            <div className="flex flex-col gap-3 text-lg text-white/60 font-light items-center">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                <p>End-to-end architecture: frontend, backend, and data</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                <p>Built and deployed full systems without handoffs or delays</p>
              </div>
            </div>

            <p className="text-white/30 text-sm font-mono mt-8">
              This is how Englivo, WeHostt, and Vaidik’s platforms were delivered.
            </p>
          </div>
        </Scene>

        {/* SCENE 4: THE ORCHESTRATOR (UPDATED) */}
        <Scene4 smoothScroll={smoothScroll} />

        {/* SCENE 5: PROOF (UPDATED) */}
        <Scene range={[0.8, 1.0]} smoothScroll={smoothScroll}>
          <div className="h-screen w-full flex flex-col items-center justify-center px-4 relative">

            <div className="text-center mb-12">
              <p className="text-emerald-400 uppercase tracking-[0.2em] text-xs font-mono mb-4">
                LIVE SYSTEMS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Production-grade platforms in active use.
              </h2>
              <p className="text-white/50 text-lg font-light">
                Each system represents a different layer of digital infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full mb-16 px-4">
              <SystemPanel
                title="Englivo"
                status="Production"
                desc="AI-powered fluency engine for natural English speaking."
                tags={["Speech Analysis", "AI Feedback", "Learning UX"]}
                href="https://naturalfluency.vercel.app"
                color="emerald"
              />
              <SystemPanel
                title="Vaidik Tutoring"
                status="Production"
                desc="K–12 tutoring marketplace and student operating system."
                tags={["Multi-role Auth", "Scheduling", "Payments"]}
                href="https://vaidiktutoring.vercel.app"
                color="blue"
              />
              <SystemPanel
                title="WeHostt"
                status="Production"
                desc="Revenue SaaS for hospitality lead capture and client routing."
                tags={["Funnels", "CRM Logic", "Conversion UX"]}
                href="https://www.wehostt.com"
                color="purple"
              />
              <SystemPanel
                title="Vibespark"
                status="In Development"
                desc="Real-time voice and video experimentation using WebRTC."
                tags={["Private R&D System"]}
                href="#"
                color="gray"
                disabled
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="text-white/40 text-lg font-light italic">
                I build systems that outlast features.
              </p>
              <div className="flex flex-col items-center gap-12">
                <Link href="/studio">
                  <button className="text-white/80 hover:text-emerald-400 transition-colors text-sm uppercase tracking-widest flex items-center gap-2 group">
                    Explore the System Map <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <ScrollToTop />
              </div>
            </div>
          </div>
        </Scene>

      </div>

      {/* SCROLL AFFORDANCE */}
      <ScrollAffordance />

      {/* spacer to ensure we have scrollable area */}
      <div className="h-[10vh]" />
    </main>
  );
}

// --- Specific Scenes & Helpers ---

function Scene1({ smoothScroll }: { smoothScroll: any }) {
  // Visible at 0, Fades out by 0.25 (slower fade out to keep it visible longer)
  const opacity = useTransform(smoothScroll, [0, 0.28], [1, 0]);
  const y = useTransform(smoothScroll, [0, 0.28], ["0px", "-40px"]);
  // Slower blur: start blurring later
  const filter = useTransform(smoothScroll, [0, 0.1, 0.28], ["blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ pointerEvents: useTransform(smoothScroll, (v: any) => v < 0.28 ? "auto" : "none") }}
        className="h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          className="text-6xl md:text-[10rem] text-white/90 leading-none mb-6"
          style={{ fontFamily: "var(--font-windsong)" }}
        >
          <ScrambleText text="Swarup Shekhar" />
        </motion.h1>
        <div className="space-y-4">
          <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm md:text-base font-mono">
            Product Engineer & Orchestrator
          </p>
          <p className="text-white/60 text-xl md:text-3xl max-w-2xl font-light leading-relaxed">
            “I turn market intelligence into <span className="text-white font-normal">living software systems</span>”
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-white/20 text-xs uppercase tracking-widest mt-12"
          >
            Scroll to explore the system
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Scene4({ smoothScroll }: { smoothScroll: any }) {
  // Orchestrator: 0.55 -> 0.85 (Widened for overlap)
  const opacity = useTransform(smoothScroll, [0.55, 0.62, 0.8, 0.88], [0, 1, 1, 0]);
  const scale = useTransform(smoothScroll, [0.55, 0.85], [0.95, 1.05]);
  const y = useTransform(smoothScroll, [0.55, 0.88], ["40px", "-40px"]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ pointerEvents: useTransform(smoothScroll, (v: any) => (v > 0.55 && v < 0.88) ? "auto" : "none") }}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative"
      >

        <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm font-mono mb-8">
          <ScrambleText text="Role: Product Orchestrator" />
        </p>

        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter z-10">
          I don’t build apps.<br />
          <span className="text-white/50">I design ecosystems.</span>
        </h2>

        <p className="text-xl md:text-2xl text-white/70 font-light mb-16 z-10 max-w-3xl">
          Each system solves a different layer of the same problem:<br />
          how people discover, learn, and transact online.
        </p>

        {/* System Map Visualization - Labels fade in */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-left font-mono text-sm opacity-80 max-w-4xl w-full">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">Englivo</span>
            <span className="text-white/40">Fluency & Learning Intelligence</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">Vaidik</span>
            <span className="text-white/40">Education & Student Operations</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">WeHostt</span>
            <span className="text-white/40">Revenue & Lead Systems</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">Vibespark</span>
            <span className="text-white/40">Real-Time Communication Lab</span>
          </motion.div>
        </div>
        <p className="text-emerald-400/50 text-xs font-mono mt-8">
          Together, they form one operating model for digital businesses.
        </p>
      </motion.div>
    </motion.div>
  );
}

function Scene({
  children,
  range,
  smoothScroll,
  overlap = false
}: {
  children: React.ReactNode;
  range: [number, number];
  smoothScroll: any;
  overlap?: boolean;
}) {
  const [start, end] = range;
  // Slower transitions: 0.15 duration instead of 0.1 -> Reverted to 0.05 to ensure clear window exists
  const entryDuration = 0.05;
  const exitDuration = 0.05;

  const opacity = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    ["50px", "0px", "0px", "-50px"]
  );

  // Z-DEPTH & BLUR LOGIC
  // Mimic 3D fly-through: Enters slightly far (0.96), stays close (1.0), exits past camera (1.05)
  const scale = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    [0.96, 1.0, 1.0, 1.05]
  );

  const filter = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
  );

  return (
    <motion.div
      style={{ opacity, y, filter, scale }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ pointerEvents: useTransform(smoothScroll, (v: any) => (v > start && v < end) ? "auto" : "none") }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ScrollAffordance() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none mix-blend-difference"
    >
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
      </motion.div>
    </motion.div>
  );
}

function SystemPanel({ title, status, desc, tags, href, color, disabled = false }: {
  title: string,
  status: string,
  desc: string,
  tags: string[],
  href: string,
  color: 'emerald' | 'blue' | 'purple' | 'gray',
  disabled?: boolean
}) {
  const colors = {
    emerald: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    blue: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    purple: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
    gray: "border-white/10 opacity-70 cursor-not-allowed"
  };

  const statusColors = {
    emerald: "text-emerald-400 bg-emerald-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    gray: "text-white/40 bg-white/5"
  }

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Wrapper = disabled ? 'div' : Link;
  // cast Wrapper to any to avoid TS issues with Link vs div props if needed, or just use a fragment logic
  // simpler to just use motion.div as the interactive wrapper

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full perspective-1000"
    >
      <Wrapper href={href} target={disabled ? undefined : "_blank"} className={`block h-full group ${disabled ? '' : 'cursor-pointer'}`}>
        <div className={`
                  h-full p-6 rounded-xl border bg-black/40 backdrop-blur-md 
                  transition-all duration-500 ease-out flex flex-col justify-between
                  shadow-2xl
                  ${colors[color]}
              `}>
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-mono flex items-center gap-1.5 ${statusColors[color]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {status}
              </span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">{desc}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] text-white/40 font-mono px-2 py-1 border border-white/5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {!disabled && (
            <div className="flex items-center text-xs text-white/40 group-hover:text-white transition-colors gap-2 uppercase tracking-widest">
              View System <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
          {disabled && (
            <div className="flex items-center text-xs text-white/20 gap-2 uppercase tracking-widest font-mono">
              <Lock className="w-3 h-3" /> Private R&D
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}

function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="group flex flex-col items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors duration-500 pb-12 cursor-pointer pointer-events-auto animate-pulse hover:animate-none scale-110"
    >
      <div className="p-4 rounded-full border border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.4)] group-hover:border-emerald-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] group-hover:bg-emerald-500/20 transition-all">
        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform text-emerald-400" />
      </div>
      <span className="text-xs uppercase tracking-[0.2em] font-mono text-emerald-400/80">Return to Orbit</span>
    </button>
  );
}
