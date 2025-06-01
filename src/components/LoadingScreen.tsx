import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// Simple morphing text component
const MorphingText = ({ 
  texts, 
  className = "",
  duration = 800 
}: { 
  texts: string[]; 
  className?: string;
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, duration);
    return () => clearInterval(timer);
  }, [texts.length, duration]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
      {/* Invisible text for maintaining container size */}
      <div className="invisible">
        {texts.reduce((longest, current) => 
          current.length > longest.length ? current : longest
        )}
      </div>
    </div>
  );
};

export default function LoadingScreen({ show }: { show: boolean }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!show) {
      setIsExiting(true);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-accent-cyan/30 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-accent-pink/20 to-primary/20 blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 20, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            {/* Logo and brand name */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 flex flex-col items-center gap-4"
            >
              <img 
                src="/easyweb-logo.png" 
                alt="Easywebs Logo" 
                className="h-16 sm:h-20 md:h-24 w-auto object-contain"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent-cyan to-accent-pink bg-clip-text text-transparent">
                easywebs
              </h1>
            </motion.div>

            {/* Morphing text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <MorphingText
                texts={["Web Agency", "We Create", "Digital Solutions"]}
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/80 h-12"
                duration={1500}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent-cyan to-accent-pink rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Exit animation overlay */}
          <AnimatePresence>
            {isExiting && (
              <motion.div
                className="absolute inset-0 bg-background z-20"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                exit={{ clipPath: "circle(150% at 50% 50%)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}