'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- MORPHIC DOT GRID BACKGROUND ---
const ICONS = [
  <svg key="plus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  <svg key="cross" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  <svg key="chip" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="4" ry="4"></rect></svg>,
  <svg key="bracket" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  <svg key="node" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"></circle></svg>
];

function MorphicBackground() {
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number; icon: React.ReactNode; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generatedNodes = Array.from({ length: 35 }).map((_, i) => {
      const x = Math.floor(Math.random() * 100) * 40;
      const y = Math.floor(Math.random() * 100) * 40;
      return {
        id: i,
        x,
        y,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      };
    });
    setNodes(generatedNodes);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 1) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0'
        }}
      />
      <div className="absolute inset-0 text-[rgba(255,255,255,0.25)]">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute flex items-center justify-center will-change-transform"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              width: '40px',
              height: '40px',
              transform: 'translate(-50%, -50%)',
              animation: `morphicPulse ${node.duration}s ease-in-out ${node.delay}s infinite`,
              opacity: 0,
            }}
          >
            {node.icon}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes morphicPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          90% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
        }
      `}} />
    </div>
  );
}

const DOMAINS = [
  {
    id: '01',
    title: 'ELECTRICAL',
    sub: 'Circuits & Power',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon
          points="21,2 9,19 17,19 15,34 27,17 19,17"
          fill="none"
          stroke="rgba(235,238,242,0.86)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'MECHANICAL',
    sub: 'Design & Fabrication',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" stroke="rgba(235,238,242,0.86)" strokeWidth="1.8" />
        <circle cx="18" cy="18" r="2.5" fill="rgba(235,238,242,0.45)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          const x1 = 18 + 7 * Math.cos(r), y1 = 18 + 7 * Math.sin(r);
          const x2 = 18 + 11 * Math.cos(r), y2 = 18 + 11 * Math.sin(r);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(235,238,242,0.86)" strokeWidth="2.4" strokeLinecap="square" />
          );
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
        {[8, 18, 28].map((y, i) => (
          <circle key={i} cx="8" cy={y} r="2.2" stroke="rgba(235,238,242,0.86)" strokeWidth="1.5" />
        ))}
        {[11, 21, 31].map((y, i) => (
          <circle key={i} cx="18" cy={y} r="2.2" stroke="rgba(235,238,242,0.86)" strokeWidth="1.5" />
        ))}
        {[14, 26].map((y, i) => (
          <circle key={i} cx="28" cy={y} r="2.2" stroke="rgba(235,238,242,0.86)" strokeWidth="1.5" />
        ))}
        {[8, 18, 28].flatMap((y1) =>
          [11, 21, 31].map((y2, j) => (
            <line key={`${y1}-${j}`} x1="10" y1={y1} x2="16" y2={y2}
              stroke="rgba(235,238,242,0.28)" strokeWidth="0.9" />
          ))
        )}
        {[11, 21, 31].flatMap((y1) =>
          [14, 26].map((y2, j) => (
            <line key={`${y1}-${j}`} x1="20" y1={y1} x2="26" y2={y2}
              stroke="rgba(235,238,242,0.28)" strokeWidth="0.9" />
          ))
        )}
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
          stroke="rgba(235,238,242,0.86)" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <path d="M12 18L16 22L24 14"
          stroke="rgba(235,238,242,0.86)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'WEB DEV',
    sub: 'Frontend & Backend',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="5" width="30" height="26" rx="2" stroke="rgba(235,238,242,0.86)" strokeWidth="1.8" />
        <line x1="3" y1="12" x2="33" y2="12" stroke="rgba(235,238,242,0.5)" strokeWidth="1.2" />
        <circle cx="8" cy="8.5" r="1.4" fill="rgba(235,238,242,0.45)" />
        <circle cx="13" cy="8.5" r="1.4" fill="rgba(235,238,242,0.45)" />
        <line x1="7" y1="18" x2="29" y2="18" stroke="rgba(235,238,242,0.25)" strokeWidth="1.2" />
        <line x1="7" y1="22" x2="24" y2="22" stroke="rgba(235,238,242,0.25)" strokeWidth="1.2" />
        <line x1="7" y1="26" x2="20" y2="26" stroke="rgba(235,238,242,0.25)" strokeWidth="1.2" />
        <rect x="10" y="33" width="16" height="3" rx="1" stroke="rgba(235,238,242,0.45)" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: '06',
    title: 'APP DEV',
    sub: 'Mobile & Cross-Platform',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="11" y="2" width="14" height="32" rx="2.5" stroke="rgba(235,238,242,0.86)" strokeWidth="1.8" />
        <line x1="11" y1="7" x2="25" y2="7" stroke="rgba(235,238,242,0.42)" strokeWidth="1" />
        <line x1="11" y1="29" x2="25" y2="29" stroke="rgba(235,238,242,0.42)" strokeWidth="1" />
        <circle cx="18" cy="32" r="1.2" fill="rgba(235,238,242,0.45)" />
        <rect x="15" y="4" width="6" height="1.5" rx="0.75" fill="rgba(235,238,242,0.35)" />
        <rect x="14" y="12" width="8" height="7" rx="1" stroke="rgba(235,238,242,0.35)" strokeWidth="1" />
        <line x1="14" y1="23" x2="22" y2="23" stroke="rgba(235,238,242,0.25)" strokeWidth="1" />
        <line x1="14" y1="26" x2="20" y2="26" stroke="rgba(235,238,242,0.25)" strokeWidth="1" />
      </svg>
    ),
  },
];

function Screw() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="3.7" fill="#070809" stroke="rgba(235,238,242,0.34)" strokeWidth="0.8" />
      <circle cx="5" cy="5" r="1.5" fill="rgba(235,238,242,0.28)" />
      <line x1="2.7" y1="5" x2="7.3" y2="5"
        stroke="rgba(235,238,242,0.5)" strokeWidth="0.8" strokeLinecap="square" />
    </svg>
  );
}

function CardInner({ domain }: { domain: (typeof DOMAINS)[0] }) {
  const { id, title, sub, icon } = domain;
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0,
        transform: 'translate(8px, 10px)',
        background: 'rgba(0,0,0,0.62)',
        borderRadius: '4px',
        filter: 'blur(10px)',
      }} />
      <div style={{
        position: 'relative',
        borderRadius: '4px',
        padding: 'clamp(10px, 1.1vw, 13px) clamp(10px, 1.15vw, 14px) clamp(11px, 1.2vw, 15px)',
        background: `
          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(165deg, rgba(255,255,255,0.09), rgba(255,255,255,0.012) 38%, rgba(0,0,0,0.28)),
          rgba(6,8,10,0.88)
        `,
        backgroundSize: '18px 18px, 18px 18px, auto, auto',
        border: '1px solid rgba(235,238,242,0.22)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.75)',
        overflow: 'visible',
        color: '#f1f3f5',
      }}>
        <span style={{ position: 'absolute', top: '5px', left: '6px' }}><Screw /></span>
        <span style={{ position: 'absolute', top: '5px', right: '6px' }}><Screw /></span>
        <span style={{ position: 'absolute', bottom: '5px', left: '6px' }}><Screw /></span>
        <span style={{ position: 'absolute', bottom: '5px', right: '6px' }}><Screw /></span>
        <span style={{ position: 'absolute', top: '-1px', left: '18px', width: '36px', height: '1px', background: 'rgba(255,255,255,0.65)' }} />
        <span style={{ position: 'absolute', bottom: '-1px', right: '18px', width: '36px', height: '1px', background: 'rgba(255,255,255,0.45)' }} />
        <div style={{ textAlign: 'center', marginBottom: '10px', marginTop: '4px' }}>
          <span style={{
            fontFamily: 'monospace', fontSize: '7px', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(235,238,242,0.34)',
            textShadow: '0 0 10px rgba(180,205,255,0.14)',
          }}>
            MODULE_{id}
          </span>
        </div>
        <div style={{
          margin: '0 auto 12px',
          width: 'clamp(46px, 5.4vw, 68px)',
          height: 'clamp(46px, 5.4vw, 68px)',
          borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))',
          boxShadow: 'inset 0 0 22px rgba(255,255,255,0.035), inset 0 0 0 1px rgba(255,255,255,0.04)',
          border: '1px solid rgba(235,238,242,0.18)',
        }}>
          {icon}
        </div>
        <div style={{
          height: '1px', margin: '0 8px 10px',
          background: 'linear-gradient(90deg, transparent, rgba(235,238,242,0.42) 30%, rgba(235,238,242,0.42) 70%, transparent)',
          boxShadow: '0 0 10px rgba(180,205,255,0.16)',
        }} />
        <div style={{ textAlign: 'center', padding: '0 8px' }}>
          <h3 style={{
            margin: '0 0 4px',
            fontFamily: '"Inter", "Arial Black", sans-serif',
            fontWeight: '900',
            fontSize: 'clamp(11px, 1vw, 14px)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(245,247,250,0.9)',
            textShadow: '0 0 16px rgba(255,255,255,0.18)',
            lineHeight: 1.1,
          }}>
            {title}
          </h3>
          <p style={{
            margin: 0, fontFamily: 'monospace',
            fontSize: 'clamp(7px, 0.55vw, 7px)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(168,176,188,0.62)',
            textShadow: '0 0 10px rgba(180,205,255,0.12)',
          }}>
            {sub}
          </p>
        </div>
      </div>
    </>
  );
}

function DomainCardDesktop({
  domain,
  index,
  addToRefs,
}: {
  domain: (typeof DOMAINS)[0];
  index: number;
  addToRefs: (el: HTMLDivElement | null, index: number) => void;
}) {
  return (
    <div
      ref={(el) => addToRefs(el, index)}
      data-domain-card={domain.id}
      className="absolute"
      style={{
        width: 'clamp(108px, 15vw, 224px)',
        willChange: 'transform, opacity',
      }}
    >
      <CardInner domain={domain} />
    </div>
  );
}

function DomainCardMobile({ domain }: { domain: (typeof DOMAINS)[0] }) {
  return (
    <div className="relative w-full max-w-[240px] mx-auto mb-8 z-10">
      <CardInner domain={domain} />
    </div>
  );
}

const BRIDGE_TEXT = "WE DON'T JUST STUDY THESE DOMAINS. WE SOLDER THE CIRCUITS, WRITE THE ALGORITHMS, AND MACHINE THE PARTS. AWAITING EVENT DEPLOYMENT...";

function HUDTextBridge() {
  const words = BRIDGE_TEXT.split(' ');
  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center p-6 md:p-12 hidden md:flex" style={{ perspective: '1200px' }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="bridge-terminal-header block mb-6 font-mono text-[10px] tracking-[0.35em] text-[rgba(255,255,255,0.3)] uppercase opacity-0">
          &gt; SYSTEM_LOGS // PROTOCOL_OVERRIDE
        </span>
        <p style={{ transformStyle: 'preserve-3d' }} className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-3">
          {words.map((word, i) => (
            <span
              key={i}
              className="bridge-word inline-block"
              style={{
                fontFamily: '"Inter", "Arial Black", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(20px, 4vw, 42px)',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 0 15px rgba(255,255,255,0.2)',
                willChange: 'transform, opacity',
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </p>
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

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const patternX = ['-30vw', '-18vw', '-6vw', '6vw', '18vw', '30vw'];
        const patternY = ['18vh', '-9vh', '18vh', '-9vh', '18vh', '-9vh'];
        const lineXValues = [-38, -22.8, -7.6, 7.6, 22.8, 38];
        const lineX = lineXValues.map(v => `${v}vw`);
        const lineScale = 0.82;

        const wordElements = gsap.utils.toArray<Element>('.bridge-word');

        // FIX: Pre-compute all random values into static arrays ONCE.
        // Using () => gsap.utils.random() as function values causes GSAP to
        // re-invoke the randomizer on every scrub tick, making elements jump.
        const wordCount = wordElements.length;
        const randZ         = Array.from({ length: wordCount }, () => gsap.utils.random(-800, 1000));
        const randX         = Array.from({ length: wordCount }, () => gsap.utils.random(-400, 400));
        const randY         = Array.from({ length: wordCount }, () => gsap.utils.random(-400, 400));
        const randRotX      = Array.from({ length: wordCount }, () => gsap.utils.random(-90, 90));
        const randRotY      = Array.from({ length: wordCount }, () => gsap.utils.random(-90, 90));
        const randRotZ      = Array.from({ length: wordCount }, () => gsap.utils.random(-45, 45));

        gsap.set(wordElements, {
          opacity: 0,
          z: (i) => randZ[i],
          x: (i) => randX[i],
          y: (i) => randY[i],
          rotationX: (i) => randRotX[i],
          rotationY: (i) => randRotY[i],
          rotationZ: (i) => randRotZ[i],
        });

        gsap.set(cardsRef.current, {
          x: 0, y: '7vh', scale: 0.58,
          opacity: 0, rotation: 0,
          force3D: true, transformOrigin: 'center center',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=5000',
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });

        tl.to(cardsRef.current, {
          opacity: 1, scale: 0.78, y: '6vh',
          duration: 0.4, stagger: 0.02,
          ease: 'power2.out', force3D: true,
        });

        tl.to(cardsRef.current, {
          x: (i) => patternX[i],
          y: (i) => patternY[i],
          scale: 0.95, duration: 0.9,
          ease: 'power2.inOut', force3D: true,
        });

        tl.to(cardsRef.current, {
          x: (i) => lineX[i],
          y: '12vh', scale: lineScale,
          duration: 0.9,
          ease: 'power2.inOut', force3D: true,
        });

        const peakScale = 1.2;
        const peakX = lineXValues.map(v => `${v * (peakScale / lineScale)}vw`);

        tl.to(cardsRef.current, {
          scale: peakScale,
          x: (i) => peakX[i],
          y: '12vh', duration: 0.7,
          ease: 'power2.out', force3D: true,
        });

        tl.to(
          [headingRef.current, eyebrowRef.current, sectionLabelRef.current],
          { opacity: 0, y: -30, duration: 0.6, ease: 'power2.inOut' },
          '<'
        );

        tl.to(cardsRef.current, {
          x: (i) => {
            if (i < 3) return `${-120 - ((2 - i) * 60)}vw`;
            else return `${120 + ((i - 3) * 60)}vw`;
          },
          scale: 5,
          duration: 1.8,
          ease: 'power2.inOut',
          force3D: true,
        });

        tl.to('.bridge-terminal-header', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=1.2');

        tl.to(wordElements, {
          opacity: 1, z: 0, x: 0, y: 0, rotationX: 0, rotationY: 0, rotationZ: 0,
          duration: 2.0,
          stagger: { each: 0.04, from: 'random' },
          ease: 'power3.out', force3D: true
        }, '<');

        tl.to({}, { duration: 1.0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* MOBILE LAYOUT */}
      <section
        id="domains-mobile"
        className="relative w-full min-h-screen py-24 px-6 flex flex-col md:hidden bg-transparent"
      >
        <MorphicBackground />
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <span style={{
            fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>02.</span>
            SYSTEM.LOGS // DOMAINS
          </span>
        </div>
        <div className="z-20 flex flex-col items-center pointer-events-none text-center mt-12 mb-16">
          <span style={{
            fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase',
          }}>
            ▶ SECTOR_MAP // DOMAINS
          </span>
          <h2 style={{
            margin: 0, fontSize: 'clamp(32px,10vw,48px)', fontWeight: '900',
            color: '#ffffff', letterSpacing: '-0.01em',
            fontFamily: '"Inter", "Arial Black", sans-serif',
            textTransform: 'uppercase', lineHeight: 1,
          }}>
            DOMAINS AT <br/>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 900 }}>ROBOVITICS.</span>
          </h2>
          <div style={{
            marginTop: '14px', width: '80%', height: '1px',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
          }} />
        </div>
        <div className="w-full flex flex-col justify-center">
          {DOMAINS.map((domain) => (
            <DomainCardMobile key={`mobile-${domain.id}`} domain={domain} />
          ))}
        </div>
      </section>

      {/* DESKTOP LAYOUT */}
      <section
        id="domains"
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden hidden md:flex items-center justify-center bg-transparent"
      >
        <MorphicBackground />
        <HUDTextBridge />
        <div ref={sectionLabelRef} className="absolute z-20 pointer-events-none" style={{ top: '10%', left: '6%' }}>
          <span style={{
            fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>02.</span>
            SYSTEM.LOGS // DOMAINS
          </span>
        </div>
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
          }} />
        </div>
        <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
          {DOMAINS.map((domain, index) => (
            <DomainCardDesktop key={`desktop-${domain.id}`} domain={domain} index={index} addToRefs={addToRefs} />
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <span style={{
            fontSize: '8px', letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.1)', fontFamily: 'monospace', textTransform: 'uppercase',
          }}>
            SCROLL TO DEPLOY ↓
          </span>
        </div>
      </section>
    </>
  );
}