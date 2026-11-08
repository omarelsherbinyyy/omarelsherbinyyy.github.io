/* ENCORE mission viewer: a schematic of the EVVES transfer, Saturn capture, moon tour,
   Enceladus operations and return, with the delta-v and oxygen budget from Table 3.4 of the thesis.
   Geometry and timing are illustrative; budget values are from the thesis. */
(function () {
  "use strict";
  var stage = document.getElementById("mv-canvas");
  if (!stage) return;
  var chart = document.getElementById("mv-chart");
  var ctx = stage.getContext("2d"), cctx = chart.getContext("2d");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var C = { chem: "#e8590c", ep: "#6a4fc9", coast: "#1f5f99", sun: "#f2a541", venus: "#b08a4a", earth: "#1f5f99", saturn: "#a8875a", grid: "rgba(15,34,51,.28)", text: "#56697a", ink: "#0f2233" };
  var T_END = 13.2;
  var D2R = Math.PI / 180;

  /* ---------- Phases ---------- */
  var PHASES = [
    { t0: 0, t1: 0.06, key: "Launch", title: "Launch on Ariane 64",
      text: "An Ariane 64 from Kourou puts the married Orbiter and Lander stack, about 5,512 kg wet, onto an Earth-escape trajectory at V∞ = 4.2 km/s." },
    { t0: 0.06, t1: 0.42, key: "Energy matching", title: "Energy matching: 4.5 chemical burns",
      text: "The EVVES sequence needs V∞ = 5.2 km/s at departure. The spacecraft acts as its own kick stage: 4.5 buffer-tank burns add 994 m/s, with electrolysis phases of about 30 days in between to refill the H₂/O₂ tanks." },
    { t0: 0.42, t1: 0.55, key: "Oxygen surplus", title: "Surplus oxygen feeds electric propulsion",
      text: "Electrolysis splits water 8:1 oxygen to hydrogen, but the engine burns fuel-rich, so about 595 kg of surplus O₂ builds up. It becomes reaction mass for the electric thrusters, starting with a short arc before Venus." },
    { t0: 0.55, t1: 1.2, key: "Venus ×2", title: "Two Venus flybys",
      text: "The first Venus flyby places the spacecraft on a resonant orbit that brings it back to Venus one Venus year later for a second flyby." },
    { t0: 1.2, t1: 2.1, key: "Earth flyby", title: "Second EP arc and Earth flyby",
      text: "Near apoapsis a second electric arc sets up the Earth flyby, which sends the spacecraft out toward Saturn. No Jupiter flyby is needed, so the launch window is not tied to Jupiter's 20-year alignment." },
    { t0: 2.1, t1: 9.4, key: "Cruise", title: "Long electric cruise to Saturn",
      text: "The longest electric burn lasts 5 to 6 years and lines the velocity up with Saturn's orbit for a low arrival speed. Electric propulsion delivers 6,208 m/s in total." },
    { t0: 9.4, t1: 9.65, key: "Titan capture", title: "Titan resonant capture",
      text: "The low arrival speed allows capture through a sequence of Titan flybys with no orbit insertion burn, saving about 650 m/s compared with a conventional Saturn orbit insertion." },
    { t0: 9.65, t1: 11.5, key: "Moon tour", title: "Moon tour: pumping down to Enceladus",
      text: "About two years of flybys of Titan, Rhea, Dione and Tethys lower the orbit step by step. Two chemical buffer-tank burns of 303 and 328 m/s complete the tour." },
    { t0: 11.5, t1: 12.5, key: "Enceladus ops", title: "Orbiter and lander at Enceladus",
      text: "The stack separates. The lander drills ice, electrolyses the water into propellant, and hops between sites on the South Polar Terrain while the orbiter maps landing zones and relays data. After separation the orbiter holds about 4.28 km/s of capacity and the lander about 250 m/s per water load, refilled from the ice." },
    { t0: 12.5, t1: T_END, key: "Return", title: "Extended mission: Saturn escape and sample return",
      text: "Resonant Titan flybys pump the orbit back up. The conservative escape sequence leaves Saturn in about 250 days, opening an Earth return for samples, a mission once considered impractical from Saturn's gravity well." }
  ];

  /* ---------- Budget events (Table 3.4, earlier iteration: EP Isp 3000 s, Kr neutralizer) ---------- */
  var BURNS = [ { t: .09, dv: 200, o2: 320 }, { t: .16, dv: 211, o2: 399 }, { t: .23, dv: 223, o2: 477 }, { t: .30, dv: 236, o2: 555 }, { t: .37, dv: 124, o2: 595 },
                { t: 10.2, dv: 303 }, { t: 11.0, dv: 328 } ];
  var EP_ARCS = [ [0.42, 0.52], [1.45, 1.75], [2.4, 8.0] ];
  var EP_TOTAL = 6208;
  var epDur = EP_ARCS.reduce(function (a, s) { return a + (s[1] - s[0]); }, 0);

  function chemDv(t) { var s = 0; BURNS.forEach(function (b) { if (t >= b.t) s += b.dv; }); return s; }
  function epDv(t) {
    var done = 0;
    EP_ARCS.forEach(function (a) { done += Math.max(0, Math.min(t, a[1]) - a[0]); });
    return EP_TOTAL * done / epDur;
  }
  function o2(t) {
    if (t < BURNS[0].t) return 242;
    if (t < EP_ARCS[0][0]) { var v = 242; for (var i = 0; i < 5; i++) if (t >= BURNS[i].t) v = BURNS[i].o2; return v; }
    if (t < 8.0) return 595 * (1 - epDv(t) / EP_TOTAL);
    if (t < 10.2) return 0;
    if (t < 11.0) return 78.25;
    if (t < 11.5) return 156.5;
    return 156.5;
  }
  function inEP(t) { return EP_ARCS.some(function (a) { return t >= a[0] && t <= a[1]; }); }
  function phaseAt(t) { for (var i = PHASES.length - 1; i >= 0; i--) if (t >= PHASES[i].t0) return i; return 0; }

  /* ---------- Heliocentric geometry (schematic) ---------- */
  var P_V = 0.6152, P_S = 29.46, R_V = 0.723, R_E = 1.0, R_S = 9.58;
  var T_V1 = 0.55, T_V2 = T_V1 + P_V, T_E = 2.0, T_S = 9.5;
  var TH_V1 = 150, TH_V2 = TH_V1 + 360, TH_E = 720, TH_S = 920;
  var venusTh0 = TH_V1 - 360 * T_V1 / P_V;
  var saturnTh0 = TH_S - 360 * T_S / P_S;
  function venusTh(t) { return venusTh0 + 360 * t / P_V; }
  function earthTh(t) { return 360 * t; }
  function saturnTh(t) { return saturnTh0 + 360 * t / P_S; }
  var smooth = function (u) { return u * u * (3 - 2 * u); };

  function scHelio(t) {
    var u;
    if (t <= T_V1) { u = t / T_V1; return { r: 1 + (R_V - 1) * smooth(u), th: TH_V1 * u }; }
    if (t <= T_V2) { u = (t - T_V1) / (T_V2 - T_V1); return { r: R_V + (1.06 - R_V) * Math.sin(Math.PI * u), th: TH_V1 + 360 * u }; }
    if (t <= T_E) { u = (t - T_V2) / (T_E - T_V2); return { r: R_V + (1.22 - R_V) * Math.sin(Math.PI * u * .82) + (1 - (R_V + (1.22 - R_V) * Math.sin(Math.PI * .82))) * smooth(u), th: TH_V2 + (TH_E - TH_V2) * u }; }
    u = Math.min(1, (t - T_E) / (T_S - T_E));
    var eu = 1 - Math.pow(1 - u, 2.2);
    return { r: Math.exp(Math.log(R_S) * eu), th: TH_E + (TH_S - TH_E) * (1 - Math.pow(1 - u, 1.6)) };
  }

  /* ---------- Saturn-system geometry (schematic, thousand km) ---------- */
  var MOONS = [
    { n: "Enceladus", r: 238, p: 1.37, c: "#0f2233", s: 3.2 },
    { n: "Tethys", r: 295, p: 1.89, c: "#8396a6", s: 2.4 },
    { n: "Dione", r: 377, p: 2.74, c: "#8396a6", s: 2.4 },
    { n: "Rhea", r: 527, p: 4.52, c: "#8396a6", s: 2.8 },
    { n: "Titan", r: 1222, p: 15.95, c: "#b07a2a", s: 4.2 }
  ];
  var VIS_SLOW = 60;
  function moonAng(m, t) { return 1.1 + m.r * .003 + 2 * Math.PI * (t * 365.25 / m.p) / VIS_SLOW; }

  function scSaturn(t) {
    var u;
    if (t < 9.65) {
      u = Math.max(0, (t - 9.4) / 0.25);
      var r0 = 3200, r1 = 1900;
      var rr = r0 + (r1 - r0) * smooth(u);
      return { r: rr, a: Math.PI + 1.3 - 1.6 * (1 - u) };
    }
    if (t < 11.5) {
      u = (t - 9.65) / (11.5 - 9.65);
      var apo = 1900 + (300 - 1900) * smooth(u), peri = 800 + (250 - 800) * smooth(u);
      var a = (apo + peri) / 2, e = (apo - peri) / (apo + peri);
      var revs = 9 * u;
      var M = Math.PI + 2 * Math.PI * revs;
      var E = M; for (var k = 0; k < 6; k++) E = M + e * Math.sin(E);
      var nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
      var r = a * (1 - e * Math.cos(E));
      return { r: r, a: nu + 1.3 };
    }
    var enc = MOONS[0];
    if (t < 12.5) {
      return { r: enc.r, a: moonAng(enc, t), atEnc: true, u: (t - 11.5) };
    }
    u = (t - 12.5) / (T_END - 12.5);
    var ang0 = moonAng(enc, 12.5);
    return { r: enc.r * Math.pow(4200 / enc.r, smooth(u)), a: ang0 + 5.5 * u };
  }

  /* ---------- Canvas sizing ---------- */
  var W, H, dpr, CW, CH;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = stage.clientWidth; H = stage.clientHeight;
    stage.width = W * dpr; stage.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    CW = chart.clientWidth; CH = chart.clientHeight;
    chart.width = CW * dpr; chart.height = CH * dpr; cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function dot(c, x, y, r, col, glow) {
    if (glow) { c.strokeStyle = col; c.lineWidth = 1; c.beginPath(); c.arc(x, y, r + 3, 0, 6.283); c.stroke(); }
    c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 6.283); c.fill();
  }
  function label(c, s, x, y, col) { c.fillStyle = col || C.text; c.font = "500 11px 'IBM Plex Mono', monospace"; c.fillText(s, x, y); }

  /* ---------- Heliocentric view ---------- */
  function drawHelio(t, alpha) {
    if (alpha <= 0) return;
    ctx.save(); ctx.globalAlpha = alpha;
    var cx = W / 2, cy = H / 2, S = (Math.min(W, H) / 2 - 24) / Math.sqrt(R_S);
    var px = function (r, th) { var rr = S * Math.sqrt(r); return [cx + rr * Math.cos(th * D2R), cy - rr * Math.sin(th * D2R)]; };
    [[R_V, "Venus"], [R_E, "Earth"], [R_S, "Saturn"]].forEach(function (o) {
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, S * Math.sqrt(o[0]), 0, 6.283); ctx.stroke();
    });
    dot(ctx, cx, cy, 5, C.sun, true);
    var tt = Math.min(t, T_S);
    // trajectory
    var step = 0.004, prev = null, prevEP = null;
    ctx.lineWidth = 2;
    for (var s = 0; s <= tt + 1e-9; s += step) {
      var p = scHelio(s), q = px(p.r, p.th), ep = inEP(s);
      if (prev) {
        ctx.strokeStyle = ep ? C.ep : C.coast; ctx.globalAlpha = alpha * (ep ? 1 : .85);
        ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
      }
      prev = q; prevEP = ep;
    }
    ctx.globalAlpha = alpha;
    // burns
    BURNS.slice(0, 5).forEach(function (b) {
      if (t >= b.t) { var p = scHelio(b.t), q = px(p.r, p.th); dot(ctx, q[0], q[1], 3, C.chem, true); }
    });
    // planets
    var v = px(R_V, venusTh(tt)), e = px(R_E, earthTh(tt)), sa = px(R_S, saturnTh(tt));
    dot(ctx, v[0], v[1], 4, C.venus); label(ctx, "Venus", v[0] + 7, v[1] - 6);
    dot(ctx, e[0], e[1], 4.5, C.earth); label(ctx, "Earth", e[0] + 7, e[1] - 6);
    dot(ctx, sa[0], sa[1], 6, C.saturn); label(ctx, "Saturn", sa[0] + 9, sa[1] - 8);
    ctx.strokeStyle = C.saturn; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(sa[0], sa[1], 11, 4, -.3, 0, 6.283); ctx.stroke();
    // spacecraft
    var sc = scHelio(tt), sq = px(sc.r, sc.th);
    var burning = BURNS.some(function (b) { return Math.abs(t - b.t) < .012; });
    dot(ctx, sq[0], sq[1], 3.5, burning ? C.chem : (inEP(t) ? C.ep : C.ink), true);
    ctx.restore();
  }

  /* ---------- Saturn view ---------- */
  function drawSaturn(t, alpha) {
    if (alpha <= 0) return;
    ctx.save(); ctx.globalAlpha = alpha;
    var cx = W / 2, cy = H / 2, S2 = (Math.min(W, H) / 2 - 26) / Math.sqrt(1700);
    var pr = function (r) { return S2 * Math.sqrt(r); };
    var pxa = function (r, a) { var rr = pr(r); return [cx + rr * Math.cos(a), cy - rr * Math.sin(a) * .9]; };
    MOONS.forEach(function (m) {
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, pr(m.r), pr(m.r) * .9, 0, 0, 6.283); ctx.stroke();
    });
    // Saturn
    ctx.fillStyle = C.saturn; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 6.283); ctx.fill();
    ctx.strokeStyle = C.saturn; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, 17, 5, -.25, 0, 6.283); ctx.stroke();
    // trail
    var start = Math.max(9.4, t - (t < 11.5 ? 0.45 : 0.6));
    if (t >= 11.5 && t < 12.5) start = t;
    var prev = null;
    ctx.lineWidth = 1.6;
    for (var s = start; s <= t; s += 0.002) {
      var p = scSaturn(s), q = pxa(p.r, p.a);
      if (prev) { ctx.strokeStyle = s > 12.5 ? C.coast : C.coast; ctx.globalAlpha = alpha * (0.15 + .75 * (s - start) / Math.max(1e-3, t - start)); ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
      prev = q;
    }
    ctx.globalAlpha = alpha;
    // moons
    MOONS.forEach(function (m) {
      var q = pxa(m.r, moonAng(m, t));
      dot(ctx, q[0], q[1], m.s, m.c, m.n === "Enceladus");
      label(ctx, m.n, q[0] + 6, q[1] - 6, m.n === "Enceladus" ? C.ink : C.text);
    });
    // spacecraft
    var sc = scSaturn(t), sq;
    if (sc.atEnc) {
      var eq = pxa(MOONS[0].r, moonAng(MOONS[0], t));
      var oa = t * 90;
      sq = [eq[0] + 11 * Math.cos(oa), eq[1] + 11 * Math.sin(oa)];
      ctx.strokeStyle = "rgba(31,95,153,.6)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(eq[0], eq[1], 11, 0, 6.283); ctx.stroke();
      dot(ctx, eq[0] + 2, eq[1] + 3, 2, C.chem); // lander on surface
      label(ctx, "orbiter + lander", eq[0] + 14, eq[1] + 16, C.ink);
    } else sq = pxa(sc.r, sc.a);
    var burning = BURNS.slice(5).some(function (b) { return Math.abs(t - b.t) < .03; });
    dot(ctx, sq[0], sq[1], 3.2, burning ? C.chem : C.ink, true);
    label(ctx, "Saturn system (not to scale)", 14, 22, C.text);
    ctx.restore();
  }

  /* ---------- Budget chart ---------- */
  var DV_MAX = 8000;
  function drawChart(t) {
    cctx.clearRect(0, 0, CW, CH);
    var l = 34, r = 8, tp = 8, b = 18, w = CW - l - r, h = CH - tp - b;
    var X = function (tt) { return l + w * tt / T_END; }, Y = function (v) { return tp + h * (1 - v / DV_MAX); };
    cctx.strokeStyle = "rgba(15,34,51,.15)"; cctx.lineWidth = 1; cctx.fillStyle = "#56697a"; cctx.font = "10px 'IBM Plex Mono', monospace";
    [0, 2000, 4000, 6000, 8000].forEach(function (v) { cctx.beginPath(); cctx.moveTo(l, Y(v)); cctx.lineTo(l + w, Y(v)); cctx.stroke(); cctx.fillText(v / 1000 + "k", 4, Y(v) + 3); });
    [0, 2, 4, 6, 8, 10, 12].forEach(function (y) { cctx.fillText(y + "y", X(y) - 6, CH - 4); });
    // total area (chem + EP), then chem on top
    var N = 400, i, tt;
    cctx.beginPath(); cctx.moveTo(X(0), Y(0));
    for (i = 0; i <= N; i++) { tt = T_END * i / N; cctx.lineTo(X(tt), Y(chemDv(tt) + epDv(tt))); }
    cctx.lineTo(X(T_END), Y(0)); cctx.closePath(); cctx.fillStyle = "rgba(106,79,201,.25)"; cctx.fill();
    cctx.beginPath(); cctx.moveTo(X(0), Y(0));
    for (i = 0; i <= N; i++) { tt = T_END * i / N; cctx.lineTo(X(tt), Y(chemDv(tt))); }
    cctx.lineTo(X(T_END), Y(0)); cctx.closePath(); cctx.fillStyle = "rgba(232,89,12,.5)"; cctx.fill();
    // progress mask
    cctx.fillStyle = "rgba(248,250,251,.7)"; cctx.fillRect(X(t), tp, l + w - X(t), h);
    cctx.strokeStyle = "#0f2233"; cctx.lineWidth = 1.2; cctx.beginPath(); cctx.moveTo(X(t), tp); cctx.lineTo(X(t), tp + h); cctx.stroke();
  }

  /* ---------- UI ---------- */
  var slider = document.getElementById("mv-slider"), playBtn = document.getElementById("mv-play"), timeEl = document.getElementById("mv-time");
  var phLabel = document.getElementById("mv-phase-label"), phTitle = document.getElementById("mv-phase-title"), phText = document.getElementById("mv-phase-text");
  var roChem = document.getElementById("mv-chem"), roEp = document.getElementById("mv-ep"), roO2 = document.getElementById("mv-o2");
  var steps = document.getElementById("mv-steps");
  var warpEl = document.getElementById("mv-warp"), warpEl2 = document.getElementById("mv-warp-m");
  steps.innerHTML = PHASES.map(function (p, i) { return '<button class="filter-btn" type="button" data-i="' + i + '" aria-pressed="false">' + (i + 1) + ". " + p.key + "</button>"; }).join("");

  var t = 0, playing = false, last = null, lastPhase = -1;
  /* Playback: every phase gets a fixed screen time, so short phases are not rushed and the
     multi-year cruise does not drag. The rate is eased between phases to avoid jumps. */
  var PHASE_SECONDS = [3, 6, 4, 6, 5, 8, 4, 7, 6, 5];
  var rateNow = null;
  function render() {
    var k = Math.min(1, Math.max(0, (t - 9.3) / 0.35));
    ctx.clearRect(0, 0, W, H);
    drawHelio(t, 1 - k);
    drawSaturn(t, k);
    drawChart(t);
    var i = phaseAt(t);
    if (i !== lastPhase) {
      var p = PHASES[i];
      phLabel.textContent = "Phase " + (i + 1) + " of " + PHASES.length;
      phTitle.textContent = p.title; phText.textContent = p.text;
      steps.querySelectorAll("button").forEach(function (b, j) { b.setAttribute("aria-pressed", String(j === i)); });
      var act = steps.children[i];
      if (act && steps.scrollWidth > steps.clientWidth) steps.scrollTo({ left: steps.scrollLeft + act.getBoundingClientRect().left - steps.getBoundingClientRect().left - 14, behavior: reduced ? "auto" : "smooth" });
      lastPhase = i;
    }
    timeEl.textContent = "T+ " + t.toFixed(1) + " yr";
    var ph = PHASES[i], rate = playing && rateNow != null ? rateNow : (ph.t1 - ph.t0) / PHASE_SECONDS[i];
    var factor = rate * 365.25 * 86400, days = rate * 365.25;
    var per = days < 60 ? Math.round(days) + " days" : (days / 30.44 < 18 ? Math.round(days / 30.44) + " months" : (days / 365.25).toFixed(1) + " years");
    var fx = factor >= 1e6 ? (factor / 1e6).toFixed(factor >= 1e7 ? 0 : 1) + "M" : Math.round(factor / 1000) + "k";
    warpEl.textContent = "\u00d7" + fx + " \u00b7 1 s \u2248 " + per;
    if (warpEl2) warpEl2.textContent = "\u00d7" + fx;
    roChem.textContent = Math.round(chemDv(t)).toLocaleString("en") + " m/s";
    roEp.textContent = Math.round(epDv(t)).toLocaleString("en") + " m/s";
    roO2.textContent = Math.round(o2(t)) + " kg";
    slider.value = Math.round(1000 * t / T_END);
  }
  function loop(ts) {
    if (!playing) return;
    if (last != null) {
      var dt = (ts - last) / 1000;
      var ph = PHASES[phaseAt(t)], i = phaseAt(t);
      var target = (ph.t1 - ph.t0) / PHASE_SECONDS[i];
      rateNow = rateNow == null ? target : rateNow + (target - rateNow) * Math.min(1, dt / 0.35);
      t += Math.min(dt, .1) * rateNow;
      if (t >= T_END) { t = T_END; setPlaying(false); }
    }
    last = ts; render();
    requestAnimationFrame(loop);
  }
  function setPlaying(v) {
    playing = v; last = null;
    playBtn.innerHTML = v ? "&#10074;&#10074; Pause" : "&#9654; Play";
    playBtn.setAttribute("aria-label", v ? "Pause" : "Play");
    if (v) { if (t >= T_END) t = 0; rateNow = null; requestAnimationFrame(loop); }
  }
  playBtn.addEventListener("click", function () { setPlaying(!playing); });
  slider.addEventListener("input", function () { t = T_END * slider.value / 1000; rateNow = null; render(); });
  steps.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    t = PHASES[+b.getAttribute("data-i")].t0 + 0.0001; rateNow = null; render();
  });
  window.addEventListener("resize", function () { size(); render(); });
  size(); render();
  if (!reduced && "IntersectionObserver" in window) {
    var started = false;
    new IntersectionObserver(function (en) { if (en[0].isIntersecting && !started) { started = true; setPlaying(true); } }, { threshold: .45 }).observe(stage);
  }
})();
