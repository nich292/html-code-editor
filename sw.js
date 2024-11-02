const CACHE_NAME = 'netdig-code-editor-cache-v1';

const URLS_TO_CACHE = [
    'https://nich292.github.io/html-code-editor',
    'https://nich292.github.io/html-code-editor/',
    'https://nich292.github.io/html-code-editor/index.html',
    'https://nich292.github.io/html-code-editor/editor.html',
    'https://nich292.github.io/html-code-editor/status.html',
    'https://nich292.github.io/html-code-editor/Screenshot.png',
    'https://nich292.github.io/html-code-editor/Icon.png',
    'https://nich292.github.io/html-code-editor/outage.png',
    'https://nich292.github.io/html-code-editor/operational.png',
    'https://nich292.github.io/html-code-editor/LICENSE.txt',
    'https://nich292.github.io/html-code-editor/manifest.json',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
