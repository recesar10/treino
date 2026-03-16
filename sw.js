
const CACHE='treino-pwa-v2';
const ASSETS=['/treino/','/treino/index.html','/treino/manifest.json','/treino/icon-192.png','/treino/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return; e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone(); caches.open(CACHE).then(cache=>cache.put(e.request,c)); return n;}).catch(()=>caches.match('/treino/index.html'))));});
