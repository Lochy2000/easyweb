import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export const PreloadAssets = () => {
  useEffect(() => {
    // Only register service worker in production mode
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);
  
  return (
    <Helmet>
      {/* Load Inter font from Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Preload critical images */}
      <link
        rel="preload"
        href="/assets/images/team/loch.png"
        as="image"
      />
      <link
        rel="preload"
        href="/assets/images/team/cai.png"
        as="image"
      />

      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.linkedin.com" />
      
      {/* Preconnect to critical external domains */}
      <link rel="preconnect" href="https://www.linkedin.com" />
    </Helmet>
  );
}; 