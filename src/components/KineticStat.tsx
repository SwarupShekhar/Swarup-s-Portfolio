"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function KineticStat({ value, label }: { value: string, label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState("000");

    useEffect(() => {
        if (!isInView) return;

        // Glitch effect logic
        let iteration = 0;
        const target = value;
        const interval = setInterval(() => {
            setDisplayValue(prev =>
                target
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return target[index];
                        }
                        // Return random digit or symbol
                        return String.fromCharCode(48 + Math.floor(Math.random() * 10));
                    })
                    .join("")
            );

            if (iteration >= target.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Speed of decoding
        }, 30);

        return () => clearInterval(interval);
    }, [isInView, value]);

    return (
        <div ref={ref} className="flex items-start gap-4">
            <div className="flex flex-col">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tighter"
                >
                    {displayValue}
                </motion.span>
                <span className="text-white/50 text-sm uppercase tracking-widest font-light mt-1">
                    {label}
                </span>
            </div>
        </div>
    );
}
