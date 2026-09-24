"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Split text into lines dynamically or target spans
    const lines = text.querySelectorAll(".intro-line");

    gsap.fromTo(
      lines,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.0,
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
      ref={containerRef}
      className="relative flex w-full flex-col justify-center bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-white overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Label */}
        <div className="mb-10 font-mono text-xs tracking-[0.25em] text-[#A8A8A8] uppercase">
          01 — INTRODUCTION
        </div>

        {/* Large Statement - Split into line wrappers for clipping mask reveal */}
        <h2
          ref={textRef}
          className="section-title-clamp font-black uppercase tracking-tight text-white leading-[0.9] font-space"
        >
          <span className="block overflow-hidden pb-1">
            <span className="intro-line inline-block">I BUILD</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="intro-line inline-block">INTERFACES</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="intro-line inline-block">THAT FEEL</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="intro-line inline-block text-[#FF1E2D]">ALIVE.</span>
          </span>
        </h2>

        {/* Description Text */}
        <div className="mt-14 max-w-xl text-sm font-semibold text-[#A8A8A8] md:text-base leading-relaxed">
          I am a Frontend & Mobile Developer who bridges the gap between pure engineering logic and visual design, turning product concepts into tactile, high-performance interactions.
        </div>
      </div>
    </section>
  );
}
