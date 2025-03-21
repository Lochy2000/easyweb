
import React, { useState } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';

// Template data
const templates = [
  {
    id: 1,
    title: "Portfolio Pro",
    category: "portfolio",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Perfect for creatives and professionals showcasing their work."
  },
  {
    id: 2,
    title: "Business Plus",
    category: "business",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "Professional layout designed for small to medium businesses."
  },
  {
    id: 3,
    title: "Shop Simple",
    category: "ecommerce",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "Clean e-commerce template with optimized product layouts."
  },
  {
    id: 4,
    title: "Agency Edge",
    category: "business",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "Modern and bold design for forward-thinking agencies."
  },
  {
    id: 5,
    title: "Minimal Blog",
    category: "blog",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "Elegant and focused layout for bloggers and writers."
  },
  {
    id: 6,
    title: "Landing Launch",
    category: "landing",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "High-conversion landing page template for products and services."
  }
];

// Filter categories
const categories = [
  { id: "all", label: "All Templates" },
  { id: "portfolio", label: "Portfolio" },
  { id: "business", label: "Business" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "blog", label: "Blog" },
  { id: "landing", label: "Landing Page" }
];

const TemplateGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  const filteredTemplates = activeCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <section id="templates" className="section bg-secondary/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            Beautiful Templates
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in animate-delay-1">
            Find the Perfect Starting Point
          </h2>
          <p className="text-lg text-foreground/70 opacity-0 animate-fade-in animate-delay-2">
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
                  : "bg-white hover:bg-white/80 text-foreground/70 hover:text-foreground"
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
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={template.image} 
                    alt={template.title} 
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700",
                      hoveredTemplate === template.id ? "scale-105" : "scale-100"
                    )}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300",
                    hoveredTemplate === template.id && "opacity-100"
                  )}>
                    <div className="flex gap-3">
                      <Button variant="outline" className="bg-white text-foreground hover:bg-white/90">View Demo</Button>
                      <Button>Get Started</Button>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{template.title}</h3>
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
          <Button variant="outline" size="lg">
            See All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;
