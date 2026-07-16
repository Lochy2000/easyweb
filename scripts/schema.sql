-- Run this once against your Postgres database before using /admin.
-- (Neon console SQL editor, or: psql "$POSTGRES_URL" -f scripts/schema.sql)

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'EasyWeb Team',
  tags TEXT[] DEFAULT '{}',
  content TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  published_at DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  path TEXT,
  referrer_source TEXT,
  session_id TEXT,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_type_created ON events (event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_events_path ON events (path);
