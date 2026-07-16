const SESSION_COOKIE = 'ew_sid';
const SESSION_DAYS = 30;

type ConversionEvent = 'booking_open' | 'booking_complete' | 'audit_complete';

function getSessionId(): string {
  const existing = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${SESSION_COOKIE}=`))
    ?.split('=')[1];
  if (existing) return existing;

  const id = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${SESSION_COOKIE}=${id}; expires=${expires}; path=/; SameSite=Lax`;
  return id;
}

function send(body: Record<string, unknown>) {
  const payload = JSON.stringify(body);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
      return;
    }
  } catch {
    // fall through to fetch
  }
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // tracking must never surface an error to the visitor
  });
}

export function trackPageview(path?: string) {
  send({
    type: 'pageview',
    path: path ?? window.location.pathname,
    referrer: document.referrer || undefined,
    sessionId: getSessionId(),
  });
}

export function trackEvent(type: ConversionEvent, meta?: Record<string, unknown>) {
  send({
    type,
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    sessionId: getSessionId(),
    meta,
  });
}
