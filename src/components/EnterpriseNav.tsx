"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PARTNERS = [
    { name: "TELUS", label: "TELUS International" },
    { name: "Tech M", label: "Tech Mahindra" },
    { name: "Turing", label: "Turing" },
    { name: "Centific", label: "Centific" },
    { name: "Innodata", label: "Innodata" },
];

export default function EnterpriseNav() {
    const [activePartner, setActivePartner] = useState<number>(-1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const height = window.innerHeight;

            // Determine active partner based on scroll depth
            // We want this to trigger mainly in the "Orchestrator" phase (later in scroll)

            const ORCHESTRATOR_START = height * 2.5;
            const ORCHESTRATOR_END = height * 4;

            if (scrollY < ORCHESTRATOR_START) {
                setActivePartner(-1);
            } else {
                const progress = (scrollY - ORCHESTRATOR_START) / (ORCHESTRATOR_END - ORCHESTRATOR_START);
                const index = Math.floor(progress * PARTNERS.length);
                setActivePartner(Math.max(0, Math.min(index, PARTNERS.length - 1)));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 pointer-events-none">
            {/* Connecting Line */}
            <div className="absolute right-[11px] top-0 bottom-0 w-px bg-white/5" />

            {PARTNERS.map((partner, i) => {
                const isActive = i === activePartner;
                const isPast = i < activePartner;

                return (
                    <motion.div
                        key={partner.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="relative flex items-center justify-end gap-4"
                    >
                        {/* Text Label (Only shows when active) */}
                        <motion.span
                            animate={{
                                opacity: isActive ? 1 : 0,
                                x: isActive ? 0 : 10
                            }}
                            className="text-xs font-mono uppercase tracking-widest text-emerald-400 whitespace-nowrap bg-black/50 backdrop-blur-sm px-2 py-1 rounded"
                        >
                            {partner.label}
                        </motion.span>

                        {/* Node */}
                        <motion.div
                            animate={{
                                scale: isActive ? 1.5 : 1,
                                backgroundColor: isActive || isPast ? "#10b981" : "#1f2937",
                                borderColor: isActive ? "#34d399" : "rgba(255,255,255,0.1)"
                            }}
                            className="w-6 h-6 rounded-full border border-white/10 bg-gray-800 flex items-center justify-center relative z-10"
                        >
                            <span className="text-[8px] font-bold text-white/80">{partner.name[0]}</span>

                            {/* Glow Ring */}
                            {isActive && (
                                <motion.span
                                    layoutId="partnerGlow"
                                    className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-50"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    );
}
