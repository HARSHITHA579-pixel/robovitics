'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ['About', 'Domains', 'Events', 'Projects', 'Teams'];

  return (
    <header className="fixed left-0 right-0 top-0 z-[80] px-3 pt-3 sm:px-6 md:px-10">
      <div className="relative mx-auto flex max-w-3xl items-center justify-between border border-white/[0.075] bg-black/20 px-2 py-1 text-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm md:justify-center">
        <span className="pointer-events-none absolute left-3 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-white/0 via-white/24 to-white/0 md:block" />
        <span className="pointer-events-none absolute right-3 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-white/0 via-white/24 to-white/0 md:block" />
        <span className="pointer-events-none absolute left-4 top-1/2 hidden h-1 w-1 -translate-y-1/2 rounded-full border border-white/28 md:block" />
        <span className="pointer-events-none absolute right-4 top-1/2 hidden h-1 w-1 -translate-y-1/2 rounded-full border border-white/28 md:block" />

        <span className="flex items-center gap-2 pl-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/32 md:hidden">
          <span className="h-1 w-1 rounded-full border border-white/35" />
          NAV
        </span>

        <nav className="hidden items-center gap-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/42 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative px-3 py-1.5 transition-colors duration-200 hover:text-white/86"
            >
              <span className="mr-2 text-white/20">0{index + 1}</span>
              {item}
              <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-white/45 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/[0.018] text-white/80 transition-colors hover:bg-white/[0.06] md:hidden"
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
        <nav className="mx-auto mt-2 max-w-3xl overflow-hidden border border-white/10 bg-black/72 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-200 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 px-4 py-3 transition-colors last:border-b-0 hover:bg-white/10"
            >
              <span>{item}</span>
              <span className="text-white/28">0{index + 1}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
