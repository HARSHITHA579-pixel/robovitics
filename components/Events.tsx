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
    date: "GRAVITAS · VIT ANNUAL FEST",
    desc: "The flagship event of Gravitas. Robot combat where participants from around the globe battle for the RoboWars Champion Title.",
    status: "FLAGSHIP",
    img: "/robowars.png",
    details: "Prepare for the ultimate combat robotics showdown. Teams will bring their engineering marvels to battle it out in an enclosed, hazard-filled arena. Sparks will fly, metal will crunch, and only one machine will survive to claim the championship title. Detailed rules, weight classes (15kg, 30kg, 60kg), and technical safety regulations apply for all participating teams.",
  },
  {
    id: "MODULE_02",
    name: "EQUINOX",
    type: "36-HOUR HACKATHON",
    date: "36H · OPEN REGISTRATION",
    desc: "A jam-packed hackathon where participants share ideas and creativity. Mentors and mini workshops with abundant resources throughout.",
    status: "UPCOMING",
    img: "/equinox.png",
    details: "Join the most intense 36-hour coding marathon. Gather your team, ideate, and build solutions that tackle real-world problems. With expert mentors, technical workshops, and unlimited coffee, push your limits to create software or hardware prototypes that stand out. Great prizes, networking, and sleep-deprivation guaranteed.",
  },
  {
    id: "MODULE_03",
    name: "VORTEX 360",
    type: "CAD MODELLING HACKATHON",
    date: "POWERED BY AUTODESK",
    desc: "Designers are inspired to let their creative juices flow. 'Design is not just what it looks like — design is how it works.'",
    status: "UPCOMING",
    img: "/vortex.png",
    details: "Bring your 3D CAD designs to life. Vortex 360 challenges participants to conceptualize, draft, and render complex mechanical systems under a tight deadline. Judged on creativity, structural integrity, and manufacturability, this is the ultimate proving ground for aspiring mechanical and industrial designers.",
  },
  {
    id: "MODULE_04",
    name: "HANDS ON ROBOTICS",
    type: "ANNUAL WORKSHOP",
    date: "RECURRING · OPEN TO ALL",
    desc: "Learn to design fully functional mobile Arduino robots including Line Followers and Obstacle Avoiders. No prior experience needed.",
    status: "OPEN",
    img: "/hands-on.png",
    details: "Get hands-on with real hardware. This comprehensive workshop takes you from absolute beginner to building your first autonomous robot. Learn the basics of embedded C/C++, sensor integration, motor drivers, and chassis assembly. By the end of the session, you'll walk away with your own working machine.",
  },
];

