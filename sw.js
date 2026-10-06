/* 离线缓存：把界面文件存在手机上，没信号也能打开 */
const CACHE = "workbench-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;
  const isDoc = req.mode === "navigate" || req.destination === "document" ||
                req.url.endsWith("/") || req.url.endsWith("index.html");
  if (isDoc) {
    // 页面走网络优先：有网就能拿到最新版本，断网才用缓存
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
