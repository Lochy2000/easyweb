import type { VercelRequest, VercelResponse } from '@vercel/node';
import { timingSafeEqual } from 'node:crypto';
import { createSessionCookie } from '../_lib/auth';

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // Buffers must be equal length for timingSafeEqual — pad instead of
  // short-circuiting on length, so we don't leak length via timing either.
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const { password } = req.body ?? {};
  if (typeof password !== 'string' || !safeEqual(password, adminPassword)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  res.setHeader('Set-Cookie', await createSessionCookie());
  return res.status(200).json({ authenticated: true });
}
