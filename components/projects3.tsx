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
                top: 16, right: 16,
                width: 52, height: 52,
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
            className="project-card absolute flex-shrink-0"
            style={{
                width: 'clamp(260px, 22vw, 320px)',
                top: 0,
                left: 0,
                opacity: 0,
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

                <div className="relative w-full overflow-hidden" style={{ height: 160 }}>
                    <Image
                        src={project.imagePath}
                        alt={project.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                        priority={index === 0}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.95) 100%)' }}
                    />
                </div>

                <div className="px-5 pt-4 pb-5 flex flex-col gap-2.5">
                    <span
                        className="font-mono uppercase"
                        style={{ fontSize: 8, letterSpacing: '0.28em', color: CYAN_DIM }}
                    >
                        {project.id} // BUILD_LOG
                    </span>

                    <h3
                        className="font-black uppercase text-white leading-tight"
                        style={{
                            fontFamily: '"Inter","Arial Black",sans-serif',
                            fontSize: 'clamp(13px,1.1vw,16px)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {project.title}
                    </h3>

                    <p
                        className="font-mono uppercase"
                        style={{ fontSize: 8, letterSpacing: '0.12em', color: CYAN }}
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
                            fontSize: 11,
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
                        style={{ fontSize: 8, letterSpacing: '0.2em', color: CYAN }}
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
// Projects — Assembly Line
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef  = useRef<HTMLElement>(null);
    const pinRef      = useRef<HTMLDivElement>(null);
    const beltRef     = useRef<HTMLDivElement>(null);
    const titleRef    = useRef<HTMLDivElement>(null);
    const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
    const stRef       = useRef<ScrollTrigger | null>(null);

    const total = projectsData.length;

    // ── FRAMER MOTION: Global Mechanics ──────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"] 
    });

    const rawGearX = useTransform(scrollYProgress, [0, 0.10], [120, -120]); 
    const rawGearRot = useTransform(scrollYProgress, [0, 0.10], [0, -360]);

    const springConfig = { stiffness: 32, damping: 38, restDelta: 0.001 };
    
    const smoothGearX = useSpring(rawGearX, springConfig);
    const smoothGearRot = useSpring(rawGearRot, springConfig);

    const gearX = useTransform(smoothGearX, x => `${x}vw`);

    // ── GSAP: Assembly Line Mechanics ─────────────────────────────────────────
    useEffect(() => {
        const section = sectionRef.current;
        const pin     = pinRef.current;
        const belt    = beltRef.current;
        if (!section || !pin || !belt) return;

        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        const cardW   = cards[0].offsetWidth;
        const gap     = 32; 
        const beltW   = pin.offsetWidth;

        const rightPadding = 60; 
        const startX  = beltW - cardW - rightPadding;

        // ── Initial positions ───────────────────────────────────────────────
        cards.forEach((card) => {
            gsap.set(card, {
                x: startX,
                y: -pin.offsetHeight * 1.2, 
                rotation: 0,
                opacity: 1, 
            });
        });

        gsap.set(titleRef.current, { y: 40, opacity: 0 });

        // ── GSAP Timeline ────────────────────────────────────────────────────
        const tl = gsap.timeline({ paused: true });

        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.5)'
        }, 0);

        cards.forEach((card, i) => {
            const stamp = card.querySelector<HTMLElement>('.stamp');
            const landX = startX;
            const segStart = i * 1.0 + 0.4; 

            tl.to(card, {
                y: pin.offsetHeight * 0.18, 
                x: landX,
                rotation: gsap.utils.random(-2, 2), 
                duration: 0.28,
                ease: 'power3.in', 
            }, segStart);

            tl.to(card, {
                scaleY: 0.93,
                scaleX: 1.04,
                rotation: 0,
                duration: 0.06,
                ease: 'power2.out',
            }, segStart + 0.28);

            tl.to(card, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.1,
                ease: 'elastic.out(1.2, 0.5)',
            }, segStart + 0.34);

            tl.fromTo(
                card.querySelector<HTMLElement>('div'),
                { boxShadow: `0 0 0 1px ${CYAN}, 0 0 24px ${CYAN_GLOW}` },
                { boxShadow: `0 0 0 0px rgba(79,174,243,0)`, duration: 0.35, ease: 'power2.out' },
                segStart + 0.28
            );

            if (stamp) {
                tl.fromTo(stamp,
                    { opacity: 0, scale: 2.2, rotation: 25 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 12,
                        duration: 0.18,
                        ease: 'back.out(2)',
                    },
                    segStart + 0.38 
                );
            }

            tl.to({}, { duration: 0.22 }, segStart + 0.55);

            if (i < total - 1) {
                for (let j = 0; j <= i; j++) {
                    const prevCard = cards[j];
                    const targetX  = startX - (i - j + 1) * (cardW + gap);
                    tl.to(prevCard, {
                        x: targetX,
                        duration: 0.3,
                        ease: 'power2.inOut',
                    }, segStart + 0.75);
                }
            }
        });

        tl.to({}, { duration: 0.1 });

        // ── ScrollTrigger ─────────────────────────────────────────────────────
        // NOTE: no more `pin` / `anticipatePin`. The sticky `pinRef` div handles
        // the "staying in place" visually via CSS. GSAP only drives timeline
        // progress against scroll — same fix as Domains/Events.
        stRef.current = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${window.innerHeight * total}`, 
            scrub: 1,
            animation: tl,
        });

        return () => {
            stRef.current?.kill();
            stRef.current = null;
            tl.kill();
        };
    }, [total]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-[#0d0d0d]"
            style={{ height: `${(total + 1) * 100}vh` }}
        >
            <motion.div
    style={{ x: gearX, rotate: smoothGearRot }}
    className="hidden md:block fixed -bottom-32 z-10 opacity-[0.16] pointer-events-none lg:-bottom-40 lg:opacity-20"
>
                <svg className="h-[460px] w-[460px] lg:h-[600px] lg:w-[600px]" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" stroke="#ffffff"></circle>
                    <path stroke="#ffffff" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </motion.div>

            <div
                ref={pinRef}
                className="sticky top-0 h-screen w-full overflow-hidden"
            >
                <SectionBackground />

                <div className="absolute left-10 top-8 z-30 pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                        <span className="font-bold text-white mr-2">04.</span>
                        SYSTEM.LOGS // PROJECTS
                    </span>
                </div>

                <div className="absolute right-10 top-8 z-30 pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/20">
                        ▶ ASSEMBLY_LINE // BUILD_LOG
                    </span>
                </div>

                <div ref={titleRef} className="absolute top-[14%] left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/20 mb-3">
                        ▶ BUILD_LOG // PROJECTS
                    </p>
                    <h2
                        className="font-black uppercase text-white leading-none"
                        style={{
                            fontFamily: '"Inter","Arial Black",sans-serif',
                            fontSize: 'clamp(28px,4vw,56px)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        WHAT WE&apos;VE{' '}
                        <span style={{ color: '#4FAEF3' }}>BUILT.</span>
                    </h2>
                    <div style={{
                        marginTop: 12, height: 1, width: '100%',
                        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
                    }}/>
                </div>

                <div
                    ref={beltRef}
                    className="absolute inset-0"
                    style={{ top: '20%' }}
                >
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            cardRef={(el) => { cardsRef.current[index] = el; }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                        &gt;  
                    </span>
                </div>
            </div>
        </section>
    );
}