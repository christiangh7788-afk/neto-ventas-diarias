// NETO — Service Worker v2
// Subir a la raíz del repo: /sw.js

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// Clic en notificación → abrir app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});

// Push desde servidor (futuro)
self.addEventListener('push', e => {
  const msg = e.data ? e.data.text() : '📊 Es hora de capturar ventas';
  e.waitUntil(
    self.registration.showNotification('Neto — Avance de Ventas', {
      body: msg,
      icon: './logo.jpg',
      vibrate: [200, 100, 200],
      tag: 'neto-push'
    })
  );
});
