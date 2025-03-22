
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { ArrowRight, Globe } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const isMounted = useRef(true);

  const headlines = [
    'Simple & Scalable Websites, Tailored to You',
    'Beautiful WordPress Sites for Small Businesses',
    'Custom React & Tailwind Solutions',
    'Professional Wix Development',
    'Modern Web Design, Built to Convert'
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
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            <Globe className="w-4 h-4" />
            <span>Web Design Studio</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance opacity-0 animate-fade-in animate-delay-1 min-h-[120px] md:min-h-[180px]">
            <span className="text-gradient">{displayText}</span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl text-balance opacity-0 animate-fade-in animate-delay-2">
            Explore our templates or book a free consultation today. We build beautiful, easy-to-use websites that grow with your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animate-delay-3">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('templates')?.scrollIntoView({behavior: 'smooth'})}
              shine
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
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

        {/* Hero Visual - Website Preview */}
        <div className="relative flex items-center justify-center">
          <div className="relative opacity-0 animate-fade-in animate-delay-4">
            {/* Website Preview Frame */}
            <div className="relative z-10 glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/20 opacity-0 animate-scale-in animate-delay-4">
              <div className="bg-secondary/80 p-3 border-b border-white/10 flex items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <div className="mx-auto text-sm text-white/60">Website Preview</div>
              </div>
              <div className="bg-background/90 p-4 h-[300px] overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-2 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-white">YourBrand</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-12 h-2 rounded-full bg-white/10"></div>
                      <div className="w-12 h-2 rounded-full bg-white/10"></div>
                      <div className="w-12 h-2 rounded-full bg-white/10"></div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="h-6 w-full bg-primary/10 rounded"></div>
                      <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                      <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded"></div>
                      <div className="h-8 w-28 bg-primary/20 rounded mt-4"></div>
                    </div>
                    <div className="h-full bg-white/5 rounded flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-primary/80" />
                      </div>
                    </div>
                  </div>
                </div>
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
