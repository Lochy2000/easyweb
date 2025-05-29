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
import MiniLoader from './components/MiniLoader';

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
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setShowLoader(true);
    setShowContent(false);
    const loaderDuration = isHome ? 4500 : 1500;
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowContent(true); // Show content immediately as loader starts fading out
    }, loaderDuration);
    return () => clearTimeout(timer);
  }, [location.pathname, isHome]);

  return (
    <>
      <PreloadAssets />
      <AnimatePresence mode="wait">
        {showLoader && (
          isHome ? (
            <LoadingScreen key="home-loader" show={showLoader} />
          ) : (
            <motion.div
              key="mini-loader"
              className="fixed inset-0 z-50 flex items-center justify-center bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MiniLoader />
            </motion.div>
          )
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Suspense fallback={null}>
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
          </motion.div>
        )}
      </AnimatePresence>
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
