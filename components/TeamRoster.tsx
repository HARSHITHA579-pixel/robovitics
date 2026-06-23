'use client';

import React from 'react';

// ----------------------------------------------------------------------
// SHARED BACKGROUND
// ----------------------------------------------------------------------
function EventsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0d0d0d]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {([
        [8, 9], [66, 14], [15, 58], [80, 47], [44, 78],
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
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="8%" y1="9%" x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="66%" y1="14%" x2="80%" y2="47%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="15%" y1="58%" x2="44%" y2="78%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ----------------------------------------------------------------------
// FACULTY & BOARD DATA
// ----------------------------------------------------------------------
const FACULTY = Array.from({ length: 4 }).map((_, i) => ({
  id: `fac-${i + 1}`,
  name: `FACULTY ${i + 1}`,
  role: 'ADVISOR',
  imgUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=fac${i}&backgroundColor=transparent`, 
}));

const BOARD = Array.from({ length: 24 }).map((_, i) => ({
  id: `board-${i + 1}`,
  name: `BOARD MEMBER ${i + 1}`,
  role: i === 0 ? 'PRESIDENT' : i === 1 ? 'VICE PRESIDENT' : 'CORE BOARD',
  imgUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=board${i}&backgroundColor=transparent`, 
}));

// ----------------------------------------------------------------------
// PROFILE CARD COMPONENT
// ----------------------------------------------------------------------
function ProfileCard({ person }: { person: { id: string; name: string; role: string; imgUrl: string } }) {
  return (
    <div className="group relative w-full h-full transition-transform duration-500 ease-out hover:-translate-y-2">
      <div
        className="relative h-full overflow-hidden rounded-[4px] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(79,174,243,0.18)] flex flex-col"
        style={{ padding: 'clamp(12px, 1.2vw, 16px)', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Styled background layer */}
        <div
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            top: -1, right: -1, bottom: -1, left: -1, borderRadius: '4px',
            background: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)), rgba(28,30,34,0.95)`,
            backgroundSize: '18px 18px, 18px 18px, auto, auto', border: '1px solid rgba(235,238,242,0.28)',
          }}
        />

        {/* Cyan corner brackets */}
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ top: 6, left: 6, width: 14, height: 14, borderTop: '1.5px solid rgba(79,174,243,0.85)', borderLeft: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ top: 6, right: 6, width: 14, height: 14, borderTop: '1.5px solid rgba(79,174,243,0.85)', borderRight: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ bottom: 6, left: 6, width: 14, height: 14, borderBottom: '1.5px solid rgba(79,174,243,0.85)', borderLeft: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ bottom: 6, right: 6, width: 14, height: 14, borderBottom: '1.5px solid rgba(79,174,243,0.85)', borderRight: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        
        {/* Cyan top/bottom highlight lines */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <span style={{ position: 'absolute', top: '-1px', left: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.6)' }} />
          <span style={{ position: 'absolute', bottom: '-1px', right: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.35)' }} />
        </div>

        <div className="relative z-30 flex flex-col items-center flex-grow">
          <div className="w-full aspect-[4/5] mb-4 overflow-hidden rounded-[2px] border border-white/10 transition-all duration-500 group-hover:border-[#4FAEF3]/50 group-hover:shadow-[0_0_15px_rgba(79,174,243,0.2)] bg-[#111]">
            <img src={person.imgUrl} alt={person.name} className="w-full h-full object-cover transition-all duration-700 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
          </div>
          <div className="mt-auto flex flex-col items-center w-full">
            <h3 className="text-center font-sans font-black uppercase tracking-[0.06em] text-white transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" style={{ margin: '0 0 4px', fontSize: 'clamp(12px, 1.1vw, 15px)', lineHeight: 1.15 }}>
              {person.name}
            </h3>
            <p className="text-center font-mono uppercase tracking-[0.1em] transition-all duration-500" style={{ margin: '0 0 8px', fontSize: 'clamp(8px, 0.65vw, 10px)', color: 'rgba(79,174,243,0.85)' }}>
              {person.role}
            </p>
            <div style={{ height: '1px', margin: '0 6px', width: 'calc(100% - 12px)', background: 'linear-gradient(90deg, transparent, rgba(79,174,243,0.4) 30%, rgba(79,174,243,0.4) 70%, transparent)', boxShadow: '0 0 10px rgba(79,174,243,0.2)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN EXPORT
// ----------------------------------------------------------------------
export default function TeamRoster() {
  return (
    <section id="command-structure" className="relative w-full min-h-screen py-24 md:py-32 bg-[#0d0d0d] overflow-hidden">
      <EventsBackground />
      
      {/* Top Left Label */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20 pointer-events-none">
        <span style={{
          fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
        }}>
          <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>05.</span>
          SYSTEM.LOGS // COMMAND_STRUCTURE
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        {/* FACULTY SECTION */}
        <div className="w-full max-w-6xl flex flex-col items-center mb-24 md:mb-32">
          <div className="flex flex-col items-center text-center mb-12">
            <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase' }}>
              ▶ ACCESS_LEVEL // TIER_01
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.01em', fontFamily: '"Inter", "Arial Black", sans-serif', textTransform: 'uppercase', lineHeight: 1 }}>
              FACULTY <span style={{ color: '#4FAEF3' }}>ADVISORS</span>
            </h2>
            <div style={{ marginTop: '16px', width: '120px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }} />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FACULTY.map((person) => (
              <ProfileCard key={person.id} person={person} />
            ))}
          </div>
        </div>

        {/* BOARD SECTION */}
        <div className="w-full max-w-7xl flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-12">
            <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase' }}>
              ▶ ACCESS_LEVEL // TIER_02
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.01em', fontFamily: '"Inter", "Arial Black", sans-serif', textTransform: 'uppercase', lineHeight: 1 }}>
              CORE <span style={{ color: '#4FAEF3' }}>BOARD</span>
            </h2>
            <div style={{ marginTop: '16px', width: '120px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }} />
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {BOARD.map((person) => (
              <ProfileCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}