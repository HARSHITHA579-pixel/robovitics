'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
                // On mobile: keep a deliberate side peek so the filmstrip reads as scrollable.
                // On desktop: clamp between 340–440px as before.
                width: 'clamp(230px, 82vw, 440px)',
                willChange: 'transform',
            }}
        >
            <div
                className="rv-card-surface rv-card-surface--lifted"
                style={{ boxShadow: `0 18px 45px rgba(0,0,0,0.36), 0 0 30px rgba(79,174,243,0.055), 0 0 0 0px ${CYAN_GLOW}` }}
            >
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
                <span
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                        height: '58%',
                        background:
                            'linear-gradient(180deg, rgba(7,10,13,0) 0%, rgba(7,10,13,0.72) 24%, rgba(6,8,10,0.94) 100%)',
                    }}
                />

                {/* Image — shorter on mobile so body text fits in viewport */}
                <div
                    className="relative z-10 w-full overflow-hidden"
                    style={{ height: 'clamp(130px, 25vw, 220px)' }}
                >
                    <Image
                        src={project.imagePath}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) calc(100vw - 48px), 440px"
                        className="object-contain"
                        unoptimized={true}
                        priority={index === 0}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent 42%, rgba(11,12,13,0.88) 100%)' }}
                    />
                </div>

                {/* Card body — tighter padding on mobile */}
                <div
                    className="relative z-10 flex flex-col gap-2.5 px-5 pb-5 pt-4 sm:gap-3.5 sm:px-7 sm:pb-7 sm:pt-6"
                    style={{
                        background:
                            'linear-gradient(165deg, rgba(79,174,243,0.045), rgba(5,7,9,0.18) 34%, rgba(4,5,6,0.3) 100%)',
                    }}
                >
                    <span
                        className="pointer-events-none absolute left-5 top-0 h-px w-[42%] sm:left-7"
                        style={{ background: 'linear-gradient(90deg, rgba(79,174,243,0.34), transparent)' }}
                    />
                    <span
                        className="font-mono uppercase"
                        style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(79,174,243,0.62)' }}
                    >
                        {project.id}{' // '}BUILD_LOG
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
                            color: 'rgba(255,255,255,0.62)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.75,
                        }}
                    >
                        {project.description}
                    </p>

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
    const projectProgressRef = useRef<number[]>([]);
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);

    const total = projectsData.length;

    const jumpToProject = (index: number) => {
        const trigger = stRef.current;
        if (!trigger || total <= 1) return;

        const progress = index / (total - 1);
        const targetProgress = projectProgressRef.current[index] ?? progress;
        const scrollTop = trigger.start + (trigger.end - trigger.start) * targetProgress;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    };

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

const getStopX = () => {
    const lastCard = cards[cards.length - 1];
    const cardW    = lastCard?.offsetWidth ?? 400;
    const viewW    = pin.offsetWidth;
    const isMobile = viewW < 768;

    return isMobile
        ? -(track.scrollWidth - viewW / 2 - cardW / 2)
        : -(track.scrollWidth - viewW - 40);
};

const updateProjectProgressStops = () => {
    const startX = pin.offsetWidth;
    const stopX = getStopX();
    const travel = startX - stopX;
    const trackTweenStart = 0.05;
    const trackTweenDuration = 1;
    const timelineDuration = tl.duration() || 1;

    projectProgressRef.current = cards.map((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const centeredX = pin.offsetWidth / 2 - cardCenter;
        const tweenProgress = gsap.utils.clamp(0, 1, (startX - centeredX) / travel);
        return gsap.utils.clamp(0, 1, (trackTweenStart + tweenProgress * trackTweenDuration) / timelineDuration);
    });
};

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
updateProjectProgressStops();

stRef.current = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${getScrollDistance()}`,
    scrub: 0.65,
    animation: tl,
    invalidateOnRefresh: true,
    onUpdate: () => {
        const trackX = Number(gsap.getProperty(track, 'x'));
        const viewportCenter = pin.offsetWidth / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const cardCenter = trackX + card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveProjectIndex(closestIndex);
    },
    onRefresh: () => {
        const dist = getScrollDistance();
        if (sectionRef.current) {
            sectionRef.current.style.height = `${dist + window.innerHeight}px`;
        }
        updateProjectProgressStops();
    },
});

        return () => {
            stRef.current?.kill();
            stRef.current = null;
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
                    <span className="rv-section-log">
                        <span className="rv-section-log-number">06.</span>
                        SYSTEM.LOGS // PROJECTS
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
                    className="rv-section-header absolute left-1/2 -translate-x-1/2 z-20 px-4"
                    style={{ top: 'clamp(96px, 14%, 120px)' }}
                >
                    <p className="rv-section-kicker">
                        ▶ BUILD_LOG // PROJECTS
                    </p>
                    <h2
                        className="rv-section-title"
                        style={{
                            '--rv-section-title-mobile': 'clamp(30px, 8.4vw, 36px)',
                            '--rv-section-title-desktop': 'clamp(22px, 4vw, 56px)',
                        } as React.CSSProperties}
                    >
                        WHAT WE&apos;VE<br />
                        <span style={{ color: '#4FAEF3' }}>BUILT</span>
                    </h2>
                    <div className="rv-section-rule" />
                </div>

                {/* ── Card belt ── */}
                <div
                    ref={beltRef}
                    className="absolute left-0 flex items-center top-[36%] sm:top-[32%]"
                    style={{
                        gap: 'clamp(18px, 2vw, 32px)',
                        paddingLeft: 'clamp(16px, 5vw, 40px)',
                        paddingRight: 'clamp(80px, 10vw, 120px)',
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
                <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 md:hidden">
                    <div className="flex items-center gap-2">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#4FAEF3]/45" />
                        {projectsData.map((project, index) => {
                            const isActive = index === activeProjectIndex;

                            return (
                                <button
                                    key={`project-progress-${project.id}`}
                                    type="button"
                                    aria-label={`Go to project ${index + 1}`}
                                    aria-current={isActive ? 'step' : undefined}
                                    onClick={() => jumpToProject(index)}
                                    className="h-5 w-5 rounded-full p-0 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4FAEF3]/80"
                                >
                                    <span
                                        className={`mx-auto block rounded-full transition-all duration-300 ${
                                            isActive
                                                ? 'h-2 w-2 bg-[#4FAEF3] shadow-[0_0_12px_rgba(79,174,243,0.7)]'
                                                : 'h-1.5 w-1.5 bg-white/20'
                                        }`}
                                    />
                                </button>
                            );
                        })}
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#4FAEF3]/45" />
                    </div>
                </div>
            </div>
        </section>
    );
}
