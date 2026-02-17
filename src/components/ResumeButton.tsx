"use client";

export default function ResumeButton() {
    return (
        <a
            href="https://drive.google.com/uc?export=download&id=14NHRunGc4_YvmIX1zll0s6Lg2ORtRmwX"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Swarup Shekhar resume as PDF"
        >
            <button className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full border border-emerald-500/60 bg-emerald-500/10 text-emerald-50 font-semibold text-sm md:text-base tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:bg-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] transition-all duration-300 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-emerald-300 group-hover:text-emerald-100 transition-colors"
                >
                    {/* Download icon: arrow down into a line */}
                    <path
                        d="M5 20h14v-2H5v2Zm7-16v8.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V4h1Z"
                        fill="currentColor"
                    />
                </svg>

                <span className="relative z-10 flex flex-col text-left">
                    <span className="uppercase text-[10px] md:text-[11px] text-emerald-300/80 tracking-[0.2em]">
                        Download PDF
                    </span>
                    <span className="text-sm md:text-base text-emerald-50">
                        Resume
                    </span>
                </span>

                {/* Hover halo to signal interactivity */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/10 blur-md transition-colors duration-300" />
            </button>
        </a>
    );
}

