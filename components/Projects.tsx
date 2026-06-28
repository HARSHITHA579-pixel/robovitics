'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projectsData } from '../data/clubData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Background
// ─────────────────────────────────────────────────────────────────────────────
function SectionBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0d0d0d]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                        linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />
            {([[5,12],[72,8],[18,62],[85,42],[40,85],[92,70]] as [number,number][]).map(([lp,tp],i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${lp}%`, top: `${tp}%`,
                        width: 5, height: 5,
                        background: 'rgba(255,255,255,0.2)',
                        boxShadow: '0 0 6px rgba(255,255,255,0.12)',
                    }}
                />
            ))}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="5%"  y1="12%" x2="72%" y2="8%"  stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <line x1="72%" y1="8%"  x2="85%" y2="42%" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <line x1="18%" y1="62%" x2="40%" y2="85%" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            </svg>
        </div>
    );
}

const CYAN      = 'rgba(79,174,243,0.9)';
const CYAN_DIM  = 'rgba(79,174,243,0.4)';
const CYAN_GLOW = 'rgba(79,174,243,0.25)';

// ─────────────────────────────────────────────────────────────────────────────
// Stamp SVG
// ─────────────────────────────────────────────────────────────────────────────
function Stamp() {
    return (
        <div
            className="stamp absolute z-40 pointer-events-none"
            style={{
                top: 12, right: 12,
                width: 44, height: 44,
                opacity: 0,
                rotate: '12deg',
            }}
        >
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26" cy="26" r="24" stroke={CYAN} strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx="26" cy="26" r="18" stroke={CYAN} strokeWidth="1" opacity="0.5" />
                <path
                    d="M17 26.5L23 32.5L35 20"
                    stroke={CYAN}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <text
                    x="26" y="47"
                    textAnchor="middle"
                    fill={CYAN}
                    fontSize="5"
                    fontFamily="monospace"
                    letterSpacing="2"
                    opacity="0.8"
                >
                    VERIFIED
                </text>
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Single Project Card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({
    project,
    index,
    cardRef,
}: {
    project: (typeof projectsData)[0];
    index:   number;
    cardRef: (el: HTMLDivElement | null) => void;
}) {
    return (
        <div
            ref={cardRef}
            className="project-card flex-shrink-0"
            style={{
                // On mobile: fill viewport width minus 48px (24px each side) so
                // text never clips, while hinting at the next card.
                // On desktop: clamp between 340–440px as before.
width: 'clamp(230px, calc(100vw - 80px), 440px)',
                willChange: 'transform',
            }}
        >
            <div
                className="relative overflow-hidden"
                style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `0 0 0 0px ${CYAN_GLOW}`,
                }}
            >
                {/* Shared card texture */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        background: `
                            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(165deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015) 38%, rgba(0,0,0,0.35))
                        `,
                        backgroundSize: '18px 18px, 18px 18px, auto',
                    }}
                />
                <Stamp />

                {(['tl','tr','bl','br'] as const).map((pos) => (
                    <span
                        key={pos}
                        className="absolute pointer-events-none"
                        style={{
                            top:    pos[0]==='t' ? 6 : undefined,
                            bottom: pos[0]==='b' ? 6 : undefined,
                            left:   pos[1]==='l' ? 6 : undefined,
                            right:  pos[1]==='r' ? 6 : undefined,
                            width: 10, height: 10,
                            borderTop:    pos[0]==='t' ? `1px solid ${CYAN_DIM}` : undefined,
                            borderBottom: pos[0]==='b' ? `1px solid ${CYAN_DIM}` : undefined,
                            borderLeft:   pos[1]==='l' ? `1px solid ${CYAN_DIM}` : undefined,
                            borderRight:  pos[1]==='r' ? `1px solid ${CYAN_DIM}` : undefined,
                        }}
                    />
                ))}

                <span style={{
                    position: 'absolute', top: -1, left: 20,
                    width: 40, height: 1,
                    background: CYAN_DIM,
                }}/>

                {/* Image — shorter on mobile so body text fits in viewport */}
                <div
                    className="relative w-full overflow-hidden"
                    style={{ height: 'clamp(130px, 25vw, 220px)' }}
                >
                    <Image
                        src={project.imagePath}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) calc(100vw - 48px), 440px"
                        className="object-cover"
                        priority={index === 0}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.95) 100%)' }}
                    />
                </div>

                {/* Card body — tighter padding on mobile */}
                <div className="px-5 pt-4 pb-5 flex flex-col gap-2.5 sm:px-7 sm:pt-6 sm:pb-7 sm:gap-3.5">
                    <span
                        className="font-mono uppercase"
                        style={{ fontSize: 9, letterSpacing: '0.28em', color: CYAN_DIM }}
                    >
                        {project.id} // BUILD_LOG
                    </span>

                    <h3
                        className="font-black uppercase text-white leading-tight"
                        style={{
                            fontFamily: '"Inter","Arial Black",sans-serif',
                            fontSize: 'clamp(14px, 1.6vw, 21px)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {project.title}
                    </h3>

                    <p
                        className="font-mono uppercase"
                        style={{ fontSize: 10, letterSpacing: '0.12em', color: CYAN }}
                    >
                        {project.tagline}
                    </p>

                    <div style={{
                        height: 1,
                        background: `linear-gradient(90deg, ${CYAN_DIM}, transparent)`,
                    }}/>

                    <p
                        className="leading-relaxed"
                        style={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.48)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.75,
                        }}
                    >
                        {project.description}
                    </p>

                    <Link
                        href={project.readMoreLink}
                        className="group/link mt-1 inline-flex items-center gap-2 font-mono uppercase"
                        style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN }}
                    >
                        <span className="group-hover/link:underline">READ MORE</span>
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects — Horizontal Filmstrip
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef  = useRef<HTMLElement>(null);
    const pinRef      = useRef<HTMLDivElement>(null);
    const beltRef     = useRef<HTMLDivElement>(null);
    const titleRef    = useRef<HTMLDivElement>(null);
    const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
    const stRef       = useRef<ScrollTrigger | null>(null);
    const cardSTsRef  = useRef<ScrollTrigger[]>([]);

    const total = projectsData.length;

    // ── FRAMER MOTION: Global Mechanics ──────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const rawGearRot    = useTransform(scrollYProgress, [0, 1], [0, -720]);
    const springConfig  = { stiffness: 60, damping: 20, restDelta: 0.001 };
    const smoothGearRot = useSpring(rawGearRot, springConfig);
    const gearOpacity   = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 0.22, 0.22, 0]);

    // ── GSAP: Horizontal Filmstrip ───────────────────────────────────────────
    useEffect(() => {
        const section = sectionRef.current;
        const pin     = pinRef.current;
        const track   = beltRef.current;
        if (!section || !pin || !track) return;

        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        // ── Initial state ───────────────────────────────────────────────────
        gsap.set(titleRef.current, { y: 40, opacity: 0 });

        cards.forEach((card) => {
            const stamp    = card.querySelector<HTMLElement>('.stamp');
            const innerBox = card.querySelector<HTMLElement>(':scope > div');
            gsap.set(stamp,    { opacity: 0, scale: 2.2, rotation: 25 });
            gsap.set(innerBox, { boxShadow: '0 0 0 0px rgba(79,174,243,0)' });
        });

        gsap.set(track, { x: () => pin.offsetWidth });

       // ── Master timeline ─────────────────────────────────────────────────
const tl = gsap.timeline({ paused: true });

tl.to(titleRef.current, {
    y: 0,
    opacity: 1,
    duration: 0.15,
    ease: 'back.out(1.5)',
}, 0);

tl.fromTo(
    track,
    { x: () => pin.offsetWidth },
    {
        x: () => {
            const lastCard = cards[cards.length - 1];
            const cardW    = lastCard?.offsetWidth ?? 400;
            const viewW    = pin.offsetWidth;
            const isMobile = viewW < 768;
            const stopX = isMobile
                ? -(track.scrollWidth - viewW / 2 - cardW / 2)
                : -(track.scrollWidth - viewW - 40);
            return stopX;
        },
        ease: 'none',
        duration: 1,
    },
    0.05
);

// ── Pinned scroll driver ────────────────────────────────────────────
const getScrollDistance = () => {
    const lastCard = cards[cards.length - 1];
    const cardW    = lastCard?.offsetWidth ?? 400;
    const viewW    = pin.offsetWidth;
    const isMobile = viewW < 768;
    const travel   = isMobile
        ? track.scrollWidth - viewW / 2 - cardW / 2 - viewW
        : track.scrollWidth - viewW - 40;
    return Math.max(travel, window.innerHeight * total * 0.5);
};

// Set section height dynamically before creating ScrollTrigger
const scrollDist = getScrollDistance();
if (sectionRef.current) {
    sectionRef.current.style.height = `${scrollDist + window.innerHeight}px`;
}

stRef.current = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${getScrollDistance()}`,
    scrub: 0.65,
    animation: tl,
    invalidateOnRefresh: true,
    onRefresh: () => {
        const dist = getScrollDistance();
        if (sectionRef.current) {
            sectionRef.current.style.height = `${dist + window.innerHeight}px`;
        }
    },
});

        // ── Per-card stamp + glow ───────────────────────────────────────────
        cardSTsRef.current = cards.map((card) => {
            const stamp    = card.querySelector<HTMLElement>('.stamp');
            const innerBox = card.querySelector<HTMLElement>(':scope > div');

            return ScrollTrigger.create({
                trigger: card,
                containerAnimation: tl,
                start: 'left 65%',
                end:   'left 35%',
                onEnter: () => {
                    gsap.to(stamp, { opacity: 1, scale: 1, rotation: 12, duration: 0.3, ease: 'back.out(2)' });
                    gsap.fromTo(
                        innerBox,
                        { boxShadow: `0 0 0 1px ${CYAN}, 0 0 24px ${CYAN_GLOW}` },
                        { boxShadow: '0 0 0 0px rgba(79,174,243,0)', duration: 0.5, ease: 'power2.out' }
                    );
                },
                onEnterBack: () => {
                    gsap.to(stamp, { opacity: 1, scale: 1, rotation: 12, duration: 0.2, ease: 'power2.out' });
                },
                onLeaveBack: () => {
                    gsap.to(stamp, { opacity: 0, scale: 2.2, rotation: 25, duration: 0.2, ease: 'power2.in' });
                },
            });
        });

        return () => {
            stRef.current?.kill();
            stRef.current = null;
            cardSTsRef.current.forEach((st) => st.kill());
            cardSTsRef.current = [];
            tl.kill();
        };
    }, [total]);

    return (
        // AFTER
<section
    id="projects"
    ref={sectionRef}
    className="relative bg-[#0d0d0d]"
>
            {/* ── Sticky viewport ── */}
            <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden">
                <SectionBackground />
                <span id="projects-mobile" className="pointer-events-none absolute top-0 h-px w-px md:hidden" aria-hidden="true" />


                {/* Top-left label */}
                <div className="absolute left-4 top-6 z-30 pointer-events-none sm:left-10 sm:top-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 sm:text-[10px]">
                        <span className="font-bold text-white mr-2">04.</span>
                        <span className="hidden sm:inline">SYSTEM.LOGS // PROJECTS</span>
                        <span className="sm:hidden">PROJECTS</span>
                    </span>
                </div>

                {/* Top-right label */}
                <div className="hidden sm:block absolute right-10 top-8 z-30 pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/20">
                        ▶ ASSEMBLY_LINE // BUILD_LOG
                    </span>
                </div>

                {/* Title block */}
                <div
                    ref={titleRef}
                    className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full px-4"
                    style={{ top: 'clamp(12%, 16%, 16%)' }}
                >
                    <p className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.35em] text-white/20 mb-3">
                        ▶ BUILD_LOG // PROJECTS
                    </p>
                    <h2
                        className="font-black uppercase text-white leading-none"
                        style={{
                            fontFamily: '"Inter","Arial Black",sans-serif',
                            fontSize: 'clamp(22px, 4vw, 56px)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        WHAT WE&apos;VE{' '}
                        <span style={{ color: '#4FAEF3' }}>BUILT.</span>
                    </h2>
                    <div style={{
                        marginTop: 10,
                        height: 1,
                        width: '100%',
                        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
                    }}/>
                </div>

                {/* ── Card belt ── */}
                <div
                    ref={beltRef}
                    className="absolute left-0 flex items-center top-[28%] sm:top-[32%]"
                    style={{
                        // ↑ gap floor bumped 12→20px for mobile breathing room
                        gap:          'clamp(28px, 2vw, 32px)',
paddingLeft:  'clamp(20px, 2.5vw, 40px)',
paddingRight: 'clamp(60px, 5vw, 80px)',
                    }}
                >
                    {/* Gear — now visible on mobile, scaled down */}
                    <motion.div
                        style={{
                            rotate:  smoothGearRot,
                            opacity: gearOpacity,
                            // clamp: 200px on mobile → 360px on desktop
                            width:  'clamp(180px, 30vw, 360px)',
                            height: 'clamp(180px, 30vw, 360px)',
                        }}
                        className="flex flex-shrink-0 items-center justify-center pointer-events-none"
                    >
                        <svg
                            style={{ width: '100%', height: '100%' }}
                            viewBox="0 0 24 24" fill="none"
                            stroke="#ffffff" strokeWidth="0.5"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="3" stroke="#ffffff"/>
                            <path stroke="#ffffff" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>
                    </motion.div>

                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            cardRef={(el) => { cardsRef.current[index] = el; }}
                        />
                    ))}
                </div>

                {/* Bottom hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                        &gt;
                    </span>
                </div>
            </div>
        </section>
    );
}