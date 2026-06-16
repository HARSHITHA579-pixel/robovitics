'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DOMAINS = [
  {
    id: '01',
    title: 'ELECTRICAL',
    sub: 'Circuits & Power',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="21,2 9,19 17,19 15,34 27,17 19,17"
          fill="none" stroke="rgba(30,30,30,0.9)" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'MECHANICAL',
    sub: 'Design & Fabrication',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" stroke="rgba(30,30,30,0.9)" strokeWidth="1.8"/>
        <circle cx="18" cy="18" r="2.5" fill="rgba(30,30,30,0.5)"/>
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const r = deg*Math.PI/180;
          const x1 = 18+7*Math.cos(r), y1 = 18+7*Math.sin(r);
          const x2 = 18+11*Math.cos(r), y2 = 18+11*Math.sin(r);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(30,30,30,0.9)" strokeWidth="2.4" strokeLinecap="square"/>;
        })}
      </svg>
    ),
  },
  {
    id: '03',
    title: 'ML & AI',
    sub: 'Machine Learning',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {[8,18,28].map((y,i)=><circle key={i} cx="8" cy={y} r="2.2" stroke="rgba(30,30,30,0.9)" strokeWidth="1.5"/>)}
        {[11,21,31].map((y,i)=><circle key={i} cx="18" cy={y} r="2.2" stroke="rgba(30,30,30,0.9)" strokeWidth="1.5"/>)}
        {[14,26].map((y,i)=><circle key={i} cx="28" cy={y} r="2.2" stroke="rgba(30,30,30,0.9)" strokeWidth="1.5"/>)}
        {[8,18,28].flatMap((y1)=>[11,21,31].map((y2,j)=>(
          <line key={`${y1}-${j}`} x1="10" y1={y1} x2="16" y2={y2} stroke="rgba(30,30,30,0.25)" strokeWidth="0.9"/>
        )))}
        {[11,21,31].flatMap((y1)=>[14,26].map((y2,j)=>(
          <line key={`${y1}-${j}`} x1="20" y1={y1} x2="26" y2={y2} stroke="rgba(30,30,30,0.25)" strokeWidth="0.9"/>
        )))}
      </svg>
    ),
  },
  {
    id: '04',
    title: 'CYBERSECURITY',
    sub: 'Systems & Defense',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 3L30 8L30 18C30 25 24 31 18 33C12 31 6 25 6 18L6 8Z"
          stroke="rgba(30,30,30,0.9)" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <path d="M12 18L16 22L24 14" stroke="rgba(30,30,30,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: '05',
    title: 'WEB DEV',
    sub: 'Frontend & Backend',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="5" width="30" height="26" rx="2" stroke="rgba(30,30,30,0.9)" strokeWidth="1.8"/>
        <line x1="3" y1="12" x2="33" y2="12" stroke="rgba(30,30,30,0.6)" strokeWidth="1.2"/>
        <circle cx="8" cy="8.5" r="1.4" fill="rgba(30,30,30,0.5)"/>
        <circle cx="13" cy="8.5" r="1.4" fill="rgba(30,30,30,0.5)"/>
        <line x1="7" y1="18" x2="29" y2="18" stroke="rgba(30,30,30,0.3)" strokeWidth="1.2"/>
        <line x1="7" y1="22" x2="24" y2="22" stroke="rgba(30,30,30,0.3)" strokeWidth="1.2"/>
        <line x1="7" y1="26" x2="20" y2="26" stroke="rgba(30,30,30,0.3)" strokeWidth="1.2"/>
        <rect x="10" y="33" width="16" height="3" rx="1" stroke="rgba(30,30,30,0.5)" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: '06',
    title: 'APP DEV',
    sub: 'Mobile & Cross-Platform',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="11" y="2" width="14" height="32" rx="2.5" stroke="rgba(30,30,30,0.9)" strokeWidth="1.8"/>
        <line x1="11" y1="7" x2="25" y2="7" stroke="rgba(30,30,30,0.45)" strokeWidth="1"/>
        <line x1="11" y1="29" x2="25" y2="29" stroke="rgba(30,30,30,0.45)" strokeWidth="1"/>
        <circle cx="18" cy="32" r="1.2" fill="rgba(30,30,30,0.5)"/>
        <rect x="15" y="4" width="6" height="1.5" rx="0.75" fill="rgba(30,30,30,0.35)"/>
        <rect x="14" y="12" width="8" height="7" rx="1" stroke="rgba(30,30,30,0.4)" strokeWidth="1"/>
        <line x1="14" y1="23" x2="22" y2="23" stroke="rgba(30,30,30,0.3)" strokeWidth="1"/>
        <line x1="14" y1="26" x2="20" y2="26" stroke="rgba(30,30,30,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
];

