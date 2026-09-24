"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  duration: string;
  desc: string[];
  techs: string[];
}

const experienceData: ExperienceItem[] = [
  {
    year: "2024 — 2025",
    company: "Intecai Digital Limited",
    role: "Mobile App Developer / Software Developer",
    duration: "Dec 2024 – Dec 2025",
    desc: [
      "Directed frontend app architecture, maintaining clean atomic styling and reusable layout modules.",
      "Built a reusable component system, reducing frontend development time on mobile platforms by 30%.",
      "Optimized application loading latency by 40% using code splitting and asset compression."
    ],
    techs: ["React", "React Native", "Next.js", "Node.js", "Expo", "Socket.IO", "OneSignal"],
  },
  {
    year: "2022 — 2024",
    company: "Zealey.AI Tech Solution Pvt. Ltd.",
    role: "Software Engineer",
    duration: "Aug 2022 – Nov 2024",
    desc: [
      "Designed and integrated responsive web structures, boosting user session retention by 25%.",
      "Integrated targeted local push notifications, triggering a 20% engagement surge.",
      "Identified and resolved 80+ critical mobile layout scroll and layout collisions."
    ],
    techs: ["React.js", "Angular", "Node.js", "React Native", "Redux", "Bootstrap"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-[#F7F7F7] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Title */}
        <div className="mb-20 border-b border-white/12 pb-8">
          <span className="font-mono text-xs tracking-[0.25em] text-[#929292] uppercase">
            06 — PROFESSIONAL JOURNEY
          </span>
          <h2 className="animate-title-scroll mt-4 text-4xl font-black uppercase tracking-tight text-white leading-none md:text-7xl font-space">
            EXPERIENCE<span className="text-[#FF1F2D]">.</span>
          </h2>
        </div>

        {/* Editorial Timeline Rows */}
        <div className="flex flex-col">
          {experienceData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 border-b border-white/12 last:border-b-0"
            >
              
              {/* Left column: Large year */}
              <div className="md:col-span-4 flex flex-col justify-start">
                <span className="text-3xl md:text-5xl font-black text-[#FF1F2D] font-space tracking-tight select-none leading-none">
                  {item.year}
                </span>
                <span className="mt-2 text-xs font-mono tracking-widest text-[#929292] uppercase">
                  {item.duration}
                </span>
              </div>

              {/* Right column: Role details */}
              <div className="md:col-span-8 flex flex-col">
                <h3 className="text-2xl font-black text-[#F7F7F7] uppercase tracking-tight leading-none">
                  {item.role}
                </h3>
                <span className="mt-2 text-sm font-bold text-[#FF1F2D] uppercase tracking-widest select-none">
                  {item.company}
                </span>

                {/* Bullets */}
                <div className="mt-6 flex flex-col gap-3">
                  {item.desc.map((bullet, i) => (
                    <p
                      key={i}
                      className="text-xs font-semibold text-[#929292] leading-relaxed md:text-sm"
                    >
                      • {bullet}
                    </p>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {item.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-[9px] font-black tracking-widest text-[#929292] uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
