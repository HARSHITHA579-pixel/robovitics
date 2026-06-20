'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoAssembly, { getAssemblyDurationMs } from './LogoAssembly';

export default function Hero() {
  const fullSubtitleText = "The Official Robotics Club of VIT Vellore";
  const [typedSubtitle, setTypedSubtitle] = useState("");
  // Subtitle typing no longer starts on a fixed timeout — it waits for the
  // logo assembly (pieces flying in -> lock-in glow pulse) to fully finish.
  const [logoAssembled, setLogoAssembled] = useState(false);

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const letterVariant = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      },
    },
  };

  const handleLogoComplete = useCallback(() => {
    setLogoAssembled(true);
  }, []);

  useEffect(() => {
    // Fallback in case onAnimationComplete doesn't fire (e.g. reduced-motion
    // browsers) — flips the flag once the known assembly duration elapses.
    const fallback = setTimeout(() => setLogoAssembled(true), getAssemblyDurationMs() + 200);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!logoAssembled) return;

    let subtitleIndex = 0;
    // Brief pause (~0.3-0.5s) after the logo locks in before typing starts.
    const typingDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        setTypedSubtitle(fullSubtitleText.substring(0, subtitleIndex + 1));
        subtitleIndex++;
        if (subtitleIndex === fullSubtitleText.length) {
          clearInterval(typingInterval);
        }
      }, 40);
      return () => clearInterval(typingInterval);
    }, 400);
    return () => clearTimeout(typingDelay);
  }, [logoAssembled, fullSubtitleText]);

  return (
    <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 w-full max-w-[1600px] mx-auto gap-8 lg:gap-12 pb-12 lg:pb-0">

      {/* LEFT SIDE: Text Container */}
      <div className="relative z-20 w-full lg:w-[60%] flex flex-col justify-center pointer-events-auto pt-20 lg:pt-0">

        {/* Logo assembly animation replaces the static "ROBOVITICS" letter-stagger title */}
        <div className="w-full max-w-[820px] mb-4">
          <LogoAssembly onComplete={handleLogoComplete} />
        </div>

        {/*
          Original letter-by-letter title kept (hidden) for reference / easy
          rollback — remove if not needed. Left commented out per request to
          not delete existing implementation outright.
        */}
        {/*
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="text-[12vw] md:text-[5.5rem] lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] leading-[1.05] font-black tracking-tighter mb-4 flex flex-nowrap"
        >
          {"ROBOVITICS".split("").map((char, index) => (
            <span key={index} className="inline-block">
              <motion.span variants={letterVariant} className="inline-block">{char}</motion.span>
            </span>
          ))}
        </motion.h1>
        */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: logoAssembled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-xl lg:text-xl xl:text-2xl text-gray-300 font-mono flex items-center h-10 whitespace-nowrap"
        >
          <span className="text-gray-300 font-bold mr-3">{'>'}</span>
          <span>{typedSubtitle}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block flex-shrink-0 w-3 md:w-4 h-5 md:h-7 bg-gray-300 ml-2 translate-y-[1px] md:translate-y-0.5 shadow-[0_0_8px_#D1D5DB]"
          />
        </motion.div>
      </div>

      {/* RIGHT SIDE: Massive Bot Image */}
      <div className="relative z-20 w-full lg:w-[40%] h-[45vh] md:h-[60vh] lg:h-[80vh] max-h-[950px] mt-8 lg:mt-0 pointer-events-none flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: "10%" }}
          transition={{
            opacity: { delay: 0.8, duration: 1 },
            x: { delay: 0.8, duration: 1, ease: "easeOut" }
          }}
          className="relative w-full h-full scale-110 lg:scale-[1.3] xl:scale-[1.45] origin-center"
        >
          <Image
            src="/bot4.png"
            alt="roboVITics Bot Mascot"
            fill
            className="object-contain object-center lg:object-right drop-shadow-[0_0_30px_rgba(209,213,219,0.15)] opacity-80"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}