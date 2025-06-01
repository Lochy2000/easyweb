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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-0"
    >
      {/* Splash Cursor - only in hero section */}
      {showSplash && <SplashCursor />}

      {/* Digital Innovation Partners Badge - Responsive positioning */}
      <div className="absolute top-20 sm:top-24 left-0 right-0 flex justify-center z-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 py-2 px-3 sm:px-4 rounded-full glass-card">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan" />
            <span className="text-accent-cyan text-sm sm:text-base md:text-lg font-medium">Digital Innovation Partners</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content with Lamp Effect */}
      <div className="relative w-full h-full flex items-center justify-center">
        <LampContainer className="bg-transparent">
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
            {/* Logo emerging from lamp with subtle flicker */}
            <motion.div
              className="flex items-center justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
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
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
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
            {/* Main Heading with Gooey Text - With proper entrance animation */}
            <motion.div 
              className="flex items-center justify-center mt-0 mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full"
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
                textClassName="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-pink leading-tight"
              />
            </motion.div>
            
            {/* Subtitle - Reduced spacing for better flow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-4xl mx-auto text-center px-2"
            >
              We craft bespoke digital experiences that drive growth and define the future of your brand.
            </motion.p>

            {/* CTA Buttons - Responsive layout and sizing */}
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
                <span className="relative z-10 flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl">
                  Explore Our Work
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/book"
                className="px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto rounded-xl font-semibold text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/10 transition-all duration-300 hover:scale-105 text-center text-base sm:text-lg md:text-xl"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </LampContainer>
      </div>
      {/* Scroll Indicator - Responsive positioning and sizing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-40"
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

      {/* Enhanced Background Effects - Responsive gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-pink/5 via-transparent to-primary/5" />
      </div>
    </section>
  );
};

export default Hero;