'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const STATUS_STAGES = [
  { maxProgress: 20, message: 'INITIALIZING CORE SYSTEMS' },
  { maxProgress: 40, message: 'CHECKING MODULES' },
  { maxProgress: 60, message: 'CALIBRATING SENSORS' },
  { maxProgress: 80, message: 'LOADING AI SYSTEMS' },
  { maxProgress: 95, message: 'ESTABLISHING NETWORK' },
  { maxProgress: 100, message: 'SYSTEM READY' },
];

const CRITICAL_ASSETS = [
  '/loaderRobot.png',
  '/hero-bg.png',
  '/robovitics-logo.svg',
  '/robovitics-logo.png',
  '/footer.webp',
  '/planet.png',
];

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(STATUS_STAGES[0].message);
  const [isWebsiteReady, setIsWebsiteReady] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Shockwave trigger
  const [triggerShockwave, setTriggerShockwave] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Asset & DOM Readiness Detection
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = CRITICAL_ASSETS.length;

    const checkAllReady = () => {
      loadedCount++;
      if (loadedCount >= totalAssets && document.readyState === 'complete') {
        setIsWebsiteReady(true);
      }
    };

    CRITICAL_ASSETS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = checkAllReady;
      img.onerror = checkAllReady;
    });

    const handleLoadEvent = () => {
      if (loadedCount >= totalAssets) {
        setIsWebsiteReady(true);
      }
    };

    if (document.readyState === 'complete') {
      if (loadedCount >= totalAssets) setIsWebsiteReady(true);
    } else {
      window.addEventListener('load', handleLoadEvent);
    }

    return () => {
      window.removeEventListener('load', handleLoadEvent);
    };
  }, []);

  // 2. Gated Progress Logic (0 -> 95%, holds at 95% until website is ready, then 95 -> 100%)
  useEffect(() => {
    const startTime = Date.now();
    const minTimeFor95 = 2200;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const timeRatio = Math.min(elapsedTime / minTimeFor95, 1);

      setProgress((prev) => {
        const projectedProgress = Math.floor(timeRatio * 95);

        if (prev < 95) {
          return Math.min(95, prev + Math.max(1, Math.floor((projectedProgress - prev) * 0.25)));
        } else if (prev >= 95 && prev < 100 && isWebsiteReady) {
          return Math.min(100, prev + 1);
        }

        return prev;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isWebsiteReady]);

  // 3. Status Message Progression
  useEffect(() => {
    if (progress < 20) {
      setStatusMessage(STATUS_STAGES[0].message);
    } else if (progress < 40) {
      setStatusMessage(STATUS_STAGES[1].message);
    } else if (progress < 60) {
      setStatusMessage(STATUS_STAGES[2].message);
    } else if (progress < 80) {
      setStatusMessage(STATUS_STAGES[3].message);
    } else if (progress < 95) {
      setStatusMessage(STATUS_STAGES[4].message);
    } else {
      setStatusMessage(STATUS_STAGES[5].message);
    }

    if (progress === 100) {
      setTriggerShockwave(true);

      const finishTimer = setTimeout(() => {
        setIsComplete(true);
      }, 600);

      return () => clearTimeout(finishTimer);
    }
  }, [progress]);

  // 4. Lightweight Canvas for upward energy particles from single charging ring
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 300);
    let height = (canvas.height = canvas.offsetHeight || 320);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 300;
      height = canvas.height = canvas.offsetHeight || 320;
    };

    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 28 }).map(() => ({
      x: width * 0.2 + Math.random() * (width * 0.6),
      y: height * 0.85 - Math.random() * (height * 0.3),
      size: Math.random() * 1.6 + 0.6,
      speedY: Math.random() * 1.4 + 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const progRatio = progressRef.current / 100;

      particles.forEach((p) => {
        p.y -= p.speedY * (1 + progRatio * 0.6);
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.015;

        if (p.y < height * 0.1) {
          p.y = height * 0.85;
          p.x = width * 0.2 + Math.random() * (width * 0.6);
        }

        const alpha = Math.max(0.15, Math.min(1, p.opacity * (0.8 + progRatio * 0.5)));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 174, 243, ${alpha})`;
        ctx.shadowColor = '#4FAEF3';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll during loader
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isComplete]);

  if (!shouldRender) return null;

  const isPhase95 = progress >= 95;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setShouldRender(false);
        onLoadingComplete?.();
      }}
    >
      {!isComplete && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(6px)',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] px-4 select-none overflow-hidden font-mono text-white"
        >
          {/* Subtle Cyan Ambient Glow behind Robot - Perfectly Centered */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-[#4FAEF3]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Cyan Energy Pulse Shockwave at 100% - Perfectly Centered */}
          {triggerShockwave && (
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full border-2 border-[#4FAEF3] shadow-[0_0_60px_#4FAEF3,inset_0_0_30px_#4FAEF3] w-[200px] h-[200px] pointer-events-none"
            />
          )}

          {/* Single Cohesive 100% Centered Loading Unit */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md mx-auto gap-6 my-auto">

            {/* ROBOT & SINGLE CHARGING POD CONTAINER (Scaled up 20% total) */}
            <div className="relative flex flex-col items-center justify-center w-[312px] h-[324px] sm:w-[384px] sm:h-[396px]">

              {/* Particle Canvas inside light beam */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

              {/* Subtle Light Beam from single ring up to robot */}
              <div className="absolute bottom-6 w-[168px] sm:w-[216px] h-[216px] sm:h-[264px] bg-gradient-to-t from-[#4FAEF3]/25 via-[#4FAEF3]/10 to-transparent blur-[12px] pointer-events-none z-0" />

              {/* FLOATING ROBOT MASCOT (20% Larger) */}
              <motion.div
                animate={{
                  y: isPhase95 ? [-14, -6, -14] : [-8, 8, -8],
                  rotate: isPhase95 ? [0, -1.2, 0.8, 0] : 0,
                }}
                transition={{
                  y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 0.8, ease: 'easeOut' },
                }}
                className="relative z-10 my-auto flex items-center justify-center"
              >
                <div className="relative w-[180px] h-[216px] sm:w-[228px] sm:h-[276px]">
                  <Image
                    src="/loaderRobot.png"
                    alt="RoboVITics Mascot"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 228px, 276px"
                    className="object-contain drop-shadow-[0_0_35px_rgba(79,174,243,0.5)]"
                  />
                </div>
              </motion.div>

              {/* SINGLE ELEGANT HOLOGRAPHIC CHARGING RING BENEATH ROBOT */}
              <div className="absolute bottom-2 z-20 flex items-center justify-center pointer-events-none">
                {/* Soft Bloom Floor Emission */}
                <div className="absolute w-[252px] h-[62px] sm:w-[312px] sm:h-[74px] bg-[#4FAEF3]/30 rounded-[100%] blur-[18px] transform [perspective:600px] [rotateX:75deg]" />

                {/* Outer Glowing Circular Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[252px] h-[62px] sm:w-[312px] sm:h-[74px] rounded-[100%] border-2 border-[#4FAEF3] shadow-[0_0_35px_#4FAEF3,inset_0_0_20px_#4FAEF3] transform [perspective:600px] [rotateX:75deg]"
                />

                {/* Inner Slowly Rotating Tech Dash Ring */}
                <div className="absolute w-[228px] h-[52px] sm:w-[282px] sm:h-[62px] transform [perspective:600px] [rotateX:75deg]">
                  <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 200 60" fill="none">
                    <ellipse
                      cx="100"
                      cy="30"
                      rx="95"
                      ry="25"
                      stroke="#4FAEF3"
                      strokeWidth="1.5"
                      strokeDasharray="14 6 8 6"
                      strokeOpacity="0.85"
                    />
                  </svg>
                </div>
              </div>

            </div>

            {/* LOADING UI (Vertically centered below the robot & charging ring) */}
            <div className="flex flex-col items-center text-center w-full gap-3">
              {/* 1. Status Text */}
              <div className="h-5 flex items-center justify-center">
                <motion.span
                  key={statusMessage}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs sm:text-sm tracking-[0.25em] font-mono text-[#4FAEF3] uppercase font-semibold"
                >
                  {statusMessage}
                </motion.span>
              </div>

              {/* 2. Large Percentage */}
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tighter text-[#4FAEF3] drop-shadow-[0_0_20px_rgba(79,174,243,0.7)]">
                  {progress.toString().padStart(3, '0')}
                </span>
                <span className="text-xl sm:text-2xl text-[#4FAEF3]/80 font-light">%</span>
              </div>

              {/* 3. Progress Bar */}
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] h-1.5 bg-gray-950 rounded-full border border-[#4FAEF3]/30 overflow-hidden p-[1px] shadow-[0_0_12px_rgba(79,174,243,0.2)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4FAEF3]/50 via-[#4FAEF3] to-[#4FAEF3] rounded-full shadow-[0_0_12px_#4FAEF3]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                />
              </div>

              {/* 4. Small Status Label */}
              <span className="text-[10px] sm:text-xs tracking-widest text-gray-500 font-mono">
                {progress === 100 ? 'System Ready' : progress >= 95 ? 'Synchronizing...' : 'Calibrating...'}
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
