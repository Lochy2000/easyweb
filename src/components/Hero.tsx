
import React from 'react';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <div className="inline-block mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            Modern Web Design Studio
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance opacity-0 animate-fade-in animate-delay-1">
            Simple & Scalable Websites, <span className="text-gradient">Tailored to You</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl text-balance opacity-0 animate-fade-in animate-delay-2">
            Explore our beautiful templates or book a free consultation today. We'll help you build a website that grows with your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animate-delay-3">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('templates')?.scrollIntoView({behavior: 'smooth'})}
              shine
            >
              Browse Templates
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('consultation')?.scrollIntoView({behavior: 'smooth'})}
            >
              Book a Consultation
            </Button>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative opacity-0 animate-fade-in animate-delay-4">
            {/* Main Image Frame */}
            <div className="relative z-10 glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/20 opacity-0 animate-scale-in animate-delay-4">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="EasyWebs Template Preview" 
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-medium mb-1 opacity-80">Premium Template</p>
                <h3 className="text-xl font-bold">Portfolio Pro</h3>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-lg rotate-12 animate-float"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-lg -rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
