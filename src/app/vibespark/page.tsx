"use client";

import { vibespark } from "@/content/vibespark";
import { motion } from "framer-motion";

export default function VibeSparkPage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* BACKGROUND GRADIENT MESH */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-purple-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-cyan-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
            </div>

            <div className="max-w-4xl mx-auto pt-32 md:pt-40 pb-20 px-6 space-y-32 relative z-10">

                {/* HERO: The Connection Orb */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center text-center"
                >
                    {/* ORB ANIMATION */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex items-center justify-center">
                        {/* Core */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 blur-2xl opacity-40"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-[0_0_60px_rgba(168,85,247,0.5)] z-10 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                            {/* Voice Waves */}
                            <div className="absolute inset-0 flex items-center justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: ["20%", "60%", "20%"] }}
                                        transition={{ repeat: Infinity, duration: 0.8 + (i * 0.1), ease: "easeInOut", delay: i * 0.1 }}
                                        className="w-2 md:w-3 bg-white/80 rounded-full"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <p className="text-sm font-medium tracking-wide text-purple-400 uppercase mb-4">
                        Spontaneous Connection Hub
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-200 via-white to-cyan-200 bg-clip-text text-transparent">
                        VibeSpark
                    </h1>
                    <p className="mt-4 text-xs font-mono uppercase tracking-widest text-cyan-400/80">
                        Active R&D • Product Studio
                    </p>
                    <p className="mt-8 text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl font-light">
                        {vibespark.subtitle}
                    </p>
                </motion.section>

                {/* PHASE 1: MARKET */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-purple-500 pl-6">
                        {vibespark.phase1.title}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {vibespark.phase1.points.map((point, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mb-4 group-hover:scale-150 transition-transform" />
                                <h3 className="text-lg font-semibold text-purple-200 mb-3">{point.bold}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">{point.text}</p>
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
                    className="relative"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent md:block hidden" />

                    <div className="md:pl-12">
                        <h2 className="text-3xl font-bold text-white mb-12">
                            {vibespark.phase2.title}
                        </h2>
                        <div className="space-y-12">
                            {vibespark.phase2.points.map((point, i) => (
                                <div key={i} className="relative">
                                    <h3 className="text-xl font-bold text-cyan-400 mb-2">{point.bold}</h3>
                                    <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">{point.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* PHASE 3: ENGINEERING - TECH STACK */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-emerald-500 pl-6">
                        {vibespark.phase3.title}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {vibespark.phase3.points.map((point, i) => (
                            <div key={i} className={`p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${i === 2 ? 'md:col-span-2 from-emerald-900/20 to-black' : 'from-white/5 to-transparent'}`}>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                    {point.bold}
                                </h3>
                                <p className="text-white/60 leading-relaxed whitespace-pre-line font-mono text-sm">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* PHASE 4: OUTCOME - GLOW CARD */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="relative p-10 md:p-16 rounded-[2.5rem] overflow-hidden text-center"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
                            {vibespark.phase4.title}
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            {vibespark.phase4.points.map((point, i) => (
                                <div key={i} className="space-y-2">
                                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                        {point.bold}
                                    </h3>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        {point.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

            </div>
        </main>
    );
}
