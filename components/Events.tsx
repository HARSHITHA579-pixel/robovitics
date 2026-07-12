"use client";

import type { CSSProperties } from "react";
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
  imgTransform?: string;
};

type Mode = "events" | "outreach";

const DESKTOP_SCROLL_UNITS = 1.85;

const events: DeckItem[] = [
  { id: "MODULE_03", name: "MACHINE DESIGN", type: "FUSION 360 WORKSHOP", date: "PRE-GRAVITAS 2025 · 150 ATTENDEES", desc: "Hands-on CAD across modeling, joints, rendering, and simulation — plus real-time physics in PyBullet.", status: "OPEN", img: "/md.png", details: "A two-day deep dive into Fusion 360 held on 23–24 Sept 2025, covering 2D/3D modeling, joint assembly, animation, rendering, and simulation. Participants were introduced to PyBullet, a real-time physics engine, to test and validate their digital models against motion, collisions, and constraints. Practical, beyond-curriculum design projects sharpened both technical skill and industry readiness." },
  { id: "MODULE_02", name: "HANDS ON ROBOTICS", type: "WORKSHOP · HARDWARE + SOFTWARE", date: "PRE-GRAVITAS 2025 · 240+ ATTENDEES", desc: "Two days, zero prior experience needed. Sensors, microcontrollers, MicroPython, and live WebSocket-controlled robots.", status: "OPEN", img: "/hands-on.png", imgTransform: "rotate(-4deg) scale(1.12)", details: "Sponsored by Module143 and run on 22–23 Sept 2025, this two-day workshop took ~240 students from zero to building functional robotic systems. Sessions covered sensors, microcontrollers, and IoT-enabled devices, alongside MicroPython for efficient firmware. Participants also built web-based control systems using real-time communication and WebSocket integration — bridging embedded hardware, firmware, and browser-based control in one working pipeline." },
  { id: "MODULE_01", name: "ROBOWARS", type: "COMBAT ROBOTICS", date: "FLAGSHIP · GRAVITAS 2025", desc: "3 weight classes. ₹3L prize pool. One of India's largest combat arenas — Team Orcus fought across all categories.", status: "FLAGSHIP", img: "/robowars.png", details: "Held 26–28 Sept 2025 and sponsored by Siemens and Analog Devices, RoboWars brought elite teams from across the country into one of India's largest and safest combat robotics arenas. Matches spanned 8kg, 15kg, and 60kg weight categories, testing mechanical design, electronics, and strategy under pressure. Our own Team Orcus competed in every category. Winners: Team Dot Robotics (8kg), Team Black Diamonds (15kg), and Team Shadow (60kg)." },
  { id: "MODULE_04", name: "VORTEX 360", type: "72H CAD DESIGN-A-THON", date: "POWERED BY AUTODESK · FEB 2025", desc: "~1,300 participants. 3 days, real-world problem tracks, ₹1L prize pool, and direct access to Autodesk experts.", status: "FLAGSHIP", img: "/vortex1.png", imgTransform: "rotate(4.5deg) scale(1.15)", details: "A 72-hour CAD modeling design-a-thon sponsored by Autodesk, drawing nearly 1,300 students in teams of 3–5. Day 1 focused on problem understanding and brainstorming, Day 2 on refining designs and prototyping in Fusion 360, and Day 3 on final pitches before judges and industry experts. Beyond the ₹1L prize pool, the event offered direct networking with Autodesk professionals and industry leaders." },
  { id: "MODULE_05", name: "CRUISE THE WEB3VERSE", type: "WEB3 EVENT", date: "YANTRA EVENT · 2 DAYS", desc: "A two-day dive into Web3 concepts and tooling, closing out with a live auction finale.", status: "UPCOMING", img: "/web3verse.png", details: "A two-day Web3-focused event exploring decentralized concepts and tooling, designed for curious builders and newcomers alike. The event culminated in a live auction, turning theory into a tangible, competitive finale that brought the whole cohort together for one last high-energy session." },
  { id: "MODULE_06", name: "EQUINOX", type: "60-HOUR HACKATHON", date: "SMART INFRASTRUCTURE · 100+ TEAMS", desc: "A flagship 60-hour hackathon bringing innovators together to build and solve problems around Smart Infrastructure.", status: "COMPLETED", img: "/equinox.jpeg", details: "Equinox challenged participants to transform ideas into impactful solutions through an intense multi-stage hackathon experience. From healthcare and cybersecurity to smart homes and road safety, teams developed innovative projects while competing through rigorous evaluation rounds. The event culminated in live final pitches by the top teams, celebrating creativity, technical excellence, and the spirit of innovation that defines RoboVITics." },
];

