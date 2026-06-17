'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ['About', 'Domains', 'Events', 'Projects', 'Teams'];

  return (
    <header className="relative z-50 flex w-full items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-12 md:py-8">
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:hidden"
      >
        <span className="sr-only">Menu</span>
        <span className="flex h-4 w-5 flex-col justify-between">
          <span className={`block h-0.5 w-full rounded-full bg-current transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-full rounded-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block h-0.5 w-full rounded-full bg-current transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </span>
      </button>
      
      {/* Scaled Down Logo Section */}
      <Link href="/" className="hidden min-w-0 items-center sm:flex">
        <Image 
          src="/robovitics-logo.png" 
          alt="roboVITics Logo" 
          width={150} 
          height={40} 
          // Reduced height classes here:
          className="h-5 w-auto object-contain sm:h-6 md:h-7 lg:h-8" 
          priority 
        />
      </Link>

      <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-400">
        {navItems.map((item) => (
          <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
            {item}
          </Link>
        ))}
      </nav>
      
      <button className="shrink-0 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-black transition-colors duration-300 hover:bg-[#00E5FF] hover:text-black sm:px-5 sm:py-2.5 sm:text-sm lg:px-6">
        Join<span className="hidden sm:inline"> the Club</span>
      </button>

      {menuOpen && (
        <nav className="absolute left-4 right-4 top-[calc(100%-6px)] z-50 overflow-hidden rounded-lg border border-white/10 bg-black/85 font-mono text-sm text-gray-200 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-white/10 px-4 py-3 transition-colors last:border-b-0 hover:bg-white/10"
            >
              {item}
            </Link>
          ))}
        </nav>
      )}
      
    </header>
  );
}
