'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function AchievementsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0d0d0d]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {([
        [10, 14], [72, 10], [88, 55], [16, 78],
      ] as [number, number][]).map(([lp, tp], i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${lp}%`, top: `${tp}%`, width: 5, height: 5,
            background: 'rgba(255,255,255,0.25)',
            boxShadow: '0 0 6px rgba(255,255,255,0.15)',
          }}
        />
      ))}
    </div>
  );
}

type View = 'club' | 'individual';

function ViewToggle({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { key: View; label: string }[] = [
    { key: 'club', label: 'CLUB ACHIEVEMENT' },
    { key: 'individual', label: 'INDIVIDUAL LOGS' },
  ];

  return (
    <div className="rv-segmented-toggle rv-segmented-toggle--compact">
      {items.map((item) => {
        const active = view === item.key;
        return (
          <button
            type="button"
            key={item.key}
            onClick={() => setView(item.key)}
            className={`rv-segmented-toggle__item ${active ? 'rv-segmented-toggle__item--active' : ''}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function ClubAchievementPlaque({ certificateImageSrc }: { certificateImageSrc?: string }) {
  return (
    <div
      className="group relative h-auto min-h-[300px] w-full overflow-hidden rounded-[4px] transition-all duration-500 hover:shadow-[0_16px_42px_rgba(0,0,0,0.42),0_0_26px_rgba(79,174,243,0.08)]"
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Shared card texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(165deg, rgba(255,255,255,0.075), rgba(255,255,255,0.012) 40%, rgba(0,0,0,0.36))
          `,
          backgroundSize: '18px 18px, 18px 18px, auto',
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4FAEF3]/40 to-transparent opacity-70" />
      <span className="absolute left-3 top-3 z-10 h-3 w-3 border-l border-t border-[#4FAEF3]/50" />
      <span className="absolute right-3 top-3 z-10 h-3 w-3 border-r border-t border-[#4FAEF3]/50" />
      <span className="absolute bottom-3 left-3 z-10 h-3 w-3 border-b border-l border-[#4FAEF3]/50" />
      <span className="absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-[#4FAEF3]/50" />

      {/* Content — restored flex wrapper */}
      <div className="relative z-20 flex h-full flex-col gap-6 p-5 sm:p-10 md:p-12 lg:flex-row lg:items-center lg:gap-16">

        {/* Left Side: Typography */}
        <div className="flex min-w-0 flex-1 flex-col justify-center text-left order-2 lg:order-1">
          <div className="mb-3 sm:mb-6 inline-flex items-center gap-3">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3]" />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#4FAEF3]/80">
              ACHIEVEMENT_LOG // 01
            </span>
          </div>

          <h3
            className="mb-2 sm:mb-4 font-sans uppercase leading-[1.05] text-white"
            style={{ fontSize: 'clamp(26px, 7vw, 52px)', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            BEST CLUB <br className="hidden sm:block" />
            <span className="text-[#4FAEF3] md:text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#4FAEF3] md:to-[#2b8cd6]">
              ELITE CATEGORY
            </span>
          </h3>

          <p className="mb-4 sm:mb-10 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500">
            RECORDED TENURE // 2024 TO 2025
          </p>

          <div className="relative border-l-2 border-[#4FAEF3]/20 pl-4 sm:pl-6 space-y-4 sm:space-y-5">
            <p className="max-w-xl text-[12px] leading-[1.6] sm:leading-[1.8] text-gray-300 md:text-[15px] font-light tracking-wide">
              <span className="block font-medium text-white mb-2">2024 • Elite Club Recognition</span>
              Honoured with the Best Club – Elite Category award for two consecutive years, recognizing RoboVITics outstanding technical innovation, impactful initiatives, sustained contributions to the university community.
            </p>
            <p className="max-w-xl text-[12px] leading-[1.6] sm:leading-[1.8] text-gray-400 md:text-[15px] font-light tracking-wide">
              Celebrating a legacy of innovation, teamwork, and technical excellence built through dedication and impact.
            </p>
          </div>
        </div>

        {/* Right Side: Trophy */}
        <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 sm:gap-6 order-1 lg:order-2">
          <div className="relative flex h-[90px] w-[90px] sm:h-[200px] sm:w-[200px] items-center justify-center lg:h-[260px] lg:w-[260px]">
            <div className="absolute inset-0 rounded-full bg-[#4FAEF3]/10 blur-[20px] sm:blur-[55px] transition-all duration-700 group-hover:bg-[#4FAEF3]/20" />
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 h-full w-full drop-shadow-[0_0_25px_rgba(79,174,243,0.6)]"
            >
              <defs>
                <linearGradient id="trophyCup" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FAEF3" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#4FAEF3" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="trophyBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FAEF3" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2b8cd6" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path d="M52 34 C16 34, 10 96, 58 92" fill="none" stroke="#4FAEF3" strokeWidth="4" strokeLinecap="round" />
              <path d="M148 34 C184 34, 190 96, 142 92" fill="none" stroke="#4FAEF3" strokeWidth="4" strokeLinecap="round" />
              <path d="M52 22 L148 22 L148 38 Q148 104 100 114 Q52 104 52 38 Z" fill="url(#trophyCup)" stroke="#4FAEF3" strokeWidth="3.5" strokeLinejoin="round" />
              <path d="M52 22 L148 22" stroke="#4FAEF3" strokeWidth="4" strokeLinecap="round" />
              <path d="M86 114 L86 142 L114 142 L114 114" fill="rgba(79,174,243,0.14)" stroke="#4FAEF3" strokeWidth="3" strokeLinejoin="round" />
              <path d="M66 142 L134 142 L148 166 L52 166 Z" fill="url(#trophyBase)" stroke="#4FAEF3" strokeWidth="3" strokeLinejoin="round" />
              <rect x="44" y="166" width="112" height="14" rx="2" fill="url(#trophyBase)" stroke="#4FAEF3" strokeWidth="3" />
              <path d="M100 44 L108 64 L130 68 L108 72 L100 92 L92 72 L70 68 L92 64 Z" fill="#4FAEF3" className="origin-center animate-pulse" />
              <text x="100" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4FAEF3" fontFamily="monospace" opacity="0.85">01</text>
            </svg>
          </div>
         
          {certificateImageSrc && (
            <a
              href={certificateImageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-[4px] border border-white/10 bg-white/5 px-4 py-2 sm:px-5 sm:py-2.5 transition-colors hover:bg-white/10 hover:border-[#4FAEF3]/50"
            >
              <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-300 group-hover/btn:text-white">
                VIEW DOCUMENT
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover/btn:text-[#4FAEF3]">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

interface IndividualAchievement {
  id: string;
  name: string;
  achievement: string;
  year: string;
  level: string;
  description: string;
  imageSrc?: string;
}

const INDIVIDUAL_ACHIEVEMENTS: IndividualAchievement[] = [
  { id: '01', name: 'Ryan Fernandes', achievement: "Synapse'26 // Second Place", year: '2026', level: 'HACK', description: "Secured Second Place at Synapse'26, Scaler School of Technology, Bengaluru.", imageSrc: '/a1.jpeg' },
  { id: '02', name: 'Team NeuroVITics', achievement: 'Neurohack Shaastra 2026 // 1st Place', year: '2026', level: 'HACK', description: 'Won 1st Place at Neurohack Shaastra 2026, IIT Madras.', imageSrc: '/a2.jpeg' },
  { id: '03', name: 'Tharun', achievement: 'ACEI Midterm Hackathon // 2nd Prize', year: '2026', level: 'HACK', description: 'Secured 2nd Prize among 840+ participants at the ACEI Midterm Hackathon, held from 21–23 August 2026, winning a cash prize of ₹30,000.', imageSrc: '/a3.png' },
  { id: '04', name: 'Mahmood, Aarushi', achievement: 'Samsung EnnovateX AX Hackathon // 1st Place', year: '2026', level: 'HACK', description: 'Secured 1st Place at the Samsung EnnovateX AX Hackathon 2026, hosted at the Samsung R&D Institute, competing against over 1,000 participants across multiple stages. Won flagship laptops and direct internship offers at Samsung.' },
  { id: '05', name: 'Team Sphnix', achievement: "Cosmo Clemch - TechSolctice'26 // 1st Place", year: '2026', level: 'HACK', description: "Won 1st Place in Cosmo Clemch, TechSolctice'26, MIT Bangalore.", imageSrc: '/a5.jpeg' },
  { id: '06', name: 'Team Sphnix', achievement: "RoboRace - TechSolctice'26 // 1st Runner-Up", year: '2026', level: 'HACK', description: "Secured 1st Runner-Up in RoboRace at TechSolctice'26, MIT Bangalore.", imageSrc: '/a6.jpeg' },
  { id: '07', name: 'Team CyberVITics', achievement: "Null OWASP CTF - TechSolctice'26 // 2nd Place", year: '2026', level: 'HACK', description: "Secured 2nd Place in Null OWASP CTF at TechSolctice'26, MIT Bangalore.", imageSrc: '/a7.jpeg' },
  { id: '08', name: 'Tharun, Ishan, Kiruba', achievement: 'Designathon – IIC // 2nd Place', year: '2026', level: 'HACK', description: 'Secured 2nd Place at the Designathon organized by IIC.' },
  { id: '09', name: 'Arunabh, Aarushi, Shambhavi, Mahmood', achievement: 'Road Safety Hack // 3rd Place', year: '2026', level: 'HACK', description: 'Secured 3rd Place at the Road Safety Hack conducted by the Office of Students’ Welfare.' },
  { id: '10', name: 'Yash Phatak, Jatin Patil', achievement: 'Hack Story Yantra Hackathon // 2nd Place', year: '2025', level: 'HACK', description: 'Secured 2nd Place at the Hack Story Yantra Hackathon.' },
  { id: '11', name: 'Yash Phatak, Prerit Tiwari', achievement: 'Johnson Controls Challenge Ideathon // 3rd Place', year: '2025', level: 'HACK', description: 'Secured 3rd Place at the Johnson Controls Challenge Ideathon.' },
];

const DECK_VISIBLE_DEPTH = 3;

function DossierCard({
  log,
  pos,
  total,
  isHovered,
  onCardClick,
}: {
  log: IndividualAchievement;
  pos: number;
  total: number;
  isHovered: boolean;
  onCardClick: (pos: number) => void;
}) {
  const isFront = pos === 0;
  const wrappedPos = pos > total / 2 ? pos - total : pos;
  const depth = Math.min(Math.abs(wrappedPos), DECK_VISIBLE_DEPTH);
  const isBack = wrappedPos < 0;
  const stackTilt = depth === 0 ? 0 : (depth % 2 === 0 ? -1 : 1) * (2 + depth * 1.5);
  const offscreen = Math.abs(wrappedPos) > DECK_VISIBLE_DEPTH;
  const fanOutY = isHovered && depth > 0 && !offscreen && !isBack ? depth * 12 : 0;
  const fanOutX = isHovered && depth > 0 && !offscreen && !isBack ? (depth % 2 === 0 ? 15 : -15) : 0;
  const [title, position = 'Winner'] = log.achievement.split('//').map((part) => part.trim());
  const categoryLabel = log.level.replace('NATIONAL', 'HACK');

  return (
    <motion.div
      className="absolute inset-0 cursor-pointer"
      onClick={() => onCardClick(wrappedPos)}
      style={{ zIndex: isBack ? 1 : total - depth }}
      animate={{
        x: fanOutX,
        y: offscreen ? (isBack ? 110 : -20) : depth * 28 + fanOutY,
        scale: offscreen ? 0.75 : 1 - depth * 0.08,
        rotate: offscreen ? (isBack ? 8 : 0) : stackTilt + (isHovered && depth > 0 ? (depth % 2 === 0 ? -2 : 2) : 0),
        opacity: offscreen ? 0 : 1 - depth * 0.25,
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-[4px] border p-5 transition-colors duration-500 sm:p-8 ${
          log.imageSrc
            ? 'items-center justify-between gap-5 md:flex-row md:items-start md:gap-8'
            : 'items-center justify-center text-center'
        }`}
        style={{
          background: '#0a0a0a',
          borderColor: isFront ? 'rgba(79,174,243,0.42)' : isHovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.1)',
          boxShadow: isFront
            ? '0 18px 46px rgba(0,0,0,0.58), 0 0 28px rgba(79,174,243,0.12)'
            : isHovered
              ? '0 14px 32px rgba(0,0,0,0.5)'
              : '0 10px 26px rgba(0,0,0,0.42)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(165deg, rgba(255,255,255,0.075), rgba(255,255,255,0.012) 40%, rgba(0,0,0,0.36))
            `,
            backgroundSize: '18px 18px, 18px 18px, auto',
          }}
        />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4FAEF3]/40 to-transparent opacity-70" />

        <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#4FAEF3]/50" />
        <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#4FAEF3]/50" />
        <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#4FAEF3]/50" />
        <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#4FAEF3]/50" />

        <div className={`relative z-10 flex h-full min-w-0 flex-1 flex-col justify-center ${log.imageSrc ? '' : 'items-center max-w-2xl'}`}>
          <span className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#4FAEF3] sm:text-[11px]">
            {categoryLabel} {'//'} {log.year}
          </span>
          <h3 className="mb-4 font-sans text-lg font-bold uppercase leading-tight tracking-wide text-white sm:text-2xl lg:text-3xl">
            {title}
          </h3>

          <div className={`mb-4 flex items-center gap-4 ${log.imageSrc ? '' : 'justify-center'}`}>
            <div className="h-px w-8 bg-white/20 sm:w-12" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-300 sm:text-[12px]">
              {log.name}
            </span>
            {!log.imageSrc && <div className="h-px w-8 bg-white/20 sm:w-12" />}
          </div>

          <div className="mb-4 w-fit rounded-[3px] border border-[#4FAEF3]/30 bg-[#4FAEF3]/10 px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#4FAEF3] sm:text-[11px]">
              POSITION: {position}
            </span>
          </div>

          <p className={`font-sans text-[11px] leading-relaxed text-gray-400 sm:text-[13.5px] ${log.imageSrc ? 'max-w-lg' : 'max-w-2xl'}`}>
            {log.description}
          </p>
        </div>

        {log.imageSrc && (
          <div className="relative z-10 flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-white/10 bg-black/35 md:w-[36%]">
            <Image src={log.imageSrc} alt={title} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
            <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-white/30" />
            <span className="absolute right-2 top-2 h-2 w-2 border-r border-t border-white/30" />
            <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-white/30" />
            <span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white/30" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function IndividualLogPanel() {
  const total = INDIVIDUAL_ACHIEVEMENTS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeLog = INDIVIDUAL_ACHIEVEMENTS[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  const handleCardClick = (wrappedPos: number) => {
    if (wrappedPos === 0) {
      handleNext();
    } else if (wrappedPos > 0) {
      setActiveIndex((prev) => (prev + wrappedPos) % total);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="mx-auto mb-8 w-full max-w-[1000px] sm:mb-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3]" />
            <span className="truncate font-mono text-[9px] uppercase tracking-[0.3em] text-[#4FAEF3]/80 sm:text-[10px]">
              MISSION_ARCHIVE // LOG {activeLog.id}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-md border border-white/10 p-2 text-[#4FAEF3] transition-colors hover:border-[#4FAEF3]/40 hover:bg-white/5 sm:p-2.5"
              aria-label="Previous achievement"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <span className="w-16 text-center font-mono text-[11px] tracking-widest text-white/50 sm:text-[13px]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-md border border-white/10 p-2 text-[#4FAEF3] transition-colors hover:border-[#4FAEF3]/40 hover:bg-white/5 sm:p-2.5"
              aria-label="Next achievement"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 sm:gap-2.5">
          {INDIVIDUAL_ACHIEVEMENTS.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Open achievement ${item.id}`}
              className={`h-[3px] flex-1 rounded-full transition-all duration-500 sm:h-[4px] ${
                index === activeIndex
                  ? 'bg-[#4FAEF3] shadow-[0_0_10px_#4FAEF3]'
                  : index < activeIndex
                    ? 'bg-[#4FAEF3]/30'
                    : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className="relative mx-auto w-full max-w-[1000px] pb-10 sm:pb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[390px] w-full sm:h-[340px]">
          {INDIVIDUAL_ACHIEVEMENTS.map((log, index) => {
            const pos = (index - activeIndex + total) % total;
            return (
              <DossierCard
                key={log.id}
                log={log}
                pos={pos}
                total={total}
                isHovered={isHovered}
                onCardClick={handleCardClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Achievements({
  clubCertificateImageSrc = '/achievements/elite-club-2024.jpeg',
}: {
  clubCertificateImageSrc?: string;
}) {
  const [view, setView] = useState<View>('club');

  return (
    <section
      id="achievements"
      className="relative flex min-h-screen w-full flex-col bg-transparent px-4 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 md:px-16 md:pt-36 lg:px-24 lg:pt-40"
    >
      <AchievementsBackground />
      <div className="absolute left-5 top-6 z-20 pointer-events-none sm:left-10 sm:top-8 md:top-20 lg:top-24">
        <span className="rv-section-log">
          <span className="rv-section-log-number">05.</span>
          SYSTEM.LOGS // ACHIEVEMENTS
        </span>
      </div>

      <div className="relative z-10 flex flex-1 w-full flex-col mx-auto max-w-[1400px]">
        <div className="flex-shrink-0 mb-5 sm:mb-6 md:mb-7">
          <div className="mb-4 sm:mb-5 flex items-center justify-center gap-4">
            <div className="rv-section-header">
              <h2
                className="rv-section-title"
                style={{
                  '--rv-section-title-mobile': 'clamp(34px, 9.6vw, 42px)',
                  '--rv-section-title-desktop': 'clamp(24px, 7vw, 64px)',
                } as React.CSSProperties}
              >
                YEARS OF <span className="text-[#4FAEF3]">RECOGNITION</span>
              </h2>
              <div className="rv-section-rule" />
            </div>
          </div>
          <div className="flex w-full sm:w-auto">
            <ViewToggle view={view} setView={setView} />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {view === 'club' ? (
                <ClubAchievementPlaque certificateImageSrc={clubCertificateImageSrc} />
              ) : (
                <IndividualLogPanel />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
