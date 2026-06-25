'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/clubData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Background (matches Domains / Events / TeamRoster)
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
            {(
                [
                    [5, 12], [72, 8], [18, 62], [85, 42], [40, 85], [92, 70],
                ] as [number, number][]
            ).map(([lp, tp], i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${lp}%`,
                        top: `${tp}%`,
                        width: 5,
                        height: 5,
                        background: 'rgba(255,255,255,0.25)',
                        boxShadow: '0 0 6px rgba(255,255,255,0.15)',
                    }}
                />
            ))}
            <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="5%" y1="12%" x2="72%" y2="8%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="72%" y1="8%" x2="85%" y2="42%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="18%" y1="62%" x2="40%" y2="85%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Accent Colour
// ─────────────────────────────────────────────────────────────────────────────
const CYAN_ACCENT = 'rgba(79,174,243,0.9)';

// ─────────────────────────────────────────────────────────────────────────────
// Single Project Card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projectsData)[0] }) {
    const accent = CYAN_ACCENT;

    return (
        <div className="group relative h-full w-full transition-transform duration-500 ease-out hover:-translate-y-3">
            {/* Outer glow on hover */}
            <div
                className="relative h-full overflow-hidden rounded-[4px] transition-all duration-500"
                style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                {/* Inner texture + gradient overlay */}
                <div
                    className="absolute pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-80"
                    style={{
                        inset: -1,
                        borderRadius: 4,
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

                {/* Cyan corner brackets */}
                {['tl', 'tr', 'bl', 'br'].map((pos) => (
                    <span
                        key={pos}
                        className="absolute z-10 pointer-events-none transition-all duration-500 group-hover:opacity-100 opacity-60"
                        style={{
                            top: pos.startsWith('t') ? 6 : undefined,
                            bottom: pos.startsWith('b') ? 6 : undefined,
                            left: pos.endsWith('l') ? 6 : undefined,
                            right: pos.endsWith('r') ? 6 : undefined,
                            width: 14, height: 14,
                            borderTop: pos.startsWith('t') ? `1.5px solid ${accent}` : undefined,
                            borderBottom: pos.startsWith('b') ? `1.5px solid ${accent}` : undefined,
                            borderLeft: pos.endsWith('l') ? `1.5px solid ${accent}` : undefined,
                            borderRight: pos.endsWith('r') ? `1.5px solid ${accent}` : undefined,
                            filter: `drop-shadow(0 0 4px ${accent.replace('0.9', '0.5')})`,
                        }}
                    />
                ))}

                {/* Accent top/bottom lines */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <span style={{ position: 'absolute', top: '-1px', left: '20px', width: '40px', height: '1px', background: accent.replace('0.9', '0.6') }} />
                    <span style={{ position: 'absolute', bottom: '-1px', right: '20px', width: '40px', height: '1px', background: accent.replace('0.9', '0.35') }} />
                </div>

                {/* Image container with zoom-on-hover */}
                <div className="relative z-20 w-full h-44 overflow-hidden">
                    <Image
                        src={project.imagePath}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => {
                            // Fallback to a dark gradient placeholder if image 404s
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {/* Gradient fade at bottom of image */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.95) 100%)',
                        }}
                    />

                </div>

                {/* Card body */}
                <div className="relative z-20 px-5 pt-4 pb-6 flex flex-col gap-3">
                    {/* ID tag */}
                    <span
                        className="font-mono text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: accent }}
                    >
                        {project.id}
                    </span>

                    {/* Title */}
                    <h3
                        className="font-black uppercase leading-tight text-white transition-all duration-500 group-hover:text-[#4FAEF3] group-hover:drop-shadow-[0_0_10px_rgba(79,174,243,0.6)]"
                        style={{
                            fontFamily: '"Inter", "Arial Black", sans-serif',
                            fontSize: 'clamp(13px, 1.1vw, 16px)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {project.title}
                    </h3>

                    {/* Tagline */}
                    <p
                        className="font-mono uppercase tracking-[0.1em]"
                        style={{ fontSize: '9px', color: accent.replace('0.9', '0.85') }}
                    >
                        {project.tagline}
                    </p>

                    {/* Divider */}
                    <div
                        style={{
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, ${accent.replace('0.9', '0.4')} 30%, ${accent.replace('0.9', '0.4')} 70%, transparent)`,
                            boxShadow: `0 0 10px ${accent.replace('0.9', '0.2')}`,
                        }}
                    />

                    {/* Description */}
                    <p
                        className="leading-relaxed"
                        style={{
                            fontSize: 'clamp(11px, 0.8vw, 13px)',
                            color: 'rgba(255,255,255,0.55)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {project.description}
                    </p>

                    {/* Read more link */}
                    <Link
                        href={project.readMoreLink}
                        className="group/link mt-1 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-300"
                        style={{ color: accent }}
                    >
                        <span className="transition-all duration-300 group-hover/link:underline">
                            READ MORE
                        </span>
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>

                {/* Hover glow overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[4px]"
                    style={{
                        boxShadow: `0 0 35px ${accent.replace('0.9', '0.12')}, inset 0 0 40px ${accent.replace('0.9', '0.04')}`,
                    }}
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Title entrance (gsap.from + immediateRender:false keeps content
            // visible by default; animation plays as an enhancement on scroll) ──
            gsap.from([labelRef.current, titleRef.current].filter(Boolean), {
                opacity: 0,
                y: 30,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
                immediateRender: false,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // ── Cards staggered entrance ─────────────────────────────────────────
            const validCards = cardsRef.current.filter(Boolean);
            if (validCards.length > 0) {
                gsap.from(validCards, {
                    opacity: 0,
                    y: 50,
                    scale: 0.94,
                    duration: 0.8,
                    ease: 'power3.out',
                    immediateRender: false,
                    stagger: { each: 0.1, from: 'start' },
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });
            }

            // Force ScrollTrigger to recalculate all positions after the
            // Domains / Events sections (which have large or sticky heights)
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative w-full overflow-hidden py-24 md:py-32"
        >
            <SectionBackground />

            {/* Top-left section label */}
            <div className="absolute left-5 top-6 z-20 pointer-events-none">
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        letterSpacing: '0.18em',
                        color: 'rgba(255,255,255,0.35)',
                        textTransform: 'uppercase',
                    }}
                >
                    <span style={{ color: '#ffffff', fontWeight: 700, marginRight: 8 }}>
                        04.
                    </span>
                    SYSTEM.LOGS // PROJECTS
                </span>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
                {/* Section header */}
                <div className="mb-14 flex flex-col items-center text-center">
                    <div ref={labelRef}>
                        <span
                            style={{
                                fontSize: '9px',
                                letterSpacing: '0.35em',
                                color: 'rgba(255,255,255,0.2)',
                                fontFamily: 'monospace',
                                marginBottom: 12,
                                display: 'block',
                                textTransform: 'uppercase',
                            }}
                        >
                            ▶ BUILD_LOG // PROJECTS
                        </span>
                    </div>

                    <div ref={titleRef}>
                        <h2
                            style={{
                                margin: 0,
                                fontSize: 'clamp(30px, 5vw, 64px)',
                                fontWeight: 900,
                                color: '#ffffff',
                                letterSpacing: '-0.01em',
                                fontFamily: '"Inter", "Arial Black", sans-serif',
                                textTransform: 'uppercase',
                                lineHeight: 1.02,
                            }}
                        >
                            WHAT WE&apos;VE{' '}
                            <span style={{ color: '#4FAEF3', fontWeight: 900 }}>BUILT</span>
                        </h2>

                        <div
                            style={{
                                marginTop: 14,
                                width: '100%',
                                height: '1px',
                                background:
                                    'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
                            }}
                        />
                    </div>
                </div>

                {/* Cards grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="h-full"
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
