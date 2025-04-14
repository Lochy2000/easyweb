import React, { useState, useMemo, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Search,
  Globe,
  ArrowRight,
  ChevronRight,
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { cn } from "@/lib/utils";
import { generateCloudinaryUrl, IMAGE_SIZES } from '@/lib/cloudinary';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: "understanding-website-hosting",
    title: "Understanding Website Hosting",
    description: "Learn the basics of web hosting and why it's crucial for your online presence.",
    category: "Getting Started",
    imageUrl: generateCloudinaryUrl("hosting_iipawi", IMAGE_SIZES.blogHero),
    content: {
      introduction: "Website hosting is like finding a home for your website on the internet. It's a service that allows your website to be accessible to people around the world 24/7.",
      sections: [
        {
          title: "What is Web Hosting?",
          content: "Web hosting provides the technology and services needed to make your website visible on the internet. When you build a website, you need to store all its files somewhere – that's what a web host does."
        },
        {
          title: "Types of Hosting",
          content: "There are several types of hosting available: Shared Hosting (most economical, good for small websites), VPS Hosting (more resources and control), Dedicated Hosting (entire server for your site), and Cloud Hosting (scalable and reliable)."
        },
        {
          title: "Why Quality Hosting Matters",
          content: "Good hosting ensures your website loads quickly, stays secure, and remains accessible. Poor hosting can lead to slow loading times, security vulnerabilities, and frequent downtime – all of which can hurt your business."
        }
      ],
      conclusion: "Choosing the right hosting solution is crucial for your website's success. We help you select and set up the perfect hosting environment for your specific needs."
    }
  },
  {
    id: "importance-of-mobile-responsiveness",
    title: "The Importance of Mobile Responsiveness",
    description: "Discover why your website needs to work flawlessly on all devices.",
    category: "Best Practices",
    imageUrl: generateCloudinaryUrl("mobile_friendly_zihxvu", IMAGE_SIZES.blogHero),
    content: {
      introduction: "In today's mobile-first world, having a responsive website isn't just nice to have – it's essential. More than half of all web traffic comes from mobile devices.",
      sections: [
        {
          title: "What is Mobile Responsiveness?",
          content: "Mobile responsiveness means your website automatically adjusts its layout and content to provide an optimal viewing experience across all devices – from desktop computers to smartphones and tablets."
        },
        {
          title: "Why It Matters",
          content: "Google prioritizes mobile-friendly websites in search results. Plus, users are 5 times more likely to leave a site that isn't mobile-friendly. A responsive design ensures you don't lose valuable visitors."
        },
        {
          title: "Key Features",
          content: "Responsive websites include flexible images, fluid grids, and media queries. Text remains readable without zooming, buttons are easily clickable, and navigation is intuitive regardless of device."
        }
      ],
      conclusion: "We ensure every website we build is fully responsive, providing an excellent user experience across all devices and screen sizes."
    }
  },
  {
    id: "seo-basics-for-small-businesses",
    title: "SEO Basics for Small Businesses",
    description: "Essential SEO concepts to help your website rank better in search results.",
    category: "Marketing",
    imageUrl: generateCloudinaryUrl("seo_su09ig", IMAGE_SIZES.blogHero),
    content: {
      introduction: "Search Engine Optimization (SEO) helps your website appear higher in search results when people look for products or services like yours.",
      sections: [
        {
          title: "What is SEO?",
          content: "SEO is the practice of optimizing your website to increase its visibility in search engines like Google. Better visibility means more potential customers finding your business."
        },
        {
          title: "Key SEO Elements",
          content: "Essential SEO elements include quality content, relevant keywords, fast loading speeds, mobile-friendliness, and secure hosting (HTTPS). Local SEO is particularly important for small businesses."
        },
        {
          title: "Common Mistakes",
          content: "Avoid keyword stuffing, duplicate content, and poor-quality backlinks. Focus on creating valuable content that answers your audience's questions and solves their problems."
        }
      ],
      conclusion: "We implement SEO best practices in every website we build, giving you a strong foundation for online visibility and growth."
    }
  },
  {
    id: "custom-vs-template-websites",
    title: "Custom vs. Template Websites",
    description: "Compare the benefits of custom-built websites with template-based solutions.",
    category: "Getting Started",
    imageUrl: generateCloudinaryUrl("custom_vs_templates_omxx2a", IMAGE_SIZES.blogHero),
    content: {
      introduction: "Choosing between a custom website and a template-based solution is a crucial decision that affects your online presence, budget, and long-term flexibility.",
      sections: [
        {
          title: "Template Websites",
          content: "Templates offer quick setup, lower initial costs, and predictable designs. They're great for simple websites but can be limiting if you need unique features or integrations."
        },
        {
          title: "Custom Websites",
          content: "Custom websites are built specifically for your needs, offering unlimited flexibility, better performance, and unique designs. They cost more initially but provide better long-term value."
        },
        {
          title: "Making the Choice",
          content: "Consider your budget, timeline, required features, and long-term goals. Custom development is often better for businesses needing specific functionality or planning significant growth."
        }
      ],
      conclusion: "We can help you decide which approach best suits your needs and budget, ensuring you get the most value from your investment."
    }
  },
  {
    id: "maintaining-your-website-post-launch",
    title: "Maintaining Your Website Post-Launch",
    description: "Essential tips for keeping your website secure, updated, and performing well.",
    category: "Best Practices",
    imageUrl: generateCloudinaryUrl("webmaintenance_aas7k1", IMAGE_SIZES.blogHero),
    content: {
      introduction: "A website is not a 'set it and forget it' asset. Regular maintenance is crucial for security, performance, and keeping your content fresh and relevant.",
      sections: [
        {
          title: "Regular Updates",
          content: "Keep your content management system, plugins, and themes updated to patch security vulnerabilities and ensure compatibility with new technologies."
        },
        {
          title: "Security Measures",
          content: "Implement SSL certificates, regular backups, security plugins, and strong passwords. Monitor for suspicious activity and keep your hosting environment secure."
        },
        {
          title: "Performance Optimization",
          content: "Regularly check loading speeds, optimize images, clean up databases, and monitor website analytics to identify and fix performance issues."
        }
      ],
      conclusion: "We offer maintenance packages to keep your website secure, up-to-date, and performing optimally, letting you focus on your business."
    }
  }
];

