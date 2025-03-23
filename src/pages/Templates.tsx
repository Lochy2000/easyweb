
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import TemplateGallery from '@/components/TemplateGallery';
import Footer from '@/components/Footer';

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
        
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
