"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/animations/PageTransition";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStackPlayground from "@/components/sections/TechStackPlayground";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Philosophy from "@/components/sections/Philosophy";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

import ScrollTitleAnimator from "@/components/animations/ScrollTitleAnimator";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent body scroll during initial page reveal loader
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1450); // Syncs with preloader exit

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <>
      <PageTransition />
      <ScrollTitleAnimator />
      
      {/* Centered Website container with max-width limits */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto">
          <Hero />
        </div>
        
        <div className="global-container">
          <Introduction />
          <About />
          <Services />
          <TechStackPlayground />
          <Projects />
          <Experience />
          <Philosophy />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}
