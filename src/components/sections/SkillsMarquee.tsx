"use client";

import Marquee from "../ui/Marquee";

const marqueeItems1 = [
  "REACT",
  "NEXT.JS",
  "REACT NATIVE",
  "TYPESCRIPT",
  "THREE.JS",
  "GSAP",
  "NODE.JS",
];

const marqueeItems2 = [
  "EXPO",
  "SWIFT",
  "FLUTTER",
  "REDUX",
  "ZUSTAND",
  "EXPRESS",
  "MONGODB",
];

export default function SkillsMarquee() {
  return (
    <section className="relative w-full bg-[#EAFBFC] py-12 dark:bg-[#081014] overflow-hidden flex flex-col gap-4">
      {/* Scroll Left */}
      <Marquee items={marqueeItems1} direction="left" speed="medium" />
      
      {/* Scroll Right */}
      <Marquee items={marqueeItems2} direction="right" speed="medium" />
    </section>
  );
}
