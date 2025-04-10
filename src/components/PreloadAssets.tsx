import React from 'react';
import { Helmet } from 'react-helmet';

export const PreloadAssets = () => {
  return (
    <Helmet>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
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
      
      {/* Register Service Worker */}
      <script>
        {`
          if ('serviceWorker' in navigator) {
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
        `}
      </script>
    </Helmet>
  );
}; 