"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: "MODULE_01",
    name: "ROBOWAR",
    type: "COMBAT ROBOTICS",
    date: "14 SEP 2025",
    desc: "Head-to-head combat bot arena. Design, build, and destroy. 3kg weight class, full contact.",
    status: "UPCOMING",
  },
  {
    id: "MODULE_02",
    name: "AUTONOMA",
    type: "AUTONOMOUS SYSTEMS",
    date: "02 NOV 2025",
    desc: "Navigate without human input. Obstacle courses, line-following, and open-track autonomy challenges.",
    status: "UPCOMING",
  },
  {
    id: "MODULE_03",
    name: "CTRL+BUILD",
    type: "24H HACKATHON",
    date: "18 JAN 2026",
    desc: "24 hours. One problem. Full stack robotics sprint — hardware + firmware + software, all in one night.",
    status: "REGISTRATIONS OPEN",
  },
  {
    id: "MODULE_04",
    name: "DRONE GRID",
    type: "AERIAL ROBOTICS",
    date: "22 MAR 2026",
    desc: "FPV racing through a custom obstacle grid. Also open to autonomous flight. Altitude limit: 15m.",
    status: "UPCOMING",
  },
];

export default function EventsTerminal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scanRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const scans = scanRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== 4) return;

    // ── Measure card width so we can compute exact travel distance ──
    const cardW = cards[0].offsetWidth;
    const gap = 32; // px — must match CSS gap
    const totalTrackW = cards.length * cardW + (cards.length - 1) * gap;
    const viewportW = window.innerWidth;
    // How far left the track needs to travel so card 4 is fully visible
    const maxTranslate = totalTrackW - viewportW + 96; // 96px right padding

    // ── Initial state: cards fully visible but scanline at top ──
    gsap.set(track, { x: 0 });
    scans.forEach((scan) => gsap.set(scan, { scaleY: 1, transformOrigin: "top center" }));

    // ── Timeline ─────────────────────────────────────────────────────
    const tl = gsap.timeline({ paused: true });

    // Phase 0 (0→0.15): scanlines wipe down over all cards simultaneously
    // — feels like the printer is "loading" before tape starts moving
    scans.forEach((scan, i) => {
      tl.fromTo(
        scan,
        { scaleY: 1, opacity: 1 },
        { scaleY: 0, opacity: 0, duration: 0.15, ease: "power2.inOut" },
        i * 0.04 // slight stagger so they don't all pop at once
      );
    });

    // Phase 1 (0.15→1.0): horizontal tape scroll
    tl.to(
      track,
      {
        x: -maxTranslate,
        duration: 0.85,
        ease: "none", // linear — scroll controls the feel
      },
      0.15
    );

    // ── ScrollTrigger ────────────────────────────────────────────────
    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      scrub: 1.1,
      pin: pin,
      anticipatePin: 1,
      animation: tl,
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
        className="relative flex h-screen w-full flex-col justify-center overflow-hidden"
      >
        {/* ── Grid bg ── */}
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

        {/* ── CRT horizontal scan lines overlay ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.18) 3px,
              rgba(0,0,0,0.18) 4px
            )`,
            zIndex: 30,
          }}
        />

        {/* ── Section label ── */}
        <p className="absolute left-12 top-10 font-mono text-[11px] uppercase tracking-[0.12em] text-white/30">
          03.&nbsp; SYSTEM.LOGS // EVENTS
        </p>

        {/* ── Ticker label top-right ── */}
        <p className="absolute right-12 top-10 font-mono text-[11px] uppercase tracking-[0.12em] text-white/20">
          &gt; PRINTING OUTPUT...
        </p>

        {/* ── Section heading ── */}
        <div className="relative z-10 mb-10 px-12">
          <h2 className="font-sans text-[clamp(28px,4vw,56px)] font-black uppercase leading-none tracking-[0.04em] text-white">
            EVENTS AT{" "}
            <span className="text-white/25">ROBOVITICS.</span>
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-px w-8 bg-white/20" />
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
              SCROLL TO ADVANCE TAPE
            </p>
          </div>
        </div>

        {/* ── Horizontal tape ── */}
        {/* Outer clip so cards don't bleed outside viewport */}
        <div className="relative z-10 w-full overflow-hidden">
          {/* Left fade vignette */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24"
            style={{
              background:
                "linear-gradient(to right, #0d0d0d 0%, transparent 100%)",
            }}
          />
          {/* Right fade vignette */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32"
            style={{
              background:
                "linear-gradient(to left, #0d0d0d 0%, transparent 100%)",
            }}
          />

          {/* The moving track */}
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ gap: 32, paddingLeft: 96, paddingRight: 96 }}
          >
            {events.map((ev, i) => (
              <div
                key={ev.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative flex-shrink-0"
                style={{
                  width: "clamp(260px, 28vw, 340px)",
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.11)",
                  padding: "24px 24px 20px",
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

                {/* Scanline wipe — covers card, gsap removes it */}
                <div
                  ref={(el) => { scanRefs.current[i] = el; }}
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background: "repeating-linear-gradient(0deg, #0d0d0d 0px, #0d0d0d 2px, #111 2px, #111 4px)",
                    transformOrigin: "top center",
                  }}
                />

                {/* Module ID */}
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.13em] text-white/25">
                  {ev.id}
                </p>

                {/* Big number index */}
                <p
                  className="pointer-events-none absolute right-5 top-4 font-sans font-black leading-none text-white/[0.04]"
                  style={{ fontSize: "clamp(60px,8vw,90px)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                {/* Event name */}
                <p className="font-sans text-[22px] font-black uppercase leading-none tracking-[0.05em] text-white">
                  {ev.name}
                </p>

                {/* Type */}
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">
                  {ev.type}
                </p>

                {/* Divider */}
                <div className="my-3 h-px w-full bg-white/[0.07]" />

                {/* Desc */}
                <p className="font-mono text-[10px] leading-[1.8] text-white/50">
                  {ev.desc}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.1em] text-white/30">
                    {ev.date}
                  </span>

                  {ev.status === "REGISTRATIONS OPEN" ? (
                    <span
                      className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-white/90"
                      style={{
                        border: "1px solid rgba(255,255,255,0.45)",
                        padding: "2px 7px",
                      }}
                    >
                      <span className="ev-blink inline-block h-[5px] w-[5px] rounded-full bg-white" />
                      {ev.status}
                    </span>
                  ) : (
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/30"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "2px 7px",
                      }}
                    >
                      {ev.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tape progress indicator ── */}
        <div className="absolute bottom-10 left-12 right-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.07]">
            <div
              id="ev-tape-progress"
              className="h-full bg-white/30 origin-left"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/20">
            TAPE // 4 EVENTS
          </p>
        </div>
      </div>

      <style>{`
        .ev-blink { animation: ev-blink-kf 1.1s step-start infinite; }
        @keyframes ev-blink-kf { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}