function Screw() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="3.7" fill="#070809" stroke="rgba(235,238,242,0.34)" strokeWidth="0.8" />
      <circle cx="5" cy="5" r="1.5" fill="rgba(235,238,242,0.28)" />
      <line x1="2.7" y1="5" x2="7.3" y2="5" stroke="rgba(235,238,242,0.5)" strokeWidth="0.8" strokeLinecap="square" />
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

  // Modal & Carousel States
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next');
  
  // Refs for tracking animation state
  const flippedRef = useRef([false, false, false, false]);
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

    const peelOrder = [3, 2, 1, 0];
    peelOrder.forEach((cardIdx, peelStep) => {
      const card = cards[cardIdx];
      const pos = getGridPositions()[cardIdx];
      const t = 0.2 + peelStep * 0.2;

      tl.to(card, { rotateX: 18, y: "-=60", duration: 0.07, ease: "power2.in" }, t);
      tl.to(card, { x: pos.x, y: pos.y, rotateX: 0, scale: 1, duration: 0.13, ease: "power3.out" }, t + 0.07);
      tl.to(card, { y: pos.y + 8, duration: 0.03, ease: "power1.out" }, t + 0.18);
      tl.to(card, { y: pos.y, duration: 0.03, ease: "power1.in" }, t + 0.21);

      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");

      if (styledBg) {
        tl.to(styledBg, { opacity: 1, duration: 0.15, ease: "power2.inOut" }, t + 0.05);
        tl.to(styledBg, { boxShadow: glowShadow, duration: 0.3, ease: "power2.out" }, t + 0.22);
      }
      if (highlights) tl.to(highlights, { opacity: 1, duration: 0.15 }, t + 0.1);
      if (inner) tl.to(inner, { opacity: 1, duration: 0.08, ease: "power1.out" }, t + 0.22);

      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (flash) tl.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.12, ease: "power2.out" }, t + 0.18);
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
          const t = 0.2 + peelStep * 0.2;
          const landTime = t + 0.35; 
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
          <line x1="8%" y1="9%"  x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
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

          <div ref={deckRef} className="absolute" style={{ width: 320, height: 230, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
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
                      style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px 18px" }}
                    >
                      <div className="ev-styled-bg absolute rounded-[4px] pointer-events-none" style={{ top: -1, right: -1, bottom: -1, left: -1, background: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)), rgba(28,30,34,0.95)`, backgroundSize: '18px 18px, 18px 18px, auto, auto', border: '1px solid rgba(235,238,242,0.28)' }} />
                      <span className="absolute z-10" style={{ top: '5px', left: '6px' }}><Screw /></span>
                      <span className="absolute z-10" style={{ top: '5px', right: '6px' }}><Screw /></span>
                      <span className="absolute z-10" style={{ bottom: '5px', left: '6px' }}><Screw /></span>
                      <span className="absolute z-10" style={{ bottom: '5px', right: '6px' }}><Screw /></span>

                      <div className="ev-highlights absolute inset-0 pointer-events-none z-10">
                        <span style={{ position: 'absolute', top: '-1px', left: '18px', width: '36px', height: '1px', background: 'rgba(255,255,255,0.7)' }} />
                        <span style={{ position: 'absolute', bottom: '-1px', right: '18px', width: '36px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
                      </div>
                      <div className="ev-flash pointer-events-none absolute inset-0 opacity-0 rounded-[4px] z-20" style={{ border: "1px solid rgba(255,255,255,0.85)" }} />

                      <div className="ev-inner relative z-30 flex h-full flex-col">
                        <div className="mb-2 mt-[-2px] text-center">
                          <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(235,238,242,0.34)', textShadow: '0 0 10px rgba(180,205,255,0.14)' }}>{ev.id}</span>
                        </div>
                        <h3 className="text-center" style={{ margin: '0 0 4px', fontFamily: '"Inter", "Arial Black", sans-serif', fontWeight: '900', fontSize: '20px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(245,247,250,0.9)', textShadow: '0 0 16px rgba(255,255,255,0.18)', lineHeight: 1.1 }}>{ev.name}</h3>
                        <p className="text-center" style={{ margin: '0 0 10px', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(168,176,188,0.62)' }}>{ev.type}</p>
                        <div style={{ height: '1px', margin: '0 8px 12px', background: 'linear-gradient(90deg, transparent, rgba(235,238,242,0.42) 30%, rgba(235,238,242,0.42) 70%, transparent)', boxShadow: '0 0 10px rgba(180,205,255,0.16)' }} />
                        <p className="font-mono text-[10px] leading-[1.65]" style={{ color: 'rgba(235,238,242,0.65)' }}>{ev.desc}</p>
                        <div className="mt-auto flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10 }}>
                          <span className="font-mono text-[8.5px] tracking-[0.1em] text-white/30">{ev.date}</span>
                          {["OPEN", "REGISTRATIONS OPEN", "FLAGSHIP"].includes(ev.status) ? (
                            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/90" style={{ border: "1px solid rgba(255,255,255,0.45)", padding: "2px 7px", borderRadius: "2px" }}>
                              <span className="ev-blink inline-block h-[4px] w-[4px] rounded-full bg-white" />
                              {ev.status}
                            </span>
                          ) : (
                            <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/30" style={{ border: "1px solid rgba(255,255,255,0.11)", padding: "2px 7px", borderRadius: "2px" }}>
                              {ev.status}
                            </span>
                          )}
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-xl p-4 md:p-8"
          style={{ animation: isClosing ? 'ev-fade-out 0.3s ease-in forwards' : 'ev-fade-in 0.3s ease-out forwards' }}
          onClick={handleCloseModal}
        >
          {/* Relative wrapper defines the modal boundary. Buttons anchor to this. */}
          <div 
            className="relative w-full max-w-2xl h-[85vh] max-h-[600px] md:mx-16"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: isClosing ? 'ev-modal-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'ev-modal-entry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Left Prev Arrow */}
            <button 
              className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 backdrop-blur-md shadow-lg"
              onClick={handlePrev}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Right Next Arrow */}
            <button 
              className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 backdrop-blur-md shadow-lg"
              onClick={handleNext}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Inner Content Wrapper - Clips the sliding animation */}
            <div className="absolute inset-0 bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl shadow-[#4FAEF3]/10 overflow-hidden">
              <button 
                className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-white active:scale-90 transition-all duration-200 ease-out border border-white/10 backdrop-blur-md"
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
                    <div className="relative h-[40%] md:h-[45%] w-full flex-shrink-0 bg-neutral-900 border-b border-white/10 overflow-hidden">
                      <img src={ev.img} alt={ev.name} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                    </div>

                    <div className="p-6 md:p-8 relative z-10 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#4FAEF3] uppercase border border-[#4FAEF3]/30 px-2 py-1 rounded bg-[#4FAEF3]/5">
                          {ev.id}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.1em] text-white/40 uppercase">
                          {ev.status}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide mb-1" style={{ fontFamily: '"Inter", "Arial Black", sans-serif' }}>
                        {ev.name}
                      </h2>
                      
                      <h3 className="font-mono text-xs md:text-sm tracking-widest text-white/50 mb-4 uppercase">
                        {ev.type} // {ev.date}
                      </h3>

                      <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-5" />

                      <div className="space-y-3 md:space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="font-mono text-xs md:text-sm text-white/80 leading-relaxed">
                          {ev.desc}
                        </p>
                        <p className="font-mono text-[10px] md:text-xs text-white/50 leading-relaxed">
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