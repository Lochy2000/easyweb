import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { LampContainer } from "./ui/lamp";
import { GooeyText } from "./ui/gooey-text-morphing";
import { SplashCursor } from "./ui/splash-cursor";

const Hero = () => {
  const [showSplash, setShowSplash] = useState(true);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Handle splash cursor visibility
    const handleScroll = () => {
      const heroSection = heroRef.current;
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setShowSplash(rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col pt-16 sm:pt-20 hero-section"
    >
      {/* Splash Cursor - only in hero section */}
      {showSplash && <SplashCursor />}

      {/* Digital Innovation Partners Badge - RESPONSIVE positioning behind the lamp */}
      <div 
        className="digital-badge-responsive"
        style={{
          position: 'absolute',
          top: '100px', // Responsive via CSS
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: 'fit-content'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 py-2 px-3 sm:px-4 rounded-full glass-card-enhanced">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan" />
            <span className="text-accent-cyan text-sm sm:text-base font-medium">Digital Innovation Partners</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Container with lamp spotlight effect */}
      <div className="relative flex-1 flex flex-col">
        <LampContainer className="bg-transparent">
          {/* Logo positioned in the bright spotlight area */}
          <motion.div
            className="flex items-center justify-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.img 
              src="/easyweb-logo.png" 
              alt="Easywebs Logo" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain"
              animate={{ 
                opacity: [0.7, 1, 0.8, 1],
                scale: [0.98, 1, 0.99, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Content positioned below the spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-center max-w-6xl mx-auto px-4 flex flex-col items-center justify-center w-full"
            style={{ opacity }}
          >
            {/* Main Heading with Gooey Text */}
            <motion.div 
              className="flex items-center justify-center w-full mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.0,
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <GooeyText
                texts={["Innovate.", "Create.", "Build.", "Elevate."]}
                morphTime={2}
                cooldownTime={1.5}
                className="text-center w-full"
                textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-cyan-fixed leading-tight"
              />
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto text-center px-2 mb-8 sm:mb-10 md:mb-12"
            >
              We craft bespoke digital experiences that drive growth and define the future of your brand.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none"
            >
              <Link
                to="/templates"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto sm:min-w-[200px] rounded-xl font-semibold text-white overflow-hidden text-center transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary to-accent-pink transition-all duration-500 group-hover:blur-md group-hover:opacity-80"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary to-accent-pink"></span>
                <span className="absolute inset-[1px] rounded-[11px] bg-card/90 transition-opacity duration-500 group-hover:opacity-70"></span>
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg">
                  Explore Our Work
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/book"
                className="px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto rounded-xl font-semibold text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/10 transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base md:text-lg"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </LampContainer>
      </div>

      {/* Scroll Indicator - Positioned at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-accent-cyan/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 sm:w-1 h-2 sm:h-3 bg-accent-cyan/60 rounded-full mt-1 sm:mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-pink/5 via-transparent to-primary/5" />
      </div>
    </section>
  );
};

export default Hero;
