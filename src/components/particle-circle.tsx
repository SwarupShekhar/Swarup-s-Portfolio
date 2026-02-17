"use client";

import { useEffect, useMemo, useState } from "react";

type ParticleCircleProps = {
  colors: string[];
  particleSize: [number, number];
  particleCount: number;
  size: number;
};

type Particle = {
  top: number;
  left: number;
  size: number;
  color: string;
};

// Deterministic PRNG so server and client generate identical particles
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ParticleCircle({
  colors,
  particleSize,
  particleCount,
  size,
}: ParticleCircleProps) {
  const [mounted, setMounted] = useState(false);

  // Avoid SSR/CSR hydration mismatches by only rendering particles on the client,
  // after the component has mounted.
  useEffect(() => {
    setMounted(true);
  }, []);

  const particles: Particle[] = useMemo(() => {
    if (!mounted) return [];

    const rand = mulberry32(1); // fixed seed so client renders are stable
    const result: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = (rand() * 0.5 + 0.5) * (size / 2);
      const x = size / 2 + Math.cos(angle) * radius;
      const y = size / 2 + Math.sin(angle) * radius;
      const s =
        particleSize[0] +
        rand() * (particleSize[1] - particleSize[0] || 0);
      const color = colors[i % colors.length] ?? "#22c55e";
      result.push({
        top: y,
        left: x,
        size: s,
        color,
      });
    }
    return result;
  }, [mounted, colors, particleCount, size, particleSize]);

  return (
    <div
      className="relative rounded-full"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {mounted &&
        particles.map((p, idx) => (
          <span
            key={idx}
            className="absolute rounded-full blur-[1px]"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: 0.8,
            }}
          />
        ))}
    </div>
  );
}

