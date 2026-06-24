'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// MOVED OUTSIDE: Prevents the infinite render loop
const navItems = ['About', 'Domains', 'Events', 'Projects', 'Teams'];
const mobileNavTargets: Record<string, string> = {
  About: 'about-mobile',
  Domains: 'domains-mobile',
  Events: 'events-mobile',
  Projects: 'projects',
  Teams: 'command-structure',
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroChromeOpacity, setHeroChromeOpacity] = useState(1);
  
  const [activeSection, setActiveSection] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const updateHeroChrome = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const fadeDistance = Math.min(window.innerHeight * 0.55, 460);
        const opacity = Math.max(0, Math.min(1, 1 - window.scrollY / fadeDistance));
        setHeroChromeOpacity(opacity);

        if (window.scrollY < window.innerHeight * 0.85) {
          setActiveSection('');
        }
      });
    };

    updateHeroChrome();
    window.addEventListener('scroll', updateHeroChrome, { passive: true });
    window.addEventListener('resize', updateHeroChrome);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateHeroChrome);
      window.removeEventListener('resize', updateHeroChrome);
    };
  }, []);

  // Intersection Observer to track scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const id = visibleEntry.target.id;
          const matchingItem = navItems.find((item) => item.toLowerCase() === id);
          if (matchingItem) setActiveSection(matchingItem);
        }
      },
      { threshold: 0, rootMargin: '-20% 0px -60% 0px' } 
    );

    const timeout = setTimeout(() => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.toLowerCase());
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  // Update slider position AND strictly match height/top so it doesn't stretch the navbar
  useEffect(() => {
    const updateIndicator = () => {
      if (!activeSection) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeIndex = navItems.indexOf(activeSection);
      const activeElement = navRefs.current[activeIndex];

      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          top: activeElement.offsetTop,
          width: activeElement.offsetWidth,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
      }
    };

    const timeout = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const heroChromeStyle = {
    opacity: heroChromeOpacity,
    transform: `translateY(${(1 - heroChromeOpacity) * -10}px)`,
    pointerEvents: heroChromeOpacity > 0.08 ? 'auto' : 'none',
  } as const;
  
  const navShellStyle = {
    maxWidth: `${860 + heroChromeOpacity * 292}px`,
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[80] px-3 pt-3 sm:px-6 md:px-10">
      <div
        style={navShellStyle}
        className="relative mx-auto grid grid-cols-[1fr_auto] items-center gap-3 overflow-hidden border border-white/[0.14] bg-black/65 px-4 py-2.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl backdrop-saturate-150 transition-[max-width] duration-300 ease-out md:grid-cols-[1fr_auto_1fr]"
      >
        {/* Corner accents — cyan HUD style */}
        <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute left-[22%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#4FAEF3]/25 to-transparent lg:block" />
        <span className="pointer-events-none absolute right-[22%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#4FAEF3]/25 to-transparent lg:block" />

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={heroChromeStyle}
          className="hidden min-w-0 items-center justify-self-start transition-[opacity,transform] duration-200 md:flex"
        >
          <Image
            src="/robovitics-logo.png"
            alt="roboVITics Logo"
            width={150}
            height={40}
            className="h-5 w-auto object-contain opacity-95 transition-opacity duration-200 hover:opacity-100 sm:h-6 md:h-7"
            priority
          />
        </Link>

        {/* Mobile label */}
        <span className="flex items-center gap-2 pl-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/32 md:hidden">
          <span className="h-1 w-1 rounded-full border border-[#4FAEF3]/60" />
          NAV
        </span>

        {/* Center nav links */}
        <nav className="relative hidden items-center gap-0.5 justify-self-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 md:flex">
          
          {/* THE SLIDING HIGHLIGHT - Now using explicit top/height to prevent layout shifting */}
          <div
            className="pointer-events-none absolute z-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              left: indicatorStyle.left,
              top: indicatorStyle.top,
              width: indicatorStyle.width,
              height: indicatorStyle.height,
              opacity: indicatorStyle.opacity,
            }}
          >
            <span className="absolute inset-0 bg-[#4FAEF3]/10 shadow-[0_0_12px_rgba(79,174,243,0.2)]" />
            <span className="absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-[#4FAEF3]/70" />
            <span className="absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-[#4FAEF3]/70" />
            <span className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-[#4FAEF3]/70" />
            <span className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-[#4FAEF3]/70" />
            <span className="absolute bottom-0 h-[1px] w-full bg-[#4FAEF3] shadow-[0_0_8px_rgba(79,174,243,0.8)]" />
          </div>

          {navItems.map((item, index) => {
            const isActive = activeSection === item;
            return (
              <Link
                key={item}
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item)}
                className={`group relative z-10 px-2.5 py-1.5 transition-colors duration-200 xl:px-3 ${
                  isActive ? 'text-white' : 'hover:text-white/80'
                }`}
              >
                <span className={`mr-2 transition-colors duration-200 ${
                  isActive 
                    ? 'text-[#4FAEF3] drop-shadow-[0_0_6px_rgba(79,174,243,0.8)]' 
                    : 'text-[#4FAEF3]/60 group-hover:text-[#4FAEF3]'
                }`}>
                  0{index + 1}
                </span>
                {item}
                
                {/* Fallback hover underline for inactive items */}
                {!isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-[#4FAEF3]/60 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <Link
          href="#about"
          style={heroChromeStyle}
          className="hidden justify-self-end border border-white/16 bg-white/[0.04] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 transition-all duration-300 hover:border-[#4FAEF3]/70 hover:bg-[#4FAEF3]/10 hover:text-[#4FAEF3] hover:shadow-[0_0_18px_rgba(79,174,243,0.35)] sm:inline-flex"
        >
          Join the Club
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-8 w-8 shrink-0 items-center justify-center justify-self-end border border-white/12 bg-white/[0.025] text-white/80 transition-colors hover:bg-white/[0.07] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-3.5 w-4 flex-col justify-between">
            <span className={`block h-px w-full bg-current transition-transform ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`block h-px w-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-px w-full bg-current transition-transform ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[-1] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-[90] w-[min(82vw,340px)] border-l border-white/12 bg-[#070808]/95 text-white shadow-[-18px_0_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px, 28px 28px',
          }}
        />

        <div className="relative z-10 flex h-full flex-col px-5 pb-6 pt-8">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div className="min-w-0">
              <Image
                src="/robovitics-logo.png"
                alt="roboVITics Logo"
                width={150}
                height={40}
                className="h-7 w-auto object-contain opacity-90"
              />
            </div>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/12 bg-white/[0.035] text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="mt-7 flex flex-col font-mono uppercase tracking-[0.16em]">
            {navItems.map((item, index) => {
              const isActive = activeSection === item;
              return (
                <Link
                  key={item}
                  href={`#${mobileNavTargets[item] ?? item.toLowerCase()}`}
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveSection(item);
                  }}
                  className={`group relative border-b border-white/10 px-1 py-4 transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/62 hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className={`text-[10px] ${isActive ? 'text-[#4FAEF3]/85' : 'text-white/28'}`}>0{index + 1}</span>
                      <span className="text-[12px]">{item}</span>
                    </span>
                    <span className={`h-px w-6 transition-colors ${isActive ? 'bg-[#4FAEF3]/70' : 'bg-white/15 group-hover:bg-white/35'}`} />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-5">
            <Link
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border border-white/12 bg-white/[0.035] px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/82 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <span>Join the Club</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
              Tap a section to navigate
            </p>
          </div>
        </div>
      </aside>
    </header>
  );
}
