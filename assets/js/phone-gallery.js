/* Concept v5: dots + hint under the home "Selected work" swipe gallery on phones. */
(function () {
  var g = document.getElementById("featured-projects");
  if (!g) return;
  function setup() {
    var cards = g.querySelectorAll(".card");
    if (!cards.length) return setTimeout(setup, 50);
    var hint = document.createElement("p"); hint.className = "swipe-hint"; hint.textContent = "Swipe for more →";
    var dots = document.createElement("div"); dots.className = "swipe-dots"; dots.setAttribute("aria-hidden", "true");
    dots.innerHTML = Array.prototype.map.call(cards, function () { return "<i></i>"; }).join("");
    g.after(dots); dots.after(hint);
    var d = dots.children;
    function mark() {
      var i = Math.round(g.scrollLeft / (cards[0].offsetWidth + 14));
      for (var k = 0; k < d.length; k++) d[k].className = k === i ? "on" : "";
      if (i > 0) hint.style.visibility = "hidden";
    }
    g.addEventListener("scroll", mark, { passive: true }); mark();
  }
  setup();
})();
