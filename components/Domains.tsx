'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const DOMAINS = [
  {
    id: '01',
    title: 'ELECTRICAL',
    sub: 'Circuits & Power',
    icon: (
      <img src="/electrical.svg" alt="Electrical" width={36} height={36} className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(79,174,243,0.6)]" />
    ),
  },
  {
    id: '02',
    title: 'MECHANICAL',
    sub: 'Design & Fabrication',
    icon: (
      <img src="/mech.svg" alt="Mechanical" width={36} height={36} className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(79,174,243,0.6)]" />
    ),
  },
  {
    id: '03',
    title: 'ML & AI',
    sub: 'Machine Learning',
    icon: (
      <img src="/aiml.svg" alt="ML & AI" width={36} height={36} className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(79,174,243,0.6)]" />
    ),
  },
  {
    id: '04',
    title: 'CYBERSECURITY',
    sub: 'Systems & Defense',
    icon: (
      <img src="/cybersec.svg" alt="Cybersecurity" width={36} height={36} className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(79,174,243,0.6)]" />
    ),
  },
  {
    id: '05',
    title: 'WEB DEV',
    sub: 'Frontend & Backend',
    icon: (
      <img src="/webdev.svg" alt="Web Development" width={36} height={36} className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(79,174,243,0.6)]" />
    ),
  },
  {
    id: '06',
    title: 'APP DEV',
    sub: 'Mobile & Cross-Platform',
    icon: (
      <img src="/appdev.svg" alt="App Development" width={36} height={36} className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(79,174,243,0.6)]" />
    ),
  },
];

