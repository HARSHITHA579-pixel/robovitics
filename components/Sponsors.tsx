'use client';

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
    { id: 'SP_001', name: 'NEXON DYNAMICS', tier: 'LEVEL 1 PARTNER' },
    { id: 'SP_002', name: 'TITANFORGE LABS', tier: 'LEVEL 1 PARTNER' },
    { id: 'SP_003', name: 'VOLTARC SYSTEMS', tier: 'LEVEL 2 PARTNER' },
    { id: 'SP_004', name: 'CYGNUS ROBOTICS', tier: 'LEVEL 1 PARTNER' },
    { id: 'SP_005', name: 'AXION VENTURES', tier: 'LEVEL 2 PARTNER' },
    { id: 'SP_006', name: 'HELIX FOUNDRY', tier: 'LEVEL 3 PARTNER' },
    { id: 'SP_007', name: 'MERIDIAN TECH', tier: 'LEVEL 2 PARTNER' },
    { id: 'SP_008', name: 'QUASAR DESIGN', tier: 'LEVEL 3 PARTNER' },
];

// ─── SPONSOR CARD ───────────────────────────────────────────────────────────
function SponsorCard({ sponsor, isHovered, onHoverChange }: {
    sponsor: Sponsor; isHovered: boolean;
    onHoverChange: (h: boolean, r: DOMRect | null) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <motion.div ref={ref} className="cursor-pointer"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onMouseEnter={() => onHoverChange(true, ref.current?.getBoundingClientRect() ?? null)}
            onMouseLeave={() => onHoverChange(false, null)}>
            <div className="rounded px-4 py-5 sm:px-5 sm:py-6 flex flex-col items-center relative overflow-hidden"
                style={{
                    background: 'rgba(15,20,30,0.6)',
                    border: `1px solid ${isHovered ? 'rgba(79,174,243,0.3)' : 'rgba(100,160,220,0.12)'}`,
                    boxShadow: isHovered ? '0 8px 32px rgba(79,174,243,0.15), 0 0 20px rgba(79,174,243,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                }}>
                {/* Abstract Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#4FAEF3] opacity-30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#4FAEF3] opacity-30" />

                {/* ── ONLY a plain rectangle ── */}
                <div className="w-20 h-12 sm:w-24 sm:h-14 mb-4 rounded"
                    style={{
                        border: `1.5px solid ${isHovered ? 'rgba(79,174,243,0.3)' : 'rgba(100,160,220,0.15)'}`,
                        background: isHovered ? 'rgba(79,174,243,0.04)' : 'transparent',
                        transition: 'all 0.3s ease',
                    }} />
                <h3 className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-center mb-1"
                    style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.65)', transition: 'color 0.3s' }}>
                    {sponsor.name}
                </h3>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase"
                    style={{ color: isHovered ? 'rgba(79,174,243,0.7)' : 'rgba(100,160,220,0.35)', transition: 'color 0.3s' }}>
                    {sponsor.tier}
                </p>
            </div>
        </motion.div>
    );
}

// ─── HEADER ─────────────────────────────────────────────────────────────────
function Header() {
    const [b, setB] = useState(true);
    useEffect(() => { const iv = setInterval(() => setB(v => !v), 1200); return () => clearInterval(iv); }, []);
    return (
        <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-20">
            <div className="font-mono text-gray-500 text-[11px] sm:text-sm tracking-widest uppercase mb-6 sm:mb-8 self-start">
                <span className="font-bold mr-2 text-white">01.5</span> System.Logs // Sponsors
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
                <h2 className="text-center font-black uppercase tracking-tighter leading-none text-white"
                    style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontFamily: '"Inter","Arial Black",var(--font-geist-sans),sans-serif' }}>
                    OUR <span style={{ color: '#4FAEF3' }}>SPONSORS</span>
                </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2 mt-3 sm:mt-4">
                <div className="h-[1px] w-8 sm:w-12" style={{ background: 'linear-gradient(90deg,transparent,rgba(79,174,243,0.4))' }} />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(79,174,243,0.7)' }}>
          // [SYS STATUS: <span style={{ color: b ? '#4FAEF3' : 'rgba(79,174,243,0.3)', transition: 'color 0.3s', textShadow: b ? '0 0 8px rgba(79,174,243,0.5)' : 'none' }}>NOMINAL</span>]
                </span>
                <div className="h-[1px] w-8 sm:w-12" style={{ background: 'linear-gradient(90deg,rgba(79,174,243,0.4),transparent)' }} />
            </motion.div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 sm:mt-6 origin-center"
                style={{ width: 'min(80%,400px)', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }} />
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
    const [hId, setHId] = useState<string | null>(null);

    const els = useRef<Record<string, SVGElement | null>>({});
    const ref = useCallback((k: string) => (e: SVGElement | null) => { els.current[k] = e; }, []);

    const st = useRef({
        mouse: { x: 0, y: 0 } as Point,
        target: { x: 0, y: 0 } as Point,
        joints: Array.from({ length: NJ }, () => ({ x: 0, y: 0 })) as Point[],
        lens: SR.map(() => 0),
        base: { x: 0, y: 0 } as Point,
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
        s.base = { x: r.width * 0.12, y: r.height * 0.88 }; // Firmly planted in bottom left
        if (!s.ok) {
            // Offset initial joints slightly so FABRIK doesn't divide by zero when perfectly stacked
            s.joints = s.joints.map((_, i) => ({ x: s.base.x, y: s.base.y - i * 10 }));
            s.target = { x: r.width * 0.5, y: r.height * 0.5 };
            s.mouse = { ...s.target }; s.ok = true;
        }
        s.joints[0] = { ...s.base };
        svgRef.current?.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    }, []);

    useEffect(() => {
        const sec = secRef.current; if (!sec) return;
        const mv = (e: MouseEvent) => { const r = sec.getBoundingClientRect(); st.current.mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
        const lv2 = () => { const s = st.current; s.mouse = { x: s.w * 0.5, y: s.h * 0.5 }; };
        sec.addEventListener('mousemove', mv, { passive: true });
        sec.addEventListener('mouseleave', lv2, { passive: true });
        return () => { sec.removeEventListener('mousemove', mv); sec.removeEventListener('mouseleave', lv2); };
    }, []);

    const onCard = useCallback((id: string) => (on: boolean, rect: DOMRect | null) => {
        setHId(on ? id : null);
        const s = st.current;
        if (on && rect && secRef.current) {
            const sr = secRef.current.getBoundingClientRect();
            s.hRect = new DOMRect(rect.left - sr.left, rect.top - sr.top, rect.width, rect.height);
            s.locked = true;
        } else { s.hRect = null; s.locked = false; }
    }, []);

    // ── 60 fps loop ──
    useEffect(() => {
        measure();
        const onR = () => measure();
        window.addEventListener('resize', onR, { passive: true });

        const tick = () => {
            const s = st.current, e = els.current;

            // Target
            const want: Point = s.locked && s.hRect
                ? { x: s.hRect.x + s.hRect.width / 2, y: s.hRect.y + s.hRect.height / 2 }
                : { ...s.mouse };
            s.target = lerpPt(s.target, want, s.locked ? 0.14 : 0.06);

            // IK
            s.joints[0] = { ...s.base };
            s.joints = solveFABRIK(s.joints, s.target, s.lens);

            // Intensity
            s.I = lv(s.I, s.locked ? 1 : 0, 0.09);
            s.grip = lv(s.grip, s.locked ? 0.8 : 0.2, 0.1);
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
            const cLB = `rgba(79,174,243,${lv(.40, .70, t).toFixed(3)})`;      // label color
            const cCB = `rgba(79,174,243,${lv(.40, .70, t).toFixed(3)})`;      // cable color
            const glow = t > .05 ? `drop-shadow(0 0 ${(t * 12).toFixed(1)}px rgba(79,174,243,${(t * .6).toFixed(2)}))` : 'none';

            // ══════════ TAPERED SEGMENTS ══════════
            for (let i = 0; i < NJ - 1; i++) {
                const a = s.joints[i], b = s.joints[i + 1];
                const ang = angOf(a, b), ad = ang * D, len = dist(a, b);
                const xf = `translate(${a.x.toFixed(1)},${a.y.toFixed(1)}) rotate(${ad.toFixed(1)})`;

                const h1 = BH_START[i] / 2;
                const h2 = BH_END[i] / 2;

                // Main structural tapered beam — graphite metal gradient
                const bm = e[`bm${i}`] as SVGPolygonElement;
                let bmPoints = '';
                if (bm) {
                    bmPoints = `0,${-h1} ${len},${-h2} ${len},${h2} 0,${h1}`;
                    bm.setAttribute('points', bmPoints);
                    bm.setAttribute('transform', xf); bm.setAttribute('stroke', cBS); bm.setAttribute('fill', 'url(#beamMetal)'); bm.style.filter = glow;
                }

                // Depth shading overlay — same geometry as bm, diagonal light/shadow sweep
                const bmD = e[`bmDepth${i}`] as SVGPolygonElement;
                if (bmD && bmPoints) { bmD.setAttribute('points', bmPoints); bmD.setAttribute('transform', xf); }

                // Fine wireframe grid texture overlay — same geometry as bm
                const bmG = e[`bmGrid${i}`] as SVGPolygonElement;
                if (bmG && bmPoints) { bmG.setAttribute('points', bmPoints); bmG.setAttribute('transform', xf); bmG.setAttribute('opacity', '0.6'); }

                // Beveled top-edge highlight (light catching the rim)
                const bv = e[`bmBevel${i}`] as SVGLineElement;
                if (bv) {
                    bv.setAttribute('x1', '2'); bv.setAttribute('y1', (-h1 + 1.5).toFixed(1));
                    bv.setAttribute('x2', (len - 2).toFixed(1)); bv.setAttribute('y2', (-h2 + 1.5).toFixed(1));
                    bv.setAttribute('transform', xf);
                    bv.setAttribute('stroke', `rgba(255,255,255,${lv(.08, .18, t).toFixed(3)})`);
                }

                // Recessed inner panel — subtle carbon-fiber weave
                const pn = e[`pn${i}`] as SVGPolygonElement;
                if (pn) {
                    const ins = 16;
                    const ph1 = h1 - 8, ph2 = h2 - 8;
                    if (len > ins * 2) {
                        pn.setAttribute('points', `${ins},${-ph1} ${len - ins},${-ph2} ${len - ins},${ph2} ${ins},${ph1}`);
                        pn.setAttribute('transform', xf); pn.setAttribute('stroke', cPS); pn.setAttribute('fill', 'url(#carbonFiber)');
                    }
                }

                // Heavy Hydraulic Piston on Link 1 — metallic barrel, subtle breathing extend/retract
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

                // Warning hash marks (decals)
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

                // Motor bump (offset circle for 3D illusion) — metallic
                const jm = e[`jM${j}`] as SVGCircleElement;
                if (jm) {
                    jm.setAttribute('cx', (jt.x - 4).toFixed(1)); jm.setAttribute('cy', (jt.y + 4).toFixed(1));
                    jm.setAttribute('stroke', cJS); jm.setAttribute('fill', 'url(#jointMetal)');
                }

                // Outer servo housing — metallic
                const jh = e[`jH${j}`] as SVGCircleElement;
                if (jh) { jh.setAttribute('cx', jt.x.toFixed(1)); jh.setAttribute('cy', jt.y.toFixed(1)); jh.setAttribute('stroke', cJS); jh.setAttribute('fill', 'url(#jointMetal)'); jh.style.filter = glow; }

                // Depth shading — rim light + shadow over the housing
                const jD = e[`jDepth${j}`] as SVGCircleElement;
                if (jD) { jD.setAttribute('cx', jt.x.toFixed(1)); jD.setAttribute('cy', jt.y.toFixed(1)); jD.setAttribute('r', JR[j].toString()); }

                // Fine wireframe grid texture over the housing
                const jGr = e[`jGrid${j}`] as SVGCircleElement;
                if (jGr) { jGr.setAttribute('cx', jt.x.toFixed(1)); jGr.setAttribute('cy', jt.y.toFixed(1)); jGr.setAttribute('r', (JR[j] - 2).toString()); }

                // Beveled rim highlight ring
                const jBv = e[`jBevel${j}`] as SVGCircleElement;
                if (jBv) {
                    jBv.setAttribute('cx', jt.x.toFixed(1)); jBv.setAttribute('cy', jt.y.toFixed(1));
                    jBv.setAttribute('r', (JR[j] - 1.5).toFixed(1));
                    jBv.setAttribute('stroke', `rgba(79,174,243,${lv(.15, .35, t).toFixed(3)})`);
                }

                // Gear ring (thick dashed circle simulating teeth) — cyan accent, slow rotation
                const jg = e[`jG${j}`] as SVGCircleElement;
                if (jg) {
                    jg.setAttribute('cx', jt.x.toFixed(1)); jg.setAttribute('cy', jt.y.toFixed(1));
                    jg.setAttribute('stroke', cJI); jg.setAttribute('fill', 'none');
                    const gearSpin = (Date.now() / 40 + j * 90) % 360;
                    jg.setAttribute('transform', `rotate(${gearSpin.toFixed(1)} ${jt.x.toFixed(1)} ${jt.y.toFixed(1)})`);
                }

                // Inner ring — cyan accent
                const ji = e[`jI${j}`] as SVGCircleElement;
                if (ji) { ji.setAttribute('cx', jt.x.toFixed(1)); ji.setAttribute('cy', jt.y.toFixed(1)); ji.setAttribute('stroke', cJI); ji.setAttribute('fill', 'none'); }

                // Shaft pin — cyan accent
                const js = e[`jS${j}`] as SVGCircleElement;
                if (js) { js.setAttribute('cx', jt.x.toFixed(1)); js.setAttribute('cy', jt.y.toFixed(1)); js.setAttribute('fill', cSH); }

                // Crosshair lines inside housing
                const chH = e[`cH${j}`] as SVGLineElement;
                const chV = e[`cV${j}`] as SVGLineElement;
                if (chH) { const r = JIR[j]; chH.setAttribute('x1', (jt.x - r).toFixed(1)); chH.setAttribute('y1', jt.y.toFixed(1)); chH.setAttribute('x2', (jt.x + r).toFixed(1)); chH.setAttribute('y2', jt.y.toFixed(1)); chH.setAttribute('stroke', cJI); }
                if (chV) { const r = JIR[j]; chV.setAttribute('x1', jt.x.toFixed(1)); chV.setAttribute('y1', (jt.y - r).toFixed(1)); chV.setAttribute('x2', jt.x.toFixed(1)); chV.setAttribute('y2', (jt.y + r).toFixed(1)); chV.setAttribute('stroke', cJI); }

                // Multi-flange mounts — metallic
                for (let f = 0; f < 3; f++) {
                    const fg = e[`jF${j}${f}`] as SVGRectElement;
                    if (fg) {
                        const fAng = sd + (f - 1) * 60;
                        fg.setAttribute('transform', `translate(${jt.x.toFixed(1)},${jt.y.toFixed(1)}) rotate(${fAng.toFixed(1)})`);
                        fg.setAttribute('stroke', cJS); fg.setAttribute('fill', 'url(#jointMetal)');
                    }
                }

                // Bolts — cyan accent
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

                // Status LED — small, soft pulse, no flashing
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

            // Angled Wrist Base (Polygon) — metallic
            const wb = e['wB'] as SVGPolygonElement;
            if (wb) {
                wb.setAttribute('points', '-10,-18 10,-12 10,12 -10,18');
                wb.setAttribute('transform', xfE); wb.setAttribute('stroke', cGS); wb.setAttribute('fill', 'url(#jointMetal)'); wb.style.filter = glow;
            }

            // Depth overlay on wrist base — same geometry as wb
            const wbD = e['wBDepth'] as SVGPolygonElement;
            if (wbD) { wbD.setAttribute('points', '-10,-18 10,-12 10,12 -10,18'); wbD.setAttribute('transform', xfE); }

            // Complex angled fingers — metallic
            const openAng = 20 * s.grip; // degrees of opening

            const fgT = e['fG_T'] as SVGPathElement; // Top finger
            if (fgT) {
                fgT.setAttribute('transform', `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${(ld - openAng).toFixed(1)})`);
                fgT.setAttribute('d', 'M 5,-8 L 25,-18 L 40,-12 L 40,-2 L 25,-8 Z');
                fgT.setAttribute('stroke', cGS); fgT.setAttribute('fill', 'url(#beamMetal)');
            }

            const fgB = e['fG_B'] as SVGPathElement; // Bottom finger
            if (fgB) {
                fgB.setAttribute('transform', `translate(${ee.x.toFixed(1)},${ee.y.toFixed(1)}) rotate(${(ld + openAng).toFixed(1)})`);
                fgB.setAttribute('d', 'M 5,8 L 25,18 L 40,12 L 40,2 L 25,8 Z');
                fgB.setAttribute('stroke', cGS); fgB.setAttribute('fill', 'url(#beamMetal)');
            }

            // Internal clamping pads — cyan accent (energy conduit feel)
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

            // ══════════ REACH & PULSE ══════════
            const rc = e['rc'] as SVGCircleElement;
            if (rc) { rc.setAttribute('cx', s.base.x.toFixed(1)); rc.setAttribute('cy', s.base.y.toFixed(1)); rc.setAttribute('r', s.lens.reduce((a, b) => a + b, 0).toFixed(1)); rc.setAttribute('stroke', `rgba(79,174,243,${lv(.05, .15, t).toFixed(3)})`); }

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

            // ══════════ ANGLE LABELS ══════════
            for (let i = 1; i < NJ - 1; i++) {
                const lb = e[`lb${i}`] as SVGTextElement;
                if (lb) {
                    const iA = angOf(s.joints[i], s.joints[i - 1]), oA = angOf(s.joints[i], s.joints[i + 1]);
                    let ja = Math.abs(oA - iA) * D; if (ja > 180) ja = 360 - ja;
                    lb.setAttribute('x', (s.joints[i].x + 36).toFixed(1));
                    lb.setAttribute('y', (s.joints[i].y - 36).toFixed(1));
                    lb.textContent = `J${i}: ${ja.toFixed(0)}°`;
                    lb.setAttribute('fill', cLB);
                }
            }

            s.raf = requestAnimationFrame(tick);
        };

        st.current.raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(st.current.raf); window.removeEventListener('resize', onR); };
    }, [measure]);

    return (
        <section ref={secRef} id="sponsors" className="relative z-40 w-full overflow-hidden" style={{ background: '#0a0a0a' }}>
            {/* BG Grid */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(79,174,243,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(79,174,243,0.03) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
            <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%,rgba(79,174,243,0.04),transparent 70%)' }} />
            <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.06) 30%,rgba(79,174,243,0.12) 50%,rgba(255,255,255,0.06) 70%,transparent 95%)' }} />

            {/* ═══════════ SVG ROBOTIC ARM ═══════════ */}
            <svg ref={svgRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none hidden md:block" viewBox="0 0 1400 900" preserveAspectRatio="none" style={{ overflow: 'visible' }}>

                <defs>
                    {/* Graphite metal gradient for beams / fingers */}
                    <linearGradient id="beamMetal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3a3f47" />
                        <stop offset="45%" stopColor="#23262b" />
                        <stop offset="55%" stopColor="#1c1e22" />
                        <stop offset="100%" stopColor="#0d0e10" />
                    </linearGradient>

                    {/* Joint housing — radial beveled metal disc */}
                    <radialGradient id="jointMetal" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stopColor="#454a52" />
                        <stop offset="55%" stopColor="#262a30" />
                        <stop offset="100%" stopColor="#0a0b0d" />
                    </radialGradient>

                    {/* Hydraulic piston / base pedestal barrel */}
                    <linearGradient id="pistonMetal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34383e" />
                        <stop offset="50%" stopColor="#1a1c1f" />
                        <stop offset="100%" stopColor="#0a0b0c" />
                    </linearGradient>

                    {/* Subtle carbon-fiber weave, low contrast */}
                    <pattern id="carbonFiber" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect width="6" height="6" fill="#15171a" />
                        <path d="M0 0H3V3H0Z" fill="#1b1e22" />
                        <path d="M3 3H6V6H3Z" fill="#1b1e22" />
                    </pattern>

                    {/* Cheap soft glow for cyan accents */}
                    <filter id="edgeGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.4" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Depth gradient — diagonal light-to-shadow sweep for beams/panels */}
                    <linearGradient id="beamDepth" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
                        <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="70%" stopColor="#000000" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                    </linearGradient>

                    {/* Joint depth — rim light top-left, shadow bottom-right */}
                    <radialGradient id="jointDepth" cx="32%" cy="28%" r="80%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                    </radialGradient>

                    {/* Fine wireframe grid — very low opacity design texture */}
                    <pattern id="wireGrid" width="14" height="14" patternUnits="userSpaceOnUse">
                        <path d="M0 0H14M0 0V14" stroke="#4FAEF3" strokeWidth="0.4" strokeOpacity="0.10" />
                    </pattern>

                    {/* Finer wireframe grid for joints / circular housings */}
                    <pattern id="wireGridFine" width="9" height="9" patternUnits="userSpaceOnUse">
                        <path d="M0 0H9M0 0V9" stroke="#4FAEF3" strokeWidth="0.35" strokeOpacity="0.08" />
                    </pattern>
                </defs>

                {/* Reach radius */}
                <circle ref={ref('rc')} fill="none" strokeWidth="1" strokeDasharray="16 12" />

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
                        {/* Depth shading sweep over the metal */}
                        <polygon ref={ref(`bmDepth${i}`)} fill="url(#beamDepth)" stroke="none" />
                        {/* Fine wireframe grid texture */}
                        <polygon ref={ref(`bmGrid${i}`)} fill="url(#wireGrid)" stroke="none" />
                        <polygon ref={ref(`pn${i}`)} strokeWidth="1.5" strokeLinejoin="round" />
                        {/* Beveled top highlight edge */}
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
                        {/* Multiple mounting flanges */}
                        <rect ref={ref(`jF${j}0`)} x={JR[j] - 4} y={-6} width={14} height={12} rx={2} strokeWidth="2" />
                        <rect ref={ref(`jF${j}1`)} x={JR[j] - 4} y={-6} width={14} height={12} rx={2} strokeWidth="2" />
                        <rect ref={ref(`jF${j}2`)} x={JR[j] - 4} y={-6} width={14} height={12} rx={2} strokeWidth="2" />

                        {/* Offset Motor Bump */}
                        <circle ref={ref(`jM${j}`)} r={JR[j] * 0.85} strokeWidth="2" />

                        <circle ref={ref(`jH${j}`)} r={JR[j]} strokeWidth="3" />
                        {/* Depth shading — rim light + shadow */}
                        <circle ref={ref(`jDepth${j}`)} fill="url(#jointDepth)" stroke="none" />
                        {/* Fine wireframe grid texture */}
                        <circle ref={ref(`jGrid${j}`)} fill="url(#wireGridFine)" stroke="none" opacity="0.5" />
                        {/* Beveled rim highlight */}
                        <circle ref={ref(`jBevel${j}`)} fill="none" strokeWidth="1" strokeDasharray="3 2" />
                        <circle ref={ref(`jG${j}`)} r={JR[j] - 4} strokeWidth="4" strokeDasharray="6 4" />
                        <circle ref={ref(`jI${j}`)} r={JIR[j]} strokeWidth="2" />
                        <circle ref={ref(`jS${j}`)} r={JSR[j]} />
                        <line ref={ref(`cH${j}`)} strokeWidth="1.5" />
                        <line ref={ref(`cV${j}`)} strokeWidth="1.5" />
                        {j >= 1 && j <= 2 && [0, 1, 2, 3, 4, 5, 6, 7].map(bi => <circle key={`jB${j}${bi}`} ref={ref(`jB${j}${bi}`)} r={2} />)}

                        {/* Tiny status LED */}
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

                {/* End-effector pulse */}
                <circle ref={ref('pl')} fill="none" strokeWidth="2" />

                {/* Angle annotations */}
                {[1, 2].map(i => <text key={`lb${i}`} ref={ref(`lb${i}`)} fontSize="14" fontWeight="bold" fontFamily="var(--font-geist-mono),monospace" />)}
            </svg>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-24 md:py-32">
                <Header />
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7">
                    {SPONSORS.map(sp => (
                        <motion.div key={sp.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
                            <SponsorCard sponsor={sp} isHovered={hId === sp.id} onHoverChange={onCard(sp.id)} />
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    {[{ l: 'IK_JOINTS', v: `${NJ}` }, { l: 'COVERAGE', v: '100%' }, { l: 'ARM_STATUS', v: hId ? 'LOCKED' : 'TRACKING' }].map(x => (
                        <div key={x.l} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full" style={{ background: '#4FAEF3', boxShadow: '0 0 4px rgba(79,174,243,0.5)' }} />
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                                {x.l}: <span style={{ color: 'rgba(79,174,243,0.6)' }}>{x.v}</span>
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.06) 30%,rgba(79,174,243,0.12) 50%,rgba(255,255,255,0.06) 70%,transparent 95%)' }} />
        </section>
    );
}