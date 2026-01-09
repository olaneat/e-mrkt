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
  if (!event.request || event.request.method !== "GET") return;

  const req = event.request;
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  const isApiRequest =
    url.origin === "https://e-mrkt-api.onrender.com" ||
    url.origin === "http://localhost:8000";

  if (isApiRequest) {
    // ── Stale-While-Revalidate for API ──
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        // 1. Try cache first → return immediately if exists (fast!)
        const cachedResponse = await cache.match(req);

        // 2. Always fetch from network (in background)
        const fetchPromise = fetch(req)
          .then((freshResponse) => {
            // Only cache successful responses
            if (freshResponse && freshResponse.status === 200) {
              cache.put(req, freshResponse.clone());
            }
            return freshResponse;
          })
          .catch(() => {
            // Network failed → at least we already returned cache if we had it
            console.log("Network failed for API, using cache if available");
          });

        // Return cache if we have it, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
  } else {
    // Static assets: keep your current cache-first (or change to network-first if you want)
    event.respondWith(
      caches.match(req).then((cached) => {
        return (
          cached ||
          fetch(req).then((res) =>
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, res.clone());
              return res;
            })
          )
        );
      })
    );
  }
});