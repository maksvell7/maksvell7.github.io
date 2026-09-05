document.addEventListener("DOMContentLoaded", function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  function updateThemeLabel(theme) {
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
  }
  updateThemeLabel(root.getAttribute("data-theme") || "light");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", current);
      localStorage.setItem("theme", current);
      updateThemeLabel(current);
    });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-toggle");
  var mobileLinks = document.querySelector(".mobile-links");
  if (menuBtn && mobileLinks) {
    menuBtn.addEventListener("click", function () {
      mobileLinks.classList.toggle("is-open");
    });
  }

  /* ---------- sliding nav indicator ---------- */
  var navLinks = document.querySelector(".nav-links");
  var indicator = document.querySelector(".nav-indicator");
  if (navLinks && indicator) {
    var links = Array.prototype.slice.call(navLinks.querySelectorAll(".nav-link"));
    var activeLink = navLinks.querySelector(".nav-link.is-active");

    function moveIndicatorTo(el) {
      if (!el) return;
      indicator.style.width = el.offsetWidth + "px";
      indicator.style.transform = "translateX(" + el.offsetLeft + "px)";
      indicator.classList.add("is-set");
    }

    links.forEach(function (link) {
      link.addEventListener("mouseenter", function () { moveIndicatorTo(link); });
    });
    navLinks.addEventListener("mouseleave", function () { moveIndicatorTo(activeLink); });

    // set initial position after fonts/layout settle
    window.requestAnimationFrame(function () { moveIndicatorTo(activeLink); });
    window.addEventListener("resize", function () { moveIndicatorTo(activeLink); });
  }

  /* ---------- ink-line draw-in (horizon, serpents, flourishes) ---------- */
  var drawEls = document.querySelectorAll(".horizon, .sea-serpent, .sea-flourish");
  drawEls.forEach(function (el, i) {
    if (reduceMotion) { el.classList.add("is-drawn"); return; }
    setTimeout(function () { el.classList.add("is-drawn"); }, 150 + i * 90);
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }
});
