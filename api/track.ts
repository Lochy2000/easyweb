import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';

const ALLOWED_EVENT_TYPES = ['pageview', 'booking_open', 'booking_complete', 'audit_complete'] as const;
type EventType = (typeof ALLOWED_EVENT_TYPES)[number];

function bucketReferrer(referrer: string | undefined): string {
  if (!referrer) return 'Direct';
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    if (/google\./.test(host)) return 'Google';
    if (/bing\./.test(host)) return 'Bing';
    if (/duckduckgo\./.test(host)) return 'DuckDuckGo';
    if (/(twitter\.com|x\.com|t\.co)/.test(host)) return 'Twitter/X';
    if (/(facebook\.com|instagram\.com|linkedin\.com)/.test(host)) return 'Social';
    if (host === 'easywebs.uk' || host === 'www.easywebs.uk') return 'Direct';
    return `Referral: ${host}`;
  } catch {
    return 'Direct';
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, path, referrer, sessionId, meta } = req.body ?? {};

  if (typeof type !== 'string' || !ALLOWED_EVENT_TYPES.includes(type as EventType)) {
    return res.status(400).json({ error: 'Invalid event type' });
  }

  try {
    await sql`
      INSERT INTO events (event_type, path, referrer_source, session_id, meta)
      VALUES (
        ${type},
        ${typeof path === 'string' ? path : null},
        ${bucketReferrer(typeof referrer === 'string' ? referrer : undefined)},
        ${typeof sessionId === 'string' ? sessionId : null},
        ${meta && typeof meta === 'object' ? JSON.stringify(meta) : null}
      )
    `;
    return res.status(204).end();
  } catch (err) {
    console.error('Failed to record event:', err);
    // Tracking must never break the visitor's experience.
    return res.status(204).end();
  }
}
