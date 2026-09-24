"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { name: "WORK", href: "#projects" },
  { name: "ABOUT", href: "#about" },
  { name: "EXPERIENCE", href: "#experience" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for shrinking navbar pill
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation for mobile overlay entrance
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling
      document.body.style.overflow = "hidden";

      // Animate background panel down
      gsap.fromTo(
        menuOverlayRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Animate staggered menu links upwards
      if (linksContainerRef.current) {
        const links = linksContainerRef.current.querySelectorAll(".mobile-nav-link-item");
        gsap.fromTo(
          links,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.25, stagger: 0.08, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const closeMenu = () => {
    // Close transition with GSAP before unmounting/hiding
    gsap.to(menuOverlayRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        setIsOpen(false);
      },
    });
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop & Tablet Floating Header */}
      <header
        className={`fixed left-1/2 top-7 z-[100] flex items-center justify-between rounded-full border border-white/12 bg-black/75 shadow-lg backdrop-blur-[20px] transition-all duration-500 ease-out -translate-x-1/2
          ${isScrolled 
            ? "h-[54px] w-[calc(100%-80px)] max-w-[960px] px-6 scale-[0.98]" 
            : "h-[64px] w-[calc(100%-64px)] max-w-[1080px] px-8"
          }
        `}
      >
        {/* Left Brand: [red dot] MANOJ */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-black text-xs tracking-widest text-[#F7F7F7] uppercase"
        >
          <span className="h-2 w-2 rounded-full bg-[#FF1F2D] inline-block animate-pulse" />
          <span className="font-extrabold tracking-widest">MANOJ</span>
        </a>

        {/* Desktop Links (Right) */}
        <nav className="hidden items-center gap-8 md:flex h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-[10px] font-black tracking-widest text-[#929292] transition-colors hover:text-[#F7F7F7]"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#FF1F2D] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          {/* CONTACT red pill */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#FF1F2D] px-4 py-1.5 text-[10px] font-black tracking-widest text-[#F7F7F7] transition-all duration-300 hover:bg-[#FF1F2D]/90 hover:scale-105 active:scale-95"
          >
            CONTACT
          </a>
        </nav>

        {/* Mobile menu trigger: [MENU] */}
        <button
          onClick={() => setIsOpen(true)}
          className="block text-[10px] font-black tracking-widest text-[#F7F7F7] hover:text-[#FF1F2D] md:hidden cursor-pointer uppercase"
        >
          [MENU]
        </button>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {isOpen && (
        <div
          ref={menuOverlayRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-[#F7F7F7] opacity-0"
        >
          {/* Close button */}
          <button
            onClick={closeMenu}
            className="absolute right-8 top-8 text-[#929292] hover:text-[#FF1F2D] transition-colors flex items-center gap-2 text-xs font-bold tracking-widest uppercase cursor-pointer"
            aria-label="Close Menu"
          >
            CLOSE <X className="h-5 w-5" />
          </button>

          {/* Links list */}
          <div
            ref={linksContainerRef}
            className="flex flex-col items-center gap-8 text-center"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="mobile-nav-link-item overflow-hidden">
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="text-4xl font-black tracking-widest text-[#929292] hover:text-[#FF1F2D] uppercase font-space transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              </div>
            ))}
            
            {/* Mobile Contact Pill */}
            <div className="mobile-nav-link-item overflow-hidden mt-4">
              <button
                onClick={() => handleLinkClick("#contact")}
                className="rounded-full bg-[#FF1F2D] px-10 py-4 text-xs font-black tracking-widest text-white inline-block cursor-pointer"
              >
                CONTACT
              </button>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="absolute bottom-10 text-center select-none">
            <p className="text-[9px] tracking-widest text-[#929292]/40 uppercase">
              CHENNAI, INDIA • 3.5+ YEARS EXP
            </p>
          </div>
        </div>
      )}
    </>
  );
}
