"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Cpu, Database, ArrowUpRight } from "lucide-react";

interface Service {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    num: "01",
    title: "FRONTEND DEVELOPMENT",
    desc: "Building highly polished, responsive, and tactile web applications using React, Next.js, and TypeScript, optimized for fast paint times.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    num: "02",
    title: "MOBILE APPLICATIONS",
    desc: "Developing cross-platform native mobile platforms with React Native CLI and Expo, integrating GPS overlays, local syncs, and push alerts.",
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    num: "03",
    title: "3D / INTERACTIVE EXPERIENCES",
    desc: "Creating hardware-accelerated 3D customizers and landing pages with Three.js, React Three Fiber, WebGL shaders, and GSAP timelines.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    num: "04",
    title: "FULL STACK DEVELOPMENT",
    desc: "Structuring clean server architectures with Node.js, Express, Socket.IO websocket feeds, and scalable MongoDB databases.",
    icon: <Database className="h-6 w-6" />,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-white overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-[#929292] uppercase">
            03 — EXPERTISE
          </span>
          
          <h2 className="animate-title-scroll mt-4 text-4xl font-black uppercase tracking-tight text-[#F7F7F7] leading-[0.95] md:text-6xl font-space">
            WHAT I HELP
            <span className="block mt-2">
              YOU TO <span className="text-[#FF1F2D]">BUILD...</span>
            </span>
          </h2>
        </div>

        {/* 2-Column Grid (Strictly defined as per reference specifications) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {services.map((service) => (
            <motion.div
              key={service.num}
              whileHover={{
                y: -6,
                backgroundColor: "#FF1F2D",
                borderColor: "#FF1F2D",
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between rounded-[28px] border border-white/12 bg-[#0B0B0B] p-6 md:p-8 min-h-[260px] cursor-pointer"
            >
              {/* Top Row: Number (Left) & Icon (Right) */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm font-black text-[#929292] group-hover:text-white/60">
                  {service.num}
                </span>
                <div className="text-[#FF1F2D] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Middle: Title */}
              <div className="my-6">
                <h3 className="text-xl font-black tracking-widest text-[#F7F7F7] uppercase font-space group-hover:text-white">
                  {service.title}
                </h3>
              </div>

              {/* Bottom Row: Description (Left) & Arrow link (Right) */}
              <div className="flex items-end justify-between gap-6 pt-2 border-t border-white/5 group-hover:border-white/10">
                <p className="text-xs font-semibold text-[#929292] leading-relaxed group-hover:text-white/90 transition-colors duration-300 max-w-[80%]">
                  {service.desc}
                </p>
                <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-[#929292] group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

