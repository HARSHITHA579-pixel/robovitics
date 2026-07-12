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
  {
    label: 'X',
    href: 'https://x.com/RoboVITics_HQ',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M13.9 10.4 21.2 2h-1.7l-6.3 7.2L8.1 2H2.3l7.7 10.9L2.3 22h1.7l6.8-7.8 5.4 7.8H22l-8.1-11.6Zm-2.4 2.8-.8-1.1L4.5 3.3h2.8l5 7.1.8 1.1 6.5 9.2h-2.8l-5.3-7.5Z"
        />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
        />
      </svg>
    ),
  },
];

const footerStars = [
  { left: '8%', top: '24%', size: 2, opacity: 0.42, blur: 0, flare: 0.55 },
  { left: '15%', top: '58%', size: 2.5, opacity: 0.34, blur: 0.2, flare: 0 },
  { left: '26%', top: '34%', size: 2, opacity: 0.32, blur: 0, flare: 0.45 },
  { left: '38%', top: '17%', size: 2.5, opacity: 0.38, blur: 0.1, flare: 0.65 },
  { left: '52%', top: '49%', size: 1.5, opacity: 0.28, blur: 0, flare: 0 },
  { left: '64%', top: '27%', size: 3, opacity: 0.34, blur: 0.4, flare: 0.5 },
  { left: '77%', top: '63%', size: 2, opacity: 0.3, blur: 0, flare: 0 },
  { left: '88%', top: '35%', size: 2.5, opacity: 0.38, blur: 0.2, flare: 0.6 },
  { left: '94%', top: '14%', size: 2, opacity: 0.28, blur: 0, flare: 0 },
];

const footerDepthStars = [
  { left: '11%', top: '41%', size: 4, opacity: 0.22, blur: 1.3, flare: 0 },
  { left: '44%', top: '71%', size: 3.5, opacity: 0.18, blur: 1, flare: 0 },
  { left: '71%', top: '18%', size: 4, opacity: 0.2, blur: 1.5, flare: 0 },
  { left: '83%', top: '50%', size: 4.5, opacity: 0.16, blur: 1.8, flare: 0 },
];

const skyStars = [
  { left: '7%', top: '16%', size: 2.5, opacity: 0.7, blur: 0, flare: 0.9 },
  { left: '13%', top: '31%', size: 3, opacity: 0.56, blur: 0.2, flare: 0.7 },
  { left: '21%', top: '12%', size: 2, opacity: 0.52, blur: 0, flare: 0.55 },
  { left: '30%', top: '39%', size: 3.5, opacity: 0.46, blur: 0.5, flare: 0 },
  { left: '68%', top: '18%', size: 2.5, opacity: 0.62, blur: 0, flare: 0.75 },
  { left: '75%', top: '34%', size: 3, opacity: 0.52, blur: 0.2, flare: 0.65 },
  { left: '83%', top: '13%', size: 3.5, opacity: 0.48, blur: 0.6, flare: 0 },
  { left: '92%', top: '28%', size: 2.5, opacity: 0.6, blur: 0, flare: 0.8 },
];