const outreach: DeckItem[] = [
  { id: "FIELD_01", name: "KARTAVYA", type: "HANDS-ON ELECTRONICS // STEM OUTREACH", date: "IGNITING YOUNG MINDS", desc: "Introducing young students to the world of electronics through immersive, activity-based learning experiences.", status: "COMPLETED", img: "/Kartavya.png", details: "Students built and tested series and parallel circuits using real components, transforming classroom concepts into hands-on engineering experiences. Through experimentation and collaborative problem-solving, they developed a deeper understanding of electrical systems while nurturing curiosity and interest in STEM." },
  { id: "FIELD_02", name: "UDDESHYA", type: "CYBER AWARENESS // DIGITAL SAFETY", date: "EMPOWERING YOUNG USERS", desc: "A cybersecurity outreach initiative focused on helping students navigate the digital world safely and responsibly.", status: "COMPLETED", img: "/Uddeshya.png", imgTransform: "rotate(4.65deg) scale(1.15)", details: "Through engaging discussions and real-world examples, students explored concepts such as phishing, malware, and social engineering. The sessions promoted cyber awareness, responsible internet usage, and safe digital practices among young learners." },
  { id: "FIELD_03", name: "JIGYASA", type: "CURIOSITY IN ACTION", date: "DISCOVER • EXPLORE • INNOVATE", desc: "An interactive STEM outreach program designed to spark curiosity and encourage exploration through hands-on learning.", status: "COMPLETED", img: "/jigyasa.png", details: "Students engaged in demonstrations, activities, and discussions that connected classroom concepts with real-world technology. The initiative fostered creativity, critical thinking, and a lasting enthusiasm for innovation and problem-solving." },
];

function EventsBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      {([[8, 9], [66, 14], [15, 58], [80, 47], [44, 78]] as [number, number][]).map(([lp, tp], i) => (
        <div key={i} className="pointer-events-none absolute rounded-full bg-white/25" style={{ left: `${lp}%`, top: `${tp}%`, width: 5, height: 5, boxShadow: '0 0 6px rgba(255,255,255,0.15)' }} />
      ))}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="8%" y1="9%" x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="66%" y1="14%" x2="80%" y2="47%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="15%" y1="58%" x2="44%" y2="78%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>
    </>
  );
}

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const eventsCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const outreachCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stRef = useRef<ScrollTrigger | null>(null);
  const modeRef = useRef<Mode>("events");
  const introDoneRef = useRef(false);
  const isSwappingRef = useRef(false);

  const [mode, setMode] = useState<Mode>("events");
  const [, setIntroDone] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DeckItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next');
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileSlideDir, setMobileSlideDir] = useState<'next' | 'prev'>('next');

  const flippedRef = useRef<boolean[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const mobileTouchStartX = useRef<number | null>(null);
  const mobileDidSwipe = useRef(false);
  const prevEventId = useRef<string | null>(null);
  const prevMobileEventId = useRef<string | null>(null);
  const isSlideAnimating = useRef(false);
  const isMobileSlideAnimating = useRef(false);
  const activeList = mode === "events" ? events : outreach;

  const baseShadow = "none";
  const glowShadow = "none";

  const getGridPositions = useCallback((count: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offsetX = Math.min(vw * 0.28, Math.max(vw / 2 - 160, 180));
    const offsetY = Math.min(vh * 0.22, Math.max(vh / 2 - 160, 120));

    if (count === 6) {
      const cardW = 270;
      const cardH = 195;
      const colGap = 90;
      const rowGap = 80;

      const maxOx = Math.max(vw / 2 - cardW / 2 - 30, 200);
      const ox = Math.min(cardW + colGap, maxOx);
      const oy = (cardH + rowGap) / 2;

      return [
        { x: -ox, y: -oy },
        { x: 0, y: -oy },
        { x: ox, y: -oy },
        { x: -ox, y: oy },
        { x: 0, y: oy },
        { x: ox, y: oy },
      ];
    }

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
      gsap.set(card, { x: startX, y: pos.y, rotateX: 0, scale: 0.86, opacity: 1, zIndex: i + 1, pointerEvents: "auto" });

      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");
      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (styledBg) gsap.set(styledBg, { opacity: 0, boxShadow: baseShadow });
      if (highlights) gsap.set(highlights, { opacity: 0 });
      if (inner) gsap.set(inner, { opacity: 0 });

      const t = i * 0.018;
      tl.to(card, { x: pos.x, y: pos.y, scale: 1, duration: 0.44, ease: "power3.out" }, t);
      tl.to(card, { y: pos.y + 8, duration: 0.06, ease: "power1.out" }, t + 0.38);
      tl.to(card, { y: pos.y, duration: 0.06, ease: "power1.in" }, t + 0.44);

      if (styledBg) {
        tl.to(styledBg, { opacity: 1, duration: 0.18, ease: "power2.inOut" }, t + 0.10);
        tl.to(styledBg, { boxShadow: glowShadow, duration: 0.28, ease: "power2.out" }, t + 0.28);
      }
      if (highlights) tl.to(highlights, { opacity: 1, duration: 0.16 }, t + 0.14);
      if (inner) tl.to(inner, { opacity: 1, duration: 0.14, ease: "power1.out" }, t + 0.24);
      if (flash) tl.fromTo(flash, { opacity: 0.75 }, { opacity: 0, duration: 0.14, ease: "power2.out" }, t + 0.28);
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

  const goMobileCard = (direction: 'next' | 'prev') => {
    if (isMobileSlideAnimating.current) return;
    setMobileSlideDir(direction);
    setMobileIndex((current) => {
      const delta = direction === 'next' ? 1 : -1;
      return (current + delta + activeList.length) % activeList.length;
    });
  };

  const goMobileIndex = (nextIndex: number) => {
    if (isMobileSlideAnimating.current || nextIndex === mobileIndex) return;
    setMobileSlideDir(nextIndex > mobileIndex ? 'next' : 'prev');
    setMobileIndex(nextIndex);
  };

  const handleMobileTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    mobileTouchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleMobileTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (mobileTouchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? mobileTouchStartX.current;
    const deltaX = endX - mobileTouchStartX.current;
    mobileTouchStartX.current = null;

    if (Math.abs(deltaX) < 42) return;
    mobileDidSwipe.current = true;
    goMobileCard(deltaX < 0 ? 'next' : 'prev');
    window.setTimeout(() => {
      mobileDidSwipe.current = false;
    }, 250);
  };

  useEffect(() => {
    if (!mobileCarouselRef.current) return;
    const incomingId = activeList[mobileIndex]?.id;
    if (!incomingId) return;

    const outgoingId = prevMobileEventId.current;
    const slides = Array.from(mobileCarouselRef.current.querySelectorAll('.ev-mobile-slide-item')) as HTMLElement[];
    const incomingNode = slides.find(el => el.dataset.id === incomingId);
    const outgoingNode = slides.find(el => el.dataset.id === outgoingId);

    if (!outgoingId || outgoingId === incomingId || !incomingNode || !outgoingNode) {
      slides.forEach(slide => {
        if (slide.dataset.id === incomingId) gsap.set(slide, { x: "0%", autoAlpha: 1 });
        else gsap.set(slide, { autoAlpha: 0 });
      });
      prevMobileEventId.current = incomingId;
      return;
    }

    isMobileSlideAnimating.current = true;
    const xInStart = mobileSlideDir === 'next' ? "100%" : "-100%";
    const xOutEnd = mobileSlideDir === 'next' ? "-100%" : "100%";

    gsap.set(incomingNode, { x: xInStart, autoAlpha: 1 });
    gsap.to(outgoingNode, {
      x: xOutEnd,
      duration: 0.36,
      ease: "power2.out",
      onComplete: () => gsap.set(outgoingNode, { autoAlpha: 0 }),
    });
    gsap.to(incomingNode, {
      x: "0%",
      duration: 0.36,
      ease: "power2.out",
      onComplete: () => { isMobileSlideAnimating.current = false; },
    });
    prevMobileEventId.current = incomingId;
  }, [activeList, mobileIndex, mobileSlideDir]);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(min-width: 768px)").matches) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const title = titleRef.current;
    const deck = deckRef.current;
    if (!section || !pin || !title || !deck) return;

    const cards = eventsCardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    flippedRef.current = cards.map(() => false);
    prepStack(cards);

    gsap.set(title, { zIndex: 10, opacity: 1, y: 0 });
    if (toggleRef.current) gsap.set(toggleRef.current, { opacity: 0, y: 12 });

    const syncToggleInteractivity = () => {
      if (!toggleRef.current) return;
      const opacity = gsap.getProperty(toggleRef.current, "opacity") as number;
      const ready = opacity > 0.15;
      toggleRef.current.style.pointerEvents = ready ? "auto" : "none";
      if (ready && !introDoneRef.current) {
        introDoneRef.current = true;
        setIntroDone(true);
      }
    };

    const tl = gsap.timeline({ paused: true });
    tl.to(title, { opacity: 0, y: -28, duration: 0.16, ease: "sine.inOut" }, 0.08);

    const topRow = [0, 1, 2];
    const bottomRow = [3, 4, 5];
    [...topRow, ...bottomRow].forEach((cardIdx) => {
      const card = cards[cardIdx];
      const pos = getGridPositions(cards.length)[cardIdx];
      const t = topRow.includes(cardIdx) ? 0.2 : 0.38;
      const depth = cards.length - 1 - cardIdx;
      const startY = depth * 12;

      tl.set(card, { zIndex: 20 + cardIdx }, t);
      tl.to(card, { rotateX: 10, y: startY - 36, duration: 0.12, ease: "sine.inOut" }, t);
      tl.to(card, { x: pos.x, y: pos.y, rotateX: 0, scale: 1, duration: 0.3, ease: "sine.inOut" }, t + 0.06);

      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");

      if (styledBg) {
        tl.to(styledBg, { opacity: 1, duration: 0.2, ease: "sine.inOut" }, t + 0.04);
        tl.to(styledBg, { boxShadow: glowShadow, duration: 0.3, ease: "sine.out" }, t + 0.2);
      }
      if (highlights) tl.to(highlights, { opacity: 1, duration: 0.18, ease: "sine.out" }, t + 0.08);
      if (inner) tl.to(inner, { opacity: 1, duration: 0.16, ease: "sine.out" }, t + 0.2);

      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (flash) tl.fromTo(flash, { opacity: 0.7 }, { opacity: 0, duration: 0.18, ease: "sine.out" }, t + 0.2);
    });

    if (toggleRef.current) {
      tl.to(toggleRef.current, { opacity: 1, y: 0, duration: 0.16, ease: "sine.out" }, 0.67);
    }

    tl.to({}, { duration: 0.06 });

    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * DESKTOP_SCROLL_UNITS}`,
      scrub: 0.85,
      animation: tl,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        syncToggleInteractivity();

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
          if (toggleRef.current) toggleRef.current.style.pointerEvents = "none";
        }

        if (!self.isActive || self.direction < 0) return;

        const landTime = 0.38 + 0.3;
        if (tl.time() >= landTime) {
          cards.forEach((card, cardIdx) => {
            if (!flippedRef.current[cardIdx]) {
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
        }
      },
      onRefresh: () => {
        syncToggleInteractivity();
        if (!introDoneRef.current) return;
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
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] rounded-[4px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", transform: "rotateY(180deg) translateZ(1px)" }}>
          <div className="relative w-full h-full flex flex-col">
            <div className="absolute inset-0 w-full h-full" style={{ transform: ev.imgTransform }}>
              <img src={ev.img} alt={ev.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>
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

  const renderMobileCard = (ev: DeckItem, isOutreach: boolean) => (
    <button
      key={`mobile-${ev.id}`}
      type="button"
      onClick={() => {
        if (mobileDidSwipe.current) return;
        setSelectedEvent(ev);
      }}
      className="rv-card-surface rv-card-surface--lifted group h-full w-full text-left"
    >
      <div className="rv-card-content">
        <div className="relative h-28 overflow-hidden border-b border-[#4FAEF3]/20 bg-[#0b0c0d]">
          <div className="absolute inset-0 w-full h-full" style={{ transform: ev.imgTransform }}>
            <img src={ev.img} alt={ev.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} style={{ transform: 'translateZ(0)' }} />
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{ev.id}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">{isOutreach ? "Outreach" : "Event"}</span>
          </div>
          <h3 className="font-sans text-xl font-black uppercase leading-tight tracking-[0.03em] text-white">
            {ev.name}
          </h3>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4FAEF3]/90">
            {ev.type}
          </p>
          <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-[#4FAEF3]/40 to-transparent" />
          <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-white/75">
            {ev.desc}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">{ev.date}</span>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-[#4FAEF3]">Details</span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <>
      <section id="events-mobile" className="relative overflow-hidden bg-[#0d0d0d] px-4 py-24 md:hidden">
        <EventsBackground />

        <div className="relative z-10">
          <span className="rv-section-log">
            <span className="rv-section-log-number">04.</span>
            SYSTEM.LOGS // EVENTS
          </span>

          <div className="rv-section-header mt-10">
            <span className="rv-section-kicker">
              ▶ SECTOR_MAP // EVENTS
            </span>
            <h2
              className="rv-section-title"
              style={{ '--rv-section-title-mobile': 'clamp(34px, 9.6vw, 42px)' } as CSSProperties}
            >
              EVENTS AT <span className="text-[#4FAEF3]">ROBOVITICS</span>
            </h2>
            <div className="rv-section-rule" />
          </div>

          <div className="rv-segmented-toggle rv-segmented-toggle--compact sticky top-[76px] z-30 mx-auto mt-8">
            <button
              type="button"
              onClick={() => {
                setMode("events");
                setMobileIndex(0);
                isMobileSlideAnimating.current = false;
                prevMobileEventId.current = null;
              }}
              className={`rv-segmented-toggle__item ${mode === "events" ? "rv-segmented-toggle__item--active" : ""}`}
            >
              Events
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("outreach");
                setMobileIndex(0);
                isMobileSlideAnimating.current = false;
                prevMobileEventId.current = null;
              }}
              className={`rv-segmented-toggle__item ${mode === "outreach" ? "rv-segmented-toggle__item--active" : ""}`}
            >
              Outreach
            </button>
          </div>

          <div
            className="mt-7"
            onTouchStart={handleMobileTouchStart}
            onTouchEnd={handleMobileTouchEnd}
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              <span>{String(mobileIndex + 1).padStart(2, '0')} / {String(activeList.length).padStart(2, '0')}</span>
              <span>Swipe to browse</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous event"
                onClick={() => goMobileCard('prev')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/65 backdrop-blur-sm transition-colors active:bg-white/10"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div ref={mobileCarouselRef} className="relative h-[380px] min-w-0 flex-1 overflow-hidden">
                {activeList.map((ev) => (
                  <div
                    key={`mobile-slide-${ev.id}`}
                    data-id={ev.id}
                    className="ev-mobile-slide-item invisible absolute inset-0"
                  >
                    {renderMobileCard(ev, mode === "outreach")}
                  </div>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next event"
                onClick={() => goMobileCard('next')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/65 backdrop-blur-sm transition-colors active:bg-white/10"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {activeList.map((ev, index) => (
                <button
                  key={`dot-${ev.id}`}
                  type="button"
                  aria-label={`Show ${ev.name}`}
                  onClick={() => goMobileIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${index === mobileIndex ? 'w-7 bg-[#4FAEF3]' : 'w-1.5 bg-white/25'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="events"
        ref={sectionRef}
        className="relative hidden bg-[#0d0d0d] md:block"
        style={{ height: `calc(100vh + ${DESKTOP_SCROLL_UNITS * 100}vh)` }}
      >
        <span id="events-desktop" className="pointer-events-none absolute top-[260vh] h-px w-px" aria-hidden="true" />
        <div ref={pinRef} className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <EventsBackground />

          <div className="absolute z-20 pointer-events-none" style={{ top: '10%', left: '6%' }}>
            <span ref={labelRef} className="rv-section-log">
              <span className="rv-section-log-number">04.</span>
              SYSTEM.LOGS // EVENTS
            </span>
          </div>

          <div style={{ perspective: "1100px", perspectiveOrigin: "50% 50%", position: "relative", width: "100vw", height: "100vh" }}>
            <div ref={titleRef} className="rv-section-header absolute inset-0 justify-center" style={{ zIndex: 10, top: '-6%' }}>
              <span className="rv-section-kicker">
                ▶ SECTOR_MAP // EVENTS
              </span>
              <h2 className="rv-section-title" style={{ '--rv-section-title-desktop': 'clamp(32px, 5.5vw, 72px)' } as CSSProperties}>
                EVENTS AT <span style={{ color: '#4FAEF3', fontWeight: 900 }}>ROBOVITICS</span>
              </h2>
              <div className="rv-section-rule" />
            </div>

            <div ref={deckRef} className="absolute" style={{ width: 270, height: 195, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

              {/* Events Deck - Always in DOM, bound to GSAP scrub */}
              {events.map((ev, i) => (
                <div
                  key={`evt-${ev.id}`}
                  ref={(el) => { eventsCardsRef.current[i] = el; }}
                  className="absolute inset-0 select-none overflow-visible rounded-[4px] group cursor-pointer"
                  style={{ color: "#f1f3f5", perspective: "1000px", pointerEvents: mode === "events" ? "auto" : "none", transform: "translateZ(0)" }}
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
                  style={{ color: "#f1f3f5", perspective: "1000px", opacity: 0, pointerEvents: mode === "outreach" ? "auto" : "none", transform: "translateZ(0)" }}
                  onClick={() => setSelectedEvent(ev)}
                >
                  {renderCardContent(ev, true)}
                </div>
              ))}

            </div>

            <div
              ref={toggleRef}
              className="rv-segmented-toggle rv-segmented-toggle--compact absolute left-1/2 z-40 -translate-x-1/2 pointer-events-none"
              style={{ bottom: "8%", boxShadow: "0 0 24px rgba(79,174,243,0.12)" }}
            >
              <button
                type="button"
                onClick={() => handleToggle("events")}
                className={`rv-segmented-toggle__item cursor-pointer ${mode === "events" ? "rv-segmented-toggle__item--active" : ""}`}
              >
                EVENTS
              </button>
              <button
                type="button"
                onClick={() => handleToggle("outreach")}
                className={`rv-segmented-toggle__item cursor-pointer ${mode === "outreach" ? "rv-segmented-toggle__item--active" : ""}`}
              >
                OUTREACH
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/65 p-0 backdrop-blur-xl md:items-center md:p-8"
          style={{ animation: isClosing ? 'ev-fade-out 0.3s ease-in forwards' : 'ev-fade-in 0.3s ease-out forwards' }}
          onClick={handleCloseModal}
        >
          <div
            className="relative h-[86svh] w-full max-w-4xl mx-0 md:mx-20 md:h-[88vh] md:max-h-[760px]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: isClosing ? 'ev-modal-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'ev-modal-entry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <button className="absolute bottom-4 left-5 z-[10010] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 shadow-lg backdrop-blur-md transition-all duration-200 ease-out hover:bg-black/90 hover:text-[#4FAEF3] active:scale-90 md:-left-16 md:bottom-auto md:top-1/2 md:h-12 md:w-12 md:-translate-y-1/2 md:hover:scale-110" onClick={handlePrev}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <button className="absolute bottom-4 right-5 z-[10010] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 shadow-lg backdrop-blur-md transition-all duration-200 ease-out hover:bg-black/90 hover:text-[#4FAEF3] active:scale-90 md:-right-16 md:bottom-auto md:top-1/2 md:h-12 md:w-12 md:-translate-y-1/2 md:hover:scale-110" onClick={handleNext}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute bottom-5 left-1/2 z-[10010] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 md:hidden">
              {selectedEvent ? String(activeList.findIndex((ev) => ev.id === selectedEvent.id) + 1).padStart(2, '0') : '01'} / {String(activeList.length).padStart(2, '0')}
            </div>

            <div className="absolute inset-0 overflow-hidden rounded-t-[18px] border border-white/12 bg-[#0a0a0a] shadow-2xl shadow-black/60 md:rounded-xl md:border-white/20 md:shadow-[#4FAEF3]/15">

              <button className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-black/60 text-white/75 backdrop-blur-md transition-all duration-200 ease-out hover:bg-black/80 hover:text-[#4FAEF3] active:scale-90 md:h-8 md:w-8" onClick={handleCloseModal}>
                ✕
              </button>

              <div className="relative w-full h-full" ref={carouselRef}>
                {activeList.map((ev) => (
                  <div key={ev.id} data-id={ev.id} className="ev-slide-item absolute inset-0 w-full h-full flex flex-col invisible">
                    <div
                      className="relative h-[30%] w-full flex-shrink-0 overflow-hidden border-b border-[#4FAEF3]/20 bg-neutral-900 md:h-[48%]"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                          linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px',
                      }}
                    >
                      <div className="absolute inset-0 w-full h-full" style={{ transform: ev.imgTransform }}>
                        <img src={ev.img} alt={ev.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      </div>
                    </div>

                    <div className="relative z-10 flex min-h-0 flex-grow flex-col px-5 pb-20 pt-5 md:p-10">
                      <div className="mb-3 flex flex-wrap gap-2 md:hidden">
                        <span className="border border-[#4FAEF3]/30 bg-[#4FAEF3]/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#4FAEF3]">
                          {ev.status}
                        </span>
                        <span className="border border-white/10 bg-white/[0.035] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                          {mode === "outreach" ? "Outreach" : "Event"}
                        </span>
                      </div>
                      <h2 className="mb-2 pr-8 text-[26px] font-black uppercase leading-tight tracking-wide text-white md:pr-0 md:text-5xl" style={{ fontFamily: '"Inter", "Arial Black", sans-serif', textShadow: '0 0 26px rgba(255,255,255,0.25)' }}>
                        {ev.name}
                      </h2>
                      <h3 className="mb-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#4FAEF3]/90 md:mb-5 md:text-sm md:tracking-widest">
                        <span className="block md:inline">{ev.type}</span>
                        <span className="hidden md:inline"> {"//"} </span>
                        <span className="mt-1 block text-white/45 md:mt-0 md:inline md:text-[#4FAEF3]/90">{ev.date}</span>
                      </h3>
                      <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-[#4FAEF3]/30 via-white/10 to-transparent md:mb-6" />
                      <div className="custom-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto pr-2 md:space-y-5">
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
    </>
  );
}
