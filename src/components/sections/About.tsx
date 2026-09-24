"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  "React.js",
  "Next.js",
  "React Native",
  "Expo",
  "TypeScript",
  "JavaScript",
  "Angular",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Socket.IO",
  "Redux",
  "Redux Toolkit",
  "Zustand",
  "TanStack Query",
  "Tailwind CSS",
  "Three.js",
  "React Three Fiber",
  "Drei",
  "GSAP",
  "Framer Motion",
  "Git",
  "GitHub",
  "AWS",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const lines = title.querySelectorAll(".about-title-line");

    gsap.fromTo(
      lines,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-[#F7F7F7] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Large Editorial Statement */}
        <div className="max-w-[1080px]">
          <span className="font-mono text-xs tracking-[0.25em] text-[#929292] uppercase">
            02 — PHILOSOPHY
          </span>
          
          <h2
            ref={titleRef}
            className="mt-8 text-5xl font-black uppercase tracking-tight text-[#F7F7F7] leading-[0.92] md:text-7xl lg:text-8xl font-space select-none"
          >
            <span className="block overflow-hidden pb-1">
              <span className="about-title-line inline-block">I BUILD DIGITAL</span>
            </span>
            <span className="block overflow-hidden pb-1 mt-2">
              <span className="about-title-line inline-block">EXPERIENCES THAT</span>
            </span>
            <span className="block overflow-hidden pb-1 mt-2">
              <span className="about-title-line inline-block text-[#FF1F2D]">FEEL ALIVE.</span>
            </span>
          </h2>
        </div>

        {/* Short Editorial Biography */}
        <div className="mt-12 max-w-[840px]">
          <p className="text-lg font-bold text-[#F7F7F7] md:text-[24px] leading-relaxed">
            I am a Frontend & Mobile Developer who bridges engineering logic and visual design, turning product concepts into tactile, high-performance experiences.
          </p>

          <p className="mt-6 text-sm font-semibold text-[#929292] leading-relaxed">
            Specializing in combining react-native native compilers with modular web engines, state synchronization, socket events, and hardware-accelerated three-dimensional components. Over 3.5 years of converting user experience briefs into premium digital assets.
          </p>
        </div>

        {/* Core Stack Pills */}
        <div className="mt-16">
          <h3 className="mb-8 font-mono text-[10px] tracking-[0.25em] text-[#929292] uppercase">
            ACTIVE TOOLCHAIN
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="cursor-pointer rounded-full border border-white/12 bg-[#0B0B0B] px-5 py-2 text-[10px] font-black tracking-widest text-[#F7F7F7] uppercase transition-colors hover:border-[#FF1F2D] hover:text-[#FF1F2D]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
