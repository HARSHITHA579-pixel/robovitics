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
const FACULTY = [
  { name: 'Prof. Kalaiarassan G', role: 'School of Mechanical Engineering', photoUrl: '/kalai%201.png' },
  { name: 'Prof. Abraham Sampson S', role: 'School of Electronic Engineering', photoUrl: '/sampson%201.png' },
  { name: 'Prof. Brisilla R M', role: 'School of Computer Science & Engineering', photoUrl: '/brisilla%201.png' },
  { name: 'Prof. Radhakrishnan Delhibabu', role: 'School of Computer Science & Engineering', photoUrl: '/delhibabu%201.png' },
].map((person, i) => ({
  id: `fac-${i + 1}`,
  name: person.name,
  role: person.role,
  // Replace photoUrl with real member photo. Robot shown on hover.
  photoUrl: person.photoUrl,
  robotUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=fac${i}&backgroundColor=transparent`,
}));

const BOARD = [
  { name: 'Shuktika', role: 'Chairperson' },
  { name: 'Aarushi', role: 'Vice-Chairperson' },
  { name: 'Krrish', role: 'Secretary' },
  { name: 'Shambhavi', role: 'Co-Secretary' },
  { name: 'Tharun', role: 'Events Head' },
  { name: 'Kashikaa', role: 'PR Head' },
  { name: 'Arushi', role: 'Tech Lead' },
  { name: 'Kesava Prasath', role: 'R&D Head' },
  { name: 'Azad', role: 'Design Head' },
  { name: 'Mahmood', role: 'AI/ML Lead & Project Lead' },
  { name: 'Kriday', role: 'Cyber Security Lead' },
  { name: 'Harshitha', role: 'Web Development Lead' },
  { name: 'Jacinth', role: 'App Development Lead & RoboWars Head' },
  { name: 'Kiruba', role: 'Managing Director (MD)' },
  { name: 'Shravan', role: 'Hands-on Robotics (HoR)' },
  { name: 'Ishan', role: 'Hacks' },
  { name: 'Suyash', role: 'Editorial Head' },
  { name: 'Animeha', role: 'Creative Head' },
].map((person, i) => ({
  id: `board-${i + 1}`,
  name: person.name,
  role: person.role,
  // Replace photoUrl with real member photo. Robot shown on hover.
  photoUrl: person.name === 'Shuktika' ? '/shukthika.png' :
            person.name === 'Arushi' ? '/arushi.png' :
            person.name === 'Azad' ? '/azad.png' :
            person.name === 'Suyash' ? '/suyash.png' :
            `https://api.dicebear.com/7.x/personas/svg?seed=board${i}&backgroundColor=b6e3f4`,
  robotUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=board${i}&backgroundColor=transparent`,
}));

const SENIOR_BOARD = [
  'Ryan',
  'Sheyansh',
  'Anjali Chougule',
  'Ankith',
  'Bhavya Singla',
  'Naman Chauhan',
  'Sarvesh',
  'Vasabdatwa',
  'Aadithya Chourasia',
  'Advay',
  'Charvi',
  'Rithvik',
].map((name, i) => ({
  id: `senior-board-${i + 1}`,
  name,
  role: '',
  // Replace photoUrl with real member photo. Robot shown on hover.
  photoUrl: name === 'Naman Chauhan' ? '/naman.png' :
            `https://api.dicebear.com/7.x/personas/svg?seed=senior-board${i}&backgroundColor=b6e3f4`,
  robotUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=senior-board${i}&backgroundColor=transparent`,
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
  compact = false,
  facultyCompact = false,
}: {
  person: PersonData;
  revealed: boolean;
  interactive?: boolean;
  compact?: boolean;
  facultyCompact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const isInteractive = interactive && canHover;
  const isActive = isInteractive && hovered;
  const isSmall = compact || facultyCompact;

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCanHover = () => {
      setCanHover(query.matches);
      if (!query.matches) setHovered(false);
    };

    updateCanHover();
    query.addEventListener('change', updateCanHover);
    return () => query.removeEventListener('change', updateCanHover);
  }, []);

  return (
    <div
      className="group relative w-full h-full"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      onMouseEnter={() => {
        if (isInteractive) setHovered(true);
      }}
      onMouseLeave={() => {
        if (isInteractive) setHovered(false);
      }}
    >
      <div
        className={compact ? 'team-card-inner team-card-compact relative h-full overflow-hidden rounded-[4px] flex flex-col' : 'team-card-inner relative h-full overflow-hidden rounded-[4px] flex flex-col'}
        style={{
          containerType: 'inline-size',
          padding: compact ? 'clamp(9px, 0.8vw, 11px)' : facultyCompact ? 'clamp(9px, 0.8vw, 11px)' : 'clamp(12px, 1.2vw, 16px)',


          background: '#0a0a0a',
          border: isActive ? '1px solid rgba(79,174,243,0.45)' : `1px solid rgba(255,255,255,${compact ? 0.055 : 0.08})`,
          boxShadow: isActive ? '0 0 20px rgba(79,174,243,0.13)' : 'none',
          transform: isActive ? `translateY(${compact ? '-4px' : '-6px'})` : 'translateY(0)',
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
            opacity: compact && !isActive ? 0.58 : 1,
            transition: 'opacity 0.3s ease',
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
              width: isSmall ? 10 : 14, height: isSmall ? 10 : 14,
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
aspectRatio: compact || facultyCompact ? '1/1' : '4/5',
            marginBottom: compact ? '10px' : facultyCompact ? '9px' : '16px',
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
                opacity: 0.85,
                transition: 'opacity 0.6s ease',
              }}
            />
          </div>

          {/* ROBOT — shown on hover: large, fills card */}
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
                transform: isActive ? 'scale(1.0)' : 'scale(1.08)',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>

        </div>

        {/* Name & role */}
        <div className="relative z-30 mt-auto flex flex-col items-center w-full">
          <h3
            className="team-name text-center font-sans font-black uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full"
            style={{
              margin: '0 0 4px',
              fontSize: compact ? 'clamp(9px, 8cqw, 12px)' : facultyCompact ? 'clamp(7.5px, 6.5cqw, 11px)' : 'clamp(10px, 9cqw, 15px)',
              letterSpacing: compact ? '0.04em' : facultyCompact ? '0.01em' : '0.05em',
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
              margin: compact ? '0 0 6px' : facultyCompact ? '0 0 6px' : '0 0 8px',
              fontSize: compact ? 'clamp(6.5px, 0.5vw, 8px)' : facultyCompact ? 'clamp(6.5px, 0.5vw, 8px)' : 'clamp(8px, 0.65vw, 10px)',
              letterSpacing: compact ? '0.08em' : facultyCompact ? '0.08em' : '0.1em',
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
  compact = false,
  facultyCompact = false,
  balanced = false,
}: {
  people: PersonData[];
  columns: string;
  interactive?: boolean;
  compact?: boolean;
  facultyCompact?: boolean;
  balanced?: boolean;
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
    <div ref={ref} className={`w-full ${balanced ? 'team-grid-balanced' : `grid ${columns}`} ${compact ? 'gap-2.5 md:gap-4' : 'gap-3 md:gap-6'}`}>
      {people.map((person) => (
        <ProfileCard
          key={person.id}
          person={person}
          revealed={triggered}
          interactive={interactive}
          compact={compact}
          facultyCompact={facultyCompact}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  accent,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`rv-section-header ${align === 'left' ? 'sm:items-start sm:text-left' : ''} mb-8 md:mb-10`}>
      <span className="rv-section-kicker sm:text-[10px]">
        {eyebrow}
      </span>
      <h2 className="rv-section-title" style={{ '--rv-section-title-desktop': 'clamp(30px, 4.4vw, 58px)' } as React.CSSProperties}>
        {title}{accent ? ' ' : ''}
        {accent && <span style={{ color: '#4FAEF3' }}>{accent}</span>}
      </h2>
      <div className="rv-section-rule" />
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN EXPORT
// ----------------------------------------------------------------------
export default function TeamRoster({ id = 'command-structure' }: { id?: string }) {
  return (
    <section id={id} className="relative w-full min-h-screen py-20 md:py-28 bg-[#0d0d0d] overflow-hidden">
      <EventsBackground />

      {/* Top Left Label */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20 pointer-events-none">
        <span className="rv-section-log">
          <span className="rv-section-log-number">09.</span>
          SYSTEM.LOGS // CLUB_COMMITTEE
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* ── FACULTY SECTION ── */}
        <div id="team-faculty" className="w-full max-w-4xl scroll-mt-28 flex flex-col items-center mb-14 md:mb-24">

          <SectionTitle
            eyebrow="▶ ACCESS_LEVEL // FACULTY_ADVISORS"
            title="FACULTY"
            accent="ADVISORS"
          />

          <RevealGrid
            people={FACULTY}
            columns="team-grid-faculty grid-cols-2 lg:grid-cols-4"
            interactive={false}
            facultyCompact
          />
        </div>

        {/* ── BOARD SECTION ── */}
        <div id="team-board" className="w-full max-w-7xl scroll-mt-28 flex flex-col items-center mb-14 md:mb-24">
          <SectionTitle
            eyebrow="▶ ACCESS_LEVEL // BOARD"
            title="BOARD"
          />

          <RevealGrid
            people={BOARD}
            columns=""
            compact
            balanced
          />
        </div>

        {/* ── SENIOR BOARD SECTION ── */}
        <div id="team-senior-board" className="w-full max-w-7xl scroll-mt-28 flex flex-col items-center">
          <SectionTitle
            eyebrow="▶ ACCESS_LEVEL // SENIOR_CORE"
            title="SENIOR"
            accent="CORE"
          />

          <RevealGrid
            people={SENIOR_BOARD}
            columns=""
            compact
            balanced
          />
        </div>

      </div>
      <style jsx>{`
        :global(.team-grid-balanced) {
          display: flex;
          gap: 12px;
          margin-left: -16px;
          margin-right: -16px;
          overflow-x: auto;
          padding: 0 42px 10px 16px;
          scroll-padding-left: 16px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        :global(.team-grid-balanced::-webkit-scrollbar) {
          display: none;
        }
          :global(.team-grid-faculty) {
          max-width: min(100%, 640px);
          margin-left: auto;
          margin-right: auto;
          justify-items: center;
        }
        :global(.team-grid-faculty > *) {
          width: 100%;
          max-width: 340px;
        }
        :global(.team-grid-balanced > *) {
          flex: 0 0 clamp(142px, 42vw, 164px);
          scroll-snap-align: start;
        }
        @media (min-width: 768px) {
          :global(.team-grid-faculty) {
            max-width: min(100%, 840px);
          }
          :global(.team-grid-balanced) {
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            margin-left: 0;
            margin-right: 0;
            overflow: visible;
            padding: 0;
            scroll-snap-type: none;
          }
          :global(.team-grid-balanced > *) {
            flex: initial;
            scroll-snap-align: none;
          }
          :global(.team-grid-balanced > :nth-last-child(3):nth-child(5n + 1)) {
            grid-column-start: 2;
          }
          :global(.team-grid-balanced > :nth-last-child(2):nth-child(5n + 1)) {
            grid-column-start: 2;
          }
          :global(.team-grid-balanced > :nth-last-child(1):nth-child(5n + 1)) {
            grid-column-start: 3;
          }
        }
        @media (min-width: 1024px) {
          :global(.team-grid-faculty) {
            max-width: min(100%, 980px);
          }
          :global(.team-grid-balanced) {
            grid-template-columns: repeat(10, minmax(0, 1fr));
            max-width: 1040px;
            margin-left: auto;
            margin-right: auto;
          }
          :global(.team-grid-balanced > *) {
            grid-column: span 2;
          }
          :global(.team-grid-balanced > :nth-last-child(4):nth-child(5n + 1)) {
            grid-column: 2 / span 2;
          }
          :global(.team-grid-balanced > :nth-last-child(3):nth-child(5n + 1)) {
            grid-column: 3 / span 2;
          }
          :global(.team-grid-balanced > :nth-last-child(2):nth-child(5n + 1)) {
            grid-column: 4 / span 2;
          }
          :global(.team-grid-balanced > :nth-last-child(1):nth-child(5n + 1)) {
            grid-column: 5 / span 2;
          }
        }
        @media (max-width: 640px) {
          :global(.team-card-inner) {
            padding: 10px !important;
            min-height: 214px;
            container-type: inline-size;
          }
          :global(.team-image) {
            aspect-ratio: 1 / 1 !important;
            margin-bottom: 10px !important;
          }
          :global(.team-name) {
            font-size: clamp(7.5px, 7.5cqw, 10.5px) !important;
            letter-spacing: 0.02em !important;
            line-height: 1.2 !important;
            margin-bottom: 4px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            width: 100% !important;
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
