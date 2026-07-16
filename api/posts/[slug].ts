import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthenticated, requireAdmin } from '../_lib/auth';
import { getPostBySlug, updatePost, deletePost } from '../_lib/posts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug;
  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  if (req.method === 'GET') {
    const authed = await isAuthenticated(req);
    const post = await getPostBySlug(slug, authed);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json(post);
  }

  if (req.method === 'PUT') {
    if (!(await requireAdmin(req, res))) return;
    const post = await updatePost(slug, req.body ?? {});
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json(post);
  }

  if (req.method === 'DELETE') {
    if (!(await requireAdmin(req, res))) return;
    const deleted = await deletePost(slug);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET, PUT, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
