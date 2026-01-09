"use client";

import { motion } from "framer-motion";

const systems = [
  {
    name: "Englivo",
    type: "AI Fluency Engine",
    status: "Production",
    description: "AI-powered speaking reflex training system.",
  },
  {
    name: "Vibespark",
    type: "Real-Time Systems Lab",
    status: "In Development",
    description: "WebRTC-powered live voice and video platform.",
  },
  {
    name: "Tutoring Engine",
    type: "Marketplace Platform",
    status: "Production",
    description: "Multi-role booking, messaging, and payments.",
  },
  {
    name: "Vaidik K12",
    type: "Learning OS",
    status: "Production",
    description: "AI-assisted student diagnostics and tutoring.",
  },
  {
    name: "WeHostt",
    type: "Revenue SaaS",
    status: "Live",
    description: "Lead-to-client system for hospitality ops.",
  },
];

export default function StudioPage() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-24">
      <h1 className="text-5xl font-bold mb-4">Protarchi System Map</h1>
      <p className="text-white/50 mb-16 max-w-3xl">
        A living map of the digital systems I have designed and engineered. Each
        module represents a complete product or research engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {systems.map((sys, i) => (
          <motion.div
            key={sys.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="relative">
              <div className="rounded-2xl p-[1px] bg-[conic-gradient(at_top,_#fb0094,_#00b4ff,_#22c55e,_#facc15,_#fb0094)] system-card-border">
                <div className="h-full w-full rounded-2xl bg-black/90 px-5 py-6 backdrop-blur">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold">{sys.name}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                      {sys.status}
                    </span>
                  </div>

                  <p className="text-sm text-white/40 mb-2">{sys.type}</p>
                  <p className="text-sm text-white/60">{sys.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