function StarLayer({
  stars,
  className = '',
}: {
  stars: { left: string; top: string; size: number; opacity: number; blur: number; flare: number }[];
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      {stars.map((star) => (
        <span
          key={`${star.left}-${star.top}`}
          className="absolute"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size * 8}px`,
            height: `${star.size * 8}px`,
            opacity: star.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {star.flare > 0 && (
            <>
              <span
                className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  width: `${star.size * 8}px`,
                  opacity: star.flare,
                  filter: `blur(${Math.max(star.blur, 0.2)}px)`,
                }}
              />
              <span
                className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-white to-transparent"
                style={{
                  height: `${star.size * 8}px`,
                  opacity: star.flare * 0.85,
                  filter: `blur(${Math.max(star.blur, 0.2)}px)`,
                }}
              />
            </>
          )}
          <span
            className="absolute left-1/2 top-1/2 rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              transform: 'translate(-50%, -50%)',
              filter: `blur(${star.blur}px)`,
              boxShadow: `0 0 ${star.size * 5}px rgba(160, 210, 255, ${Math.min(star.opacity + 0.18, 0.8)})`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[#3862BD] shadow-[0_0_14px_rgba(56,98,189,0.85)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(56,98,189,1)]" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-[#3862BD] shadow-[0_0_14px_rgba(56,98,189,0.85)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(56,98,189,1)]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#3862BD] shadow-[0_0_14px_rgba(56,98,189,0.85)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(56,98,189,1)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#3862BD] shadow-[0_0_14px_rgba(56,98,189,0.85)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(56,98,189,1)]" />
    </>
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
    <a
      href={href}
      className="group relative flex min-h-10 items-center gap-3 border border-white/10 bg-white/[0.02] px-3 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(56,98,189,0.15)] hover:-translate-y-[2px] sm:min-h-14 sm:px-4"
    >
      <CornerBrackets />
      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 bg-white/[0.04] text-white/50 transition-all duration-300 group-hover:border-[#3862BD]/50 group-hover:text-[#3862BD] group-hover:drop-shadow-[0_0_8px_rgba(56,98,189,0.8)] sm:h-9 sm:w-9">
        {icon}
      </span>
      <span className="relative z-10 min-w-0">
        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">{label}</span>
        <span className="block truncate text-xs font-semibold text-white/80 transition-colors duration-300 group-hover:text-white sm:text-sm">{value}</span>
      </span>
    </a>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 overflow-hidden bg-black pt-8 text-white sm:pt-10">

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

      <StarLayer stars={footerDepthStars} className="inset-0 z-0" />
      <StarLayer stars={footerStars} className="inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_84%,transparent)]" />

      {/* Main Content Wrapper - Awwwards Style */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">

          {/* Left Column */}
          <div className="flex flex-col justify-between pt-2 lg:pt-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl whitespace-nowrap flex gap-2">
                <span className="text-white/90">Innovate.</span>
                <span className="text-white/80">Build.</span>
                <span className="text-[#3862BD]">Inspire</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50 sm:text-base">
                The official Robotics Club of VIT, Vellore.
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            <div className="flex flex-col gap-8 mt-6 lg:mt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">Connect</span>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {socialLinks.map((link, idx) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className="group flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-110 hover:border-[#3862BD]/60 hover:bg-[#3862BD]/10 hover:text-[#3862BD] hover:shadow-[0_0_15px_rgba(56,98,189,0.3)]"
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                &copy; 2026 ALL RIGHTS RESERVED.
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between pt-2 lg:pt-10">

            {/* Row 1 - Contact Cards */}
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ContactChip
                  label="EMAIL"
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
                  label="PHONE"
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
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            {/* Row 2 - Footer Utility */}
            <div className="flex flex-col gap-8 mt-6 lg:mt-8 sm:items-end">
              <button
                type="button"
                onClick={scrollToTop}
                className="group relative flex h-11 items-center gap-3 border border-white/10 bg-transparent px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_20px_rgba(56,98,189,0.15)] hover:-translate-y-[2px]"
              >
                <CornerBrackets />
                <span className="relative z-10">BACK TO TOP</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:-translate-y-[2px] group-hover:text-[#3862BD] group-hover:drop-shadow-[0_0_8px_rgba(56,98,189,0.8)]">
                  <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                </svg>
              </button>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                VIT VELLORE CAMPUS, TAMIL NADU
              </span>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="mb-0 mt-8 h-px w-full bg-gradient-to-r from-white/30 to-transparent lg:mt-10" />
      </div>

      {/* Logo overlay + Full Bleed Image Foundation */}
      <div className="relative w-full">
        <StarLayer
          stars={skyStars}
          className="inset-x-0 top-0 z-10 h-[42%] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_22%,black_42%),linear-gradient(to_bottom,black_0%,black_76%,transparent_100%)]"
        />
        <motion.div
          className="absolute inset-x-0 top-0 z-20 flex flex-col items-center px-4 pt-8 sm:pt-12 md:pt-14 lg:pt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Image
            src="/robovitics-logo.png"
            alt="RoboVITics Logo"
            width={600}
            height={200}
            className="h-auto w-full max-w-[280px] object-contain opacity-85 mix-blend-screen sm:max-w-[34rem] md:max-w-[42rem] lg:max-w-[56rem]"
          />
          <div className="mt-3 flex flex-col items-center gap-2 sm:mt-2 lg:mt-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 sm:text-[9px] sm:tracking-[0.26em] lg:text-[10px] lg:tracking-[0.3em]">
              OFFICIAL ROBOTICS CLUB OF VIT VELLORE
            </p>
            <p className="hidden max-w-[260px] text-center font-mono text-[9px] leading-relaxed text-white/35 sm:block sm:max-w-[46rem] sm:text-[9px] lg:max-w-none lg:text-[10px]">
              Student-led robotics, workshops, competitions, and engineering projects since 2010.
            </p>

          </div>
        </motion.div>

        <div className="pointer-events-none relative z-0 flex h-[clamp(270px,39vw,585px)] w-full justify-center overflow-hidden leading-none sm:h-[clamp(320px,39vw,610px)] lg:h-[clamp(450px,38vw,680px)]">
          <Image
            src="/footer.png"
            alt="RoboVITics Technical Landscape Foundation"
            width={1913}
            height={822}
            className="h-full w-full object-cover object-bottom opacity-90"
          />
        </div>
      </div>

    </footer>
  );
}
