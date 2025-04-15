const CACHE_NAME = 'easyweb-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/images/team/loch.png',
  '/assets/images/team/cai.png',
  '/assets/images/clients/santander.png',
  '/assets/images/clients/stmaryslogo.png',
  '/assets/images/clients/eatEco.png',
  '/assets/images/clients/heredge.png',
  '/assets/images/clients/globaldiglogo.png'
];

// Install service worker and cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate new service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Helper function to check if a request should be cached
const shouldCache = (request) => {
  const url = new URL(request.url);
  // Don't cache chrome-extension requests, POST requests, or non-GET requests
  return request.method === 'GET' && 
         !url.protocol.includes('chrome-extension') &&
         !url.pathname.includes('chrome-extension');
};

// Fetch event handler with network-first strategy for API calls
// and cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Network-first strategy for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (shouldCache(event.request)) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseClone))
              .catch(err => console.warn('Cache put failed:', err));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic' || !shouldCache(event.request)) {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone))
            .catch(err => console.warn('Cache put failed:', err));
          return response;
        });
      })
  );
}); 