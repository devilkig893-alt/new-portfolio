"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  category: string;
  filterCategory: "own" | "mobile" | "enterprise";
  desc: string;
  image: string;
  techs: string[];
  demoUrl?: string;
}

const projectsData: Project[] = [
  {
    id: "01",
    title: "KINGS OF ANARCHY (3D CHESS)",
    category: "INTERACTIVE GAME / CANVAS / WEBGL",
    filterCategory: "own",
    desc: "A luxury AAA-style 3D chess game built using React, Three.js, and GSAP. Play against an intelligent minimax local computer engine inside a highly detailed interactive room.",
    image: "/images/chess_game.jpg",
    techs: ["React", "Three.js", "GSAP", "WebGL"],
    demoUrl: "https://chessgame-rho-ten.vercel.app/",
  },
  {
    id: "02",
    title: "PETAL & PIPE FLORAL STUDIO",
    category: "LUXURY BOTANICAL E-COMMERCE / NEXT.JS",
    filterCategory: "own",
    desc: "A luxury handcrafted botanical studio and keepsake e-commerce platform. Features curated velvet chenille bouquets, bespoke soy candles, custom gift box builders, and direct WhatsApp/UPI artisan checkout.",
    image: "/images/petal_pipe.jpg",
    techs: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "E-Commerce"],
    demoUrl: "https://bouquet-flax.vercel.app/",
  },
  {
    id: "03",
    title: "FORD GARAGE 3D SHOWROOM",
    category: "3D VEHICLE CUSTOMIZER / THREE.JS",
    filterCategory: "own",
    desc: "Immersive 3D customizer for vintage Mustangs and modern supercars. Built with React Three Fiber, custom paint shaders, bloom postprocessing, and animated orbit cameras.",
    image: "/images/ford_garage.jpg",
    techs: ["React Three Fiber", "Three.js", "GSAP", "Tailwind CSS"],
    demoUrl: "https://fordgarage.vercel.app/",
  },
  {
    id: "04",
    title: "WEATHERWISE FORECAST DASHBOARD",
    category: "CINEMATIC DASHBOARD / NEXT.JS / RADAR",
    filterCategory: "own",
    desc: "A cinematic, high-end weather forecasting dashboard and live interactive radar platform. Features live OpenWeather telemetry, RainViewer animated Doppler radar maps, dynamic atmospheric condition theming, UV index, and hourly air metrics.",
    image: "/images/weather_app.jpg",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "OpenWeather API", "RainViewer", "Framer Motion"],
    demoUrl: "https://weather-taupe-rho-30.vercel.app/",
  },
  {
    id: "05",
    title: "JS QUEST CODING SANDBOX",
    category: "GAMIFIED PORTAL / NEXT.JS",
    filterCategory: "own",
    desc: "Gamified learning sandbox where users solve JavaScript data structure quests, complete challenges, and compile code in-browser.",
    image: "/images/js_quest.jpg",
    techs: ["Next.js", "Tailwind CSS", "Context API", "Lucide Icons"],
    demoUrl: "https://js-quest-three.vercel.app/",
  },
  {
    id: "06",
    title: "NIVEDHA ARTISTRY PORTFOLIO",
    category: "LUXURY CAMPAIGNS PORTAL",
    filterCategory: "own",
    desc: "A couture makeup artistry portfolio showcasing high-end bridal transformations, fashion runways, and editorial campaigns with elegant styling and smooth page transitions.",
    image: "/images/nivis_portfolio.jpg",
    techs: ["Next.js", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://nivis-portfolio-rho.vercel.app/",
  },
  {
    id: "07",
    title: "MERGIT DELIVERY APP",
    category: "MOBILE APP / CROSS PLATFORM",
    filterCategory: "mobile",
    desc: "A high-performance grocery shipping mobile application built with React Native. Integrates real-time GPS coordinate mapping, administrative sorting pipelines, and WebSocket feeds.",
    image: "/images/work1.jpg",
    techs: ["React Native", "Expo", "Redux", "WebSockets"],
    demoUrl: "#",
  },
  {
    id: "08",
    title: "VEHICLE GPS TRACKING APP",
    category: "FLEET MANAGEMENT MOBILE APP",
    filterCategory: "mobile",
    desc: "IoT asset tracker visualizing real-time telemetry metrics, fuel usage logs, battery indicators, and alert notifications.",
    image: "/images/work5.jpg",
    techs: ["React Native", "Expo", "Google Maps API", "WebSockets"],
    demoUrl: "#",
  },
  {
    id: "09",
    title: "E-COMMERCE WEB APP",
    category: "WEB PLATFORM / FULL STACK",
    filterCategory: "enterprise",
    desc: "Comprehensive platform for stationery, toys, and games with complete shopping cart, checkout system, and admin panel for inventory and sales management.",
    image: "/images/work2.jpg",
    techs: ["React", "Node.js", "Express", "MongoDB"],
    demoUrl: "#",
  },
  {
    id: "10",
    title: "AQUA WATER DELIVERY APP",
    category: "MOBILE APP / BACKEND",
    filterCategory: "mobile",
    desc: "Mobile application enabling delivery scheduling, product management, and customer service alongside admin panel operations.",
    image: "/images/work3.jpg",
    techs: ["React Native", "Expo", "Firebase", "Node.js"],
    demoUrl: "#",
  },
  {
    id: "11",
    title: "SCHOOL MANAGEMENT SYSTEM",
    category: "WEB PANEL / COMPANION APPS",
    filterCategory: "enterprise",
    desc: "Admin web panel with companion parent and teacher mobile applications handling attendance monitoring, announcement communications, and student services.",
    image: "/images/work4.jpg",
    techs: ["Angular", "React Native", "Express", "MongoDB"],
    demoUrl: "#",
  },
  {
    id: "12",
    title: "HOSPITAL MANAGEMENT SYSTEM",
    category: "WEB PORTAL / NATIVE APPS",
    filterCategory: "enterprise",
    desc: "Centralized web admin panel and patient-facing mobile applications facilitating comprehensive patient records, staff shift schedules, and digital bookings.",
    image: "/images/work5.jpg",
    techs: ["React", "React Native", "Firebase", "Firestore"],
    demoUrl: "#",
  },
  {
    id: "13",
    title: "INVENTORY MANAGEMENT SYSTEM",
    category: "STOCK LOGISTICS PLATFORM",
    filterCategory: "enterprise",
    desc: "Web-based platform for live stock level updates, product variations cataloging, threshold alerts, and purchase order tracking.",
    image: "/images/work1.jpg",
    techs: ["React", "Express", "MongoDB", "Redux"],
    demoUrl: "#",
  },
  {
    id: "14",
    title: "INSURANCE MANAGEMENT SYSTEM",
    category: "ENTERPRISE DASHBOARD",
    filterCategory: "enterprise",
    desc: "Complete administrative dashboard and customer portal enabling policy enrollment, claims uploading, and automated verification status tracking.",
    image: "/images/work2.jpg",
    techs: ["Angular", "Node.js", "SQL", "Express"],
    demoUrl: "#",
  },
  {
    id: "15",
    title: "IOT INDUSTRIAL PWA",
    category: "INDUSTRIAL IOT PORTAL",
    filterCategory: "enterprise",
    desc: "Progressive Web Application integrating logical gate configurations (AND, OR, NOT) for remote industrial automation systems monitoring and control.",
    image: "/images/work3.jpg",
    techs: ["React", "Tailwind CSS", "WebSockets", "PWA"],
    demoUrl: "#",
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "own" | "mobile" | "enterprise">("all");

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "all") return true;
    return project.filterCategory === activeFilter;
  });

  useEffect(() => {
    const boxes = gsap.utils.toArray(".project-reveal-box");

    boxes.forEach((box: any) => {
      const img = box.querySelector(".project-img-inner");
      if (!img) return;
      
      // GSAP ScrollTrigger clip-path reveal matching editorial pacing
      gsap.fromTo(
        img,
        { clipPath: "inset(8% round 28px)", scale: 1.12 },
        {
          clipPath: "inset(0% round 28px)",
          scale: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 92%",
            end: "top 62%",
            scrub: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-white overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Section Title */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-[#929292] uppercase">
            04 — SELECTED WORK
          </span>
          <h2 className="animate-title-scroll mt-4 text-4xl font-black uppercase tracking-tight text-white leading-none md:text-7xl font-space">
            SELECTED <span className="text-[#FF1F2D]">WORK.</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {[
            { id: "all", label: "ALL PROJECTS" },
            { id: "own", label: "OWN PROJECTS" },
            { id: "mobile", label: "MOBILE APPS" },
            { id: "enterprise", label: "ENTERPRISE & WEB" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`rounded-full px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === tab.id
                  ? "bg-[#FF1F2D] text-white shadow-lg shadow-[#FF1F2D]/25"
                  : "bg-white/5 border border-white/10 text-[#929292] hover:text-white hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Equal-Width Grid (2 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {filteredProjects.map((project) => {
            const hasLiveDemo = Boolean(project.demoUrl && project.demoUrl !== "#");

            return (
              <div
                key={project.id}
                className="project-reveal-box group flex flex-col justify-between rounded-[28px] border border-white/12 bg-[#0B0B0B] p-6 transition-all duration-500 hover:border-white/20 w-full"
              >
                <div className="flex flex-col gap-6">
                  
                  {/* Visual Area with custom cursor VIEW PROJECT trigger */}
                  {hasLiveDemo ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="view"
                      className="relative overflow-hidden w-full h-[200px] sm:h-[240px] md:h-[250px] lg:h-[260px] rounded-[28px] cursor-none block"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-img-inner h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      {/* Subtle red overlay on hover */}
                      <div className="absolute inset-0 bg-[#FF1F2D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </a>
                  ) : (
                    <div
                      data-cursor="view"
                      className="relative overflow-hidden w-full h-[200px] sm:h-[240px] md:h-[250px] lg:h-[260px] rounded-[28px] cursor-none"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-img-inner h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      {/* Subtle red overlay on hover */}
                      <div className="absolute inset-0 bg-[#FF1F2D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  )}

                  {/* Typography details */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#FF1F2D] font-black uppercase tracking-widest">
                      <span>{project.category}</span>
                      <span className="text-[#929292]">{project.id}</span>
                    </div>

                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#F7F7F7] font-space transition-all duration-500 group-hover:translate-x-1.5 md:text-3xl leading-none flex items-center gap-2">
                      {hasLiveDemo ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FF1F2D] transition-colors cursor-none flex items-center gap-2"
                        >
                          {project.title}
                          <ArrowRight className="h-5 w-5 text-[#FF1F2D] opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                        </a>
                      ) : (
                        <>
                          {project.title}
                          <ArrowRight className="h-5 w-5 text-[#FF1F2D] opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                        </>
                      )}
                    </h3>

                    <p className="text-sm font-semibold text-[#929292] leading-relaxed max-w-2xl">
                      {project.desc}
                    </p>
                  </div>

                </div>

                {/* Technologies footer */}
                <div className="mt-8 flex flex-wrap gap-2 border-t border-white/12 pt-6">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[9px] font-black tracking-widest text-[#929292] uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
