"use client";

import { useEffect, useRef } from "react";

interface Star {
    // Physics properties
    x: number;
    y: number;
    z: number; // For 3D depth effect

    // Entropy State (Random noise)
    originX: number;
    originY: number;

    // Grid State (Structured analysis)
    gridX: number;
    gridY: number;

    size: number;
    opacity: number;
    twinklePhase: number;
    twinkleSpeed: number;
}

export function GalaxyField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;
        let scrollY = 0;

        const stars: Star[] = [];
        const STAR_COUNT = width < 768 ? 250 : 1200;

        // Initialize stars with both Random and Grid positions
        const initStars = () => {
            stars.length = 0;
            const cols = Math.floor(Math.sqrt(STAR_COUNT * (width / height)));
            const rows = Math.ceil(STAR_COUNT / cols);
            const cellW = width / cols;
            const cellH = height / rows;

            for (let i = 0; i < STAR_COUNT; i++) {
                // Random Origin (Entropy)
                const originX = (Math.random() - 0.5) * width * 1.5 + width / 2;
                const originY = (Math.random() - 0.5) * height * 1.5 + height / 2;

                // Grid Target (Structure)
                const col = i % cols;
                const row = Math.floor(i / cols);
                const gridX = col * cellW + cellW / 2 + (Math.random() - 0.5) * 20; // Slight jitter
                const gridY = row * cellH + cellH / 2 + (Math.random() - 0.5) * 20;

                stars.push({
                    x: originX,
                    y: originY,
                    z: Math.random() * 2 + 1, // Depth factor
                    originX,
                    originY,
                    gridX,
                    gridY,
                    size: Math.random() * (width < 768 ? 2.5 : 1.5) + 0.5, // Larger stars for mobile clarity
                    opacity: Math.random() * 0.5 + 0.3, // Brighter stars
                    twinklePhase: Math.random() * Math.PI * 2,
                    twinkleSpeed: 0.02 + Math.random() * 0.03
                });
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        handleResize(); // Initial setup

        // Physics Helpers
        const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
        const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Normalize scroll progress (0 to 1 based on viewport height)
            // We expect the chaos-to-order transition to happen in the first 2 screens (2 * height)
            const scrollProgress = Math.max(0, scrollY / (height * 3));

            // Phase 1: Entropy (0) -> Grid (0.3)
            // Phase 2: Grid (0.3) -> Singularity/Fireball (0.7+)

            const gridPhase = clamp(scrollProgress * 2.5, 0, 1); // 0 -> 1 by scroll 0.4
            const singularityPhase = clamp((scrollProgress - 0.4) * 3, 0, 1); // Starts after 0.4

            const centerX = width / 2;
            const centerY = height / 2;

            stars.forEach((star) => {
                // 1. Calculate Target Position based on Phase
                let targetX = lerp(star.originX, star.gridX, gridPhase);
                let targetY = lerp(star.originY, star.gridY, gridPhase);

                // 2. Apply Singularity Pull (Collapse to center)
                if (singularityPhase > 0) {
                    // Spiral effect into center
                    const angle = Math.atan2(targetY - centerY, targetX - centerX);
                    const dist = Math.sqrt(Math.pow(targetX - centerX, 2) + Math.pow(targetY - centerY, 2));

                    const pullFactor = singularityPhase * singularityPhase; // Non-linear pull
                    const spiralAngle = angle + pullFactor * 2; // Rotate as it pulls in
                    const newDist = lerp(dist, 50, pullFactor); // Pull towards 50px radius

                    targetX = centerX + Math.cos(spiralAngle) * newDist;
                    targetY = centerY + Math.sin(spiralAngle) * newDist;
                }

                // 3. Smoothly interpolating current position to target (Ease-out)
                star.x = lerp(star.x, targetX, 0.1);
                star.y = lerp(star.y, targetY, 0.1);

                // Twinkle
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase) * 0.3;

                // Opacity logic: Fade out slightly when entering singularity to avoid whiteout
                const baseOpacity = singularityPhase > 0.8 ? star.opacity * (1 - singularityPhase) : star.opacity;
                const opacity = clamp(baseOpacity + twinkle, 0, 1);

                // Color shift: White -> Blue -> Violet based on scroll
                let color = `255, 255, 255`;
                if (gridPhase > 0.5) color = `160, 200, 255`; // Blueish
                if (singularityPhase > 0.5) color = `200, 160, 255`; // Violetish

                ctx.fillStyle = `rgba(${color}, ${opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Delay start to unblock main thread
        const timeoutId = setTimeout(() => {
            handleResize();
            window.addEventListener("resize", handleResize);
            window.addEventListener("scroll", handleScroll);
            render();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
        />
    );
}
