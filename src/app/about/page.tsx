"use client";

import { motion } from "framer-motion";
import SystemBlock from "@/components/SystemBlock";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Orchestrator’s Toolkit
        </h1>
        <p className="mt-6 text-xl text-white/50">
          The integrated systems I use to research, build, validate, and scale digital products.
        </p>
      </motion.div>

      {/* Systems */}
      <div className="mt-24 space-y-32">

        {/* Research */}
        <SystemBlock
          title="Market & Discovery"
          color="emerald"
          description="How I identify what to build and why."
          tools={[
            "Market research & competitor analysis",
            "Stakeholder interviews & surveys",
            "Data scraping & trend analysis",
            "Pricing & expansion modeling",
          ]}
        />

        {/* Build */}
        <SystemBlock
          title="Product & Engineering"
          color="violet"
          description="How I turn insight into working software."
          tools={[
            "Next.js, React, Tailwind",
            "Node, Express, PostgreSQL",
            "Authentication, APIs, Real-time systems",
            "Framer Motion, UX systems",
          ]}
        />

        {/* AI */}
        <SystemBlock
          title="AI Orchestration"
          color="fuchsia"
          description="How I integrate intelligence into products."
          tools={[
            "Prompt engineering & evaluation",
            "Model QA & safety workflows",
            "Audio & speech QA (ElevenLabs)",
            "AI-powered feedback & automation",
          ]}
        />

      </div>



      {/* 1. THE TRAJECTORY */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-32 max-w-4xl"
      >
        <h2 className="text-4xl font-bold tracking-tight">From Analyst to Product Architect</h2>
        <p className="mt-8 text-lg text-white/60 leading-relaxed">
          I did not start as a developer. I started inside markets, data, and user behavior.
          <br /><br />
          At Vaidik Eduservices and Testbook, I worked on market research, client acquisition, and AI training pipelines. I analyzed thousands of data points, interviewed stakeholders, and studied what actually moves revenue and learning outcomes.
          <br /><br />
          At some point I realized something dangerous. I could see what should be built, but I could not control how fast it was built.
          <br /><br />
          So I learned to build it myself.
          <br /><br />
          Today I design products the way an analyst designs strategy and the way an engineer builds systems.
        </p>
      </motion.section>

      {/* 2. THE OPERATING SYSTEM */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-32"
      >
        <h2 className="text-4xl font-bold tracking-tight">How I Approach Products</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {[
            ["Start from signal", "I do not build on gut feeling. I start from data, patterns, and user friction."],
            ["Design systems", "I map flows between users, data, and decisions before I write UI."],
            ["Build for leverage", "AI is not a shortcut. It is a force multiplier for faster iteration."],
            ["Optimize for reality", "Products must survive production, not demos."],
          ].map(([title, desc], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
            >
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-4 text-white/60">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. ROLES QUADRANT */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-32"
      >
        <h2 className="text-4xl font-bold tracking-tight">How I Operate</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            ["Analyst", "Market research, pricing, positioning"],
            ["Architect", "Data models, system flows, APIs"],
            ["Engineer", "Frontend, backend, infrastructure"],
            ["Designer", "UX, interaction, premium feel"],
          ].map(([title, desc], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
            >
              <p className="text-lg font-bold">{title}</p>
              <p className="mt-2 text-white/50 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. THE TRUST LAYER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-32"
      >
        <h2 className="text-4xl font-bold tracking-tight">Proof of Seriousness</h2>

        <ul className="mt-10 space-y-4 text-white/60 text-lg">
          <li>• Built AI training pipelines and QA systems</li>
          <li>• Worked on 20+ AI annotation and evaluation projects</li>
          <li>• Designed and shipped EdTech, SaaS, and marketplace platforms</li>
          <li>• Deployed multiple production systems used by real users</li>
        </ul>
      </motion.section>

      {/* 5. THE INTENT LAYER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-40 max-w-4xl"
      >
        <h2 className="text-4xl font-bold tracking-tight">
          What I’m Building Toward
        </h2>

        <p className="mt-8 text-xl text-white/60 leading-relaxed">
          I am not interested in just writing code.
          <br /><br />
          I am interested in working on problems where product, data, and technology intersect.
          <br /><br />
          I thrive in environments where:
          <br />
          • Decisions are made from signal, not politics
          • Speed matters
          • Products are treated like systems, not features
          • And builders are trusted to own outcomes
          <br /><br />
          If you are building something ambitious and need someone who can
          research, design, and engineer it end-to-end, that is where I belong.
        </p>
      </motion.section>

    </main >
  );
}
