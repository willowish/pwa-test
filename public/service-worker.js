const self = this;

self.addEventListener('install', (e) => {
  console.log('[Service worker] installed', e);
  e.waitUntil(
    caches.open('static')
      .then(cache => {
        // eslint-disable-next-line no-console
        console.log('Precaching');
        cache.add('/');
        cache.add('/public/index.html');
        cache.add('/static/js/vendors~main.chunk.js');
        cache.add('/static/js/bundle.js');
        cache.add('/static/js/main.chunk.js');
      })
  )
})

self.addEventListener('activate', e => {
  // eslint-disable-next-line no-console
  console.log('[Service worker] activated', e);
})

self.addEventListener('fetch', e => {
  // eslint-disable-next-line no-console
  console.log('[Service worker] fetch', e);
  e.respondWith(
    caches.match(e.request)
      .then(response => response ?? fetch(e.request))
  )
})
