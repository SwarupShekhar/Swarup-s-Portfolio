"use client";

import { usePathname } from "next/navigation";

const statusMap: Record<string, string> = {
  "/": "Studio Online",
  "/englivo": "Englivo Engine Active",
  "/studio": "System Map Loaded",
  "/about": "Profile Loaded",
  "/demo": "Fireball Demo Active",
};

export default function Nav() {
  const pathname = usePathname();
  const status = statusMap[pathname] || "System Ready";

  return (
    <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-semibold tracking-wide">
            Swarup <span className="text-white/40 ml-2">• Protarchi</span>
          </p>
        </div>

        <div className="flex items-center gap-10 text-sm text-white/60">
          <a href="/englivo" className="hover:text-white">
            Englivo
          </a>
          <a href="/studio" className="hover:text-white">
            Studio
          </a>
          <a href="/demo" className="hover:text-white">
            Demo
          </a>
          <a href="/about" className="hover:text-white">
            About
          </a>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {status}
          </div>
        </div>
      </div>
    </nav>
  );
}

