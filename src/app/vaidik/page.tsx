"use client";

import { motion } from "framer-motion";

export default function VaidikPage() {
    return (
        <main className="max-w-6xl mx-auto py-32 px-6 space-y-28">
            {/* HERO */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-sm font-medium tracking-wide text-indigo-500 uppercase">
                    Learning OS
                </p>
                <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight">
                    Vaidik Tutoring
                </h1>
                <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                    A comprehensive K12 and test-prep marketplace that functions as a student operating system. Combining diagnostics, tutoring workflows, and academic management.
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
                        <p className="text-white/70 font-semibold">Traditional Coaching Centers</p>
                        <p className="mt-2 text-white/40 text-sm">
                            High-touch but unscalable, expensive, and dependent on individual tutors.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
                    >
                        <p className="text-white/70 font-semibold">Mass EdTech Platforms</p>
                        <p className="mt-2 text-white/40 text-sm">
                            Scalable but impersonal, with little diagnostics or real academic accountability.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 hover:bg-emerald-400/10 transition-colors"
                    >
                        <p className="text-emerald-400 font-semibold">Vaidik Tutoring</p>
                        <p className="mt-2 text-white/70 text-sm">
                            Combines diagnostic intelligence, structured tutoring workflows, and managed academic teams into a scalable learning OS.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
