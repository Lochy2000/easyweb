import { generateCloudinaryUrl, IMAGE_SIZES } from './cloudinary';
import type { BlogFrontMatter, BlogPost } from './blog';

interface ApiPostListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  author?: string;
  tags?: string[];
}

interface ApiPostDetail extends ApiPostListItem {
  content: string;
}

function toFrontMatter(post: ApiPostListItem): BlogFrontMatter {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    category: post.category,
    imageUrl: generateCloudinaryUrl(post.imageUrl || 'default_image', IMAGE_SIZES.blogHero),
    date: post.date,
    author: post.author || 'EasyWeb Team',
    tags: post.tags ?? [],
  };
}

// Fetches the post list from the backend (api/posts.ts, backed by the
// `posts` table — see scripts/schema.sql). Only published posts are
// returned for anonymous visitors; the /admin dashboard authenticates and
// sees drafts too via the same endpoint.
export async function loadMarkdownBlogPosts(): Promise<BlogFrontMatter[]> {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      console.error('Failed to load blog posts:', res.status);
      return [];
    }
    const posts: ApiPostListItem[] = await res.json();
    return posts.map(toFrontMatter);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Load a specific blog post by its slug (the "id" in BlogFrontMatter/BlogPost).
export async function loadMarkdownBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`/api/posts/${encodeURIComponent(id)}`);
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error(`Failed to load blog post "${id}":`, res.status);
      return null;
    }
    const post: ApiPostDetail = await res.json();
    return { ...toFrontMatter(post), content: post.content };
  } catch (error) {
    console.error(`Error loading blog post "${id}":`, error);
    return null;
  }
}
