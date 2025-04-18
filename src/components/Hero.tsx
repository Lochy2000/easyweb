import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextReveal } from "./TextReveal";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section className="relative pt-16 sm:pt-20 md:pt-24 min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[25%] -left-[25%] w-[150%] h-[150%] opacity-30"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, transparent 20%, var(--primary) 21%, transparent 22%, transparent)",
            backgroundSize: "5% 5%",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-6 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-primary text-sm sm:text-base font-medium">Web Development Solutions</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 sm:mb-6 animate-float"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              <TextReveal text="we develop" delay={0.4} className="text-white" />
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 animate-gradient" style={{ backgroundSize: "200% auto" }}>
                <TextReveal text="your ideas" delay={0.6} />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your vision into reality with our expert web development services.
            We build beautiful, functional websites that help your business grow.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center items-center mb-6 sm:mb-8"
          >
            <Link
              to="/templates"
              className="relative group px-6 py-3 min-w-[200px] rounded-[10px] font-medium text-white overflow-hidden text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0ce39a] via-[#69007f] to-[#fc0987] transition-all duration-500 group-hover:blur-[15px] group-hover:opacity-80 opacity-0"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#0ce39a] via-[#69007f] to-[#fc0987]"></span>
              <span className="absolute inset-[1px] rounded-[9px] bg-[#272727] transition-opacity duration-500 group-hover:opacity-70"></span>
              <span className="relative z-10">View Templates</span>
            </Link>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
