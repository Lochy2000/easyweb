
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { ArrowRight, Sparkles, Code } from 'lucide-react';
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
        <div className="max-w-3xl z-10">
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Custom Web Development</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-balance opacity-0 animate-fade-in animate-delay-1">
            <span className="text-gradient">
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

        {/* Hero Visual - Updated with modern web tech showcase */}
        <div className="relative z-10">
          <div className="relative perspective-[1000px] md:ml-10 lg:ml-0 opacity-0 animate-fade-in animate-delay-4">
            {/* Main Content */}
            <div className="relative transform-style-3d">
              {/* Tech Showcase Window */}
              <div className="relative z-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-[#1a1921] to-[#121218] animate-float" style={{maxWidth: "600px"}}>
                {/* Window Header */}
                <div className="bg-[#131217] px-4 py-3 border-b border-white/10 flex items-center">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-white/60">
                      <code>easyweb</code>
                    </div>
                  </div>
                </div>
                
                {/* Code Editor Content */}
                <div className="p-6 relative h-[360px] overflow-hidden">
                  {/* Background code */}
                  <div className="opacity-30 animate-scroll-y">
                    <pre className="text-xs text-primary/80 font-mono leading-tight">
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
                    {/* "Easyweb" Logo Card */}
                    <div className="glass-card p-5 rounded-xl rotate-3 transform-gpu hover:rotate-0 transition-all duration-500 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="text-primary text-xl font-bold">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">easyweb</h3>
                          <p className="text-sm text-white/70">Custom web development</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Elements */}
                  <div className="absolute top-10 left-8 glass-card p-3 rounded-lg -rotate-2 transform-gpu shadow-lg opacity-80 animate-float-reverse" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20H8L18 10L14 6L4 16V20Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 6L18 10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="text-xs text-white">
                        <p className="font-medium">WordPress</p>
                        <p className="text-white/60 text-xs">Custom themes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-12 right-6 glass-card p-3 rounded-lg rotate-3 transform-gpu shadow-lg opacity-80 animate-float" style={{animationDelay: '0.5s'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent/20 text-accent rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-white">
                        <p className="font-medium">React</p>
                        <p className="text-white/60 text-xs">Modern apps</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-32 left-10 glass-card p-3 rounded-lg rotate-1 transform-gpu shadow-lg opacity-80 animate-float-reverse" style={{animationDelay: '1.5s'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 text-white rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="text-xs text-white">
                        <p className="font-medium">Wix</p>
                        <p className="text-white/60 text-xs">Custom solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow effect and other decorative elements */}
              <div className="absolute -inset-10 bg-primary/10 rounded-full filter blur-[80px] opacity-60 animate-pulse-slow -z-10"></div>
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
