 /*const CACHE_NAME = "firstpwa-v2";
 const urlsToCache = [
"/",
"/nav.html",
"/index.html",
"/tdetil.html",
"/thapus.html",
"/manifest.json",
"/package-lock.json",
"/package.json",
"/icon.png",
"/img/notification.png",
"/pages/home.html",
"/pages/saved.html",
"/pages/pertandingan.html",
"/css/materialize.min.css",
"/js/materialize.min.js",
"/js/nav.js",
"/js/api.js",
"/js/idb.js",
"/js/db.js",
"/js/regsw.js",
"/push.js"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "https://www.thesportsdb.com/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
  console.log("workbox berhasil dimuat");


workbox.precaching.precacheAndRoute([
    {url: "/index.html", revision: '1'},
    {url: "/nav.html", revision: '1'},
    {url: "/tdetil.html", revision: '1'},
    {url: "/thapus.html", revision: '1'},
    {url: "/package-lock.json", revision: '1'},
    {url: "/package.json", revision: '1'},
    {url: "/manifest.json", revision: '1'},
    {url: "/img/icon-192.png", revision: '1'},
    {url: "/img/icon-512.png", revision: '1'},
    {url: "/img/notification.png", revision: '1'},
    {url: "/pages/home.html", revision: '1'},
    {url: "/pages/pertandingan.html", revision: '1'},
    {url: "/pages/saved.html", revision: '1'},
    {url: "/css/materialize.min.css", revision: '1'},
    {url: "/js/api.js", revision: '1'},
    {url: "/js/db.js", revision: '1'},
    {url: "/js/idb.js", revision: '1'},
    {url: "/js/materialize.min.js", revision: '1'},
    {url: "/js/nav.js", revision: '1'},
    {url: "/js/regsw.js", revision: '1'}
  ]);

workbox.routing.registerRoute(    
      new RegExp('/'),
      workbox.strategies.staleWhileRevalidate()
    );

  workbox.routing.registerRoute(
        new RegExp('https://www.thesportsdb.com/'),
        workbox.strategies.staleWhileRevalidate({
          cacheExpiration: {
                maxAgeSeconds: 60 * 30 //cache diperbarui setiap 30 menit
          }
        })
    );

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

workbox.routing.registerRoute(
    new RegExp('/js/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'javascript'
    })
  );

workbox.routing.registerRoute(
    new RegExp('/img/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'gambar'
    })
  );

workbox.routing.registerRoute(
    new RegExp('/css/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'css'
    })
  );

workbox.routing.registerRoute(
     /^https:\/\/www\.thesportsdb\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'link'
    })
  );

workbox.routing.registerRoute(
     'tdetil.html',
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'jadwal'
    })
  );

workbox.routing.registerRoute(
     'thapus.html',
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'hapus'
    })
  );

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

} else {
  console("workbox gagal dimuat");
}