"use client";

import { motion } from "framer-motion";

export default function SystemBlock({
    title,
    description,
    tools,
    color,
}: {
    title: string;
    description: string;
    tools: string[];
    color: "emerald" | "violet" | "fuchsia";
}) {
    const glow =
        color === "emerald"
            ? "border-emerald-400/40 bg-emerald-400/5"
            : color === "violet"
                ? "border-violet-400/40 bg-violet-400/5"
                : "border-fuchsia-400/40 bg-fuchsia-400/5";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-10 rounded-3xl border ${glow}`}
        >
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-4 text-white/50 max-w-xl">{description}</p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
                {tools.map((tool) => (
                    <div
                        key={tool}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 text-sm"
                    >
                        {tool}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
