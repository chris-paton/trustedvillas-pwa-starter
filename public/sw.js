self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('trustedvillas-cache').then((cache) => cache.addAll([
      '/',
      '/app/globals.css',
      // Add more assets as needed
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});