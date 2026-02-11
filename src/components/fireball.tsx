"use client";

import { useEffect, useRef, useState } from "react";

type FireBallProps = {
  blobRadius?: number;
  ballColor?: string;
  colors?: string[];
  followMouse?: boolean;  // New prop to enable/disable mouse following
  intensity?: number;     // New prop to control sensitivity
  containerRef?: React.RefObject<HTMLElement | null>;
};

export function FireBall({
  blobRadius = 6,
  ballColor = "#7c3aed",
  colors = ["#9c88ff", "#7c3aed", "#a855f7", "#c084fc"],
  followMouse = true,  // Default to true for hover effect
  intensity = 0.3,    // Sensitivity of mouse following
  containerRef,
}: FireBallProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Use refs to access latest values in animation loop without restarting it
  const stateRef = useRef({
    followMouse,
    intensity,
    isMouseInside,
    mousePosition
  });

  // Update refs when props/state change
  useEffect(() => {
    stateRef.current = { followMouse, intensity, isMouseInside, mousePosition };
  }, [followMouse, intensity, isMouseInside, mousePosition]);

  useEffect(() => {
    const container = containerRef?.current || (blobRef.current?.parentElement);
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Small check to avoid doing work on touch devices if they trigger mousemove
      if (window.matchMedia("(pointer: coarse)").matches) return;

      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        setMousePosition({
          x: mouseX, // Store raw position, apply intensity in loop
          y: mouseY
        });
      }
    };

    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
      setMousePosition({ x: 0, y: 0 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    let animationFrame: number;

    const animate = () => {
      if (blobRef.current) {
        const blob = blobRef.current;
        const state = stateRef.current;

        if (state.followMouse) {
          let x, y;
          if (state.isMouseInside) {
            // Apply intensity here
            x = state.mousePosition.x * state.intensity;
            y = state.mousePosition.y * state.intensity;
          } else {
            x = Math.sin(Date.now() / 2000) * 30;
            y = Math.cos(Date.now() / 2000) * 30;
          }

          const scale = 1 + Math.sin(Date.now() / 3000) * 0.1;
          blob.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        } else {
          const x = Math.sin(Date.now() / 2000) * 50;
          const y = Math.cos(Date.now() / 2000) * 50;
          const scale = 1 + Math.sin(Date.now() / 3000) * 0.1;
          blobRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [containerRef]); // Only re-run if container changes

  return (
    <div
      ref={blobRef}
      className="relative w-[350px] h-[350px] md:w-[700px] md:h-[700px] rounded-full opacity-80"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]} 40%, transparent 75%)`,
        filter: `blur(${blobRadius * (isMobile ? 3 : 6)}px)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${ballColor}40, transparent 70%)`,
        }}
      />
    </div>
  );
}
