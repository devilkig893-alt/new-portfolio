"use client";

import { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import MagneticButton from "../animations/MagneticButton";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("loading");
    
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16 text-white overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1320px] relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          
          {/* Left Column: Title and Links */}
          <div className="flex flex-col justify-between md:col-span-5">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-[#929292] uppercase">
                07 — CONNECT
              </span>
              
              <h2 className="animate-title-scroll mt-8 text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-[#F7F7F7] leading-[0.95] font-space select-none">
                LET'S BUILD
                <span className="block mt-2">SOMETHING</span>
                <span className="block text-[#FF1F2D] mt-2">GREAT.</span>
              </h2>

              <p className="mt-6 text-sm font-semibold text-[#929292] leading-relaxed max-w-sm">
                Have an idea? Let's make it real. Drop me a line or connect through my social channels.
              </p>
            </div>

            {/* Social details */}
            <div className="mt-12 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <MagneticButton>
                  <a
                    href="mailto:manojvj346@gmail.com"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/12 hover:border-[#FF1F2D] hover:bg-[#FF1F2D]/10 transition-colors cursor-none"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5 text-[#F7F7F7]" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://www.linkedin.com/in/manoj-kumar-95599a225/"
                    target="_blank"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/12 hover:border-[#FF1F2D] hover:bg-[#FF1F2D]/10 transition-colors cursor-none"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-[#F7F7F7]" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://github.com/devilkig893-alt"
                    target="_blank"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/12 hover:border-[#FF1F2D] hover:bg-[#FF1F2D]/10 transition-colors cursor-none"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-[#F7F7F7]" />
                  </a>
                </MagneticButton>
              </div>

              <div className="text-xs font-mono text-[#929292] uppercase mt-2">
                manojvj346@gmail.com • +91 99418 17619
              </div>
            </div>
          </div>

          {/* Right Column: Contact form Panel */}
          <div className="md:col-span-7">
            <div className="rounded-[28px] border border-white/12 bg-[#0B0B0B] p-8 md:p-12">
              <h3 className="text-xl font-extrabold text-white uppercase font-space">
                Send a Message
              </h3>
              <p className="text-xs text-[#929292] mt-2 mb-8">
                Typical response time within 12-24 hours.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* 2-Column Row for Name and Email */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-[#929292] uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your Name"
                      className="h-[56px] px-[18px] py-[16px] rounded-[16px] border border-white/14 bg-transparent text-sm text-[#F7F7F7] focus:border-[#FF1F2D] focus:outline-none transition-colors cursor-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-[#929292] uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your.email@gmail.com"
                      className="h-[56px] px-[18px] py-[16px] rounded-[16px] border border-white/14 bg-transparent text-sm text-[#F7F7F7] focus:border-[#FF1F2D] focus:outline-none transition-colors cursor-none"
                    />
                  </div>
                </div>

                {/* Subject - Full width */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] font-bold tracking-widest text-[#929292] uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project collaboration"
                    className="h-[56px] px-[18px] py-[16px] rounded-[16px] border border-white/14 bg-transparent text-sm text-[#F7F7F7] focus:border-[#FF1F2D] focus:outline-none transition-colors cursor-none"
                  />
                </div>

                {/* Message - Full width */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-[#929292] uppercase">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project requirements..."
                    className="px-[18px] py-[16px] rounded-[16px] border border-white/14 bg-transparent text-sm text-[#F7F7F7] focus:border-[#FF1F2D] focus:outline-none transition-colors resize-none cursor-none"
                  />
                </div>

                {status === "success" && (
                  <div className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-2.5 rounded-xl">
                    ✓ Message sent successfully! I will get back to you shortly.
                  </div>
                )}

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF1F2D] h-10 text-xs font-black tracking-widest text-white hover:bg-[#FF1F2D]/90 transition-colors disabled:opacity-50 cursor-none uppercase"
                  >
                    SEND MESSAGE ↗
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
