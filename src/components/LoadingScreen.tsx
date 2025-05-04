import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// We'll add the CSS for this in a global stylesheet later

interface LoadingScreenProps {
  onLoaded: () => void; // Callback function when loading is 'done'
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [loadTriggered, setLoadTriggered] = useState(false);
  
  useEffect(() => {
    // Check if the document is ready
    if (document.readyState === 'complete') {
      // Document already loaded - trigger immediately with short delay
      setTimeout(() => {
        if (!loadTriggered) {
          setLoadTriggered(true);
          onLoaded();
        }
      }, 500);
    } else {
      // Listen for when everything is loaded
      const handleLoad = () => {
        if (!loadTriggered) {
          setLoadTriggered(true);
          onLoaded();
        }
      };
      
      window.addEventListener('load', handleLoad);
      
      // Fallback timeout of 3s max
      const fallbackTimer = setTimeout(() => {
        if (!loadTriggered) {
          setLoadTriggered(true);
          onLoaded();
          console.log('LoadingScreen fallback timeout triggered');
        }
      }, 3000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onLoaded, loadTriggered]);

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