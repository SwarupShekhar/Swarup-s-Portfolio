"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CYCLES_PER_LETTER = 2; // How many scrambles before solving a letter
const SHUFFLE_TIME = 30; // ms per shuffle

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayText, setDisplayText] = useState(text);

    // To avoid hydration mismatch, initially show text. But for effect, we might want to start scrambled? 
    // Let's keep it simple: Start scrambled when in view.
    // Actually, better to render placeholders first or empty?
    // Let's render the text immediately but if in view, start scramble sequence.

    // Better approach: Start with random chars of same length if mounted? 
    // For SEO, we want the text to be there. 
    // Let's use a standard "shuffle visual" on top of the real text, or replace the text.

    useEffect(() => {
        if (!isInView) return;

        let pos = 0;
        let cycles = 0;

        const interval = setInterval(() => {
            const scrambled = text.split("").map((char, index) => {
                if (index < pos) {
                    return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("");

            setDisplayText(scrambled);

            cycles++;
            if (cycles >= CYCLES_PER_LETTER) {
                cycles = 0;
                pos++;
            }

            if (pos >= text.length) {
                clearInterval(interval);
                setDisplayText(text); // Ensure final is exact
            }
        }, SHUFFLE_TIME);

        return () => clearInterval(interval);
    }, [isInView, text]);

    return (
        <motion.span ref={ref} className={className}>
            {displayText}
        </motion.span>
    );
}
