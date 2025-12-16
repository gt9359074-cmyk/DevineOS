const CACHE_NAME = 'divine-os-v2'; // Version bump
const ASSETS = [
    './index.html',
    './index.html?mode=standalone', // The secret App URL
    './manifest.json',
    './icon.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
