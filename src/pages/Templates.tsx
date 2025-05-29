
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TemplateGallery from '@/components/TemplateGallery';
import Footer from '@/components/Footer';
import { MarqueeText } from '@/components/MarqueeText';

const Templates = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.animate-on-scroll');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('opacity-100');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Website Templates | Easywebs</title>
        <meta name="description" content="Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand." />
        <link rel="canonical" href="https://www.easywebs.uk/templates" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Website Templates | Easywebs" />
        <meta property="og:description" content="Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand." />
        <meta property="og:url" content="https://www.easywebs.uk/templates" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.easywebs.uk/templates-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Website Templates | Easywebs" />
        <meta name="twitter:description" content="Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand." />
        <meta name="twitter:image" content="https://www.easywebs.uk/templates-og.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Website Templates | Easywebs",
            "description": "Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand.",
            "url": "https://www.easywebs.uk/templates",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Portfolio Pro",
                  "description": "A professional portfolio template for creatives",
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Product",
                  "name": "Business Plus",
                  "description": "A comprehensive template for businesses",
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="pt-32">
        {/* Hero Section for Templates */}
        <section className="py-12 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Browse Our Templates</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Explore our collection of hand-crafted templates designed for various needs.
              Each template is fully responsive and customizable to your brand.
            </p>
          </div>
        </section>
        
        <MarqueeText />
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
