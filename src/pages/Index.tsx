import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Services } from '@/components/Services';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { BackgroundEffects } from '@/components/BackgroundEffects';

import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';
import '@/styles/animations.css';

const Index = () => {
  // Combine multiple schema objects for the homepage
  const combinedSchema = [
    getOrganizationSchema(),
    getWebsiteSchema()
  ];

  return (
    <div className="min-h-screen bg-background/50 relative isolate">
      <Helmet>
        <title>Easywebs | Modern Web Design and Development</title>
        <meta name="description" content="Easywebs is a modern web design and development studio building high-performance websites for creators, small businesses, and startups." />
        <link rel="canonical" href="https://www.easywebs.uk" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Easywebs | Modern Web Design and Development" />
        <meta property="og:description" content="Easywebs is a modern web design and development studio building high-performance websites for creators, small businesses, and startups." />
        <meta property="og:url" content="https://www.easywebs.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.easywebs.uk/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Easywebs | Modern Web Design and Development" />
        <meta name="twitter:description" content="Easywebs is a modern web design and development studio building high-performance websites for creators, small businesses, and startups." />
        <meta name="twitter:image" content="https://www.easywebs.uk/og-image.jpg" />
        
        {/* Keywords */}
        <meta name="keywords" content="web design, web development, custom websites, WordPress development, small business websites, ecommerce, SEO optimization, responsive design" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(combinedSchema)}
        </script>
      </Helmet>
      
      <BackgroundEffects />
      <Header />
      <main className="relative">
        <Hero />
        
        <Services />
        
        <ProcessSteps />
        <Testimonials />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
