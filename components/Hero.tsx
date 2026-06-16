'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const fullSubtitleText = "The Official Robotics Club of VIT Vellore";
  const [typedSubtitle, setTypedSubtitle] = useState("");

  // --- SCROLL ANIMATION HOOKS ---
  const { scrollYProgress } = useScroll();
  
  const gearRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const gearY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const letterVariant = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
  };

  useEffect(() => {
    let subtitleIndex = 0;
    const typingDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        setTypedSubtitle(fullSubtitleText.substring(0, subtitleIndex + 1));
        subtitleIndex++;
        if (subtitleIndex === fullSubtitleText.length) {
          clearInterval(typingInterval);
        }
      }, 40);
      return () => clearInterval(typingInterval);
    }, 1000); 
    return () => clearTimeout(typingDelay);
  }, []);

  return (
    <>
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-87 pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* --- SCROLL ANIMATIONS --- */}
      
      {/* 1. Circuit Trace Scroll Progress Line (Changed to gray-300) */}
      <motion.div 
        className="fixed top-0 right-0 w-1 bg-gray-300 origin-top z-50 shadow-[0_0_15px_#D1D5DB]"
        style={{ 
          height: '100vh',
          scaleY: scrollYProgress
        }}
      />

      {/* 2. Massive Rotating Parallax Gear */}
      <motion.div
        className="fixed -left-40 -bottom-40 z-10 opacity-20 pointer-events-none"
        style={{ 
          rotate: gearRotation,
          y: gearY 
        }}
      >
        <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" stroke="#ffffff"></circle>
          <path stroke="#ffffff" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </motion.div>

      {/* --- HERO TEXT SECTION --- */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-24 w-full max-w-[1400px] mx-auto">
        <motion.h1 
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="text-[13vw] md:text-[8.5rem] leading-[1.05] font-black tracking-tighter mb-2 flex flex-wrap"
        >
          {"ROBOVITICS".split("").map((char, index) => (
            <span key={index} className="overflow-hidden inline-block pb-2">
              <motion.span variants={letterVariant} className="inline-block">{char}</motion.span>
            </span>
          ))}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg md:text-2xl text-gray-300 font-mono mt-2 flex items-center h-10 whitespace-nowrap"
        >
          {/* Changed the text and background classes to gray-300 */}
          <span className="text-gray-300 font-bold mr-3">{'>'}</span>
          <span>{typedSubtitle}</span>
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-3 md:w-4 h-6 md:h-7 bg-gray-300 ml-2 translate-y-0.5 shadow-[0_0_8px_#D1D5DB]"
          />
        </motion.p>
      </div>
    </>
  );
}