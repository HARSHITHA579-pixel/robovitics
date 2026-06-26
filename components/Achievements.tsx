'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Background
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Toggle
/* ------------------------------------------------------------------ */
type View = 'club' | 'individual';

function ViewToggle({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { key: View; label: string }[] = [
    { key: 'club', label: 'CLUB ACHIEVEMENT' },
    { key: 'individual', label: 'INDIVIDUAL LOGS // 10' },
  ];

  return (
    <div
      className="relative inline-flex items-center gap-1 rounded-md p-1.5 shadow-2xl"
      style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
    >
      {items.map((item) => {
        const active = view === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className="relative px-5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 sm:px-6 sm:text-[11px]"
            style={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
          >
            {active && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-[4px]"
                style={{ background: 'rgba(79,174,243,0.15)', border: '1px solid rgba(79,174,243,0.3)' }}
              />
            )}
            <span className="relative z-10 drop-shadow-md">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Club Achievement Plaque (Glassmorphism + Digital Asset)
/* ------------------------------------------------------------------ */
function ClubAchievementPlaque({ certificateImageSrc }: { certificateImageSrc?: string }) {
  return (
    <div className="group relative h-auto min-h-[420px] w-full overflow-hidden rounded-2xl transition-all duration-500 border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white/[0.03] hover:border-white/10 hover:shadow-[0_16px_48px_rgba(79,174,243,0.1)]">
      
      {/* Soft Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4FAEF3]/30 to-transparent opacity-50" />

      <div className="relative z-20 flex h-full flex-col gap-10 p-8 sm:p-12 md:flex-row md:items-center md:gap-16">
        
        {/* Left Side: Typography */}
        <div className="flex min-w-0 flex-1 flex-col justify-center text-left">
          
          <div className="mb-6 inline-flex items-center gap-3">
             <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3]" />
             <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4FAEF3]/80">
               ACHIEVEMENT_LOG // 01
             </span>
          </div>

          <h3 className="mb-4 font-sans uppercase leading-[1.1] text-white" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.02em' }}>
            BEST CLUB <br className="hidden md:block" />
            <span className="text-[#4FAEF3] md:text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#4FAEF3] md:to-[#2b8cd6]">
              ELITE CATEGORY
            </span>
          </h3>
          
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            RECORDED TENURE // 2024 TO 2025
          </p>

          {/* Grouped Description Block with Left Border */}
          <div className="relative border-l-2 border-[#4FAEF3]/20 pl-6 space-y-5">
            <p className="max-w-xl text-[14px] leading-[1.8] text-gray-300 md:text-[15px] font-light tracking-wide">
              Awarded for exceptional technical innovation, sustained ecosystem impact, and engineering excellence across the university network. 
            </p>
            <p className="max-w-xl text-[14px] leading-[1.8] text-gray-400 md:text-[15px] font-light tracking-wide">
              Anchored by <span className="text-[#4FAEF3] font-medium">Robowars</span>, the premier combat robotics league, solidifying a legacy of dominance in national hardware competitions.
            </p>
          </div>

        </div>

        {/* Right Side: Abstract Digital Artifact */}
        <div className="flex flex-shrink-0 flex-col items-center justify-center gap-6">
          <div className="relative flex h-[240px] w-[240px] items-center justify-center lg:h-[280px] lg:w-[280px]">
            
            {/* Holographic Background Glow */}
            <div className="absolute inset-0 rounded-full bg-[#4FAEF3]/5 blur-[40px] transition-all duration-700 group-hover:bg-[#4FAEF3]/10" />
            
            {/* Rotating Rings */}
            <div className="absolute inset-4 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-[#4FAEF3]/20" />
            <div className="absolute inset-8 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-white/5" />
            
            {/* Central Graphic (Cyber-Shield Trophy) */}
            <div className="relative z-10 flex h-[150px] w-[150px] items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md shadow-[inset_0_0_20px_rgba(79,174,243,0.1)] lg:h-[170px] lg:w-[170px]">
              <svg 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-full w-full drop-shadow-[0_0_15px_rgba(79,174,243,0.5)]"
              >
                {/* Outer glowing rings */}
                <circle cx="100" cy="100" r="90" stroke="rgba(79,174,243,0.15)" strokeWidth="2" strokeDasharray="4 12" className="origin-center animate-[spin_20s_linear_infinite]" />
                <circle cx="100" cy="100" r="75" stroke="rgba(79,174,243,0.3)" strokeWidth="1" strokeDasharray="30 10" className="origin-center animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* Main Shield / Trophy Body */}
                <path d="M100 20 L160 50 L140 130 L100 180 L60 130 L40 50 Z" fill="rgba(79,174,243,0.05)" stroke="#4FAEF3" strokeWidth="2" strokeLinejoin="round" />
                
                {/* Inner Facets */}
                <path d="M100 20 L100 180" stroke="#4FAEF3" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M40 50 L100 80 L160 50" stroke="#4FAEF3" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M60 130 L100 80 L140 130" stroke="#4FAEF3" strokeWidth="1.5" strokeLinejoin="round" />
                
                {/* Floating Core / Star */}
                <path d="M100 60 L105 75 L120 80 L105 85 L100 100 L95 85 L80 80 L95 75 Z" fill="#4FAEF3" className="origin-center animate-pulse shadow-[0_0_15px_#4FAEF3]" />
                
                {/* HUD corner brackets */}
                <path d="M30 30 L20 30 L20 40" stroke="#4FAEF3" strokeWidth="2" fill="none" />
                <path d="M170 30 L180 30 L180 40" stroke="#4FAEF3" strokeWidth="2" fill="none" />
                <path d="M30 170 L20 170 L20 160" stroke="#4FAEF3" strokeWidth="2" fill="none" />
                <path d="M170 170 L180 170 L180 160" stroke="#4FAEF3" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Fallback link to open the actual certificate if provided */}
          {certificateImageSrc && (
            <a 
              href={certificateImageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-[4px] border border-white/10 bg-white/5 px-5 py-2.5 transition-colors hover:bg-white/10 hover:border-[#4FAEF3]/50"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300 group-hover/btn:text-white">
                VIEW OFFICIAL DOCUMENT
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover/btn:text-[#4FAEF3]">
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

/* ------------------------------------------------------------------ */
/* Individual Achievements 
/* ------------------------------------------------------------------ */
interface IndividualAchievement {
  id: string;
  name: string;
  achievement: string;
  year: string;
}

const INDIVIDUAL_ACHIEVEMENTS: IndividualAchievement[] = [
  { id: '01', name: 'Member Name 01', achievement: 'Competition Title // Position', year: '2026' },
  { id: '02', name: 'Member Name 02', achievement: 'Competition Title // Position', year: '2026' },
  { id: '03', name: 'Member Name 03', achievement: 'Competition Title // Position', year: '2026' },
  { id: '04', name: 'Member Name 04', achievement: 'Competition Title // Position', year: '2026' },
  { id: '05', name: 'Member Name 05', achievement: 'Competition Title // Position', year: '2026' },
  { id: '06', name: 'Member Name 06', achievement: 'Event Title // Position', year: '2025' },
  { id: '07', name: 'Member Name 07', achievement: 'Event Title // Position', year: '2025' },
  { id: '08', name: 'Member Name 08', achievement: 'Event Title // Position', year: '2025' },
  { id: '09', name: 'Member Name 09', achievement: 'Event Title // Position', year: '2024' },
  { id: '10', name: 'Member Name 10', achievement: 'Event Title // Position', year: '2024' },
];

function LogRow({ data }: { data: IndividualAchievement }) {
  return (
    <div className="group relative flex w-full items-center gap-4 border-b border-white/[0.04] px-6 py-4 transition-all duration-200 hover:bg-white/[0.03]">
      <span
        className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3] transition-transform duration-200 group-hover:scale-y-100"
        style={{ transformOrigin: 'center' }}
      />
      <span className="w-8 flex-shrink-0 font-mono text-[11px] text-[#4FAEF3]/60">
        {data.id}
      </span>
      <span className="w-12 flex-shrink-0 font-mono text-[10px] text-emerald-500/80 group-hover:text-emerald-400">
        [OK]
      </span>
      <span className="w-[120px] flex-shrink-0 truncate text-[12.5px] font-medium text-gray-200 tracking-wide sm:w-[150px] md:text-[13.5px]">
        {data.name}
      </span>
      <span className="min-w-0 flex-1 truncate text-[11.5px] text-gray-400 md:text-[13px] group-hover:text-white transition-colors tracking-wide">
        {data.achievement}
      </span>
      <span className="flex-shrink-0 font-mono text-[10px] text-gray-500 group-hover:text-[#4FAEF3]/80 transition-colors">
        {data.year}
      </span>
    </div>
  );
}

function IndividualLogPanel() {
  const half = Math.ceil(INDIVIDUAL_ACHIEVEMENTS.length / 2);
  const colA = INDIVIDUAL_ACHIEVEMENTS.slice(0, half);
  const colB = INDIVIDUAL_ACHIEVEMENTS.slice(half);

  return (
    <div className="relative flex h-auto max-h-[600px] w-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.05] bg-black/20 px-8 py-5">
        <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-sm bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-300 md:text-[11px]">
              ACCESSING INDIVIDUAL_RECORDS.DAT
            </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.1em] text-[#4FAEF3]/80 md:text-[11px]">
          10 / 10 ENTRIES LOADED
        </span>
      </div>

      {/* Table Headers */}
      <div className="hidden md:grid grid-cols-2 divide-x divide-white/[0.05] border-b border-white/[0.05] bg-black/10 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
          <div className="flex items-center gap-4 px-6 py-3">
              <span className="w-8">ID</span>
              <span className="w-12">STATUS</span>
              <span className="w-[150px]">OPERATIVE</span>
              <span className="flex-1">DIRECTIVE</span>
              <span>CYCLE</span>
          </div>
          <div className="flex items-center gap-4 px-6 py-3">
              <span className="w-8">ID</span>
              <span className="w-12">STATUS</span>
              <span className="w-[150px]">OPERATIVE</span>
              <span className="flex-1">DIRECTIVE</span>
              <span>CYCLE</span>
          </div>
      </div>

      <div className="grid min-h-[400px] flex-1 grid-cols-1 divide-y divide-white/[0.05] overflow-y-auto md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="flex flex-col">
          {colA.map((item) => <LogRow key={item.id} data={item} />)}
        </div>
        <div className="flex flex-col">
          {colB.map((item) => <LogRow key={item.id} data={item} />)}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-shrink-0 items-center justify-center gap-2 border-t border-white/[0.05] bg-black/20 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-[11px]">
          EOF // END OF FILE
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
          className="inline-block h-3 w-1.5 bg-[#4FAEF3]/80 align-[-0.15em]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main export 
/* ------------------------------------------------------------------ */
export default function Achievements({
  clubCertificateImageSrc = '/achievements/elite-club-2024.jpeg',
}: {
  clubCertificateImageSrc?: string;
}) {
  const [view, setView] = useState<View>('club');

  return (
    <section
      id="achievements"
      className="relative flex min-h-screen w-full flex-col bg-transparent px-5 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-24"
    >
      <AchievementsBackground />

      <div className="relative z-10 flex flex-1 w-full flex-col mx-auto max-w-[1400px]">
        
        {/* Header Block */}
        <div className="flex-shrink-0 mb-10 md:mb-14">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500 sm:text-[11px]">
                  <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '10px' }}>06.</span>
                  SYSTEM.LOGS // ACHIEVEMENTS
                  </span>
                  <h2
                  className="font-sans uppercase text-white"
                  style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05 }}
                  >
                  YEARS OF <span className="text-[#4FAEF3]">RECOGNITION.</span>
                  </h2>
              </div>
            </div>

            <div className="flex">
                <ViewToggle view={view} setView={setView} />
            </div>
        </div>

        {/* Content Block */}
        <div className="flex flex-1 flex-col justify-center">
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