const cacheName = 'v1';

function receivePushNotification(event) {
    const { image, tag, url, title, text } = event.data.json();

    const options = {
        data: url,
        body: text,
        icon: image,
        vibrate: [200, 100, 200],
        tag: tag,
        image: image,
        badge:
            'https://res.cloudinary.com/eralphcloud/image/upload/v1593534116/logo_rethvw.png',
        actions: [
            {
                action: 'Detail',
                title: 'View',
                icon:
                    'https://res.cloudinary.com/eralphcloud/image/upload/v1593534116/logo_rethvw.png',
            },
        ],
    };
    event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);

self.addEventListener('install', (e) => {});

self.addEventListener('activate', (e) => {
    caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cache) => {
                if (cache !== cacheName) {
                    return caches.delete(cache);
                }
            }),
        );
    });
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                const resClone = res.clone();

                // Open cache
                caches.open(cacheName).then((cache) => {
                    // Add response to cache
                    cache
                        .put(e.request, resClone)
                        .catch((res) => console.log(''));
                });
                return res;
            })
            .catch(() => caches.match(e.request).then((res) => res)),
    );
});
