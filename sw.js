// Service Worker for Pandit Ji Online (Network-First with Full Offline Support)
const CACHE_NAME = 'panditji-v15';
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/app-icon.svg',
  '/favicon.ico',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/pandit-photo.jpg',
  '/FB_IMG_1792320177760.jpg',
  '/pandit-shashank-sharma.jpg',
  '/assets/deities/surya.jpg',
  '/assets/deities/shiva.jpg',
  '/assets/deities/hanuman.jpg',
  '/assets/deities/ganesh.jpg',
  '/assets/deities/vishnu.jpg',
  '/assets/deities/durga.jpg',
  '/assets/deities/shani.jpg',
  '/assets/deities/ram_darbar.jpg',
  '/assets/deities/radha_krishna.jpg',
  '/assets/deities/lakshmi.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // If user-agent is a search bot/crawler, bypass service worker completely so crawler gets pristine network response
  const ua = navigator.userAgent || '';
  if (/bot|googlebot|crawler|spider|inspection/i.test(ua)) {
    return;
  }

  // Do not intercept API requests, Vite dev module requests, or non-GET requests
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.endsWith('standalone-firebase-index.html') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  const isCodeAsset = /\.(js|mjs|ts|tsx|jsx|css)$/i.test(url.pathname);

  // Network-First strategy: always load fresh files, fallback to cache only when offline
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const contentType = (networkResponse.headers.get('content-type') || '').toLowerCase();
          // Never cache or serve an HTML fallback page as a JS or CSS asset
          if (isCodeAsset && contentType.includes('text/html')) {
            return new Response('', { status: 404, statusText: 'Not Found' });
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            const cachedType = (cachedResponse.headers.get('content-type') || '').toLowerCase();
            if (isCodeAsset && cachedType.includes('text/html')) {
              return new Response('', { status: 404, statusText: 'Not Found' });
            }
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('', { status: 404, statusText: 'Offline' });
        });
      })
  );
});
