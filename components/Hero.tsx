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
    <div className="relative z-10 flex flex-1 flex-col items-center justify-start gap-4 px-5 pb-0 pt-22 sm:px-8 sm:pt-24 md:px-12 lg:mx-auto lg:w-full lg:max-w-[1600px] lg:flex-row lg:justify-between lg:gap-12 lg:px-24 lg:pb-0 lg:pt-0">

      {/* LEFT SIDE: Text Container */}
      <div className="relative z-20 flex w-full flex-col items-center justify-center pt-0 text-center pointer-events-auto lg:w-[60%] lg:items-start lg:text-left">

        {/* Logo assembly animation replaces the static "ROBOVITICS" letter-stagger title */}
        <div className="mb-4 w-full max-w-[min(92vw,520px)] sm:mb-3 sm:max-w-[620px] md:max-w-[720px] lg:mb-4 lg:max-w-[820px]">
          <LogoAssembly onComplete={handleLogoComplete} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: logoAssembled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-12 w-full max-w-[19rem] items-start justify-center text-pretty font-mono text-sm leading-relaxed text-gray-300 sm:min-h-14 sm:max-w-[32rem] sm:text-base md:max-w-none md:text-xl lg:h-10 lg:min-h-0 lg:items-center lg:justify-start lg:text-xl xl:text-2xl"
        >
          <span className="mr-2 flex-shrink-0 font-bold text-gray-300 sm:mr-3">{'>'}</span>
          <span className="min-w-0 break-words">
            {typedSubtitle}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="ml-1.5 inline-block h-5 w-2.5 align-[-0.18em] bg-gray-300 shadow-[0_0_8px_#D1D5DB] sm:ml-2 md:h-7 md:w-4 lg:align-[-0.12em]"
            />
          </span>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Massive Bot Image */}
      <div className="relative z-20 mt-3 flex h-[clamp(330px,45svh,440px)] w-full justify-center pointer-events-none sm:mt-0 sm:h-[48svh] md:h-[56svh] lg:mt-0 lg:h-[80vh] lg:max-h-[950px] lg:w-[40%] lg:justify-end">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            opacity: { delay: 0.8, duration: 1 },
            x: { delay: 0.8, duration: 1, ease: "easeOut" }
          }}
          className="relative h-full w-full origin-center scale-[1.18] sm:scale-[1.14] lg:translate-x-[10%] lg:scale-[1.3] xl:scale-[1.45]"
        >
          <Image
            src="/bot.png"
            alt="roboVITics Bot Mascot"
            fill
            className="object-contain object-center drop-shadow-[0_0_30px_rgba(209,213,219,0.15)] opacity-85 lg:object-right lg:opacity-80"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
