import React, { useRef, useEffect, Suspense, lazy, useState } from 'react';
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
  const location = useLocation();
  const isHome = location.pathname === '/';
  // Track if cinematic loader has been shown (sessionStorage persists across reloads in the same tab)
  const [hasSeenCinematic, setHasSeenCinematic] = useState(() => {
    return sessionStorage.getItem('hasSeenCinematicLoader') === 'true';
  });
  const [showCinematic, setShowCinematic] = useState(isHome && !hasSeenCinematic);

  useEffect(() => {
    if (isHome && !hasSeenCinematic) {
      setShowCinematic(true);
    } else {
      setShowCinematic(false);
    }
  }, [isHome, hasSeenCinematic]);

  // When the cinematic loader finishes, mark as seen
  useEffect(() => {
    if (showCinematic) {
      // Cinematic loader duration (match your animation, e.g. 4500ms)
      const timer = setTimeout(() => {
        sessionStorage.setItem('hasSeenCinematicLoader', 'true');
        setHasSeenCinematic(true);
        setShowCinematic(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [showCinematic]);

  // Fallback loader logic
  const suspenseFallback = isHome
    ? (hasSeenCinematic ? <MiniLoader /> : <LoadingScreen show />)
    : <MiniLoader />;

  return (
    <>
      <PreloadAssets />
      <AnimatePresence mode="wait">
        {showCinematic && (
          <LoadingScreen key="home-cinematic" show={true} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!showCinematic && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Suspense fallback={suspenseFallback}>
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
