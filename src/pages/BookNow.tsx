import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import Header from '@/components/Header';

const BookNow = () => {
  useEffect(() => {
    // Load Calendly script when component mounts
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up on component unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Define structured data for the booking page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Design Consultation",
    "provider": {
      "@type": "Organization",
      "name": "Easywebs",
      "url": "https://www.easywebs.uk"
    },
    "serviceType": "Web Design Consultation",
    "areaServed": {
      "@type": "Place",
      "name": "United Kingdom"
    },
    "description": "Schedule a consultation with our web design team to discuss your website needs, get expert advice, or explore our services.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://www.easywebs.uk/book"
    }
  };

  return (
    <>
      <Helmet>
        <title>Book a Web Design Consultation | Easywebs</title>
        <meta name="description" content="Schedule a free consultation with our web design team to discuss your website needs, get expert advice, or explore our services." />
        <link rel="canonical" href="https://www.easywebs.uk/book" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Book a Web Design Consultation | Easywebs" />
        <meta property="og:description" content="Schedule a free consultation with our web design team to discuss your website needs, get expert advice, or explore our services." />
        <meta property="og:url" content="https://www.easywebs.uk/book" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.easywebs.uk/consultation-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book a Web Design Consultation | Easywebs" />
        <meta name="twitter:description" content="Schedule a free consultation with our web design team to discuss your website needs, get expert advice, or explore our services." />
        <meta name="twitter:image" content="https://www.easywebs.uk/consultation-og.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Header />
      <section className="pt-32 pb-24 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
              Let's Talk
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Schedule a Consultation
            </h2>
            <p className="text-lg text-foreground/80">
              Book a time with our team to discuss your website needs, get expert advice, or explore our services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-[#1C1C24] rounded-xl p-6 overflow-hidden shadow-lg border border-white/5">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/lochlann_oht" 
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookNow;
