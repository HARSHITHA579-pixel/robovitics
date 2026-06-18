"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: "MODULE_01",
    name: "ROBOWARS",
    type: "COMBAT ROBOTICS",
    date: "GRAVITAS · VIT ANNUAL FEST",
    desc: "The flagship event of Gravitas. Robot combat where participants from around the globe battle for the RoboWars Champion Title.",
    status: "FLAGSHIP",
  },
  {
    id: "MODULE_02",
    name: "EQUINOX",
    type: "36-HOUR HACKATHON",
    date: "36H · OPEN REGISTRATION",
    desc: "A jam-packed hackathon where participants share ideas and creativity. Mentors and mini workshops with abundant resources throughout.",
    status: "UPCOMING",
  },
  {
    id: "MODULE_03",
    name: "VORTEX 360",
    type: "CAD MODELLING HACKATHON",
    date: "POWERED BY AUTODESK",
    desc: "Designers are inspired to let their creative juices flow. 'Design is not just what it looks like — design is how it works.'",
    status: "UPCOMING",
  },
  {
    id: "MODULE_04",
    name: "HANDS ON ROBOTICS",
    type: "ANNUAL WORKSHOP",
    date: "RECURRING · OPEN TO ALL",
    desc: "Learn to design fully functional mobile Arduino robots including Line Followers and Obstacle Avoiders. No prior experience needed.",
    status: "OPEN",
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

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const title = titleRef.current;
    const deck = deckRef.current;
    if (!section || !pin || !title || !deck) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== 4) return;

    const getGridPositions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gx = vw * 0.22;
      const gy = vh * 0.22;
      return [
        { x: -gx, y: -gy },
        { x:  gx, y: -gy },
        { x: -gx, y:  gy },
        { x:  gx, y:  gy },
      ];
    };

    const baseShadow = "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.75), 8px 10px 20px rgba(0,0,0,0.55)";
    const glowShadow = `${baseShadow}, 0 0 40px rgba(255,255,255,0.12), 0 0 90px rgba(255,255,255,0.07), 0 0 160px rgba(200,220,255,0.05)`;

    // ── Initial stacked state ─────────────────────────────────────────
    cards.forEach((card, i) => {
      const depth = cards.length - 1 - i;
      
      // Card wrapper stays plain initially
      gsap.set(card, {
        x: 0,
        y: depth * 12,
        scale: 1 - depth * 0.04,
        rotateX: 0,
        zIndex: i + 1,
        opacity: 1,
        transformOrigin: "center bottom",
      });

      // Hide the complex styles and inner text initially
      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");
      
      if (styledBg) gsap.set(styledBg, { opacity: 0, boxShadow: baseShadow });
      if (highlights) gsap.set(highlights, { opacity: 0 });
      if (inner) gsap.set(inner, { opacity: 0 });
    });

    gsap.set(title, { zIndex: 10, opacity: 1, y: 0 });

    // ── Timeline ──────────────────────────────────────────────────────
    const tl = gsap.timeline({ paused: true });

    tl.to(title, {
      opacity: 0,
      y: -28,
      duration: 0.08,
      ease: "power2.in",
    }, 0.12);

    tl.call(() => {
      cards.forEach((card, i) => { card.style.zIndex = String(20 + i); });
    }, [], 0.19);
    tl.call(() => {
      cards.forEach((card, i) => { card.style.zIndex = String(i + 1); });
    }, [], 0.18); 

    // ── Peel cards ────────────────────────────────────────────────────
    const peelOrder = [3, 2, 1, 0];
    peelOrder.forEach((cardIdx, peelStep) => {
      const card = cards[cardIdx];
      const pos = getGridPositions()[cardIdx];
      const t = 0.2 + peelStep * 0.2;

      tl.to(card, {
        rotateX: 18,
        y: "-=60",
        duration: 0.07,
        ease: "power2.in",
      }, t);

      tl.to(card, {
        x: pos.x,
        y: pos.y,
        rotateX: 0,
        scale: 1,
        duration: 0.13,
        ease: "power3.out",
      }, t + 0.07);

      tl.to(card, { y: pos.y + 8, duration: 0.03, ease: "power1.out" }, t + 0.18);
      tl.to(card, { y: pos.y,     duration: 0.03, ease: "power1.in"  }, t + 0.21);

      // Fade in the rich styles, highlights, and content as it lands
      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");

      if (styledBg) {
        tl.to(styledBg, { opacity: 1, duration: 0.15, ease: "power2.inOut" }, t + 0.05);
        // Activate ambient radial glow on the styled background
        tl.to(styledBg, { boxShadow: glowShadow, duration: 0.3, ease: "power2.out" }, t + 0.22);
      }
      if (highlights) {
        tl.to(highlights, { opacity: 1, duration: 0.15 }, t + 0.1);
      }
      if (inner) {
        tl.to(inner, { opacity: 1, duration: 0.08, ease: "power1.out" }, t + 0.22);
      }

      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (flash) {
        tl.fromTo(flash,
          { opacity: 0.9 },
          { opacity: 0, duration: 0.12, ease: "power2.out" },
          t + 0.18
        );
      }
    });

    // ── ScrollTrigger ─────────────────────────────────────────────────
    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      scrub: 1.2,
      pin: pin,
      anticipatePin: 1,
      animation: tl,
      onRefresh: () => {
        const pos = getGridPositions();
        peelOrder.forEach((cardIdx) => {
          const card = cards[cardIdx];
          const currentX = gsap.getProperty(card, "x") as number;
          if (Math.abs(currentX) > 10) {
            gsap.set(card, { x: pos[cardIdx].x, y: pos[cardIdx].y });
          }
        });
      },
    });

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0d0d0d]">
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Grid Background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Constellation Dots */}
        {([
          [8, 9], [66, 14], [15, 58], [80, 47], [44, 78],
        ] as [number, number][]).map(([lp, tp], i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full bg-white/25"
            style={{
              left: `${lp}%`, top: `${tp}%`, width: 5, height: 5,
              boxShadow: '0 0 6px rgba(255,255,255,0.15)'
            }}
          />
        ))}

        {/* Constellation Lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="8%" y1="9%"  x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="66%" y1="14%" x2="80%" y2="47%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="15%" y1="58%" x2="44%" y2="78%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </svg>

        {/* Section Label */}
        <div className="absolute z-20 pointer-events-none" style={{ top: '10%', left: '6%' }}>
          <span style={{
            fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>03.</span>
            SYSTEM.LOGS // EVENTS
          </span>
        </div>

        {/* 3D Context Wrapper */}
        <div
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 50%",
            position: "relative",
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Main Title Array */}
          <div
            ref={titleRef}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ zIndex: 10, top: '-6%' }}
          >
            <span style={{
              fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
              fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase',
            }}>
              ▶ SECTOR_MAP // EVENTS
            </span>
            <h2 style={{
              margin: 0, fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: '900',
              color: '#ffffff', letterSpacing: '-0.01em',
              fontFamily: '"Inter", "Arial Black", sans-serif',
              textTransform: 'uppercase', lineHeight: 1, textAlign: 'center',
            }}>
              EVENTS AT{' '}
