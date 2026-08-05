/* Vignesh Universe – Basic Service Worker (PWA) */

const CACHE_NAME = 'vignesh-universe-v3';
const ASSETS = [
  './',
  './index.html',
  './Contact.html',
  './Shopping.html',
  './Digital-Hub.html',
  './Recharge-Ticket-Booking.html',
  './Mobile-Recharge.html',
  './DTH-Recharge.html',
  './FasTag-Recharge.html',
  './Utility-Bill-Payments.html',
  './Bus-Ticket-Booking.html',
  './Train-Ticket-Booking.html',
  './Flight-Ticket-Booking.html',
  './Movie-Ticket-Booking.html',
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
  './Assets/Css/Mobile-Recharge.css',
  './Assets/Css/DTH-Recharge.css',
  './Assets/Css/FasTag-Recharge.css',
  './Assets/Css/Utility-Bill-Payments.css',
  './Assets/Css/Bus-Ticket-Booking.css',
  './Assets/Css/Train-Ticket-Booking.css',
  './Assets/Css/Flight-Ticket-Booking.css',
  './Assets/Css/Movie-Ticket-Booking.css',
  './Assets/Css/Recharge-Ticket-Booking.css',
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
