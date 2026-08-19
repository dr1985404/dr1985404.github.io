const CACHE_NAME = "medivault-v2.3";
const ASSETS = [
  "./",
  "./index.html",
  "./questions.json",
  "./extra_questions.json",
  "./extra_questions_2.json",
  "./extra_questions_3.json",
  "./ethics_questions.json",
  "./notes.json",
  "./clinical_cards.json",
  "./extra1.json",
  "./cdm_cases.json",
  "./mnemonics.json",
  "./eq2_part1.json",
  "./eq2_part2.json",
  "./eq2_part3.json",
  "./eq2_part4.json",
  "./eq2_part5.json",
  "./eq2_part6.json",
  "./high-yield-mccqe1.html",
  "./mccqe1-study-guide-2026.html",
  "./canadian-medical-ethics-guide.html",
  "./acute-abdomen-mccqe1-review.html",
  "./img-residency-matching-canada.html",
  "./about.html",
  "./contact.html",
  "./privacy.html",
  "./terms.html",
  "./sids_infographic.png",
  "./ethics_infographic.png",
  "./cardiology_infographic.png",
  "./mandatory_reporting_infographic.png",
  "./pediatric_pearls_infographic.png",
  "./maid_infographic.png"
];

// Install Event - Caching Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event - Network First Strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
