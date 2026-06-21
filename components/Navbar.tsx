'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navItems = ['About', 'Domains', 'Events', 'Projects', 'Teams'];

  useEffect(() => {
    setMounted(true);

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[80] flex justify-center px-3 transition-[padding] duration-500 ease-out sm:px-6 ${scrolled ? 'pt-2' : 'pt-5'
        }`}
    >
      <div
        className={`relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border border-white/[0.14] px-4 py-2.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl backdrop-saturate-150 transition-[max-width,background-color,box-shadow,transform,opacity] duration-500 ease-out sm:px-6 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          } ${scrolled
            ? 'bg-black/85 shadow-[0_14px_44px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]'
            : 'bg-black/65'
          }`}
        style={{ maxWidth: scrolled ? '880px' : '1040px' }}
      >
        {/* Corner accents — cyan HUD style */}
        <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] transition-all duration-500" />
        <span className="pointer-events-none absolute left-[24%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#4FAEF3]/25 to-transparent lg:block" />
        <span className="pointer-events-none absolute right-[24%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#4FAEF3]/25 to-transparent lg:block" />
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center justify-self-start"
        >
          <Image
            src="/robovitics-logo.png"
            alt="roboVITics Logo"
            width={180}
            height={48}
            className="h-6 w-auto object-contain opacity-95 transition-opacity duration-200 hover:opacity-100 sm:h-7 md:h-8"
            priority
          />
        </Link>

        {/* Mobile label */}
        <span className="flex items-center gap-2 pl-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/32 md:hidden">
          <span className="h-1 w-1 rounded-full border border-[#4FAEF3]/60" />
          NAV
        </span>

        {/* Center nav links */}
        <nav className="hidden items-center gap-1 justify-self-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative px-3 py-1.5 transition-colors duration-200 hover:text-white"
            >
              <span className="mr-2 text-[#4FAEF3] drop-shadow-[0_0_6px_rgba(79,174,243,0.6)] transition-colors duration-200 group-hover:text-[#4FAEF3]">
                0{index + 1}
              </span>
              {item}
              <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-[#4FAEF3] shadow-[0_0_8px_rgba(79,174,243,0.7)] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#contact"
          className="hidden justify-self-end border border-white/16 bg-white/[0.04] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 transition-all duration-300 hover:border-[#4FAEF3]/70 hover:bg-[#4FAEF3]/10 hover:text-[#4FAEF3] hover:shadow-[0_0_18px_rgba(79,174,243,0.35)] sm:inline-flex"
        >
          Contact Us
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

      {menuOpen && (
        <nav className="absolute left-3 right-3 top-[64px] mx-auto max-w-6xl overflow-hidden border border-white/10 bg-black/85 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-200 shadow-[0_18px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:left-6 sm:right-6 md:hidden">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 px-4 py-3 transition-colors last:border-b-0 hover:bg-white/10"
            >
              <span>{item}</span>
              <span className="text-[#4FAEF3]/60">0{index + 1}</span>
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 text-[#4FAEF3] transition-colors hover:bg-white/10"
          >
            <span>Contact Us</span>
          </Link>
        </nav>
      )}
    </header>
  );
}