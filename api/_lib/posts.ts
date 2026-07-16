import { sql } from './db';

interface PostRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  author: string;
  tags: string[];
  content: string;
  published: boolean;
  published_at: string;
}

// Shape matches the existing frontend BlogFrontMatter/BlogPost interfaces
// (src/lib/blog.ts) — "id" is the post's slug, kept as-is from the old
// markdown-file-based id so /blog/:id URLs don't change.
export interface PostListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
}

export interface PostDetail extends PostListItem {
  content: string;
}

export interface PostInput {
  slug: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  author?: string;
  tags?: string[];
  content: string;
  published?: boolean;
  date?: string;
}

function toListItem(row: PostRow): PostListItem {
  return {
    id: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    imageUrl: row.image_url ?? '',
    date: row.published_at,
    author: row.author,
    tags: row.tags ?? [],
    published: row.published,
  };
}

function toDetail(row: PostRow): PostDetail {
  return { ...toListItem(row), content: row.content };
}

export async function listPosts(includeUnpublished: boolean): Promise<PostListItem[]> {
  const rows = includeUnpublished
    ? await sql`SELECT * FROM posts ORDER BY published_at DESC`
    : await sql`SELECT * FROM posts WHERE published = true ORDER BY published_at DESC`;
  return (rows as unknown as PostRow[]).map(toListItem);
}

export async function getPostBySlug(slug: string, includeUnpublished: boolean): Promise<PostDetail | null> {
  const rows = includeUnpublished
    ? await sql`SELECT * FROM posts WHERE slug = ${slug}`
    : await sql`SELECT * FROM posts WHERE slug = ${slug} AND published = true`;
  const row = (rows as unknown as PostRow[])[0];
  return row ? toDetail(row) : null;
}

export async function createPost(input: PostInput): Promise<PostDetail> {
  const rows = await sql`
    INSERT INTO posts (slug, title, description, category, image_url, author, tags, content, published, published_at)
    VALUES (
      ${input.slug}, ${input.title}, ${input.description}, ${input.category},
      ${input.imageUrl ?? null}, ${input.author ?? 'EasyWeb Team'}, ${input.tags ?? []}::text[],
      ${input.content}, ${input.published ?? true}, ${input.date ?? new Date().toISOString().slice(0, 10)}
    )
    RETURNING *
  `;
  return toDetail((rows as unknown as PostRow[])[0]);
}

export async function updatePost(slug: string, input: Partial<PostInput>): Promise<PostDetail | null> {
  const rows = await sql`
    UPDATE posts SET
      slug = COALESCE(${input.slug ?? null}, slug),
      title = COALESCE(${input.title ?? null}, title),
      description = COALESCE(${input.description ?? null}, description),
      category = COALESCE(${input.category ?? null}, category),
      image_url = COALESCE(${input.imageUrl ?? null}, image_url),
      author = COALESCE(${input.author ?? null}, author),
      tags = COALESCE(${input.tags ?? null}::text[], tags),
      content = COALESCE(${input.content ?? null}, content),
      published = COALESCE(${input.published ?? null}, published),
      published_at = COALESCE(${input.date ?? null}, published_at),
      updated_at = now()
    WHERE slug = ${slug}
    RETURNING *
  `;
  const row = (rows as unknown as PostRow[])[0];
  return row ? toDetail(row) : null;
}

export async function deletePost(slug: string): Promise<boolean> {
  const rows = await sql`DELETE FROM posts WHERE slug = ${slug} RETURNING id`;
  return (rows as unknown[]).length > 0;
}
