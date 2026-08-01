/* Vignesh Universe – Basic Service Worker (PWA) */

const CACHE_NAME = 'vignesh-universe-v1';
const ASSETS = [
  './',
  './index.html',
  './Contact.html',
  './Shopping.html',
  './Digital-Hub.html',
  './Electronics-Service.html',
  './Pixel-Works.html',
  './Digital-Marketing.html',
  './Technologies.html',
  './Privacy-Policy.html',
  './Assets/Css/Common.css',
  './Assets/Css/index.css',
  './Assets/Css/Contact.css',
  './Assets/Css/Shopping.css',
  './Assets/Css/Digital-Hub.css',
  './Assets/Css/Electronics-Service.css',
  './Assets/Css/Pixel-Works.css',
  './Assets/Css/Digital-Marketing.css',
  './Assets/Css/Technologies.css',
  './Assets/Css/Privacy-Policy.css',
  './Assets/Js/Config.js',
  './Assets/Js/Script.js',
  './Assets/Js/Shopping.js',
  './Assets/Images/Profile/Profile.webp'
];

// Install – Cache Core Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.log('Some Assets Failed To Cache:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate – Remove Old Caches
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

// Fetch – Network First, Fallback To Cache
self.addEventListener('fetch', (event) => {
  // Skip Non-GET And Cross-Origin (E.g. Apps Script, WhatsApp)
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('./index.html');
        });
      })
  );
});
