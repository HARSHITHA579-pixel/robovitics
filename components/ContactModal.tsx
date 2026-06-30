'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const startedAtRef = useRef(0);

  const closeModal = useCallback(() => {
    setForm(initialForm);
    setSubmitState('idle');
    setStatusMessage('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    startedAtRef.current = Date.now();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal, open]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('sending');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, startedAt: startedAtRef.current }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send message.');
      }

      setSubmitState('success');
      setStatusMessage('Message queued. We will get back to you soon.');
      setForm(initialForm);
    } catch (error) {
      setSubmitState('error');
      setStatusMessage(error instanceof Error ? error.message : 'Unable to send message.');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 text-white">
      <button
        type="button"
        aria-label="Close contact form"
        className="absolute inset-0 bg-black/70 backdrop-blur-[3px]"
        onClick={closeModal}
      />

      <div className="relative z-10 w-full max-w-[520px] overflow-hidden border border-white/15 bg-[#070808]/95 shadow-[0_22px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '24px 24px, 24px 24px',
          }}
        />
        <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#4FAEF3]/80 shadow-[0_0_14px_rgba(79,174,243,0.65)]" />
        <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#4FAEF3]/80 shadow-[0_0_14px_rgba(79,174,243,0.65)]" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#4FAEF3]/80 shadow-[0_0_14px_rgba(79,174,243,0.65)]" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#4FAEF3]/80 shadow-[0_0_14px_rgba(79,174,243,0.65)]" />

        <div className="relative z-10 p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#4FAEF3]/75">
                SYSTEM.CONNECT //
              </p>
              <h2 className="font-mono text-xl font-semibold uppercase tracking-[0.18em] text-white sm:text-2xl">
                Contact Form
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close contact form"
              onClick={closeModal}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/12 bg-white/[0.035] text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
              className="hidden"
              name="website"
              aria-hidden="true"
            />

            <label className="block">
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Name</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full border border-white/12 bg-white/[0.035] px-3 py-3 font-mono text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#4FAEF3]/70 focus:bg-[#4FAEF3]/[0.06]"
                placeholder="Your name"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full border border-white/12 bg-white/[0.035] px-3 py-3 font-mono text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#4FAEF3]/70 focus:bg-[#4FAEF3]/[0.06]"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Phone No.</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full border border-white/12 bg-white/[0.035] px-3 py-3 font-mono text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#4FAEF3]/70 focus:bg-[#4FAEF3]/[0.06]"
                  placeholder="+91 ..."
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                className="min-h-32 w-full resize-none border border-white/12 bg-white/[0.035] px-3 py-3 font-mono text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#4FAEF3]/70 focus:bg-[#4FAEF3]/[0.06]"
                placeholder="Tell us what you want to ask..."
              />
            </label>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className={`min-h-5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                submitState === 'success' ? 'text-[#4FAEF3]/85' : submitState === 'error' ? 'text-red-300/85' : 'text-white/30'
              }`}>
                {statusMessage || 'Secure relay enabled'}
              </p>
              <button
                type="submit"
                disabled={submitState === 'sending'}
                className="border border-[#4FAEF3]/55 bg-[#4FAEF3]/10 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4FAEF3] transition-all hover:bg-[#4FAEF3]/15 hover:shadow-[0_0_18px_rgba(79,174,243,0.28)] disabled:cursor-wait disabled:opacity-55"
              >
                {submitState === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
