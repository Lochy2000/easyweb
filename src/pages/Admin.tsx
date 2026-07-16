import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Plus, Pencil, Trash2, LogOut, ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { adminApi, type AdminPost, type AdminPostDetail, type PostFormInput, type StatsOverview } from '@/lib/adminApi';

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const todayISO = () => new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Login gate
// ---------------------------------------------------------------------------

const LoginScreen = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.login(password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-paper-raised border border-line rounded-2xl p-8">
        <h1 className="font-serif font-medium text-2xl text-ink mb-1">Admin</h1>
        <p className="text-sm text-ink-soft mb-6">Sign in to manage posts and view site stats.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink mb-3 focus:outline-none focus:border-ew-accent"
        />
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-full bg-ew-accent text-white font-semibold py-3 hover:bg-ew-accent-ink transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Posts panel
// ---------------------------------------------------------------------------

const emptyForm = (): PostFormInput => ({
  slug: '',
  title: '',
  description: '',
  category: '',
  imageUrl: '',
  author: 'EasyWeb Team',
  tags: [],
  content: '',
  published: true,
  date: todayISO(),
});

const PostForm = ({
  initial,
  onCancel,
  onSaved,
}: {
  initial: AdminPostDetail | null;
  onCancel: () => void;
  onSaved: () => void;
}) => {
  const [form, setForm] = useState<PostFormInput>(
    initial
      ? {
          slug: initial.id,
          title: initial.title,
          description: initial.description,
          category: initial.category,
          imageUrl: initial.imageUrl,
          author: initial.author,
          tags: initial.tags,
          content: initial.content,
          published: initial.published,
          date: initial.date,
        }
      : emptyForm()
  );
  const [tagsInput, setTagsInput] = useState(initial?.tags.join(', ') ?? '');
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!initial;

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload: PostFormInput = {
      ...form,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEditing) {
        await adminApi.updatePost(initial!.id, payload);
      } else {
        await adminApi.createPost(payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ew-accent';
  const labelClass = 'block text-xs font-semibold uppercase tracking-[0.04em] text-ink-faint mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to posts
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input required className={inputClass} value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              required
              className={inputClass}
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm((f) => ({ ...f, slug: e.target.value }));
              }}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              required
              rows={2}
              className={inputClass}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <input required className={inputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" required className={inputClass} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Author</label>
              <input className={inputClass} value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Cloudinary image ID</label>
              <input className={inputClass} value={form.imageUrl} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Tags (comma-separated)</label>
            <input className={inputClass} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} />
            <span className="text-sm text-ink">{form.published ? 'Published' : 'Draft (hidden from /blog)'}</span>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-ew-accent text-white font-semibold text-sm px-6 py-2.5 hover:bg-ew-accent-ink transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Create post'}
            </button>
            <button type="button" onClick={onCancel} className="text-sm text-ink-soft hover:text-ink">
              Cancel
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass}>Content (markdown)</label>
          <textarea
            required
            className={`${inputClass} font-mono h-[420px] resize-none`}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          />
          <div className="mt-4">
            <label className={labelClass}>Preview</label>
            <div className="border border-line rounded-lg p-4 max-h-[420px] overflow-y-auto bg-paper-raised">
              <MarkdownRenderer content={form.content} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const PostsPanel = () => {
  const [posts, setPosts] = useState<AdminPost[] | null>(null);
  const [editing, setEditing] = useState<AdminPostDetail | null | 'new'>(null);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    try {
      setPosts(await adminApi.listPosts());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleEdit = async (id: string) => {
    try {
      setEditing(await adminApi.getPost(id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    try {
      await adminApi.deletePost(id);
      loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const handleSaved = () => {
    setEditing(null);
    loadPosts();
  };

  if (editing) {
    return <PostForm initial={editing === 'new' ? null : editing} onCancel={() => setEditing(null)} onSaved={handleSaved} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-ink-soft">{posts ? `${posts.length} post${posts.length === 1 ? '' : 's'}` : 'Loading…'}</p>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-1.5 rounded-full bg-ew-accent text-white font-semibold text-sm px-4 py-2 hover:bg-ew-accent-ink transition-colors"
        >
          <Plus className="w-4 h-4" /> New post
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="border border-line rounded-xl overflow-hidden divide-y divide-line">
        {posts?.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 p-4 bg-paper-raised">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-ink truncate">{post.title}</p>
                {!post.published && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-ew-accent bg-ew-accent-soft px-2 py-0.5 rounded-full shrink-0">
                    Draft
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-faint truncate">{post.category} · {post.date}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleEdit(post.id)} className="p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-paper" aria-label="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-ink-soft hover:text-red-600 hover:bg-paper" aria-label="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {posts?.length === 0 && <p className="p-6 text-sm text-ink-faint text-center">No posts yet.</p>}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Overview (stats) panel
// ---------------------------------------------------------------------------

const StatTile = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-paper-raised border border-line rounded-xl p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.04em] text-ink-faint mb-1.5">{label}</p>
    <p className="font-serif text-3xl text-ink">{value.toLocaleString()}</p>
  </div>
);

const OverviewPanel = () => {
  const [days, setDays] = useState(7);
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi
      .statsOverview(days)
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load stats'));
  }, [days]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!stats) return <p className="text-sm text-ink-faint">Loading…</p>;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[7, 30].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              days === d ? 'bg-ew-accent text-white' : 'bg-paper-raised border border-line text-ink-soft hover:text-ink'
            }`}
          >
            Last {d} days
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatTile label="Pageviews" value={stats.totalPageviews} />
        <StatTile label="Booking opens" value={stats.conversions.bookingOpens} />
        <StatTile label="Booking completed" value={stats.conversions.bookingCompletes} />
        <StatTile label="Audits completed" value={stats.conversions.auditCompletes} />
      </div>

      <div className="bg-paper-raised border border-line rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-ink-faint mb-4">Pageviews over time</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e2d8" />
              <XAxis dataKey="day" tickFormatter={(d: string) => d.slice(5)} tick={{ fontSize: 11, fill: '#8b8477' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#8b8477' }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3c4cc4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-paper-raised border border-line rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-ink-faint mb-4">Top pages</p>
          <div className="space-y-2">
            {stats.topPages.map((p) => (
              <div key={p.path} className="flex justify-between text-sm">
                <span className="text-ink truncate">{p.path}</span>
                <span className="text-ink-faint shrink-0 ml-3">{p.count}</span>
              </div>
            ))}
            {stats.topPages.length === 0 && <p className="text-sm text-ink-faint">No data yet.</p>}
          </div>
        </div>
        <div className="bg-paper-raised border border-line rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-ink-faint mb-4">Traffic sources</p>
          <div className="space-y-2">
            {stats.referrers.map((r) => (
              <div key={r.source} className="flex justify-between text-sm">
                <span className="text-ink truncate">{r.source}</span>
                <span className="text-ink-faint shrink-0 ml-3">{r.count}</span>
              </div>
            ))}
            {stats.referrers.length === 0 && <p className="text-sm text-ink-faint">No data yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

const Admin = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    adminApi.me().then((r) => setAuthed(r.authenticated)).catch(() => setAuthed(false));
  }, []);

  const handleLogout = async () => {
    await adminApi.logout();
    setAuthed(false);
  };

  if (authed === null) {
    return <div className="min-h-screen bg-paper" />;
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-paper">
      <Helmet>
        <title>Admin | EasyWebs</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif font-medium text-2xl text-ink">Admin</h1>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        <Tabs defaultValue="posts">
          <TabsList className="bg-paper-raised border border-line mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <PostsPanel />
          </TabsContent>
          <TabsContent value="overview">
            <OverviewPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
