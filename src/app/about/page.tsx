"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32 md:py-48 max-w-5xl mx-auto">

      {/* HEADER: MEMO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-emerald-500/50" />
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest">The Manifesto</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight max-w-3xl">
          I don't just write code. <br />
          <span className="text-white/40">I orchestrate outcome.</span>
        </h1>
      </motion.div>


      {/* SECTION 1: THE PHILOSOPHY */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-16 items-start"
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-6">The "Orchestrator" Mindset</h2>
          <p className="text-white/60 leading-relaxed text-lg mb-6">
            We live in an era where writing code is becoming commoditized. The value has shifted from "knowing syntax" to "knowing what to build."
          </p>
          <p className="text-white/60 leading-relaxed text-lg mb-6">
            I operate at the intersection of <strong>Product Strategy</strong> (The Why), <strong>Data Analysis</strong> (The Signal), and <strong>Full-Stack Engineering</strong> (The How). A true Product Engineer doesn't just clear tickets—they clear ambiguity.
          </p>
          <p className="text-white/60 leading-relaxed text-lg">
            I don't wait for a PRD. I write it. I don't wait for designs. I prototype them. I don't wait for approval. I ship, measure, and iterate. This is the difference between a coder and an orchestrator.
          </p>
        </div>
        <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="space-y-6 font-mono text-sm">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/40">Role</span>
              <span className="text-emerald-400">Product Engineer</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/40">Focus</span>
              <span className="text-white">0 → 1 Systems</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/40">Superpower</span>
              <span className="text-white">Velocity & Empathy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">Stack</span>
              <span className="text-white">Next.js • Python • AI</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: THE TIMELINE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="mt-40"
      >
        <h2 className="text-4xl font-bold text-white mb-16">The Trajectory</h2>

        <div className="border-l border-white/10 pl-8 space-y-20 relative">

          {/* ITEM 1 */}
          <div className="relative">
            <span className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-black" />
            <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-2 block">Present</span>
            <h3 className="text-2xl font-bold text-white">Swarup's Product Studio</h3>
            <p className="mt-4 text-white/60 max-w-xl">
              Building and launching independent AI systems like <strong>Englivo</strong> and <strong>VibeSpark</strong>. Consulting for enterprise clients on R&D initiatives.
            </p>
          </div>

          {/* ITEM 2 */}
          <div className="relative">
            <span className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-white/20 ring-4 ring-black" />
            <span className="text-white/40 font-mono text-xs uppercase tracking-widest mb-2 block">2022 - 2024</span>
            <h3 className="text-2xl font-bold text-white">Vaidik Eduservices</h3>
            <p className="mt-4 text-white/60 max-w-xl">
              Led product engineering initiatives. Managed AI data pipelines for clients like TELUS and Tech Mahindra. Annotated 500+ prompts for safety and alignment.
            </p>
          </div>

          {/* ITEM 3 */}
          <div className="relative">
            <span className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-white/20 ring-4 ring-black" />
            <span className="text-white/40 font-mono text-xs uppercase tracking-widest mb-2 block">2020 - 2022</span>
            <h3 className="text-2xl font-bold text-white">Market Analysis</h3>
            <p className="mt-4 text-white/60 max-w-xl">
              Started in specific market research. Learned to identify "Lead Leakage" and user friction points before ever writing a line of code.
            </p>
          </div>

        </div>
      </motion.section>

    </main >
  );
}
