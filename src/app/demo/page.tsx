"use client";

import { FireBall } from "@/components/fireball";
import { useRef } from "react";

export default function DemoPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-12">FireBall Hover Effect Demo</h1>
      
      <div className="mb-12 text-center">
        <p className="text-white/80 text-lg mb-4">Move your mouse around to see the fireball follow your cursor</p>
        <p className="text-white/60 text-sm">The fireball responds to mouse movement with smooth tracking</p>
      </div>
      
      <div 
        ref={containerRef} 
        className="relative w-full h-96 max-w-4xl bg-black/30 rounded-xl overflow-hidden border border-white/10"
        style={{ width: "100%", height: "400px", zIndex: 5 }}
      >
        <FireBall
          blobRadius={6}
          ballColor="#ff2d75"
          colors={["#ff2d75", "#ff5500", "#ffcc00", "#ff9900"]}
          followMouse={true}
          intensity={0.3}
          containerRef={containerRef}
        />
      </div>
      
      <div className="mt-12 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold text-white mb-4">How it works</h2>
        <p className="text-white/80 mb-2">• The fireball follows your mouse cursor with smooth animation</p>
        <p className="text-white/80 mb-2">• Uses requestAnimationFrame for smooth 60fps performance</p>
        <p className="text-white/80">• Has a subtle pulsating effect even when not moving</p>
      </div>
    </div>
  );
}