"use client";

import { motion } from "framer-motion";

const tools = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Three.js",
  "GSAP",
  "Tailwind",
  "Redux",
  "Zustand",
  "MongoDB",
  "Git",
  "Swift",
  "Expo",
];

export default function Skills() {
  return (
    <section
      id="tools"
      className="relative w-full bg-[#050505] px-6 py-24 text-white overflow-hidden md:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.25em] text-[#A8A8A8] uppercase">
            05 — STACK
          </span>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-white leading-none md:text-6xl font-space">
            TOOLS I <span className="text-[#FF1E2D]">USE.</span>
          </h2>
        </div>

        {/* Tools Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <motion.div
              key={tool}
              whileHover={{
                scale: 1.08,
                backgroundColor: "#FF1E2D",
                borderColor: "transparent",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="cursor-pointer flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0B0B0B] text-center p-2 transition-colors select-none md:h-28 md:w-28"
            >
              {/* Tool Text Display */}
              <span className="text-[10px] font-black tracking-widest uppercase text-white leading-tight">
                {tool}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
