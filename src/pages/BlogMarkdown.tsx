import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import { 
  Search,
  ArrowRight,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Tag,
  Share2,
  ArrowLeft
} from "lucide-react";
import { 
  CustomDialog, 
  CustomDialogContent 
} from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { cn } from "@/lib/utils";
import MarkdownRenderer from '@/components/MarkdownRenderer';
import '@/components/TemplateResponsive.css';
import { 
  formatBlogDate, 
  calculateReadingTime,
  type BlogFrontMatter,
  type BlogPost
} from '@/lib/blog';

// Import only the markdown loaders
import { loadMarkdownBlogPosts, loadMarkdownBlogPost } from '@/lib/markdown-loader';

const SIDEBAR_STATE_KEY = 'blog-sidebar-state';

const Sidebar = ({ 
  isOpen, 
  onClose,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  currentPostId,
  posts
}: { 
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  currentPostId?: string;
  posts: BlogFrontMatter[];
}) => {
  const navigate = useNavigate();
  
  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
    return ["All", ...uniqueCategories];
  }, [posts]);
  
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className={cn(
      "fixed top-0 right-0 h-full bg-background/95 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 ease-in-out z-40 pt-24",
      "w-80 sm:w-80 md:w-80 lg:w-80", // Consistent width on larger screens
      "max-sm:w-full max-sm:left-0 max-sm:right-0", // Full width on mobile
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <button
        onClick={onClose}
        className={cn(
          "absolute top-28 bg-background/95 backdrop-blur-lg p-3 rounded-l-xl border border-white/10 border-r-0 hover:bg-white/5 transition-colors",
          "max-sm:hidden", // Hide on mobile (use X inside instead)
          "-left-12"
        )}
        aria-label="Close search"
      >
        <X className="w-5 h-5 text-foreground/70" />
      </button>
      
      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="sm:hidden absolute top-6 right-4 bg-background/95 backdrop-blur-lg p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors z-50"
        aria-label="Close search"
      >
        <X className="w-5 h-5 text-foreground/70" />
      </button>
      
      <div className="p-6 h-full overflow-y-auto">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white/5 text-foreground/70 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => {
                navigate(`/blog/${post.id}`);
                onClose();
              }}
              className={cn(
                "w-full text-left group p-3 rounded-xl transition-colors",
                post.id === currentPostId 
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-white/5"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 line-clamp-2">{post.title}</h4>
                  <p className="text-xs text-foreground/50">{post.category}</p>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 ml-auto flex-shrink-0 transition-transform",
                  post.id === currentPostId ? "text-primary" : "text-foreground/30"
                )} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostContent = ({ post }: { post: BlogPost }) => {
  const readingTime = calculateReadingTime(post.content);
  
  // Create structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author || "EasyWeb Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Easywebs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.easywebs.uk/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.easywebs.uk/blog/${post.id}`
    }
  };
  
  return (
    <article className="max-w-4xl mx-auto px-4">
      {/* SEO metadata */}
      <Helmet>
        <title>{post.title} | Easywebs Blog</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://www.easywebs.uk/blog/${post.id}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://www.easywebs.uk/blog/${post.id}`} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.imageUrl} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="max-w-sm mx-auto mb-8">
        <div className="aspect-square w-full rounded-2xl overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
          {post.category}
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-8">
          {post.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatBlogDate(post.date)}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
          
          {post.author && (
            <div className="flex items-center gap-1">
              <span>By {post.author}</span>
            </div>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <div key={tag} className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs">
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <MarkdownRenderer content={post.content} />
      
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blogs</span>
          </button>
          
          <div className="flex items-center gap-4">
            <Link to="/book" className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              Book a Consultation
            </Link>
            <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const BlogCard = ({ post, onClick }: { post: BlogFrontMatter; onClick: () => void }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const navigate = useNavigate();
  
  const handlePreviewClick = async () => {
    const fullPost = await loadMarkdownBlogPost(post.id);
    setPreviewPost(fullPost);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group cursor-pointer"
        onClick={handlePreviewClick}
      >
        <div className="bg-[#1C1C24] rounded-xl overflow-hidden hover:ring-1 hover:ring-primary/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300">
          <div className="p-4 pb-0">
            <div className="aspect-square w-40 mx-auto rounded-lg overflow-hidden mb-4">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-primary px-2 py-1 rounded-full bg-primary/10 font-medium">
                {post.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
              {post.description}
            </p>
          </div>
          <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-foreground/40">Read article</span>
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </motion.div>

      {previewPost && (
        <CustomDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <CustomDialogContent className="responsive-dialog max-w-2xl h-[80vh] overflow-y-auto">
            <div className="relative">
              <div className="sticky top-0 z-10 flex justify-between items-center bg-background/95 backdrop-blur-lg py-4 mb-6">
                <h2 className="text-xl font-semibold">{previewPost.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsPreviewOpen(false);
                      navigate(`/blog/${previewPost.id}`);
                    }}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Read full article
                  </button>
                </div>
              </div>
              
              <div className="max-w-sm mx-auto aspect-square rounded-xl overflow-hidden mb-6">
                <img 
                  src={previewPost.imageUrl} 
                  alt={previewPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="prose prose-invert max-w-none">
                {/* Show just a preview of the content - first few paragraphs */}
                <MarkdownRenderer 
                  content={previewPost.content.split('\n\n').slice(0, 3).join('\n\n')} 
                />
                <div className="text-center mt-6 pb-4">
                  <button
                    onClick={() => {
                      setIsPreviewOpen(false);
                      navigate(`/blog/${previewPost.id}`);
                    }}
                    className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    Continue Reading
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </CustomDialogContent>
        </CustomDialog>
      )}
    </>
  );
};

const BlogList = ({ posts }: { posts: BlogFrontMatter[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  
  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
    return ["All", ...uniqueCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white/5 text-foreground/70 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/blog/${post.id}`)}
          />
        ))}
      </div>
    </>
  );
};

const BlogMarkdown = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize sidebar state from localStorage, default to false
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      return savedState === 'true';
    }
    return false; // Always start closed by default
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Save sidebar state to localStorage when it changes
  const handleSidebarToggle = (newState: boolean) => {
    setIsSidebarOpen(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));
  };

  // Load blog posts on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      console.log('BlogMarkdown: Loading data...');
      try {
        // Only use markdown files for blog posts
        console.log('BlogMarkdown: Loading from markdown files...');
        const markdownPosts = await loadMarkdownBlogPosts();
        console.log('BlogMarkdown: Loaded posts:', markdownPosts.map(p => p.id));
        setPosts(markdownPosts);
        if (postId) {
          console.log(`BlogMarkdown: Attempting to load post ${postId} from markdown`);
          const markdownPost = await loadMarkdownBlogPost(postId);
          console.log(`BlogMarkdown: Post load result:`, markdownPost ? "Success" : "Not found", postId);
          setPost(markdownPost || null);
        }
      } catch (error) {
        console.error('BlogMarkdown: Error loading blog data:', error);
      } finally {
        setLoading(false);
        console.log('BlogMarkdown: Loading complete');
      }
    };
    loadData();
  }, [postId]);

  if (loading) {
    return (
      <>
        <Header />
        <section className="pt-32 pb-24 relative">
          <div className="container mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-white/5 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="pt-32 pb-24 relative">
        {!postId && (
          <Helmet>
            <title>Web Development Insights | Easywebs Blog</title>
            <meta name="description" content="Explore our collection of articles about web development, SEO, and digital presence to help your business grow online." />
            <link rel="canonical" href="https://www.easywebs.uk/blog" />
            
            {/* Open Graph Tags */}
            <meta property="og:title" content="Web Development Insights | Easywebs Blog" />
            <meta property="og:description" content="Explore our collection of articles about web development, SEO, and digital presence to help your business grow online." />
            <meta property="og:url" content="https://www.easywebs.uk/blog" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://www.easywebs.uk/og-image.jpg" />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Web Development Insights | Easywebs Blog" />
            <meta name="twitter:description" content="Explore our collection of articles about web development, SEO, and digital presence to help your business grow online." />
            <meta name="twitter:image" content="https://www.easywebs.uk/og-image.jpg" />
          </Helmet>
        )}
        
        <div className="container mx-auto">
          {!postId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
                Resources
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Web Development Insights
              </h2>
              <p className="text-lg text-foreground/80">
                Explore our collection of articles to better understand web development and digital presence
              </p>
            </motion.div>
          )}

          {postId && post ? (
            <BlogPostContent post={post} />
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </section>

      <button
        onClick={() => handleSidebarToggle(true)}
        className={cn(
          "fixed bg-background/95 backdrop-blur-lg p-3 rounded-l-xl border border-white/10 border-r-0 transition-all duration-300 flex items-center gap-2 hover:bg-white/5",
          "top-1/2 -translate-y-1/2 right-0", // Desktop positioning
          "max-sm:bottom-4 max-sm:right-4 max-sm:top-auto max-sm:translate-y-0 max-sm:rounded-full max-sm:border max-sm:shadow-lg", // Mobile positioning
          isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <Search className="w-4 h-4 text-foreground/70" />
        <span className="text-sm text-foreground/70 max-sm:hidden">Search</span>
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => handleSidebarToggle(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currentPostId={postId}
        posts={posts}
      />
    </>
  );
};

export default BlogMarkdown;
