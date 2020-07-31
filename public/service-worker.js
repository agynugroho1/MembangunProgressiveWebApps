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
  ],
  {
    ignoreUrlParametersMatching:[/.*/]
  });

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

workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
    workbox.strategies.staleWhileRevalidate({
      cacheExpiration: {
        maxAgeSeconds: 60 * 30 //cache diperbarui setiap 30 menit
    }
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-webfonts',
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