'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
      className="relative inline-flex items-center gap-1 rounded-[3px] p-1.5 shadow-lg shadow-black/50"
      style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
    >
      {items.map((item) => {
        const active = view === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className="relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 sm:px-5 sm:text-[11px]"
            style={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
          >
            {active && (
              <>
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-[2px]"
                  style={{ background: 'rgba(79,174,243,0.12)', border: '1px solid rgba(79,174,243,0.5)' }}
                />
                <span className="absolute -left-[1px] -top-[1px] h-2 w-2 border-l-2 border-t-2 border-[#4FAEF3]" />
                <span className="absolute -right-[1px] -top-[1px] h-2 w-2 border-r-2 border-t-2 border-[#4FAEF3]" />
                <span className="absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b-2 border-l-2 border-[#4FAEF3]" />
                <span className="absolute -bottom-[1px] -right-[1px] h-2 w-2 border-b-2 border-r-2 border-[#4FAEF3]" />
              </>
            )}
            <span className="relative z-10 drop-shadow-md">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Club Achievement 
/* ------------------------------------------------------------------ */
function ClubAchievementPlaque({ certificateImageSrc }: { certificateImageSrc?: string }) {
  return (
    <div
      className="group relative h-auto min-h-[380px] w-full overflow-hidden rounded-[8px] transition-all duration-500 hover:border-[#4FAEF3]/40"
      style={{
        background: `
          linear-gradient(165deg, rgba(79,174,243,0.08), rgba(20,20,20,0.9) 40%, rgba(5,5,5,0.95))
        `,
        border: '1px solid rgba(79,174,243,0.25)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 80px rgba(79,174,243,0.03)',
      }}
    >
      {/* Decorative Scanlines */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }}
      />

      {/* Corner Accents */}
      {[
        { top: 12, left: 12, b: 'borderTop' as const, l: 'borderLeft' as const },
        { top: 12, right: 12, b: 'borderTop' as const, l: 'borderRight' as const },
        { bottom: 12, left: 12, b: 'borderBottom' as const, l: 'borderLeft' as const },
        { bottom: 12, right: 12, b: 'borderBottom' as const, l: 'borderRight' as const },
      ].map((pos, i) => (
        <span
          key={i}
          className="absolute z-10 pointer-events-none opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            ...pos, width: 20, height: 20,
            [pos.b]: '2px solid #4FAEF3',
            [pos.l]: '2px solid #4FAEF3',
            filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.6))',
          }}
        />
      ))}

      <div className="relative z-20 flex h-full flex-col gap-8 p-8 sm:p-12 md:flex-row md:items-center md:gap-16">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-4 inline-flex items-center gap-2">
             <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FAEF3]" />
             <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4FAEF3]/80">
               ACHIEVEMENT_LOG // 01
             </span>
          </div>

          <h3
            className="mb-2 font-sans uppercase leading-[1.1] text-white"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            BEST CLUB <br className="hidden md:block" />
            <span className="text-[#4FAEF3] md:text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#4FAEF3] md:to-[#2b8cd6]">
              — ELITE CATEGORY
            </span>
          </h3>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400">
            RECORDED TENURE: 2024&ndash;25
          </p>

          <p className="mb-4 max-w-xl text-[13px] leading-relaxed text-gray-300 md:text-[15px]">
            Recognized for sustained impact, technical depth, and engagement across VIT&apos;s
            technical ecosystem.
          </p>
          <p className="hidden max-w-xl text-[13px] leading-relaxed text-gray-400 md:block md:text-[14px]">
            Driven in part by <span className="text-[#4FAEF3] font-semibold">Robowars</span> —
            the flagship combat robotics event of graVITas, cementing our position as a leader in national robotics competitions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-[4px] border border-[#4FAEF3]/40 bg-[#4FAEF3]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#4FAEF3] backdrop-blur-sm">
              EST. 2010
            </span>
            <span className="rounded-[4px] border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-300 backdrop-blur-sm">
              15 YEARS RUNNING
            </span>
          </div>
        </div>

        {/* Certificate Container */}
        <div className="hidden flex-shrink-0 items-center justify-center md:flex">
          <div
            className="group/cert relative flex h-[320px] w-[240px] items-center justify-center overflow-hidden rounded-[6px] lg:h-[380px] lg:w-[280px]"
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            {certificateImageSrc ? (
              <Image
                src={certificateImageSrc}
                alt="Best Club Certificate"
                fill
                sizes="280px"
                className="object-cover opacity-90 transition-opacity duration-500 group-hover/cert:opacity-100"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#4FAEF3]/50">[ AWAITING_ASSET ]</span>
              </div>
            )}
            {/* Scanning line effect over the certificate */}
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-[#4FAEF3]/10 to-transparent opacity-0 transition-all duration-1000 group-hover/cert:animate-[scan_2s_ease-in-out_infinite] group-hover/cert:opacity-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Individual achievements 
/* ------------------------------------------------------------------ */
interface IndividualAchievement {
  id: string;
  name: string;
  achievement: string;
  year: string;
}

const INDIVIDUAL_ACHIEVEMENTS: IndividualAchievement[] = [
  { id: '01', name: 'Member Name 01', achievement: 'Competition / Event Title — Position', year: '2026' },
  { id: '02', name: 'Member Name 02', achievement: 'Competition / Event Title — Position', year: '2026' },
  { id: '03', name: 'Member Name 03', achievement: 'Competition / Event Title — Position', year: '2026' },
  { id: '04', name: 'Member Name 04', achievement: 'Competition / Event Title — Position', year: '2026' },
  { id: '05', name: 'Member Name 05', achievement: 'Competition / Event Title — Position', year: '2026' },
  { id: '06', name: 'Member Name 06', achievement: 'Competition / Event Title — Position', year: '2025' },
  { id: '07', name: 'Member Name 07', achievement: 'Competition / Event Title — Position', year: '2025' },
  { id: '08', name: 'Member Name 08', achievement: 'Competition / Event Title — Position', year: '2025' },
  { id: '09', name: 'Member Name 09', achievement: 'Competition / Event Title — Position', year: '2024' },
  { id: '10', name: 'Member Name 10', achievement: 'Competition / Event Title — Position', year: '2024' },
];

function LogRow({ data }: { data: IndividualAchievement }) {
  return (
    <div className="group relative flex w-full items-center gap-4 border-b border-white/[0.04] px-5 py-3.5 transition-all duration-200 hover:bg-[#4FAEF3]/[0.06] hover:pl-6">
      <span
        className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3] transition-transform duration-200 group-hover:scale-y-100"
        style={{ transformOrigin: 'center' }}
      />
      <span className="w-8 flex-shrink-0 font-mono text-[11px] text-[#4FAEF3]/60">
        {data.id}
      </span>
      <span className="w-12 flex-shrink-0 font-mono text-[10px] text-emerald-500/80 group-hover:text-emerald-400">
        [OK]
      </span>
      <span className="w-[120px] flex-shrink-0 truncate text-[12px] font-semibold text-gray-200 sm:w-[140px] md:text-[13px]">
        {data.name}
      </span>
      <span className="min-w-0 flex-1 truncate text-[11px] text-gray-400 md:text-[12.5px] group-hover:text-white transition-colors">
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
    <div
      className="relative flex h-auto max-h-[600px] w-full flex-col overflow-hidden rounded-[8px] shadow-2xl"
      style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-6 py-4">
        <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-sm bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#4FAEF3]/90 md:text-[11px]">
            ▶ ACCESSING INDIVIDUAL_RECORDS.DAT
            </span>
        </div>
        <span className="font-mono text-[10px] text-gray-500 md:text-[11px]">
          10/10 ENTRIES LOADED
        </span>
      </div>

      {/* Table Headers */}
      <div className="hidden md:grid grid-cols-2 divide-x divide-white/[0.08] border-b border-white/[0.08] bg-[#111] font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
          <div className="flex items-center gap-4 px-5 py-2">
              <span className="w-8">ID</span>
              <span className="w-12">STATUS</span>
              <span className="w-[140px]">OPERATIVE</span>
              <span className="flex-1">DIRECTIVE</span>
              <span>CYCLE</span>
          </div>
          <div className="flex items-center gap-4 px-5 py-2">
              <span className="w-8">ID</span>
              <span className="w-12">STATUS</span>
              <span className="w-[140px]">OPERATIVE</span>
              <span className="flex-1">DIRECTIVE</span>
              <span>CYCLE</span>
          </div>
      </div>

      <div className="grid min-h-[400px] flex-1 grid-cols-1 divide-y divide-white/[0.04] overflow-y-auto md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="flex flex-col">
          {colA.map((item) => <LogRow key={item.id} data={item} />)}
        </div>
        <div className="flex flex-col">
          {colB.map((item) => <LogRow key={item.id} data={item} />)}
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center justify-center gap-2 border-t border-white/[0.08] bg-white/[0.01] py-3.5">
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
  clubCertificateImageSrc = '/achievements/elite-club-2024.jpg',
}: {
  clubCertificateImageSrc?: string;
}) {
  const [view, setView] = useState<View>('club');

  return (
    <section
      id="achievements"
      // FIXED: min-h-screen ensures it takes the full viewport. flex-col handles the stack.
      className="relative flex min-h-screen w-full flex-col bg-transparent px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-24"
    >
      <AchievementsBackground />

      {/* FIXED: Using flex-1 guarantees this container fills the ENTIRE min-h-screen available. */}
      <div className="relative z-10 flex flex-1 w-full flex-col mx-auto max-w-[1400px]">
        
        {/* Header Block (Shrinks to fit content at the top) */}
        <div className="flex-shrink-0">
            <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
            <div>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-[11px]">
                <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>06.</span>
                SYSTEM.LOGS // ACHIEVEMENTS
                </span>
                <h2
                className="font-sans uppercase text-white"
                style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05 }}
                >
                YEARS OF <span className="text-[#4FAEF3]">RECOGNITION.</span>
                </h2>
            </div>
            </div>

            <div className="mb-8 flex sm:mb-10">
                <ViewToggle view={view} setView={setView} />
            </div>
        </div>

        {/* Content Block (Expands to fill remaining space and vertically centers its children) */}
        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}