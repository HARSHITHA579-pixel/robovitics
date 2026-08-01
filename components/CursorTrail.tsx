'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetPos = useRef<Point>({ x: -100, y: -100 });
  const headPos = useRef<Point>({ x: -100, y: -100 });
  const points = useRef<Point[]>([]);
  const isHoveredTarget = useRef<boolean>(false);
  const isOverInteractive = useRef<boolean>(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Enable custom trajectory cursor trail exclusively on fine-pointer desktop devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Target sections: Hero, Domains, Teams, Events, Projects
    const targetSelectors = '#hero, #domains, #domains-mobile, #technical-teams, #events, #events-mobile, #projects, #projects-mobile';

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (headPos.current.x < 0) {
        headPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if pointer is over any of the target sections
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        const inTarget = !!hoveredElement.closest(targetSelectors);
        isHoveredTarget.current = inTarget;

        const isInteractiveEl = !!hoveredElement.closest('a, button, input, textarea, [role="button"], select, .cursor-pointer');
        isOverInteractive.current = isInteractiveEl;
      } else {
        isHoveredTarget.current = false;
        isOverInteractive.current = false;
      }
    };

    const handleMouseLeave = () => {
      isHoveredTarget.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Apply cursor:none exclusively to the target sections
    const styleEl = document.createElement('style');
    styleEl.id = 'robovitics-cursor-trail-style';
    styleEl.innerHTML = `
      #hero, #hero *,
      #domains, #domains *,
      #domains-mobile, #domains-mobile *,
      #technical-teams, #technical-teams *,
      #events, #events *,
      #events-mobile, #events-mobile *,
      #projects, #projects * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Refined trail length (~15-20% shorter for subtle, non-distracting motion)
    const MAX_POINTS = 14;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isHoveredTarget.current) {
        // Smooth easing with slight orbital lag
        headPos.current.x += (targetPos.current.x - headPos.current.x) * 0.36;
        headPos.current.y += (targetPos.current.y - headPos.current.y) * 0.36;

        points.current.unshift({ x: headPos.current.x, y: headPos.current.y });
        if (points.current.length > MAX_POINTS) {
          points.current.pop();
        }
      } else {
        if (points.current.length > 0) {
          points.current.pop();
        }
      }

      const pts = points.current;

      if (pts.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Theme Cyan Blue Glow (#4FAEF3)
        ctx.shadowColor = '#4FAEF3';
        ctx.shadowBlur = isOverInteractive.current ? 14 : 10;

        // Render single continuous curved trajectory line
        for (let i = 0; i < pts.length - 1; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const progress = 1 - i / (pts.length - 1); // 1.0 at pointer tip down to 0.0 at tail

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);

          if (i < pts.length - 2) {
            const xc = (p1.x + p2.x) / 2;
            const yc = (p1.y + p2.y) / 2;
            ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
          } else {
            ctx.lineTo(p2.x, p2.y);
          }

          // Primary website theme cyan blue #4FAEF3 with smooth fade-out
          ctx.strokeStyle = `rgba(79, 174, 243, ${progress * 0.92})`;
          // Thin 2-3px line width tapering towards tail
          ctx.lineWidth = 0.6 + progress * 2.2;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Futuristic pointer reticle head matching #4FAEF3 theme
      if (isHoveredTarget.current && pts.length > 0) {
        const head = targetPos.current;
        const radius = isOverInteractive.current ? 4.5 : 3.5;

        ctx.save();
        ctx.shadowColor = '#4FAEF3';
        ctx.shadowBlur = isOverInteractive.current ? 14 : 10;

        // Outer cyan blue reticle ring (#4FAEF3)
        ctx.beginPath();
        ctx.arc(head.x, head.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4FAEF3';
        ctx.fill();

        // Inner white/bright cyan precision point
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#EAF6FF';
        ctx.fill();

        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      const existingStyle = document.getElementById('robovitics-cursor-trail-style');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999]"
      aria-hidden="true"
    />
  );
}
