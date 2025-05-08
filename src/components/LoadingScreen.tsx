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
      // Check if essential CSS is loaded before proceeding
      const checkCssLoaded = () => {
        const styleSheets = document.styleSheets.length;
        
        // If we have at least some basic CSS loaded, proceed
        if (styleSheets > 0) {
          if (!loadTriggered) {
            setLoadTriggered(true);
            onLoaded();
          }
        } else {
          // Try again shortly
          setTimeout(checkCssLoaded, 100);
        }
      };
      
      // Start with a small delay to allow resources to load
      setTimeout(checkCssLoaded, 200);
    } else {
      // Listen for when everything is loaded
      const handleLoad = () => {
        // Give a slight delay to ensure CSS is applied
        setTimeout(() => {
          if (!loadTriggered) {
            setLoadTriggered(true);
            onLoaded();
          }
        }, 200);
      };
      
      window.addEventListener('load', handleLoad);
      
      // Fallback timeout adjusted to match App.tsx (4s instead of 3s)
      const fallbackTimer = setTimeout(() => {
        if (!loadTriggered) {
          // Check if we have CSS before proceeding
          if (document.styleSheets.length === 0) {
            console.log('No stylesheets loaded after timeout, forcing refresh');
            // Use session storage to prevent refresh loops
            if (!sessionStorage.getItem('refreshed')) {
              sessionStorage.setItem('refreshed', 'true');
              window.location.reload();
              return;
            }
          }
          
          setLoadTriggered(true);
          onLoaded();
          console.log('LoadingScreen fallback timeout triggered');
        }
      }, 4000);
      
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
        <div className="mt-8">
          <span className="typing-animation text-[#8b5cf6] font-exo font-bold tracking-widest" style={{ fontFamily: "'Exo 2', sans-serif" }}>easyweb</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 