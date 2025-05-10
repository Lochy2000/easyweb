import React, { useState } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import TemplateDemo, { Template } from './TemplateDemo';

// Import legacy template components
import {
  RestaurantDemo,
  FitnessDemo,
  RealEstateDemo,
  CreativeAgencyDemo,
  ELearningDemo,
  PersonalPortfolioDemo,
  TradeDemo,
  PhotographyDemo,
  StreetWearDemo
} from './legacy-templates';

// Template data
// TODO: Replace placeholder Unsplash images with actual template preview images.
//       Create optimized images (e.g., WebP) and place them in the public directory.
//       Update the 'image' paths below accordingly.
const templates = [
  // Original HTML-based templates
  {
    id: 1,
    title: "Portfolio Pro",
    category: "portfolio",
    image: "https://plus.unsplash.com/premium_vector-1682307855136-994be304e0d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydGZvbGlvfGVufDB8fDB8fHww",
    description: "Perfect for creatives and professionals showcasing their work.",
    demoUrl: "/templates/portfolio-pro.html",
    type: "html"
  },
  {
    id: 2,
    title: "Business Plus",
    category: "business",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "Professional layout designed for small to medium businesses.",
    demoUrl: "/templates/business-plus.html",
    type: "html"
  },
  {
    id: 3,
    title: "Shop Simple",
    category: "ecommerce",
    image: "https://plus.unsplash.com/premium_photo-1743893928142-71734f005813?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2ltcGxlJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Clean e-commerce template with optimized product layouts.",
    demoUrl: "/templates/shop-simple.html",
    type: "html"
  },
  {
    id: 4,
    title: "Agency Edge",
    category: "business",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "Modern and bold design for forward-thinking agencies.",
    demoUrl: "/templates/agency-edge.html",
    type: "html"
  },
  {
    id: 5,
    title: "Minimal Blog",
    category: "blog",
    image: "https://plus.unsplash.com/premium_vector-1725441325643-967e1f639948?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHlwZSUyMHdyaXRlcnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Elegant and focused layout for bloggers and writers.",
    demoUrl: "/templates/minimal-blog.html",
    type: "html"
  },
  {
    id: 6,
    title: "Landing Launch",
    category: "landing",
    image: "https://plus.unsplash.com/premium_vector-1721841639925-763c14b08942?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGxhdW5jaCUyMHBhZ2V8ZW58MHx8MHx8fDA%3D",
    description: "High-conversion landing page template for products and services.",
    demoUrl: "/templates/landing-launch.html",
    type: "html"
  },  
  {
    id: 7,
    title: "Modern Portfolio",
    category: "portfolio",
    image: "https://plus.unsplash.com/premium_vector-1730996526020-38f8b2c9e4e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwcG9ydGZvbGlvfGVufDB8fDB8fHww",
    description: "A clean design focusing on simplicity and gettng to the point.",
    demoUrl: "/templates/modern-portfolio.html",
    type: "html"
  },
  {
    id: 8,
    title: "Agency Portfolio",
    category: "portfolio",
    image: "https://plus.unsplash.com/premium_vector-1732319936889-bd5807d52bab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWdlbmN5JTIwcG9ydGZvbGlvJTIwZGlnaXRhbGx5fGVufDB8fDB8fHww",
    description: "A clean design focusing on simplicity and gettng to the point.",
    demoUrl: "/templates/agency-website.html",
    type: "html"
  },
  {
    id: 9,
    title: "Product Showcase",
    category: "portfolio",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    description: "A clean design focusing on simplicity and gettng to the point.",
    demoUrl: "/templates/product-showcase.html",
    type: "html"
  },
  
  // Legacy React-based templates
  {
    id: 10,
    title: "Fine Dining Restaurant",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1676471932681-45fa972d848a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZpbmUlMjBkaW5uaW5nfGVufDB8fDB8fHww",
    description: "Elegant template for upscale restaurants and dining establishments.",
    component: RestaurantDemo,
    type: "react"
  },
  {
    id: 11,
    title: "Fitness & Wellness",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww",
    description: "Dynamic template for gyms, fitness centers, and wellness businesses.",
    component: FitnessDemo,
    type: "react"
  },
  {
    id: 12,
    title: "Real Estate",
    category: "real-estate",
    image: "https://images.unsplash.com/vector-1745659433101-28ad4f096114?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlYWxlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    description: "Professional template for real estate agencies and property listings.",
    component: RealEstateDemo,
    type: "react"
  },
  {
    id: 13,
    title: "Creative Agency",
    category: "agency",
    image: "/assets/images/demo/democards/creativeagency.avif",
    description: "Bold template for creative agencies and digital studios.",
    component: CreativeAgencyDemo,
    type: "react"
  },
  {
    id: 14,
    title: "E-Learning Platform",
    category: "education",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGUlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    description: "Interactive template for educational websites and online courses.",
    component: ELearningDemo,
    type: "react"
  },
  {
    id: 15,
    title: "Personal Portfolio",
    category: "portfolio",
    image: "https://plus.unsplash.com/premium_vector-1682305378650-373ea23d6d85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uYWx8ZW58MHx8MHx8fDA%3D",
    description: "Showcase your work and skills with this elegant portfolio template.",
    component: PersonalPortfolioDemo,
    type: "react"
  },
  {
    id: 16,
    title: "Maintenance & Trade",
    category: "business",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZHklMjBtYW58ZW58MHx8MHx8fDA%3D",
    description: "Robust template for construction, trades, and home service businesses.",
    component: TradeDemo,
    type: "react"
  },
  {
    id: 17,
    title: "Photography Portfolio",
    category: "portfolio",
    image: "https://plus.unsplash.com/premium_vector-1726129197123-1ca17b767e26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG9ncmFwaGVyfGVufDB8fDB8fHww",
    description: "Visual-focused template for photographers and visual artists.",
    component: PhotographyDemo,
    type: "react"
  },
  {
    id: 18,
    title: "Streetwear Fashion",
    category: "ecommerce",
    image: "/assets/images/demo/democards/fashion.png",
    description: "Trendy template for fashion brands and clothing stores.",
    component: StreetWearDemo,
    type: "react"
  },
];

