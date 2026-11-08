/* Concept v5: small ink crosses appear on the drafting grid near the cursor,
   on every page, and fade out after it moves on. Desktop (hover) only. */
(function () {
  if (!window.matchMedia || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var G = 24, R0 = 140;
  var cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden", "true");
  cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none";
  document.body.appendChild(cv);
  var ctx = cv.getContext("2d"), dpr = 1, W = 0, H = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size(); addEventListener("resize", size);
  var marks = {}, mouse = { x: 0, y: 0, on: false }, running = false;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    var sx = scrollX, sy = scrollY;
    if (mouse.on) {
      var px = mouse.x + sx, py = mouse.y + sy;
      for (var gx = Math.floor((px - R0) / G) * G; gx <= px + R0; gx += G)
        for (var gy = Math.floor((py - R0) / G) * G; gy <= py + R0; gy += G) {
          var d = Math.hypot(gx - px, gy - py);
          if (d < R0) { var k = gx + "," + gy, v = 1 - d / R0; if (!marks[k] || marks[k].v < v) marks[k] = { x: gx, y: gy, v: v }; }
        }
    }
    var alive = false;
    ctx.strokeStyle = "#151515"; ctx.lineWidth = .9;
    for (var key in marks) {
      var m = marks[key], x = m.x - sx, y = m.y - sy, s = 2.5 + m.v * 2.5;
      ctx.globalAlpha = Math.min(1, m.v * .4);
      ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke();
      m.v -= .02; if (m.v <= 0) delete marks[key]; else alive = true;
    }
    ctx.globalAlpha = 1;
    if (mouse.on || alive) requestAnimationFrame(frame); else { running = false; ctx.clearRect(0, 0, W, H); }
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
  addEventListener("pointermove", function (e) { if (e.pointerType === "touch") return; mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; kick(); }, { passive: true });
  document.addEventListener("pointerleave", function () { mouse.on = false; });
  addEventListener("blur", function () { mouse.on = false; });
  addEventListener("scroll", kick, { passive: true });
})();
