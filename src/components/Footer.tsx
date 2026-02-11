"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative z-50 w-full mt-auto bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-8">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* LEFT: System Status */}
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-3 h-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                        System Online
                    </span>
                </div>

                {/* CENTER: Quick Nav */}
                <nav className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-white/40">
                    <Link href="/englivo" className="hover:text-white transition-colors">Englivo</Link>
                    <span className="opacity-20">/</span>
                    <Link href="/wehostt" className="hover:text-white transition-colors">WeHostt</Link>
                    <span className="opacity-20">/</span>
                    <Link href="/vibespark" className="hover:text-purple-400 transition-colors">VibeSpark</Link>
                </nav>

                {/* RIGHT: Uplink */}
                <a
                    href="mailto:shekharswarup67@gmail.com"
                    className="group flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                    <span className="text-xs font-medium text-white/80 group-hover:text-white">Initiate Uplink</span>
                    <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="text-xs"
                    >
                        ▲
                    </motion.span>
                </a>

            </div>

            {/* Bottom Bar: Copyright */}
            <div className="w-full text-center py-4">
                <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">
                    © {new Date().getFullYear()} Swarup Shekhar • Product Studio
                </p>
            </div>
        </footer>
    );
}