// Filter categories
const categories = [
  { id: "all", label: "All Templates" },
  { id: "portfolio", label: "Portfolio" },
  { id: "business", label: "Business" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "blog", label: "Blog" },
  { id: "landing", label: "Landing Page" },
  { id: "restaurant", label: "Restaurant" },
  { id: "fitness", label: "Fitness" },
  { id: "real-estate", label: "Real Estate" },
  { id: "agency", label: "Agency" },
  { id: "education", label: "Education" }
];

const TemplateGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const navigate = useNavigate();

  const filteredTemplates = activeCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const handleViewDemo = (template: Template) => {
    setSelectedTemplate(template);
    // Only set loading for HTML templates, not React templates
    if (template.type === 'html') {
      setDemoLoading(true);
    }
    setDemoOpen(true);
  };

  const handleCloseDemoModal = () => {
    setDemoOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setSelectedTemplate(null);
      setDemoLoading(false);
    }, 300);
  };

  return (
    <section id="templates" className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-80 -right-80 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-40 -left-60 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px]"></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]"></div>
      </div>
      
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            Beautiful Templates
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in animate-delay-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Find the Perfect Starting Point
          </h2>
          <p className="text-lg text-foreground/80 opacity-0 animate-fade-in animate-delay-2">
            Browse our hand-crafted templates designed for various needs. Each template is fully responsive and customizable to your brand.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 opacity-0 animate-fade-in animate-delay-3">
          {categories.map(category => (
            <button
              key={category.id}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-foreground/70 hover:text-foreground"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <div 
              key={template.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={template.image} 
                    alt={`${template.title} - ${template.description} template preview`} 
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700",
                      hoveredTemplate === template.id ? "scale-105" : "scale-100"
                    )}
                    width={600}
                    height={450}
                    loading="lazy"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-center justify-center opacity-0 transition-opacity duration-300",
                    hoveredTemplate === template.id && "opacity-100"
                  )}>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
                        icon={<ExternalLink className="w-4 h-4" />}
                        onClick={() => handleViewDemo(template)}
                      >
                        View Demo
                      </Button>
                      <Button 
                        variant="gradient"
                        onClick={() => window.open(template.demoUrl, '_blank')}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{template.title}</h3>
                  <p className="text-foreground/70 mb-4 flex-grow">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {categories.find(c => c.id === template.category)?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center mt-12 opacity-0 animate-fade-in animate-delay-8">
          <Button 
            variant="gradient"
            size="lg" 
            onClick={() => {
              navigate('/templates');
            }}
          >
            See All Templates
          </Button>
        </div>
      </div>

      {/* Template Demo Modal */}
      <TemplateDemo
        isOpen={demoOpen}
        onClose={handleCloseDemoModal}
        template={selectedTemplate}
        setLoading={setDemoLoading}
      />

      {/* Background blur overlay when demo is open */}
      {demoOpen && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40"
          onClick={handleCloseDemoModal}
        />
      )}
    </section>
  );
};

export default TemplateGallery;
