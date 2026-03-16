
const CACHE='treino-pro-v1';
const ASSETS=['/treino/','/treino/index.html','/treino/manifest.json','/treino/icon-192.png','/treino/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return; e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return n;}).catch(()=>caches.match('/treino/index.html'))));});
