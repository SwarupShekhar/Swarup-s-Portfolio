"use client";

import { useMemo, useState, useEffect } from "react";

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

export function ParticleCircle({
  colors,
  particleSize,
  particleCount,
  size,
}: ParticleCircleProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const result: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = (Math.random() * 0.5 + 0.5) * (size / 2);
      const x = size / 2 + Math.cos(angle) * radius;
      const y = size / 2 + Math.sin(angle) * radius;
      const s =
        particleSize[0] +
        Math.random() * (particleSize[1] - particleSize[0] || 0);
      const color = colors[i % colors.length] ?? "#22c55e";
      result.push({
        top: y,
        left: x,
        size: s,
        color,
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(result);
  }, [colors, particleCount, size, particleSize]);

  return (
    <div
      className="relative rounded-full"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {particles.map((p, idx) => (
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

