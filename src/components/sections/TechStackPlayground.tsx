"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  level: string;
  category: string;
}

const skillsData: Skill[] = [
  { category: "frontend", name: "React.js", level: "90%" },
  { category: "frontend", name: "Angular", level: "80%" },
  { category: "frontend", name: "Next.js", level: "85%" },
  { category: "frontend", name: "JavaScript (ES6+)", level: "90%" },
  { category: "frontend", name: "TypeScript", level: "85%" },
  { category: "frontend", name: "HTML5 & CSS3", level: "95%" },
  { category: "frontend", name: "SCSS / Sass", level: "85%" },
  { category: "mobile", name: "React Native CLI", level: "90%" },
  { category: "mobile", name: "Expo", level: "90%" },
  { category: "mobile", name: "Android Studio", level: "80%" },
  { category: "mobile", name: "iOS Deployment", level: "80%" },
  { category: "mobile", name: "Swift", level: "75%" },
  { category: "mobile", name: "SwiftUI / UIKit", level: "75%" },
  { category: "state", name: "Redux Toolkit", level: "90%" },
  { category: "state", name: "Context API", level: "90%" },
  { category: "state", name: "Zustand", level: "85%" },
  { category: "ui", name: "PrimeReact", level: "85%" },
  { category: "ui", name: "Material UI", level: "90%" },
  { category: "ui", name: "React Native Paper", level: "85%" },
  { category: "backend", name: "Node.js", level: "75%" },
  { category: "backend", name: "Express.js", level: "75%" },
  { category: "backend", name: "REST APIs", level: "90%" },
  { category: "backend", name: "Firebase SDK", level: "85%" },
  { category: "db", name: "MongoDB", level: "75%" },
  { category: "db", name: "Firestore DB", level: "85%" },
  { category: "tools", name: "Git & GitHub", level: "90%" },
  { category: "tools", name: "VS Code", level: "95%" },
  { category: "tools", name: "Postman", level: "90%" },
  { category: "tools", name: "Figma UI/UX", level: "85%" }
];

const categories = [
  { id: "all", name: "All Skills" },
  { id: "frontend", name: "Frontend Web" },
  { id: "mobile", name: "Mobile Dev" },
  { id: "state", name: "State Mgmt" },
  { id: "ui", name: "UI Libraries" },
  { id: "backend", name: "Backend & APIs" },
  { id: "db", name: "Database" },
  { id: "tools", name: "Dev Tools" }
];

export default function TechStackPlayground() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="relative w-full bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-[#F7F7F7] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Section Title */}
        <div className="mb-12 border-b border-white/12 pb-8">
          <span className="font-mono text-xs tracking-[0.25em] text-[#929292] uppercase">
            05 — CORE EXPERTISE
          </span>
          <h2 className="animate-title-scroll mt-4 text-4xl font-black uppercase tracking-tight text-white leading-none md:text-7xl font-space">
            CORE <span className="text-[#FF1F2D]">EXPERTISE.</span>
          </h2>
          <p className="mt-4 text-sm font-semibold text-[#929292] leading-relaxed max-w-2xl">
            Clean organized layout of tools, languages, and libraries I use to build production systems.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full border px-5 py-2 text-[10px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer
                ${
                  activeCategory === cat.id
                    ? "bg-[#FF1F2D] text-white border-transparent shadow-md shadow-[#FF1F2D]/20 scale-105"
                    : "bg-[#0B0B0B] text-[#929292] border-white/10 hover:text-white hover:border-[#FF1F2D]/50"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -4, borderColor: "rgba(255, 31, 45, 0.4)" }}
                className="group flex flex-col justify-between rounded-[18px] border border-white/10 bg-[#0D0D0D] p-5 transition-colors duration-300 shadow-md hover:shadow-[0_0_20px_rgba(255,31,45,0.06)]"
              >
                <div className="flex flex-col gap-3">
                  {/* Skill Name & Level */}
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[11px] font-black text-white uppercase tracking-wider group-hover:text-[#FF1F2D] transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-black text-[#FF1F2D] group-hover:scale-105 transition-transform duration-300">
                      {skill.level}
                    </span>
                  </div>

                  {/* Glassmorphic Progress Bar */}
                  <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#FF1F2D]/80 to-[#FF1F2D] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
