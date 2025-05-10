import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from './components/LoadingScreen';
import { PreloadAssets } from './components/PreloadAssets';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import CalendlyWidget from './components/CalendlyWidget';

// Lazy load main pages
const Index = React.lazy(() => import("./pages/Index"));
const Templates = React.lazy(() => import("./pages/Templates"));
const AboutPage = React.lazy(() => import("./pages/About"));
const Blog = React.lazy(() => import("./pages/BlogMarkdown")); // Use markdown-based blog
const BookNow = React.lazy(() => import("./pages/BookNow")); // New BookNow page
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();

  // Handle route changes
  useEffect(() => {
    if (!initialLoad) {
      setIsLoading(true);
    }
  }, [location.pathname, initialLoad]);

  const handleLoaded = () => {
    setIsLoading(false);
    setInitialLoad(false);
  };

  // Force loading screen to close after 4 seconds
  useEffect(() => {
    if (isLoading) {
      const forceLoadTimeoutId = setTimeout(() => {
        setIsLoading(false);
        setInitialLoad(false);
        console.log('Force-closing loading screen');
        
        // Clear force refresh flag on successful load
        if (sessionStorage.getItem('refreshed')) {
          // Wait a moment to ensure everything is visible
          setTimeout(() => {
            sessionStorage.removeItem('refreshed');
          }, 1000);
        }
      }, 4000); // 4 seconds max to match LoadingScreen
      
      return () => clearTimeout(forceLoadTimeoutId);
    }
  }, [isLoading]);

  return (
    <>
      <PreloadAssets />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key={location.pathname} onLoaded={handleLoaded} />}
      </AnimatePresence>
      <Suspense fallback={
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="cssloader">
            <div className="triangle1"></div>
            <div className="triangle2"></div>
            <p className="loading-text">Loading...</p>
          </div>
        </motion.div>
      }>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<Blog />} />
          <Route path="/book" element={<BookNow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AppContent />
        </Router>
        <Toaster />
        <Sonner />
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
