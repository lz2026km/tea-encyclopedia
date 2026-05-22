// sw.js — Service Worker for Tea Encyclopedia PWA v4.0
// Cache First strategy for full offline support

const CACHE_NAME = 'tea-v4.0';
const CACHE_URLS = [
  '/tea-encyclopedia/',
  '/tea-encyclopedia/index.html',
  '/tea-encyclopedia/tea_data.js',
  '/tea-encyclopedia/tea_history.js'
];

// Install: precache all resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching all resources');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Skip waiting to activate immediately');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Install failed:', err);
      })
  );
});

// Activate: clean old caches and claim clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch: Cache First strategy for all resources
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip cross-origin requests except fonts
  if (url.origin !== location.origin &&
      !url.href.includes('fonts.googleapis.com') &&
      !url.href.includes('fonts.gstatic.com')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          console.log('[SW] Cache hit:', url.pathname);
          return cached;
        }

        console.log('[SW] Cache miss, fetching:', url.pathname);
        return fetch(event.request)
          .then(response => {
            // Valid response - cache it
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, clone);
                  console.log('[SW] Cached:', url.pathname);
                });
            }
            return response;
          })
          .catch(() => {
            // Offline fallback for navigation
            if (event.request.mode === 'navigate') {
              return caches.match('/tea-encyclopedia/index.html');
            }
            console.log('[SW] Offline fallback for:', url.pathname);
          });
      })
  );
});

// Background update: notify clients of new version
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
