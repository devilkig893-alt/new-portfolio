"use client";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/12 bg-[#050505] px-5 md:px-8 lg:px-12 py-12 text-[#929292]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-between gap-8 md:flex-row">
        
        {/* Left: Brand & Role */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <a href="#hero" className="text-sm font-black tracking-widest text-[#F7F7F7] uppercase font-space cursor-none">
            MANOJ KUMAR
          </a>
          <span className="mt-2 text-[9px] text-[#929292] font-black uppercase tracking-widest">
            FRONTEND / MOBILE / CREATIVE DEVELOPMENT
          </span>
        </div>

        {/* Center: Location */}
        <div className="text-center font-mono text-[9px] tracking-widest text-[#929292]/40 uppercase select-none">
          CHENNAI, INDIA • © 2026
        </div>

        {/* Right: Social Links */}
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex gap-6 font-mono text-[10px] tracking-widest">
            <a
              href="https://github.com/devilkig893-alt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929292] hover:text-[#FF1F2D] transition-colors uppercase font-black cursor-none"
            >
              GitHub
            </a>
            
            <a
              href="https://www.linkedin.com/in/manoj-kumar-95599a225/"
              target="_blank"
              className="text-[#929292] hover:text-[#FF1F2D] transition-colors uppercase font-black cursor-none"
            >
              LinkedIn
            </a>

            <a
              href="mailto:manojvj346@gmail.com"
              className="text-[#929292] hover:text-[#FF1F2D] transition-colors uppercase font-black cursor-none"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
