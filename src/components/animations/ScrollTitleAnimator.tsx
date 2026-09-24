"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollTitleAnimator() {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const timer = setTimeout(() => {
      const titles = document.querySelectorAll(".animate-title-scroll");

      titles.forEach((title) => {
        // Set initial state
        gsap.set(title, { y: 35, opacity: 0 });

        const trigger = ScrollTrigger.create({
          trigger: title,
          start: "top 88%",
          // Reveal when entering viewport; keep permanently visible while scrolling down
          onEnter: () => {
            gsap.to(title, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          // Only reset if user scrolls all the way back UP above this section
          onLeaveBack: () => {
            gsap.to(title, {
              y: 35,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
              overwrite: "auto",
            });
          },
        });

        triggers.push(trigger);
      });

      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
