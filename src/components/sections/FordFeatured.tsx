"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import MagneticButton from "../animations/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FordFeatured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Parallax scroll calculation
    if (imageRef.current && containerRef.current) {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col justify-center bg-[#050505] px-6 py-24 text-white overflow-hidden md:px-12"
    >
      {/* Decorative Red Abstract Parallax Shape */}
      <div className="absolute left-[5%] bottom-[5%] h-80 w-80 rounded-full bg-[#FF1E2D]/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 items-center">
          
          {/* Left Column: Heading and info */}
          <div className="flex flex-col md:col-span-5">
            <span className="font-mono text-xs tracking-[0.25em] text-[#A8A8A8] uppercase">
              05 — FEATURED PROJECT
            </span>

            <h2 className="mt-8 text-5xl font-black uppercase tracking-tight text-white leading-[0.85] md:text-7xl font-space">
              FORD GARAGE
              <span className="block text-stroke-main text-transparent font-extrabold mt-2">
                INTERACTIVE
              </span>
              <span className="block text-[#FF1E2D] mt-2">3D EXPERIENCE.</span>
            </h2>

            <p className="mt-8 text-sm font-semibold text-[#A8A8A8] leading-relaxed">
              Explore classic Mustangs, modern sports models, and pickup trucks in an immersive, customizable 3D environment. Rebuilt with custom car shaders and orbit cameras.
            </p>

            {/* Framework Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-white/70 uppercase">
                React Three Fiber
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-white/70 uppercase">
                Three.js
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#FF1E2D] uppercase">
                GSAP
              </span>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <MagneticButton>
                <a
                  href="https://fordgarage.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF1E2D] px-6 py-2.5 text-xs font-black tracking-widest text-white hover:bg-[#F52535] hover:scale-105 active:scale-95 uppercase"
                >
                  VISIT SHOWROOM →
                </a>
              </MagneticButton>
              
              <a
                href="https://github.com/devilkig893-alt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-black tracking-widest text-[#A8A8A8] hover:text-white transition-colors uppercase"
              >
                <Github className="h-4 w-4" /> CODE REPO
              </a>
            </div>
          </div>

          {/* Right Column: Visual area with parallax */}
          <div className="md:col-span-7">
            <div
              data-cursor="view"
              className="relative h-[50vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:h-[65vh] cursor-pointer"
            >
              <img
                ref={imageRef}
                src="/images/ford_garage.jpg"
                alt="Ford Garage 3D Showroom"
                className="absolute inset-0 h-[125%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

