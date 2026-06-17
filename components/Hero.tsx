'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const fullSubtitleText = "The Official Robotics Club of VIT Vellore";
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let subtitleIndex = 0;
    
    // Removed the 1000ms setTimeout wrapper; typing starts immediately
    const typingInterval = setInterval(() => {
      setTypedSubtitle(fullSubtitleText.substring(0, subtitleIndex + 1));
      subtitleIndex++;
      if (subtitleIndex === fullSubtitleText.length) {
        clearInterval(typingInterval);
      }
    }, 40);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col items-center justify-start gap-3 overflow-hidden px-4 pb-2 pt-[6svh] sm:gap-5 sm:px-6 sm:pb-6 sm:pt-[7svh] md:px-12 lg:flex-row lg:justify-between lg:gap-12 lg:px-20 lg:pb-0 lg:pt-0 xl:px-24">
      
      {/* LEFT SIDE: Logo & Text Container */}
      <div className="relative z-20 flex w-full min-w-0 flex-col items-center justify-center text-center pointer-events-auto lg:w-[58%] lg:items-start lg:text-left">
        
        {/* Instantly Visible Logo */}
        <div className="mb-3 w-full max-w-[310px] sm:mb-5 sm:max-w-[420px] md:max-w-[560px] lg:mb-8 lg:max-w-[640px] xl:max-w-[750px]">
          <h1 className="sr-only">ROBOVITICS</h1> 
          <Image 
            src="/robovitics-logo.png" 
            alt="roboVITics Logo" 
            width={800} 
            height={200} 
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        
        {/* Animated Subtitle Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} 
          className="flex h-8 max-w-full min-w-0 items-center whitespace-nowrap font-mono text-[11px] text-gray-300 sm:h-9 sm:text-sm md:text-xl lg:h-10 lg:text-xl xl:text-2xl"
        >
          <span className="mr-2 shrink-0 font-bold text-gray-300 sm:mr-3">{'>'}</span>
          <span className="min-w-0 overflow-hidden text-ellipsis">{typedSubtitle}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="ml-2 inline-block h-4 w-2 shrink-0 translate-y-[1px] bg-gray-300 shadow-[0_0_8px_#D1D5DB] sm:h-5 sm:w-3 md:h-7 md:w-4 md:translate-y-0.5"
          />
        </motion.div>
      </div>

      {/* RIGHT SIDE: Massive Bot Image */}
      <div className="relative z-20 -mt-1 flex h-[38svh] max-h-[360px] min-h-[245px] w-full justify-center pointer-events-none sm:h-[42svh] sm:max-h-[470px] md:h-[48svh] md:max-h-[580px] lg:mt-0 lg:h-[80vh] lg:max-h-[950px] lg:w-[42%] lg:justify-end">
        {/* Instantly Visible Bot */}
        <div className="relative h-full w-full origin-center scale-[1.22] sm:scale-[1.18] lg:translate-x-[6%] lg:scale-[1.2] xl:scale-[1.35]">
          <Image 
            src="/bot.png" 
            alt="roboVITics Bot Mascot" 
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="object-contain object-center opacity-80 drop-shadow-[0_0_30px_rgba(209,213,219,0.15)] lg:object-right"
            priority
          />
        </div>
      </div>
    </div>
  );
}
