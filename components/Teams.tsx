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
// Shared Background
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(79,174,243,0.03),transparent_70%)] pointer-events-none" />
            {(
                [
                    [10, 15], [75, 10], [22, 65], [88, 45], [50, 80],
                ] as [number, number][]
            ).map(([lp, tp], i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${lp}%`, top: `${tp}%`, width: 5, height: 5,
                        background: 'rgba(255,255,255,0.25)',
                        boxShadow: '0 0 6px rgba(255,255,255,0.15)',
                    }}
                />
            ))}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="10%" y1="15%" x2="75%" y2="10%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="75%" y1="10%" x2="88%" y2="45%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="22%" y1="65%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Arrow Button
// ─────────────────────────────────────────────────────────────────────────────
function ArrowBtn({
    direction, onClick, accentColor,
}: {
    direction: 'left' | 'right'; onClick: () => void; accentColor: string;
}) {
    return (
        <button
            onClick={onClick}
            aria-label={direction === 'left' ? 'Previous team' : 'Next team'}
            className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[4px] transition-all duration-300 hover:bg-white/[0.02]"
            style={{
                background: 'rgba(10,10,10,0.9)',
                border: '1px solid rgba(255,255,255,0.12)',
            }}
        >
            {['tl', 'tr', 'bl', 'br'].map((pos) => (
                <span
                    key={pos}
                    className="absolute pointer-events-none transition-all duration-300 group-hover:opacity-100 opacity-0"
                    style={{
                        top: pos.startsWith('t') ? 3 : undefined, bottom: pos.startsWith('b') ? 3 : undefined,
                        left: pos.endsWith('l') ? 3 : undefined, right: pos.endsWith('r') ? 3 : undefined,
                        width: 7, height: 7,
                        borderTop: pos.startsWith('t') ? `1px solid ${accentColor}` : undefined,
                        borderBottom: pos.startsWith('b') ? `1px solid ${accentColor}` : undefined,
                        borderLeft: pos.endsWith('l') ? `1px solid ${accentColor}` : undefined,
                        borderRight: pos.endsWith('r') ? `1px solid ${accentColor}` : undefined,
                    }}
                />
            ))}
            <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
    team, isActive,
}: {
    team: (typeof teamsData)[0]; isActive: boolean;
}) {
    const accent = team.accentColor;

    return (
        <div
            className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center"
            style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0) scale(1)' : 'translateX(3%) scale(0.98)',
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 2 : 1,
            }}
        >
            <div
                // Reduced sm:min-h from 460px to 400px to account for removed badges
                className="relative w-full h-full sm:h-auto sm:min-h-[400px] overflow-hidden rounded-[4px] flex flex-col md:flex-row transition-all duration-500 shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(0,0,0,0.8)]"
                style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                {/* Inner texture overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(165deg, rgba(255,255,255,0.09), rgba(255,255,255,0.01) 40%, rgba(0,0,0,0.4))
                        `,
                        backgroundSize: '18px 18px, 18px 18px, auto',
                    }}
                />

                {/* Corner brackets */}
                {['tl', 'tr', 'bl', 'br'].map((pos) => (
                    <span
                        key={pos}
                        className="absolute z-10 pointer-events-none"
                        style={{
                            top: pos.startsWith('t') ? 8 : undefined, bottom: pos.startsWith('b') ? 8 : undefined,
                            left: pos.endsWith('l') ? 8 : undefined, right: pos.endsWith('r') ? 8 : undefined,
                            width: 14, height: 14,
                            borderTop: pos.startsWith('t') ? `1.5px solid ${accent}` : undefined,
                            borderBottom: pos.startsWith('b') ? `1.5px solid ${accent}` : undefined,
                            borderLeft: pos.endsWith('l') ? `1.5px solid ${accent}` : undefined,
                            borderRight: pos.endsWith('r') ? `1.5px solid ${accent}` : undefined,
                            filter: `drop-shadow(0 0 6px ${accent.replace('0.9', '0.6')})`,
                        }}
                    />
                ))}

                {/* Accent top/bottom lines */}
                <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
                    <span style={{ position: 'absolute', top: '-1px', left: '30px', width: '60px', height: '1px', background: accent.replace('0.9', '0.6') }} />
                    <span style={{ position: 'absolute', bottom: '-1px', right: '30px', width: '60px', height: '1px', background: accent.replace('0.9', '0.35') }} />
                </div>

                {/* Photo pane (3D Flip Card) */}
                <div
                    className="group relative h-36 sm:h-64 md:h-auto md:w-[45%] flex-shrink-0 cursor-pointer border-b md:border-b-0 md:border-r border-white/10"
                    style={{ perspective: '1200px', background: 'rgba(5,5,5,0.5)' }}
                >
                    <div
                        className="absolute inset-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateY(180deg)]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Front face (Logo) */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[4px] border border-white/5 bg-black" style={{ backfaceVisibility: 'hidden' }}>
                            <Image
                                src={team.teamLogoPath || team.teamPhotoPath}
                                alt={`${team.teamName} logo`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover opacity-80 mix-blend-screen"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_51%)] bg-[length:100%_4px] opacity-20" />
                            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 40px rgba(0,0,0,0.8), inset 0 0 0 1px ${accent.replace('0.9', '0.2')}` }} />
                        </div>

                        {/* Back face (Photo) */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[4px] border border-white/5 bg-black" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <Image
                                src={team.teamPhotoPath}
                                alt={`${team.teamName} photo`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover opacity-70 sepia-[0.2] hue-rotate-[-10deg]"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_51%)] bg-[length:100%_4px] opacity-20" />
                            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 40px rgba(0,0,0,0.9), inset 0 0 0 1px ${accent.replace('0.9', '0.2')}` }} />
                        </div>
                    </div>

                    {/* HUD Corner Accents for Image Box */}
                    <svg className="absolute inset-4 pointer-events-none opacity-50 z-20" style={{ width: 'calc(100% - 32px)', height: 'calc(100% - 32px)' }}>
                        <path d="M0,10 L0,0 L10,0" fill="none" stroke={accent} strokeWidth="1.5" />
                        <path d="M100%,10 L100%,0 Lcalc(100% - 10px),0" fill="none" stroke={accent} strokeWidth="1.5" />
                        <path d="M0,calc(100% - 10px) L0,100% L10,100%" fill="none" stroke={accent} strokeWidth="1.5" />
                        <path d="M100%,calc(100% - 10px) L100%,100% Lcalc(100% - 10px),100%" fill="none" stroke={accent} strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Text pane */}
                <div className="flex flex-col justify-center px-4 py-5 sm:px-8 sm:py-10 md:px-12 md:py-14 md:w-[55%] z-20 bg-gradient-to-br from-transparent to-black/40">
                    <span
                        className="font-mono uppercase tracking-[0.3em] mb-1 sm:mb-3"
                        style={{ fontSize: 'clamp(9px, 1vw, 11px)', color: accent, textShadow: `0 0 8px ${accent.replace('0.9', '0.4')}` }}
                    >
                        {team.id}
                    </span>

                    <h3
                        className="font-black uppercase text-white leading-tight mb-1 sm:mb-2"
                        style={{
                            fontFamily: '"Inter", "Arial Black", sans-serif',
                            fontSize: 'clamp(22px, 3vw, 36px)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {team.teamName}
                    </h3>

                    <p
                        className="font-mono uppercase tracking-[0.15em] mb-3 sm:mb-6"
                        style={{ fontSize: 'clamp(8.5px, 0.7vw, 11px)', color: 'rgba(255,255,255,0.4)' }}
                    >
                        {team.tagline}
                    </p>

                    <div
                        className="mb-3 sm:mb-5 w-[80%]"
                        style={{
                            height: '1px', 
                            background: `linear-gradient(90deg, ${accent.replace('0.9', '0.5')} 0%, transparent 100%)`,
                            boxShadow: `0 0 10px ${accent.replace('0.9', '0.2')}`,
                        }}
                    />

                    <p
                        className="leading-snug sm:leading-relaxed font-light tracking-wide"
                        style={{
                            fontSize: 'clamp(12px, 1vw, 15px)',
                            color: 'rgba(255,255,255,0.65)',
                            maxWidth: '46ch',
                        }}
                    >
                        {team.description}
                    </p>
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

    const goTo = useCallback((index: number) => {
        setActiveIndex(((index % total) + total) % total);
    }, [total]);

    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

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

    const isHovering = useRef(false);
    useEffect(() => {
        const id = setInterval(() => {
            if (!isHovering.current) goNext();
        }, 6000);
        return () => clearInterval(id);
    }, [goNext]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(
                [labelRef.current, titleRef.current, carouselRef.current, controlsRef.current].filter(Boolean),
                {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );
            ScrollTrigger.refresh();
        }, sectionRef);
        return () => ctx.revert();
    }, []);

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
        <section ref={sectionRef} id="technical-teams" className="relative w-full overflow-hidden py-10 sm:py-24 md:py-32">
            <SectionBackground />

            {/* Top-left section label */}
            <div className="absolute left-5 sm:left-10 top-6 sm:top-10 z-20 pointer-events-none hidden sm:block">
                <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                    <span style={{ color: '#ffffff', fontWeight: 700, marginRight: 8 }}>05.</span>
                    SYSTEM.LOGS // TECH_TEAMS
                </span>
            </div>

            <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 md:px-12">

                {/* Section header */}
                <div className="mb-6 sm:mb-14 flex flex-col items-center text-center pointer-events-none">
                    <div ref={labelRef}>
                        <span
                            className="text-[9px] sm:text-[10px]"
                            style={{ letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginBottom: 12, display: 'block', textTransform: 'uppercase' }}
                        >
                            ▶ UNIT_MANIFEST // TECH_TEAMS
                        </span>
                    </div>

                    <div ref={titleRef}>
                        <h2 style={{ margin: 0, fontSize: 'clamp(30px, 6vw, 64px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', fontFamily: '"Inter", "Arial Black", sans-serif', textTransform: 'uppercase', lineHeight: 1 }}>
                            TEAMS AT <span style={{ color: '#4FAEF3', fontWeight: 900 }}>ROBOVITICS.</span>
                        </h2>
                        <div style={{ marginTop: 14, width: '40%', height: '1px', marginInline: 'auto', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
                    </div>
                </div>

                {/* Carousel */}
<div
    ref={carouselRef}
    // Change md:h-[460px] to md:h-[400px] or md:h-[420px]
    className="relative w-full overflow-hidden min-h-[380px] sm:min-h-[440px] md:h-[400px]"
    onMouseEnter={() => { isHovering.current = true; }}
    onMouseLeave={() => { isHovering.current = false; }}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
>
                    {teamsData.map((team, i) => (
                        <TeamSlide key={team.id} team={team} isActive={i === activeIndex} />
                    ))}
                </div>

                {/* Controls row */}
                <div ref={controlsRef} className="mt-8 sm:mt-10 flex items-center justify-center gap-6 sm:gap-8">
                    <ArrowBtn direction="left" onClick={goPrev} accentColor={activeAccent} />
                    <div className="flex items-center gap-2 sm:gap-3">
                        {teamsData.map((team, i) => {
                            const ac = team.accentColor;
                            return (
                                <button
                                    key={team.id} onClick={() => goTo(i)} aria-label={`Go to team ${i + 1}`}
                                    className="relative transition-all duration-500"
                                    style={{
                                        width: i === activeIndex ? 24 : 6, height: 6, borderRadius: 3,
                                        background: i === activeIndex ? ac : 'rgba(255,255,255,0.18)',
                                        boxShadow: i === activeIndex ? `0 0 10px ${ac.replace('0.9', '0.5')}` : 'none',
                                    }}
                                />
                            );
                        })}
                    </div>
                    <ArrowBtn direction="right" onClick={goNext} accentColor={activeAccent} />
                </div>

                {/* Index counter */}
                <div className="mt-4 sm:mt-5 flex justify-center pointer-events-none">
                    <span
                        className="font-mono uppercase tracking-[0.25em] text-[9px] sm:text-[10px]"
                        style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                        {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </div>

            </div>
        </section>
    );
}