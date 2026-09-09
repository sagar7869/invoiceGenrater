const CACHE_NAME = 'invoice-app-v2'; // Naya version naam

self.addEventListener('install', event => {
    // Jab bhi code mein koi change hoga, ye automatically naya code install kar lega
    self.skipWaiting(); 
});

self.addEventListener('activate', event => {
    // Ye step purane data aur cache ko automatically saaf (clear) kar dega
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache); 
                })
            );
        }).then(() => self.clients.claim()) 
    );
});

// NETWORK FIRST STRATEGY: Hamesha internet se sabse fresh code layega.
// Agar internet band hai ya offline hai, tabhi purana save kiya hua dikhayega.
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
