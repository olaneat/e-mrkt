const CACHE_NAME = "neat-storez-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(["/"]))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (!event.request) return; // ✔ prevent crash

  const req = event.request;

  // Try parsing the URL safely
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return; // skip invalid request
  }

  // Cache API calls
  if (
        url.origin =='https://e-mrkt-api.onrender.com'|| 
        url.origin=='http://localhost:8000'
    ){
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;

        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
      })
    );
    return;
  }

  // Default caching (static)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((res) =>
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, res.clone());
          return res;
        })
      );
    })
  );
});