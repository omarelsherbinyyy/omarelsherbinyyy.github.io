/* Home hero figure, drawn like an ink diagram on drafting paper: a wireframe Earth with LEO, MEO, GEO, a GTO transfer and a Molniya orbit.
   Satellites fly their orbits; tankers hop between them on transfer ellipses.
   The scene is passive; the only interaction is grid marks appearing near the cursor.
   Orbit sizes are compressed for display, not to scale. */
(function () {
  "use strict";
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var hero = canvas.closest(".hero");
  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TAU = Math.PI * 2;
  
  /* Orbits in Earth radii (display scale). e = eccentricity, w = argument of perigee, tilt = extra inclination. */
  var ORBITS = [
    { a: 1.42, e: 0, w: 0, sats: 10 },
    { a: 2.45, e: 0, w: 0, sats: 6 },
    { a: 3.7, e: 0, w: 0, sats: 8 },
    { a: 2.95, e: 0.55, w: 2.35, sats: 2, tilt: -0.6 },
    { a: (1.42 + 3.7) / 2, e: (3.7 - 1.42) / (3.7 + 1.42), w: 0.4, sats: 0, dashed: true }
  ];
  var CIRC = ORBITS.slice(0, 3);

  function meanMotion(a) { return 0.5 * Math.pow(a, -1.5); }            // Kepler: n ∝ a^-1.5
  function solveE(M, e) { var E = M; for (var k = 0; k < 7; k++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); return E; }
  function orbitPoint(o, nu) { return { r: o.a * (1 - o.e * o.e) / (1 + o.e * Math.cos(nu)), th: nu + o.w }; }
  function posAtMean(o, M) {
    if (!o.e) return { r: o.a, th: M + o.w };
    var E = solveE(M, o.e);
    return orbitPoint(o, 2 * Math.atan2(Math.sqrt(1 + o.e) * Math.sin(E / 2), Math.sqrt(1 - o.e) * Math.cos(E / 2)));
  }

  /* ---------- State ---------- */
  var W, H, dpr, cx, cy, R, narrow, gridOff = { x: 0, y: 0 }, marks = {};
  var view = { tilt: 1.12, rot: 0.25 };
  var spin = 0;
  var mouse = { x: -1e4, y: -1e4, inside: false };
  var flashes = [], sats = [], tankers = [];
  ORBITS.forEach(function (o) { for (var i = 0; i < o.sats; i++) sats.push({ o: o, M: TAU * i / o.sats + Math.random() * .4 }); });
  [[0, 2], [1, 0], [2, 1]].forEach(function (p, i) {
    tankers.push({ from: CIRC[p[0]], to: CIRC[p[1]], th0: Math.random() * TAU, u: i * .3, state: "transfer", trail: [], park: 0 });
  });

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    narrow = W < 760;
    if (narrow) { R = W * .1; cx = W * .5; cy = H - R * 2.1; }
    else { cx = W * .7; cy = H * .54; R = Math.min(W * .066, H * .15); }
    var rect = canvas.getBoundingClientRect();
    gridOff = { x: (24 - ((rect.left + window.scrollX) % 24)) % 24, y: (24 - ((rect.top + window.scrollY) % 24)) % 24 };
  }

  /* 3D point in the Earth-equatorial frame → screen, using the fixed view. depth ≥ 0 faces the viewer. */
  function project3(x, y, z) {
    var c = Math.cos(view.rot), s = Math.sin(view.rot);
    var xr = x * c - y * s, yr = x * s + y * c;
    var ct = Math.cos(view.tilt), st = Math.sin(view.tilt);
    return { x: cx + xr * R, y: cy + (yr * ct - z * st) * R, d: yr * st + z * ct };
  }
  function project(r, th, inc) {
    var x = r * Math.cos(th), y = r * Math.sin(th), z = 0;
    if (inc) { z = y * Math.sin(inc); y = y * Math.cos(inc); }
    return project3(x, y, z);
  }
  function orbitPath(o, n) {
    var pts = [];
    for (var i = 0; i <= n; i++) { var p = orbitPoint(o, TAU * i / n); pts.push(project(p.r, p.th, o.tilt || 0)); }
    return pts;
  }

  /* ---------- Drawing ---------- */
  /* Grid marks: small ink crosses on the 24 px drafting grid near the cursor, fading out after it leaves. */
  var glowing = false;
  function drawMarks() {
    glowing = false;
    if (mouse.inside) {
      var R0 = 140;
      for (var gx = gridOff.x + Math.floor((mouse.x - R0 - gridOff.x) / 24) * 24; gx <= mouse.x + R0; gx += 24)
        for (var gy = gridOff.y + Math.floor((mouse.y - R0 - gridOff.y) / 24) * 24; gy <= mouse.y + R0; gy += 24) {
          var d = Math.hypot(gx - mouse.x, gy - mouse.y);
          if (d < R0) { var k = gx + "," + gy, v = 1 - d / R0; if (!marks[k] || marks[k].v < v) marks[k] = { x: gx, y: gy, v: v }; }
        }
    }
    ctx.strokeStyle = "#56697a"; ctx.lineWidth = .8;
    for (var key in marks) {
      var m = marks[key];
      ctx.globalAlpha = Math.min(1, m.v * .32);
      var s2 = 2.5 + m.v * 2;
      ctx.beginPath(); ctx.moveTo(m.x - s2, m.y); ctx.lineTo(m.x + s2, m.y); ctx.moveTo(m.x, m.y - s2); ctx.lineTo(m.x, m.y + s2); ctx.stroke();
      m.v -= .02; if (m.v <= 0) delete marks[key]; else glowing = true;
    }
    ctx.globalAlpha = 1;
  }

  function drawEarth() {
    // paper disc hides the far side of the orbits
    ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
    // graticule: latitude circles and rotating meridians, front hemisphere only
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - .5, 0, TAU); ctx.clip();
    ctx.lineWidth = .8;
    var lat, lon, k, p, q;
    for (lat = -60; lat <= 60; lat += 30) {
      var la = lat * Math.PI / 180;
      ctx.strokeStyle = lat === 0 ? "rgba(21,21,21,.55)" : "rgba(21,21,21,.22)";
      ctx.beginPath(); q = null;
      for (k = 0; k <= 72; k++) {
        lon = TAU * k / 72;
        p = project3(Math.cos(la) * Math.cos(lon), Math.cos(la) * Math.sin(lon), Math.sin(la));
        if (p.d >= 0) { if (q) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); q = p; } else q = null;
      }
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(21,21,21,.22)";
    for (var m = 0; m < 6; m++) {
      var lo = spin + m * Math.PI / 6;
      ctx.beginPath(); q = null;
      for (k = 0; k <= 72; k++) {
        var a2 = TAU * k / 72;
        p = project3(Math.cos(a2) * Math.cos(lo), Math.cos(a2) * Math.sin(lo), Math.sin(a2));
        if (p.d >= 0) { if (q) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); q = p; } else q = null;
      }
      ctx.stroke();
    }
    // night side as fine hatching
    ctx.strokeStyle = "rgba(21,21,21,.16)"; ctx.lineWidth = .7;
    ctx.beginPath(); ctx.arc(cx + R * .55, cy + R * .45, R * 1.05, 0, TAU); ctx.clip();
    for (var h = -2 * R; h < 2 * R; h += 5) { ctx.beginPath(); ctx.moveTo(cx + h - R, cy + R); ctx.lineTo(cx + h + R, cy - R); ctx.stroke(); }
    ctx.restore();
    // limb and centre mark
    ctx.strokeStyle = "#151515"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
  }

  function strokePath(pts, front, color, width, dashed) {
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dashed ? [4, 7] : []);
    ctx.beginPath();
    var started = false;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i], visible = front ? p.d >= 0 : p.d < 0;
      if (visible) { if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y); } else started = false;
    }
    ctx.stroke(); ctx.setLineDash([]);
  }
  function dot(x, y, r, col, glow) {
    if (glow) { ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r + 3, 0, TAU); ctx.stroke(); }
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  }
  function occluded(p) { return p.d < 0 && (p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy) < R * R; }

  /* ---------- Tankers: Hohmann-style half-ellipse between circular orbits ---------- */
  function tankerPos(tk) {
    if (tk.state === "park") return project(tk.to.a, tk.parkTh, 0);
    var r1 = tk.from.a, r2 = tk.to.a, a = (r1 + r2) / 2, e = Math.abs(r2 - r1) / (r1 + r2), nu = Math.PI * tk.u;
    var r = r2 > r1 ? a * (1 - e * e) / (1 + e * Math.cos(nu)) : a * (1 - e * e) / (1 - e * Math.cos(nu));
    return project(r, tk.th0 + nu, 0);
  }
  function stepTankers(dt) {
    tankers.forEach(function (tk) {
      if (tk.state === "transfer") {
        tk.u += dt * meanMotion((tk.from.a + tk.to.a) / 2) * 1.4 / Math.PI;
        var p = tankerPos(tk);
        tk.trail.push({ x: p.x, y: p.y, d: p.d }); if (tk.trail.length > 80) tk.trail.shift();
        if (tk.u >= 1) {
          tk.state = "park"; tk.parkTh = tk.th0 + Math.PI; tk.park = 0; tk.wait = 3 + Math.random() * 3;
          var q = project(tk.to.a, tk.parkTh, 0); flashes.push({ x: q.x, y: q.y, age: 0 });
        }
      } else {
        tk.parkTh += dt * meanMotion(tk.to.a); tk.park += dt;
        if (tk.trail.length) tk.trail.shift();
        if (tk.park > tk.wait) {
          var i = CIRC.indexOf(tk.to), j = (i + 1 + Math.floor(Math.random() * 2)) % 3;
          tk.from = CIRC[i]; tk.to = CIRC[j]; tk.th0 = tk.parkTh; tk.u = 0; tk.state = "transfer"; tk.trail = [];
        }
      }
    });
    flashes.forEach(function (f) { f.age += dt; });
    flashes = flashes.filter(function (f) { return f.age < 1.2; });
  }

  /* ---------- Frame ---------- */
  var last = null, running = false;
  function frame(t) {
    var dt = last == null ? 0 : Math.min(.05, (t - last) / 1000); last = t;
    if (!reduced) { sats.forEach(function (s) { s.M += dt * meanMotion(s.o.a); }); stepTankers(dt); spin += dt * .06; }
    ctx.clearRect(0, 0, W, H);
    var paths = ORBITS.map(function (o) { return orbitPath(o, 220); });
    ORBITS.forEach(function (o, i) { strokePath(paths[i], false, "rgba(21,21,21,.25)", .9, o.dashed); });
    drawEarth();
    ORBITS.forEach(function (o, i) { strokePath(paths[i], true, "rgba(21,21,21," + (o.dashed ? .45 : .7) + ")", o.dashed ? .9 : 1.1, o.dashed); });
    sats.forEach(function (s) {
      var p = posAtMean(s.o, s.M), q = project(p.r, p.th, s.o.tilt || 0);
      if (!occluded(q)) dot(q.x, q.y, 2, "#151515", false);
    });
    tankers.forEach(function (tk) {
      for (var i = 1; i < tk.trail.length; i++) {
        var a = tk.trail[i - 1], b = tk.trail[i];
        if (occluded(a) || occluded(b)) continue;
        ctx.strokeStyle = "rgba(232,89,12," + (i / tk.trail.length * .85).toFixed(3) + ")"; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      var p = tankerPos(tk);
      if (!occluded(p)) dot(p.x, p.y, 3, "#e8590c", true);
    });
    flashes.forEach(function (f) {
      var k = f.age / 1.2;
      ctx.strokeStyle = "rgba(232,89,12," + (1 - k).toFixed(3) + ")"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(f.x, f.y, 4 + k * 16, 0, TAU); ctx.stroke();
    });
    // erase the figure behind the text so the grid and copy stay clean
    var v = narrow ? ctx.createLinearGradient(0, 0, 0, H) : ctx.createLinearGradient(0, 0, W, 0);
    if (narrow) { v.addColorStop(0, "rgba(0,0,0,1)"); v.addColorStop(.5, "rgba(0,0,0,.85)"); v.addColorStop(.7, "rgba(0,0,0,0)"); }
    else { v.addColorStop(0, "rgba(0,0,0,1)"); v.addColorStop(.42, "rgba(0,0,0,.92)"); v.addColorStop(.58, "rgba(0,0,0,0)"); }
    ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
    drawMarks();
    if (!reduced || mouse.inside || glowing) requestAnimationFrame(frame); else running = false;
  }
  function kick() { if (!running) { running = true; last = null; requestAnimationFrame(frame); } }

  /* ---------- Input: grid marks near the cursor (hero only) ---------- */
  hero.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var b = canvas.getBoundingClientRect();
    mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; mouse.inside = false; /* page-wide marks: cursor-grid.js */
    kick();
  });
  hero.addEventListener("pointerleave", function () { mouse.inside = false; });

  resize();
  window.addEventListener("resize", resize);
  kick();
})();
