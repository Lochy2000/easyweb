
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { ArrowRight, Sparkles, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const isMounted = useRef(true);
  const isMobile = useIsMobile();

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
    <section className="relative min-h-screen pt-16 md:pt-28 pb-12 md:pb-16 flex items-center overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/5 blur-[80px] md:blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-accent/10 blur-[60px] md:blur-[80px] animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Moving gradient background */}
        <div className="absolute -top-[200px] -left-[200px] w-[calc(100%+400px)] h-[calc(100%+400px)] opacity-20 animate-spin-slow pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"></div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <div className="container-custom relative grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-6 items-center">
        {/* Hero Content */}
        <div className="max-w-3xl z-10">
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Custom Web Development</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-balance opacity-0 animate-fade-in animate-delay-1">
            <span className="text-gradient">
              {displayText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-foreground/80 mb-5 md:mb-7 max-w-2xl text-balance opacity-0 animate-fade-in animate-delay-2">
            We create stunning websites tailored to your specific needs - whether it's WordPress, React, or Wix. We adapt our solutions to your business, not the other way around.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animate-delay-3">
            <Link to="/templates">
              <Button 
                variant="primary" 
                size={isMobile ? "sm" : "lg"} 
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
              size={isMobile ? "sm" : "lg"}
              onClick={() => window.open('https://calendly.com/your-booking-link', '_blank')}
              className="backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 w-full sm:w-auto"
            >
              Book a Consultation
            </Button>
          </div>
          
          {/* Client logos or trust badges - hidden on smallest screens */}
          <div className="mt-6 md:mt-10 hidden sm:block opacity-0 animate-fade-in animate-delay-5">
            <p className="text-sm text-foreground/60 mb-3">Trusted by forward-thinking businesses</p>
            <div className="flex flex-wrap gap-4 md:gap-6 items-center">
              <div className="h-5 md:h-7 w-16 md:w-20 bg-white/5 rounded-md"></div>
              <div className="h-5 md:h-7 w-14 md:w-18 bg-white/5 rounded-md"></div>
              <div className="h-5 md:h-7 w-18 md:w-24 bg-white/5 rounded-md"></div>
              <div className="h-5 md:h-7 w-16 md:w-20 bg-white/5 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Hero Visual - Technology Showcase */}
        <div className="relative z-10 mt-2 sm:mt-0 -mx-4 sm:mx-0">
          <div className="relative perspective-[1000px] md:ml-10 lg:ml-0 opacity-0 animate-fade-in animate-delay-4">
            {/* Main Content */}
            <div className="relative transform-style-3d">
              {/* Tech Showcase Window - Smaller on mobile */}
              <div className="relative z-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-[#1a1921] to-[#121218] animate-float scale-[0.85] sm:scale-100" style={{maxWidth: isMobile ? "100%" : "600px"}}>
                {/* Window Header */}
                <div className="bg-[#131217] px-2 sm:px-4 py-2 sm:py-3 border-b border-white/10 flex items-center">
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-white/60">
                      <code>easyweb</code>
                    </div>
                  </div>
                </div>
                
                {/* Code Editor Content - Adjust height for mobile */}
                <div className="p-3 sm:p-6 relative h-[220px] sm:h-[300px] md:h-[360px] overflow-hidden">
                  {/* Background code - Smaller text on mobile */}
                  <div className="opacity-30 animate-scroll-y">
                    <pre className="text-[8px] xs:text-[10px] sm:text-xs text-primary/80 font-mono leading-tight">
{`// Modern React Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-white"
        >
          Building <span className="text-indigo-500">beautiful</span> websites
        </motion.h1>
        
        <div className="mt-8 flex gap-4">
          <Button variant="primary">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

// WordPress Theme Development
function easyweb_enqueue_styles() {
  wp_enqueue_style(
    'easyweb-main', 
    get_template_directory_uri() . '/assets/css/main.css'
  );
}
add_action('wp_enqueue_scripts', 'easyweb_enqueue_styles');

// Wix Custom Code Solution
$w.onReady(function () {
  $w('#contactButton').onClick(() => {
    $w('#contactForm').show();
  });
});

// Custom API Integration
async function fetchData() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`}</pre>
                  </div>
                  
                  {/* Centered Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* "Easyweb" Logo Card - Smaller on mobile */}
                    <div className="glass-card p-2 sm:p-5 rounded-xl rotate-3 transform-gpu hover:rotate-0 transition-all duration-500 backdrop-blur-md">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="text-primary text-base sm:text-xl font-bold">
                            <svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-2xl font-bold text-white">easyweb</h3>
                          <p className="text-[10px] sm:text-sm text-white/70">Custom web development</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Elements - Adjusted for mobile */}
                  <div className="absolute top-8 sm:top-10 left-4 sm:left-8 glass-card p-1.5 sm:p-3 rounded-lg -rotate-2 transform-gpu shadow-lg opacity-80 animate-float-reverse scale-75 sm:scale-100" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 sm:w-8 h-5 sm:h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                        <svg className="w-2.5 sm:w-4 h-2.5 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20H8L18 10L14 6L4 16V20Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 6L18 10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="text-[8px] xs:text-[10px] sm:text-xs text-white">
                        <p className="font-medium">WordPress</p>
                        <p className="text-white/60 text-[6px] xs:text-[8px] sm:text-xs">Custom themes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 sm:bottom-12 right-3 sm:right-6 glass-card p-1.5 sm:p-3 rounded-lg rotate-3 transform-gpu shadow-lg opacity-80 animate-float scale-75 sm:scale-100" style={{animationDelay: '0.5s'}}>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 sm:w-8 h-5 sm:h-8 bg-accent/20 text-accent rounded-lg flex items-center justify-center">
                        <Code className="w-2.5 sm:w-4 h-2.5 sm:h-4" />
                      </div>
                      <div className="text-[8px] xs:text-[10px] sm:text-xs text-white">
                        <p className="font-medium">React</p>
                        <p className="text-white/60 text-[6px] xs:text-[8px] sm:text-xs">Modern apps</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-24 sm:bottom-32 left-6 sm:left-10 glass-card p-1.5 sm:p-3 rounded-lg rotate-1 transform-gpu shadow-lg opacity-80 animate-float-reverse scale-75 sm:scale-100" style={{animationDelay: '1.5s'}}>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 sm:w-8 h-5 sm:h-8 bg-white/10 text-white rounded-lg flex items-center justify-center">
                        <svg className="w-2.5 sm:w-4 h-2.5 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="text-[8px] xs:text-[10px] sm:text-xs text-white">
                        <p className="font-medium">Wix</p>
                        <p className="text-white/60 text-[6px] xs:text-[8px] sm:text-xs">Custom solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow effect and other decorative elements */}
              <div className="absolute -inset-6 sm:-inset-10 bg-primary/10 rounded-full filter blur-[50px] sm:blur-[80px] opacity-60 animate-pulse-slow -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Hidden on small screens */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in animate-delay-8 hidden sm:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs sm:text-sm text-foreground/60">Scroll to explore</span>
          <div className="w-0.5 h-8 sm:h-10 bg-gradient-to-b from-foreground/0 via-foreground/30 to-foreground/0">
            <div className="w-full h-3 sm:h-4 bg-foreground/60 animate-move-down"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
