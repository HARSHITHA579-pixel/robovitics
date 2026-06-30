import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FORM_TIME_MS = 1500;
const MAX_FORM_TIME_MS = 30 * 60 * 1000;

const globalRateStore = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, RateEntry>;
};

const rateLimitStore = globalRateStore.__contactRateLimit ?? new Map<string, RateEntry>();
globalRateStore.__contactRateLimit = rateLimitStore;

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwardedFor || request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  existing.count += 1;
  return existing.count > MAX_REQUESTS_PER_WINDOW;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = getString(payload.name);
  const email = getString(payload.email).toLowerCase();
  const phone = getString(payload.phone);
  const message = getString(payload.message);
  const website = getString(payload.website);
  const startedAt = typeof payload.startedAt === 'number' ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (elapsed < MIN_FORM_TIME_MS || elapsed > MAX_FORM_TIME_MS) {
    return NextResponse.json({ error: 'Please try submitting the form again.' }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`ip:${ip}`) || isRateLimited(`email:${email}`)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Please enter a valid name.' }, { status: 400 });
  }

  if (!isValidEmail(email) || email.length > 120) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }

  if (phone.length < 7 || phone.length > 20) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
  }

  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json({ error: 'Message must be between 10 and 2000 characters.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json({ error: 'Contact form is not configured yet.' }, { status: 500 });
  }

  const html = `
    <h2>New RoboVITics contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
  `;

  const text = [
    'New RoboVITics contact form submission',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `RoboVITics Contact Form - ${name}`,
      html,
      text,
      reply_to: email,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json({ error: 'Unable to send message right now.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
