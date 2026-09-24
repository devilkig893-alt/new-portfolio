"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or smaller viewports
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const viewLabel = ring.querySelector(".cursor-label-view") as HTMLElement;
    const exploreLabel = ring.querySelector(".cursor-label-explore") as HTMLElement;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== "function") return;

      const isExplore = target.closest("[data-cursor='explore']");
      const isViewable = target.closest("[data-cursor='view']");
      const isLink = target.closest("a") || target.closest("button") || target.closest(".magnetic-target") || target.closest("[data-cursor='link']");

      let nextType = "default";
      let dotOpacity = "1";

      if (isExplore) {
        nextType = "explore";
        dotOpacity = "0";
      } else if (isViewable) {
        nextType = "view";
        dotOpacity = "0";
      } else if (isLink) {
        nextType = "link";
        dotOpacity = "0";
      }

      // Update data-type attribute on DOM directly (bypasses React state/re-renders)
      ring.setAttribute("data-type", nextType);
      
      // Update dot position and visibility instantly (without lagging transform transitions)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      dot.style.opacity = dotOpacity;

      if (viewLabel) viewLabel.style.display = nextType === "view" ? "block" : "none";
      if (exploreLabel) exploreLabel.style.display = nextType === "explore" ? "block" : "none";

      // Fade-in elements on first mouse interaction
      if (!hasMoved) {
        hasMoved = true;
        ring.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        const currentType = ring.getAttribute("data-type") || "default";
        dot.style.opacity = currentType === "default" ? "1" : "0";
        ring.style.opacity = "1";
      }
    };

    // Smooth easing loop for outer ring
    const render = () => {
      const ease = 0.12; // Trailing follow interpolation
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    
    const animationFrameId = requestAnimationFrame(render);

    // Initial opacity state is zero
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring / Pill */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center transition-[width,height,margin-left,margin-top,background-color,border-color,opacity] duration-300 ease-out will-change-transform rounded-full opacity-0 border border-white/20 h-8 w-8 -ml-4 -mt-4
          data-[type=view]:h-12 data-[type=view]:w-32 data-[type=view]:-ml-16 data-[type=view]:-mt-6 data-[type=view]:bg-[#FF1F2D] data-[type=view]:border-transparent data-[type=view]:shadow-lg data-[type=view]:shadow-[#FF1F2D]/20
          data-[type=explore]:h-12 data-[type=explore]:w-28 data-[type=explore]:-ml-14 data-[type=explore]:-mt-6 data-[type=explore]:bg-[#FF1F2D] data-[type=explore]:border-transparent data-[type=explore]:shadow-lg data-[type=explore]:shadow-[#FF1F2D]/20
          data-[type=link]:h-12 data-[type=link]:w-12 data-[type=link]:-ml-6 data-[type=link]:-mt-6 data-[type=link]:border-[#FF1F2D] data-[type=link]:bg-[#FF1F2D]/10
        "
      >
        <span className="cursor-label-view hidden text-[9px] font-black tracking-widest text-white uppercase select-none">
          VIEW PROJECT
        </span>
        <span className="cursor-label-explore hidden text-[9px] font-black tracking-widest text-white uppercase select-none">
          EXPLORE
        </span>
      </div>

      {/* Center Core Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#FF1F2D] transition-opacity duration-200 ease-out opacity-0 will-change-transform"
      />
    </>
  );
}
