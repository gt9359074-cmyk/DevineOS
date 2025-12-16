/* --- DIVINE OS SERVICE WORKER --- */
/* This script allows the OS to be installed and run offline */

const CACHE_NAME = 'divine-os-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// 1. INSTALL: When you first visit, save the OS to the browser's memory
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Force the new version to activate immediately
});

// 2. FETCH: When you open the app, try to load from memory first
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});