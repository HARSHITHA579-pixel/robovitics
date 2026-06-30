'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import ContactModal from './ContactModal';

const navItems = ['About', 'Domains', 'Teams', 'Events', 'Projects'];
const moreNavItems = ['Achievements', 'Sponsors', 'Memories', 'Board'];
const mobileNavItems = ['About', 'Domains', 'Teams', 'Events', 'Achievements', 'Projects', 'Sponsors', 'Memories', 'Board'];
const pageNavItems = mobileNavItems;

const desktopNavTargets: Record<string, string> = {
  About: 'about',
  Domains: 'domains-desktop',
  Teams: 'technical-teams',
  Events: 'events',
  Projects: 'projects',
  Achievements: 'achievements',
  Sponsors: 'sponsors',
  Memories: 'memories',
  Board: 'command-structure',
};

const mobileNavTargets: Record<string, string> = {
  About: 'about-mobile',
  Domains: 'domains-mobile',
  Teams: 'technical-teams',
  Events: 'events-mobile',
  Projects: 'projects-mobile',
  Achievements: 'achievements',
  Sponsors: 'sponsors',
  Memories: 'memories',
  Board: 'command-structure',
};

// 🛠️ NEW: Custom scroll offsets for each specific section
// Tweak these numbers to get the perfect stopping point.
// • Less negative (e.g., -50) = Scrolls FURTHER DOWN (fixes stopping early)
// • More negative (e.g., -400) = Scrolls LESS (fixes stopping too late)
const sectionOffsets: Record<string, number> = {
  // Moved from -50 to 20 (scrolls ~70px further down)
  'technical-teams': 20,   
  
  'events': 2000,           
  'events-mobile': 100,    
  
  // Moved from -70 to 0 (scrolls ~70px further down)
  'projects': 1300,  
  'projects-mobile': 100,
        
  
  // Moved from -120 to -50 (scrolls ~70px further down)
  'about': 0,            
  'about-mobile': 0,
  
  'domains-desktop': -120,
  'domains-mobile': 0,

  achievements: -80,
  sponsors: -80,
  memories: 0,
  'command-structure': -80,
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, item: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    
    if (target) {
      // 🛠️ Grab the custom offset for this specific ID, fallback to -120 if not found
      const yOffset = sectionOffsets[targetId] ?? -120;
      
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    setActiveSection(item);
    setMenuOpen(false);
    window.history.pushState(null, '', `#${targetId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(window.scrollY < 80);
      if (window.scrollY < window.innerHeight * 0.85) {
        setActiveSection('');
        return;
      }

      const targets = window.innerWidth < 768 ? mobileNavTargets : desktopNavTargets;
      const scrollPoint = window.scrollY + window.innerHeight * 0.38;
      let currentSection = '';

      pageNavItems.forEach((item) => {
        const target = document.getElementById(targets[item]);
        if (!target) return;

        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        if (targetTop <= scrollPoint) {
          currentSection = item;
        }
      });

      setActiveSection(currentSection);
    };

    const timeout = setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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

  const isScrolled = !isExpanded;

  const navShellStyle = {
    maxWidth: isExpanded ? '1152px' : '860px',
    gridTemplateColumns: isExpanded ? '1fr auto 1fr' : '0fr auto 0fr',
  };

  const fadeClass = `transition-all duration-300 ease-out ${
    isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
  }`;

  return (
    <header className="fixed left-0 right-0 top-0 z-[80] px-3 pt-3 sm:px-6 md:px-10">
      <div
        style={navShellStyle}
        className={`relative ml-auto flex md:grid justify-end w-fit items-center gap-3 overflow-visible border text-white transition-all duration-300 ease-out md:mx-auto md:backdrop-blur-2xl md:backdrop-saturate-150 md:border-white/[0.14] md:bg-black/65 md:shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.04)] ${
          isScrolled
            ? 'max-md:mr-0 max-md:w-fit max-md:border-transparent max-md:bg-transparent max-md:p-0 max-md:shadow-none md:w-fit md:px-3 md:py-2'
            : 'border-transparent bg-transparent p-0 shadow-none md:w-auto md:px-4 md:py-2.5'
        }`}
      >
        <span className={`max-md:hidden absolute left-0 top-0 h-3 w-3 border-l border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] ${fadeClass}`} />
        <span className={`max-md:hidden absolute right-0 top-0 h-3 w-3 border-r border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] ${fadeClass}`} />
        <span className={`max-md:hidden absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] ${fadeClass}`} />
        <span className={`max-md:hidden absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] ${fadeClass}`} />

        <span className={`absolute left-[22%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#4FAEF3]/25 to-transparent lg:block ${fadeClass}`} />
        <span className={`absolute right-[22%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#4FAEF3]/25 to-transparent lg:block ${fadeClass}`} />

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`hidden min-w-0 overflow-hidden items-center justify-self-start md:flex ${isExpanded ? 'md:w-auto' : 'md:w-0'} ${fadeClass}`}
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

        <nav className="relative hidden items-center gap-0.5 justify-self-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 md:flex">
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
                ref={(el) => { navRefs.current[index] = el; }}
                href={`#${desktopNavTargets[item] ?? item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, desktopNavTargets[item] ?? item.toLowerCase(), item)}
                className={`group relative z-10 px-2.5 py-1.5 transition-colors duration-200 xl:px-3 ${
                  isActive ? 'text-white' : 'hover:text-white/80'
                }`}
              >
                {item}
                {!isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-[#4FAEF3]/60 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}

          <div
            className="relative z-20"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
            onFocus={() => setMoreOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setMoreOpen(false);
              }
            }}
          >
            <button
              type="button"
              className={`relative px-2.5 py-1.5 uppercase transition-colors duration-200 xl:px-3 ${
                moreNavItems.includes(activeSection) ? 'text-white' : 'hover:text-white/80'
              }`}
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More
              {!moreNavItems.includes(activeSection) && (
                <span className={`absolute bottom-0 left-3 right-3 h-px origin-left bg-[#4FAEF3]/60 transition-transform duration-300 ${moreOpen ? 'scale-x-100' : 'scale-x-0'}`} />
              )}
            </button>

            <div className={`absolute left-1/2 top-full mt-5 w-72 -translate-x-1/2 rounded-[6px] border border-white/18 bg-[#070808]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-200 before:absolute before:-top-5 before:left-0 before:h-5 before:w-full before:content-[''] ${
              moreOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
            }`}>
              <div className="pointer-events-none absolute inset-0 opacity-35" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
                backgroundSize: '22px 22px, 22px 22px',
              }} />
              <div className="relative z-10 flex flex-col">
                {moreNavItems.map((item) => {
                  const isActive = activeSection === item;
                  return (
                    <Link
                      key={item}
                      href={`#${desktopNavTargets[item] ?? item.toLowerCase()}`}
                      onClick={(e) => {
                        setMoreOpen(false);
                        scrollToSection(e, desktopNavTargets[item] ?? item.toLowerCase(), item);
                      }}
                      className={`group/item relative border-b border-white/10 px-4 py-3.5 transition-colors last:border-b-0 ${
                        isActive ? 'text-white' : 'text-white/66 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-[11px]">{item}</span>
                        <span className={`h-px w-5 transition-colors ${isActive ? 'bg-[#4FAEF3]/70' : 'bg-white/15 group-hover/item:bg-white/35'}`} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className={`hidden h-9 items-center justify-center justify-self-end self-center overflow-hidden whitespace-nowrap border bg-white/[0.035] font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/88 transition-all duration-300 hover:border-[#4FAEF3]/70 hover:bg-[#4FAEF3]/10 hover:text-[#4FAEF3] hover:shadow-[0_0_18px_rgba(79,174,243,0.35)] md:inline-flex lg:h-10 lg:text-[10px] ${
            isExpanded ? 'min-w-[132px] border-white/16 px-4 lg:min-w-[146px]' : 'w-0 min-w-0 border-transparent px-0'
          } ${fadeClass}`}
        >
          Contact Us
        </button>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 shrink-0 items-center justify-center justify-self-end border border-white/12 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
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
            {mobileNavItems.map((item) => {
              const isActive = activeSection === item;
              return (
                <Link
                  key={item}
                  href={`#${mobileNavTargets[item] ?? item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, mobileNavTargets[item] ?? item.toLowerCase(), item)}
                  className={`group relative border-b border-white/10 px-1 py-4 transition-colors ${
                    isActive ? 'text-white' : 'text-white/62 hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className="text-[12px]">{item}</span>
                    </span>
                    <span className={`h-px w-6 transition-colors ${isActive ? 'bg-[#4FAEF3]/70' : 'bg-white/15 group-hover:bg-white/35'}`} />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setContactOpen(true);
              }}
              className="flex items-center justify-between border border-white/12 bg-white/[0.035] px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/82 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <span>Contact Us</span>
              <span aria-hidden="true">↗</span>
            </button>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
              Tap a section to navigate
            </p>
          </div>
        </div>
      </aside>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
