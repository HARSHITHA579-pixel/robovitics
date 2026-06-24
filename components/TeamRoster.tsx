'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  // Replace photoUrl with real member photo. Robot shown on hover.
  photoUrl: `https://api.dicebear.com/7.x/personas/svg?seed=fac${i}&backgroundColor=b6e3f4`,
  robotUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=fac${i}&backgroundColor=transparent`,
}));

const BOARD = Array.from({ length: 24 }).map((_, i) => ({
  id: `board-${i + 1}`,
  name: `BOARD MEMBER ${i + 1}`,
  role: i === 0 ? 'PRESIDENT' : i === 1 ? 'VICE PRESIDENT' : 'CORE BOARD',
  // Replace photoUrl with real member photo. Robot shown on hover.
  photoUrl: `https://api.dicebear.com/7.x/personas/svg?seed=board${i}&backgroundColor=b6e3f4`,
  robotUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=board${i}&backgroundColor=transparent`,
}));

// ----------------------------------------------------------------------
// PROFILE CARD
// ----------------------------------------------------------------------
interface PersonData {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  robotUrl: string;
}

function ProfileCard({
  person,
  revealed,
  interactive = true,
}: {
  person: PersonData;
  revealed: boolean;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = interactive && hovered;

  return (
    <div
      className="group relative w-full h-full"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      onMouseEnter={() => {
        if (interactive) setHovered(true);
      }}
      onMouseLeave={() => {
        if (interactive) setHovered(false);
      }}
    >
      <div
        className="team-card-inner relative h-full overflow-hidden rounded-[4px] flex flex-col"
        style={{
          padding: 'clamp(12px, 1.2vw, 16px)',
          background: '#0a0a0a',
          border: isActive ? '1px solid rgba(79,174,243,0.45)' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isActive ? '0 0 25px rgba(79,174,243,0.15)' : 'none',
          transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Grid texture background */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -1, right: -1, bottom: -1, left: -1, borderRadius: '4px',
            background: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)), rgba(28,30,34,0.95)`,
            backgroundSize: '18px 18px, 18px 18px, auto, auto',
            border: '1px solid rgba(235,238,242,0.28)',
          }}
        />

        {/* Corner brackets */}
        {[
          { top: 6, left: 6, borderTop: true, borderLeft: true },
          { top: 6, right: 6, borderTop: true, borderRight: true },
          { bottom: 6, left: 6, borderBottom: true, borderLeft: true },
          { bottom: 6, right: 6, borderBottom: true, borderRight: true },
        ].map((c, ci) => (
          <span
            key={ci}
            className="absolute z-10 pointer-events-none"
            style={{
              ...(c.top    !== undefined ? { top:    c.top }    : {}),
              ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
              ...(c.left   !== undefined ? { left:   c.left }   : {}),
              ...(c.right  !== undefined ? { right:  c.right }  : {}),
              width: 14, height: 14,
              borderTop:    c.borderTop    ? `1.5px solid ${isActive ? 'rgba(79,174,243,1)' : 'rgba(79,174,243,0.85)'}` : undefined,
              borderBottom: c.borderBottom ? `1.5px solid ${isActive ? 'rgba(79,174,243,1)' : 'rgba(79,174,243,0.85)'}` : undefined,
              borderLeft:   c.borderLeft   ? `1.5px solid ${isActive ? 'rgba(79,174,243,1)' : 'rgba(79,174,243,0.85)'}` : undefined,
              borderRight:  c.borderRight  ? `1.5px solid ${isActive ? 'rgba(79,174,243,1)' : 'rgba(79,174,243,0.85)'}` : undefined,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(0.82)',
              filter: isActive ? 'drop-shadow(0 0 6px rgba(79,174,243,0.9))' : 'drop-shadow(0 0 4px rgba(79,174,243,0.5))',
              transition: 'all 0.3s ease',
            }}
          />
        ))}

        {/* Cyan accent lines */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <span style={{ position: 'absolute', top: '-1px', left: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.6)', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease' }} />
          <span style={{ position: 'absolute', bottom: '-1px', right: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.35)', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        </div>

        {/* Image area */}
        <div
          className="team-image relative w-full mb-4 overflow-hidden rounded-[2px] bg-[#111]"
          style={{
            aspectRatio: '4/5',
            border: isActive ? '1px solid rgba(79,174,243,0.5)' : '1px solid rgba(255,255,255,0.1)',
            boxShadow: isActive ? '0 0 15px rgba(79,174,243,0.2)' : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          {/* PHOTO — default, fades out on hover */}
          <div
            style={{
              position: 'absolute', inset: 0,
              opacity: isActive ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
          >
            <img
              src={person.photoUrl}
              alt={person.name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'grayscale(1)',
                opacity: 0.85,
                transition: 'opacity 0.6s ease',
              }}
            />
          </div>

          {/* ROBOT — shown on hover: large, greyscale, fills card */}
          <div
            style={{
              position: 'absolute', inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.4s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#0d0d0d',
            }}
          >
            <img
              src={person.robotUrl}
              alt={`${person.name} robot`}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'grayscale(1) brightness(0.9)',
                transform: isActive ? 'scale(1.0)' : 'scale(1.08)',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>

          {/* HUD label — visible on hover */}
          <div
            style={{
              position: 'absolute', bottom: 6, left: 8,
              fontSize: '8px', letterSpacing: '0.12em',
              color: 'rgba(79,174,243,0.9)', fontFamily: 'monospace',
              textTransform: 'uppercase',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 30,
            }}
          >
            IDENTIFYING...
          </div>

          {/* Scan sweep — visible on hover */}
          <div
            className={isActive ? 'team-scan-line is-active' : 'team-scan-line'}
            aria-hidden="true"
          />
        </div>

        {/* Name & role */}
        <div className="relative z-30 mt-auto flex flex-col items-center w-full">
          <h3
            className="team-name text-center font-sans font-black uppercase"
            style={{
              margin: '0 0 4px',
              fontSize: 'clamp(12px, 1.1vw, 15px)',
              letterSpacing: '0.06em',
              lineHeight: 1.15,
              color: isActive ? '#4FAEF3' : '#ffffff',
              textShadow: isActive ? '0 0 10px rgba(79,174,243,0.6)' : 'none',
              transition: 'all 0.4s ease',
            }}
          >
            {person.name}
          </h3>
          <p
            className="team-role text-center font-mono uppercase"
            style={{
              margin: '0 0 8px',
              fontSize: 'clamp(8px, 0.65vw, 10px)',
              letterSpacing: '0.1em',
              color: 'rgba(79,174,243,0.85)',
              transition: 'all 0.4s ease',
            }}
          >
            {person.role}
          </p>
          <div
            style={{
              height: '1px', margin: '0 6px',
              width: 'calc(100% - 12px)',
              background: isActive
                ? 'linear-gradient(90deg, transparent, rgba(79,174,243,0.5) 30%, rgba(79,174,243,0.5) 70%, transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)',
              boxShadow: isActive ? '0 0 10px rgba(79,174,243,0.2)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// GRID WITH SCROLL-TRIGGERED REVEAL (ALL AT ONCE)
// ----------------------------------------------------------------------
function RevealGrid({
  people,
  columns,
  interactive = true,
}: {
  people: PersonData[];
  columns: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <div ref={ref} className={`w-full grid ${columns} gap-3 md:gap-6`}>
      {people.map((person) => (
        <ProfileCard
          key={person.id}
          person={person}
          revealed={triggered}
          interactive={interactive}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN EXPORT
// ----------------------------------------------------------------------
export default function TeamRoster({ id = 'command-structure' }: { id?: string }) {
  return (
    <section id={id} className="relative w-full min-h-screen py-20 md:py-32 bg-[#0d0d0d] overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">

        {/* ── FACULTY SECTION ── */}
        <div className="w-full max-w-6xl flex flex-col items-center mb-16 md:mb-32">
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase' }}>
              ▶ ACCESS_LEVEL // TIER_01
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.01em', fontFamily: '"Inter", "Arial Black", sans-serif', textTransform: 'uppercase', lineHeight: 1 }}>
              FACULTY <span style={{ color: '#4FAEF3' }}>ADVISORS</span>
            </h2>
            <div style={{ marginTop: '16px', width: '120px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }} />
          </div>

          <RevealGrid
            people={FACULTY}
            columns="grid-cols-2 lg:grid-cols-4"
            interactive={false}
          />
        </div>

        {/* ── BOARD SECTION ── */}
        <div className="w-full max-w-7xl flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase' }}>
              ▶ ACCESS_LEVEL // TIER_02
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.01em', fontFamily: '"Inter", "Arial Black", sans-serif', textTransform: 'uppercase', lineHeight: 1 }}>
              CORE <span style={{ color: '#4FAEF3' }}>BOARD</span>
            </h2>
            <div style={{ marginTop: '16px', width: '120px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }} />
          </div>

          <RevealGrid
            people={BOARD}
            columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          />
        </div>

      </div>
      <style jsx>{`
        :global(.team-scan-line) {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          z-index: 25;
          opacity: 0;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(79, 174, 243, 0.25) 18%,
            rgba(79, 174, 243, 0.9) 50%,
            rgba(79, 174, 243, 0.25) 82%,
            transparent
          );
          box-shadow:
            0 0 12px rgba(79, 174, 243, 0.55),
            0 10px 26px rgba(79, 174, 243, 0.14);
        }
        :global(.team-scan-line::after) {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 2px;
          height: 42px;
          background: linear-gradient(
            to bottom,
            rgba(79, 174, 243, 0.16),
            rgba(79, 174, 243, 0)
          );
        }
        :global(.team-scan-line.is-active) {
          opacity: 1;
          animation: team-scan-sweep 1.55s ease-in-out infinite alternate;
        }
        @keyframes team-scan-sweep {
          from {
            transform: translateY(8px);
          }
          to {
            transform: translateY(calc(100% + 230px));
          }
        }
        @media (max-width: 640px) {
          :global(.team-card-inner) {
            padding: 10px !important;
            min-height: 214px;
          }
          :global(.team-image) {
            aspect-ratio: 1 / 1 !important;
            margin-bottom: 10px !important;
          }
          :global(.team-name) {
            font-size: 10.5px !important;
            letter-spacing: 0.045em !important;
            line-height: 1.2 !important;
            margin-bottom: 4px !important;
          }
          :global(.team-role) {
            font-size: 7px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 7px !important;
          }
        }
      `}</style>
    </section>
  );
}
