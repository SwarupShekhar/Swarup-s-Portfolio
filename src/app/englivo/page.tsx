"use client";

import { englivo } from "@/content/englivo";
import IntelligenceField from "@/components/IntelligenceField";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EnglivoPage() {
  return (
    <main className="max-w-6xl mx-auto py-20 px-6 space-y-28">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative grid md:grid-cols-2 gap-12 items-center"
      >
        <IntelligenceField />
        <div>
          <p className="text-sm font-medium tracking-wide text-indigo-500 uppercase">
            Flagship System
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight">
            Englivo - The AI Fluency Engine
          </h1>
          <p className="mt-6 text-lg text-white/60 leading-relaxed">
            {englivo.subtitle}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Image
            src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/homepagedark_o4fhlv.png"
            alt="Englivo homepage"
            width={800}
            height={600}
            className="rounded-2xl shadow-xl shadow-indigo-500/10 w-full h-auto"
            priority
          />
        </motion.div>
      </motion.section>

      {/* THE FLUENCY GAP */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight">The Fluency Gap</h2>
        <p className="mt-6 text-white/70 leading-relaxed">{englivo.problem}</p>
      </motion.section>

      {/* PSYCHOLOGY */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Why People Hesitate
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed">{englivo.insight}</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <Image
            src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/heartheshift_wuqs50.png"
            alt="Psychology of speaking confidence"
            width={600}
            height={400}
            className="rounded-xl shadow-lg border border-white/5 w-full h-auto"
          />
        </motion.div>
      </motion.section>

      {/* THE SYSTEM */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <Image
            src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/thefluencyengine_xkp1b8.png"
            alt="Englivo fluency engine"
            width={600}
            height={400}
            className="rounded-xl shadow-lg border border-white/5 w-full h-auto"
          />
        </motion.div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            The Fluency Engine
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed">{englivo.system}</p>
        </div>
      </motion.section>

      {/* ENGINEERING */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight">The Engineering</h2>
        <div className="mt-8 mb-8">
          <ArchitectureDiagram />
        </div>
        <p className="mt-6 text-white/70 leading-relaxed">
          {englivo.engineering}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Image
              src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/Dashboard1_aklund.png"
              alt="Fluency dashboard"
              width={500}
              height={300}
              className="rounded-xl shadow-lg border border-white/5 w-full h-auto"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Image
              src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/dashboard2_u96f91.png"
              alt="Fluency metrics"
              width={500}
              height={300}
              className="rounded-xl shadow-lg border border-white/5 w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* COMPETITIVE SYNTHESIS */}
      <section className="mt-32 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight mb-8"
        >
          Competitive Synthesis
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
          >
            <p className="text-white/70 font-semibold">Duolingo</p>
            <p className="mt-2 text-white/40 text-sm">
              World-class gamification, but no deep speaking or emotional safety. Learners know English but cannot use it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
          >
            <p className="text-white/70 font-semibold">ELSA Speak</p>
            <p className="mt-2 text-white/40 text-sm">
              Excellent phonetic analysis, but highly clinical and stressful. Users feel judged instead of supported.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 hover:bg-emerald-400/10 transition-colors"
          >
            <p className="text-emerald-400 font-semibold">Englivo</p>
            <p className="mt-2 text-white/70 text-sm">
              Combines engagement with real-time AI fluency coaching that trains speaking reflexes in a psychologically safe environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY IT WINS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          Why Englivo Wins
        </h2>
        <p className="mt-6 text-white/70 leading-relaxed">{englivo.outcome}</p>
      </motion.section>
    </main>
  );
}