const categories = ["All", "Getting Started", "Best Practices", "Marketing"];

const SIDEBAR_STATE_KEY = 'blog-sidebar-state';

const Sidebar = ({ 
  isOpen, 
  onClose,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  currentPostId
}: { 
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  currentPostId?: string;
}) => {
  const navigate = useNavigate();
  
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={cn(
      "fixed top-0 right-0 w-80 h-full bg-background/95 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 ease-in-out z-40 pt-24",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <button
        onClick={onClose}
        className="absolute top-28 -left-12 bg-background/95 backdrop-blur-lg p-3 rounded-l-xl border border-white/10 border-r-0"
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

const BlogPostContent = ({ post }: { post: BlogPost }) => (
  <article className="max-w-4xl mx-auto px-4">
    <div className="max-w-sm mx-auto mb-8">
      <div className="aspect-square w-full rounded-2xl overflow-hidden">
        <img 
          src={generateCloudinaryUrl(post.imageUrl.split('/').pop()?.split('.')[0] || '', IMAGE_SIZES.blogHero)} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
      {post.category}
    </div>
    <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
    <p className="text-xl text-foreground/80 mb-8">{post.content.introduction}</p>
    
    {post.content.sections.map((section, index) => (
      <div key={index} className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">{section.title}</h2>
        <p className="text-foreground/70 leading-relaxed">{section.content}</p>
      </div>
    ))}
    
    <div className="pt-8 border-t border-white/10">
      <p className="text-lg text-foreground/80 italic">{post.content.conclusion}</p>
    </div>
  </article>
);

const BlogCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();
  
  const cardImageUrl = useMemo(() => {
    const publicId = post.imageUrl.split('/').pop()?.split('.')[0];
    return publicId ? generateCloudinaryUrl(publicId, IMAGE_SIZES.blogCard) : post.imageUrl;
  }, [post.imageUrl]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group cursor-pointer"
        onClick={() => setIsPreviewOpen(true)}
      >
        <div className="bg-[#1C1C24] rounded-xl overflow-hidden hover:ring-1 hover:ring-white/10 transition-all">
          <div className="aspect-square w-full overflow-hidden">
            <img 
              src={cardImageUrl} 
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-primary px-2 py-1 rounded-full bg-primary/10">
                {post.category}
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-sm text-foreground/60 line-clamp-2">{post.description}</p>
          </div>
        </div>
      </motion.div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl h-[80vh] overflow-y-auto">
          <div className="relative">
            <div className="sticky top-0 z-10 flex justify-between items-center bg-background/95 backdrop-blur-lg py-4 mb-6">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsPreviewOpen(false);
                    navigate(`/blog/${post.id}`);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Read full article
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="max-w-sm mx-auto aspect-square rounded-xl overflow-hidden mb-6">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">{post.content.introduction}</p>
              
              {post.content.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
              
              <p className="text-foreground/80 italic mt-8">{post.content.conclusion}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

const Blog = () => {
  const { postId } = useParams();
  const post = postId ? blogPosts.find(p => p.id === postId) : null;
  
  // Initialize sidebar state from localStorage, default to true if viewing an article
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      return savedState === 'true';
    }
    return !!postId; // Open by default if viewing an article
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Save sidebar state to localStorage when it changes
  const handleSidebarToggle = (newState: boolean) => {
    setIsSidebarOpen(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));
  };

  // Open sidebar when navigating to an article
  useEffect(() => {
    if (postId && !isSidebarOpen) {
      handleSidebarToggle(true);
    }
  }, [postId]);

  return (
    <>
      <Header />
      <section className="pt-32 pb-24 relative">
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
            <BlogList />
          )}
        </div>
      </section>

      <button
        onClick={() => handleSidebarToggle(true)}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 right-0 bg-background/95 backdrop-blur-lg p-3 rounded-l-xl border border-white/10 border-r-0 transition-opacity duration-300",
          isSidebarOpen ? "opacity-0" : "opacity-100"
        )}
      >
        <ChevronRight className="w-5 h-5 text-foreground/70" />
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => handleSidebarToggle(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currentPostId={postId}
      />
    </>
  );
};

export default Blog; 