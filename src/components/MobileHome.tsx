"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Lock, ChevronUp } from "lucide-react";
import ResumeButton from "@/components/ResumeButton";

/* ── Lightweight scroll-reveal wrapper ─────────────────────────────
   Uses IntersectionObserver + CSS transition — zero framer-motion overhead. */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Simple stat display — no glitch animation ──────────────────── */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-mono font-bold text-white tracking-tighter">
        {value}
      </span>
      <span className="text-white/50 text-sm uppercase tracking-widest font-light mt-1">
        {label}
      </span>
    </div>
  );
}

/* ── Simplified system panel — no 3D tilt, no backdrop-blur ────── */
function MobileSystemPanel({
  title,
  status,
  desc,
  tags,
  href,
  color,
  disabled = false,
}: {
  title: string;
  status: string;
  desc: string;
  tags: string[];
  href: string;
  color: "emerald" | "blue" | "purple" | "gray";
  disabled?: boolean;
}) {
  const borderColors = {
    emerald: "border-emerald-500/30",
    blue: "border-blue-500/30",
    purple: "border-purple-500/30",
    gray: "border-white/10 opacity-70",
  };

  const statusColors = {
    emerald: "text-emerald-400 bg-emerald-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    gray: "text-white/40 bg-white/5",
  };

  const Wrapper = disabled ? "div" : Link;

  return (
    <Wrapper
      href={href}
      target={disabled ? undefined : "_blank"}
      className={`block ${disabled ? "" : "cursor-pointer"}`}
    >
      <div
        className={`
        relative overflow-hidden h-full p-3 rounded-xl border bg-black/60
        flex flex-col justify-between ${borderColors[color]}
      `}
      >
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-white leading-tight">
              {title}
            </h3>
            <span
              className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-mono flex items-center gap-1 ${statusColors[color]}`}
            >
              <span className="w-1 h-1 rounded-full bg-current" />
              {status}
            </span>
          </div>
          <p className="text-white/60 text-xs leading-snug mb-3 font-light line-clamp-3">
            {desc}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] text-white/40 font-mono px-1.5 py-0.5 border border-white/5 rounded-md bg-black/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {!disabled && (
          <div className="flex items-center text-[10px] text-white/40 gap-1.5 uppercase tracking-widest">
            View <ArrowRight className="w-2.5 h-2.5" />
          </div>
        )}
        {disabled && (
          <div className="flex items-center text-[10px] text-white/20 gap-1.5 uppercase tracking-widest font-mono">
            <Lock className="w-2.5 h-2.5" /> Private
          </div>
        )}
      </div>
    </Wrapper>
  );
}

/* ── MobileHome ─────────────────────────────────────────────────── */
export default function MobileHome() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="relative bg-black selection:bg-emerald-500/30">
      {/* ─── SCENE 1: HERO ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <FadeInSection>
          <h1
            className="text-5xl text-white/90 leading-tight mb-2"
            style={{ fontFamily: "var(--font-windsong)" }}
          >
            Swarup Shekhar
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm font-mono mb-8">
            DATA · TO · MATTER
          </p>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <h2 className="text-xl font-bold leading-tight tracking-tighter text-center px-4 text-white/45 mb-8">
            I transform{" "}
            <span className="text-emerald-400">market noise</span> into{" "}
            <span className="text-white/80">product matter</span>.
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-white/60 text-xs font-mono uppercase tracking-wider">
              Currently building{" "}
              <span className="text-white">Englivo</span> · Open to
              contracts
            </span>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.8}>
          <p className="text-white/20 text-[10px] uppercase tracking-widest mt-8">
            Scroll to explore
          </p>
        </FadeInSection>
      </section>

      {/* ─── SCENE 2: THE ANALYST ─── */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <FadeInSection>
          <p className="text-violet-400 uppercase tracking-[0.2em] text-sm font-mono mb-6">
            Analyst · Market Intelligence
          </p>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">
            Uncovering Validated <br />
            <span className="text-white/40">Market Needs</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <p className="text-lg text-white/70 font-light mb-10 max-w-sm">
            Deep market research to identify high-impact opportunities.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="grid grid-cols-1 gap-8 text-left w-full max-w-sm">
            <StatCard value="20+" label="Global Expert Interviews" />
            <StatCard value="5,000+" label="Data Points Scraped" />
            <StatCard value="50%" label="Outreach Efficiency Gain" />
          </div>
        </FadeInSection>
      </section>

      {/* ─── SCENE 3: THE BUILDER ─── */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <FadeInSection>
          <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-sm font-mono mb-6">
            Builder · Execution Engine
          </p>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tighter leading-tight">
            From Theory to <br />
            <span className="text-white/40">Rapid Execution</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 gap-8 text-left w-full max-w-sm">
            <StatCard value="18%" label="Profit Margin Growth" />
            <StatCard value="100%" label="Full-Stack Ownership" />
          </div>
        </FadeInSection>
      </section>

      {/* ─── SCENE 4: THE ORCHESTRATOR ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <FadeInSection>
          <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm font-mono mb-8">
            Orchestrator · Enterprise Connector
          </p>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <h2 className="text-3xl font-bold text-white mb-10 tracking-tighter">
            Orchestrating <br />
            <span className="text-white/50">Value at Scale</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 gap-4 w-full max-w-sm text-left">
            {[
              {
                title: "Strategic Alliances",
                desc: "Spearheaded engagement with leaders including TELUS, Turing, Innodata, & Centific.",
              },
              {
                title: "System Architecture",
                desc: "Synthesizing enterprise-level AI requirements into tailored, scalable service proposals.",
              },
              {
                title: "Global Scale",
                desc: "Bridging local intelligence with native trends via 20+ global expert interviews.",
              },
              {
                title: "AI Integration",
                desc: "Orchestrating 15+ specialized AI services for high-impact growth.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h3 className="text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ─── SCENE 5: PROOF / PROJECTS ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <FadeInSection>
          <div className="text-center mb-8">
            <p className="text-emerald-400 uppercase tracking-[0.2em] text-xs font-mono mb-2">
              LIVE SYSTEMS
            </p>
            <h2 className="text-3xl font-bold text-white mb-2">
              Production-grade platforms.
            </h2>
            <p className="text-white/50 text-sm font-light">
              Each system represents a different layer.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="grid grid-cols-2 gap-2 w-full max-w-lg mb-10">
            <MobileSystemPanel
              title="Englivo"
              status="Production"
              desc="AI-powered fluency engine for natural English speaking."
              tags={["Speech Analysis", "AI Feedback", "Learning UX"]}
              href="https://englivo.com"
              color="emerald"
            />
            <MobileSystemPanel
              title="Vaidik Tutoring"
              status="Production"
              desc="K–12 tutoring marketplace and student operating system."
              tags={["Multi-role Auth", "Scheduling", "Payments"]}
              href="https://vaidiktutoring.vercel.app"
              color="blue"
            />
            <MobileSystemPanel
              title="WeHostt"
              status="Production"
              desc="Revenue SaaS for hospitality lead capture and client routing."
              tags={["Funnels", "CRM Logic", "Conversion UX"]}
              href="https://www.wehostt.com"
              color="purple"
            />
            <MobileSystemPanel
              title="Vibespark"
              status="In Development"
              desc="Real-time voice and video experimentation using WebRTC."
              tags={["Private R&D System"]}
              href="#"
              color="gray"
              disabled
            />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/40 text-sm font-light italic">
              I build systems that outlast features.
            </p>
            <ResumeButton />
            <Link href="/studio">
              <button className="text-white/80 text-xs uppercase tracking-widest flex items-center gap-2">
                Explore the System Map{" "}
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
            <button
              onClick={scrollToTop}
              className="flex flex-col items-center gap-2 text-white/50 mt-6 pb-16"
            >
              <div className="p-3 rounded-full border border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ChevronUp className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400/80">
                Return to Orbit
              </span>
            </button>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
}
