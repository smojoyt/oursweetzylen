// HOME PAGE ENTRY: loads nav/footer inserts, then runs homepage scripts.
// Uses ES modules — include with: <script type="module" src="/js/pages/index/index.js"></script>

import "../js/pageInserts/nav.js";
import "../js/pageInserts/footer.js";
import "../js/components/boxBuilder.js"; // <-- add this line


// Insert helper: fetch HTML, inject, then call the component's init
async function insertAndInit(targetId, url, initFn) {
  const host = document.getElementById(targetId);
  if (!host) return;
  try {
    const res = await fetch(url, { cache: "no-cache" });
    host.innerHTML = await res.text();
    if (typeof initFn === "function") initFn(host);
  } catch (err) {
    console.error("Insert failed:", url, err);
  }
}

// Mount inserts (call asap)
insertAndInit("navInsert", "/pageInserts/nav.html", window.OSZ?.navInit);
insertAndInit("footerInsert", "/pageInserts/footer.html", window.OSZ?.footerInit);

// --------------------
// HOMEPAGE ENHANCEMENTS
// --------------------

// 1) Smooth-scroll with header offset for in-page anchors (optional polishing)
function smoothScrollWithOffset(e) {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  if (id === "#" || id.length < 2) return;
  const el = document.querySelector(id);
  if (!el) return;

  e.preventDefault();
  const header = document.querySelector("header");
  const offset = header ? header.offsetHeight + 8 : 0;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
document.addEventListener("click", smoothScrollWithOffset);

// 2) Reveal-on-scroll (add data-reveal to any element you want to animate in)
const revealEls = document.querySelectorAll("[data-reveal]");
if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => {
    el.classList.add("opacity-0", "translate-y-6", "transition", "duration-700");
    io.observe(el);
  });
}

// 3) Lazy-load all images that don’t already opt-in
document.querySelectorAll("img:not([loading])").forEach((img) => {
  img.setAttribute("loading", "lazy");
});

// 4) (Optional) “card hover raise” via keyboard focus too (a11y polish)
document.querySelectorAll(".card, [data-card]").forEach((el) => {
  el.addEventListener("focusin", () => el.classList.add("ring-2", "ring-[rgba(75,46,30,.25)]"));
  el.addEventListener("focusout", () => el.classList.remove("ring-2", "ring-[rgba(75,46,30,.25)]"));
});
