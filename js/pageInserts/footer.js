// FOOTER MODULE: dynamic year, optional newsletter, mobile accordion polish, smooth-scroll.
(function (global) {
  function footerInit(root = document) {
    // Scope to the footer that called us (important when inserting HTML)
    const footer = root.getElementById("contact") || root.querySelector("footer#contact") || root;

    // 1) Dynamic year
    const year = footer.querySelector("#osz-year");
    if (year) year.textContent = new Date().getFullYear();

    // 2) Optional newsletter form in footer
    const form = footer.querySelector("form[data-footer-newsletter]");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        // TODO: plug into your backend/automation
        alert("Thanks for subscribing! (Footer)");
        form.reset();
      });
    }

    // 3) Mobile accordion: when one <details> opens, close siblings
    const detailGroups = footer.querySelectorAll("details");
    if (detailGroups.length) {
      detailGroups.forEach((d) => {
        d.addEventListener("toggle", () => {
          if (d.open) {
            detailGroups.forEach((sib) => {
              if (sib !== d && sib.open) sib.open = false;
            });
          }
        });
      });
    }

    // 4) Smooth-scroll for any in-page footer links (e.g. /#about, #menu)
    footer.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!a) return;

      // Resolve the hash target
      const href = a.getAttribute("href");
      const hash = href.startsWith("/#") ? href.slice(1) : href; // remove leading /
      const id = hash || "";
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const header = document.querySelector("header");
      const offset = header ? header.offsetHeight + 8 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });

    // 5) Optional: mark external action links with rel for safety
    footer.querySelectorAll('a[target="_blank"]').forEach((a) => {
      if (!a.rel) a.rel = "noopener";
    });
  }

  global.OSZ = global.OSZ || {};
  global.OSZ.footerInit = footerInit;
})(window);
