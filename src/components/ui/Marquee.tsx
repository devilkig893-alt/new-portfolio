"use client";

import { useRef, useState } from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "medium" | "slow";
}

export default function Marquee({
  items,
  direction = "left",
  speed = "medium",
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Speed durations mapping
  const speedDurations = {
    fast: "20s",
    medium: "35s",
    slow: "50s",
  };

  const duration = speedDurations[speed];

  // Duplicate items twice to ensure smooth seamless wrapping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative flex w-full overflow-x-hidden border-y border-[#63747A]/10 py-6 select-none bg-[#F6FEFF] dark:bg-[#081014]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Absolute overlay gradients for fading edges */}
      <div className="absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-[#EAFBFC] to-transparent dark:from-[#081014]" />
      <div className="absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-[#EAFBFC] to-transparent dark:from-[#081014]" />

      <div
        style={{
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isHovered ? "paused" : "running",
        }}
        className="flex min-w-full shrink-0 items-center justify-around gap-12"
      >
        {repeatedItems.map((item, idx) => (
          <span
            key={idx}
            className="text-4xl font-black uppercase tracking-wider text-[#0B1518]/10 dark:text-[#EAFBFC]/10 transition-colors duration-500 hover:text-blue-500 dark:hover:text-blue-400 md:text-6xl lg:text-7xl"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Global CSS for marquee animations injected dynamically */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
