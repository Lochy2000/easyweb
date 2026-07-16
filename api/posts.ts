import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthenticated, requireAdmin } from './_lib/auth';
import { listPosts, createPost } from './_lib/posts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const authed = await isAuthenticated(req);
    const posts = await listPosts(authed);
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    if (!(await requireAdmin(req, res))) return;

    const { slug, title, description, category, content } = req.body ?? {};
    if (!slug || !title || !description || !category || !content) {
      return res.status(400).json({ error: 'slug, title, description, category, and content are required' });
    }

    try {
      const post = await createPost(req.body);
      return res.status(201).json(post);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
        return res.status(409).json({ error: 'A post with that slug already exists' });
      }
      console.error('Failed to create post:', err);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
