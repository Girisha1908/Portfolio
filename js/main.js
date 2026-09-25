/* Girisha Anamala: portfolio behaviour. Content lives in js/content.js */
(() => {
  "use strict";
  const P = window.PROFILE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const NEW_TAB = '<span class="sr-only"> (opens in a new tab)</span>';
  const extLink = (url, label, cls = "") => `<a${cls ? ` class="${cls}"` : ""} href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}${NEW_TAB} ↗</a>`;
  const html = document.documentElement;

  /* ---------- config → static links ---------- */
  $$(".js-email").forEach(a => { a.href = `mailto:${P.email}`; a.textContent = P.email; });
  $$(".js-github").forEach(a => (a.href = P.links.github));
  $$(".js-linkedin").forEach(a => (a.href = P.links.linkedin));
  $$(".js-resume").forEach(a => { if (P.resumeUrl) a.href = P.resumeUrl; else a.hidden = true; });

  /* =========================================================
     Pause registry (graph replay pauses for any active reason)
     ========================================================= */
  const pauseReasons = new Set();
  let onResume = () => {};
  const pause = r => { pauseReasons.add(r); stopGraph(); };
  const resume = r => { pauseReasons.delete(r); if (!pauseReasons.size) onResume(); };

  /* =========================================================
     Commit graph: scaling
     ========================================================= */
  const wrap = $("#graph-wrap");
  const graph = $("#graph");
  const GW = 930;
  const fit = () => {
    const s = Math.min(1, (wrap.clientWidth - 12) / GW);
    wrap.style.setProperty("--s", s.toFixed(4));
    wrap.classList.toggle("is-compact", s < 0.6);
  };
  new ResizeObserver(fit).observe(wrap);
  fit();

  /* =========================================================
     Commit graph: lane highlight segments + HEAD tag
     ========================================================= */
  const C = {
    p: [175, 70], o1: [325, 70], r: [475, 70], t: [625, 70],
    f: [100, 210], o2: [250, 210], l: [400, 210], i: [550, 210], o3: [700, 210], merge: [855, 70]
  };
  const SEG = {
    p: [["main", "M14 140 C14 95 40 70 90 70 L175 70"]],
    o1: [["main", "M175 70 L325 70"]],
    r: [["main", "M325 70 L475 70"]],
    t: [["main", "M475 70 L625 70"]],
    f: [["feature", "M14 140 C14 185 40 210 90 210 L100 210"]],
    o2: [["feature", "M100 210 L250 210"]],
    l: [["feature", "M250 210 L400 210"]],
    i: [["feature", "M400 210 L550 210"]],
    o3: [["feature", "M550 210 L700 210"]],
    merge: [["main", "M625 70 L855 70"], ["feature", "M700 210 L855 210"]]
  };
  const ORDER = ["p", "o1", "r", "t", "f", "o2", "l", "i", "o3", "merge"];
  const hi = $("#lane-hi");
  const segEls = {};
  const NS = "http://www.w3.org/2000/svg";
  ORDER.forEach(id => {
    segEls[id] = SEG[id].map(([lane, d]) => {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("pathLength", "1");
      path.setAttribute("class", `lane lane-${lane}`);
      hi.appendChild(path);
      return path;
    });
  });
  const nodeEl = id => $(`.node[data-node="${id}"]`, graph);
  const head = $("#head-tag");
  const moveHead = id => {
    const [x, y] = C[id];
    head.style.setProperty("--hx", x);
    head.style.setProperty("--hy", y > 140 ? 346 : 10);
  };
  moveHead("merge");

  /* =========================================================
     Commit graph: automatic replay
     ========================================================= */
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => { while (timers.length) clearTimeout(timers.pop()); };
  let running = false;

  const resetGraph = () => {
    hi.classList.add("no-anim");
    hi.classList.remove("is-glow", "is-fading");
    $$(".lane", hi).forEach(p => p.classList.remove("is-drawn"));
    $$(".node", graph).forEach(n => n.classList.remove("is-pressed", "is-pulse"));
    void hi.getBoundingClientRect();
    hi.classList.remove("no-anim");
    moveHead("merge");
  };

  const STEP = 340, DRAW = 160, HOLD = 170;
  const runLoop = () => {
    let t = 0;
    ORDER.forEach(id => {
      const isMerge = id === "merge";
      later(() => segEls[id].forEach(p => p.classList.add("is-drawn")), t);
      later(() => {
        const n = nodeEl(id);
        n.classList.remove("is-pulse"); void n.offsetWidth;
        n.classList.add("is-pressed", "is-pulse");
        moveHead(id);
        if (isMerge) hi.classList.add("is-glow");
      }, t + DRAW);
      later(() => nodeEl(id).classList.remove("is-pressed"), t + DRAW + (isMerge ? 420 : HOLD));
      later(() => nodeEl(id).classList.remove("is-pulse"), t + DRAW + 600);
      t += isMerge ? STEP + 420 : STEP;
    });
    later(() => hi.classList.remove("is-glow"), t + 300);
    later(() => hi.classList.add("is-fading"), t + 1400);
    later(resetGraph, t + 1850);
    later(runLoop, t + 2400);
  };
  const startGraph = () => {
    if (running || reduceMotion.matches || pauseReasons.size) return;
    running = true;
    resetGraph();
    later(runLoop, 500);
  };
  function stopGraph() { clearTimers(); running = false; resetGraph(); }
  onResume = () => { clearTimers(); later(startGraph, 600); };

  graph.addEventListener("pointerenter", () => pause("pointer"));
  graph.addEventListener("pointerleave", () => resume("pointer"));
  graph.addEventListener("focusin", () => pause("focus"));
  graph.addEventListener("focusout", e => { if (!graph.contains(e.relatedTarget)) resume("focus"); });
  document.addEventListener("visibilitychange", () => (document.hidden ? pause("hidden") : resume("hidden")));
  reduceMotion.addEventListener?.("change", () => (reduceMotion.matches ? stopGraph() : startGraph()));

  /* =========================================================
     Loader: "hi" in every language I speak, one by one
     ========================================================= */
  const LANG_CODE = { english: "en", hindi: "hi", marathi: "mr", telugu: "te", tamil: "ta", kannada: "kn", malayalam: "ml", bengali: "bn", gujarati: "gu", urdu: "ur", french: "fr", spanish: "es", german: "de", japanese: "ja" };
  const loader = $("#loader");
  const runLoader = () => {
    if (!html.classList.contains("intro") || !loader) { loader?.remove(); startGraph(); return; }
    pause("loader");
    html.classList.add("modal-open");
    const word = $("#loader-word"), lang = $("#loader-lang"), cmd = $("#loader-cmd"), dots = $("#loader-dots");
    const G = P.greetings;
    dots.innerHTML = G.map(() => "<li></li>").join("") + "<li class='is-final'></li>";
    const dotEls = $$("li", dots);
    const lt = [];
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      lt.forEach(clearTimeout);
      try { sessionStorage.setItem("seenIntro", "1"); } catch (e) { /* storage blocked: fine */ }
      loader.classList.add("is-leaving");
      html.classList.remove("modal-open");
      setTimeout(() => { loader.remove(); html.classList.remove("intro"); resume("loader"); }, reduceMotion.matches ? 250 : 900);
    };
    const show = (g, i) => {
      word.classList.remove("is-in"); word.classList.add("is-out");
      lt.push(setTimeout(() => {
        word.textContent = g.text;
        word.lang = LANG_CODE[g.lang] || "en";
        word.dataset.script = g.script || "latin";
        lang.textContent = g.lang;
        cmd.textContent = i < G.length ? `say hi --lang=${g.lang}` : "git checkout portfolio";
        word.classList.remove("is-out"); void word.offsetWidth; word.classList.add("is-in");
        dotEls.forEach((d, j) => d.classList.toggle("is-on", j <= i));
      }, 180));
    };
    $("#loader-skip").addEventListener("click", finish);
    loader.addEventListener("click", e => { if (e.target === loader) finish(); });
    document.addEventListener("keydown", function k(e) { if (!done && (e.key === "Escape" || e.key === "Enter" || e.key === " ")) { e.preventDefault(); finish(); } if (done) document.removeEventListener("keydown", k); });

    if (reduceMotion.matches) {
      word.textContent = G.map(g => g.text).join(" · ");
      word.classList.add("is-static");
      lang.textContent = G.map(g => g.lang).join(" · ");
      dotEls.forEach(d => d.classList.add("is-on"));
      lt.push(setTimeout(finish, 1600));
      return;
    }
    const PER = 640;
    G.forEach((g, i) => lt.push(setTimeout(() => show(g, i), 200 + i * PER)));
    lt.push(setTimeout(() => show({ text: "hi, i’m girisha.", lang: "welcome in", script: "latin" }, G.length), 200 + G.length * PER));
    lt.push(setTimeout(finish, 200 + G.length * PER + 1100));
    lt.push(setTimeout(finish, 9000)); // hard safety
  };

  /* =========================================================
     Marquee
     ========================================================= */
  const MARQUEE = "Real problems. Shipped products. <b>//</b> I find broken workflows and build the 0→1 fix, from PRD to production. <b>//</b> Pick a commit. <b>//</b>";
  const groups = $$(".marquee-group");
  const buildMarquee = () => {
    const [g1, g2] = groups;
    g1.innerHTML = "";
    let guard = 0;
    do {
      const span = document.createElement("span");
      span.className = "marquee-item";
      span.innerHTML = MARQUEE;
      g1.appendChild(span);
    } while (g1.scrollWidth < window.innerWidth + 40 && ++guard < 24);
    g2.innerHTML = g1.innerHTML;
    const w = g1.getBoundingClientRect().width;
    $(".marquee-track").style.setProperty("--marquee-dur", `${(w / 50).toFixed(2)}s`);
  };
  let mqTimer, lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(mqTimer); mqTimer = setTimeout(buildMarquee, 150);
  });
  buildMarquee();
  document.fonts?.ready.then(buildMarquee);

  /* =========================================================
     Page renderers
     ========================================================= */
  const num = i => String(i + 1).padStart(2, "0");
  const contactBlock = () => `
    <div class="b-contact">
      ${extLink(P.links.linkedin, "linkedin", "contact-btn")}
      ${extLink(P.links.github, "github", "contact-btn")}
      <a class="contact-btn" href="mailto:${esc(P.email)}">email ↗</a>
    </div>
    <p class="b-handles"><span>github: ${esc(P.links.githubHandle)}</span><span>linkedin: ${esc(P.links.linkedinHandle)}</span><span>email: ${esc(P.email)}</span></p>`;

  const docLink = l => `<a class="doc-link" href="${esc(l.url)}" target="_blank" rel="noopener"><svg viewBox="0 0 16 20" aria-hidden="true" focusable="false"><path d="M2 1h8l4 4v14H2z"/><path d="M10 1v4h4"/><path d="M5 11h6M5 14h6"/></svg>${esc(l.label)}${NEW_TAB}</a>`;
  const rowsTable = rows => `<dl class="story-bullets">${rows.map(b => `<div><dt>${esc(b.k)}</dt><dd>${esc(b.v)}</dd></div>`).join("")}</dl>`;
  const story = (p, i, big = false) => `
    <article class="story${big ? " story-big" : ""}" style="--story:${FOLDER_COL[i]}">
      <header class="story-head">
        ${big ? "" : `<p class="story-kicker"><span>${num(i)}</span> ${esc(p.kicker)}</p>`}
        ${big ? "" : `<h3 class="story-title">${esc(p.name.toLowerCase())}</h3>`}
        <p class="story-commit"><code>${esc(p.commit)}</code></p>
        <p class="story-badges">
          ${p.rank ? `<span class="badge badge-rank">mission rank: ${esc(p.rank)}</span>` : ""}
          ${p.team ? `<span class="badge">${esc(p.team)}</span>` : ""}
        </p>
        <p class="story-stack">stack: ${p.stack.map(esc).join(" · ")}</p>
      </header>
      <div class="story-body">
        ${p.story.map(t => `<p>${esc(t)}</p>`).join("")}
        ${p.lines ? `<p class="b-lines">${p.lines.map(l => `<span>${esc(l)}</span>`).join("")}</p>` : ""}
        ${p.bullets ? rowsTable(p.bullets) : ""}
        ${p.unlock ? `<p class="story-unlock"><code>${esc(p.unlock)}</code></p>` : ""}
        ${p.core ? `<div class="story-core"><p class="story-label">core idea</p>${p.core.map(l => `<p>${esc(l)}</p>`).join("")}</div>` : ""}
        ${p.result ? `<p class="story-result"><span class="story-label">result</span> ${esc(p.result)}</p>` : ""}
        ${p.links.length ? `<p class="story-links">${p.links.filter(l => !l.doc).map(l => extLink(l.url, l.label)).join("")}${p.links.filter(l => l.doc).map(docLink).join("")}</p>` : ""}
      </div>
    </article>`;

  const BLOCK = {
    lead: b => `<p class="b-lead">${esc(b.lead)}</p>`,
    p: b => `<p class="b-p">${esc(b.p)}</p>`,
    lines: b => `<p class="b-lines">${b.lines.map(l => `<span>${esc(l)}</span>`).join("")}</p>`,
    h: b => `<h3 class="b-h">${esc(b.h)}</h3>`,
    list: b => `<ul class="b-list">${b.list.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`,
    chips: b => `<div class="b-chips">${b.label ? `<p class="b-label">${esc(b.label)}</p>` : ""}<ul>${b.chips.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`,
    stats: b => `<dl class="b-stats">${b.stats.map(s => `<div><dt${s.v.length > 5 ? ' class="is-long"' : ""}>${esc(s.v)}</dt><dd>${esc(s.l)}</dd></div>`).join("")}</dl>`,
    groups: b => `<div class="b-groups">${b.groups.map(g => `<section><h3 class="b-label">${esc(g.title)}</h3><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></section>`).join("")}</div>`,
    trio: b => `<div class="b-trio">${b.trio.map(t => `<div><p class="trio-t">${esc(t.t)}</p><p>${esc(t.d)}</p></div>`).join("")}</div>`,
    cards: b => `<div class="b-cards">${b.cards.map(c => `
      <article class="${c.image ? "has-image" : ""}">
        <div class="card-main">
          <p class="badge">${esc(c.tag)}</p>
          <h3>${esc(c.t)}</h3>
          ${c.meta ? `<p class="card-meta">${esc(c.meta)}</p>` : ""}
          ${c.lines.map(l => `<p>${esc(l)}</p>`).join("")}
        </div>
        ${c.image ? `<div class="card-cert"><a href="${esc(c.image.href || c.image.src)}" target="_blank" rel="noopener"><img src="${esc(c.image.src)}" alt="${esc(c.image.alt)}" loading="lazy"><span>view certificate ↗</span><span class="sr-only"> (opens in a new tab)</span></a>${c.verify ? `<a class="cert-verify" href="${esc(c.verify)}" target="_blank" rel="noopener">verify on credly ↗<span class="sr-only"> (opens in a new tab)</span></a>` : ""}</div>` : ""}
        ${c.rows || c.chips ? `<div class="card-full">
          ${c.rows ? rowsTable(c.rows) : ""}
          ${c.chips ? `<div class="b-chips"><p class="b-label">technology used</p><ul>${c.chips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
        </div>` : ""}
      </article>`).join("")}</div>`,
    timeline: b => `<ol class="log">${b.timeline.map(x => `<li><time>${esc(x.date)}</time><div class="log-body"><strong>${esc(x.role)}</strong><span class="org">${esc(x.org)}</span></div></li>`).join("")}</ol>`,
    projects: () => `<div class="stories">${P.projects.map((p, i) => story(p, i)).join("")}</div>`,
    articles: b => `<ol class="b-articles">${b.articles.map((a, i) => `
      <li class="${a.url ? "" : "is-draft"}">
        <span class="art-num">${num(i)}</span>
        ${a.url ? `<a href="${esc(a.url)}" class="art-title">${esc(a.title)}</a>` : `<span class="art-title">${esc(a.title)}</span>`}
        <span class="art-status">${a.url ? "read →" : "draft · coming soon"}</span>
      </li>`).join("")}</ol>`,
    contact: () => contactBlock(),
    sign: b => `<p class="b-sign">${esc(b.sign)}</p>`,
    cta: () => `<p><button type="button" class="b-cta" data-goto="#work">open the archive box ↓</button></p>`,
    resume: () => (P.resumeUrl ? `<p>${extLink(P.resumeUrl, "download resume", "contact-btn")}</p>` : ""),
    soon: b => `<p class="soon">${esc(b.soon)}</p>`,
    github: () => `<div class="b-github" data-gh-slot>${ghCards(ghRepos || [])}</div>`,
    photo: b => `<figure class="b-photo"><img src="${esc(b.photo.src)}" alt="${esc(b.photo.alt)}" loading="lazy">${b.photo.caption ? `<figcaption>${esc(b.photo.caption)}</figcaption>` : ""}</figure>`,
    sub: b => `<h3 class="b-sub">${esc(b.sub)}</h3>`,
    meta: b => `<p class="b-meta">${esc(b.meta)}</p>`
  };
  const renderBlocks = blocks => blocks.map(b => { const k = Object.keys(b).find(k => BLOCK[k]); return k ? BLOCK[k](b) : ""; }).join("");

  /* =========================================================
     GitHub auto-feed
     ========================================================= */
  let ghRepos = null;
  const GH = P.github || {};
  const curated = new Set(P.projects.flatMap(p => p.links.map(l => l.url.toLowerCase().replace(/\/$/, ""))));
  const ago = iso => {
    const d = (Date.now() - new Date(iso)) / 864e5;
    if (d < 1) return "today";
    if (d < 2) return "yesterday";
    if (d < 30) return `${Math.floor(d)} days ago`;
    if (d < 365) return `${Math.floor(d / 30)} mo ago`;
    return `${Math.floor(d / 365)} yr ago`;
  };
  const prettyName = n => n.replace(/[-_]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  const ghCards = repos => repos.length ? `<ul class="gh-list">${repos.map(r => `
    <li class="gh-card">
      <p class="gh-meta"><span class="gh-lang" style="--lang:${LANG_COLOR[r.language] || "#8b93b0"}"></span>${esc(r.language || "code")}<span>· updated ${esc(ago(r.pushed_at))}</span>${r.stargazers_count ? `<span>· ★ ${r.stargazers_count}</span>` : ""}</p>
      <h3>${esc(prettyName(r.name))}</h3>
      <p class="gh-desc">${esc(r.description || "")}</p>
      ${r.topics?.length ? `<ul class="gh-topics">${r.topics.filter(x => x !== GH.topic).slice(0, 4).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      <p class="gh-links">${extLink(r.html_url, "code")}${r.homepage ? extLink(r.homepage, "live") : ""}</p>
    </li>`).join("")}</ul>` : "";
  const LANG_COLOR = { JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572a5", Java: "#b07219", Kotlin: "#a97bff", HTML: "#e34c26", CSS: "#663399", "C++": "#f34b7d", C: "#555555", Go: "#00add8", Dart: "#00b4ab", Shell: "#89e051", "Jupyter Notebook": "#da5b0b" };

  const pickRepos = all => all
    .filter(r => !r.fork && !r.archived && !r.private)
    .filter(r => !(GH.exclude || []).map(x => x.toLowerCase()).includes(r.name.toLowerCase()))
    .filter(r => !(r.topics || []).includes("hide-from-portfolio"))
    .filter(r => !curated.has(r.html_url.toLowerCase()))
    .filter(r => GH.mode === "topic" ? (r.topics || []).includes(GH.topic) : !!r.description)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, GH.limit || 9);

  const loadGithub = async () => {
    if (!GH.user) return;
    const KEY = `gh-repos:${GH.user}`;
    let data = null;
    try { const c = JSON.parse(localStorage.getItem(KEY) || "null"); if (c && Date.now() - c.t < 36e5) data = c.d; } catch (e) { /* storage blocked */ }
    if (!data) {
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(GH.user)}/repos?per_page=100&sort=pushed`, { headers: { Accept: "application/vnd.github+json" } });
        if (!res.ok) throw new Error(res.status);
        data = (await res.json()).map(r => ({ name: r.name, description: r.description, html_url: r.html_url, homepage: r.homepage, language: r.language, topics: r.topics, pushed_at: r.pushed_at, stargazers_count: r.stargazers_count, fork: r.fork, archived: r.archived, private: r.private }));
        try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: data })); } catch (e) { /* ignore */ }
      } catch (e) {
        try { const c = JSON.parse(localStorage.getItem(KEY) || "null"); if (c) data = c.d; } catch (e2) { /* ignore */ }
      }
    }
    if (!data) return; // offline or rate-limited: the section simply stays hidden
    ghRepos = pickRepos(data);
    if (!ghRepos.length) return;
    $("#gh-grid").outerHTML = ghCards(ghRepos).replace('<ul class="gh-list">', '<ul class="gh-list" id="gh-grid">');
    $("#github").hidden = false;
    $$("[data-gh-slot]").forEach(el => (el.innerHTML = ghCards(ghRepos)));
  };
  loadGithub();

  /* =========================================================
     Full-page viewer
     ========================================================= */
  const FOLDER_COL = ["#ff7869", "#fff1ad", "#b9d9ff", "#c9b8ff"];
  const view = $("#page-view");
  const scroller = $("#pv-scroll");
  let current = null, lastTrigger = null, skipFocusReturn = false, closing = false;

  const pageList = key => key.startsWith("project:") ? P.projects.map(p => `project:${p.id}`) : ORDER;
  const labelFor = key => {
    if (key.startsWith("project:")) { const p = P.projects.find(x => `project:${x.id}` === key); return p.name.toLowerCase(); }
    return P.pages[key].commit;
  };

  const fill = key => {
    current = key;
    view.classList.remove("is-blog");
    let face, base, bubble, branch, commit, eyebrow, title, meta, body;
    if (key.startsWith("project:")) {
      const i = P.projects.findIndex(x => `project:${x.id}` === key);
      const p = P.projects[i];
      face = FOLDER_COL[i]; base = "#18203a";
      bubble = num(i); branch = "main"; commit = `repo ${num(i)} · ${p.commit}`;
      eyebrow = p.kicker; title = p.name.toLowerCase(); meta = p.tagline.toLowerCase();
      body = story(p, i, true);
    } else {
      const pg = P.pages[key];
      const n = nodeEl(key);
      face = n.style.getPropertyValue("--face"); base = n.style.getPropertyValue("--base");
      bubble = $(".node-letter", n)?.textContent || "";
      branch = pg.branch; commit = pg.commit;
      eyebrow = pg.eyebrow || pg.commit; title = pg.title; meta = pg.meta || "";
      body = renderBlocks(pg.blocks);
      if (pg.blog) view.classList.add("is-blog");
    }
    view.style.setProperty("--pv-face", face);
    view.style.setProperty("--pv-base", base);
    const bub = $("#pv-bubble");
    if (key === "merge") bub.innerHTML = '<svg viewBox="0 0 76 100" focusable="false"><path d="M22 18 V82"/><path d="M56 36 C56 62 22 56 22 72"/><circle cx="22" cy="16" r="10"/><circle cx="56" cy="30" r="10"/><circle cx="22" cy="84" r="10"/></svg>';
    else bub.textContent = bubble;
    bub.classList.toggle("is-merge", key === "merge");
    bub.classList.toggle("is-num", key.startsWith("project:"));
    $("#pv-branch").textContent = branch;
    $("#pv-commit").textContent = commit;
    $("#pv-eyebrow").textContent = eyebrow;
    $("#pv-title").textContent = title;
    $("#pv-meta").textContent = meta;
    $("#pv-meta").hidden = !meta;
    $("#pv-body").innerHTML = body;

    const list = pageList(key), idx = list.indexOf(key);
    const prev = list[idx - 1], next = list[idx + 1];
    $("#pv-prev").disabled = !prev;
    $("#pv-next").disabled = !next;
    $("#pv-foot").innerHTML = `
      ${prev ? `<button type="button" class="pv-foot-btn" data-open="${prev}"><span>← previous</span><code>${esc(labelFor(prev))}</code></button>` : "<span></span>"}
      ${next ? `<button type="button" class="pv-foot-btn is-next" data-open="${next}"><span>next →</span><code>${esc(labelFor(next))}</code></button>` : `<button type="button" class="pv-foot-btn is-next" data-close><span>back to</span><code>the graph</code></button>`}`;
    scroller.scrollTop = 0;
  };

  const originOf = el => {
    if (!el || !el.getBoundingClientRect) return [innerWidth / 2, innerHeight / 2];
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  };
  const bubbleAnim = (el, reverse) => {
    if (reduceMotion.matches) return view.animate([{ opacity: reverse ? 1 : 0 }, { opacity: reverse ? 0 : 1 }], { duration: 160 });
    const [x, y] = originOf(el);
    const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 40;
    const from = `circle(36px at ${x}px ${y}px)`, to = `circle(${R}px at ${x}px ${y}px)`;
    return view.animate([{ clipPath: reverse ? to : from }, { clipPath: reverse ? from : to }], { duration: reverse ? 380 : 560, easing: "cubic-bezier(.7,0,.2,1)" });
  };

  const openPage = (key, trigger) => {
    if (!key.startsWith("project:") && !P.pages[key]) return;
    fill(key);
    lastTrigger = trigger || document.activeElement;
    pause("page");
    html.classList.add("modal-open");
    if (!view.open) { view.showModal(); bubbleAnim(trigger); }
    $("#pv-title").focus({ preventScroll: true });
  };
  const closePage = () => {
    if (!view.open || closing) return;
    closing = true;
    const a = bubbleAnim(skipFocusReturn ? null : lastTrigger, true);
    a.onfinish = () => { view.close(); closing = false; };
  };
  view.addEventListener("cancel", e => { e.preventDefault(); closePage(); });
  view.addEventListener("close", () => {
    html.classList.remove("modal-open");
    if (!skipFocusReturn && lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
    skipFocusReturn = false;
    resume("page");
  });
  view.addEventListener("keydown", e => {
    if (e.target.closest("input, textarea")) return;
    if (e.key === "ArrowRight" && !$("#pv-next").disabled) { e.preventDefault(); $("#pv-next").click(); }
    if (e.key === "ArrowLeft" && !$("#pv-prev").disabled) { e.preventDefault(); $("#pv-prev").click(); }
  });
  const step = d => { const list = pageList(current); const k = list[list.indexOf(current) + d]; if (k) { fill(k); $("#pv-title").focus({ preventScroll: true }); } };
  $("#pv-prev").addEventListener("click", () => step(-1));
  $("#pv-next").addEventListener("click", () => step(1));

  document.addEventListener("click", e => {
    const inView = view.contains(e.target);
    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn && inView) return closePage();
    const openBtn = e.target.closest("[data-open]");
    if (openBtn && inView) { fill(openBtn.dataset.open); $("#pv-title").focus({ preventScroll: true }); return; }
    const pageT = e.target.closest("[data-page]");
    if (pageT) { e.preventDefault(); return openPage(pageT.dataset.page, pageT); }
    const proj = e.target.closest(".project-pill, .project-folder");
    if (proj) { unhighlight(); return openPage(`project:${proj.dataset.project}`, proj); }
    const go = e.target.closest("[data-goto]");
    if (go) {
      skipFocusReturn = true;
      view.close();
      const target = $(go.dataset.goto);
      target.setAttribute("tabindex", "-1");
      if (go.dataset.goto === "#top") window.scrollTo({ top: 0, behavior: "auto" });
      else target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
      target.focus({ preventScroll: true });
    }
  });

  /* =========================================================
     Work section: pills + folders
     ========================================================= */
  const CARD = [["var(--card-lavender)", "#7665b5"], ["var(--card-yellow)", "#9d7720"], ["var(--card-blue)", "#4b76b5"], ["var(--card-pink)", "#a35d84"]];
  const FOLDER = ["folder-one", "folder-two", "folder-three", "folder-four"];
  const list = $("#project-list");
  const deck = $("#folder-deck");
  const archive = $("#archive");

  list.innerHTML = P.projects.map((p, i) => `
    <li><button type="button" class="project-pill" data-project="${p.id}" style="--card:${CARD[i][0]};--num:${CARD[i][1]}"
        aria-label="${esc(p.name)}: ${esc(p.tagline)} Open the full story">
      <span class="pill-num" aria-hidden="true">${num(i)}</span>
      <span aria-hidden="true">
        <span class="pill-title">${esc(p.name)}</span>
        <span class="pill-desc">${esc(p.tagline)} ${esc(p.blurb)}</span>
        <span class="pill-tags">${p.tags.map(esc).join(" · ")}</span>
      </span>
      <span class="pill-arrow" aria-hidden="true">↗</span>
    </button></li>`).join("");

  deck.innerHTML = P.projects.map((p, i) => `
    <button type="button" class="project-folder ${FOLDER[i]}" data-project="${p.id}" aria-label="Open ${esc(p.name)} full story">
      <span class="folder-tab" aria-hidden="true">${num(i)} / ${esc(p.name)}</span>
      <span class="folder-face" aria-hidden="true">
        <small>REPO / ${num(i)}</small>
        <strong class="folder-logo">${p.folderName}</strong>
        <span class="folder-open">OPEN REPO ↗</span>
      </span>
    </button>`).join("");

  const folderFor = id => $(`.project-folder[data-project="${id}"]`, deck);
  const highlight = id => { archive.classList.add("is-open"); folderFor(id)?.classList.add("is-active"); };
  function unhighlight() { archive.classList.remove("is-open"); $$(".project-folder", deck).forEach(f => f.classList.remove("is-active")); }
  $$(".project-pill", list).forEach(b => {
    const id = b.dataset.project;
    b.addEventListener("pointerenter", () => highlight(id));
    b.addEventListener("pointerleave", unhighlight);
    b.addEventListener("focus", () => highlight(id));
    b.addEventListener("blur", unhighlight);
  });

  /* go */
  runLoader();
})();
