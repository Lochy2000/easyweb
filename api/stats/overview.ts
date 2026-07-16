import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/auth.js';
import { sql } from '../_lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!(await requireAdmin(req, res))) return;

  const daysParam = Number(req.query.days);
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(Math.round(daysParam), 1), 90) : 7;

  const [trend, topPages, referrers, conversions] = await Promise.all([
    sql`
      SELECT date_trunc('day', created_at)::date AS day, COUNT(*)::int AS count
      FROM events
      WHERE event_type = 'pageview' AND created_at >= now() - make_interval(days => ${days})
      GROUP BY day ORDER BY day
    `,
    sql`
      SELECT path, COUNT(*)::int AS count
      FROM events
      WHERE event_type = 'pageview' AND path IS NOT NULL AND created_at >= now() - make_interval(days => ${days})
      GROUP BY path ORDER BY count DESC LIMIT 10
    `,
    sql`
      SELECT referrer_source AS source, COUNT(*)::int AS count
      FROM events
      WHERE event_type = 'pageview' AND created_at >= now() - make_interval(days => ${days})
      GROUP BY referrer_source ORDER BY count DESC LIMIT 10
    `,
    sql`
      SELECT event_type, COUNT(*)::int AS count
      FROM events
      WHERE event_type IN ('booking_open', 'booking_complete', 'audit_complete')
        AND created_at >= now() - make_interval(days => ${days})
      GROUP BY event_type
    `,
  ]);

  const conversionCounts = { bookingOpens: 0, bookingCompletes: 0, auditCompletes: 0 };
  for (const row of conversions as unknown as { event_type: string; count: number }[]) {
    if (row.event_type === 'booking_open') conversionCounts.bookingOpens = row.count;
    if (row.event_type === 'booking_complete') conversionCounts.bookingCompletes = row.count;
    if (row.event_type === 'audit_complete') conversionCounts.auditCompletes = row.count;
  }

  const totalPageviews = (trend as unknown as { count: number }[]).reduce((sum, r) => sum + r.count, 0);

  return res.status(200).json({
    days,
    totalPageviews,
    trend,
    topPages,
    referrers,
    conversions: conversionCounts,
  });
}
