const CACHE = "medivault-v1";
const FILES = [
  "/",
  "/index.html",
  "/questions.json",
  "/extra_questions.json",
  "/extra_questions_2.json",
  "/ethics_questions.json",
  "/notes.json",
  "/clinical_cards.json",
  "/extra1.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