function CardInner({ domain, compact = false }: { domain: (typeof DOMAINS)[0]; compact?: boolean }) {
  const { title, sub, icon } = domain;
  return (
    <div className="group relative w-full h-full transition-transform duration-500 ease-out hover:-translate-y-2">
      <div
        className="relative h-full overflow-hidden rounded-[4px] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(79,174,243,0.18)]"
        style={{
          padding: compact
            ? '12px 8px 10px'
            : 'clamp(14px, 1.4vw, 18px) clamp(12px, 1.3vw, 16px) clamp(13px, 1.3vw, 17px)',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Styled background layer, identical treatment to Events cards */}
        <div
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            top: -1, right: -1, bottom: -1, left: -1,
            borderRadius: '4px',
            background: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)),
              rgba(28,30,34,0.95)
            `,
            backgroundSize: '18px 18px, 18px 18px, auto, auto',
            border: '1px solid rgba(235,238,242,0.28)',
          }}
        />

        {/* Cyan corner brackets, matching Events card styling */}
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ top: 6, left: 6, width: 14, height: 14, borderTop: '1.5px solid rgba(79,174,243,0.85)', borderLeft: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ top: 6, right: 6, width: 14, height: 14, borderTop: '1.5px solid rgba(79,174,243,0.85)', borderRight: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ bottom: 6, left: 6, width: 14, height: 14, borderBottom: '1.5px solid rgba(79,174,243,0.85)', borderLeft: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
        <span className="absolute z-10 pointer-events-none transition-all duration-500" style={{ bottom: 6, right: 6, width: 14, height: 14, borderBottom: '1.5px solid rgba(79,174,243,0.85)', borderRight: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />

        {/* Cyan top/bottom highlight lines, matching Events card styling */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <span style={{ position: 'absolute', top: '-1px', left: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.6)' }} />
          <span style={{ position: 'absolute', bottom: '-1px', right: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.35)' }} />
        </div>

        <div className="relative z-30 flex h-full flex-col items-center">
          <div style={{
            margin: compact ? '4px auto 10px' : '6px auto 14px',
            width: compact ? '42px' : 'clamp(46px, 5.4vw, 68px)',
            height: compact ? '42px' : 'clamp(46px, 5.4vw, 68px)',
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))',
            boxShadow: 'inset 0 0 22px rgba(255,255,255,0.035), inset 0 0 0 1px rgba(255,255,255,0.04)',
            border: '1px solid rgba(235,238,242,0.18)',
          }} className="transition-all duration-500 group-hover:border-[#4FAEF3]/30 group-hover:bg-[#4FAEF3]/[0.02] group-hover:shadow-[inset_0_0_22px_rgba(79,174,243,0.1)]">
            {icon}
          </div>

          <h3
            className="text-center font-sans font-black uppercase tracking-[0.06em] text-white transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
            style={{ margin: '0 0 6px', fontSize: compact ? '10px' : 'clamp(11px, 1vw, 14px)', lineHeight: 1.15 }}
          >
            {title}
          </h3>
          <p
            className="text-center font-mono uppercase tracking-[0.1em] transition-all duration-500"
            style={{ margin: compact ? '0 0 8px' : '0 0 10px', fontSize: compact ? '6.5px' : 'clamp(7px, 0.55vw, 9px)', color: 'rgba(79,174,243,0.85)' }}
          >
            {sub}
          </p>

          <div
            style={{
              height: '1px', margin: '0 6px 10px', width: 'calc(100% - 12px)',
              background: 'linear-gradient(90deg, transparent, rgba(79,174,243,0.4) 30%, rgba(79,174,243,0.4) 70%, transparent)',
              boxShadow: '0 0 10px rgba(79,174,243,0.2)',
            }}
          />
        </div>
      </div>
    </div>
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
    <div className="relative z-10 h-[148px] min-w-0">
      <CardInner domain={domain} compact />
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
  const titleGroupRef = useRef<HTMLDivElement>(null);
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
        const circleAngles = [150, 210, 90, -90, 30, -30];
        const circleRadiusX = 23;
        const circleRadiusY = 22;
        const circleX = circleAngles.map((angle) => `${Math.cos((angle * Math.PI) / 180) * circleRadiusX}vw`);
        const circleY = circleAngles.map((angle) => `${Math.sin((angle * Math.PI) / 180) * circleRadiusY + 4}vh`);
        const expandedCircleX = circleAngles.map((angle) => `${Math.cos((angle * Math.PI) / 180) * 38}vw`);
        const expandedCircleY = circleAngles.map((angle) => `${Math.sin((angle * Math.PI) / 180) * 34 + 4}vh`);
        const zoomX = circleAngles.map((angle) => `${Math.cos((angle * Math.PI) / 180) * 150}vw`);
        const zoomY = circleAngles.map((angle) => `${Math.sin((angle * Math.PI) / 180) * 130 + 4}vh`);

        const wordElements = gsap.utils.toArray<Element>('.bridge-word');

        const wordCount = wordElements.length;
        const randZ = Array.from({ length: wordCount }, () => gsap.utils.random(-800, 1000));
        const randX = Array.from({ length: wordCount }, () => gsap.utils.random(-400, 400));
        const randY = Array.from({ length: wordCount }, () => gsap.utils.random(-400, 400));
        const randRotX = Array.from({ length: wordCount }, () => gsap.utils.random(-90, 90));
        const randRotY = Array.from({ length: wordCount }, () => gsap.utils.random(-90, 90));
        const randRotZ = Array.from({ length: wordCount }, () => gsap.utils.random(-45, 45));

        gsap.set(wordElements, {
          opacity: 0,
          z: (i) => randZ[i],
          x: (i) => randX[i],
          y: (i) => randY[i],
          rotationX: (i) => randRotX[i],
          rotationY: (i) => randRotY[i],
          rotationZ: (i) => randRotZ[i],
        });

        // Initial setup for cards
        gsap.set(cardsRef.current, {
          x: 0, y: '7vh', scale: 0.58,
          opacity: 0, rotation: 0,
          force3D: true, transformOrigin: 'center center',
        });

        // Initial setup for title group
        gsap.set(titleGroupRef.current, {
          opacity: 0,
          scale: 0.58,
          y: '5vh',
          transformOrigin: 'center center',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=5000',
            scrub: 1.5,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const p = self.progress;
              let intensity = 0;
              if (p >= 0.35 && p < 0.65) {
                intensity = (p - 0.35) / 0.30;
              } else if (p >= 0.65 && p < 0.82) {
                intensity = 1 - ((p - 0.65) / 0.17);
              }
              cardsRef.current.forEach((card) => {
                if (!card) return;
                card.style.boxShadow = intensity > 0.01
                  ? `
                    0 0 ${intensity * 40}px rgba(255,255,255,${intensity * 0.12}),
                    0 0 ${intensity * 90}px rgba(255,255,255,${intensity * 0.07}),
                    0 0 ${intensity * 160}px rgba(200,220,255,${intensity * 0.05})
                  `
                  : '';
              });
            },
          },
        });

        // Cards fade in and scale up at the start of the scroll
        tl.to(cardsRef.current, {
          opacity: 1, scale: 0.78, y: '6vh',
          duration: 0.4,
          ease: 'power2.out', force3D: true,
        }, 0);

        // Title group scales up and fades in EXACTLY with the cards
        tl.to(titleGroupRef.current, {
          opacity: 1, scale: 1, y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);

        tl.to(cardsRef.current, {
          x: (i) => patternX[i],
          y: (i) => patternY[i],
          scale: 0.95, duration: 0.9,
          ease: 'power2.inOut', force3D: true,
        });

        // Fade the title as soon as the cards start forming the circle.
        tl.to(
          [titleGroupRef.current, sectionLabelRef.current],
          { opacity: 0, y: -30, duration: 0.65, ease: 'power2.inOut' }
        );

        tl.to(cardsRef.current, {
          x: (i) => circleX[i],
          y: (i) => circleY[i],
          scale: 0.84,
          duration: 1.9,
          ease: 'none',
          force3D: true,
        }, '<');

        tl.to(cardsRef.current, {
          x: (i) => expandedCircleX[i],
          y: (i) => expandedCircleY[i],
          scale: 1.18,
          duration: 1.05,
          ease: 'power2.inOut',
          force3D: true,
        });

        tl.to(cardsRef.current, {
          x: (i) => zoomX[i],
          y: (i) => zoomY[i],
          scale: 5.2,
          duration: 1.75,
          ease: 'power3.inOut',
          force3D: true,
        });

        tl.to('.bridge-terminal-header', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=1.2');

        tl.to(wordElements, {
          opacity: 1, z: 0, x: 0, y: 0, rotationX: 0, rotationY: 0, rotationZ: 0,
          duration: 2.0,
          stagger: { each: 0.04, from: 'random' },
          ease: 'power3.out', force3D: true,
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
        className="relative flex min-h-screen w-full flex-col bg-transparent px-4 pb-16 pt-28 md:hidden"
      >
        <EventsBackground />
        <div className="absolute left-5 top-6 z-20 pointer-events-none">
          <span style={{
            fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>02.</span>
            SYSTEM.LOGS // DOMAINS
          </span>
        </div>
        <div className="z-20 mb-8 flex flex-col items-center text-center pointer-events-none">
          <span style={{
            fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase',
          }}>
            ▶ SECTOR_MAP // DOMAINS
          </span>
          <h2 style={{
            margin: 0, fontSize: 'clamp(30px,9.5vw,42px)', fontWeight: '900',
            color: '#ffffff', letterSpacing: '-0.01em',
            fontFamily: '"Inter", "Arial Black", sans-serif',
            textTransform: 'uppercase', lineHeight: 1.02,
          }}>
            DOMAINS AT <span style={{ color: '#4FAEF3', fontWeight: 900 }}>ROBOVITICS.</span>
          </h2>
          <div style={{
            marginTop: '14px', width: '72%', height: '1px',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
          }} />
        </div>
        <div className="z-10 grid w-full grid-cols-2 gap-3">
          {DOMAINS.map((domain) => (
            <DomainCardMobile key={`mobile-${domain.id}`} domain={domain} />
          ))}
        </div>
      </section>

      {/* DESKTOP LAYOUT */}
      <section
        id="domains"
        ref={sectionRef}
        className="relative hidden h-[calc(100vh+5000px)] w-full bg-transparent md:block"
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <EventsBackground />
          <HUDTextBridge />

          {/* Top Left Label */}
          <div ref={sectionLabelRef} className="absolute z-20 pointer-events-none" style={{ top: '10%', left: '6%' }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
            }}>
              <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>02.</span>
              SYSTEM.LOGS // DOMAINS
            </span>
          </div>

          {/* Grouped Title Container for Animation */}
          <div
            ref={titleGroupRef}
            className="absolute z-20 flex flex-col items-center pointer-events-none w-full"
            style={{ top: '18%', left: 0, whiteSpace: 'nowrap' }}
          >
            <span style={{
              fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
              fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase',
            }}>
              ▶ SECTOR_MAP // DOMAINS
            </span>
            <h2 style={{
              margin: 0, fontSize: 'clamp(32px,4.5vw,72px)', fontWeight: '900',
              color: '#ffffff', letterSpacing: '-0.01em',
              fontFamily: '"Inter", "Arial Black", sans-serif',
              textTransform: 'uppercase', lineHeight: 1, textAlign: 'center',
            }}>
              DOMAINS AT{' '}
              <span style={{ color: '#4FAEF3', fontWeight: 900 }}>ROBOVITICS.</span>
            </h2>
            <div style={{
              marginTop: '14px', width: '30%', height: '1px',
              background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
            }} />
          </div>

          {/* Cards */}
          <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
            {DOMAINS.map((domain, index) => (
              <DomainCardDesktop key={`desktop-${domain.id}`} domain={domain} index={index} addToRefs={addToRefs} />
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <span style={{
              fontSize: '8px', letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', textTransform: 'uppercase',
            }}>
              SCROLL TO DEPLOY ↓
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
