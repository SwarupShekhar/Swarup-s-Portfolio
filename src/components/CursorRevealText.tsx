'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Base64 SVG circle mask (same technique as the Framer component)
const CIRCLE_SVG = "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEOUQ5RDkiLz4KPC9zdmc+Cg==')";

const DEFAULT_SIZE = 40;
const HOVER_SIZE = 400;
// How far the reveal layer extends beyond the container (px)
const BLEED = 200;

export default function CursorRevealText({
    primaryText,
    revealText,
    backgroundColor = 'transparent',
    revealBackgroundColor = '#059669',
    textColor = 'rgba(255,255,255,0.45)',
    revealTextColor = '#050505',
    className = '',
}: {
    primaryText: React.ReactNode;
    revealText: React.ReactNode;
    backgroundColor?: string;
    revealBackgroundColor?: string;
    textColor?: string;
    revealTextColor?: string;
    className?: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Detect mobile — no cursor hover on touch devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Only attach mousemove on desktop
    useEffect(() => {
        if (isMobile) return;

        const updateMousePosition = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [isMobile]);

    const size = isHovered ? HOVER_SIZE : DEFAULT_SIZE;

    // Mobile: just render the primary text, no mask or animation
    if (isMobile) {
        return (
            <div className={className} style={{ color: textColor }}>
                {primaryText}
            </div>
        );
    }

    // Offset the mouse position to account for the BLEED extension
    const maskX = mousePosition.x;
    const maskY = mousePosition.y + BLEED;

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                overflow: 'visible', // let the circle extend beyond container
                backgroundColor,
            }}
        >
            {/* REVEAL LAYER — extends beyond container via negative inset,
                masked to a circle so only the spotlight is visible */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: -BLEED,
                    bottom: -BLEED,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: revealTextColor,
                    backgroundColor: revealBackgroundColor,
                    maskImage: CIRCLE_SVG,
                    maskRepeat: 'no-repeat',
                    maskSize: `${DEFAULT_SIZE}px`,
                    WebkitMaskImage: CIRCLE_SVG,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: `${DEFAULT_SIZE}px`,
                    pointerEvents: 'none',
                }}
                animate={{
                    WebkitMaskPosition: `${maskX - size / 2}px ${maskY - size / 2}px`,
                    WebkitMaskSize: `${size}px`,
                    maskPosition: `${maskX - size / 2}px ${maskY - size / 2}px`,
                    maskSize: `${size}px`,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any}
                transition={{
                    type: 'tween',
                    ease: 'backOut',
                    duration: 0.5 * 0.5,
                }}
            >
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        cursor: 'default',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'auto',
                        paddingTop: BLEED,
                        paddingBottom: BLEED,
                    }}
                >
                    {revealText}
                </div>
            </motion.div>

            {/* BASE LAYER — normal flow, visible everywhere except under the mask */}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: textColor,
                }}
            >
                {primaryText}
            </div>
        </div>
    );
}
