"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type DeckItem = {
  id: string;
  name: string;
  type: string;
  date: string;
  desc: string;
  status: string;
  img: string;
  details: string;
};

type Mode = "events" | "outreach";

const events: DeckItem[] = [
  { id: "MODULE_01", name: "ROBOWARS", type: "COMBAT ROBOTICS", date: "FLAGSHIP · GRAVITAS 2025", desc: "3 weight classes. ₹3L prize pool. One of India's largest combat arenas — Team Orcus fought across all categories.", status: "FLAGSHIP", img: "/robowars.png", details: "Held 26–28 Sept 2025 and sponsored by Siemens and Analog Devices, RoboWars brought elite teams from across the country into one of India's largest and safest combat robotics arenas. Matches spanned 8kg, 15kg, and 60kg weight categories, testing mechanical design, electronics, and strategy under pressure. Our own Team Orcus competed in every category. Winners: Team Dot Robotics (8kg), Team Black Diamonds (15kg), and Team Shadow (60kg)." },
  { id: "MODULE_02", name: "HANDS ON ROBOTICS", type: "WORKSHOP · HARDWARE + SOFTWARE", date: "PRE-GRAVITAS 2025 · 240+ ATTENDEES", desc: "Two days, zero prior experience needed. Sensors, microcontrollers, MicroPython, and live WebSocket-controlled robots.", status: "OPEN", img: "/hands-on.png", details: "Sponsored by Module143 and run on 22–23 Sept 2025, this two-day workshop took ~240 students from zero to building functional robotic systems. Sessions covered sensors, microcontrollers, and IoT-enabled devices, alongside MicroPython for efficient firmware. Participants also built web-based control systems using real-time communication and WebSocket integration — bridging embedded hardware, firmware, and browser-based control in one working pipeline." },
  { id: "MODULE_03", name: "MACHINE DESIGN", type: "FUSION 360 WORKSHOP", date: "PRE-GRAVITAS 2025 · 150 ATTENDEES", desc: "Hands-on CAD across modeling, joints, rendering, and simulation — plus real-time physics in PyBullet.", status: "OPEN", img: "/equinox.png", details: "A two-day deep dive into Fusion 360 held on 23–24 Sept 2025, covering 2D/3D modeling, joint assembly, animation, rendering, and simulation. Participants were introduced to PyBullet, a real-time physics engine, to test and validate their digital models against motion, collisions, and constraints. Practical, beyond-curriculum design projects sharpened both technical skill and industry readiness." },
  { id: "MODULE_04", name: "VORTEX 360", type: "72H CAD DESIGN-A-THON", date: "POWERED BY AUTODESK · FEB 2025", desc: "~1,300 participants. 3 days, real-world problem tracks, ₹1L prize pool, and direct access to Autodesk experts.", status: "FLAGSHIP", img: "/vortex.png", details: "A 72-hour CAD modeling design-a-thon sponsored by Autodesk, drawing nearly 1,300 students in teams of 3–5. Day 1 focused on problem understanding and brainstorming, Day 2 on refining designs and prototyping in Fusion 360, and Day 3 on final pitches before judges and industry experts. Beyond the ₹1L prize pool, the event offered direct networking with Autodesk professionals and industry leaders." },
  { id: "MODULE_05", name: "CRUISE THE WEB3VERSE", type: "WEB3 EVENT", date: "2 DAYS · ENDED IN A LIVE AUCTION", desc: "A two-day dive into Web3 concepts and tooling, closing out with a live auction finale.", status: "UPCOMING", img: "/equinox.png", details: "A two-day Web3-focused event exploring decentralized concepts and tooling, designed for curious builders and newcomers alike. The event culminated in a live auction, turning theory into a tangible, competitive finale that brought the whole cohort together for one last high-energy session." },
];

