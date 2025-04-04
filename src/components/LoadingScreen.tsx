import React from 'react';
import { motion } from 'framer-motion';

// We'll add the CSS for this in a global stylesheet later

interface LoadingScreenProps {
  onLoaded: () => void; // Callback function when loading is 'done'
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  React.useEffect(() => {
    // Simulate loading time (e.g., 2.5 seconds)
    const timer = setTimeout(() => {
      onLoaded();
    }, 2500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onLoaded]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-center"
      // initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className="cssloader">
        <div className="triangle1"></div>
        <div className="triangle2"></div>
        <p className="text loading-text">Loading .....</p> {/* Added loading-text class */}
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 