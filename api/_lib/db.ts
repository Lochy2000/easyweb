import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Missing DATABASE_URL/POSTGRES_URL environment variable');
}

// Tagged-template query function, e.g. sql`SELECT * FROM posts WHERE slug = ${slug}`
export const sql = neon(connectionString);
