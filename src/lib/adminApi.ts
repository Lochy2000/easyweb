export interface AdminPost {
  id: string; // slug
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
}

export interface AdminPostDetail extends AdminPost {
  content: string;
}

export interface PostFormInput {
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

export interface StatsOverview {
  days: number;
  totalPageviews: number;
  trend: { day: string; count: number }[];
  topPages: { path: string; count: number }[];
  referrers: { source: string; count: number }[];
  conversions: { bookingOpens: number; bookingCompletes: number; auditCompletes: number };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    credentials: 'same-origin',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const adminApi = {
  login: (password: string) =>
    request<{ authenticated: boolean }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  logout: () => request<{ authenticated: boolean }>('/api/auth/logout', { method: 'POST' }),
  me: () => request<{ authenticated: boolean }>('/api/auth/me'),

  listPosts: () => request<AdminPost[]>('/api/posts'),
  getPost: (slug: string) => request<AdminPostDetail>(`/api/posts/${encodeURIComponent(slug)}`),
  createPost: (input: PostFormInput) =>
    request<AdminPostDetail>('/api/posts', { method: 'POST', body: JSON.stringify(input) }),
  updatePost: (slug: string, input: Partial<PostFormInput>) =>
    request<AdminPostDetail>(`/api/posts/${encodeURIComponent(slug)}`, { method: 'PUT', body: JSON.stringify(input) }),
  deletePost: (slug: string) =>
    request<void>(`/api/posts/${encodeURIComponent(slug)}`, { method: 'DELETE' }),

  statsOverview: (days: number) => request<StatsOverview>(`/api/stats/overview?days=${days}`),
};
