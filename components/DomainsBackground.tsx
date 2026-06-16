'use client';
import { useEffect, useRef } from 'react';

export default function DomainsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const types = ['hexnut', 'bolt', 'gear', 'screw'] as const;

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 8 + Math.random() * 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.003,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.10,
      alpha: 0.04 + Math.random() * 0.13,
      type: types[Math.floor(Math.random() * types.length)],
    }));

    function hexPath(cx: number, cy: number, r: number, rot: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + rot;
        i === 0
          ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
          : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    }

    function drawHexNut(cx: number, cy: number, r: number, rot: number, alpha: number) {
      ctx.save(); ctx.globalAlpha = alpha;
      hexPath(cx, cy, r, rot);
      ctx.strokeStyle = 'rgba(235,238,242,0.55)'; ctx.lineWidth = 0.8; ctx.stroke();
      hexPath(cx, cy, r * 0.42, rot);
      ctx.strokeStyle = 'rgba(235,238,242,0.3)'; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(235,238,242,0.2)'; ctx.fill();
      ctx.restore();
    }

    function drawBolt(cx: number, cy: number, r: number, rot: number, alpha: number) {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.translate(cx, cy); ctx.rotate(rot);
      hexPath(0, 0, r * 0.5, 0);
      ctx.strokeStyle = 'rgba(235,238,242,0.5)'; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, r * 0.5); ctx.lineTo(0, r * 1.6);
      ctx.strokeStyle = 'rgba(235,238,242,0.35)'; ctx.lineWidth = r * 0.28; ctx.stroke();
      for (let i = 0; i < 4; i++) {
        const y = r * 0.6 + i * (r * 0.26);
        ctx.beginPath(); ctx.moveTo(-r * 0.18, y); ctx.lineTo(r * 0.18, y);
        ctx.strokeStyle = 'rgba(235,238,242,0.18)'; ctx.lineWidth = 0.5; ctx.stroke();
      }
      ctx.restore();
    }

    function drawGear(cx: number, cy: number, r: number, rot: number, alpha: number) {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.translate(cx, cy); ctx.rotate(rot);
      const teeth = 8; const ir = r * 0.72;
      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const a = (Math.PI / teeth) * i;
        const rad = i % 2 === 0 ? r : ir;
        i === 0
          ? ctx.moveTo(rad * Math.cos(a), rad * Math.sin(a))
          : ctx.lineTo(rad * Math.cos(a), rad * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(235,238,242,0.4)'; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(235,238,242,0.25)'; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.22, 0); ctx.lineTo(r * 0.22, 0);
      ctx.moveTo(0, -r * 0.22); ctx.lineTo(0, r * 0.22);
      ctx.strokeStyle = 'rgba(235,238,242,0.2)'; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.restore();
    }

    function drawScrew(cx: number, cy: number, r: number, rot: number, alpha: number) {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.translate(cx, cy); ctx.rotate(rot);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(235,238,242,0.45)'; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-r * 0.6, 0); ctx.lineTo(r * 0.6, 0);
      ctx.strokeStyle = 'rgba(235,238,242,0.35)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(235,238,242,0.18)'; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.restore();
    }

    let raf: number;
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed;
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;
        if (p.type === 'hexnut') drawHexNut(p.x, p.y, p.r, p.rotation, p.alpha);
        else if (p.type === 'bolt') drawBolt(p.x, p.y, p.r, p.rotation, p.alpha);
        else if (p.type === 'gear') drawGear(p.x, p.y, p.r, p.rotation, p.alpha);
        else drawScrew(p.x, p.y, p.r, p.rotation, p.alpha);
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      className="pointer-events-none z-[-1]"
    />
  );
}