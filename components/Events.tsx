"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: "MODULE_01",
    name: "ROBOWARS",
    type: "COMBAT ROBOTICS",
    date: "FLAGSHIP · GRAVITAS 2025",
    desc: "3 weight classes. ₹3L prize pool. One of India's largest combat arenas — Team Orcus fought across all categories.",
    status: "FLAGSHIP",
    img: "/robowars.png",
    details: "Held 26–28 Sept 2025 and sponsored by Siemens and Analog Devices, RoboWars brought elite teams from across the country into one of India's largest and safest combat robotics arenas. Matches spanned 8kg, 15kg, and 60kg weight categories, testing mechanical design, electronics, and strategy under pressure. Our own Team Orcus competed in every category. Winners: Team Dot Robotics (8kg), Team Black Diamonds (15kg), and Team Shadow (60kg).",
  },
  {
    id: "MODULE_02",
    name: "HANDS ON ROBOTICS",
    type: "WORKSHOP · HARDWARE + SOFTWARE",
    date: "PRE-GRAVITAS 2025 · 240+ ATTENDEES",
    desc: "Two days, zero prior experience needed. Sensors, microcontrollers, MicroPython, and live WebSocket-controlled robots.",
    status: "OPEN",
    img: "/hands-on.png",
    details: "Sponsored by Module143 and run on 22–23 Sept 2025, this two-day workshop took ~240 students from zero to building functional robotic systems. Sessions covered sensors, microcontrollers, and IoT-enabled devices, alongside MicroPython for efficient firmware. Participants also built web-based control systems using real-time communication and WebSocket integration — bridging embedded hardware, firmware, and browser-based control in one working pipeline.",
  },
  {
    id: "MODULE_03",
    name: "MACHINE DESIGN",
    type: "FUSION 360 WORKSHOP",
    date: "PRE-GRAVITAS 2025 · 150 ATTENDEES",
    desc: "Hands-on CAD across modeling, joints, rendering, and simulation — plus real-time physics in PyBullet.",
    status: "OPEN",
    img: "/equinox.png",
    details: "A two-day deep dive into Fusion 360 held on 23–24 Sept 2025, covering 2D/3D modeling, joint assembly, animation, rendering, and simulation. Participants were introduced to PyBullet, a real-time physics engine, to test and validate their digital models against motion, collisions, and constraints. Practical, beyond-curriculum design projects sharpened both technical skill and industry readiness.",
  },
  {
    id: "MODULE_04",
    name: "VORTEX 360",
    type: "72H CAD DESIGN-A-THON",
    date: "POWERED BY AUTODESK · FEB 2025",
    desc: "~1,300 participants. 3 days, real-world problem tracks, ₹1L prize pool, and direct access to Autodesk experts.",
    status: "FLAGSHIP",
    img: "/vortex.png",
    details: "A 72-hour CAD modeling design-a-thon sponsored by Autodesk, drawing nearly 1,300 students in teams of 3–5. Day 1 focused on problem understanding and brainstorming, Day 2 on refining designs and prototyping in Fusion 360, and Day 3 on final pitches before judges and industry experts. Beyond the ₹1L prize pool, the event offered direct networking with Autodesk professionals and industry leaders.",
  },
  {
    id: "MODULE_05",
    name: "CRUISE THE WEB3VERSE",
    type: "WEB3 EVENT",
    date: "2 DAYS · ENDED IN A LIVE AUCTION",
    desc: "A two-day dive into Web3 concepts and tooling, closing out with a live auction finale.",
    status: "UPCOMING",
    img: "/equinox.png",
    details: "A two-day Web3-focused event exploring decentralized concepts and tooling, designed for curious builders and newcomers alike. The event culminated in a live auction, turning theory into a tangible, competitive finale that brought the whole cohort together for one last high-energy session.",
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);

  // Modal & Carousel States
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next');

  // Refs for tracking animation state
  const flippedRef = useRef([false, false, false, false, false]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevEventId = useRef<string | null>(null);
  const isSlideAnimating = useRef(false);

  // Close modal logic
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setIsClosing(false);
      prevEventId.current = null;
    }, 300);
  };

  // Carousel Next/Prev Logic
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSlideAnimating.current) return;
    setSlideDir('next');
    const currentIndex = events.findIndex(ev => ev.id === selectedEvent.id);
    setSelectedEvent(events[(currentIndex + 1) % events.length]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSlideAnimating.current) return;
    setSlideDir('prev');
    const currentIndex = events.findIndex(ev => ev.id === selectedEvent.id);
    setSelectedEvent(events[(currentIndex - 1 + events.length) % events.length]);
  };

  // ── GSAP Slide Transition Effect ─────────────────────────────────────────
  useEffect(() => {
    if (!selectedEvent || !carouselRef.current) return;

    const incomingId = selectedEvent.id;
    const outgoingId = prevEventId.current;

    const slides = Array.from(carouselRef.current.querySelectorAll('.ev-slide-item')) as HTMLElement[];
    const incomingNode = slides.find(el => el.dataset.id === incomingId);
    const outgoingNode = slides.find(el => el.dataset.id === outgoingId);

    if (!outgoingId || outgoingId === incomingId) {
      slides.forEach(slide => {
        if (slide.dataset.id === incomingId) {
          gsap.set(slide, { x: "0%", autoAlpha: 1 });
        } else {
          gsap.set(slide, { autoAlpha: 0 });
        }
      });
      prevEventId.current = incomingId;
      return;
    }

    if (incomingNode && outgoingNode) {
      isSlideAnimating.current = true;

      const xInStart = slideDir === 'next' ? "100%" : "-100%";
      const xOutEnd = slideDir === 'next' ? "-100%" : "100%";

      gsap.set(incomingNode, { x: xInStart, autoAlpha: 1 });

      gsap.to(outgoingNode, {
        x: xOutEnd,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => gsap.set(outgoingNode, { autoAlpha: 0 })
      });

      gsap.to(incomingNode, {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          isSlideAnimating.current = false;
        }
      });
    }

    prevEventId.current = incomingId;
  }, [selectedEvent, slideDir]);

  // ── Main Background Animations ─────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const title = titleRef.current;
    const deck = deckRef.current;
    if (!section || !pin || !title || !deck) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== 5) return;

    // 5-point layout — X shape with center focal point
    const getGridPositions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const offsetX = Math.min(vw * 0.32, Math.max(vw / 2 - 160, 200));
      const offsetY = Math.min(vh * 0.30, Math.max(vh / 2 - 140, 150));
      return [
        { x: -offsetX, y: -offsetY }, // Card 1: Top-Left
        { x:  offsetX, y: -offsetY }, // Card 2: Top-Right
        { x:        0, y:        0 }, // Card 3: Center
        { x: -offsetX, y:  offsetY }, // Card 4: Bottom-Left
        { x:  offsetX, y:  offsetY }, // Card 5: Bottom-Right
      ];
    };

    const baseShadow = "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.75), 8px 10px 20px rgba(0,0,0,0.55)";
    const glowShadow = `${baseShadow}, 0 0 40px rgba(255,255,255,0.12), 0 0 90px rgba(255,255,255,0.07), 0 0 160px rgba(200,220,255,0.05)`;

    cards.forEach((card, i) => {
      const depth = cards.length - 1 - i;
      gsap.set(card, { x: 0, y: depth * 12, scale: 1 - depth * 0.04, rotateX: 0, zIndex: i + 1, opacity: 1, transformOrigin: "center bottom" });
      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");
      if (styledBg) gsap.set(styledBg, { opacity: 0, boxShadow: baseShadow });
      if (highlights) gsap.set(highlights, { opacity: 0 });
      if (inner) gsap.set(inner, { opacity: 0 });
    });

    gsap.set(title, { zIndex: 10, opacity: 1, y: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(title, { opacity: 0, y: -28, duration: 0.08, ease: "power2.in" }, 0.12);
    tl.call(() => { cards.forEach((card, i) => { card.style.zIndex = String(20 + i); }); }, [], 0.19);
    tl.call(() => { cards.forEach((card, i) => { card.style.zIndex = String(i + 1); }); }, [], 0.18);

    const peelOrder = [4, 3, 2, 1, 0];
    peelOrder.forEach((cardIdx, peelStep) => {
      const card = cards[cardIdx];
      const pos = getGridPositions()[cardIdx];
      const t = 0.2 + peelStep * 0.16;

      tl.to(card, { rotateX: 18, y: "-=60", duration: 0.06, ease: "power2.in" }, t);
      tl.to(card, { x: pos.x, y: pos.y, rotateX: 0, scale: 1, duration: 0.11, ease: "power3.out" }, t + 0.06);
      tl.to(card, { y: pos.y + 8, duration: 0.025, ease: "power1.out" }, t + 0.15);
      tl.to(card, { y: pos.y, duration: 0.025, ease: "power1.in" }, t + 0.175);

      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");

      if (styledBg) {
        tl.to(styledBg, { opacity: 1, duration: 0.13, ease: "power2.inOut" }, t + 0.04);
        tl.to(styledBg, { boxShadow: glowShadow, duration: 0.26, ease: "power2.out" }, t + 0.18);
      }
      if (highlights) tl.to(highlights, { opacity: 1, duration: 0.13 }, t + 0.08);
      if (inner) tl.to(inner, { opacity: 1, duration: 0.07, ease: "power1.out" }, t + 0.18);

      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (flash) tl.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.1, ease: "power2.out" }, t + 0.15);
    });

    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      scrub: 1.2,
      pin: pin,
      anticipatePin: 1,
      animation: tl,
      onUpdate: () => {
        peelOrder.forEach((cardIdx, peelStep) => {
          const t = 0.2 + peelStep * 0.16;
          const landTime = t + 0.3;
          if (tl.time() >= landTime && !flippedRef.current[cardIdx]) {
            flippedRef.current[cardIdx] = true;
            if (events[cardIdx].id === "MODULE_01") {
              const hintFlipper = cardsRef.current[cardIdx]?.querySelector(".ev-hint-flipper");
              if (hintFlipper) {
                gsap.timeline()
                  .to(hintFlipper, { rotateY: 180, duration: 0.4, ease: "power2.out" })
                  .to(hintFlipper, { rotateY: 0, duration: 0.4, ease: "power2.inOut", delay: 0.15 });
              }
            }
          }
        });
      },
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
      <div ref={pinRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Background Grids & Dots */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        {([[8, 9], [66, 14], [15, 58], [80, 47], [44, 78]] as [number, number][]).map(([lp, tp], i) => (
          <div key={i} className="pointer-events-none absolute rounded-full bg-white/25" style={{ left: `${lp}%`, top: `${tp}%`, width: 5, height: 5, boxShadow: '0 0 6px rgba(255,255,255,0.15)' }} />
        ))}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="8%" y1="9%" x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="66%" y1="14%" x2="80%" y2="47%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="15%" y1="58%" x2="44%" y2="78%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </svg>

        <div className="absolute z-20 pointer-events-none" style={{ top: '10%', left: '6%' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
            <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>03.</span>
            SYSTEM.LOGS // EVENTS
          </span>
        </div>

        <div style={{ perspective: "1100px", perspectiveOrigin: "50% 50%", position: "relative", width: "100vw", height: "100vh" }}>
          <div ref={titleRef} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" style={{ zIndex: 10, top: '-6%' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginBottom: '12px', display: 'block', textTransform: 'uppercase' }}>
              ▶ SECTOR_MAP // EVENTS
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.01em', fontFamily: '"Inter", "Arial Black", sans-serif', textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
              EVENTS AT <span style={{ color: '#4FAEF3', fontWeight: 900 }}>ROBOVITICS.</span>
            </h2>
            <div style={{ marginTop: '14px', width: '30%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
          </div>

          <div ref={deckRef} className="absolute" style={{ width: 270, height: 195, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            {events.map((ev, i) => (
              <div
                key={ev.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="absolute inset-0 select-none overflow-visible rounded-[4px] group cursor-pointer"
                style={{ willChange: "transform, box-shadow", color: "#f1f3f5", perspective: "1000px" }}
                onClick={() => setSelectedEvent(ev)}
              >
                <div className="ev-hint-flipper relative w-full h-full [transform-style:preserve-3d]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* Front Face */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] rounded-[4px]"
                      style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 18px 18px" }}
                    >
                      <div className="ev-styled-bg absolute rounded-[4px] pointer-events-none" style={{ top: -1, right: -1, bottom: -1, left: -1, background: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)), rgba(28,30,34,0.95)`, backgroundSize: '18px 18px, 18px 18px, auto, auto', border: '1px solid rgba(235,238,242,0.28)' }} />

                      {/* Cyan corner brackets */}
                      <span className="absolute z-10 pointer-events-none" style={{ top: 6, left: 6, width: 14, height: 14, borderTop: '1.5px solid rgba(79,174,243,0.85)', borderLeft: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
                      <span className="absolute z-10 pointer-events-none" style={{ top: 6, right: 6, width: 14, height: 14, borderTop: '1.5px solid rgba(79,174,243,0.85)', borderRight: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
                      <span className="absolute z-10 pointer-events-none" style={{ bottom: 6, left: 6, width: 14, height: 14, borderBottom: '1.5px solid rgba(79,174,243,0.85)', borderLeft: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />
                      <span className="absolute z-10 pointer-events-none" style={{ bottom: 6, right: 6, width: 14, height: 14, borderBottom: '1.5px solid rgba(79,174,243,0.85)', borderRight: '1.5px solid rgba(79,174,243,0.85)', filter: 'drop-shadow(0 0 4px rgba(79,174,243,0.5))' }} />

                      <div className="ev-highlights absolute inset-0 pointer-events-none z-10">
                        <span style={{ position: 'absolute', top: '-1px', left: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.6)' }} />
                        <span style={{ position: 'absolute', bottom: '-1px', right: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.35)' }} />
                      </div>
                      <div className="ev-flash pointer-events-none absolute inset-0 opacity-0 rounded-[4px] z-20" style={{ border: "1px solid rgba(79,174,243,0.85)" }} />

                      <div className="ev-inner relative z-30 flex h-full flex-col">
                        <h3 className="text-center" style={{ margin: '10px 0 6px', fontFamily: '"Inter", "Arial Black", sans-serif', fontWeight: '900', fontSize: '18px', letterSpacing: '0.03em', textTransform: 'uppercase', color: '#ffffff', textShadow: '0 0 22px rgba(255,255,255,0.3)', lineHeight: 1.15 }}>{ev.name}</h3>
                        <p className="text-center" style={{ margin: '0 0 10px', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(79,174,243,0.85)' }}>{ev.type}</p>
                        <div style={{ height: '1px', margin: '0 6px 12px', background: 'linear-gradient(90deg, transparent, rgba(79,174,243,0.4) 30%, rgba(79,174,243,0.4) 70%, transparent)', boxShadow: '0 0 10px rgba(79,174,243,0.2)' }} />
                        <p className="font-mono text-[10px] leading-[1.65]" style={{ color: 'rgba(225,230,240,0.92)' }}>{ev.desc}</p>
                        <div className="mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 9 }}>
                          <span className="font-mono text-[8.5px] tracking-[0.1em] text-white/55">{ev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] rounded-[4px] overflow-hidden"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="relative w-full h-full flex flex-col">
                        <img src={ev.img} alt={ev.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <span className="font-mono text-white text-[10px] tracking-[0.2em] border border-white/40 px-5 py-2.5 backdrop-blur-sm rounded bg-black/30">
                            VIEW EVENT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-xl p-3 md:p-8"
          style={{ animation: isClosing ? 'ev-fade-out 0.3s ease-in forwards' : 'ev-fade-in 0.3s ease-out forwards' }}
          onClick={handleCloseModal}
        >
          {/* Relative wrapper defines the modal boundary. Buttons anchor to this. */}
          <div
            className="relative w-full max-w-4xl h-[90vh] sm:h-[88vh] max-h-[760px] mx-0 md:mx-20"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: isClosing ? 'ev-modal-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'ev-modal-entry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Left Prev Arrow */}
            <button
              className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-[#4FAEF3] hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 hover:border-[#4FAEF3]/60 backdrop-blur-md shadow-lg hover:shadow-[0_0_16px_rgba(79,174,243,0.35)]"
              onClick={handlePrev}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Right Next Arrow */}
            <button
              className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-[#4FAEF3] hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 hover:border-[#4FAEF3]/60 backdrop-blur-md shadow-lg hover:shadow-[0_0_16px_rgba(79,174,243,0.35)]"
              onClick={handleNext}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Inner Content Wrapper - Clips the sliding animation */}
            <div className="absolute inset-0 bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl shadow-[#4FAEF3]/15 overflow-hidden">
              {/* Cyan corner brackets on the popup itself */}
              <span className="absolute z-40 pointer-events-none" style={{ top: 10, left: 10, width: 22, height: 22, borderTop: '2px solid rgba(79,174,243,0.8)', borderLeft: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />
              <span className="absolute z-40 pointer-events-none" style={{ top: 10, right: 10, width: 22, height: 22, borderTop: '2px solid rgba(79,174,243,0.8)', borderRight: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />
              <span className="absolute z-40 pointer-events-none" style={{ bottom: 10, left: 10, width: 22, height: 22, borderBottom: '2px solid rgba(79,174,243,0.8)', borderLeft: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />
              <span className="absolute z-40 pointer-events-none" style={{ bottom: 10, right: 10, width: 22, height: 22, borderBottom: '2px solid rgba(79,174,243,0.8)', borderRight: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />

              <button
                className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-[#4FAEF3] active:scale-90 transition-all duration-200 ease-out border border-white/10 hover:border-[#4FAEF3]/50 backdrop-blur-md"
                onClick={handleCloseModal}
              >
                ✕
              </button>

              {/* GSAP Managed Carousel Track */}
              <div className="relative w-full h-full" ref={carouselRef}>
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    data-id={ev.id}
                    className="ev-slide-item absolute inset-0 w-full h-full flex flex-col invisible"
                  >
                    <div className="relative h-[42%] md:h-[48%] w-full flex-shrink-0 bg-neutral-900 border-b border-[#4FAEF3]/20 overflow-hidden">
                      <img src={ev.img} alt={ev.name} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(79,174,243,0.08)]" />
                    </div>

                    <div className="p-8 md:p-10 relative z-10 flex-grow flex flex-col">
                      <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide mb-2" style={{ fontFamily: '"Inter", "Arial Black", sans-serif', textShadow: '0 0 26px rgba(255,255,255,0.25)' }}>
                        {ev.name}
                      </h2>

                      <h3 className="font-mono text-xs md:text-sm tracking-widest text-[#4FAEF3]/90 mb-5 uppercase">
                        {ev.type} // {ev.date}
                      </h3>

                      <div className="w-full h-[1px] bg-gradient-to-r from-[#4FAEF3]/30 via-white/10 to-transparent mb-6" />

                      <div className="space-y-4 md:space-y-5 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="font-mono text-xs md:text-sm text-white/90 leading-relaxed">
                          {ev.desc}
                        </p>
                        <p className="font-mono text-[10px] md:text-xs text-white/65 leading-relaxed">
                          {ev.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ev-blink { animation: ev-blink-kf 1.1s step-start infinite; }
        @keyframes ev-blink-kf { 0%,100%{opacity:1} 50%{opacity:0} }

        @keyframes ev-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes ev-fade-out { 0% { opacity: 1; } 100% { opacity: 0; } }

        @keyframes ev-modal-entry {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ev-modal-exit {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.95) translateY(20px); }
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </section>
  );
}