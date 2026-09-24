"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Count up progress in ~1.1 seconds
    const duration = 1100;
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsComplete(true);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-[#F7F7F7]"
        >
          <div className="flex flex-col items-center gap-6 select-none">
            {/* Logo Name Reveal */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-black tracking-[0.25em] uppercase md:text-3xl font-space"
            >
              MANOJ KUMAR
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[9px] font-black tracking-[0.25em] text-[#929292] uppercase"
            >
              FRONTEND / MOBILE / CREATIVE DEVELOPMENT
            </motion.p>

            {/* Red Progress Bar */}
            <div className="relative mt-8 h-[2px] w-64 overflow-hidden bg-white/10 rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-[#FF1F2D]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Indicator */}
            <span className="font-mono text-xs tracking-widest text-[#929292] font-black">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
