"use client";

import { wehostt } from "@/content/wehostt";
import IntelligenceField from "@/components/IntelligenceField";
import { motion } from "framer-motion";

export default function WeHosttPage() {
    return (
        <main className="max-w-4xl mx-auto pt-32 md:pt-40 pb-20 px-6 space-y-28">
            {/* HERO */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative text-center"
            >
                <div className="absolute inset-0 -top-40 -z-10 flex items-center justify-center opacity-20 pointer-events-none">
                    <IntelligenceField />
                </div>

                <p className="text-sm font-medium tracking-wide text-indigo-500 uppercase">
                    Revenue SaaS
                </p>
                <h1 className="mt-3 text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
                    WeHostt
                </h1>
                <p className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                    Product Engineer • Vaidik Eduservices
                </p>
                <p className="mt-6 text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
                    {wehostt.subtitle}
                </p>
            </motion.section>

            {/* PHASE 1: CONCEPT VALIDATION */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
            >
                <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
                    {wehostt.phase1.title}
                </h2>
                <div className="space-y-8">
                    {wehostt.phase1.points.map((point, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="text-indigo-400 font-bold tracking-wide text-lg">{point.bold}</span>
                            <p className="text-white/70 leading-relaxed text-lg">{point.text}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* PHASE 2: STRATEGY */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
                        {wehostt.phase2.title}
                    </h2>
                    <div className="space-y-8 border-l-2 border-indigo-500/30 pl-8">
                        {wehostt.phase2.points.map((point, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-indigo-400 font-bold tracking-wide text-lg">{point.bold}</span>
                                <p className="text-white/70 leading-relaxed">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* PHASE 3: EXECUTION */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12"
            >
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
                        {wehostt.phase3.title}
                    </h2>
                    <div className="space-y-6">
                        {wehostt.phase3.points.map((point, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-indigo-400 font-bold tracking-wide text-lg">{point.bold}</span>
                                <p className="text-white/70 leading-relaxed">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-center space-y-4 opacity-50">
                        <div className="text-6xl mb-4">⚙️</div>
                        <p className="text-sm font-mono text-white/40 uppercase tracking-widest">System Architecture</p>
                        <div className="flex gap-2 justify-center text-xs font-mono text-white/30">
                            <span>HTML5</span> • <span>CSS3</span> • <span>Python Automation</span>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* PHASE 4: OUTCOMES */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <h2 className="text-3xl font-semibold tracking-tight text-white mb-8 relative z-10">
                    {wehostt.phase4.title}
                </h2>

                <div className="grid gap-8 relative z-10">
                    {wehostt.phase4.points.map((point, i) => (
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
