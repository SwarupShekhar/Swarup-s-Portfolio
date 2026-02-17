"use client";

import { useScroll, useTransform, useSpring, useMotionTemplate, motion, useMotionValue, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FireBall } from "@/components/fireball";
import { ScrambleText } from "@/components/ui/scramble-text";
import { GalaxyField } from "@/components/GalaxyField";
import { KineticStat } from "@/components/KineticStat";
import TextLiquidEther from "@/components/TextLiquidEther";
import { ArrowRight, Lock, CheckCircle2, ChevronUp } from "lucide-react";
import CursorRevealText from "@/components/CursorRevealText";
import ResumeButton from "@/components/ResumeButton";

// Particle halo is browser-only to avoid SSR hydration mismatches
const ParticleCircle = dynamic(
  () => import("@/components/particle-circle").then((m) => m.ParticleCircle),
  { ssr: false }
);

/**
 * Hook: returns scrollYProgress directly on mobile (no spring lag that fights
 * iOS momentum scrolling) and a spring-smoothed version on desktop.
 */
function useMobileAwareScroll(scrollYProgress: MotionValue<number>, isMobile: boolean) {
  const spring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.5,
  });
  // On mobile, bypass the spring entirely — iOS momentum scroll + spring = double-smoothing = stuck feeling
  return isMobile ? scrollYProgress : spring;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
    setMounted(true);
  }, []);

  // Use global viewport scroll to avoid ref hydration issues
  const { scrollYProgress } = useScroll();

  // --- 1. SMOOTH SCROLL (disabled on mobile to avoid fighting iOS momentum) ---
  const smoothScroll = useMobileAwareScroll(scrollYProgress, isMobile);

  // --- PARALLAX LAYERS (Reduced intensity on mobile) ---
  const bgY = useTransform(smoothScroll, [0, 0.8, 1], isMobile ? ["0%", "-10%", "-10%"] : ["0%", "-20%", "-20%"]);
  const galaxyY = useTransform(smoothScroll, [0, 0.8, 1], isMobile ? ["0%", "-8%", "-8%"] : ["0%", "-15%", "-15%"]);
  const fireballY = useTransform(smoothScroll, [0, 0.8, 1], isMobile ? ["0%", "-20%", "-20%"] : ["0%", "-40%", "-40%"]);

  // Scene-based Galaxy Visibility
  const galaxyOpacity = useTransform(
    smoothScroll,
    [0, 0.2, 0.5, 0.7, 1],
    [0.05, 0.1, 0.2, 0.35, 0.35]
  );

  // --- 2. COLOR TEMPERATURE SHIFTS ---
  const fireColorRaw = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 0.8, 1],
    ["#7c3aed", "#3b82f6", "#8b5cf6", "#10b981", "#7c3aed"]
  );

  const hueRotate = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 0.8, 1],
    [0, -30, 0, 140, 0]
  );

  // --- FIREBALL CINEMATICS (Simplified scale on mobile) ---
  const fireballScale = useTransform(
    smoothScroll,
    [0, 0.05, 0.28, 0.45, 0.58, 0.62, 0.82, 1],
    isMobile ? [1.0, 1.05, 0.95, 1.1, 1.0, 1.2, 1.0, 1.0] : [1.0, 1.1, 0.9, 1.2, 1.0, 1.5, 1.0, 1.0]
  );

  // Blur curve (reduced on mobile)
  const blurValue = useTransform(
    smoothScroll,
    [0, 0.28, 0.45, 0.58, 0.62, 0.82, 1],
    isMobile ? ["0px", "2px", "1px", "4px", "0px", "1px", "2px"] : ["0px", "5px", "2px", "12px", "0px", "2px", "5px"]
  );

  // CHROMATIC ABERRATION (Disabled on mobile — GPU-heavy)
  const chromaticShift = useTransform(
    smoothScroll,
    [0.58, 0.6, 0.62],
    isMobile ? ["0px", "0px", "0px"] : ["0px", "4px", "0px"]
  );

  // IMPORTANT: keep hook calls unconditional (no useTransform inside conditional JSX)
  const chromaticOpacity = useTransform(chromaticShift, (v: string) => (parseFloat(v) > 0 ? 0.5 : 0));
  const chromaticShiftNeg = useTransform(chromaticShift, (v: string) => `-${parseFloat(v)}px`);

  // Particle Surge (Disabled on mobile — GPU-heavy)
  const particleOpacity = useTransform(
    smoothScroll,
    [0.45, 0.55, 0.58, 0.62, 0.82],
    isMobile ? [0, 0, 0, 0, 0] : [0, 0.3, 1, 1, 0]
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

  // Light sweep transforms (hoisted out of JSX to keep hooks flat)
  const sweepX = useTransform(smoothScroll, [0, 1], ["-100%", "100%"]);
  const sweepOpacity = useTransform(smoothScroll, [0.4, 0.5, 0.6], [0, 0.1, 0]);

  const fireballFilter = useMotionTemplate`blur(${blurValue}) hue-rotate(${hueRotate}deg)`;

  // Avoid any SSR/CSR hook-order weirdness until we're on the client
  if (!mounted) return null;

  return (
    <main className={`relative bg-black selection:bg-emerald-500/30 ${isMobile ? 'min-h-[300vh]' : 'min-h-[600vh]'}`}>

      <div className="absolute inset-0 pointer-events-none" />

      {/* --- LAYER 0: GALAXY ENGINE --- */}
      {!isMobile && (
        <motion.div
          style={{ y: galaxyY, opacity: galaxyOpacity }}
          className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden will-change-transform"
        >
          <GalaxyField />
        </motion.div>
      )}

      {/* --- LAYER 1: BACKGROUND --- */}
      <motion.div style={{ y: bgY }} className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden will-change-transform">
        {/* 3. AMBIENT NOISE OVERLAY - Hid on mobile for performance */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay z-50 pointer-events-none bg-noise hidden md:block"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        {/* 4. LIGHT SWEEP */}
        <motion.div
          style={{
            x: sweepX,
            opacity: sweepOpacity
          }}
          className="fixed bottom-0 -left-full top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-md pointer-events-none z-50"
        />
      </motion.div>

      {/* --- LAYER 2: SYSTEM CORE --- */}
      {!isMobile && (
        <motion.div
          style={{ y: fireballY }}
          className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          {/* LIQUID ETHER EFFECT — Above fireball, blended via mix-blend-screen */}
          <div className="absolute inset-0 z-20 mix-blend-screen opacity-60 pointer-events-none">
            <TextLiquidEther
              colors={["#7c3aed", "#a855f7", "#c084fc"]}
              mouseForce={15}
              cursorSize={120}
              resolution={0.35}
              autoDemo={true}
              autoSpeed={0.4}
              autoIntensity={1.8}
              autoResumeDelay={800}
              autoRampDuration={0.5}
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />
          </div>

          {/* Chromatic Aberration Wrapper */}
          <div className="relative">
            {/* RGB SPLIT LAYERS (Only visible during shock) */}
            <motion.div
              style={{ x: chromaticShift, opacity: chromaticOpacity }}
              className="absolute inset-0 mix-blend-screen pointer-events-none"
            >
              <div className="w-full h-full bg-red-500/30 blur-xl scale-110" />
            </motion.div>
            <motion.div
              style={{ x: chromaticShiftNeg, opacity: chromaticOpacity }}
              className="absolute inset-0 mix-blend-screen pointer-events-none"
            >
              <div className="w-full h-full bg-blue-500/30 blur-xl scale-110" />
            </motion.div>

            <motion.div
              style={{
                scale: fireballScale,
                filter: fireballFilter
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
      )}

      {/* --- LAYER 3 NARRATIVE --- */}
      <div className="fixed inset-0 pointer-events-none z-20">

        {/* SCENE 1: IDENTITY - VISIBLE ON LOAD */}
        <Scene1 smoothScroll={smoothScroll} />

        {/* SCENE 2: THE ANALYST */}
        <Scene range={[0.25, 0.48]} smoothScroll={smoothScroll} overlap>
          <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <p className="text-violet-400 uppercase tracking-[0.2em] text-sm font-mono mb-6">
              <ScrambleText text="Analyst · Market Intelligence" />
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter max-w-4xl">
              Uncovering Validated <br />
              <span className="text-white/40">Market Needs</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-8 max-w-3xl">
              Grounded in deep market research to identify high-impact opportunities.
            </p>

            <div className="flex flex-col gap-12 text-left w-full max-w-4xl mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <KineticStat value="20+" label="Global Expert Interviews" />
                <KineticStat value="5,000+" label="Data Points Scraped" />
                <KineticStat value="50%" label="Outreach Efficiency Gain" />
              </div>
            </div>
          </div>
        </Scene>

        {/* SCENE 3: THE BUILDER (UPDATED) */}
        <Scene range={[0.42, 0.6]} smoothScroll={smoothScroll} overlap>
          <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-sm font-mono mb-6">
              <ScrambleText text="Builder · Execution Engine" />
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight mb-8">
              From Theory to <br />
              <span className="text-white/40">Rapid Execution</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl mt-8 text-left">
              <KineticStat value="18%" label="Profit Margin Growth" />
              <KineticStat value="100%" label="Full-Stack Ownership" />
            </div>
          </div>
        </Scene>

        {/* SCENE 4: THE ORCHESTRATOR (UPDATED) */}
        <Scene4 smoothScroll={smoothScroll} />

        {/* SCENE 5: PROOF (UPDATED) */}
        <Scene range={[0.78, 1.0]} smoothScroll={smoothScroll} fadeOut={false} alignment="bottom">
          {/* Allow scrolling within the scene on mobile if content is too tall */}
          <div className="h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-y-auto md:overflow-visible">
            <div className="min-h-full flex flex-col items-center justify-center pt-28 pb-12 md:py-0">

              <div className="text-center mb-6 md:mb-12">
                <p className="text-emerald-400 uppercase tracking-[0.2em] text-xs font-mono mb-2 md:mb-4">
                  LIVE SYSTEMS
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                  Production-grade platforms.
                </h2>
                <p className="text-white/50 text-sm md:text-lg font-light">
                  Each system represents a different layer.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 max-w-7xl w-full mb-8 md:mb-16 px-2 md:px-4">
                <SystemPanel
                  title="Englivo"
                  status="Production"
                  desc="AI-powered fluency engine for natural English speaking."
                  tags={["Speech Analysis", "AI Feedback", "Learning UX"]}
                  href="https://englivo.com"
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

              <div className="flex flex-col items-center gap-4 md:gap-6">
                <p className="text-white/40 text-sm md:text-lg font-light italic">
                  I build systems that outlast features.
                </p>
                <div className="flex flex-col items-center gap-6 md:gap-8">
                  <ResumeButton />
                  <Link href="/studio">
                    <button className="text-white/80 hover:text-emerald-400 transition-colors text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 group">
                      Explore the System Map <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                <ScrollToTop />
              </div>
            </div>
          </div>
        </Scene>

      </div>
    </main>
  );
}

// --- Specific Scenes & Helpers ---

function Scene1({ smoothScroll }: { smoothScroll: any }) {
  // Safe First: Disable blur by default
  const [enableBlur, setEnableBlur] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setEnableBlur(true);
    }
  }, []);

  // Visible at 0, Fades out by 0.25 (slower fade out to keep it visible longer)
  const opacity = useTransform(smoothScroll, [0, 0.28], [1, 0]);
  const y = useTransform(smoothScroll, [0, 0.28], ["0px", "-40px"]);

  const filter = useTransform(
    smoothScroll,
    [0, 0.1, 0.28],
    enableBlur ? ["blur(0px)", "blur(0px)", "blur(12px)"] : ["blur(0px)", "blur(0px)", "blur(0px)"]
  );

  const scene1PointerEvents = useTransform(smoothScroll, (v: any) =>
    v < 0.28 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, y, filter: enableBlur ? filter : "none" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ pointerEvents: scene1PointerEvents }}
        className="h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          className="text-6xl md:text-[8rem] text-white/90 leading-none mb-2"
          style={{ fontFamily: "var(--font-windsong)" }}
        >
          <ScrambleText text="Swarup Shekhar" />
        </motion.h1>

        <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm md:text-base font-mono mb-8">
          DATA · TO · MATTER
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-6 md:mb-12 relative z-20 w-full max-w-5xl"
        >
          <CursorRevealText
            className="py-4 md:py-12"
            revealBackgroundColor="#059669"
            textColor="rgba(255,255,255,0.45)"
            revealTextColor="#050505"
            primaryText={
              <h2 className="text-xl md:text-5xl font-bold leading-tight tracking-tighter text-center px-4">
                I transform <span className="text-emerald-400">market noise</span> into <span className="text-white/80">product matter</span>.
              </h2>
            }
            revealText={
              <h2 className="text-xl md:text-5xl font-bold leading-tight tracking-tighter text-center px-4">
                Turning <span style={{ color: '#d1fae5' }}>ambiguity</span> into <span style={{ color: '#d1fae5' }}>measurable value</span>.
              </h2>
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/60 text-xs font-mono uppercase tracking-wider">
              Currently building <span className="text-white">Englivo</span> · Open to contracts
            </span>
          </div>

          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            Scroll to initialize system
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Scene4({ smoothScroll }: { smoothScroll: any }) {
  // Orchestrator: 0.55 -> 0.82 (reduced overlap with proof scene)
  const opacity = useTransform(smoothScroll, [0.55, 0.62, 0.76, 0.82], [0, 1, 1, 0]);
  const scale = useTransform(smoothScroll, [0.55, 0.8], [0.95, 1.05]);
  const y = useTransform(smoothScroll, [0.55, 0.82], ["40px", "-30px"]);

  const scene4PointerEvents = useTransform(smoothScroll, (v: any) =>
    v > 0.55 && v < 0.88 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ pointerEvents: scene4PointerEvents }}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative"
      >

        <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm font-mono mb-8">
          <ScrambleText text="Orchestrator · Enterprise Connector" />
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter z-10">
          Orchestrating <br />
          <span className="text-white/50">Value at Scale</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl z-10 w-full">
          {[
            { title: "Strategic Alliances", desc: "Spearheaded engagement with leaders including TELUS, Turing, Innodata, & Centific.", icon: "Handshake" },
            { title: "System Architecture", desc: "Synthesizing enterprise-level AI requirements into tailored, scalable service proposals.", icon: "Cpu" },
            { title: "Global Scale", desc: "Bridging local intelligence with native trends via 20+ global expert interviews.", icon: "Globe" },
            { title: "AI Integration", desc: "Orchestrating 15+ specialized AI services (annotation, fine-tuning) for high-impact growth.", icon: "Zap" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 transition-colors backdrop-blur-sm">
              <div className="mb-4 text-emerald-400">
                {item.icon === "Handshake" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-1.47l-10-10a2.5 2.5 0 0 0-4 0l-1 1a1 1 0 0 0 0 3l5 5" /></svg>}
                {item.icon === "Cpu" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>}
                {item.icon === "Globe" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>}
                {item.icon === "Zap" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Scene({
  children,
  range,
  smoothScroll,
  overlap = false,
  fadeOut = true,
  alignment = 'center' // 'center' | 'bottom'
}: {
  children: React.ReactNode;
  range: [number, number];
  smoothScroll: any;
  overlap?: boolean;
  fadeOut?: boolean;
  alignment?: 'center' | 'bottom';
}) {
  const [start, end] = range;
  // Mobile needs wider transition windows because touch scrolling moves in large increments
  const [isMobileScene, setIsMobileScene] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setIsMobileScene(window.innerWidth < 768); }, []);
  const entryDuration = isMobileScene ? 0.12 : 0.05;
  const exitDuration = isMobileScene ? 0.12 : 0.05;

  const opacity = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    [0, 1, 1, fadeOut ? 0 : 1]
  );

  const y = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    ["50px", "0px", "0px", fadeOut ? "-50px" : "0px"]
  );

  // Z-DEPTH & BLUR LOGIC
  const scale = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    [0.96, 1.0, 1.0, fadeOut ? 1.05 : 1.0]
  );

  // Optimize for mobile: Disable blur by default (Safe First)
  const [enableBlur, setEnableBlur] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setEnableBlur(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = useTransform(
    smoothScroll,
    [start, start + entryDuration, end - exitDuration, end],
    enableBlur
      ? ["blur(12px)", "blur(0px)", "blur(0px)", fadeOut ? "blur(12px)" : "blur(0px)"]
      : ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
  );

  const pointerEvents = useTransform(smoothScroll, (v: number) => {
    // If fadeOut is false (it persists), allow pointer events all the way to the end (and beyond)
    if (!fadeOut) return v > start ? "auto" : "none";
    return v > start && v < end ? "auto" : "none";
  });

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter: enableBlur ? filter : "none"
      }}
      className={`absolute inset-x-0 flex justify-center pointer-events-none ${alignment === 'bottom' ? 'bottom-0 h-screen items-center pb-32 md:pb-0' : 'inset-y-0 items-center'
        }`}
    >
      <motion.div
        style={{
          pointerEvents
        }}
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
        <motion.div
          className="w-px h-24 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
            height: ["6rem", "8rem", "6rem"]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
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
                  relative overflow-hidden
                  h-full p-3 md:p-6 rounded-xl border bg-black/40 backdrop-blur-md 
                  transition-all duration-500 ease-out flex flex-col justify-between
                  shadow-2xl
                  ${colors[color]}
              `}>

          {/* GHOST LOGIC OVERLAY (X-RAY) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
            {/* Scanline */}
            <div className="absolute left-0 top-0 bottom-0 w-[400px] h-full bg-gradient-to-r from-emerald-500/20 via-emerald-500/5 to-transparent skew-x-[-20deg] blur-2xl animate-[scan_2s_ease-in-out_infinite]" />

            {/* Tech Grid Background pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `radial-gradient(circle, ${statusColors[color].split(' ')[0].replace('text-', '') === 'emerald-400' ? '#34d399' : '#a78bfa'} 1px, transparent 1px)`, backgroundSize: '16px 16px' }}
            />

            {/* Architectural Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
              <path d="M0,0 L100,100" stroke="currentColor" strokeWidth="0.5" className={statusColors[color].split(' ')[0]} />
              <path d="M100,0 L0,100" stroke="currentColor" strokeWidth="0.5" className={statusColors[color].split(' ')[0]} />
              <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="currentColor" strokeWidth="0.5" className={statusColors[color].split(' ')[0]} strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="relative z-10 bg-black/20 md:bg-transparent rounded-lg p-2 md:p-0">
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <h3 className="text-sm md:text-xl font-bold text-white leading-tight">{title}</h3>
              <span className={`text-[8px] md:text-[10px] uppercase tracking-wider px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-mono flex items-center gap-1 md:gap-1.5 ${statusColors[color]}`}>
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-current animate-pulse" />
                {status}
              </span>
            </div>

            <p className="text-white/60 text-xs md:text-sm leading-snug md:leading-relaxed mb-4 md:mb-6 font-light line-clamp-3 md:line-clamp-none">{desc}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] text-white/40 font-mono px-2 py-1 border border-white/5 rounded-md group-hover:border-white/20 group-hover:text-white/60 transition-colors bg-black/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {!disabled && (
            <div className="relative z-10 flex items-center text-xs text-white/40 group-hover:text-white transition-colors gap-2 uppercase tracking-widest">
              View Architecture <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
          {disabled && (
            <div className="relative z-10 flex items-center text-xs text-white/20 gap-2 uppercase tracking-widest font-mono">
              <Lock className="w-3 h-3" /> Encrypted Lab
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
      className="group flex flex-col items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors duration-500 pb-20 md:pb-12 cursor-pointer pointer-events-auto animate-pulse hover:animate-none scale-90 md:scale-110"
    >
      <div className="p-3 md:p-4 rounded-full border border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.4)] group-hover:border-emerald-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] group-hover:bg-emerald-500/20 transition-all">
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform text-emerald-400" />
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono text-emerald-400/80">Return to Orbit</span>
    </button>
  );
}
