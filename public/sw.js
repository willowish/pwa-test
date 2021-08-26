const self = this;
const STATIC_FILES_TO_CACHE = [
  '/',
  '/static/js/main.chunk.js',
  '/public/index.html',
  '/static/js/vendors~main.chunk.js',
  '/static/js/bundle.js',
];
const STATIC_CACHE = 'static-1';
const DYNAMIC_CACHE = 'dynamic-5';

self.addEventListener('install', (e) => {
  console.log('[Service worker] installed', e);
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        cache.addAll(STATIC_FILES_TO_CACHE);
      })
  )
})

self.addEventListener('activate', e => {
  // eslint-disable-next-line no-console
  console.log('[Service worker] activated', e);
})

self.addEventListener('fetch', e => {
  if (STATIC_FILES_TO_CACHE.some(key => e.request.url.includes(key))) {
    e.respondWith(caches.match(e.request))
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(requestResponse => {
        return caches.open(DYNAMIC_CACHE)
          .then(cache => {
            cache.put(e.request.url, requestResponse.clone());
            return requestResponse;
          })

      })
      .catch(e => {
        return caches.match(e.request);
      })
  );
})