// Screw SVG — used in all 4 corners
function Screw() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="4" fill="#b0a898" stroke="#7a6f62" strokeWidth="0.8"/>
      <circle cx="5" cy="5" r="2.2" fill="none" stroke="#7a6f62" strokeWidth="0.6"/>
      {/* Phillips head */}
      <line x1="5" y1="2.8" x2="5" y2="7.2" stroke="#6a5f53" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="2.8" y1="5" x2="7.2" y2="5" stroke="#6a5f53" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  );
}

function DomainCard({
  domain,
  addToRefs,
}: {
  domain: (typeof DOMAINS)[0];
  addToRefs: (el: HTMLDivElement | null) => void;
}) {
  const { id, title, sub, icon } = domain;

  return (
    <div
      ref={addToRefs}
      className="absolute"
      style={{ width: '15vw', minWidth: '170px', maxWidth: '224px' }}
    >
      {/* Drop shadow for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: 'translate(4px, 5px)',
        background: 'rgba(0,0,0,0.55)',
        borderRadius: '6px',
        filter: 'blur(6px)',
      }}/>

      {/* Metal plate */}
      <div style={{
        position: 'relative',
        borderRadius: '5px',
        padding: '14px 14px 16px',
        /* Brushed metal: layered gradients */
        background: `
          repeating-linear-gradient(
            92deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.025) 2px,
            rgba(255,255,255,0.025) 4px
          ),
          linear-gradient(
            175deg,
            #d4cfc8 0%,
            #bfb9b0 18%,
            #cdc8c0 35%,
            #b8b2a8 52%,
            #c8c2ba 68%,
            #b0aaa0 85%,
            #c2bdb4 100%
          )
        `,
        border: '1.5px solid #8a847a',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.2)',
        overflow: 'visible',
      }}>

        {/* Screws — absolute positioned at each corner */}
        <span style={{ position: 'absolute', top: '5px', left: '6px' }}><Screw/></span>
        <span style={{ position: 'absolute', top: '5px', right: '6px' }}><Screw/></span>
        <span style={{ position: 'absolute', bottom: '5px', left: '6px' }}><Screw/></span>
        <span style={{ position: 'absolute', bottom: '5px', right: '6px' }}><Screw/></span>

        {/* Engraved top label */}
        <div style={{
          textAlign: 'center',
          marginBottom: '10px',
          marginTop: '4px',
        }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '7px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            /* Engraved: dark shadow above, light below */
            color: 'rgba(60,54,46,0.5)',
            textShadow: '-0.5px -0.5px 0 rgba(255,255,255,0.6), 0.5px 0.5px 1px rgba(0,0,0,0.35)',
          }}>
            MODULE_{id}
          </span>
        </div>

        {/* Recessed icon panel */}
        <div style={{
          margin: '0 auto 12px',
          width: '68px',
          height: '68px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #a8a39a 0%, #c0bbb2 50%, #b0aa9f 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.3)',
          border: '1px solid rgba(90,84,76,0.4)',
        }}>
          {icon}
        </div>

        {/* Engraved horizontal rule */}
        <div style={{
          height: '1px',
          margin: '0 8px 10px',
          background: 'linear-gradient(90deg, transparent, rgba(80,70,60,0.35) 30%, rgba(80,70,60,0.35) 70%, transparent)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.5)',
        }}/>

        {/* Title — engraved */}
        <div style={{ textAlign: 'center', padding: '0 8px' }}>
          <h3 style={{
            margin: '0 0 4px',
            fontFamily: '"Inter", "Arial Black", sans-serif',
            fontWeight: '900',
            fontSize: 'clamp(11px, 1vw, 14px)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(40,34,28,0.75)',
            textShadow: '-0.5px -0.5px 0 rgba(255,255,255,0.7), 1px 1px 2px rgba(0,0,0,0.4)',
            lineHeight: 1.1,
          }}>
            {title}
          </h3>
          <p style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '7px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(60,54,46,0.55)',
            textShadow: '-0.3px -0.3px 0 rgba(255,255,255,0.55), 0.5px 0.5px 1px rgba(0,0,0,0.3)',
          }}>
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Domains() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const sectionLabelRef = useRef<HTMLDivElement>(null);
  cardsRef.current = [];

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, {
        x: '0vw', y: '0vh', scale: 0.82,
        rotationY: 0, opacity: 1, transformPerspective: 1000,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=4500',
          scrub: 1.2,
          pin: true,
        },
      });

      tl.to(cardsRef.current, {
        x: (i) => ['-25vw', '-15vw', '-5vw', '5vw', '15vw', '25vw'][i],
        y: (i) => ['12vh', '-10vh', '8vh', '-8vh', '10vh', '-12vh'][i],
        rotation: (i) => [-7, -4, -1, 1, 4, 7][i],
        rotationY: (i) => [-20, -12, -4, 4, 12, 20][i],
        scale: 0.85,
        duration: 1.2,
        ease: 'power2.out',
      });

      tl.to(cardsRef.current, {
        rotationY: 0,
        duration: 0.4,
        ease: 'power1.out',
      });

      tl.to(cardsRef.current, {
        x: (i) => ['-38.75vw', '-23.25vw', '-7.75vw', '7.75vw', '23.25vw', '38.75vw'][i],
        y: '0vh',
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      tl.to(
        [headingRef.current, eyebrowRef.current, sectionLabelRef.current],
        { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' },
        '<0.3'
      );

      tl.to(cardsRef.current, {
        x: (i) => ['-160vw', '-96vw', '-32vw', '32vw', '96vw', '160vw'][i],
        y: (i) => ['-12vh', '8vh', '-6vh', '6vh', '-8vh', '12vh'][i],
        rotationY: (i) => [-40, -24, -8, 8, 24, 40][i],
        scale: 3,
        opacity: (i) => (i === 2 || i === 3 ? 0 : 1),
        duration: 1.5,
        ease: 'power2.in',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="domains"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}/>

      {/* Section label */}
      <div ref={sectionLabelRef} className="absolute z-20 pointer-events-none" style={{ top: '10%', left: '6%' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
          <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>02.</span>
          SYSTEM.LOGS // DOMAINS
        </span>
      </div>

      {/* Heading */}
      <div className="absolute z-20 flex flex-col items-center pointer-events-none"
        style={{ top: '18%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
        <span ref={eyebrowRef} style={{
          fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
          fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase',
        }}>
          ▶ SECTOR_MAP // DOMAINS
        </span>
        <h2 ref={headingRef} style={{
          margin: 0, fontSize: 'clamp(32px,4.5vw,72px)', fontWeight: '900',
          color: '#ffffff', letterSpacing: '-0.01em',
          fontFamily: '"Inter", "Arial Black", sans-serif',
          textTransform: 'uppercase', lineHeight: 1, textAlign: 'center',
        }}>
          DOMAINS AT{' '}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 900 }}>ROBOVITICS.</span>
        </h2>
        <div style={{
          marginTop: '14px', width: '50%', height: '1px',
          background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
        }}/>
      </div>

      {/* Cards */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        {DOMAINS.map((domain) => (
          <DomainCard key={domain.id} domain={domain} addToRefs={addToRefs} />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <span style={{ fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.1)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          SCROLL TO DEPLOY ↓
        </span>
      </div>
    </section>
  );
}