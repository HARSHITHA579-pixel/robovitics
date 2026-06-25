'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamsData } from '../data/clubData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Background (matches Domains / Events / TeamRoster / Projects)
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
                    [10, 15], [75, 10], [22, 65], [88, 45], [50, 80],
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
                <line x1="10%" y1="15%" x2="75%" y2="10%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="75%" y1="10%" x2="88%" y2="45%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="22%" y1="65%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Arrow Button
// ─────────────────────────────────────────────────────────────────────────────
function ArrowBtn({
    direction,
    onClick,
    accentColor,
}: {
    direction: 'left' | 'right';
    onClick: () => void;
    accentColor: string;
}) {
    return (
        <button
            onClick={onClick}
            aria-label={direction === 'left' ? 'Previous team' : 'Next team'}
            className="group relative flex h-12 w-12 items-center justify-center rounded-[4px] transition-all duration-300"
            style={{
                background: 'rgba(10,10,10,0.9)',
                border: '1px solid rgba(255,255,255,0.12)',
            }}
        >
            {/* Corner brackets */}
            {['tl', 'tr', 'bl', 'br'].map((pos) => (
                <span
                    key={pos}
                    className="absolute pointer-events-none transition-all duration-300 group-hover:opacity-100 opacity-0"
                    style={{
                        top: pos.startsWith('t') ? 3 : undefined,
                        bottom: pos.startsWith('b') ? 3 : undefined,
                        left: pos.endsWith('l') ? 3 : undefined,
                        right: pos.endsWith('r') ? 3 : undefined,
                        width: 7, height: 7,
                        borderTop: pos.startsWith('t') ? `1px solid ${accentColor}` : undefined,
                        borderBottom: pos.startsWith('b') ? `1px solid ${accentColor}` : undefined,
                        borderLeft: pos.endsWith('l') ? `1px solid ${accentColor}` : undefined,
                        borderRight: pos.endsWith('r') ? `1px solid ${accentColor}` : undefined,
                    }}
                />
            ))}
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:scale-110"
                style={{ color: 'rgba(255,255,255,0.6)', transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
            >
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Team Slide Card
// ─────────────────────────────────────────────────────────────────────────────
function TeamSlide({
    team,
    isActive,
}: {
    team: (typeof teamsData)[0];
    isActive: boolean;
}) {
    const accent = team.accentColor;

    return (
        <div
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0) scale(1)' : 'translateX(4%) scale(0.97)',
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 2 : 1,
            }}
        >
            <div
                className="relative w-full h-full overflow-hidden rounded-[4px]"
                style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                {/* Inner texture overlay */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        inset: -1,
                        borderRadius: 4,
                        background: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(165deg, rgba(255,255,255,0.09), rgba(255,255,255,0.01) 40%, rgba(0,0,0,0.4)),
              rgba(20,22,26,0.97)
            `,
                        backgroundSize: '18px 18px, 18px 18px, auto, auto',
                        border: '1px solid rgba(235,238,242,0.22)',
                    }}
                />

                {/* Corner brackets */}
                {['tl', 'tr', 'bl', 'br'].map((pos) => (
                    <span
                        key={pos}
                        className="absolute z-10 pointer-events-none"
                        style={{
                            top: pos.startsWith('t') ? 10 : undefined,
                            bottom: pos.startsWith('b') ? 10 : undefined,
                            left: pos.endsWith('l') ? 10 : undefined,
                            right: pos.endsWith('r') ? 10 : undefined,
                            width: 18, height: 18,
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
                    <span style={{ position: 'absolute', top: '-1px', left: '30px', width: '60px', height: '1px', background: accent.replace('0.9', '0.6') }} />
                    <span style={{ position: 'absolute', bottom: '-1px', right: '30px', width: '60px', height: '1px', background: accent.replace('0.9', '0.35') }} />
                </div>

                {/* Content layout: side by side on md+ */}
                <div className="relative z-20 flex h-full flex-col md:flex-row">

                    {/* Photo pane (3D Flip Card) */}
                    <div 
                        className="group relative md:w-[40%] h-56 md:h-full flex-shrink-0 cursor-pointer"
                        style={{ perspective: '1200px' }}
                    >
                        <div 
                            className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateY(180deg)]"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front face (Logo) */}
                            <div 
                                className="absolute inset-0 w-full h-full overflow-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <Image
                                    src={team.teamLogoPath || team.teamPhotoPath}
                                    alt={`${team.teamName} logo`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {/* Gradient fade toward content */}
                                <div
                                    className="absolute inset-0 pointer-events-none z-10"
                                    style={{
                                        background: `
                  linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.85) 100%),
                  linear-gradient(to right, transparent 70%, rgba(10,10,10,0.95) 100%)
                `,
                                    }}
                                />
                            </div>

                            {/* Back face (Photo) */}
                            <div 
                                className="absolute inset-0 w-full h-full overflow-hidden"
                                style={{ 
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <Image
                                    src={team.teamPhotoPath}
                                    alt={`${team.teamName} photo`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {/* Gradient fade toward content */}
                                <div
                                    className="absolute inset-0 pointer-events-none z-10"
                                    style={{
                                        background: `
                  linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.85) 100%),
                  linear-gradient(to right, transparent 70%, rgba(10,10,10,0.95) 100%)
                `,
                                    }}
                                />
                            </div>
                        </div>


                    </div>

                    {/* Text pane */}
                    <div className="flex flex-col justify-center px-8 py-10 md:py-14 md:w-[60%]">
                        {/* Team ID */}
                        <span
                            className="font-mono uppercase tracking-[0.3em] mb-3"
                            style={{ fontSize: '9px', color: accent }}
                        >
                            {team.id}
                        </span>

                        {/* Team name */}
                        <h3
                            className="font-black uppercase text-white leading-tight mb-2"
                            style={{
                                fontFamily: '"Inter", "Arial Black", sans-serif',
                                fontSize: 'clamp(18px, 2.2vw, 30px)',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {team.teamName}
                        </h3>

                        {/* Tagline */}
                        <p
                            className="font-mono uppercase tracking-[0.12em] mb-6"
                            style={{ fontSize: 'clamp(8px, 0.6vw, 10px)', color: accent.replace('0.9', '0.85') }}
                        >
                            {team.tagline}
                        </p>

                        {/* Divider */}
                        <div
                            style={{
                                height: '1px',
                                marginBottom: 20,
                                background: `linear-gradient(90deg, ${accent.replace('0.9', '0.5')} 0%, transparent 100%)`,
                                boxShadow: `0 0 10px ${accent.replace('0.9', '0.2')}`,
                            }}
                        />

                        {/* Description */}
                        <p
                            className="leading-relaxed"
                            style={{
                                fontSize: 'clamp(12px, 0.85vw, 14px)',
                                color: 'rgba(255,255,255,0.55)',
                                maxWidth: '42ch',
                            }}
                        >
                            {team.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TechnicalTeams Section
// ─────────────────────────────────────────────────────────────────────────────
export default function TechnicalTeams() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const total = teamsData.length;

    // ── Navigate ─────────────────────────────────────────────────────────────
    const goTo = useCallback((index: number) => {
        setActiveIndex(((index % total) + total) % total);
    }, [total]);

    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

    // ── Touch / swipe support ────────────────────────────────────────────────
    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) delta < 0 ? goNext() : goPrev();
        touchStartX.current = null;
    };

    // ── Auto-advance (pauses on hover) ───────────────────────────────────────
    const isHovering = useRef(false);
    useEffect(() => {
        const id = setInterval(() => {
            if (!isHovering.current) goNext();
        }, 6000);
        return () => clearInterval(id);
    }, [goNext]);

    // ── GSAP scroll entrance ─────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            // gsap.from + immediateRender:false keeps all content visible by
            // default. Animations play as an enhancement when triggered.
            gsap.from(
                [
                    labelRef.current,
                    titleRef.current,
                    carouselRef.current,
                    controlsRef.current,
                ].filter(Boolean),
                {
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger: 0.12,
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Recalculate positions after the large Domains / Events sections
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Keyboard navigation ───────────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [goPrev, goNext]);

    const activeAccent = teamsData[activeIndex].accentColor;

    return (
        <section
            ref={sectionRef}
            id="technical-teams"
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
                        05.
                    </span>
                    SYSTEM.LOGS // TECH_TEAMS
                </span>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-12">

                {/* Section header */}
                <div className="mb-12 flex flex-col items-center text-center">
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
                            ▶ UNIT_MANIFEST // TECH_TEAMS
                        </span>
                    </div>

                    <div ref={titleRef}>
                        <h2
                            style={{
                                margin: 0,
                                fontSize: 'clamp(28px, 4.5vw, 64px)',
                                fontWeight: 900,
                                color: '#ffffff',
                                letterSpacing: '-0.01em',
                                fontFamily: '"Inter", "Arial Black", sans-serif',
                                textTransform: 'uppercase',
                                lineHeight: 1.02,
                            }}
                        >
                            Teams from{' '}
                            <span style={{ color: '#4FAEF3', fontWeight: 900 }}>RoboVITics</span>
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

                {/* Carousel */}
                <div
                    ref={carouselRef}
                    className="relative w-full overflow-hidden"
                    style={{ height: 'clamp(380px, 50vh, 520px)' }}
                    onMouseEnter={() => { isHovering.current = true; }}
                    onMouseLeave={() => { isHovering.current = false; }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {teamsData.map((team, i) => (
                        <TeamSlide
                            key={team.id}
                            team={team}
                            isActive={i === activeIndex}
                        />
                    ))}
                </div>

                {/* Controls row */}
                <div
                    ref={controlsRef}
                    className="mt-8 flex items-center justify-center gap-6"
                >
                    {/* Left arrow */}
                    <ArrowBtn direction="left" onClick={goPrev} accentColor={activeAccent} />

                    {/* Dot indicators */}
                    <div className="flex items-center gap-3">
                        {teamsData.map((team, i) => {
                            const ac = team.accentColor;
                            return (
                                <button
                                    key={team.id}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to team ${i + 1}`}
                                    className="relative transition-all duration-500"
                                    style={{
                                        width: i === activeIndex ? 28 : 8,
                                        height: 8,
                                        borderRadius: 4,
                                        background:
                                            i === activeIndex
                                                ? ac
                                                : 'rgba(255,255,255,0.18)',
                                        boxShadow:
                                            i === activeIndex
                                                ? `0 0 10px ${ac.replace('0.9', '0.5')}`
                                                : 'none',
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Right arrow */}
                    <ArrowBtn direction="right" onClick={goNext} accentColor={activeAccent} />
                </div>

                {/* Index counter */}
                <div className="mt-5 flex justify-center">
                    <span
                        className="font-mono uppercase tracking-[0.25em]"
                        style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}
                    >
                        {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
}
