const self = this;

self.addEventListener('install', (e) => {
  console.log('[Service worker] installed', e);
  e.waitUntil(
    caches.open('static')
      .then(cache => {
        // eslint-disable-next-line no-console
        console.log('Precaching');
        cache.addAll([
          '/',
          '/static/js/main.chunk.js',
          '/public/index.html',
          '/static/js/vendors~main.chunk.js',
          '/static/js/bundle.js',
        ]);
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
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response);
        if (response) {
          return response;
        }
        return fetch(e.request)
          .then(res => {
            return caches.open('dynamic')
              .then(cache => {
                cache.put(e.request.url, res.clone());
                return res;
              })
          })
      })
  )
})
