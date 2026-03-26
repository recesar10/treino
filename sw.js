const CACHE_NAME = "treino-proximo-auto-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./animal_dragao.png",
  "./animal_tigre.png",
  "./animal_coelho.png",
  "./animal_cavalo.png",
  "./animal_cabra.png",
  "./animal_serpente.png",
  "./animal_macaco.png",
  "./animal_galo.png",
  "./animal_boi.png",
  "./animal_porco.png",
  "./animal_rato.png",
  "./animal_cao.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
});