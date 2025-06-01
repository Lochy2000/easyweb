import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MiniLoaderProps {
  variant?: 'dots' | 'pulse' | 'wave';
  showText?: boolean;
  text?: string;
}

export default function MiniLoader({ 
  variant = 'pulse', 
  showText = true, 
  text = "Loading..." 
}: MiniLoaderProps) {
  const [loadingText, setLoadingText] = useState("");
  const [dotCount, setDotCount] = useState(0);

  // Typewriter effect for loading text
  useEffect(() => {
    if (!showText) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setLoadingText(text.slice(0, index));
        index++;
      } else {
        // Reset and start over
        index = 0;
        setLoadingText("");
      }
    }, 150);

    return () => clearInterval(timer);
  }, [text, showText]);

  // Animated dots
  useEffect(() => {
    const timer = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent-cyan"
                animate={{
                  y: [-2, 2, -2],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );      
      case 'wave':
        return (
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-primary to-accent-cyan rounded-full"
                animate={{
                  height: [4, 16, 4]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        );
      
      default: // pulse
        return (
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-cyan relative"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan to-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </motion.div>
        );
    }
  };
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg glass-card">
        {renderLoader()}
        
        {showText && (
          <div className="flex items-center gap-1 min-h-[24px]">
            <motion.span
              className="text-lg font-medium bg-gradient-to-r from-primary via-accent-cyan to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {loadingText}
            </motion.span>
            <span className="text-accent-cyan">
              {".".repeat(dotCount)}
            </span>
          </div>
        )}
        
        {/* Progress indication */}
        <motion.div
          className="w-32 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent-cyan rounded-full"
            animate={{
              x: [-128, 128],
              width: [0, 64, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}