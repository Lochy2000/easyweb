import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Page Not Found | Easywebs</title>
        <meta name="description" content="The page you are looking for does not exist. Return to the homepage to explore our web design services." />
        {/* Don't include canonical URL for 404 pages */}
        <meta name="robots" content="noindex, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Page Not Found | Easywebs" />
        <meta property="og:description" content="The page you are looking for does not exist. Return to the homepage to explore our web design services." />
        <meta property="og:url" content="https://www.easywebs.uk/404" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />
      
      <div className="container mx-auto pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-xl">
          <div className="mb-6 text-9xl font-bold text-primary/30">404</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-foreground/70 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/" 
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </a>
            <a 
              href="/blog" 
              className="px-6 py-3 bg-white/10 text-foreground rounded-lg hover:bg-white/20 transition-colors"
            >
              Browse Our Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
