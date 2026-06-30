'use client';

import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── TYPES & IK ─────────────────────────────────────────────────────────────
interface Point { x: number; y: number; }
interface Sponsor { id: string; name: string; tier: string; }

function dist(a: Point, b: Point) { return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2); }
function lv(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpPt(a: Point, b: Point, t: number): Point { return { x: lv(a.x, b.x, t), y: lv(a.y, b.y, t) }; }
function angOf(a: Point, b: Point) { return Math.atan2(b.y - a.y, b.x - a.x); }

function solveFABRIK(joints: Point[], target: Point, lens: number[]): Point[] {
    const n = joints.length, base = { ...joints[0] };
    const r = joints.map(j => ({ ...j }));
    if (dist(base, target) > lens.reduce((a, b) => a + b, 0)) {
        for (let i = 0; i < n - 1; i++) {
            const d = dist(r[i], target); const l = d < .001 ? 1 : lens[i] / d;
            r[i + 1] = { x: r[i].x + (target.x - r[i].x) * l, y: r[i].y + (target.y - r[i].y) * l };
        }
        return r;
    }
    for (let it = 0; it < 12; it++) {
        r[n - 1] = { ...target };
        for (let i = n - 2; i >= 0; i--) { const d = dist(r[i + 1], r[i]); const l = d < .001 ? 1 : lens[i] / d; r[i] = { x: r[i + 1].x + (r[i].x - r[i + 1].x) * l, y: r[i + 1].y + (r[i].y - r[i + 1].y) * l }; }
        r[0] = { ...base };
        for (let i = 0; i < n - 1; i++) { const d = dist(r[i], r[i + 1]); const l = d < .001 ? 1 : lens[i] / d; r[i + 1] = { x: r[i].x + (r[i + 1].x - r[i].x) * l, y: r[i].y + (r[i + 1].y - r[i].y) * l }; }
    }
    return r;
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const SPONSORS: Sponsor[] = [
    { id: 'SP_001', name: 'NEXON DYNAMICS', tier: 'LEVEL 1' },
    { id: 'SP_002', name: 'TITANFORGE LABS', tier: 'LEVEL 1' },
    { id: 'SP_003', name: 'VOLTARC SYSTEMS', tier: 'LEVEL 2' },
    { id: 'SP_004', name: 'CYGNUS ROBOTICS', tier: 'LEVEL 1' },
    { id: 'SP_005', name: 'AXION VENTURES', tier: 'LEVEL 2' },
    { id: 'SP_006', name: 'HELIX FOUNDRY', tier: 'LEVEL 3' },
    { id: 'SP_007', name: 'MERIDIAN TECH', tier: 'LEVEL 2' },
    { id: 'SP_008', name: 'QUASAR DESIGN', tier: 'LEVEL 3' },
    { id: 'SP_009', name: 'OMNI SYSTEMS', tier: 'LEVEL 2' },
    { id: 'SP_010', name: 'VANGUARD AI', tier: 'LEVEL 1' },
    { id: 'SP_011', name: 'YOUR_SPONSOR_NAME', tier: 'LEVEL X' },
];

function SponsorMarquee() {
    return (
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden md:hidden">
            <motion.div
                className="flex w-max gap-4 px-4 pb-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            >
                {[...SPONSORS, ...SPONSORS].map((sp, i) => (
                    <div key={`${sp.id}-${i}`} className="h-40 w-[230px] flex-shrink-0">
                        <SponsorCard sponsor={sp} isHovered={false} onHoverChange={() => {}} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// ─── SPONSOR CARD ───────────────────────────────────────────────────────────
function SponsorCard({ 
    sponsor, 
    isHovered, 
    onHoverChange, 
    registerCard,
    onCardPointerDown
}: {
    sponsor: Sponsor; isHovered: boolean;
    onHoverChange: (h: boolean, r: DOMRect | null) => void;
    registerCard?: (id: string, el: HTMLDivElement | null) => void;
    onCardPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const setCardRef = useCallback((node: HTMLDivElement | null) => {
        ref.current = node;
        registerCard?.(sponsor.id, node);
    }, [registerCard, sponsor.id]);

    return (
        <motion.div 
            ref={setCardRef} 
            className="cursor-grab relative w-full h-full active:cursor-grabbing"
            style={{ touchAction: 'none', willChange: 'transform' }}
            onPointerDown={onCardPointerDown}
            onMouseEnter={() => onHoverChange(true, ref.current?.getBoundingClientRect() ?? null)}
            onMouseLeave={() => onHoverChange(false, null)}>
            
            <div className="relative h-full overflow-hidden rounded-[4px] transition-all duration-500"
                style={{
                    padding: 'clamp(14px, 1.4vw, 18px) clamp(12px, 1.3vw, 16px) clamp(13px, 1.3vw, 17px)',
                    // 1. FROSTED GLASS BASE LAYER
                    background: 'rgba(12, 15, 20, 0.25)', 
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isHovered ? '0 0 25px rgba(79,174,243,0.18)' : 'none',
                }}>
                
                {/* 2. THE GRID PATTERN OVERLAY */}
                <div className="absolute pointer-events-none transition-all duration-500"
                    style={{
                        top: -1, right: -1, bottom: -1, left: -1,
                        borderRadius: '4px',
                        background: `
                            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.01) 38%, transparent)
                        `,
                        backgroundSize: '18px 18px, 18px 18px, auto, auto',
                        border: isHovered ? '1px solid rgba(79,174,243,0.4)' : '1px solid rgba(235,238,242,0.28)',
                    }} />

             
                {/* Cyan top/bottom highlight lines */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <span style={{ position: 'absolute', top: '-1px', left: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.6)' }} />
                    <span style={{ position: 'absolute', bottom: '-1px', right: '20px', width: '40px', height: '1px', background: 'rgba(79,174,243,0.35)' }} />
                </div>

                <div className="relative z-30 flex h-full flex-col items-center justify-center">
                    {/* Glowing Logo Placeholder Box */}
                    <div style={{
                        margin: '6px auto 14px',
                        width: 'clamp(46px, 5.4vw, 68px)',
                        height: 'clamp(46px, 5.4vw, 68px)',
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isHovered ? 'rgba(79,174,243,0.15)' : 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
                        boxShadow: isHovered ? 'inset 0 0 22px rgba(79,174,243,0.25), inset 0 0 0 1px rgba(79,174,243,0.4)' : 'inset 0 0 22px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.08)',
                        border: '1px solid rgba(235,238,242,0.18)',
                        transition: 'all 0.4s ease'
                    }}>
                        <span className="font-mono text-[10px] text-[rgba(255,255,255,0.4)]">LOGO</span>
                    </div>

                    <h3 className="text-center font-sans font-black uppercase tracking-[0.06em] text-white transition-all duration-500"
                        style={{
                            margin: '0 0 7px',
                            fontSize: 'clamp(11px, 1vw, 14px)',
                            lineHeight: 1.15,
                            filter: isHovered ? 'drop-shadow(0 0 10px rgba(255,255,255,0.6))' : 'none',
                        }}>
                        {sponsor.name}
                    </h3>
                    <p className="text-center font-mono uppercase tracking-[0.1em] transition-all duration-500"
                        style={{ margin: '0 0 10px', fontSize: 'clamp(7px, 0.55vw, 9px)', color: 'rgba(79,174,243,0.85)' }}>
                        {sponsor.tier}
                    </p>

                    <div style={{
                        height: '1px', margin: '0 6px 10px', width: 'calc(100% - 12px)',
                        background: 'linear-gradient(90deg, transparent, rgba(79,174,243,0.4) 30%, rgba(79,174,243,0.4) 70%, transparent)',
                        boxShadow: '0 0 10px rgba(79,174,243,0.2)',
                    }} />
                </div>
            </div>
        </motion.div>
    );
}

// ─── HEADER (UPGRADED TO MATCH DOMAINS HUD) ─────────────────────────────────
function Header() {
    return (
        <div className="rv-section-header z-20 mb-12 sm:mb-16 relative">
            <span className="rv-section-kicker">
                ▶ PARTNERSHIPS // SPONSORS
            </span>
            <motion.h2 
                className="rv-section-title rv-section-title--single-line"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
                style={{
                    '--rv-section-title-mobile': 'clamp(28px, 7.8vw, 36px)',
                    '--rv-section-title-desktop': 'clamp(28px, 4.2vw, 56px)',
            } as CSSProperties}>
                OUR <span style={{ color: '#4FAEF3', fontWeight: 900 }}>SPONSORS.</span>
            </motion.h2>
            <motion.div 
                className="rv-section-rule"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    );
}

// ─── ARM DIMENSIONS (HEAVY INDUSTRIAL 4-JOINT) ──────────────────────────────
const NJ = 4; // 4 Joints, meaning 3 long links.
const SR = [0.38, 0.32, 0.16]; // Long, sweeping reach
const BH_START = [70, 50, 34]; // Very thick bases for each link (tapering design)
const BH_END = [50, 34, 22]; // Ends of links are narrower
const JR = [46, 36, 26, 18]; // Massive outer joints
const JIR = [30, 24, 18, 12]; // Inner rings
const JSR = [12, 10, 8, 6]; // Shafts
const D = 180 / Math.PI;

// ─── MAIN ───────────────────────────────────────────────────────────────────
export default function Sponsors() {
    const secRef = useRef<HTMLElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [heldId, setHeldId] = useState<string | null>(null);
    const [pickableId, setPickableId] = useState<string | null>(null);
    const [showSponsorHelp, setShowSponsorHelp] = useState(false);
    const [hasMovedCards, setHasMovedCards] = useState(false);
    const heldIdRef = useRef<string | null>(null);
    const pickableIdRef = useRef<string | null>(null);
    const cardEls = useRef<Record<string, HTMLDivElement | null>>({});
    const cardOrigins = useRef<Record<string, Point>>({});
    const cardOffsets = useRef<Record<string, Point>>({});

    const els = useRef<Record<string, SVGElement | null>>({});
    const ref = useCallback((k: string) => (e: SVGElement | null) => { els.current[k] = e; }, []);
    const registerCard = useCallback((id: string, el: HTMLDivElement | null) => { cardEls.current[id] = el; }, []);

    const st = useRef({
        mouse: { x: 0, y: 0 } as Point,
        target: { x: 0, y: 0 } as Point,
        joints: Array.from({ length: NJ }, () => ({ x: 0, y: 0 })) as Point[],
        lens: SR.map(() => 0),
        base: { x: 0, y: 0 } as Point,
        baseHome: { x: 0, y: 0 } as Point,
        baseOffsetX: 0,
        baseTargetOffsetX: 0,
        w: 0, h: 0,
        hRect: null as DOMRect | null,
        locked: false,
        grip: 0.35,
        I: 0,
        raf: 0,
        ok: false,
    });

    const measure = useCallback(() => {
        const s = st.current, el = secRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        s.w = r.width; s.h = r.height;
        const diag = Math.sqrt(r.width ** 2 + r.height ** 2);

        // Total reach ~ 0.45 of diag
        s.lens = SR.map(ratio => ratio * diag * 0.45);
        s.baseHome = { x: r.width * 0.12, y: r.height * 0.88 }; // Firmly planted in bottom left
        const minBaseX = 95;
        const maxBaseX = Math.max(minBaseX, r.width - 95);
        s.baseOffsetX = Math.max(minBaseX - s.baseHome.x, Math.min(maxBaseX - s.baseHome.x, s.baseOffsetX));
        s.baseTargetOffsetX = Math.max(minBaseX - s.baseHome.x, Math.min(maxBaseX - s.baseHome.x, s.baseTargetOffsetX));
        s.base = { x: s.baseHome.x + s.baseOffsetX, y: s.baseHome.y };
        if (!s.ok) {
            // Offset initial joints slightly so FABRIK doesn't divide by zero when perfectly stacked
            s.joints = s.joints.map((_, i) => ({ x: s.base.x, y: s.base.y - i * 10 }));
            s.target = { x: r.width * 0.5, y: r.height * 0.5 };
            s.mouse = { ...s.target }; s.ok = true;
        }
        svgRef.current?.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    }, []);

    useEffect(() => {
        const sec = secRef.current; if (!sec) return;
        const mv = (e: MouseEvent) => { const r = sec.getBoundingClientRect(); st.current.mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
        const lv2 = () => { const s = st.current; if (!heldIdRef.current) s.mouse = { x: s.w * 0.5, y: s.h * 0.5 }; };
        sec.addEventListener('mousemove', mv, { passive: true });
        sec.addEventListener('mouseleave', lv2, { passive: true });
        return () => { sec.removeEventListener('mousemove', mv); sec.removeEventListener('mouseleave', lv2); };
    }, []);

    const onCard = useCallback(() => (on: boolean, rect: DOMRect | null) => {
        const s = st.current;
        if (heldIdRef.current) return;
        if (on && rect && secRef.current) {
            const sr = secRef.current.getBoundingClientRect();
            s.hRect = new DOMRect(rect.left - sr.left, rect.top - sr.top, rect.width, rect.height);
            s.locked = true;
        } else { s.hRect = null; s.locked = false; }
    }, []);

    const getClawPoint = useCallback((): Point | null => {
        const s = st.current;
        if (!s.ok) return null;
        const ee = s.joints[NJ - 1];
        const wr = s.joints[NJ - 2];
        if (!ee || !wr) return null;
        const la = angOf(wr, ee);
        return {
            x: ee.x + Math.cos(la) * 42,
            y: ee.y + Math.sin(la) * 42,
        };
    }, []);

    const canClawPickCard = useCallback((id: string) => {
        const sec = secRef.current;
        const el = cardEls.current[id];
        const clawPoint = getClawPoint();
        if (!sec || !el || !clawPoint) return false;

        const sr = sec.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        const cardRect = {
            left: rect.left - sr.left,
            right: rect.right - sr.left,
            top: rect.top - sr.top,
            bottom: rect.bottom - sr.top,
        };
        const pickupMargin = 10;

        return (
            clawPoint.x >= cardRect.left - pickupMargin &&
            clawPoint.x <= cardRect.right + pickupMargin &&
            clawPoint.y >= cardRect.top - pickupMargin &&
            clawPoint.y <= cardRect.bottom + pickupMargin
        );
    }, [getClawPoint]);

    const releaseCard = useCallback(() => {
        const current = heldIdRef.current;
        if (current) {
            const el = cardEls.current[current];
            const offset = cardOffsets.current[current] ?? { x: 0, y: 0 };
            if (el) {
                el.style.transform = `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`;
                el.style.transition = 'transform 160ms ease-out';
                el.style.zIndex = '45';
                el.style.pointerEvents = '';
            }
            delete cardOrigins.current[current];
            setHasMovedCards(true);
        }
        heldIdRef.current = null;
        setHeldId(null);
        st.current.locked = Boolean(st.current.hRect);
    }, []);

    const resetSponsorCards = useCallback(() => {
        heldIdRef.current = null;
        pickableIdRef.current = null;
        cardOrigins.current = {};
        cardOffsets.current = {};

        SPONSORS.forEach((sponsor) => {
            const el = cardEls.current[sponsor.id];
            if (!el) return;
            el.style.transform = '';
            el.style.transition = 'transform 180ms ease-out';
            el.style.zIndex = '';
            el.style.pointerEvents = '';
        });

        setHeldId(null);
        setPickableId(null);
        setHasMovedCards(false);
        setShowSponsorHelp(true);
        st.current.hRect = null;
        st.current.locked = false;
    }, []);

    const pickCard = useCallback((id: string) => {
        if (!canClawPickCard(id)) return false;

        releaseCard();
        heldIdRef.current = id;
        setHeldId(id);
        st.current.locked = true;

        const el = cardEls.current[id];
        if (el && secRef.current) {
            const sr = secRef.current.getBoundingClientRect();
            const rect = el.getBoundingClientRect();
            const offset = cardOffsets.current[id] ?? { x: 0, y: 0 };
            cardOrigins.current[id] = {
                x: rect.left - sr.left + rect.width / 2 - offset.x,
                y: rect.top - sr.top + rect.height / 2 - offset.y,
            };
            el.style.transition = 'none';
            el.style.zIndex = '60';
            el.style.pointerEvents = 'auto';
        }
        return true;
    }, [canClawPickCard, releaseCard]);

    const updateMouseFromPointer = useCallback((event: PointerEvent | ReactPointerEvent<HTMLDivElement>) => {
        const sec = secRef.current;
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        st.current.mouse = { x: event.clientX - r.left, y: event.clientY - r.top };
    }, []);

    const onCardPointerDown = useCallback((id: string) => (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!secRef.current || window.innerWidth < 768) return;
        event.preventDefault();
        setShowSponsorHelp(true);
        pickCard(id);
        updateMouseFromPointer(event);
    }, [pickCard, updateMouseFromPointer]);

    useEffect(() => {
        const onPointerMove = (event: PointerEvent) => {
            if (!heldIdRef.current) return;
            updateMouseFromPointer(event);
        };
        const onPointerUp = () => {
            if (!heldIdRef.current) return;
            releaseCard();
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };
    }, [releaseCard, updateMouseFromPointer]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const s = st.current;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                if (!secRef.current || window.innerWidth < 768) return;
                event.preventDefault();
                setShowSponsorHelp(true);
                const dir = event.key === 'ArrowLeft' ? -1 : 1;
                const step = event.shiftKey ? 56 : 28;
                const minBaseX = 95;
                const maxBaseX = Math.max(minBaseX, s.w - 95);
                const currentTargetX = s.baseHome.x + s.baseTargetOffsetX;
                const nextBaseX = Math.max(minBaseX, Math.min(maxBaseX, currentTargetX + dir * step));
                s.baseTargetOffsetX = nextBaseX - s.baseHome.x;
            }

            if (event.key === ' ' || event.key === 'Enter') {
                if (!secRef.current || window.innerWidth < 768) return;
                if (heldIdRef.current) return;
                const targetId = pickableIdRef.current;
                if (!targetId) return;
                event.preventDefault();
                pickCard(targetId);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        const onKeyUp = (event: KeyboardEvent) => {
            if ((event.key === ' ' || event.key === 'Enter') && heldIdRef.current) {
                releaseCard();
            }
        };
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [pickCard, releaseCard]);

    // ── 60 fps loop ──
    useEffect(() => {
        measure();
        const onR = () => measure();
        window.addEventListener('resize', onR, { passive: true });

        const tick = () => {
            const s = st.current, e = els.current;
            const holding = Boolean(heldIdRef.current);

            // Target
            const want: Point = !holding && s.locked && s.hRect
                ? { x: s.hRect.x + s.hRect.width / 2, y: s.hRect.y + s.hRect.height / 2 }
                : { ...s.mouse };
            s.target = lerpPt(s.target, want, holding || s.locked ? 0.14 : 0.06);

            // IK
            s.baseOffsetX = lv(s.baseOffsetX, s.baseTargetOffsetX, 0.16);
            if (Math.abs(s.baseTargetOffsetX - s.baseOffsetX) < 0.05) {
                s.baseOffsetX = s.baseTargetOffsetX;
            }
            s.base = { x: s.baseHome.x + s.baseOffsetX, y: s.baseHome.y };
            s.joints[0] = { ...s.base };
            s.joints = solveFABRIK(s.joints, s.target, s.lens);

            const eeForPick = s.joints[NJ - 1];
            const wrForPick = s.joints[NJ - 2];
            const pickAngle = angOf(wrForPick, eeForPick);
            const clawPoint = {
                x: eeForPick.x + Math.cos(pickAngle) * 42,
                y: eeForPick.y + Math.sin(pickAngle) * 42,
            };
            const srForPick = secRef.current?.getBoundingClientRect();
            let nextPickableId: string | null = null;
            if (!holding && srForPick) {
                const pickupMargin = 10;
                for (const sponsor of SPONSORS) {
                    const el = cardEls.current[sponsor.id];
                    if (!el) continue;
                    const rect = el.getBoundingClientRect();
                    const left = rect.left - srForPick.left - pickupMargin;
                    const right = rect.right - srForPick.left + pickupMargin;
                    const top = rect.top - srForPick.top - pickupMargin;
                    const bottom = rect.bottom - srForPick.top + pickupMargin;
                    if (clawPoint.x >= left && clawPoint.x <= right && clawPoint.y >= top && clawPoint.y <= bottom) {
                        nextPickableId = sponsor.id;
                        break;
                    }
                }
            }
            if (pickableIdRef.current !== nextPickableId) {
                pickableIdRef.current = nextPickableId;
                setPickableId(nextPickableId);
            }

            // Intensity
            const activeGrip = holding || s.locked;
            s.I = lv(s.I, activeGrip ? 1 : 0, 0.09);
            s.grip = lv(s.grip, activeGrip ? 0.8 : 0.2, 0.1);
            const t = s.I;

            // ─── Colors (Highly Visible & Contrast Heavy) ──
            const cBS = `rgba(79,174,243,${lv(.45, .80, t).toFixed(3)})`;      // beam stroke
            const cPS = `rgba(79,174,243,${lv(.30, .60, t).toFixed(3)})`;      // panel stroke
            const cJS = `rgba(79,174,243,${lv(.60, .95, t).toFixed(3)})`;      // joint stroke
            const cJF = `rgba(10,15,25,${lv(.85, .95, t).toFixed(3)})`;        // joint fill (recess fallback)
            const cJI = `rgba(79,174,243,${lv(.35, .65, t).toFixed(3)})`;      // joint inner stroke
            const cSH = `rgba(79,174,243,${lv(.65, 1.0, t).toFixed(3)})`;      // shaft fill
            const cGS = `rgba(79,174,243,${lv(.55, .90, t).toFixed(3)})`;      // gripper stroke
            const cBL = `rgba(79,174,243,${lv(.50, .85, t).toFixed(3)})`;      // bolt fill
            const cCB = `rgba(79,174,243,${lv(.40, .70, t).toFixed(3)})`;      // cable color
            const glow = t > .05 ? `drop-shadow(0 0 ${(t * 12).toFixed(1)}px rgba(79,174,243,${(t * .6).toFixed(2)}))` : 'none';

            // ══════════ TAPERED SEGMENTS ══════════
            for (let i = 0; i < NJ - 1; i++) {
                const a = s.joints[i], b = s.joints[i + 1];
                const ang = angOf(a, b), ad = ang * D, len = dist(a, b);
                const xf = `translate(${a.x.toFixed(1)},${a.y.toFixed(1)}) rotate(${ad.toFixed(1)})`;

                const h1 = BH_START[i] / 2;
                const h2 = BH_END[i] / 2;

                const bm = e[`bm${i}`] as SVGPolygonElement;
                let bmPoints = '';
                if (bm) {
                    bmPoints = `0,${-h1} ${len},${-h2} ${len},${h2} 0,${h1}`;
                    bm.setAttribute('points', bmPoints);
                    bm.setAttribute('transform', xf); bm.setAttribute('stroke', cBS); bm.setAttribute('fill', 'url(#beamMetal)'); bm.style.filter = glow;
                }

                const bmD = e[`bmDepth${i}`] as SVGPolygonElement;
                if (bmD && bmPoints) { bmD.setAttribute('points', bmPoints); bmD.setAttribute('transform', xf); }

                const bmG = e[`bmGrid${i}`] as SVGPolygonElement;
                if (bmG && bmPoints) { bmG.setAttribute('points', bmPoints); bmG.setAttribute('transform', xf); bmG.setAttribute('opacity', '0.6'); }

                const bv = e[`bmBevel${i}`] as SVGLineElement;
                if (bv) {
                    bv.setAttribute('x1', '2'); bv.setAttribute('y1', (-h1 + 1.5).toFixed(1));
                    bv.setAttribute('x2', (len - 2).toFixed(1)); bv.setAttribute('y2', (-h2 + 1.5).toFixed(1));
                    bv.setAttribute('transform', xf);
                    bv.setAttribute('stroke', `rgba(255,255,255,${lv(.08, .18, t).toFixed(3)})`);
                }

                const pn = e[`pn${i}`] as SVGPolygonElement;
                if (pn) {
                    const ins = 16;
                    const ph1 = h1 - 8, ph2 = h2 - 8;
                    if (len > ins * 2) {
                        pn.setAttribute('points', `${ins},${-ph1} ${len - ins},${-ph2} ${len - ins},${ph2} ${ins},${ph1}`);
                        pn.setAttribute('transform', xf); pn.setAttribute('stroke', cPS); pn.setAttribute('fill', 'url(#carbonFiber)');
                    }
                }

                if (i === 0) {
                    const cy = e['hydC'] as SVGRectElement;
                    const rd = e['hydR'] as SVGRectElement;
                    if (cy && rd) {
                        const pyOff = h1 + 10;
                        const breathe = 1 + Math.sin(Date.now() / 1400) * 0.03 * (0.4 + t * 0.6);
                        const cylLen = len * 0.45;
                        const rodLen = len * 0.4 * breathe;
                        cy.setAttribute('x', '10'); cy.setAttribute('y', (pyOff - 6).toFixed(1));
                        cy.setAttribute('width', cylLen.toFixed(1)); cy.setAttribute('height', '12');
                        cy.setAttribute('transform', xf); cy.setAttribute('stroke', cPS); cy.setAttribute('fill', 'url(#pistonMetal)');

                        rd.setAttribute('x', (10 + cylLen).toFixed(1)); rd.setAttribute('y', (pyOff - 2).toFixed(1));
                        rd.setAttribute('width', rodLen.toFixed(1)); rd.setAttribute('height', '4');
                        rd.setAttribute('transform', xf); rd.setAttribute('stroke', cGS); rd.setAttribute('fill', 'none');
                    }
                }

                const mx = len / 2;
                for (let d = 0; d < 3; d++) {
                    const hk = e[`hk${i}${d}`] as SVGLineElement;
                    if (hk) {
                        const hx = mx + d * 8 - 8;
                        hk.setAttribute('x1', hx.toFixed(1)); hk.setAttribute('y1', '-4');
                        hk.setAttribute('x2', (hx + 4).toFixed(1)); hk.setAttribute('y2', '4');
                        hk.setAttribute('transform', xf); hk.setAttribute('stroke', cPS); hk.setAttribute('stroke-width', '2');
                    }
                }
            }

            // ══════════ CABLES / HOSES (2-4 exposed, minimal) ══════════
            for (let i = 0; i < NJ - 1; i++) {
                const cb = e[`cb${i}`] as SVGPathElement;
                if (cb) {
                    const a = s.joints[i], b = s.joints[i + 1];
                    const ang = angOf(a, b);
                    const h1 = BH_START[i] / 2 + 10, h2 = BH_END[i] / 2 + 10;
                    const p1x = a.x + Math.cos(ang + Math.PI / 2) * h1, p1y = a.y + Math.sin(ang + Math.PI / 2) * h1;
                    const p2x = b.x + Math.cos(ang + Math.PI / 2) * h2, p2y = b.y + Math.sin(ang + Math.PI / 2) * h2;
                    const sway = Math.sin(Date.now() / 1100 + i) * 3;
                    const cx = (p1x + p2x) / 2 + Math.cos(ang + Math.PI / 2) * (35 + sway);
                    const cy = (p1y + p2y) / 2 + Math.sin(ang + Math.PI / 2) * (35 + sway);
                    cb.setAttribute('d', `M ${p1x.toFixed(1)},${p1y.toFixed(1)} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`);
                    cb.setAttribute('stroke', cCB);
                }
            }

            // ══════════ MASSIVE JOINTS (WITH MOTORS) ══════════
            for (let j = 0; j < NJ; j++) {
                const jt = s.joints[j];
                const sa = (j < NJ - 1 ? angOf(s.joints[j], s.joints[Math.min(j + 1, NJ - 1)]) : angOf(s.joints[j - 1], s.joints[j]));
                const sd = sa * D;

                const jm = e[`jM${j}`] as SVGCircleElement;
                if (jm) {
                    jm.setAttribute('cx', (jt.x - 4).toFixed(1)); jm.setAttribute('cy', (jt.y + 4).toFixed(1));
                    jm.setAttribute('stroke', cJS); jm.setAttribute('fill', 'url(#jointMetal)');
                }

                const jh = e[`jH${j}`] as SVGCircleElement;
                if (jh) { jh.setAttribute('cx', jt.x.toFixed(1)); jh.setAttribute('cy', jt.y.toFixed(1)); jh.setAttribute('stroke', cJS); jh.setAttribute('fill', 'url(#jointMetal)'); jh.style.filter = glow; }

                const jD = e[`jDepth${j}`] as SVGCircleElement;
                if (jD) { jD.setAttribute('cx', jt.x.toFixed(1)); jD.setAttribute('cy', jt.y.toFixed(1)); jD.setAttribute('r', JR[j].toString()); }

                const jGr = e[`jGrid${j}`] as SVGCircleElement;
                if (jGr) { jGr.setAttribute('cx', jt.x.toFixed(1)); jGr.setAttribute('cy', jt.y.toFixed(1)); jGr.setAttribute('r', (JR[j] - 2).toString()); }

                const jBv = e[`jBevel${j}`] as SVGCircleElement;
                if (jBv) {
                    jBv.setAttribute('cx', jt.x.toFixed(1)); jBv.setAttribute('cy', jt.y.toFixed(1));
                    jBv.setAttribute('r', (JR[j] - 1.5).toFixed(1));
                    jBv.setAttribute('stroke', `rgba(79,174,243,${lv(.15, .35, t).toFixed(3)})`);
                }

                const jg = e[`jG${j}`] as SVGCircleElement;
                if (jg) {
                    jg.setAttribute('cx', jt.x.toFixed(1)); jg.setAttribute('cy', jt.y.toFixed(1));
                    jg.setAttribute('stroke', cJI); jg.setAttribute('fill', 'none');
                    const gearSpin = (Date.now() / 40 + j * 90) % 360;
                    jg.setAttribute('transform', `rotate(${gearSpin.toFixed(1)} ${jt.x.toFixed(1)} ${jt.y.toFixed(1)})`);
                }

                const ji = e[`jI${j}`] as SVGCircleElement;
                if (ji) { ji.setAttribute('cx', jt.x.toFixed(1)); ji.setAttribute('cy', jt.y.toFixed(1)); ji.setAttribute('stroke', cJI); ji.setAttribute('fill', 'none'); }

                const js = e[`jS${j}`] as SVGCircleElement;
                if (js) { js.setAttribute('cx', jt.x.toFixed(1)); js.setAttribute('cy', jt.y.toFixed(1)); js.setAttribute('fill', cSH); }

                const chH = e[`cH${j}`] as SVGLineElement;
                const chV = e[`cV${j}`] as SVGLineElement;
                if (chH) { const r = JIR[j]; chH.setAttribute('x1', (jt.x - r).toFixed(1)); chH.setAttribute('y1', jt.y.toFixed(1)); chH.setAttribute('x2', (jt.x + r).toFixed(1)); chH.setAttribute('y2', jt.y.toFixed(1)); chH.setAttribute('stroke', cJI); }
                if (chV) { const r = JIR[j]; chV.setAttribute('x1', jt.x.toFixed(1)); chV.setAttribute('y1', (jt.y - r).toFixed(1)); chV.setAttribute('x2', jt.x.toFixed(1)); chV.setAttribute('y2', (jt.y + r).toFixed(1)); chV.setAttribute('stroke', cJI); }

                for (let f = 0; f < 3; f++) {
                    const fg = e[`jF${j}${f}`] as SVGRectElement;
                    if (fg) {
                        const fAng = sd + (f - 1) * 60;
                        fg.setAttribute('transform', `translate(${jt.x.toFixed(1)},${jt.y.toFixed(1)}) rotate(${fAng.toFixed(1)})`);
                        fg.setAttribute('stroke', cJS); fg.setAttribute('fill', 'url(#jointMetal)');
                    }
                }

                if (j >= 1 && j <= 2) {
                    for (let bi = 0; bi < 8; bi++) {
                        const bolt = e[`jB${j}${bi}`] as SVGCircleElement;
                        if (bolt) {
                            const br = JR[j] - 5;
                            const ba = bi * (Math.PI * 2 / 8) + sa + t;
                            bolt.setAttribute('cx', (jt.x + Math.cos(ba) * br).toFixed(1));
                            bolt.setAttribute('cy', (jt.y + Math.sin(ba) * br).toFixed(1));
                            bolt.setAttribute('fill', cBL);
                        }
                    }
                }

                const led = e[`jLed${j}`] as SVGCircleElement;
                if (led) {
                    const pulse = 0.45 + 0.25 * Math.sin(Date.now() / 900 + j * 1.3) + t * 0.25;
                    led.setAttribute('cx', (jt.x + JR[j] * 0.55).toFixed(1));
                    led.setAttribute('cy', (jt.y - JR[j] * 0.55).toFixed(1));
                    led.setAttribute('opacity', Math.max(0.25, Math.min(pulse, 1)).toFixed(2));
                }
            }

            // ══════════ ADVANCED PINCER CLAW (GRIPPER) ══════════
            const ee = s.joints[NJ - 1], wr = s.joints[NJ - 2];
            const la = angOf(wr, ee), ld = la * D;
            const xfE = `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${ld.toFixed(1)})`;

            const held = heldIdRef.current;
            const heldEl = held ? cardEls.current[held] : null;
            const origin = held ? cardOrigins.current[held] : null;
            if (held && heldEl && origin) {
                const clawPoint = {
                    x: ee.x + Math.cos(la) * 42,
                    y: ee.y + Math.sin(la) * 42,
                };
                heldEl.style.transition = 'none';
                heldEl.style.zIndex = '60';
                heldEl.style.pointerEvents = 'auto';
                const offset = {
                    x: clawPoint.x - origin.x,
                    y: clawPoint.y - origin.y,
                };
                cardOffsets.current[held] = offset;
                heldEl.style.transform = `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0) scale(0.98)`;
            }

            const wb = e['wB'] as SVGPolygonElement;
            if (wb) {
                wb.setAttribute('points', '-10,-18 10,-12 10,12 -10,18');
                wb.setAttribute('transform', xfE); wb.setAttribute('stroke', cGS); wb.setAttribute('fill', 'url(#jointMetal)'); wb.style.filter = glow;
            }

            const wbD = e['wBDepth'] as SVGPolygonElement;
            if (wbD) { wbD.setAttribute('points', '-10,-18 10,-12 10,12 -10,18'); wbD.setAttribute('transform', xfE); }

            const openAng = 20 * s.grip;

            const fgT = e['fG_T'] as SVGPathElement;
            if (fgT) {
                fgT.setAttribute('transform', `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${(ld - openAng).toFixed(1)})`);
                fgT.setAttribute('d', 'M 5,-8 L 25,-18 L 40,-12 L 40,-2 L 25,-8 Z');
                fgT.setAttribute('stroke', cGS); fgT.setAttribute('fill', 'url(#beamMetal)');
            }

            const fgB = e['fG_B'] as SVGPathElement;
            if (fgB) {
                fgB.setAttribute('transform', `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${(ld + openAng).toFixed(1)})`);
                fgB.setAttribute('d', 'M 5,8 L 25,18 L 40,12 L 40,2 L 25,8 Z');
                fgB.setAttribute('stroke', cGS); fgB.setAttribute('fill', 'url(#beamMetal)');
            }

            const pdT = e['pD_T'] as SVGPathElement;
            if (pdT) {
                pdT.setAttribute('transform', `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${(ld - openAng).toFixed(1)})`);
                pdT.setAttribute('d', 'M 26,-8 L 38,-2 L 38,0 L 26,-5 Z');
                pdT.setAttribute('stroke', cGS); pdT.setAttribute('fill', cBL);
            }
            const pdB = e['pD_B'] as SVGPathElement;
            if (pdB) {
                pdB.setAttribute('transform', `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${(ld + openAng).toFixed(1)})`);
                pdB.setAttribute('d', 'M 26,8 L 38,2 L 38,0 L 26,5 Z');
                pdB.setAttribute('stroke', cGS); pdB.setAttribute('fill', cBL);
            }

            // ══════════ HEAVY BASE ══════════
            const bp = e['bP'] as SVGRectElement;
            if (bp) { bp.setAttribute('transform', `translate(${s.base.x.toFixed(1)},${s.base.y.toFixed(1)})`); bp.setAttribute('stroke', cJS); bp.setAttribute('fill', 'url(#pistonMetal)'); }
            const bc = e['bC'] as SVGPolygonElement;
            if (bc) {
                bc.setAttribute('transform', `translate(${s.base.x.toFixed(1)},${s.base.y.toFixed(1)})`);
                bc.setAttribute('stroke', cJS); bc.setAttribute('fill', 'url(#jointMetal)');
            }
            for (let i = 0; i < 6; i++) {
                const bb = e[`bB${i}`] as SVGCircleElement;
                if (bb) { bb.setAttribute('cx', (s.base.x + (i - 2.5) * 22).toFixed(1)); bb.setAttribute('cy', (s.base.y + 6).toFixed(1)); bb.setAttribute('fill', cBL); }
            }

            // ══════════ PULSE ══════════
            const pl = e['pl'] as SVGCircleElement;
            if (pl) {
                const pt2 = (Date.now() % 1200) / 1200;
                const ps = 1 + .4 * Math.sin(pt2 * Math.PI * 2);
                const tx = ee.x + Math.cos(la) * 35;
                const ty = ee.y + Math.sin(la) * 35;
                pl.setAttribute('cx', tx.toFixed(1)); pl.setAttribute('cy', ty.toFixed(1));
                pl.setAttribute('r', (10 * ps * (1 + t * .6)).toFixed(1));
                pl.setAttribute('stroke', `rgba(79,174,243,${(t * .4 * (.5 + .5 * Math.sin(pt2 * Math.PI * 2))).toFixed(3)})`);
            }

            s.raf = requestAnimationFrame(tick);
        };

        st.current.raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(st.current.raf); window.removeEventListener('resize', onR); };
    }, [measure]);

    return (
        <section ref={secRef} id="sponsors" className="relative z-40 w-full overflow-hidden bg-[#0d0d0d] py-20">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: "40px 40px" }} />
            </div>
            <div className="absolute left-5 top-6 z-20 pointer-events-none sm:left-10 sm:top-8">
                <span className="rv-section-log">
                    <span className="rv-section-log-number">07.</span>
                    SYSTEM.LOGS // SPONSORS
                </span>
            </div>
            {showSponsorHelp && (
                <motion.div
                    className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 rounded-[4px] border border-white/8 bg-black/35 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/42 backdrop-blur-sm md:flex"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    <span className="text-white/55">Hold when claw is over card</span>
                    <span className="h-3 w-px bg-white/15" />
                    <span>Release to drop</span>
                    <span className="h-3 w-px bg-white/15" />
                    <span>Arrow keys move arm</span>
                    <button
                        type="button"
                        onClick={resetSponsorCards}
                        disabled={!hasMovedCards && !heldId}
                        className="ml-1 rounded-[4px] border border-white/15 px-2 py-1 text-white/50 transition-colors duration-200 hover:border-white/35 hover:bg-white/5 hover:text-white/70 disabled:cursor-default disabled:border-white/8 disabled:text-white/20 disabled:hover:bg-transparent"
                    >
                        RESET
                    </button>
                </motion.div>
            )}
            
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12">
                <Header />

                {/* Desktop Grid — 3 / 5 / 3 symmetric layout */}
<div className="hidden md:flex md:flex-col gap-5">

    {/* Row 1 — 3 cards, centered */}
    <div className="grid grid-cols-3 gap-5 mx-auto w-[60%]">
        {SPONSORS.slice(0, 3).map((sp, i) => (
            <motion.div key={sp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <SponsorCard
                    sponsor={sp}
                    isHovered={pickableId === sp.id || heldId === sp.id}
                    onHoverChange={onCard()}
                    onCardPointerDown={onCardPointerDown(sp.id)}
                    registerCard={registerCard}
                />
            </motion.div>
        ))}
    </div>

    {/* Row 2 — 5 cards, full width */}
    <div className="grid grid-cols-5 gap-5">
        {SPONSORS.slice(3, 8).map((sp, i) => (
            <motion.div key={sp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i + 3) * 0.06 }}>
                <SponsorCard
                    sponsor={sp}
                    isHovered={pickableId === sp.id || heldId === sp.id}
                    onHoverChange={onCard()}
                    onCardPointerDown={onCardPointerDown(sp.id)}
                    registerCard={registerCard}
                />
            </motion.div>
        ))}
    </div>

    {/* Row 3 — 3 cards, centered */}
    <div className="grid grid-cols-3 gap-5 mx-auto w-[60%]">
        {SPONSORS.slice(8, 11).map((sp, i) => (
            <motion.div key={sp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i + 8) * 0.06 }}>
                <SponsorCard
                    sponsor={sp}
                    isHovered={pickableId === sp.id || heldId === sp.id}
                    onHoverChange={onCard()}
                    onCardPointerDown={onCardPointerDown(sp.id)}
                    registerCard={registerCard}
                />
            </motion.div>
        ))}
    </div>

</div>

                {/* Mobile Auto-Scroll */}
                <div className="md:hidden">
                    <SponsorMarquee />
                </div>
            </div>

            {/* Arm SVG remains behind or above as you prefer */}
            <svg ref={svgRef} className="absolute inset-0 w-full h-full z-[30] pointer-events-none hidden md:block" viewBox="0 0 1400 900" preserveAspectRatio="none" style={{ overflow: 'visible' }}>

                <defs>

                    <linearGradient id="beamMetal" x1="0" y1="0" x2="0" y2="1">

                        <stop offset="0%" stopColor="#3a3f47" />

                        <stop offset="45%" stopColor="#23262b" />

                        <stop offset="55%" stopColor="#1c1e22" />

                        <stop offset="100%" stopColor="#0d0e10" />

                    </linearGradient>

                    <radialGradient id="jointMetal" cx="35%" cy="30%" r="75%">

                        <stop offset="0%" stopColor="#454a52" />

                        <stop offset="55%" stopColor="#262a30" />

                        <stop offset="100%" stopColor="#0a0b0d" />

                    </radialGradient>

                    <linearGradient id="pistonMetal" x1="0" y1="0" x2="0" y2="1">

                        <stop offset="0%" stopColor="#34383e" />

                        <stop offset="50%" stopColor="#1a1c1f" />

                        <stop offset="100%" stopColor="#0a0b0c" />

                    </linearGradient>

                    <pattern id="carbonFiber" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">

                        <rect width="6" height="6" fill="#15171a" />

                        <path d="M0 0H3V3H0Z" fill="#1b1e22" />

                        <path d="M3 3H6V6H3Z" fill="#1b1e22" />

                    </pattern>

                    <filter id="edgeGlow" x="-50%" y="-50%" width="200%" height="200%">

                        <feGaussianBlur stdDeviation="1.4" result="b" />

                        <feMerge>

                            <feMergeNode in="b" />

                            <feMergeNode in="SourceGraphic" />

                        </feMerge>

                    </filter>

                    <linearGradient id="beamDepth" x1="0" y1="0" x2="1" y2="1">

                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />

                        <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />

                        <stop offset="70%" stopColor="#000000" stopOpacity="0" />

                        <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />

                    </linearGradient>

                    <radialGradient id="jointDepth" cx="32%" cy="28%" r="80%">

                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />

                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />

                        <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />

                    </radialGradient>

                    <pattern id="wireGrid" width="14" height="14" patternUnits="userSpaceOnUse">

                        <path d="M0 0H14M0 0V14" stroke="#4FAEF3" strokeWidth="0.4" strokeOpacity="0.10" />

                    </pattern>

                    <pattern id="wireGridFine" width="9" height="9" patternUnits="userSpaceOnUse">

                        <path d="M0 0H9M0 0V9" stroke="#4FAEF3" strokeWidth="0.35" strokeOpacity="0.08" />

                    </pattern>

                </defs>

                {/* Cables / Hoses */}

                {[0, 1, 2].map(i => <path key={`cb${i}`} ref={ref(`cb${i}`)} fill="none" strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" />)}

                {/* Heavy Base pedestal */}

                <rect ref={ref('bP')} x={-90} y={-5} width={180} height={25} rx={4} strokeWidth="3" />

                <polygon ref={ref('bC')} points="-45,-45 45,-45 60,-5 -60,-5" strokeWidth="2.5" />

                {[0, 1, 2, 3, 4, 5].map(i => <circle key={`bB${i}`} ref={ref(`bB${i}`)} r={4} />)}



                {/* Structural beams (Tapered Polygons) with depth + wireframe + bevel */}

                {[0, 1, 2].map(i => (

                    <g key={`s${i}`}>

                        <polygon ref={ref(`bm${i}`)} strokeWidth="3" strokeLinejoin="round" />

                        <polygon ref={ref(`bmDepth${i}`)} fill="url(#beamDepth)" stroke="none" />

                        <polygon ref={ref(`bmGrid${i}`)} fill="url(#wireGrid)" stroke="none" />

                        <polygon ref={ref(`pn${i}`)} strokeWidth="1.5" strokeLinejoin="round" />

                        <line ref={ref(`bmBevel${i}`)} strokeWidth="1" strokeLinecap="round" />

                        <line ref={ref(`hk${i}0`)} />

                        <line ref={ref(`hk${i}1`)} />

                        <line ref={ref(`hk${i}2`)} />

                    </g>

                ))}



                {/* Hydraulic Piston on Base Link */}

                <rect ref={ref('hydC')} rx="4" strokeWidth="2" />

                <rect ref={ref('hydR')} rx="1" strokeWidth="1.5" />



                {/* Joints with depth, wireframe grid, and beveled rim */}

                {[0, 1, 2, 3].map(j => (

                    <g key={`j${j}`}>

                        <rect ref={ref(`jF${j}0`)} x={JR[j] - 4} y={-6} width={14} height={12} rx={2} strokeWidth="2" />

                        <rect ref={ref(`jF${j}1`)} x={JR[j] - 4} y={-6} width={14} height={12} rx={2} strokeWidth="2" />

                        <rect ref={ref(`jF${j}2`)} x={JR[j] - 4} y={-6} width={14} height={12} rx={2} strokeWidth="2" />

                        <circle ref={ref(`jM${j}`)} r={JR[j] * 0.85} strokeWidth="2" />

                        <circle ref={ref(`jH${j}`)} r={JR[j]} strokeWidth="3" />

                        <circle ref={ref(`jDepth${j}`)} fill="url(#jointDepth)" stroke="none" />

                        <circle ref={ref(`jGrid${j}`)} fill="url(#wireGridFine)" stroke="none" opacity="0.5" />

                        <circle ref={ref(`jBevel${j}`)} fill="none" strokeWidth="1" strokeDasharray="3 2" />

                        <circle ref={ref(`jG${j}`)} r={JR[j] - 4} strokeWidth="4" strokeDasharray="6 4" />

                        <circle ref={ref(`jI${j}`)} r={JIR[j]} strokeWidth="2" />

                        <circle ref={ref(`jS${j}`)} r={JSR[j]} />

                        <line ref={ref(`cH${j}`)} strokeWidth="1.5" />

                        <line ref={ref(`cV${j}`)} strokeWidth="1.5" />

                        {j >= 1 && j <= 2 && [0, 1, 2, 3, 4, 5, 6, 7].map(bi => <circle key={`jB${j}${bi}`} ref={ref(`jB${j}${bi}`)} r={2} />)}

                        <circle ref={ref(`jLed${j}`)} r={2.2} fill="#4FAEF3" filter="url(#edgeGlow)" />

                    </g>

                ))}



                {/* Advanced Pincer Claw */}

                <polygon ref={ref('wB')} strokeWidth="2.5" strokeLinejoin="round" />

                <polygon ref={ref('wBDepth')} fill="url(#beamDepth)" stroke="none" />

                <path ref={ref('fG_T')} strokeWidth="2.5" strokeLinejoin="round" />

                <path ref={ref('fG_B')} strokeWidth="2.5" strokeLinejoin="round" />

                <path ref={ref('pD_T')} strokeWidth="1.5" strokeLinejoin="round" />

                <path ref={ref('pD_B')} strokeWidth="1.5" strokeLinejoin="round" />

                <circle ref={ref('pl')} fill="none" strokeWidth="2" />



            </svg>
        </section>
    );
}
