"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function MagneticButton({
  children,
  range = 45,
  strength = 0.35,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The element we want to animate (the direct child)
    const element = container.firstChild as HTMLElement;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Calculate center coordinates of the button
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse distance from center
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      
      // Euclidean distance
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        // Attract element
        gsap.to(element, {
          x: distanceX * strength,
          y: distanceY * strength,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // Snap back to origin
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block magnetic-target">
      {children}
    </div>
  );
}
