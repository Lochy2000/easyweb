import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// We'll add the CSS for this in a global stylesheet later

interface LoadingScreenProps {
  onLoaded: () => void; // Callback function when loading is 'done'
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  useEffect(() => {
    // Check if the document is ready
    if (document.readyState === 'complete') {
      onLoaded();
    } else {
      // Listen for when everything is loaded
      window.addEventListener('load', onLoaded);
      // Fallback timeout of 1.5s max
      const fallbackTimer = setTimeout(onLoaded, 1500);
      
      return () => {
        window.removeEventListener('load', onLoaded);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onLoaded]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
    >
      <div className="cssloader">
        <div className="triangle1"></div>
        <div className="triangle2"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 