'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const contactEmail = 'robovitics@vit.ac.in';
const contactPhone = '+91 98765 43210';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/robovitics/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/robovitics/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path d="M6.7 9.6H3.8V20h2.9V9.6Z" fill="currentColor" />
        <path d="M5.2 8.1a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z" fill="currentColor" />
        <path d="M20.2 14.1V20h-2.9v-5.5c0-1.5-.7-2.4-1.9-2.4-1 0-1.6.6-1.9 1.2-.1.2-.1.6-.1.9V20h-2.9V9.6h2.9V11c.5-.8 1.5-1.8 3.2-1.8 2.2 0 3.6 1.5 3.6 4.9Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/RoboVITics',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 3.8a8.4 8.4 0 0 0-2.7 16.4c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.4.8.1-.5.3-.9.5-1.1-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.6.9-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.3.9.7-.2 1.4-.3 2.1-.3.7 0 1.4.1 2.1.3 1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 1.9.1 2.1.5.6.9 1.3.9 2.2 0 3.2-1.9 3.9-3.8 4.1.3.3.6.8.6 1.6v2.1c0 .2.2.5.6.4A8.4 8.4 0 0 0 12 3.8Z"
        />
      </svg>
    ),
  },
];

function Bracketed({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-white/30" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-white/30" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/30" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/30" />
      {children}
    </div>
  );
}

