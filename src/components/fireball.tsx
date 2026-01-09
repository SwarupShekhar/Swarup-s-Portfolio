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

  useEffect(() => {
    const container = containerRef?.current || (blobRef.current?.parentElement);
    if (!container) {
      console.warn("FireBall: No container found, using fallback animation");
      // If no container is found, use fallback animation
      let animationFrame: number;
      
      const animate = () => {
        if (blobRef.current) {
          const x = Math.sin(Date.now() / 2000) * 50;
          const y = Math.cos(Date.now() / 2000) * 50;
          const scale = 1 + Math.sin(Date.now() / 3000) * 0.1;
          
          blobRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
      return; // Exit early since we're using fallback
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        setMousePosition({
          x: mouseX * intensity,
          y: mouseY * intensity
        });
      }
    };

    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
      // Reset position when mouse leaves
      setMousePosition({ x: 0, y: 0 });
    };

    // Add event listeners to the container
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    let animationFrame: number;

    const animate = () => {
      if (blobRef.current && followMouse) {
        const blob = blobRef.current;
        
        // Calculate position based on mouse position and automatic animation
        let x, y;
        if (isMouseInside) {
          x = mousePosition.x;
          y = mousePosition.y;
        } else {
          // Fallback to original animation when mouse is outside
          x = Math.sin(Date.now() / 2000) * 30;
          y = Math.cos(Date.now() / 2000) * 30;
        }
        
        // Add subtle pulsating effect
        const scale = 1 + Math.sin(Date.now() / 3000) * 0.1;

        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      } else if (blobRef.current) {
        // Original animation for when followMouse is false
        const x = Math.sin(Date.now() / 2000) * 50;
        const y = Math.cos(Date.now() / 2000) * 50;
        const scale = 1 + Math.sin(Date.now() / 3000) * 0.1;

        blobRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
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
  }, [followMouse, intensity, isMouseInside, mousePosition, containerRef]);

  return (
    <div
      ref={blobRef}
      className="relative w-[800px] h-[800px] rounded-full opacity-100"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]} 30%, ${colors[2] || colors[0]} 60%, ${colors[3] || colors[1]} 85%)`,
        filter: `blur(${blobRadius * 8}px)`,
        boxShadow: `0 0 80px 30px ${colors[0]}80, 0 0 120px 50px ${colors[1]}60`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${ballColor}80, transparent 90%)`,
        }}
      />
    </div>
  );
}
