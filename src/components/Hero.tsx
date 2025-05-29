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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Splash Cursor - only in hero section */}
      {showSplash && <SplashCursor />}

      {/* Digital Innovation Partners Badge - Above everything */}
      <div className="absolute top-24 left-0 right-0 flex justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass-card">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-accent-cyan text-sm font-medium">Digital Innovation Partners</span>
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
            className="text-center max-w-6xl mx-auto px-4 flex flex-col items-center justify-center"
            style={{ opacity }}
          >
            {/* Main Heading with Gooey Text - Perfectly centered under lamp */}
            <div className="mb-12 flex items-center justify-center">
              <GooeyText
                texts={["Innovate.", "Create.", "Build.", "Elevate."]}
                morphTime={2}
                cooldownTime={1.5}
                className="text-center"
                textClassName="text-gradient-pink"
              />
            </div>

            {/* Subtitle - Centered with proper spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-12 leading-relaxed max-w-4xl mx-auto text-center"
            >
              We craft bespoke digital experiences that drive growth and define the future of your brand.
            </motion.p>

            {/* CTA Buttons - Centered with proper spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/templates"
                className="group relative px-8 py-4 min-w-[200px] rounded-xl font-semibold text-white overflow-hidden text-center transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary to-accent-pink transition-all duration-500 group-hover:blur-md group-hover:opacity-80"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary to-accent-pink"></span>
                <span className="absolute inset-[1px] rounded-[11px] bg-card/90 transition-opacity duration-500 group-hover:opacity-70"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Our Work
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/book"
                className="px-8 py-4 rounded-xl font-semibold text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/10 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </LampContainer>
      </div>

      {/* Scroll Indicator - Bottom center, perfect positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-accent-cyan/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-accent-cyan/60 rounded-full mt-2"
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