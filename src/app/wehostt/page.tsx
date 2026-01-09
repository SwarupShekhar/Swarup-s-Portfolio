"use client";

import { motion } from "framer-motion";

export default function WeHosttPage() {
    return (
        <main className="max-w-6xl mx-auto py-32 px-6 space-y-28">
            {/* HERO */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-sm font-medium tracking-wide text-indigo-500 uppercase">
                    Revenue SaaS
                </p>
                <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight">
                    WeHostt
                </h1>
                <p className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                    Product Engineer • Vaidik Eduservices
                </p>
                <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                    Vertical SaaS designed for hospitality lead capture. It routes client inquiries directly into a revenue-generating workflow, bypassing the complexity of generic CRMs.
                </p>
            </motion.section>

            {/* COMPETITIVE SYNTHESIS */}
            <section className="max-w-5xl mx-auto w-full">
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
                        <p className="text-white/70 font-semibold">Generic CRMs</p>
                        <p className="mt-2 text-white/40 text-sm">
                            Powerful but complex, not designed for hospitality workflows or rapid lead conversion.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
                    >
                        <p className="text-white/70 font-semibold">Website Forms</p>
                        <p className="mt-2 text-white/40 text-sm">
                            Simple but blind. Leads arrive without qualification, routing, or follow-up automation.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 hover:bg-emerald-400/10 transition-colors"
                    >
                        <p className="text-emerald-400 font-semibold">WeHostt</p>
                        <p className="mt-2 text-white/70 text-sm">
                            A vertical SaaS that captures, qualifies, and routes hospitality leads directly into revenue-generating workflows.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