function ContactChip({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Bracketed>
      <a
        href={href}
                className="group flex min-h-10 items-center gap-3 border border-white/8 bg-white/[0.02] px-3 text-left transition-all duration-300 hover:border-[#4FAEF3]/40 hover:bg-white/[0.045] hover:shadow-[0_0_15px_rgba(79,174,243,0.15)] sm:min-h-14 sm:px-4"

      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 bg-white/[0.04] text-white/50 transition-colors group-hover:border-[#4FAEF3]/50 group-hover:text-[#4FAEF3] sm:h-9 sm:w-9">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">{label}</span>
          <span className="block truncate text-xs font-semibold text-white/80 sm:text-sm">{value}</span>
        </span>
      </a>
    </Bracketed>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 overflow-hidden bg-[#050607] pt-10 text-white sm:pt-12">
      {/* Top border glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#4FAEF3]/60 to-transparent" />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-2 sm:px-8 sm:pb-8 md:px-12 lg:px-16">

        {/* System label */}
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
            SYSTEM.CONNECT //
          </span>
          <span className="h-px flex-1 bg-white/8" />
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden">

          {/* Nav links — horizontal, compact */}
          <div className="mb-5 flex gap-8 font-mono text-[10px] uppercase tracking-[0.15em] text-white/55">
            <div className="flex flex-col gap-2.5">
              <a href="/about" className="transition-colors hover:text-[#4FAEF3]">About Us</a>
              <a href="/projects" className="transition-colors hover:text-[#4FAEF3]">Projects</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <a href="/events" className="transition-colors hover:text-[#4FAEF3]">Events</a>
              <a href="/join" className="transition-colors hover:text-[#4FAEF3]">Contact Us</a>
            </div>
          </div>

          {/* Contact chips — stacked, full width */}
          <div className="mb-5 flex flex-col gap-2">
            <ContactChip
              label="Email"
              value={contactEmail}
              href={`mailto:${contactEmail}`}
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path d="M4 6.5h16v11H4v-11Z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="m5 7.5 7 5 7-5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              }
            />
            <ContactChip
              label="Phone"
              value={contactPhone}
              href={`tel:${contactPhone.replaceAll(' ', '')}`}
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path
                    d="M7.2 4.8 9.3 9c.2.5.1 1-.3 1.3l-1.1.9a10.5 10.5 0 0 0 4.9 4.9l.9-1.1c.3-.4.9-.5 1.3-.3l4.2 2.1c.5.2.7.7.6 1.2l-.5 2.1c-.1.5-.6.9-1.1.9C9.8 21 3 14.2 3 5.8c0-.5.4-1 .9-1.1L6 4.2c.5-.1 1 .1 1.2.6Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
            />
          </div>

          {/* Divider */}
          <div className="mb-5 h-px w-full bg-white/8" />

          {/* Social + back to top — same row */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">Connect</p>
              <div className="h-px w-6 bg-[#4FAEF3]/45" />
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/[0.02] text-white/50 transition-all duration-300 hover:border-[#4FAEF3]/60 hover:bg-[#4FAEF3]/10 hover:text-[#4FAEF3]"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
            >
              <span>Top</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          {/* Copyright */}
                   <div className="flex flex-col gap-2 border-b border-white/8 pb-5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">

            <div className="flex items-center gap-3">
              <span className="text-white/20">05. EOF</span>
              <span className="h-px w-5 bg-white/15" />
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <p>VIT Vellore Campus, Tamil Nadu</p>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (lg+) ── unchanged from original */}
        <div className="hidden lg:block">

          {/* Top row */}
          <div className="grid gap-8 border-b border-white/8 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <section>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">Navigation</p>
              <div className="flex gap-10 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                <div className="flex flex-col gap-3">
                  <a href="/about" className="transition-colors hover:text-[#4FAEF3]">About Us</a>
                  <a href="/projects" className="transition-colors hover:text-[#4FAEF3]">Projects</a>
                </div>
                <div className="flex flex-col gap-3">
                  <a href="/events" className="transition-colors hover:text-[#4FAEF3]">Events</a>
                  <a href="/join" className="transition-colors hover:text-[#4FAEF3]">Contact Us</a>
                </div>
              </div>
            </section>
            <section className="grid gap-3 sm:grid-cols-2 lg:min-w-[480px]">
              <ContactChip
                label="Email"
                value={contactEmail}
                href={`mailto:${contactEmail}`}
                icon={
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path d="M4 6.5h16v11H4v-11Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="m5 7.5 7 5 7-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                }
              />
              <ContactChip
                label="Phone"
                value={contactPhone}
                href={`tel:${contactPhone.replaceAll(' ', '')}`}
                icon={
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path
                      d="M7.2 4.8 9.3 9c.2.5.1 1-.3 1.3l-1.1.9a10.5 10.5 0 0 0 4.9 4.9l.9-1.1c.3-.4.9-.5 1.3-.3l4.2 2.1c.5.2.7.7.6 1.2l-.5 2.1c-.1.5-.6.9-1.1.9C9.8 21 3 14.2 3 5.8c0-.5.4-1 .9-1.1L6 4.2c.5-.1 1 .1 1.2.6Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                }
              />
            </section>
          </div>

          {/* Social + back to top */}
          <div className="grid gap-5 pb-8 pt-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <p className="mr-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Connect</p>
              <div className="h-px w-10 bg-[#4FAEF3]/45" />
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.02] text-white/50 transition-all duration-300 hover:border-[#4FAEF3]/60 hover:bg-[#4FAEF3]/10 hover:text-[#4FAEF3] hover:shadow-[0_0_12px_rgba(79,174,243,0.3)]"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-end">
              <Bracketed>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="flex min-h-10 items-center gap-3 border border-white/20 bg-transparent px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-[#4FAEF3]/50 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_12px_rgba(79,174,243,0.2)]"
                >
                  <span>Back to top</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                    <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                </button>
              </Bracketed>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-2 border-b border-white/8 pb-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white/20">05. EOF</span>
              <span className="h-px w-6 bg-white/15" />
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <p>VIT Vellore Campus, Tamil Nadu</p>
          </div>
        </div>

        {/* Logo + tagline — shared across all breakpoints */}
        <motion.div
          className="relative z-20 mt-4 flex flex-col items-center justify-center sm:mt-20 md:mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Image
            src="/robovitics-logo.png"
            alt="RoboVITics Logo"
            width={600}
            height={200}
            className="h-auto w-full max-w-[240px] object-contain sm:max-w-[30rem] md:max-w-[38rem] lg:max-w-[46rem]"
          />
          <div className="mt-3 flex flex-col items-center gap-2 px-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 sm:text-[10px] sm:tracking-[0.3em]">
              Official Robotics Club of VIT Vellore
            </p>
            <p className="hidden max-w-[260px] text-center font-mono text-[9px] leading-relaxed text-white/35 sm:block sm:max-w-none sm:text-[10px]">
              Student-led robotics, workshops, competitions, and engineering projects since 2010.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Full Bleed Image Foundation */}
      <div className="pointer-events-none relative z-0 -mt-20 flex w-full justify-center leading-none sm:-mt-56 sm:-mb-28 md:-mt-80 md:-mb-40 lg:-mt-[26rem] lg:-mb-52">
        <Image
          src="/footer.png"
          alt="RoboVITics Technical Landscape Foundation"
          width={1920}
          height={500}
          className="h-auto w-full object-cover object-[center_25%] opacity-80"
        />
      </div>

    </footer>
  );
}
