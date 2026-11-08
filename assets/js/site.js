/* Shared behaviour: nav, reveal-on-scroll, hero orbits, project grid + filters + modal, timeline. */
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Projects ---------- */
  var P = window.PROJECTS || [];
  var byId = {};
  P.forEach(function (p) { byId[p.id] = p; });
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var typeName = { research: "Research", design: "Design", industry: "Industry" };

  function cardHTML(p) {
    var media = p.image
      ? '<img src="' + p.image + '" alt="' + esc(p.title) + '" loading="lazy">'
      : '<div class="placeholder">' + esc(p.placeholder || p.title) + "</div>";
    return '<article class="card reveal in" data-id="' + p.id + '">' +
      '<div class="card-media' + (p.contain ? " contain" : "") + '">' + media + (p.logo ? '<span class="card-logo"><img src="' + p.logo + '" alt=""></span>' : "") + (p.gallery && p.gallery.length ? '<span class="card-count">' + (p.gallery.length + 1) + " images</span>" : "") + "</div>" +
      '<div class="card-body">' +
      '<div class="card-meta"><span class="type-badge type-' + p.type + '">' + typeName[p.type] + "</span><span>" + esc(p.period) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.summary) + "</p>" +
      '<div class="chips">' + p.domains.map(function (d) { return '<span class="chip">' + esc(d) + "</span>"; }).join("") + "</div>" +
      '<button class="more" type="button" data-open="' + p.id + '">Details &rarr;</button>' +
      "</div></article>";
  }

  window.cardHTML = cardHTML;

  /* Featured (home) */
  var featured = document.getElementById("featured-projects");
  if (featured) {
    var ids = (featured.getAttribute("data-ids") || "").split(",");
    featured.innerHTML = ids.map(function (id) { return byId[id] ? cardHTML(byId[id]) : ""; }).join("");
  }

  /* Full grid with filters */
  var grid = document.getElementById("project-grid");
  if (grid) {
    var state = { type: "all", domain: "all", q: "" };
    var domains = [];
    P.forEach(function (p) { p.domains.forEach(function (d) { if (domains.indexOf(d) < 0) domains.push(d); }); });
    domains.sort();
    var typeRow = document.getElementById("filter-type");
    var domRow = document.getElementById("filter-domain");
    var search = document.getElementById("project-search");
    var count = document.getElementById("result-count");

    var mkBtn = function (label, key, val) {
      return '<button class="filter-btn" type="button" data-key="' + key + '" data-val="' + esc(val) + '" aria-pressed="' + (state[key] === val) + '">' + esc(label) + "</button>";
    };
    typeRow.insertAdjacentHTML("beforeend", mkBtn("All", "type", "all") + mkBtn("Research", "type", "research") + mkBtn("Design", "type", "design") + mkBtn("Industry", "type", "industry"));
    domRow.insertAdjacentHTML("beforeend", mkBtn("All", "domain", "all") + domains.map(function (d) { return mkBtn(d, "domain", d); }).join(""));

    var params = new URLSearchParams(location.search);
    if (params.get("type")) state.type = params.get("type");
    if (params.get("domain")) state.domain = params.get("domain");

    var render = function () {
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", String(state[b.getAttribute("data-key")] === b.getAttribute("data-val")));
      });
      var q = state.q.toLowerCase();
      var list = P.filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (state.domain !== "all" && p.domains.indexOf(state.domain) < 0) return false;
        if (q) {
          var hay = (p.title + " " + p.org + " " + p.summary + " " + p.body.join(" ") + " " + p.tools.join(" ") + " " + p.domains.join(" ")).toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
      count.textContent = list.length + " of " + P.length + " projects";
      grid.innerHTML = list.length ? list.map(cardHTML).join("") : '<div class="empty">No projects match these filters.</div>';
    };
    document.querySelector(".filters").addEventListener("click", function (e) {
      var b = e.target.closest(".filter-btn");
      if (!b) return;
      state[b.getAttribute("data-key")] = b.getAttribute("data-val");
      render();
    });
    search.addEventListener("input", function () { state.q = search.value.trim(); render(); });
    render();
  }

  /* Modal */
  var modal = document.getElementById("project-modal");
  var lastFocus = null;
  function openModal(id) {
    var p = byId[id];
    if (!p || !modal) return;
    /* slides: optional video, the cover image, then the gallery */
    var slides = [];
    if (p.video) slides.push('<video src="' + p.video + '" poster="' + (p.poster || "") + '" controls muted playsinline loop preload="none"></video>');
    if (p.image && p.image !== p.poster) slides.push('<img src="' + p.image + '" alt="' + esc(p.title) + '">');
    (p.gallery || []).forEach(function (g, k) { slides.push('<img src="' + g + '" alt="' + esc(p.title) + ', image ' + (k + 2) + '" loading="lazy">'); });
    var show = "";
    if (slides.length) {
      show = '<div class="slides" data-i="0"><div class="slide-track">' + slides.map(function (h) { return '<div class="slide">' + h + "</div>"; }).join("") + "</div>" +
        (slides.length > 1 ? '<button class="slide-nav prev" type="button" aria-label="Previous image">&larr;</button><button class="slide-nav next" type="button" aria-label="Next image">&rarr;</button>' +
          '<div class="slide-bar"><span class="slide-count">1 / ' + slides.length + '</span><span class="slide-dots">' + slides.map(function (_, k) { return '<button type="button" data-go="' + k + '" aria-label="Image ' + (k + 1) + '"' + (k ? "" : ' aria-current="true"') + "></button>"; }).join("") + "</span></div>" : "") +
        "</div>";
    }
    modal.querySelector(".modal-panel").innerHTML =
      '<button class="modal-close" type="button" aria-label="Close">&times;</button>' + show +
      '<div class="content">' + (p.logo ? '<span class="modal-logo"><img src="' + p.logo + '" alt="' + esc(p.org.split(",")[0]) + ' logo"></span>' : "") +
      '<div class="card-meta" style="margin-bottom:10px"><span class="type-badge type-' + p.type + '">' + typeName[p.type] + "</span><span>" + esc(p.period) + "</span></div>" +
      '<h2 id="modal-title" style="font-size:1.6rem">' + esc(p.title) + "</h2>" +
      '<p class="muted">' + esc(p.org) + "</p>" +
      p.body.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      '<div class="chips" style="margin-top:14px">' + p.domains.concat(p.tools).map(function (d) { return '<span class="chip">' + esc(d) + "</span>"; }).join("") + "</div>" +
      ((p.link || p.report) ? '<div class="btn-row">' +
        (p.link ? '<a class="btn btn-primary" href="' + p.link + '"' + (/^https?:/.test(p.link) ? ' target="_blank" rel="noopener"' : "") + '>' + esc(p.linkLabel || "More") + " &rarr;</a>" : "") +
        (p.report ? '<a class="btn' + (p.link ? "" : " btn-primary") + '" href="mailto:omarshoukri@gmail.com?subject=' + encodeURIComponent((p.report === true ? "Report request: " : p.report.split(" ").pop().replace(/^./, function (c) { return c.toUpperCase(); }) + " request: ") + p.title) + '">' + esc(p.report === true ? "Request the report" : p.report) + "</a>" : "") +
        "</div>" : "") +
      "</div>";
    initSlides(modal.querySelector(".slides"));
    lastFocus = document.activeElement;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
    history.replaceState(null, "", "#" + id);
  }
  /* Slideshow inside the project pop-up: arrows, dots, keyboard and swipe */
  var activeSlides = null;
  function goSlide(el, i) {
    var n = el.querySelectorAll(".slide").length;
    i = (i + n) % n;
    el.setAttribute("data-i", i);
    el.querySelector(".slide-track").style.transform = "translateX(" + (-100 * i) + "%)";
    var c = el.querySelector(".slide-count"); if (c) c.textContent = (i + 1) + " / " + n;
    el.querySelectorAll(".slide-dots button").forEach(function (b, k) { if (k === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    el.querySelectorAll("video").forEach(function (v) { v.pause(); });
  }
  function initSlides(el) {
    activeSlides = el;
    if (!el || el.querySelectorAll(".slide").length < 2) return;
    el.addEventListener("click", function (e) {
      var i = +el.getAttribute("data-i");
      if (e.target.closest(".prev")) goSlide(el, i - 1);
      else if (e.target.closest(".next")) goSlide(el, i + 1);
      else if (e.target.closest("[data-go]")) goSlide(el, +e.target.closest("[data-go]").getAttribute("data-go"));
    });
    var x0 = null;
    el.addEventListener("pointerdown", function (e) { if (!e.target.closest("button, video")) x0 = e.clientX; });
    el.addEventListener("pointerup", function (e) {
      if (x0 == null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) goSlide(el, +el.getAttribute("data-i") + (dx < 0 ? 1 : -1));
    });
  }

  function closeModal() {
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    var v = modal.querySelector("video"); if (v) v.pause();
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]");
    if (o) { openModal(o.getAttribute("data-open")); return; }
    var card = e.target.closest(".card[data-id]");
    if (card && !e.target.closest("a")) { openModal(card.getAttribute("data-id")); return; }
    if (e.target.closest(".modal-close") || e.target.classList.contains("modal-backdrop")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if (modal && modal.classList.contains("open") && activeSlides && activeSlides.querySelectorAll(".slide").length > 1) {
      if (e.key === "ArrowRight") goSlide(activeSlides, +activeSlides.getAttribute("data-i") + 1);
      if (e.key === "ArrowLeft") goSlide(activeSlides, +activeSlides.getAttribute("data-i") - 1);
    }
  });
  if (modal && location.hash && byId[location.hash.slice(1)]) openModal(location.hash.slice(1));

  /* ---------- Timeline ---------- */
  document.querySelectorAll(".tl-card").forEach(function (c) {
    c.setAttribute("tabindex", "0");
    c.setAttribute("role", "button");
    var item = c.closest(".tl-item");
    var flip = function () { item.classList.toggle("open"); c.setAttribute("aria-expanded", item.classList.contains("open")); };
    c.addEventListener("click", flip);
    c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  });
  var tlFilters = document.getElementById("tl-filters");
  if (tlFilters) {
    tlFilters.addEventListener("click", function (e) {
      var b = e.target.closest(".filter-btn"); if (!b) return;
      var k = b.getAttribute("data-val");
      tlFilters.querySelectorAll(".filter-btn").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      document.querySelectorAll(".tl-item").forEach(function (it) {
        it.style.display = (k === "all" || it.getAttribute("data-kind") === k) ? "" : "none";
      });
    });
  }

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
