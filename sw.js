// sw.js — Service Worker for Tea Encyclopedia PWA
const CACHE_NAME = 'tea-encyclopedia-v1';
const ASSETS = [
  './',
  './index.html',
  './tea_data.js',
  './tea_history.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap'
];

// Install: cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        console.warn('SW install failed, skipping non-critical assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch: CacheFirst strategy
self.addEventListener('fetch', event => {
  // Skip non-GET
  if (event.request.method !== 'GET') return;
  // Skip cross-origin requests except fonts
  const url = new URL(event.request.url);
  if (url.origin !== location.origin && !url.href.includes('fonts.googleapis.com') && !url.href.includes('fonts.gstatic.com')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Don't cache bad responses
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Return offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
