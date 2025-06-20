self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('habit-tracker-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './app.js',
        './chart.js',
        './db.js',
        './manifest.json',
        './icons/icon-192.png',
        './icon-512.png',
        'https://cdn.tailwindcss.com',
        'https://cdn.jsdelivr.net/npm/chart.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
