"use client";

import { englivo } from "@/content/englivo";
import IntelligenceField from "@/components/IntelligenceField";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EnglivoPage() {
  return (
    <main className="max-w-6xl mx-auto pt-32 md:pt-40 pb-20 px-6 space-y-28">
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
          <p className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-400/80">
            Product Engineer • Vaidik Eduservices
          </p>
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

      {/* PHASE 1: MARKET INSIGHT */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
            {englivo.phase1.title}
          </h2>
          <div className="space-y-6">
            {englivo.phase1.points.map((point, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-indigo-400 font-bold tracking-wide text-lg">{point.bold}</span>
                <p className="text-white/70 leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
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

      {/* PHASE 2: PRODUCT STRATEGY */}
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
          className="relative order-2 md:order-1"
        >
          <Image
            src="https://res.cloudinary.com/de8vvmpip/image/upload/v1767946774/thefluencyengine_xkp1b8.png"
            alt="Englivo fluency engine"
            width={600}
            height={400}
            className="rounded-xl shadow-lg border border-white/5 w-full h-auto"
          />
        </motion.div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
            {englivo.phase2.title}
          </h2>
          <div className="space-y-6">
            {englivo.phase2.points.map((point, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-indigo-400 font-bold tracking-wide text-lg">{point.bold}</span>
                <p className="text-white/70 leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PHASE 3: ENGINEERING EXECUTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">{englivo.phase3.title}</h2>

        <div className="space-y-6 mb-12 max-w-4xl">
          {englivo.phase3.points.map((point, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-indigo-400 font-bold tracking-wide text-lg">{point.bold}</span>
              <p className="text-white/70 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-8">
          <ArchitectureDiagram />
        </div>

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

      {/* PHASE 4: MEASURABLE OUTCOMES */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
          {englivo.phase4.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {englivo.phase4.points.map((point, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-emerald-400 font-bold tracking-wide text-xl">{point.bold}</span>
              <p className="text-white/70 leading-relaxed text-lg">{point.text}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
