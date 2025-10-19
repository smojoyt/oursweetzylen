// NAV MODULE: handles mobile menu, active link highlight, sticky shadow.
(function (global) {
  function navInit(root = document) {
    const btn = root.querySelector("#osz-menu-btn");
    const mobile = root.querySelector("#osz-mobile-nav");
    const header = root.querySelector("header");

    // Mobile toggle
    if (btn && mobile) {
      const toggle = () => {
        const open = !mobile.classList.contains("hidden");
        mobile.classList.toggle("hidden");
        btn.setAttribute("aria-expanded", String(!open));
      };
      btn.addEventListener("click", toggle);
      mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
        if (!mobile.classList.contains("hidden")) toggle();
      }));
    }

    // Sticky shadow on scroll
    if (header) {
      const setShadow = () => {
        if (window.scrollY > 4) {
          header.classList.add("shadow-md");
        } else {
          header.classList.remove("shadow-md");
        }
      };
      setShadow();
      window.addEventListener("scroll", setShadow, { passive: true });
    }

    // Active link highlight (basic path/hash match)
    const links = root.querySelectorAll('nav a[href^="/"], nav a[href^="#"], #osz-mobile-nav a');
    const path = location.pathname.replace(/\/+$/, "");
    const hash = location.hash;

    links.forEach((a) => {
      a.classList.remove("text-zylen-strawberry");
      const href = a.getAttribute("href");
      const isHashMatch = href && href.startsWith("#") && href === hash;
      const isHome = (href === "/" || href === "") && (path === "" || path === "/");
      const isPathMatch = href && href !== "/" && href === path;

      if (isHashMatch || isPathMatch || isHome) {
        a.classList.add("text-zylen-strawberry");
      }
    });
  }

  global.OSZ = global.OSZ || {};
  global.OSZ.navInit = navInit;
})(window);
