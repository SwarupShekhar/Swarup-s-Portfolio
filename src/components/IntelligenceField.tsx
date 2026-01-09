"use client";

import { ParticleCircle } from "@/components/particle-circle";

export default function IntelligenceField() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40">
      <ParticleCircle
        colors={["#34d399", "#22c55e", "#a7f3d0", "#4ade80"]}
        particleSize={[1, 4]}
        particleCount={150}
        size={500}
      />
    </div>
  );
}

