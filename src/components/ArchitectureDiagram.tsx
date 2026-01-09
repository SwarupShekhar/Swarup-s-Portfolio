"use client";

import { motion } from "framer-motion";

export default function ArchitectureDiagram() {
    return (
        <div className="relative w-full p-8 rounded-3xl bg-black/40 border border-white/10 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto pb-4 md:pb-0">

                {/* Node 1: User */}
                <SystemNode title="User Audio" icon="🎤" delay={0} color="border-white/20 text-white" />

                <ConnectionLine />

                {/* Node 2: Stream Processor */}
                <SystemNode title="Stream Processor" icon="⚡" delay={0.2} color="border-emerald-500/50 text-emerald-400" />

                <ConnectionLine />

                {/* Node 3: AI Model */}
                <SystemNode title="LLM & Speech" icon="🧠" delay={0.4} color="border-violet-500/50 text-violet-400" />

                <ConnectionLine />

                {/* Node 4: Metric Engine */}
                <SystemNode title="Metric Engine" icon="📊" delay={0.6} color="border-fuchsia-500/50 text-fuchsia-400" />

                <ConnectionLine />

                {/* Node 5: Feedback UI */}
                <SystemNode title="Feedback UI" icon="📱" delay={0.8} color="border-white/20 text-white" />
            </div>

            {/* Active Data Pulse Animation */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-0 w-20 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm opacity-50 pointer-events-none"
            />
        </div>
    );
}

function SystemNode({ title, icon, delay, color }: { title: string, icon: string, delay: number, color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className={`
        flex flex-col items-center justify-center gap-3 
        min-w-[140px] h-[120px] 
        rounded-2xl border bg-black/50 backdrop-blur-md 
        ${color} shadow-lg
      `}
        >
            <span className="text-3xl">{icon}</span>
            <span className="text-xs font-mono font-medium tracking-wide uppercase">{title}</span>
        </motion.div>
    );
}

function ConnectionLine() {
    return (
        <div className="hidden md:block h-[1px] w-12 bg-white/10 relative">
            <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 48, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-2px] left-0 w-2 h-2 rounded-full bg-white/50 blur-[1px]"
            />
        </div>
    );
}
