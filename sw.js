const CACHE_NAME = "treino-final-v2-pesos";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./animal_boi.png",
  "./animal_cabra.png",
  "./animal_cao.png",
  "./animal_cavalo.png",
  "./animal_coelho.png",
  "./animal_dragao.png",
  "./animal_galo.png",
  "./animal_macaco.png",
  "./animal_porco.png",
  "./animal_rato.png",
  "./animal_serpente.png",
  "./animal_tigre.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(r => r || caches.match("./index.html")))
  );
});