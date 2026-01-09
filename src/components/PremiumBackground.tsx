"use client";

export default function PremiumBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* 1. Base Gradient */}
            <div className="absolute inset-0 bg-black" />

            {/* 2. Top-Right Subtle Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-900/10 rounded-full blur-[120px] opacity-40 mix-blend-screen" />

            {/* 3. Bottom-Left Subtle Glow */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full blur-[120px] opacity-40 mix-blend-screen" />

            {/* 4. Moving Aurora (Optional, kept extremely subtle) */}
            <div
                className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-fuchsia-900/05 rounded-full blur-[100px] animate-pulse"
                style={{ animationDuration: '8s' }}
            />

            {/* 5. Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
}
