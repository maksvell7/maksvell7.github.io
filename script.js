// Toggles the folder-tab navigation open/closed on small screens.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var tabs = document.querySelector(".tabs");
  if (!toggle || !tabs) return;
  toggle.addEventListener("click", function () {
    tabs.classList.toggle("is-open");
  });
});
