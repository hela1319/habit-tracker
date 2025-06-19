// sw.js (for offline use)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('habit-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/db.js',
        '/chart.js',
        '/idb.js',
        '/manifest.json',
        'https://cdn.tailwindcss.com',
        'https://cdn.jsdelivr.net/npm/chart.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
