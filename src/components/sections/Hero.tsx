"use client";

import { motion } from "framer-motion";
import BloodRavenScene from "../3d/BloodRavenScene";
import MagneticButton from "../animations/MagneticButton";

export default function Hero() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const titleLineVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const canvasWrapperVariants = {
    initial: { scale: 0.85, opacity: 0, y: 50 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        delay: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex w-full min-h-screen flex-col justify-between bg-[#050505] pt-[150px] pb-10 md:pb-14 lg:pb-16 px-5 md:px-8 lg:px-12 text-white overflow-hidden"
    >
      {/* Full-width interactive Three.js 3D environment in the background */}
      <BloodRavenScene />

      {/* Main Grid Container centered on the page */}
      <div className="relative z-20 w-full max-w-[1320px] mx-auto flex flex-col justify-start flex-grow">
        
        {/* 12-Column Balanced Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center w-full">
          
          {/* Left Column: Typography Stack, copy, and CTAs (spans 7 columns on desktop) */}
          <div className="hero-content flex flex-col justify-start z-10">
            
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="w-full mt-2"
            >
              <div className="overflow-hidden pb-1">
                <motion.h1
                  variants={titleLineVariants}
                  className="hero-title-clamp font-black uppercase text-[#F7F7F7] select-none font-space tracking-tight"
                >
                  BUILD
                </motion.h1>
              </div>
              
              <div className="overflow-hidden pb-1">
                <motion.h1
                  variants={titleLineVariants}
                  className="hero-title-clamp font-extrabold uppercase text-stroke-main text-transparent select-none font-space tracking-tight"
                >
                  DIGITAL
                </motion.h1>
              </div>

              <div className="overflow-hidden pb-1">
                <motion.h1
                  variants={titleLineVariants}
                  className="hero-title-clamp font-black uppercase text-[#FF1F2D] select-none font-space tracking-tight"
                >
                  EXPERIENCES.
                </motion.h1>
              </div>
            </motion.div>

            {/* Description text & Buttons (placed directly below headings) */}
            <div className="mt-8 md:mt-12 max-w-[620px]">
              <p className="text-base font-medium text-[#929292] md:text-[18px] leading-relaxed">
                Frontend & Mobile Application Developer building modern digital experiences with React, React Native, Next.js, and TypeScript. 3.5+ years of shipping products.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <MagneticButton>
                  <a
                    href="#projects"
                    className="group inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#FF1F2D] px-4 text-[10px] font-black tracking-widest text-[#F7F7F7] transition-all duration-300 hover:bg-[#FF1F2D]/90 hover:-translate-y-0.5 active:translate-y-0 uppercase cursor-none"
                  >
                    VIEW MY WORK <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="#contact"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-4 text-[10px] font-black tracking-widest text-[#F7F7F7] transition-colors duration-300 hover:bg-white/5 hover:scale-105 active:scale-95 uppercase cursor-none"
                  >
                    LET'S TALK
                  </a>
                </MagneticButton>
              </div>
            </div>

          </div>

          {/* Right Column: Dedicated layout spacer to align typography columns on the left */}
          <div className="hero-visual relative z-5 w-full md:w-[clamp(480px,40vw,720px)] h-[320px] sm:h-[420px] md:h-[clamp(500px,62vh,720px)] md:justify-self-end flex items-center justify-center pointer-events-none" />

        </div>

        {/* Bottom Area: Metadata footer spanning full content width */}
        <div className="mt-16 lg:mt-24 border-t border-white/15 pt-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-[10px] font-black tracking-widest text-[#929292] uppercase z-20 w-full">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1F2D] inline-block animate-pulse" />
            FRONTEND • MOBILE • CREATIVE
          </div>

          <div className="border-l-0 md:border-l border-white/10 md:pl-6">
            3.5+ YEARS EXPERIENCE
          </div>

          <div className="border-l-0 md:border-l border-white/10 md:pl-6">
            CHENNAI, INDIA
          </div>

          <div className="flex items-center gap-2 border-l-0 md:border-l border-white/10 md:pl-6">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
            AVAILABLE FOR WORK
          </div>
        </div>

      </div>
    </section>
  );
}
