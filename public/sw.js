const self = this;
const STATIC_FILES_TO_CACHE = [
  '/',
  '/static/js/main.chunk.js',
  '/public/index.html',
  '/static/js/vendors~main.chunk.js',
  '/static/js/bundle.js',
];
const STATIC_CACHE = 'static-1';
const DYNAMIC_CACHE = 'dynamic-2';

self.addEventListener('install', (e) => {
  console.log('[Service worker] installed', e);
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        cache.addAll(STATIC_FILES_TO_CACHE);
      })
  )
})

self.addEventListener('fetch', e => {
  if (e.request.method === 'GET') {
    e.respondWith(
      caches.match(e.request)
        .then(response => {
          if (response) {
            return response;
          }
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              return fetch(e.request)
                .then(res => {
                  cache.put(e.request, res.clone());
                  return res;
                })
            })
        })
    )
  } else {
    e.respondWith(fetch(e.request))
  }

})
