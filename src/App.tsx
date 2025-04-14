import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from './components/LoadingScreen';
import { PreloadAssets } from './components/PreloadAssets';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load main pages
const Index = React.lazy(() => import("./pages/Index"));
const Templates = React.lazy(() => import("./pages/Templates"));
const AboutPage = React.lazy(() => import("./pages/About"));
const Blog = React.lazy(() => import("./pages/Blog"));
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
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      <PreloadAssets />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key={location.pathname} onLoaded={handleLoaded} />}
      </AnimatePresence>
      <Suspense fallback={<LoadingScreen onLoaded={() => {}} />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<Blog />} />
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
