/* Project pop-up: let the mouse wheel scroll the pop-up even when the
   pointer is over the dimmed area around it (desktop). */
(function () {
  document.addEventListener("wheel", function (e) {
    if (!e.target.classList || !e.target.classList.contains("modal-backdrop")) return;
    var p = document.querySelector(".modal.open .modal-panel");
    if (!p) return;
    var k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? p.clientHeight : 1;
    p.scrollBy(0, e.deltaY * k);
  }, { passive: true });
})();
