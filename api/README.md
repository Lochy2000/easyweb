Backend for the blog CMS and site analytics. Lives in `/api` as Vercel Serverless
Functions — no separate server, deploys as part of the same Vercel project as the
Vite site.

## Tech Stack

- Runtime: Vercel Serverless Functions (Node), zero-config — anything under `/api`
  becomes an endpoint automatically, no framework needed
- Database: Postgres via Neon (`@neondatabase/serverless`) — provisioned through
  Vercel's Storage tab, not a separate Neon account
- Auth: single admin password (env var) + a signed session cookie (`jose`, JWT).
  No user table, no signup flow — this is a one-person admin, not multi-user
- Frontend talks to this over plain `fetch`, no client library

## Database

Two tables, see `scripts/schema.sql` for the real thing.

**posts** — the blog. `slug` is the old markdown filename (e.g.
`understanding-website-hosting`) so existing `/blog/:id` links didn't break when
this migrated off files. `published` lets a post sit as a draft before it goes
live.

**events** — engagement tracking. One row per pageview/booking-open/booking-complete/audit-complete.
`session_id` is just a random id in a cookie, no PII. `referrer_source` is
bucketed server-side (Google/Direct/Social/etc) rather than storing the raw
referrer.

## Endpoints

- `GET /api/posts` — list posts. Public visitors only get published ones; an
  authenticated admin request also gets drafts.
- `POST /api/posts` — create a post. Admin only.
- `GET /api/posts/:slug` — one post, same published/draft visibility rule as above.
- `PUT /api/posts/:slug` — update a post. Admin only.
- `DELETE /api/posts/:slug` — delete a post. Admin only.
- `POST /api/auth/login` — `{ password }` → sets the session cookie or 401s.
- `POST /api/auth/logout` — clears the cookie.
- `GET /api/auth/me` — `{ authenticated: boolean }`, used by `/admin` on load to
  decide whether to show the login screen.
- `POST /api/track` — fire-and-forget event logging, called from the site itself
  (not the admin). No auth — it's write-only, anyone can send a pageview, that's fine.
- `GET /api/stats/overview?days=7` — pageview trend, top pages, referrers,
  conversion counts. Admin only. One endpoint instead of several since the
  dashboard wants all of it at once anyway.

## Auth model

One password (`ADMIN_PASSWORD`), compared with a timing-safe check in
`api/auth/login.ts`. On success it signs a JWT (`SESSION_SECRET`) and sets it as
an HttpOnly cookie for 7 days. `api/_lib/auth.ts`'s `requireAdmin()` is the guard
every mutating endpoint calls first — if the cookie doesn't verify, it 401s and
the handler stops there.

No password hashing, no rate limiting on login attempts, no multi-user support.
Fine for a single admin; would need revisiting if that ever changes.

## Environment variables

Copy `.env.example` to `.env` for local dev. In production these live in the
Vercel dashboard (Project Settings → Environment Variables):

- `DATABASE_URL` (or `POSTGRES_URL` — the code checks both, since Vercel's own
  naming for this has changed over time) — the Neon connection string, shows up
  automatically once you provision Postgres from the Storage tab
- `ADMIN_PASSWORD` — whatever you want, just make it long
- `SESSION_SECRET` — random string, used to sign the session cookie. Don't reuse
  `ADMIN_PASSWORD` for this

## First-time setup

1. Vercel dashboard → Storage → create a Postgres database, link it to the project
2. Run `scripts/schema.sql` against it once (Neon's own SQL editor is the easiest
   way — no need to install `psql`)
3. `pnpm migrate:blogs` locally — pulls the old markdown posts out of
   `src/content/blogs/` and inserts them into `posts`, keeping their filenames as slugs
4. Set the three env vars above in Vercel, deploy

## Local dev

`npm run dev` (plain Vite) does **not** run anything under `/api` — that's a
Vercel-only thing. Either use the Vercel CLI (`vercel dev`) if you want the API
working locally too, or just push and test against a preview deployment.
