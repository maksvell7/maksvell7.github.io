// Mobile folder-tab nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var tabs = document.querySelector(".tabs");
  if (toggle && tabs) {
    toggle.addEventListener("click", function () {
      tabs.classList.toggle("is-open");
    });
  }

  // Light/dark theme toggle, persisted in localStorage
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);
  updateThemeLabel(initial);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", current);
      localStorage.setItem("theme", current);
      updateThemeLabel(current);
    });
  }

  function updateThemeLabel(theme) {
    if (!themeBtn) return;
    themeBtn.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
  }
});