const outreach: DeckItem[] = [
  { id: "FIELD_01", name: "SPARK VISIT", type: "SCHOOL OUTREACH", date: "GOVT. HIGH SCHOOL · VELLORE", desc: "Hands-on robotics demos for grade 8-10 students. First contact with circuits, motors, and the joy of things that move.", status: "COMPLETED", img: "/outreach-spark.png", details: "Our team spent a full day running mini build stations — simple line-following bots, LED circuits, and a Q&A on what engineering actually looks like day to day. Over 120 students got hands-on time with real hardware, many for the first time. Several have since reached out about robotics clubs at their own schools." },
  { id: "FIELD_02", name: "CIRCUIT CARAVAN", type: "MOBILE WORKSHOP", date: "RURAL OUTREACH PROGRAM", desc: "We bring the lab to schools without one. A travelling kit of components, breadboards, and patient explanations.", status: "COMPLETED", img: "/outreach-caravan.png", details: "Circuit Caravan is our recurring initiative to reach schools without access to a robotics or electronics lab. We pack a portable kit — breadboards, sensors, Arduinos, and tools — and run a half-day session covering basic circuits and a simple build. The goal isn't just exposure, it's giving every student something they built with their own hands to take home." },
  { id: "FIELD_03", name: "BUILD A BOT", type: "WEEKEND MENTORSHIP", date: "ONGOING · OPEN APPLICATIONS", desc: "A multi-week mentorship where school students design and build their own bot from scratch, guided by our seniors.", status: "OPEN", img: "/outreach-buildabot.png", details: "Build a Bot pairs small teams of school students with RoboVITics mentors over several weekends. Students go from a blank sheet to a working autonomous bot, learning CAD basics, simple embedded programming, and assembly along the way. It's our most hands-on outreach format and consistently produces a few future club members each cycle." },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  
  // Separate Refs for independent DOM mapping
  const eventsCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const outreachCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const stRef = useRef<ScrollTrigger | null>(null);
  const modeRef = useRef<Mode>("events");
  const introDoneRef = useRef(false);
  const isSwappingRef = useRef(false);

  // Modal & Carousel States
  const [mode, setMode] = useState<Mode>("events");
  const [introDone, setIntroDone] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DeckItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next');

  // Refs for tracking animation state
  const flippedRef = useRef<boolean[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevEventId = useRef<string | null>(null);
  const isSlideAnimating = useRef(false);
  const activeList = mode === "events" ? events : outreach;
  
  const baseShadow = "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.75), 8px 10px 20px rgba(0,0,0,0.55)";
  const glowShadow = `${baseShadow}, 0 0 40px rgba(255,255,255,0.12), 0 0 90px rgba(255,255,255,0.07), 0 0 160px rgba(200,220,255,0.05)`;

  const getGridPositions = useCallback((count: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offsetX = Math.min(vw * 0.32, Math.max(vw / 2 - 160, 200));
    const offsetY = Math.min(vh * 0.30, Math.max(vh / 2 - 140, 150));

    if (count === 3) {
      return [
        { x: -offsetX * 0.8, y: -offsetY * 0.55 },
        { x: offsetX * 0.8, y: -offsetY * 0.55 },
        { x: 0, y: offsetY * 0.65 },
      ];
    }

    return [
      { x: -offsetX, y: -offsetY },
      { x: offsetX, y: -offsetY },
      { x: 0, y: 0 },
      { x: -offsetX, y: offsetY },
      { x: offsetX, y: offsetY },
    ];
  }, []);

  const prepStack = useCallback((cards: HTMLDivElement[]) => {
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
  }, [baseShadow]);

  const revealCards = useCallback((cards: HTMLDivElement[], direction: "left" | "right" = "left") => {
    const positions = getGridPositions(cards.length);
    const vw = window.innerWidth;
    const startX = direction === "left" ? vw * 0.92 : -vw * 0.92;
    const tl = gsap.timeline({ onComplete: () => { isSwappingRef.current = false; } });

    cards.forEach((card, i) => {
      const pos = positions[i];
      const t = (cards.length - 1 - i) * 0.07;
      gsap.set(card, { x: startX, y: pos.y, rotateX: 0, scale: 0.86, opacity: 1, zIndex: i + 1, pointerEvents: "auto" });
      
      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");
      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (styledBg) gsap.set(styledBg, { opacity: 0, boxShadow: baseShadow });
      if (highlights) gsap.set(highlights, { opacity: 0 });
      if (inner) gsap.set(inner, { opacity: 0 });

      tl.to(card, { x: pos.x, y: pos.y, scale: 1, duration: 0.42, ease: "power3.out" }, t);
      tl.to(card, { y: pos.y + 8, duration: 0.06, ease: "power1.out" }, t + 0.36);
      tl.to(card, { y: pos.y, duration: 0.06, ease: "power1.in" }, t + 0.42);
      if (styledBg) {
        tl.to(styledBg, { opacity: 1, duration: 0.16, ease: "power2.inOut" }, t + 0.08);
        tl.to(styledBg, { boxShadow: glowShadow, duration: 0.28, ease: "power2.out" }, t + 0.26);
      }
      if (highlights) tl.to(highlights, { opacity: 1, duration: 0.16 }, t + 0.12);
      if (inner) tl.to(inner, { opacity: 1, duration: 0.14, ease: "power1.out" }, t + 0.22);
      if (flash) tl.fromTo(flash, { opacity: 0.75 }, { opacity: 0, duration: 0.14, ease: "power2.out" }, t + 0.26);
    });
  }, [baseShadow, getGridPositions, glowShadow]);

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
    if (isSlideAnimating.current || !selectedEvent) return;
    setSlideDir('next');
    const currentIndex = activeList.findIndex(ev => ev.id === selectedEvent.id);
    setSelectedEvent(activeList[(currentIndex + 1) % activeList.length]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSlideAnimating.current || !selectedEvent) return;
    setSlideDir('prev');
    const currentIndex = activeList.findIndex(ev => ev.id === selectedEvent.id);
    setSelectedEvent(activeList[(currentIndex - 1 + activeList.length) % activeList.length]);
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
        if (slide.dataset.id === incomingId) gsap.set(slide, { x: "0%", autoAlpha: 1 });
        else gsap.set(slide, { autoAlpha: 0 });
      });
      prevEventId.current = incomingId;
      return;
    }

    if (incomingNode && outgoingNode) {
      isSlideAnimating.current = true;
      const xInStart = slideDir === 'next' ? "100%" : "-100%";
      const xOutEnd = slideDir === 'next' ? "-100%" : "100%";

      gsap.set(incomingNode, { x: xInStart, autoAlpha: 1 });
      gsap.to(outgoingNode, { x: xOutEnd, duration: 0.6, ease: "power3.inOut", onComplete: () => gsap.set(outgoingNode, { autoAlpha: 0 }) });
      gsap.to(incomingNode, { x: "0%", duration: 0.6, ease: "power3.inOut", onComplete: () => { isSlideAnimating.current = false; } });
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

    // Use only the primary events set to anchor the scrub timeline
    const cards = eventsCardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    flippedRef.current = cards.map(() => false);
    prepStack(cards);

    gsap.set(title, { zIndex: 10, opacity: 1, y: 0 });
    if (toggleRef.current) gsap.set(toggleRef.current, { opacity: 0, y: 12, pointerEvents: "none" });

    const tl = gsap.timeline({ paused: true });
    tl.to(title, { opacity: 0, y: -28, duration: 0.08, ease: "power2.in" }, 0.12);

    const peelOrder = [...cards.keys()].reverse();
    peelOrder.forEach((cardIdx, peelStep) => {
      const card = cards[cardIdx];
      const pos = getGridPositions(cards.length)[cardIdx];
      const t = 0.2 + peelStep * 0.16;
      
      const depth = cards.length - 1 - cardIdx;
      const startY = depth * 12;

      // Safe scrub fix: Use tl.set and absolute positional calculations
      tl.set(card, { zIndex: 20 + cardIdx }, t);
      tl.to(card, { rotateX: 18, y: startY - 60, duration: 0.06, ease: "power2.in" }, t);
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

    if (toggleRef.current) {
      tl.to(toggleRef.current, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.12, ease: "power2.out" }, 0.96);
    }

    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      scrub: 1.2,
      pin: pin,
      anticipatePin: 1,
      animation: tl,
      onUpdate: (self) => {
        if (self.progress > 0.94 && !introDoneRef.current) {
          introDoneRef.current = true;
          setIntroDone(true);
        }

        // ── Reverse: Fade outreach and let events scrub naturally ──────
        if (self.direction < 0 && introDoneRef.current && modeRef.current !== "events" && !isSwappingRef.current) {
          isSwappingRef.current = true;
          const outreachCards = outreachCardsRef.current.filter(Boolean) as HTMLDivElement[];
          const vw = window.innerWidth;
          
          gsap.to(outreachCards, {
            x: vw * 0.92,
            scale: 0.84,
            opacity: 0,
            duration: 0.28,
            stagger: 0.04,
            ease: "power3.in",
            onComplete: () => {
              modeRef.current = "events";
              if (labelRef.current) labelRef.current.textContent = "SYSTEM.LOGS // EVENTS";
              setSelectedEvent(null);
              
              // Snap the permanent events DOM nodes back to spread layout. 
              // Because we didn't unmount them, GSAP will scrub them beautifully.
              const eventsCards = eventsCardsRef.current.filter(Boolean) as HTMLDivElement[];
              const positions = getGridPositions(eventsCards.length);
              
              eventsCards.forEach((card, i) => {
                const pos = positions[i];
                gsap.set(card, { x: pos.x, y: pos.y, scale: 1, rotateX: 0, opacity: 1, zIndex: i + 1, pointerEvents: "auto" });
                const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
                const highlights = card.querySelector<HTMLElement>(".ev-highlights");
                const inner = card.querySelector<HTMLElement>(".ev-inner");
                if (styledBg) gsap.set(styledBg, { opacity: 1, boxShadow: glowShadow });
                if (highlights) gsap.set(highlights, { opacity: 1 });
                if (inner) gsap.set(inner, { opacity: 1 });
              });

              isSwappingRef.current = false;
              setMode("events");
            },
          });
        }

        if (self.progress < 0.06 && introDoneRef.current) {
          introDoneRef.current = false;
          isSwappingRef.current = false;
          flippedRef.current = cards.map(() => false);
          setIntroDone(false);
          setSelectedEvent(null);
        }

        if (!self.isActive || self.direction < 0) return;
        peelOrder.forEach((cardIdx, peelStep) => {
          const t = 0.2 + peelStep * 0.16;
          const landTime = t + 0.3;
          if (tl.time() >= landTime && !flippedRef.current[cardIdx]) {
            flippedRef.current[cardIdx] = true;
            if (events[cardIdx]?.id === "MODULE_01") {
              const hintFlipper = eventsCardsRef.current[cardIdx]?.querySelector(".ev-hint-flipper");
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
        if (!introDoneRef.current) return;
        // Check whichever deck is currently active
        const activeNodes = modeRef.current === "events" ? eventsCardsRef.current : outreachCardsRef.current;
        const validCards = activeNodes.filter(Boolean) as HTMLDivElement[];
        const pos = getGridPositions(validCards.length);
        validCards.forEach((card, cardIdx) => {
          const currentX = gsap.getProperty(card, "x") as number;
          if (Math.abs(currentX) > 10) gsap.set(card, { x: pos[cardIdx].x, y: pos[cardIdx].y });
        });
      },
    });

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      tl.kill();
    };
  }, [getGridPositions, prepStack, glowShadow]);

  const handleToggle = (nextMode: Mode) => {
    if (nextMode === mode || !introDoneRef.current || isSwappingRef.current) return;

    isSwappingRef.current = true;
    
    // Determine which deck flies out and which flies in
    const outgoingCards = (mode === "events" ? eventsCardsRef : outreachCardsRef).current.filter(Boolean) as HTMLDivElement[];
    const incomingCards = (nextMode === "events" ? eventsCardsRef : outreachCardsRef).current.filter(Boolean) as HTMLDivElement[];
    
    const vw = window.innerWidth;
    const direction = nextMode === "outreach" ? "left" : "right";
    const xOut = direction === "left" ? -vw * 0.92 : vw * 0.92;

    if (toggleRef.current) gsap.fromTo(toggleRef.current, { scale: 1 }, { scale: 0.97, repeat: 1, yoyo: true, duration: 0.08 });

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: 0,
        duration: 0.14,
        onComplete: () => {
          if (labelRef.current) labelRef.current.textContent = nextMode === "events" ? "SYSTEM.LOGS // EVENTS" : "SYSTEM.LOGS // OUTREACH";
          gsap.to(labelRef.current, { opacity: 1, duration: 0.2 });
        },
      });
    }

    // Disable pointers on outgoing immediately
    outgoingCards.forEach(c => c.style.pointerEvents = 'none');

    gsap.to(outgoingCards, {
      x: xOut,
      scale: 0.84,
      opacity: 0,
      duration: 0.34,
      stagger: 0.045,
      ease: "power3.in",
      onComplete: () => {
        prevEventId.current = null;
        setSelectedEvent(null);
        setMode(nextMode);
        modeRef.current = nextMode;
        
        revealCards(incomingCards, direction);
      },
    });
  };

  // Helper for duplicate card JSX
  const renderCardContent = (ev: DeckItem, isOutreach: boolean) => (
    <div className="ev-hint-flipper relative w-full h-full [transform-style:preserve-3d]">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[4px]" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 18px 18px" }}>
          <div className="ev-styled-bg absolute rounded-[4px] pointer-events-none" style={{ top: -1, right: -1, bottom: -1, left: -1, background: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)), rgba(28,30,34,0.95)`, backgroundSize: '18px 18px, 18px 18px, auto, auto', border: '1px solid rgba(235,238,242,0.28)' }} />
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
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] rounded-[4px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="relative w-full h-full flex flex-col">
            <img src={ev.img} alt={ev.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="font-mono text-white text-[10px] tracking-[0.2em] border border-white/40 px-5 py-2.5 backdrop-blur-sm rounded bg-black/30">
                {isOutreach ? "VIEW OUTREACH" : "VIEW EVENT"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-[#0d0d0d]">
      <div ref={pinRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden">
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
          <span ref={labelRef} style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
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
            
            {/* Events Deck - Always in DOM, bound to GSAP scrub */}
            {events.map((ev, i) => (
              <div
                key={`evt-${ev.id}`}
                ref={(el) => { eventsCardsRef.current[i] = el; }}
                className="absolute inset-0 select-none overflow-visible rounded-[4px] group cursor-pointer"
                style={{ willChange: "transform, box-shadow", color: "#f1f3f5", perspective: "1000px", pointerEvents: mode === "events" ? "auto" : "none" }}
                onClick={() => setSelectedEvent(ev)}
              >
                {renderCardContent(ev, false)}
              </div>
            ))}

            {/* Outreach Deck - Always in DOM, toggled via handleToggle */}
            {outreach.map((ev, i) => (
              <div
                key={`out-${ev.id}`}
                ref={(el) => { outreachCardsRef.current[i] = el; }}
                className="absolute inset-0 select-none overflow-visible rounded-[4px] group cursor-pointer"
                style={{ willChange: "transform, box-shadow", color: "#f1f3f5", perspective: "1000px", opacity: 0, pointerEvents: mode === "outreach" ? "auto" : "none" }}
                onClick={() => setSelectedEvent(ev)}
              >
                {renderCardContent(ev, true)}
              </div>
            ))}

          </div>

          <div
            ref={toggleRef}
            className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-[4px] border border-white/15 bg-black/55 p-1 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur-md"
            style={{ bottom: "8%", boxShadow: "0 0 24px rgba(79,174,243,0.12)" }}
          >
            <button
              type="button"
              onClick={() => handleToggle("events")}
              className="rounded-[3px] px-4 py-2 transition-colors"
              style={{ color: mode === "events" ? "#050505" : "rgba(255,255,255,0.5)", background: mode === "events" ? "#4FAEF3" : "transparent" }}
            >
              EVENTS
            </button>
            <button
              type="button"
              onClick={() => handleToggle("outreach")}
              className="rounded-[3px] px-4 py-2 transition-colors"
              style={{ color: mode === "outreach" ? "#050505" : "rgba(255,255,255,0.5)", background: mode === "outreach" ? "#4FAEF3" : "transparent" }}
            >
              OUTREACH
            </button>
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
          <div
            className="relative w-full max-w-4xl h-[90vh] sm:h-[88vh] max-h-[760px] mx-0 md:mx-20"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: isClosing ? 'ev-modal-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'ev-modal-entry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <button className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-[#4FAEF3] hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 hover:border-[#4FAEF3]/60 backdrop-blur-md shadow-lg" onClick={handlePrev}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <button className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-[#4FAEF3] hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 hover:border-[#4FAEF3]/60 backdrop-blur-md shadow-lg" onClick={handleNext}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute inset-0 bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl shadow-[#4FAEF3]/15 overflow-hidden">
              <span className="absolute z-40 pointer-events-none" style={{ top: 10, left: 10, width: 22, height: 22, borderTop: '2px solid rgba(79,174,243,0.8)', borderLeft: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />
              <span className="absolute z-40 pointer-events-none" style={{ top: 10, right: 10, width: 22, height: 22, borderTop: '2px solid rgba(79,174,243,0.8)', borderRight: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />
              <span className="absolute z-40 pointer-events-none" style={{ bottom: 10, left: 10, width: 22, height: 22, borderBottom: '2px solid rgba(79,174,243,0.8)', borderLeft: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />
              <span className="absolute z-40 pointer-events-none" style={{ bottom: 10, right: 10, width: 22, height: 22, borderBottom: '2px solid rgba(79,174,243,0.8)', borderRight: '2px solid rgba(79,174,243,0.8)', filter: 'drop-shadow(0 0 6px rgba(79,174,243,0.45))' }} />

              <button className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-[#4FAEF3] active:scale-90 transition-all duration-200 ease-out border border-white/10 hover:border-[#4FAEF3]/50 backdrop-blur-md" onClick={handleCloseModal}>
                ✕
              </button>

              <div className="relative w-full h-full" ref={carouselRef}>
                {activeList.map((ev) => (
                  <div key={ev.id} data-id={ev.id} className="ev-slide-item absolute inset-0 w-full h-full flex flex-col invisible">
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
                        {ev.type} {"//"} {ev.date}
                      </h3>
                      <div className="w-full h-[1px] bg-gradient-to-r from-[#4FAEF3]/30 via-white/10 to-transparent mb-6" />
                      <div className="space-y-4 md:space-y-5 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="font-mono text-xs md:text-sm text-white/90 leading-relaxed">{ev.desc}</p>
                        <p className="font-mono text-[10px] md:text-xs text-white/65 leading-relaxed">{ev.details}</p>
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