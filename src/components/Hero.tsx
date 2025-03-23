
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const isMounted = useRef(true);

  const headlines = [
    'Web Design Crafted for Your Vision',
    'WordPress Websites That Convert',
    'React & Tailwind Development',
    'Custom Wix Solutions',
    'Websites Built Around Your Needs'
  ];

  useEffect(() => {
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      if (!isMounted.current) return;

      const currentPhrase = headlines[loopNum % headlines.length];
      const shouldDelete = isDeleting;
      const shouldComplete = !isDeleting && displayText === currentPhrase;
      const shouldStartDeleting = shouldComplete && !isDeleting;
      const shouldStartNewPhrase = isDeleting && displayText === '';

      if (shouldStartNewPhrase) {
        setIsDeleting(false);
        setLoopNum(l => l + 1);
        setTypingSpeed(150);
        return;
      }

      if (shouldStartDeleting) {
        // Pause before starting to delete
        setTimeout(() => {
          if (isMounted.current) setIsDeleting(true);
        }, 1500);
        return;
      }

      if (shouldDelete) {
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, headlines]);

  return (
    <section className="relative min-h-screen pt-32 pb-16 flex items-center overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[80px] animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Moving gradient background */}
        <div className="absolute -top-[200px] -left-[200px] w-[calc(100%+400px)] h-[calc(100%+400px)] opacity-20 animate-spin-slow pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"></div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Custom Web Development</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-balance opacity-0 animate-fade-in animate-delay-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
              {displayText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl text-balance opacity-0 animate-fade-in animate-delay-2">
            We create stunning websites tailored to your specific needs - whether it's WordPress, React, or Wix. We adapt our solutions to your business, not the other way around.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animate-delay-3">
            <Link to="/templates">
              <Button 
                variant="primary" 
                size="lg" 
                shine
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Browse Templates
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://calendly.com/your-booking-link', '_blank')}
              className="backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 w-full sm:w-auto"
            >
              Book a Consultation
            </Button>
          </div>
          
          {/* Client logos or trust badges */}
          <div className="mt-12 opacity-0 animate-fade-in animate-delay-5">
            <p className="text-sm text-foreground/60 mb-4">Trusted by forward-thinking businesses</p>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="h-8 w-24 bg-white/5 rounded-md"></div>
              <div className="h-8 w-20 bg-white/5 rounded-md"></div>
              <div className="h-8 w-28 bg-white/5 rounded-md"></div>
              <div className="h-8 w-22 bg-white/5 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative opacity-0 animate-fade-in animate-delay-4">
            {/* 3D Mockup */}
            <div className="relative">
              <img 
                src="/lovable-uploads/fd3c2b52-1483-427d-af73-ec691509c0b9.png" 
                alt="Website mockup on laptop" 
                className="relative z-10 opacity-0 animate-scale-in animate-delay-4 max-w-full"
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-10 bg-primary/20 rounded-full filter blur-[80px] opacity-60 animate-pulse-slow"></div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 right-12 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 animate-fade-in animate-delay-6 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Custom WordPress</p>
                    <p className="text-xs text-foreground/70">Tailored themes & plugins</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 -left-14 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 animate-fade-in animate-delay-7 animate-float-reverse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">React Development</p>
                    <p className="text-xs text-foreground/70">Modern & scalable applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in animate-delay-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-foreground/60">Scroll to explore</span>
          <div className="w-0.5 h-10 bg-gradient-to-b from-foreground/0 via-foreground/30 to-foreground/0">
            <div className="w-full h-4 bg-foreground/60 animate-move-down"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