<span style={{ color: 'rgba(34,211,238,0.45)', fontWeight: 900 }}>ROBOVITICS.</span>
            </h2>
            <div style={{
              marginTop: '14px', width: '30%', height: '1px',
              background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
            }} />
          </div>

          {/* Card Deck Wrapper */}
          <div
            ref={deckRef}
            className="absolute"
            style={{
              width: 320,
              height: 230,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {events.map((ev, i) => (
              <div
                key={ev.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="absolute inset-0 select-none overflow-visible rounded-[4px]"
                style={{
                  // The plain base state
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  willChange: "transform, box-shadow",
                  padding: "16px 20px 18px",
                  color: "#f1f3f5",
                }}
              >
                {/* Complex Glass Background (Fades in) */}
                <div
                  className="ev-styled-bg absolute rounded-[4px] pointer-events-none"
                  style={{
                    // Cover the 1px plain border seamlessly
                    top: -1, right: -1, bottom: -1, left: -1,
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

                {/* Structural Screws (Always visible to maintain shape logic) */}
                <span className="absolute z-10" style={{ top: '5px', left: '6px' }}><Screw /></span>
                <span className="absolute z-10" style={{ top: '5px', right: '6px' }}><Screw /></span>
                <span className="absolute z-10" style={{ bottom: '5px', left: '6px' }}><Screw /></span>
                <span className="absolute z-10" style={{ bottom: '5px', right: '6px' }}><Screw /></span>

                {/* Accent Highlights (Fades in) */}
                <div className="ev-highlights absolute inset-0 pointer-events-none z-10">
                  <span style={{ position: 'absolute', top: '-1px', left: '18px', width: '36px', height: '1px', background: 'rgba(255,255,255,0.7)' }} />
                  <span style={{ position: 'absolute', bottom: '-1px', right: '18px', width: '36px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
                </div>

                {/* Peel Flash Highlight */}
                <div
                  className="ev-flash pointer-events-none absolute inset-0 opacity-0 rounded-[4px] z-20"
                  style={{ border: "1px solid rgba(255,255,255,0.85)" }}
                />

                {/* Inner Content (Fades in) */}
                <div className="ev-inner relative z-30 flex h-full flex-col">
                  <div className="mb-2 mt-[-2px] text-center">
                    <span style={{
                      fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: 'rgba(235,238,242,0.34)',
                      textShadow: '0 0 10px rgba(180,205,255,0.14)',
                    }}>
                      {ev.id}
                    </span>
                  </div>

                  <h3 className="text-center" style={{
                    margin: '0 0 4px',
                    fontFamily: '"Inter", "Arial Black", sans-serif',
                    fontWeight: '900', fontSize: '20px', letterSpacing: '0.04em',
                    textTransform: 'uppercase', color: 'rgba(245,247,250,0.9)',
                    textShadow: '0 0 16px rgba(255,255,255,0.18)', lineHeight: 1.1,
                  }}>
                    {ev.name}
                  </h3>

                  <p className="text-center" style={{
                    margin: '0 0 10px', fontFamily: 'monospace', fontSize: '9px',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(168,176,188,0.62)',
                  }}>
                    {ev.type}
                  </p>

                  <div style={{
                    height: '1px', margin: '0 8px 12px',
                    background: 'linear-gradient(90deg, transparent, rgba(235,238,242,0.42) 30%, rgba(235,238,242,0.42) 70%, transparent)',
                    boxShadow: '0 0 10px rgba(180,205,255,0.16)',
                  }} />

                  <p className="font-mono text-[10px] leading-[1.65]" style={{ color: 'rgba(235,238,242,0.65)' }}>
                    {ev.desc}
                  </p>

                  {/* Date & Status Footer */}
                  <div
                    className="mt-auto flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10 }}
                  >
                    <span className="font-mono text-[8.5px] tracking-[0.1em] text-white/30">
                      {ev.date}
                    </span>

                    {["OPEN", "REGISTRATIONS OPEN", "FLAGSHIP"].includes(ev.status) ? (
                      <span
                        className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/90"
                        style={{ border: "1px solid rgba(255,255,255,0.45)", padding: "2px 7px", borderRadius: "2px" }}
                      >
                        <span className="ev-blink inline-block h-[4px] w-[4px] rounded-full bg-white" />
                        {ev.status}
                      </span>
                    ) : (
                      <span
                        className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/30"
                        style={{ border: "1px solid rgba(255,255,255,0.11)", padding: "2px 7px", borderRadius: "2px" }}
                      >
                        {ev.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ev-blink { animation: ev-blink-kf 1.1s step-start infinite; }
        @keyframes ev-blink-kf { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}