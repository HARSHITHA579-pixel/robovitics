'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Memory {
  year: string;
  title: string;
  desc: string;
  img: string;
}

const MEMORIES: Memory[] = [
  { year: '2010', title: 'The Beginning', desc: 'RoboVITics boots up as the official robotics chapter on campus.', img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&auto=format&fit=crop' },
  { year: '2012', title: 'First Build', desc: 'The first competition bot rolls off the bench after weeks of late nights.', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop' },
  { year: '2014', title: 'Nationals', desc: 'A small team travels cross-country to compete on the national stage.', img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=600&auto=format&fit=crop' },
  { year: '2016', title: 'Breakthrough', desc: 'New domains open up — software, drones, and AI join the workshop floor.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' },
  { year: '2018', title: '500 Members', desc: 'Membership crosses 500, the club outgrows its first home in the lab.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop' },
  { year: '2020', title: 'Online Era', desc: 'Workshops move online; circuits get soldered over video calls instead.', img: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=600&auto=format&fit=crop' },
  { year: '2022', title: '6 Domains', desc: 'Six active domains now run in parallel, from robotics to research.', img: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=600&auto=format&fit=crop' },
  { year: '2024', title: 'New Heights', desc: 'Record turnout at flagship events, and a new arena for combat robotics.', img: 'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=600&auto=format&fit=crop' },
];

const DEBRIS_COUNT = 12;
const FAR_Z = -20;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeBox = (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2);

interface MemoryNode { data: Memory; el: HTMLDivElement; }

function buildGearShape(outerR: number, innerR: number, teeth: number): THREE.Shape {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step - step * 0.42;
    const a1 = a0 + step * 0.28;
    const a2 = a1 + step * 0.28;
    const a3 = a2 + step * 0.28;
    if (i === 0) shape.moveTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    else shape.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    shape.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
    shape.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
    shape.lineTo(Math.cos(a3) * innerR, Math.sin(a3) * innerR);
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR * 0.52, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

const globalStyles = `
  .mwt-card {
    position: absolute; top: 0; left: 0; width: min(365px, 76vw);
    transform-origin: center center; will-change: transform, opacity, filter;
    pointer-events: none; z-index: 6; transform-style: preserve-3d;
    filter:
      drop-shadow(0 0 10px rgba(79,174,243,var(--mwt-card-glow, 0.16)))
      drop-shadow(0 12px 34px rgba(0,0,0,0.5));
  }
  .mwt-card-inner {
    background: rgba(10, 10, 10, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px 20px 20px;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .mwt-card-bg {
    position: absolute;
    top: -1px; right: -1px; bottom: -1px; left: -1px;
    border-radius: 4px;
    background:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)),
      rgba(28,30,34,0.95);
    background-size: 18px 18px, 18px 18px, auto, auto;
    border: 1px solid rgba(235,238,242,0.28);
    pointer-events: none;
    z-index: 0;
  }
  .mwt-card-bg::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, rgba(79,174,243,0.03) 0 1px, transparent 1px 8px);
    opacity: 0.22;
    mix-blend-mode: screen;
  }
  .mwt-corner {
    position: absolute; width: 14px; height: 14px; z-index: 10;
    filter: drop-shadow(0 0 4px rgba(79,174,243,0.5));
  }
  .top-left    { top: 6px; left: 6px;    border-top: 1.5px solid rgba(79,174,243,0.85); border-left:   1.5px solid rgba(79,174,243,0.85); }
  .top-right   { top: 6px; right: 6px;   border-top: 1.5px solid rgba(79,174,243,0.85); border-right:  1.5px solid rgba(79,174,243,0.85); }
  .bottom-left  { bottom: 6px; left: 6px;  border-bottom: 1.5px solid rgba(79,174,243,0.85); border-left:   1.5px solid rgba(79,174,243,0.85); }
  .bottom-right { bottom: 6px; right: 6px; border-bottom: 1.5px solid rgba(79,174,243,0.85); border-right:  1.5px solid rgba(79,174,243,0.85); }
  .mwt-line { position: absolute; height: 1px; z-index: 10; }
  .top-line    { top: -1px;    left: 20px;  width: 40px; background: rgba(79,174,243,0.6); }
  .bottom-line { bottom: -1px; right: 20px; width: 40px; background: rgba(79,174,243,0.35); }
  .mwt-img-wrap, .mwt-card-date, .mwt-card-title, .mwt-card-desc {
    position: relative; z-index: 15;
  }
  .mwt-img-wrap {
    width: 100%; height: 166px; overflow: hidden; border-radius: 2px;
    margin-bottom: 20px; background: #000;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .mwt-img-wrap img {
    width: 100%; height: 100%; object-fit: cover; opacity: 0.85;
    filter: grayscale(100%) contrast(1.25) brightness(0.78);
  }
  .mwt-card-date {
    font-family: monospace; font-size: 11px; letter-spacing: 0.18em;
    color: #4FAEF3; text-transform: uppercase; margin: 0 0 10px;
  }
  .mwt-card-title {
    font-family: "Inter", "Arial Black", sans-serif; font-weight: 900; font-size: 23px; color: #fff;
    text-transform: uppercase; letter-spacing: 0.02em; margin: 0 0 12px; line-height: 1.1;
  }
  .mwt-card-desc {
    font-family: monospace; font-size: 12px; line-height: 1.6;
    color: rgba(255,255,255,0.5); margin: 0;
  }
`;

export default function MemoryWarpTunnel() {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const sceneRef     = useRef<HTMLDivElement>(null);
  const boxRef       = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const cardLayerRef = useRef<HTMLDivElement>(null);
  const rtextRef     = useRef<HTMLDivElement>(null);
  const hintRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap      = wrapRef.current;
    const sceneWrap = sceneRef.current;
    const box       = boxRef.current;
    const canvas    = canvasRef.current;
    const cardLayer = cardLayerRef.current;
    const rtext     = rtextRef.current;
    const hint      = hintRef.current;
    if (!wrap || !sceneWrap || !box || !canvas || !cardLayer || !rtext || !hint) return;
    const wrapEl   = wrap;
    const sceneEl  = sceneWrap;
    const boxEl    = box;
    const rtextEl  = rtext;
    const hintEl   = hint;

    let VW = window.innerWidth;
    let VH = window.innerHeight;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClearColor = false;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    camera.position.set(0, 0, 8);

    const fadeScene = new THREE.Scene();
    const fadeCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const fadeMat   = new THREE.MeshBasicMaterial({
      color: 0x05080c, transparent: true, opacity: 0.20,
      depthTest: false, depthWrite: false,
    });
    fadeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fadeMat));

    // ── Geometries ────────────────────────────────────────────
    const boltGeo   = new THREE.CylinderGeometry(1.1, 1.1, 0.45, 6);
    const washerGeo = new THREE.TorusGeometry(1.0, 0.32, 8, 20);
    const gearGeo   = (() => {
      const g = new THREE.ExtrudeGeometry(buildGearShape(1.35, 0.88, 6), { depth: 0.44, bevelEnabled: false });
      g.translate(0, 0, -0.22);
      return g;
    })();
    const chipGeo = new THREE.BoxGeometry(1.45, 1.45, 0.32);
    const nutGeo  = new THREE.CylinderGeometry(0.95, 0.95, 0.54, 6);

    const GEO_TYPES  = [boltGeo, washerGeo, gearGeo, chipGeo, nutGeo];
    const SLOT_COUNT = Math.ceil(DEBRIS_COUNT / GEO_TYPES.length);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, wireframe: true, transparent: true, opacity: 0.25,
    });

    const instancedMeshes: THREE.InstancedMesh[] = GEO_TYPES.map((geo) => {
      const mesh = new THREE.InstancedMesh(geo, wireMat, SLOT_COUNT);
      mesh.frustumCulled = false;
      scene.add(mesh);
      return mesh;
    });

    // ── Per-debris state ──────────────────────────────────────
    const debrisX     = new Float32Array(DEBRIS_COUNT);
    const debrisY     = new Float32Array(DEBRIS_COUNT);
    const debrisZ     = new Float32Array(DEBRIS_COUNT);
    const debrisSpeed = new Float32Array(DEBRIS_COUNT);
    const debrisType  = new Uint8Array(DEBRIS_COUNT);
    const debrisAxisX = new Float32Array(DEBRIS_COUNT);
    const debrisAxisY = new Float32Array(DEBRIS_COUNT);
    const debrisAxisZ = new Float32Array(DEBRIS_COUNT);
    const debrisAngV  = new Float32Array(DEBRIS_COUNT);
    const debrisAngle = new Float32Array(DEBRIS_COUNT);
    const debrisSlot  = new Uint8Array(DEBRIS_COUNT);
    const slotCounter = new Uint8Array(GEO_TYPES.length);

    const _dummy = new THREE.Object3D();
    const _axis  = new THREE.Vector3();
    const _quat  = new THREE.Quaternion();

    function seedDebris(i: number) {
      const angle    = Math.random() * Math.PI * 2;
      const r        = 3.5 + Math.random() * 5;
      debrisX[i]     = Math.cos(angle) * r;
      debrisY[i]     = Math.sin(angle) * r * 0.55;
      debrisZ[i]     = -Math.random() * Math.abs(FAR_Z);
      debrisSpeed[i] = 0.2 + Math.random() * 0.4;
      debrisType[i]  = Math.floor(Math.random() * GEO_TYPES.length);
      debrisSlot[i]  = slotCounter[debrisType[i]] % SLOT_COUNT;
      slotCounter[debrisType[i]]++;
      const ax = Math.random() * 2 - 1, ay = Math.random() * 2 - 1, az = Math.random() * 2 - 1;
      const len = Math.sqrt(ax * ax + ay * ay + az * az) || 1;
      debrisAxisX[i] = ax / len; debrisAxisY[i] = ay / len; debrisAxisZ[i] = az / len;
      debrisAngV[i]  = (0.03 + Math.random() * 0.12) * (Math.PI * 2) * (Math.random() < 0.5 ? 1 : -1);
      debrisAngle[i] = Math.random() * Math.PI * 2;
    }

    _dummy.position.set(0, 0, -9999);
    _dummy.scale.setScalar(0.001);
    _dummy.updateMatrix();
    for (const mesh of instancedMeshes)
      for (let s = 0; s < SLOT_COUNT; s++)
        mesh.setMatrixAt(s, _dummy.matrix);

    for (let i = 0; i < DEBRIS_COUNT; i++) seedDebris(i);

    const nodes: MemoryNode[] = MEMORIES.map((m) => {
      const el = document.createElement('div');
      el.className = 'mwt-card';
      el.innerHTML = `
        <div class="mwt-card-inner">
          <div class="mwt-card-bg"></div>
          <span class="mwt-corner top-left"></span>
          <span class="mwt-corner top-right"></span>
          <span class="mwt-corner bottom-left"></span>
          <span class="mwt-corner bottom-right"></span>
          <span class="mwt-line top-line"></span>
          <span class="mwt-line bottom-line"></span>
          <div class="mwt-img-wrap"><img src="${m.img}" alt="${m.title}" loading="lazy"/></div>
          <div class="mwt-card-date">${m.year}</div>
          <div class="mwt-card-title">${m.title}</div>
          <p class="mwt-card-desc">${m.desc}</p>
        </div>`;
      cardLayer.appendChild(el);
      return { data: m, el };
    });

    function getBoxRect() {
      const sw = VW * 0.41, sh = VH * 0.54, sl = VW * 0.04, st = (VH - sh) / 2;
      return { w: sw, h: sh, l: sl, t: st, r: 8 };
    }

    let rafId = 0, lastTime = performance.now();
    let zoomProgress = 0, displayT = 0;

    function getProgress() {
      const rect = wrapEl.getBoundingClientRect();
      return clamp(-rect.top, 0, VH * 6.5) / (VH * 6.5);
    }

    function loop(time: number) {
      rafId = requestAnimationFrame(loop);
      const now = time || performance.now();
      const dt  = Math.min(now - lastTime, 50);
      lastTime  = now;

      const p = getProgress();

      // --- TIMELINE ---
      const targetZoom = clamp((p - 0.025) / 0.32, 0, 1);
      zoomProgress += (targetZoom - zoomProgress) * (dt * 0.006);

      // Cards start immediately when zoom finishes, no trailing empty scroll
      let targetT = 0;
      if (p > 0.345) {
        const seqP = clamp((p - 0.345) / 0.60, 0, 1);
        targetT = seqP * (MEMORIES.length + 2.85);
      }
      displayT += (targetT - displayT) * (dt * 0.004);

      // --- stage zoom ---
      const ep1 = easeBox(zoomProgress);
      const r   = getBoxRect();
      const fillScale  = Math.max(VW / r.w, VH / r.h);
      const sceneScale = lerp(1, fillScale, ep1);
      const boxCenterX = r.l + r.w / 2;
      const boxCenterY = r.t + r.h / 2;
      const sceneX = lerp(0, VW / 2 - boxCenterX * fillScale, ep1);
      const sceneY = lerp(0, VH / 2 - boxCenterY * fillScale, ep1);
      const tilt   = Math.sin(ep1 * Math.PI);
      const tiltX  = lerp(0, 2.5, tilt);
      const tiltY  = lerp(0, -7, tilt);
      const tiltZ  = lerp(0, -2.5, tilt);

      sceneEl.style.transform = `perspective(1400px) translate3d(${sceneX}px,${sceneY}px,0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg) scale(${sceneScale})`;
      boxEl.style.width        = `${r.w}px`;
      boxEl.style.height       = `${r.h}px`;
      boxEl.style.left         = `${r.l}px`;
      boxEl.style.top          = `${r.t}px`;
      boxEl.style.borderRadius = `${r.r}px`;
      boxEl.style.transform    = 'translateZ(0)';
      boxEl.style.boxShadow    = `0 0 50px rgba(79,174,243,${lerp(0.2, 0, ep1)})`;
      boxEl.style.borderColor  = `rgba(79,174,243,${lerp(0.2, 0, ep1)})`;
      rtextEl.style.opacity    = '1';
      hintEl.style.opacity     = `${Math.max(0, 1 - p * 7)}`;

      const CW = Math.round(r.w), CH = Math.round(r.h);
      if (renderer.domElement.width !== Math.round(CW * Math.min(devicePixelRatio, 2))) {
        renderer.setSize(CW, CH, true);
        camera.aspect = CW / CH;
        camera.updateProjectionMatrix();
      }

      const tunnelSpeed = clamp(dt * 0.01 + Math.abs(targetT - displayT) * 0.5, 0.12, 4.0);

      _dummy.position.set(0, 0, -9999);
      _dummy.scale.setScalar(0.001);
      _dummy.updateMatrix();
      const hiddenMat = _dummy.matrix.clone();
      for (const mesh of instancedMeshes)
        for (let s = 0; s < SLOT_COUNT; s++)
          mesh.setMatrixAt(s, hiddenMat);

      for (let i = 0; i < DEBRIS_COUNT; i++) {
        debrisZ[i] += tunnelSpeed * debrisSpeed[i];
        if (debrisZ[i] > camera.position.z - 0.5 || debrisZ[i] < FAR_Z) {
          seedDebris(i);
          debrisZ[i] = FAR_Z;
          continue;
        }
        debrisAngle[i] += debrisAngV[i] * (dt / 1000);
        _dummy.position.set(debrisX[i], debrisY[i], debrisZ[i]);
        _axis.set(debrisAxisX[i], debrisAxisY[i], debrisAxisZ[i]);
        _quat.setFromAxisAngle(_axis, debrisAngle[i]);
        _dummy.quaternion.copy(_quat);
        _dummy.scale.setScalar(1);
        _dummy.updateMatrix();
        instancedMeshes[debrisType[i]].setMatrixAt(debrisSlot[i], _dummy.matrix);
      }

      for (const mesh of instancedMeshes)
        mesh.instanceMatrix.needsUpdate = true;

      // --- HORIZONTAL CAROUSEL MATH ---
      nodes.forEach((n, i) => {
        const diff  = displayT - (i + 2.5);
        const depth = clamp(Math.abs(diff), 0, 2.4);
        const x     = -diff * 5.2;
        const y     = Math.sin((i * 1.7) + displayT) * 0.55;
        const worldZ = 2 - depth * 1.25;
        const rotY  = clamp(diff * -18, -38, 38);
        const rotX  = clamp(-y * 8, -7, 7);
        const drift = Math.sin((time * 0.001) + i) * 10;

        const absDiff = Math.abs(diff);
        let opacity = 0;
        if (absDiff < 1.0) opacity = 1;
        else if (absDiff < 2.0) opacity = 1 - (absDiff - 1.0);

        if (opacity <= 0.01) { n.el.style.opacity = '0'; return; }

        const v = new THREE.Vector3(x, 0, worldZ);
        v.project(camera);
        if (v.z < -1 || v.z > 1) { n.el.style.opacity = '0'; return; }

        const sx    = (v.x * 0.5 + 0.5) * CW;
        const sy    = (1 - (v.y * 0.5 + 0.5)) * CH;
        const scale = (clamp(8 / (camera.position.z - worldZ), 0.05, 3.0) / sceneScale) * lerp(0.9, 1.08, opacity);

        n.el.style.transform = `translate(${sx + drift}px,${sy}px) translate(-50%,-50%) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
        n.el.style.opacity   = `${opacity}`;
        n.el.style.setProperty('--mwt-card-glow', `${0.12 + opacity * 0.28}`);
      });

      camera.position.x = Math.sin(displayT * 2.0) * 0.3;
      camera.position.y = Math.cos(displayT * 2.5) * 0.15;
      camera.lookAt(0, 0, FAR_Z);

      renderer.render(fadeScene, fadeCam);
      renderer.render(scene, camera);
    }

    function onResize() { VW = window.innerWidth; VH = window.innerHeight; }
    rafId = requestAnimationFrame(loop);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      nodes.forEach((n) => n.el.remove());
      GEO_TYPES.forEach((g) => g.dispose());
      wireMat.dispose();
      fadeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Global card styles injected as a plain <style> tag to avoid JSX parser issues */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <style jsx>{`
        .mwt-wrap { position: relative; height: 950vh; background: #0d0d0d; }
        .mwt-sticky { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: #0d0d0d; }
        .mwt-scene {
          position: absolute; inset: 0;
          transform-origin: 0 0;
          will-change: transform;
        }
        .mwt-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .mwt-svg-overlay {
          position: absolute; inset: 0; height: 100%; width: 100%; pointer-events: none; z-index: 1;
        }
        .mwt-label {
          position: absolute; top: 34px; left: 46px; z-index: 20;
          font-family: monospace; font-size: 11px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.35); text-transform: uppercase; pointer-events: none;
        }
        .mwt-label b { color: #ffffff; font-weight: 700; margin-right: 8px; }
        .mwt-box {
          position: absolute; background: #05080c;
          border: 1px solid rgba(79,174,243,0.2); border-radius: 4px;
          z-index: 5; overflow: hidden;
        }
        .mwt-box canvas { position: absolute; inset: 0; display: block; }
        .mwt-rtext {
          position: absolute; right: 0; top: 0; width: 45%; height: 100%;
          display: flex; flex-direction: column; justify-content: center;
          padding-right: 5%; padding-left: 2%; z-index: 10; pointer-events: none;
        }
        .mwt-rtext .eyebrow {
          font-family: monospace; font-size: 9px; letter-spacing: 0.35em;
          color: rgba(255,255,255,0.2); text-transform: uppercase; margin: 0 0 12px; display: block;
        }
        .mwt-rtext h2 {
          font-family: "Inter", "Arial Black", sans-serif;
          font-size: clamp(32px, 4.5vw, 72px);
          font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.01em; margin: 0 0 24px;
          text-transform: uppercase;
        }
        .mwt-rtext h2 span { color: #4FAEF3; }
        .mwt-rtext .sub {
          font-family: monospace; font-size: 13px; color: rgba(255,255,255,0.6);
          line-height: 1.85; max-width: 380px; margin: 0;
        }
        .mwt-hint {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 30;
          font-family: monospace; font-size: 8px; letter-spacing: 0.25em;
          color: rgba(255,255,255,0.2); text-transform: uppercase; pointer-events: none;
          animation: mwt-blink 2s ease-in-out infinite;
        }
        @keyframes mwt-blink { 0%,100%{opacity:.2} 50%{opacity:.8} }
        .mwt-bg-dot {
          position: absolute; width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          box-shadow: 0 0 6px rgba(255,255,255,0.15);
        }
      `}</style>

      <div className="mwt-wrap" ref={wrapRef}>
        <div className="mwt-sticky">
          <div className="mwt-scene" ref={sceneRef}>
            <div className="mwt-grid" />
            <svg className="mwt-svg-overlay" xmlns="http://www.w3.org/2000/svg">
              <line x1="8%" y1="9%" x2="66%" y2="14%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <line x1="66%" y1="14%" x2="80%" y2="47%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <line x1="15%" y1="58%" x2="44%" y2="78%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            </svg>
            {([
              [8, 9], [66, 14], [15, 58], [80, 47], [44, 78],
            ] as [number, number][]).map(([lp, tp], i) => (
              <div key={i} className="mwt-bg-dot" style={{ left: `${lp}%`, top: `${tp}%` }} />
            ))}

            <div className="mwt-label"><b>06.</b>SYSTEM.LOGS // MEMORY_BANK</div>

            <div className="mwt-box" ref={boxRef}>
              <canvas ref={canvasRef} />
              <div ref={cardLayerRef} />
            </div>

            <div className="mwt-rtext" ref={rtextRef}>
              <span className="eyebrow">▶ BOOT_SEQUENCE.LOAD()</span>
              <h2>YEARS OF<br /><span>DATA.</span></h2>
              <p className="sub">From late-night builds to competition floors&mdash;<br />every circuit and line of code that shaped RoboVITics.</p>
            </div>
          </div>

          <div className="mwt-hint" ref={hintRef}>SCROLL TO DEPLOY ↓</div>
        </div>
      </div>
    </>
  );
}