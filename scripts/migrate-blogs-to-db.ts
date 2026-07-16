// One-off script — run locally, not deployed. Migrates the existing
// src/content/blogs/*.md posts into the `posts` table.
//
// Usage:
//   1. Set DATABASE_URL (or POSTGRES_URL) in .env — see .env.example.
//   2. Make sure scripts/schema.sql has been run against that database.
//   3. pnpm tsx scripts/migrate-blogs-to-db.ts

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { neon } from '@neondatabase/serverless';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOGS_DIR = path.resolve(__dirname, '../src/content/blogs');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL/POSTGRES_URL — set it in .env before running this script.');
  process.exit(1);
}

const sql = neon(connectionString);

async function main() {
  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.md') && f !== '_template.md');
  console.log(`Found ${files.length} post(s) to migrate.`);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    if (!data.id || !data.title) {
      console.warn(`Skipping ${file} — missing "id" or "title" in front matter`);
      continue;
    }

    const tags: string[] = Array.isArray(data.tags) ? data.tags : [];

    try {
      await sql`
        INSERT INTO posts (slug, title, description, category, image_url, author, tags, content, published, published_at)
        VALUES (
          ${data.id},
          ${data.title},
          ${data.description || `Learn more about ${data.title}`},
          ${data.category || 'General'},
          ${data.imageUrl || null},
          ${data.author || 'EasyWeb Team'},
          ${tags}::text[],
          ${content.trim()},
          true,
          ${data.date || new Date().toISOString().slice(0, 10)}
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`Migrated: ${data.id}`);
    } catch (err) {
      console.error(`Failed to migrate ${file}:`, err);
    }
  }

  console.log('Done.');
}

main();
