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
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
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
      className="relative min-h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center"
    >
      {showSplash && <SplashCursor />}

      {/* Badge positioned at the top, always visible */}
      <div className="absolute top-24 md:top-28 lg:top-32 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 py-3 px-5 rounded-full bg-black/80 backdrop-blur-lg border border-cyan-400/30 shadow-lg">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Digital Innovation Partners</span>
          </div>
        </motion.div>
      </div>

      {/* Lamp Background Effect - positioned behind content */}
      <div className="absolute inset-0 z-0">
        <LampContainer>
          <div></div> {/* Empty content to show just the lamp effect */}
        </LampContainer>
      </div>

      {/* Main Content - positioned in center of screen */}
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-10 text-center px-4 flex flex-col items-center justify-center max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Large Gooey Text */}
        <div className="mb-8 md:mb-12 lg:mb-16 w-full flex justify-center">
          <GooeyText
            texts={["Innovate.", "Create.", "Build.", "Elevate."]}
            morphTime={2}
            cooldownTime={1.5}
            className="font-bold w-full text-center"
            textClassName="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent"
          />
        </div>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 text-center">
          We craft bespoke digital experiences that drive growth and define the future of your brand.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto">
          <Link
            to="/templates"
            className="group relative px-8 py-4 w-full sm:w-auto sm:min-w-[200px] rounded-xl font-semibold text-white overflow-hidden text-center transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></span>
            <span className="absolute inset-[1px] rounded-[11px] bg-slate-900/90"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Our Work
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/book"
            className="px-8 py-4 w-full sm:w-auto rounded-xl font-semibold text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105 text-center"
          >
            Start Your Project
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-cyan-400/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 bg-cyan-400/60 rounded-full mt-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;