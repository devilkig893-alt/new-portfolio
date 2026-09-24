"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Slide line 1 left and line 2 right on scroll scrub
      gsap.fromTo(
        line1Ref.current,
        { x: "15%" },
        {
          x: "-15%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        }
      );

      gsap.fromTo(
        line2Ref.current,
        { x: "-15%" },
        {
          x: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[90vh] w-full flex-col justify-center overflow-hidden bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16"
    >
      {/* Decorative Red Abstract Parallax Shape */}
      <div className="absolute left-[30%] top-1/3 h-72 w-72 rounded-full bg-[#FF1E2D]/5 blur-[90px] pointer-events-none" />

      <div className="flex flex-col gap-6 text-center select-none">
        
        {/* Line 1 - slides left */}
        <div
          ref={line1Ref}
          className="whitespace-nowrap text-5xl font-black uppercase tracking-tighter text-white md:text-8xl lg:text-[10rem] font-space"
        >
          CODE SHOULD NOT JUST WORK.
        </div>

        {/* Line 2 - slides right, highlighted in RED */}
        <div
          ref={line2Ref}
          className="whitespace-nowrap text-5xl font-black uppercase tracking-tighter text-[#FF1E2D] md:text-8xl lg:text-[10rem] font-space"
        >
          IT SHOULD FEEL RIGHT.
        </div>

      </div>
    </section>
  );
}
