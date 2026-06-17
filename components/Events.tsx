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

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Store our own ST instances so we only kill ours
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const title = titleRef.current;
    const deck = deckRef.current;
    if (!section || !pin || !title || !deck) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== 4) return;

    // ── Viewport-relative grid positions ─────────────────────────────
    // Cards fan out to a 2×2 grid. Use vw/vh percentages of the viewport
    // so it looks right on any screen size.
    const getGridPositions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gx = vw * 0.22;  // horizontal spread from center
      const gy = vh * 0.22;  // vertical spread from center
      return [
        { x: -gx, y: -gy }, // top-left
        { x:  gx, y: -gy }, // top-right
        { x: -gx, y:  gy }, // bottom-left
        { x:  gx, y:  gy }, // bottom-right
      ];
    };

    // ── Initial stacked state ─────────────────────────────────────────
    // Card 3 is on top (visible), card 0 is deepest.
    // Each layer peeks out slightly below the one above it.
    cards.forEach((card, i) => {
      const depth = cards.length - 1 - i; // 0 = top card, 3 = bottom card
      gsap.set(card, {
        x: 0,
        y: depth * 12,
        scale: 1 - depth * 0.04,
        rotateX: 0,
        zIndex: i + 1,
        opacity: 1,
        transformOrigin: "center bottom",
      });
    });

    // ── Timeline ──────────────────────────────────────────────────────
    const tl = gsap.timeline({ paused: true });

    // Phase 0 (0→0.2): title fades out before first card peels
    tl.to(title, {
      opacity: 0,
      y: -24,
      duration: 0.2,
      ease: "power2.in",
    }, 0);

    // Phase 1 (0.2→1.0): peel cards top-to-bottom (index 3 first → 0 last)
    // Each card gets 0.2 units of timeline; they overlap slightly for fluidity.
    const peelOrder = [3, 2, 1, 0]; // top card first
    peelOrder.forEach((cardIdx, peelStep) => {
      const card = cards[cardIdx];
      const pos = getGridPositions()[cardIdx];
      const t = 0.2 + peelStep * 0.2; // stagger start times

      // Step A: tilt up (lift off the stack)
      tl.to(card, {
        rotateX: 18,
        y: "-=60",
        duration: 0.07,
        ease: "power2.in",
      }, t);

      // Step B: fly to grid position
      tl.to(card, {
        x: pos.x,
        y: pos.y,
        rotateX: 0,
        scale: 1,
        duration: 0.13,
        ease: "power3.out",
      }, t + 0.07);

      // Step C: micro-bounce on land
      tl.to(card, { y: pos.y + 8, duration: 0.03, ease: "power1.out" }, t + 0.18);
      tl.to(card, { y: pos.y,     duration: 0.03, ease: "power1.in"  }, t + 0.21);

      // Step D: border flash on land — only the flash overlay
      const flash = card.querySelector<HTMLElement>(".ev-flash");
      if (flash) {
        tl.fromTo(flash,
          { opacity: 0.9 },
          { opacity: 0, duration: 0.12, ease: "power2.out" },
          t + 0.18
        );
      }
    });

    // ── ScrollTrigger (scrub the timeline) ───────────────────────────
    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      // 5× viewport height of scroll room — feels deliberate, not rushed
      end: `+=${window.innerHeight * 5}`,
      scrub: 1.2,
      pin: pin,
      anticipatePin: 1,
      animation: tl,
      // Refresh grid positions on resize
      onRefresh: () => {
        // Re-read positions after resize — only update cards already in landed state
        const pos = getGridPositions();
        peelOrder.forEach((cardIdx) => {
          const card = cards[cardIdx];
          const currentX = gsap.getProperty(card, "x") as number;
          // Only reposition if card has already been flung (x !== 0)
          if (Math.abs(currentX) > 10) {
            gsap.set(card, { x: pos[cardIdx].x, y: pos[cardIdx].y });
          }
        });
      },
    });

    return () => {
      // Only kill our own ScrollTrigger — not Domains' or anyone else's
      stRef.current?.kill();
      stRef.current = null;
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0d0d0d]">
      {/* ── Pinned viewport ── */}
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Grid */}
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

        {/* Constellation dots */}
        {([
          [8, 9], [66, 14], [15, 58], [80, 47], [44, 78],
        ] as [number, number][]).map(([lp, tp], i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full bg-white/25"
            style={{ left: `${lp}%`, top: `${tp}%`, width: 5, height: 5 }}
          />
        ))}

        {/* Constellation lines SVG */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="8%" y1="9%"  x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="66%" y1="14%" x2="80%" y2="47%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="15%" y1="58%" x2="44%" y2="78%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </svg>

        {/* Section label — top-left, matches your page.tsx pattern */}
        <p
          className="absolute left-12 top-10 font-mono text-[11px] uppercase tracking-[0.12em] text-white/30"
        >
          03.&nbsp; SYSTEM.LOGS // EVENTS
        </p>

        {/* ── Title (fades out on scroll) ── */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ zIndex: 20 }}
        >
          <h2
            className="font-sans text-[clamp(32px,5.5vw,68px)] font-black uppercase leading-none tracking-[0.04em] text-white"
          >
            EVENTS AT{" "}
            <span className="text-white/25">ROBOVITICS.</span>
          </h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-white/30">
            &gt; SCROLL TO DEPLOY
          </p>
        </div>

        {/* ── Deck wrapper — perspective lives HERE, not on the deck ── */}
        <div style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}>
          <div
            ref={deckRef}
            className="relative"
            style={{ width: 300, height: 210 }}
          >
            {events.map((ev, i) => (
              <div
                key={ev.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="absolute inset-0 select-none"
                style={{
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.11)",
                  padding: "18px 20px",
                  willChange: "transform",
                }}
              >
                {/* Corner brackets */}
                {(["tl","tr","bl","br"] as const).map((c) => (
                  <span
                    key={c}
                    className="absolute"
                    style={{
                      width: 8, height: 8,
                      top:    c[0] === "t" ? 7 : undefined,
                      bottom: c[0] === "b" ? 7 : undefined,
                      left:   c[1] === "l" ? 7 : undefined,
                      right:  c[1] === "r" ? 7 : undefined,
                      borderTop:    c[0] === "t" ? "1px solid rgba(255,255,255,0.22)" : undefined,
                      borderBottom: c[0] === "b" ? "1px solid rgba(255,255,255,0.22)" : undefined,
                      borderLeft:   c[1] === "l" ? "1px solid rgba(255,255,255,0.22)" : undefined,
                      borderRight:  c[1] === "r" ? "1px solid rgba(255,255,255,0.22)" : undefined,
                    }}
                  />
                ))}

                {/* Flash border — triggered by GSAP on land */}
                <div
                  className="ev-flash pointer-events-none absolute inset-0 opacity-0"
                  style={{ border: "1px solid rgba(255,255,255,0.85)" }}
                />

                {/* Module ID */}
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.13em] text-white/25">
                  {ev.id}
                </p>

                {/* Event name */}
                <p className="font-sans text-[21px] font-black uppercase leading-none tracking-[0.05em] text-white">
                  {ev.name}
                </p>

                {/* Type */}
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">
                  {ev.type}
                </p>

                {/* Desc */}
                <p className="mt-2.5 font-mono text-[10px] leading-[1.75] text-white/50">
                  {ev.desc}
                </p>

                {/* Footer row */}
                <div
                  className="mt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 9 }}
                >
                  <span className="font-mono text-[9px] tracking-[0.1em] text-white/30">
                    {ev.date}
                  </span>

                  {ev.status === "REGISTRATIONS OPEN" ? (
                    <span
                      className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-white/90"
                      style={{ border: "1px solid rgba(255,255,255,0.45)", padding: "2px 7px" }}
                    >
                      <span className="ev-blink inline-block h-[5px] w-[5px] rounded-full bg-white" />
                      {ev.status}
                    </span>
                  ) : (
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/30"
                      style={{ border: "1px solid rgba(255,255,255,0.11)", padding: "2px 7px" }}
                    >
                      {ev.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blink keyframe — scoped so it doesn't pollute globals */}
      <style>{`
        .ev-blink { animation: ev-blink-kf 1.1s step-start infinite; }
        @keyframes ev-blink-kf { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}