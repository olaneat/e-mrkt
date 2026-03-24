const CACHE_NAME = "neat-storez-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(["/"]))
  );
  self.skipWaiting(); // Helps new SW activate faster during development
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // Take control immediately
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ✅ Ignore non-GET requests
  if (!req || req.method !== "GET") return;

  // ✅ Ignore non-http(s) requests (THIS FIXES YOUR ERROR)
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  if (!["http:", "https:"].includes(url.protocol)) return;

  const isApiRequest =
    url.origin === "https://e-mrkt-api.onrender.com" ||
    url.origin === "http://localhost:8000";

  if (isApiRequest) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(req);

        const fetchPromise = fetch(req)
          .then((freshResponse) => {
            if (freshResponse && freshResponse.status === 200) {
              cache.put(req, freshResponse.clone());
            }
            return freshResponse;
          })
          .catch(() => {
            console.log("Network failed:", req.url);
          });

        return cachedResponse || fetchPromise;
      })
    );
  } else {
    event.respondWith(
      caches.match(req).then((cached) => {
        return (
          cached ||
          fetch(req).then((res) => {
            // ✅ EXTRA SAFETY
            if (!res || res.status !== 200) return res;

            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, res.clone());
              return res;
            });
          })
        );
      })
    );
  }
});