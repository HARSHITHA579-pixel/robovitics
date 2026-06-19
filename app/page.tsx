'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Domains from '@/components/Domains';
import Events from "@/components/Events";
import EventsTerminal from "@/components/horizontalScroll";


export default function Page() {
  const domainsRef = useRef<HTMLDivElement>(null);

  // 1. Tracks overall page scroll
  const { scrollYProgress: overallScroll } = useScroll();

  // 2. Tracks specifically when the Domains section enters the screen
  const { scrollYProgress: domainsEnterProgress } = useScroll({
    target: domainsRef,
    offset: ["start end", "start start"]
  });

  // --- THE ORCHESTRATOR ANIMATIONS ---

  const bgOpacity = useTransform(domainsEnterProgress, [0, 0.94, 1], [0.87, 0.87, 0]);

  // 1. Calculate RAW numeric values first so we can apply physics to them
  // We go from 0 to 120 so it completely clears the right side of the screen
  const rawGearX = useTransform(domainsEnterProgress, [0, 1], [0, 120]);
  const rawGearY = useTransform(overallScroll, [0, 1], [0, 50]);

  // COMBINED ROTATION:
  // overallScroll * 720 = Normal slow rotation down the page
  // domains * 420 = We increased this from 150 because it has to travel a longer 
  // distance across the whole screen. A higher number ensures it "rolls" instead of "slides".
  const rawGearRotation = useTransform(
    [overallScroll, domainsEnterProgress],
    ([overall, domains]: [number, number]) => {
      return (overall * 720) + (domains * 420);
    }
  );

  // 2. Apply Spring Physics for buttery smooth momentum
  const springConfig = { stiffness: 40, damping: 30, restDelta: 0.001 };
  const smoothGearX = useSpring(rawGearX, springConfig);
  const smoothGearY = useSpring(rawGearY, springConfig);
  const gearRotation = useSpring(rawGearRotation, springConfig);

  // 3. Map the smoothed numbers back to CSS units
  // Notice we use `vw` (viewport width) instead of `%` for the X axis now!
  const gearX = useTransform(smoothGearX, x => `${x}vw`);
  const gearY = useTransform(smoothGearY, y => `${y}%`);

  return (
    <main className="relative bg-black text-white flex flex-col font-sans selection:bg-gray-300 selection:text-black">

      {/* GLOBAL BACKGROUND GRID */}
      <motion.div
        style={{ opacity: bgOpacity, backgroundImage: "url('/hero-bg.png')" }}
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
      />

      {/* GLOBAL SCROLL PROGRESS LINE */}
      <motion.div
        style={{ scaleY: overallScroll }}
        className="fixed top-0 right-0 w-1 bg-gray-300 origin-top z-50 shadow-[0_0_15px_#D1D5DB]"
      />

      {/* GLOBAL MASSIVE GEAR */}
      <motion.div
        style={{ rotate: gearRotation, y: gearY, x: gearX }}
        className="fixed -left-16 -bottom-20 z-10 opacity-[0.14] pointer-events-none sm:-left-28 sm:-bottom-28 sm:opacity-[0.16] lg:-left-40 lg:-bottom-40 lg:opacity-20"
      >
        <svg className="h-[260px] w-[260px] sm:h-[460px] sm:w-[460px] lg:h-[600px] lg:w-[600px]" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" stroke="#ffffff"></circle>
          <path stroke="#ffffff" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </motion.div>

      {/* --- CONTENT DOM TREE --- */}
      <div className="relative z-20 flex min-h-svh flex-col justify-between overflow-x-clip lg:h-screen">
        <Navbar />
        <Hero />
        <footer className="relative z-10 flex w-full flex-col items-start justify-between gap-3 px-4 py-4 font-mono text-[11px] text-gray-500 sm:px-6 sm:text-xs md:flex-row md:items-end md:px-12 md:py-8 md:text-sm lg:py-10">
          <div>
            <p>Established in <span className="text-gray-300">2010</span>.</p>
            <p>Evolving ever since.</p>
          </div>
          <div className="text-left md:text-right">
            <p>We&apos;re not just another <span className="text-gray-300">tech chapter</span>.</p>
            <p>We&apos;re the <span className="text-gray-300">engineers</span> that actually build.</p>
          </div>
        </footer>
      </div>

      <About />

      <div ref={domainsRef}>
        <Domains />
      </div>
      <Events />

    </main>
  );
}