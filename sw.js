// Pandit Ji Online — Lightweight Service Worker & Instant Engine Cache (v30)
// Designed for instant mobile copy-paste on GitHub (~80 lines, ~2.6 KB)
const CACHE_NAME = 'panditji-v30';
const PRECACHE_ASSETS = [
  '/manifest.json',
  '/app-icon.svg',
  '/favicon.ico',
  '/favicon-48x48.png',
  '/favicon-96x96.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== 'GET') return;
  const ua = (navigator && navigator.userAgent) || '';
  if (/bot|googlebot|crawler|spider|inspection|lighthouse|pagespeed|headless/i.test(ua)) return;
  if (
    url.pathname === '/sw.js' ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.endsWith('standalone-firebase-index.html')
  ) {
    return;
  }

  // Always revalidate HTML navigation and app engine bundles against GitHub CDN so updates appear immediately
  const isAlwaysFresh =
    event.request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname === '/index.html' ||
    url.pathname === '/404.html' ||
    url.pathname === '/app-engine.txt' ||
    url.pathname === '/app-engine.html' ||
    url.pathname === '/panditji-app.bundle.js';

  if (isAlwaysFresh) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        fetch(event.request, { cache: 'no-cache' })
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cache.match(event.request).then((res) => res || caches.match('/')))
      )
    );
    return;
  }

  const isCodeAsset = /\.(js|mjs|ts|tsx|jsx|css)$/i.test(url.pathname);
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const contentType = (networkResponse.headers.get('content-type') || '').toLowerCase();
          if (isCodeAsset && contentType.includes('text/html')) {
            return new Response('', { status: 404, statusText: 'Not Found' });
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() =>
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            const cachedType = (cachedResponse.headers.get('content-type') || '').toLowerCase();
            if (isCodeAsset && cachedType.includes('text/html')) {
              return new Response('', { status: 404, statusText: 'Not Found' });
            }
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') return caches.match('/');
          return new Response('', { status: 404, statusText: 'Offline' });
        })
      )
  );
});
