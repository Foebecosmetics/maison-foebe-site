/**
 * foebe-shell.js — Maison Foébé
 * Version V10.0 — navigation hiérarchisée stable + Dictionnaire standard
 *
 * À déposer à la racine du site, au même niveau que index.html.
 * Appel recommandé avant </body> : <script src="/foebe-shell.js"></script>
 * En Astro : <script is:inline src="/foebe-shell.js"></script>
 */
(function () {
  "use strict";


  /* ═══════════════════════════════════════════════════════════════════════════
     0. THÈME — appliqué immédiatement (fallback)
     Le thème sauvegardé est appliqué dès l'exécution du Shell, sans loader.
  ═══════════════════════════════════════════════════════════════════════════ */
  (function () {
    try {
      var saved = localStorage.getItem("foebeTheme");
      if (saved === "day" || saved === "night") {
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch (e) {}
  })();

  /* ═══════════════════════════════════════════════════════════════════════════
     1. CSS PARTAGÉ — nav, menu, footer, responsive
  ═══════════════════════════════════════════════════════════════════════════ */
  /* CSS du Shell chargé depuis /styles/foebe-shell.css pour réduire le JavaScript exécuté. */

  /* ═══════════════════════════════════════════════════════════════════════════
     2. DÉTECTION DE LA PAGE COURANTE
  ═══════════════════════════════════════════════════════════════════════════ */
  var currentPath = (window.location.pathname || "/").split("?")[0].split("#")[0].replace(/\/+$/g, "");
  var currentFile = "index.html";
  if (currentPath && currentPath !== "/") {
    if (/\/boussole\/scenarios$/i.test(currentPath) || /\/boussole\/scenario$/i.test(currentPath)) {
      currentFile = "boussole-scenarios.html";
    } else {
      currentFile = (currentPath.split("/").pop() || "index.html");
    }
  }

  /*
   * Normalisation page active — Maison Foébé
   * Permet à l'état actif du menu de fonctionner aussi pendant les tests locaux
   * avec des fichiers versionnés : methode-v7.html, pratiquer-maison-foebe-v9.html, etc.
   */
  function normalizeCurrentFile(file) {
    file = String(file || "index.html").toLowerCase();
    try { file = decodeURIComponent(file); } catch (e) {}
    file = file.split("?")[0].split("#")[0];
    file = file.replace(/^\/+|\/+$/g, "");
    file = file.replace(/\/index$/i, "");
    file = file.replace(/\.html?$/i, "");

    if (file === "" || file === "/" || file === "index" || file.indexOf("index-") === 0 || file.indexOf("index_") === 0) return "index.html";

    if (file === "comprendre" || file.indexOf("comprendre") === 0) return "comprendre.html";
    if (file === "pratiquer" || file.indexOf("pratiquer") === 0) return "pratiquer.html";
    if (file === "methode" || file === "méthode" || file.indexOf("methode") === 0 || file.indexOf("méthode") === 0) return "methode.html";
    if (file === "a-propos" || file.indexOf("a-propos") === 0 || file.indexOf("apropos") === 0) return "a-propos.html";

    if (file === "test" || file.indexOf("test") === 0 || file.indexOf("testpratiquer") === 0 || file.indexOf("echelle") === 0 || file.indexOf("échelle") === 0) return "echelle-foebe.html";
    if (file === "zones" || file.indexOf("zones") === 0) return "zones.html";
    if (file === "respiration" || file.indexOf("respiration") === 0) return "respiration.html";

    if (file === "boussole-scenarios" || file.indexOf("boussole-scenarios") === 0 || file === "boussole/scenarios" || file === "boussole/scenario" || file === "scenarios" || file === "scenario" || file.indexOf("boussole/scenarios") === 0 || file.indexOf("boussole/scenario") === 0) return "boussole-scenarios.html";
    if (file.indexOf("sas-boussole") === 0 || file.indexOf("sas-de-la-boussole") === 0) return "boussole.html";
    if (file === "boussole" || file.indexOf("boussole") === 0) return "boussole.html";

    if (file.indexOf("zone-energie") === 0 || file.indexOf("zone-énergie") === 0) return "zone-energie.html";
    if (file.indexOf("zone-corps") === 0) return "zone-corps.html";
    if (file.indexOf("zone-mental") === 0) return "zone-mental.html";
    if (file.indexOf("zone-emotions") === 0 || file.indexOf("zone-émotions") === 0) return "zone-emotions.html";
    if (file.indexOf("zone-environnement") === 0) return "zone-environnement.html";
    if (file.indexOf("zone-relations") === 0) return "zone-relations.html";
    if (file.indexOf("zone-sens") === 0) return "zone-sens.html";

    if (file === "lexique" || file.indexOf("lexique") === 0) return "lexique.html";
    if (file === "dictionnaire" || file.indexOf("dictionnaire") === 0) return "dictionnaire.html";
    if (file === "mentions" || file.indexOf("mentions") === 0) return "mentions-legales.html";

    return file;
  }

  currentFile = normalizeCurrentFile(currentFile);

  if (document.body) {
    document.body.classList.add(
      "foebe-page-" + String(currentFile || "page")
        .replace(/\.html?$/i, "")
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")
    );
  }

  var zonesFiles = {
    "zone-energie.html": true,
    "zone-corps.html": true,
    "zone-mental.html": true,
    "zone-emotions.html": true,
    "zone-environnement.html": true,
    "zone-relations.html": true,
    "zone-sens.html": true
  };


  function shellEscapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function shellPageLabelFallback() {
    var h1 = document.querySelector("main h1,.hero h1,.zone-hero h1,.dict-hero h1,h1");
    if (h1 && h1.textContent) {
      var fromH1 = h1.textContent.replace(/\s+/g, " ").trim();
      if (fromH1) return fromH1;
    }
    var fromTitle = String(document.title || "").split(/[|–—]/)[0].trim();
    return fromTitle || "Page actuelle";
  }

  function getShellPageContext() {
    var path = String(currentPath || window.location.pathname || "/").toLowerCase();
    try { path = decodeURIComponent(path); } catch (e) {}

    if (currentFile === "index.html") return null;

    var exact = {
      "comprendre.html": { href: "/", backLabel: "Accueil", currentLabel: "Comprendre", aria: "Retour à l’accueil" },
      "a-propos.html": { href: "/", backLabel: "Accueil", currentLabel: "À propos", aria: "Retour à l’accueil" },
      "faq.html": { href: "/", backLabel: "Accueil", currentLabel: "Questions fréquentes", aria: "Retour à l’accueil" },
      "methode.html": { href: "/", backLabel: "Accueil", currentLabel: "La méthode Foébé", aria: "Retour à l’accueil" },
      "pratiquer.html": { href: "/", backLabel: "Accueil", currentLabel: "4 outils", aria: "Retour à l’accueil" },
      "echelle-foebe.html": { href: "/pratiquer/", backLabel: "4 outils", currentLabel: "Échelle Foébé", aria: "Retour aux 4 outils" },
      "zones.html": { href: "/pratiquer/", backLabel: "4 outils", currentLabel: "7 zones", aria: "Retour aux 4 outils" },
      "respiration.html": { href: "/pratiquer/", backLabel: "4 outils", currentLabel: "Respiration guidée", aria: "Retour aux 4 outils" },
      "boussole.html": { href: "/pratiquer/", backLabel: "4 outils", currentLabel: "Boussole", aria: "Retour aux 4 outils" },
      "boussole-scenarios.html": { href: "/boussole/", backLabel: "Boussole", currentLabel: "Scénarios", aria: "Retour à la Boussole Foébé" },
      "lexique.html": { href: "/", backLabel: "Accueil", currentLabel: "Lexique Foébé", aria: "Retour à l’accueil" },
      "dictionnaire.html": { href: "/", backLabel: "Accueil", currentLabel: "Dictionnaire", aria: "Retour à l’accueil" },
      "mentions-legales.html": { href: "/", backLabel: "Accueil", currentLabel: "Mentions légales", aria: "Retour à l’accueil" }
    };

    if (exact[currentFile]) return exact[currentFile];

    var zoneLabels = {
      "zone-corps.html": "Corps",
      "zone-mental.html": "Mental",
      "zone-energie.html": "Énergie",
      "zone-emotions.html": "Émotions",
      "zone-environnement.html": "Environnement",
      "zone-relations.html": "Relations",
      "zone-sens.html": "Sens"
    };
    if (zoneLabels[currentFile]) {
      return { href: "/zones/", backLabel: "7 zones", currentLabel: zoneLabels[currentFile], aria: "Retour à la page des 7 zones" };
    }

    if (
      path.indexOf("/stories/") !== -1 ||
      path.indexOf("/lexique/") !== -1 ||
      path.indexOf("/dictionnaire/") !== -1 ||
      currentFile === "stories.html" ||
      /^(story-|fiche-|lexique-|dictionnaire-)/.test(currentFile)
    ) {
      return { href: "/dictionnaire/", backLabel: "Dictionnaire", currentLabel: shellPageLabelFallback(), aria: "Retour au Dictionnaire Foébé" };
    }

    return { href: "/", backLabel: "Accueil", currentLabel: shellPageLabelFallback(), aria: "Retour à l’accueil" };
  }

  var shellPageContext = getShellPageContext();
  if (shellPageContext) document.documentElement.classList.add("foebe-has-shell-context");

  var shellPathForMode = String(currentPath || window.location.pathname || "/").toLowerCase();
  var shellIsStoryImmersive = (
    currentFile === "lexique.html" ||
    currentFile === "stories.html" ||
    shellPathForMode.indexOf("/stories/") !== -1 ||
    shellPathForMode.indexOf("/lexique/") !== -1 ||
    shellPathForMode.indexOf("/dictionnaire/") !== -1 ||
    /^(story-|fiche-|lexique-|dictionnaire-)/.test(currentFile)
  );
  if (shellIsStoryImmersive) {
    document.documentElement.classList.add("foebe-story-immersive");
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     3. INJECTION DU NAV
  ═══════════════════════════════════════════════════════════════════════════ */
  var NAV_STRUCTURE = [
    { pole: "Maison Foébé", links: [
      { href: "/", label: "Accueil" }
    ]},
    { pole: "Découvrir", links: [
      { href: "/comprendre/", label: "Comprendre Maison Foébé" },
      { href: "/a-propos/",   label: "À propos"   },
      { href: "/methode/",    label: "La méthode Foébé" },
      { href: "/faq/",        label: "Questions fréquentes" }
    ]},
    { pole: "Pratiquer", links: [
      { href: "/pratiquer/",     label: "4 outils" },
      { href: "/echelle-foebe/", label: "Échelle Foébé" },
      {
        href: "/zones/",
        label: "7 zones",
        activeWhenZones: true,
        children: [
          { href: "/zone-corps/",        label: "Corps" },
          { href: "/zone-mental/",       label: "Mental" },
          { href: "/zone-energie/",      label: "Énergie" },
          { href: "/zone-emotions/",     label: "Émotions" },
          { href: "/zone-environnement/",label: "Environnement" },
          { href: "/zone-relations/",    label: "Relations" },
          { href: "/zone-sens/",         label: "Sens" }
        ]
      },
      { href: "/respiration/", label: "Respiration guidée" },
      {
        href: "/boussole/",
        label: "Boussole",
        children: [
          { href: "/boussole-scenarios/", label: "Scénarios" }
        ]
      }
    ]},
    { pole: "Ressources", links: [
      { href: "/lexique/",      label: "Lexique Foébé" },
      { href: "/dictionnaire/", label: "Dictionnaire" }
    ]}
  ];

  function isCurrentLink(link) {
    return normalizeCurrentFile(link.href) === currentFile;
  }

  function isBranchActive(link) {
    if (isCurrentLink(link)) return true;
    if (link.activeWhenZones && zonesFiles[currentFile]) return true;
    return Array.isArray(link.children) && link.children.some(function (child) {
      return isCurrentLink(child);
    });
  }

  function buildNavHTML() {
    return NAV_STRUCTURE.map(function (pole, poleIndex) {
      var links = pole.links.map(function (link, linkIndex) {
        var parentCurrent = isCurrentLink(link);
        var hasChildren = Array.isArray(link.children) && link.children.length > 0;

        if (!hasChildren) {
          return '<a class="nav-link" href="' + shellEscapeHtml(link.href) + '"' +
            (parentCurrent ? ' aria-current="page"' : '') + '>' + shellEscapeHtml(link.label) + '</a>';
        }

        var branchActive = isBranchActive(link);
        var branchId = 'foebeNavChildren-' + poleIndex + '-' + linkIndex;
        var childLinks = link.children.map(function (child) {
          return '<a class="nav-child-link" href="' + shellEscapeHtml(child.href) + '"' +
            (isCurrentLink(child) ? ' aria-current="page"' : '') + '>' + shellEscapeHtml(child.label) + '</a>';
        }).join("");

        return '<div class="nav-branch' + (branchActive ? ' is-open' : '') + '" data-nav-branch>' +
          '<div class="nav-branch-head">' +
            '<a class="nav-link nav-parent-link' + (!parentCurrent && branchActive ? ' is-branch-current' : '') + '" href="' + shellEscapeHtml(link.href) + '"' +
              (parentCurrent ? ' aria-current="page"' : '') + '>' + shellEscapeHtml(link.label) + '</a>' +
            '<button class="nav-branch-toggle" type="button" aria-controls="' + branchId + '" aria-expanded="' + (branchActive ? 'true' : 'false') + '" aria-label="' +
              (branchActive ? 'Masquer' : 'Afficher') + ' les sous-pages de ' + shellEscapeHtml(link.label) + '">' +
              '<span class="nav-branch-toggle__icon" aria-hidden="true">⌄</span>' +
            '</button>' +
          '</div>' +
          '<div class="nav-children" id="' + branchId + '">' + childLinks + '</div>' +
        '</div>';
      }).join("");
      return '<div class="nav-pole"><span class="nav-pole-label">' + shellEscapeHtml(pole.pole) + '</span>' + links + '</div>';
    }).join("");
  }

  var pageMain = document.querySelector("main");
  if (pageMain && !pageMain.id) pageMain.id = "mainContent";
  if (pageMain && !pageMain.hasAttribute("tabindex")) pageMain.setAttribute("tabindex", "-1");

  var mainNav = document.getElementById("mainNav");
  if (!mainNav) {
    mainNav = document.createElement("nav");
    mainNav.id = "mainNav";
    document.body.insertBefore(mainNav, document.body.firstChild);
  }
  mainNav.setAttribute("aria-label", "Navigation principale");

  var shellBackHtml = shellPageContext
    ? '<a class="shell-context-back" href="' + shellEscapeHtml(shellPageContext.href) + '" aria-label="' + shellEscapeHtml(shellPageContext.aria) + '">' +
        '<span class="shell-context-back__arrow" aria-hidden="true">←</span>' +
        '<span class="shell-context-back__label">' + shellEscapeHtml(shellPageContext.backLabel) + '</span>' +
      '</a>'
    : '';
  var shellCurrentLabel = shellPageContext ? shellPageContext.currentLabel : "Accueil";

  mainNav.innerHTML =
    '<div class="nav-left">' +
      '<a aria-label="Maison Foébé — accueil" class="nav-logo" href="/">' +
        '<span>F</span><span>o</span><span>é</span><span>b</span><span>é</span>' +
      '</a>' + shellBackHtml +
    '</div>' +
    '<span class="shell-page-current' + (shellPageContext ? '' : ' shell-page-current--home') + '" aria-current="page" title="' + shellEscapeHtml(shellCurrentLabel) + '">' + shellEscapeHtml(shellCurrentLabel) + '</span>' +
    '<div class="nav-right">' +
      '<button aria-label="Changer le thème" aria-pressed="false" class="theme-toggle" id="themeToggle" type="button">☀️</button>' +
      '<button aria-controls="navMenu" aria-expanded="false" aria-label="Ouvrir le menu" id="menuToggle" type="button">☰</button>' +
    '</div>' +
    '<div id="foebeReadingProgress" aria-hidden="true"><span id="foebeReadingProgressBar"></span></div>';

  var navMenu = document.getElementById("navMenu");
  if (!navMenu) {
    navMenu = document.createElement("nav");
    navMenu.id = "navMenu";
    mainNav.insertAdjacentElement("afterend", navMenu);
  }

  navMenu.setAttribute("aria-label", "Menu principal");
  navMenu.setAttribute("aria-hidden", "true");
  navMenu.className = "";
  navMenu.innerHTML = '<div class="nav-panel-inner">' + buildNavHTML() + '</div>';

  /* Sous-navigation : boutons visibles sur desktop, accordéons accessibles sur mobile. */
  (function initNavBranches() {
    var mobileBranches = window.matchMedia ? window.matchMedia("(max-width: 640px)") : null;
    var branches = Array.prototype.slice.call(navMenu.querySelectorAll("[data-nav-branch]"));
    if (!branches.length) return;

    function isMobileBranchMode() {
      return mobileBranches ? mobileBranches.matches : window.innerWidth <= 640;
    }

    function setBranchOpen(branch, open) {
      var button = branch.querySelector(".nav-branch-toggle");
      var children = branch.querySelector(".nav-children");
      if (!button || !children) return;

      branch.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.setAttribute(
        "aria-label",
        (open ? "Masquer" : "Afficher") + " les sous-pages de " +
        ((branch.querySelector(".nav-parent-link") || {}).textContent || "cette rubrique").trim()
      );

      if (isMobileBranchMode()) {
        children.hidden = !open;
      } else {
        children.hidden = false;
      }
    }

    function syncBranches() {
      branches.forEach(function (branch) {
        setBranchOpen(branch, branch.classList.contains("is-open"));
      });
    }

    branches.forEach(function (branch) {
      var button = branch.querySelector(".nav-branch-toggle");
      if (!button) return;
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!isMobileBranchMode()) return;

        var willOpen = !branch.classList.contains("is-open");
        branches.forEach(function (otherBranch) {
          if (otherBranch !== branch) setBranchOpen(otherBranch, false);
        });
        setBranchOpen(branch, willOpen);
      });
    });

    syncBranches();
    if (mobileBranches && mobileBranches.addEventListener) {
      mobileBranches.addEventListener("change", syncBranches);
    } else {
      window.addEventListener("resize", syncBranches, { passive: true });
    }
  })();

  var navOverlay = document.getElementById("navOverlay");
  if (!navOverlay) {
    navOverlay = document.createElement("div");
    navOverlay.id = "navOverlay";
    navMenu.insertAdjacentElement("afterend", navOverlay);
  }

  navOverlay.setAttribute("aria-hidden", "true");
  navOverlay.className = "";

  /* ═══════════════════════════════════════════════════════════════════════════
     3.1 PROGRESSION DE LECTURE GLOBALE
     Une seule barre harmonisée, attachée au Shell et masquée si la page ne scrolle pas.
  ═══════════════════════════════════════════════════════════════════════════ */
  (function initFoebeReadingProgress() {
    var root = document.documentElement;
    var bar = document.getElementById("foebeReadingProgressBar");
    if (!bar) return;

    var ticking = false;
    var legacySelector = ".foebe-scroll-progress,#scrollProgress,.scroll-progress,[data-scroll-progress],.reading-progress,.page-reading-progress";

    function removeLegacyReadingBars() {
      document.querySelectorAll(legacySelector).forEach(function (el) {
        if (!el || el.id === "foebeReadingProgress" || el.id === "foebeReadingProgressBar") return;
        if (el.classList && el.classList.contains("foebe-scroll-progress--fallback")) return;
        if (el.closest && el.closest("#mainNav")) return;
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    }

    function updateReadingProgress() {
      ticking = false;
      var doc = document.documentElement;
      var body = document.body;
      var scrollTop = window.pageYOffset || doc.scrollTop || (body && body.scrollTop) || 0;
      var fullHeight = Math.max(
        doc.scrollHeight, doc.offsetHeight, doc.clientHeight,
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0
      );
      var viewport = window.innerHeight || doc.clientHeight || 0;
      var maxScroll = Math.max(0, fullHeight - viewport);
      var path = String(currentPath || window.location.pathname || "").toLowerCase();
      var immersiveNoScroll = (
        currentFile === "lexique.html" ||
        currentFile === "stories.html" ||
        path.indexOf("/stories/") !== -1 ||
        path.indexOf("/lexique/") !== -1 ||
        path.indexOf("/dictionnaire/") !== -1
      );

      var progressMode = String(
        root.getAttribute("data-foebe-progress") ||
        (body && body.getAttribute("data-foebe-progress")) ||
        ""
      ).toLowerCase();

      var progressDisabledByPage =
        progressMode === "off" ||
        progressMode === "none" ||
        progressMode === "false";

      if (progressDisabledByPage || immersiveNoScroll || maxScroll <= 8) {
        root.classList.add("foebe-reading-progress-disabled");
        bar.style.setProperty("--foebe-reading-progress", "0");
        return;
      }

      root.classList.remove("foebe-reading-progress-disabled");
      var ratio = Math.max(0, Math.min(1, scrollTop / maxScroll));
      bar.style.setProperty("--foebe-reading-progress", ratio.toFixed(4));
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateReadingProgress);
    }

    removeLegacyReadingBars();
    updateReadingProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("orientationchange", requestUpdate, { passive: true });
    window.addEventListener("load", requestUpdate);
    window.addEventListener("pageshow", requestUpdate);

    try {
      if (window.ResizeObserver) {
        var resizeObserver = new ResizeObserver(requestUpdate);
        resizeObserver.observe(document.documentElement);
        if (document.body) resizeObserver.observe(document.body);
      }
    } catch (e) {}

    try {
      var progressObserver = new MutationObserver(function () {
        removeLegacyReadingBars();
        requestUpdate();
      });
      progressObserver.observe(document.documentElement, { childList: true, subtree: true });
      window.setTimeout(function () {
        try { progressObserver.disconnect(); } catch (e) {}
      }, 3000);
    } catch (e) {}
  })();

  /* ═══════════════════════════════════════════════════════════════════════════
     4. INJECTION DU FOOTER
  ═══════════════════════════════════════════════════════════════════════════ */

  var PINTEREST_SVG =
    '<svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">' +
      '<path d="M12.04 0C5.39 0 0 5.39 0 12.04c0 5.09 3.16 9.44 7.63 11.2-.11-.95-.2-2.41.04-3.45.22-.94 1.41-5.98 1.41-5.98s-.36-.72-.36-1.79c0-1.68.97-2.94 2.18-2.94 1.03 0 1.53.77 1.53 1.7 0 1.04-.66 2.59-1 4.03-.29 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.26 3.78-5.52 0-2.88-2.07-4.9-5.04-4.9-3.43 0-5.44 2.57-5.44 5.23 0 1.04.4 2.15.9 2.75.1.12.11.23.08.35-.09.38-.3 1.2-.34 1.37-.05.22-.18.27-.41.16-1.54-.72-2.5-2.97-2.5-4.78 0-3.89 2.83-7.47 8.16-7.47 4.28 0 7.61 3.05 7.61 7.13 0 4.26-2.68 7.68-6.41 7.68-1.25 0-2.43-.65-2.83-1.42l-.77 2.93c-.28 1.08-1.03 2.43-1.53 3.25 1.15.36 2.37.55 3.64.55 6.65 0 12.04-5.39 12.04-12.04C24.08 5.39 18.69 0 12.04 0z"/>' +
    '</svg>';

  var INSTA_SVG =
    '<svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">' +
      '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>' +
    '</svg>';

  var TIKTOK_SVG =
    '<svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">' +
      '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.49-3.35-3.98-5.6-.46-2.14.24-4.43 1.71-6.04 1.42-1.57 3.59-2.46 5.77-2.35.62.03 1.23.12 1.83.26v4.14c-.67-.31-1.41-.45-2.14-.38-1.01.09-1.95.69-2.47 1.56-.56.93-.68 2.12-.34 3.14.35 1.06 1.19 1.93 2.23 2.34 1.14.45 2.47.35 3.52-.29 1.05-.64 1.74-1.78 1.81-2.99.02-3.08 0-6.16.01-9.24-.06-1.37-.59-2.71-1.56-3.71-.96-1-2.27-1.63-3.65-1.75-.13-.01-.26-.02-.39-.02v-4.05z"/>' +
    '</svg>';

  var EMAIL_SVG =
    '<svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M4.75 6.75h14.5v10.5H4.75V6.75z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>' +
      '<path d="M5.25 7.25 12 12.25l6.75-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>' +
    '</svg>';

  var footerEl = document.querySelector("footer");
  if (!footerEl) {
    footerEl = document.createElement("footer");
    document.body.appendChild(footerEl);
  }

  footerEl.innerHTML =
    '<div class="footer-inner">' +
      '<div class="footer-brand">' +
        '<a aria-label="Retour accueil Maison Foébé" class="footer-logo" href="/">' +
          '<span>F</span><span>o</span><span>é</span><span>b</span><span>é</span>' +
        '</a>' +
        '<p class="footer-description">Un espace structuré du self-care pour apprendre à se lire, se réguler et avancer avec un peu plus de douceur.</p>' +
        '<div class="footer-social" aria-label="Réseaux sociaux Maison Foébé">' +
          '<a aria-label="Pinterest Maison Foébé" class="social-icon" href="https://fr.pinterest.com/maisonfoebe/" rel="noopener noreferrer" target="_blank">' + PINTEREST_SVG + '</a>' +
          '<a aria-label="Instagram Maison Foébé" class="social-icon" href="https://www.instagram.com/maisonfoebe/" rel="noopener noreferrer" target="_blank">' + INSTA_SVG + '</a>' +
          '<a aria-label="TikTok Maison Foébé" class="social-icon" href="https://www.tiktok.com/@maisonfoebe" rel="noopener noreferrer" target="_blank">' + TIKTOK_SVG + '</a>' +
          '<a aria-label="Envoyer un email à Maison Foébé" class="social-icon" href="mailto:contact@maisonfoebe.fr">' + EMAIL_SVG + '</a>' +
        '</div>' +
      '</div>' +
      '<nav class="footer-column" aria-label="Découvrir Maison Foébé">' +
        '<span class="footer-heading">Découvrir</span>' +
        '<a class="footer-link" href="/comprendre/">Comprendre Maison Foébé</a>' +
        '<a class="footer-link" href="/a-propos/">À propos</a>' +
        '<a class="footer-link" href="/methode/">La méthode Foébé</a>' +
        '<a class="footer-link" href="/faq/">Questions fréquentes</a>' +
      '</nav>' +
      '<nav class="footer-column" aria-label="Pratiquer avec Maison Foébé">' +
        '<span class="footer-heading">Pratiquer</span>' +
        '<a class="footer-link" href="/pratiquer/">Les 4 outils</a>' +
        '<a class="footer-link" href="/echelle-foebe/">Échelle Foébé</a>' +
        '<a class="footer-link" href="/zones/">Les 7 zones</a>' +
        '<a class="footer-link" href="/respiration/">Respiration guidée</a>' +
        '<a class="footer-link" href="/boussole/">La Boussole</a>' +
      '</nav>' +
      '<nav class="footer-column" aria-label="Ressources Maison Foébé">' +
        '<span class="footer-heading">Ressources</span>' +
        '<a class="footer-link" href="/lexique/">Lexique Foébé</a>' +
        '<a class="footer-link" href="/dictionnaire/">Dictionnaire</a>' +
      '</nav>' +
      '<nav class="footer-column" aria-label="Informations légales Maison Foébé">' +
        '<span class="footer-heading">Légal</span>' +
        '<a class="footer-link" href="/mentions-legales/">Mentions légales</a>' +
      '</nav>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<p class="footer-signature">Le self-care comme compétence.</p>' +
      '<p class="footer-note">© 2026 Maison Foébé · Tous droits réservés</p>' +
    '</div>';

  /* ═══════════════════════════════════════════════════════════════════════════
     5. THÈME JOUR / NUIT
  ═══════════════════════════════════════════════════════════════════════════ */

  var h = document.documentElement;
  if (!h.getAttribute("lang")) h.setAttribute("lang", "fr");
  var themeBtn = document.getElementById("themeToggle");

  function syncThemeButton() {
    if (!themeBtn) return;
    var isNight = h.getAttribute("data-theme") === "night";
    themeBtn.textContent = isNight ? "☀️" : "🌙";
    themeBtn.setAttribute("aria-label", isNight ? "Passer en mode jour" : "Passer en mode nuit");
    themeBtn.setAttribute("aria-pressed", isNight ? "true" : "false");
  }

  syncThemeButton();

  if (themeBtn) {
    themeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var next = h.getAttribute("data-theme") === "night" ? "day" : "night";
      h.setAttribute("data-theme", next);
      try { localStorage.setItem("foebeTheme", next); } catch (e) {}
      syncThemeButton();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     6. MENU HAMBURGER + HOVER DESKTOP
  ═══════════════════════════════════════════════════════════════════════════ */

  var menuToggle = document.getElementById("menuToggle");
  var hoverCloseTimer = null;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var focusTrapHandler = null;
  function getFocusables(root) {
    if (!root) return [];
    return Array.prototype.slice.call(
      root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter(function(el){ return el.offsetParent !== null || el === document.activeElement; });
  }
  function activateFocusTrap() {
    if (focusTrapHandler) return;
    focusTrapHandler = function(e) {
      if (e.key === "Escape") { e.preventDefault(); closeMenu({ returnFocus: true }); return; }
      if (e.key !== "Tab") return;
      var focusables = getFocusables(navMenu);
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", focusTrapHandler);
  }
  function deactivateFocusTrap() {
    if (!focusTrapHandler) return;
    document.removeEventListener("keydown", focusTrapHandler);
    focusTrapHandler = null;
  }

  function openMenu(options) {
    options = options || {};
    if (hoverCloseTimer) {
      clearTimeout(hoverCloseTimer);
      hoverCloseTimer = null;
    }

    navMenu.classList.add("open");
    navMenu.setAttribute("aria-hidden", "false");

    navOverlay.classList.add("open");
    navOverlay.setAttribute("aria-hidden", "false");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.textContent = "×";
      menuToggle.setAttribute("aria-label", "Fermer le menu");
    }

    /* Focus trap uniquement lors d’une ouverture volontaire (clic ou clavier).
       Une ouverture au survol desktop ne déplace jamais le focus. */
    if (options.trapFocus) {
      activateFocusTrap();
      var first = getFocusables(navMenu)[0];
      if (first) { try { first.focus({ preventScroll: true }); } catch(e) { first.focus(); } }
    } else {
      deactivateFocusTrap();
    }
  }

  function closeMenu(options) {
    options = options || {};
    if (hoverCloseTimer) {
      clearTimeout(hoverCloseTimer);
      hoverCloseTimer = null;
    }

    navMenu.classList.remove("open");
    navMenu.setAttribute("aria-hidden", "true");

    navOverlay.classList.remove("open");
    navOverlay.setAttribute("aria-hidden", "true");

    deactivateFocusTrap();
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      if (options.returnFocus) menuToggle.focus();
    }
  }

  function scheduleCloseMenu() {
    if (!canHover) return;
    if (hoverCloseTimer) clearTimeout(hoverCloseTimer);

    hoverCloseTimer = setTimeout(function () {
      var navHovered = mainNav.matches(":hover");
      var menuHovered = navMenu.matches(":hover");

      if (!navHovered && !menuHovered) {
        closeMenu();
      }
    }, 180);
  }
  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (navMenu.classList.contains("open")) {
        closeMenu({ returnFocus: true });
      } else {
        openMenu({ trapFocus: true });
      }
    });

    if (canHover) {
      menuToggle.addEventListener("mouseenter", function () { openMenu({ trapFocus: false }); });
    }
  }

  if (canHover) {
    mainNav.addEventListener("mouseleave", scheduleCloseMenu);
    navMenu.addEventListener("mouseenter", function () { openMenu({ trapFocus: false }); });
    navMenu.addEventListener("mouseleave", scheduleCloseMenu);
  }

  navOverlay.addEventListener("click", function () {
    closeMenu();
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  document.addEventListener("click", function (e) {
    if (!navMenu.classList.contains("open")) return;

    var clickedInsideMenu = navMenu.contains(e.target);
    var clickedInsideNav = mainNav.contains(e.target);

    if (!clickedInsideMenu && !clickedInsideNav) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu({ returnFocus: true });
    }
  });

  window.addEventListener("resize", function () {
    canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  /* ═══════════════════════════════════════════════════════════════════════════
     7. ANIMATIONS REVEAL AU SCROLL
  ═══════════════════════════════════════════════════════════════════════════ */

  var revealEls = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  } else {
    var revealObs = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  }
  /* ═══════════════════════════════════════════════════════════════════════════
     8. FALLBACK NAV — masquer seulement si le Shell a bien chargé
  ═══════════════════════════════════════════════════════════════════════════ */
 var fallbackNav = document.getElementById("fallbackNav");

if (fallbackNav) {
  fallbackNav.setAttribute("aria-hidden", "true");
  fallbackNav.style.display = "none";
}

  /* ═══════════════════════════════════════════════════════════════════════════
     9. ÉTAT SHELL
  ═══════════════════════════════════════════════════════════════════════════ */
  try {
    if (window.__foebeShellWatchdog) {
      clearTimeout(window.__foebeShellWatchdog);
      window.__foebeShellWatchdog = null;
    }

    document.documentElement.classList.add("foebe-shell-ready");
    document.documentElement.classList.remove(
      "foebe-shell-loading",
      "foebe-shell-failed"
    );

    try {
      window.dispatchEvent(new CustomEvent("foebe:shell-ready"));
    } catch (eventError) {}
  } catch (e) {}
/* FOEBE CLEANUP UNIFIÉ — START
     Compatibilité après suppression du fil d’Ariane global.
     - masque/supprime les anciens breadcrumbs éventuellement présents dans les pages ;
     - préserve le mode immersif Lexique/Stories ;
     - retire les anciennes barres de progression de lecture devenues redondantes ;
     - un seul MutationObserver, borné à 3 secondes. */
  (function () {
    function normalizedPath() {
      var path = String(window.location.pathname || "/").toLowerCase();
      try { path = decodeURIComponent(path); } catch (e) {}
      return path.split("?")[0].split("#")[0].replace(/\/+/g, "/");
    }

    function isImmersivePage() {
      var path = normalizedPath();
      var parts = path.split("/").filter(Boolean);
      var file = parts.length ? parts[parts.length - 1] : "index.html";
      return (
        file === "lexique.html" ||
        file === "stories.html" ||
        path.indexOf("/stories/") !== -1 ||
        path.indexOf("/lexique/") !== -1 ||
        path.indexOf("/dictionnaire/") !== -1
      );
    }

    var immersive = isImmersivePage();

    function injectCleanupCss(){ /* CSS externalisé */ }

    function cleanLegacyUi() {
      document.documentElement.classList.add("foebe-no-breadcrumb");
      if (document.body) document.body.classList.add("foebe-no-breadcrumb");

      document.querySelectorAll(".foebe-breadcrumb").forEach(function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });

      document.querySelectorAll(
        ".foebe-scroll-progress,#scrollProgress,.scroll-progress,[data-scroll-progress],.reading-progress,.page-reading-progress"
      ).forEach(function (el) {
        if (!el || el.id === "foebeReadingProgress" || el.id === "foebeReadingProgressBar") return;
        if (el.classList && el.classList.contains("foebe-scroll-progress--fallback")) return;
        if (el.closest && el.closest("#mainNav")) return;
        if (el.parentNode) el.parentNode.removeChild(el);
      });

      if (!immersive) return;

      document.documentElement.classList.add("foebe-immersive-page", "foebe-lexique-immersive");
      if (document.body) document.body.classList.add("foebe-immersive-page", "foebe-lexique-immersive");

      document.querySelectorAll(
        ".foebe-scroll-progress," +
        ".story-topbar,.stories-topbar,.story-fixed-bar,.stories-fixed-bar," +
        ".story-progress,.stories-progress,.lexique-topbar,.dictionnaire-topbar," +
        ".lexique-fixed-bar,.dictionnaire-fixed-bar," +
        "[data-story-topbar],[data-stories-topbar],[data-lexique-topbar]"
      ).forEach(function (el) {
        if (el && el.classList && el.classList.contains("foebe-scroll-progress--fallback")) return;
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    }

    injectCleanupCss();

    function startCleanup() {
      cleanLegacyUi();

      try {
        var observer = new MutationObserver(cleanLegacyUi);
        observer.observe(document.documentElement, { childList: true, subtree: true });
        window.setTimeout(function () {
          try { observer.disconnect(); } catch (e) {}
        }, 3000);
      } catch (e) {
        window.setTimeout(cleanLegacyUi, 900);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startCleanup, { once: true });
    } else {
      startCleanup();
    }
  })();
  /* FOEBE CLEANUP UNIFIÉ — END */

  /* FOEBE NAV IMMERSIVE MOBILE — START
     Toutes les pages mobiles : la navigation s'efface après une courte inactivité
     et revient dès que la personne interagit.

     Variante Lexique / Stories : les appuis servant à avancer une
     story ne rappellent pas la navigation. Elle revient par la zone haute, par un
     geste vers le bas depuis le haut, par le clavier, ou lorsque le menu est ouvert.

     Desktop : aucun changement. */
  (function () {
    var mobileQuery = window.matchMedia ? window.matchMedia("(max-width: 767px)") : null;
    var reduceMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    var hideTimer = null;
    var pointerStartY = null;
    var pointerStartX = null;
    var lastMouseMove = 0;
    var keyboardMode = false;
    var styleId = "foebeNavImmersiveMobileCss";
    var hiddenClass = "foebe-nav-hidden";
    var enabledClass = "foebe-nav-auto-hide";
    var menuOpenClass = "foebe-nav-menu-open";

    function normalizedPath() {
      var path = String(window.location.pathname || "/").toLowerCase();
      try { path = decodeURIComponent(path); } catch (e) {}
      return path.split("?")[0].split("#")[0].replace(/\/+/g, "/");
    }

    function isImmersiveStoryPage() {
      if (shellIsStoryImmersive) return true;
      var path = normalizedPath();
      var parts = path.split("/").filter(Boolean);
      var file = parts.length ? parts[parts.length - 1] : "index.html";
      return (
        file === "lexique.html" ||
        file === "stories.html" ||
        path.indexOf("/stories/") !== -1 ||
        path.indexOf("/lexique/") !== -1 ||
        path.indexOf("/dictionnaire/") !== -1 ||
        /^(story-|fiche-|lexique-|dictionnaire-)/.test(file)
      );
    }

    function mobileEnabled() {
      return mobileQuery ? mobileQuery.matches : window.innerWidth <= 767;
    }

    function menuIsOpen() {
      var toggle = document.getElementById("menuToggle");
      var menu = document.getElementById("navMenu");
      return !!(
        (toggle && toggle.getAttribute("aria-expanded") === "true") ||
        (menu && menu.classList.contains("open"))
      );
    }

    function focusNeedsNav() {
      if (!keyboardMode) return false;
      var active = document.activeElement;
      var nav = document.getElementById("mainNav");
      var menu = document.getElementById("navMenu");
      return !!(active && ((nav && nav.contains(active)) || (menu && menu.contains(active))));
    }

    function clearHideTimer() {
      if (hideTimer) {
        window.clearTimeout(hideTimer);
        hideTimer = null;
      }
    }

    function inactivityDelay() {
      return isImmersiveStoryPage() ? 1500 : 2200;
    }

    function injectCss(){ /* CSS externalisé */ }

    function setMenuState() {
      var root = document.documentElement;
      if (menuIsOpen()) {
        clearHideTimer();
        root.classList.add(menuOpenClass);
        root.classList.remove(hiddenClass);
      } else {
        root.classList.remove(menuOpenClass);
        if (mobileEnabled()) scheduleHide(isImmersiveStoryPage() ? 1500 : 2200);
      }
    }

    function hideNav() {
      hideTimer = null;
      if (!mobileEnabled() || menuIsOpen() || focusNeedsNav()) return;
      document.documentElement.classList.add(hiddenClass);
    }

    function scheduleHide(delay) {
      clearHideTimer();
      if (!mobileEnabled() || menuIsOpen() || focusNeedsNav()) return;
      hideTimer = window.setTimeout(hideNav, typeof delay === "number" ? delay : inactivityDelay());
    }

    function showNav(options) {
      options = options || {};
      if (!mobileEnabled()) return;
      document.documentElement.classList.remove(hiddenClass);
      if (options.keepVisible || menuIsOpen() || focusNeedsNav()) {
        clearHideTimer();
      } else {
        scheduleHide(options.delay);
      }
    }

    var hasShownInitialTeaser = false;

    function enableForCurrentViewport() {
      var root = document.documentElement;
      injectCss();
      clearHideTimer();

      if (!mobileEnabled()) {
        root.classList.remove(enabledClass, hiddenClass, menuOpenClass);
        return;
      }

      root.classList.add(enabledClass);
      if (isImmersiveStoryPage()) root.classList.add("foebe-story-shell-active");
      else root.classList.remove("foebe-story-shell-active");

      if (isImmersiveStoryPage() && !menuIsOpen()) {
        clearHideTimer();
        root.classList.remove(menuOpenClass);
        /* Teaser d'apparition : au tout premier chargement, on laisse la nav
           visible un court instant pour que la personne l'enregistre, avant
           qu'elle ne se range selon le rythme habituel. Les appels suivants
           (resize, rotation, retour d'onglet…) ne répètent pas le teaser. */
        if (!hasShownInitialTeaser) {
          hasShownInitialTeaser = true;
          root.classList.remove(hiddenClass);
          hideTimer = window.setTimeout(hideNav, 2200);
          return;
        }
        root.classList.add(hiddenClass);
        return;
      }

      root.classList.remove(hiddenClass);
      setMenuState();
      if (!menuIsOpen()) scheduleHide();
    }

    function onGeneralActivity() {
      if (!mobileEnabled() || isImmersiveStoryPage()) return;
      showNav();
    }

    function onPointerDown(event) {
      if (!mobileEnabled()) return;
      keyboardMode = false;
      pointerStartY = typeof event.clientY === "number" ? event.clientY : null;
      pointerStartX = typeof event.clientX === "number" ? event.clientX : null;

      if (!isImmersiveStoryPage()) {
        showNav();
        return;
      }

      /* Sur les stories, un toucher dans les 64 px supérieurs (zone #navWakeZone
         dédiée côté page) rappelle le Shell. Un toucher ailleurs continue la
         story sans casser l'immersion. */
      if (pointerStartY !== null && pointerStartY <= 64) {
        showNav();
      }
    }

    function onPointerUp(event) {
      if (!mobileEnabled() || !isImmersiveStoryPage()) {
        pointerStartY = null;
        pointerStartX = null;
        return;
      }

      var endY = typeof event.clientY === "number" ? event.clientY : null;
      var endX = typeof event.clientX === "number" ? event.clientX : null;

      if (
        pointerStartY !== null && endY !== null &&
        pointerStartY <= 140 &&
        endY - pointerStartY >= 46 &&
        (pointerStartX === null || endX === null || Math.abs(endX - pointerStartX) <= 90)
      ) {
        showNav();
      }

      pointerStartY = null;
      pointerStartX = null;
    }

    function onMouseMove(event) {
      if (!mobileEnabled() || isImmersiveStoryPage()) return;
      var now = Date.now();
      if (now - lastMouseMove < 180) return;
      lastMouseMove = now;
      showNav();
    }

    function onKeyDown() {
      if (!mobileEnabled()) return;
      keyboardMode = true;
      showNav();
    }

    function onFocusIn(event) {
      if (!mobileEnabled()) return;
      var nav = document.getElementById("mainNav");
      var menu = document.getElementById("navMenu");
      if ((nav && nav.contains(event.target)) || (menu && menu.contains(event.target))) {
        showNav({ keepVisible: true });
      } else if (!isImmersiveStoryPage()) {
        showNav();
      }
    }

    function observeMenu() {
      var toggle = document.getElementById("menuToggle");
      var menu = document.getElementById("navMenu");
      if (!toggle && !menu) return;

      if (window.MutationObserver) {
        var observer = new MutationObserver(setMenuState);
        if (toggle) observer.observe(toggle, { attributes: true, attributeFilter: ["aria-expanded"] });
        if (menu) observer.observe(menu, { attributes: true, attributeFilter: ["class", "aria-hidden"] });
      }

      if (toggle) {
        toggle.addEventListener("click", function () {
          showNav({ keepVisible: true });
          window.setTimeout(setMenuState, 0);
        }, true);
      }
    }

    function initNavImmersion() {
      injectCss();
      enableForCurrentViewport();
      observeMenu();

      window.addEventListener("scroll", onGeneralActivity, { passive: true });
      window.addEventListener("wheel", onGeneralActivity, { passive: true });
      window.addEventListener("resize", enableForCurrentViewport, { passive: true });
      window.addEventListener("orientationchange", enableForCurrentViewport, { passive: true });
      window.addEventListener("pageshow", enableForCurrentViewport);

      document.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
      document.addEventListener("pointerup", onPointerUp, { passive: true, capture: true });
      document.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("keydown", onKeyDown, true);
      document.addEventListener("focusin", onFocusIn, true);
      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) showNav();
      });

      if (mobileQuery && typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", enableForCurrentViewport);
      } else if (mobileQuery && typeof mobileQuery.addListener === "function") {
        mobileQuery.addListener(enableForCurrentViewport);
      }

      /* Reduced motion ne désactive pas le confort ; seule l'animation est retirée par CSS. */
      if (reduceMotionQuery && typeof reduceMotionQuery.addEventListener === "function") {
        reduceMotionQuery.addEventListener("change", injectCss);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initNavImmersion, { once: true });
    } else {
      initNavImmersion();
    }
  })();
  /* FOEBE NAV IMMERSIVE MOBILE — END */



  /* ═══════════════════════════════════════════════════════════════════════════
     V4 — SKIP-LINK ACCESSIBILITÉ + SAFE-AREA iPhone
  ═══════════════════════════════════════════════════════════════════════════ */
  (function () {
    /* CSS skip-link + safe-area menu mobile */
    /* CSS V4 externalisé */

    function ensureMainTarget() {
      var main = document.querySelector("main");
      if (main && !main.id) main.id = "mainContent";
      return main ? main.id : null;
    }

    function injectSkipLink() {
      if (document.getElementById("foebeSkipLink")) return;
      var targetId = ensureMainTarget();
      if (!targetId) return;
      var link = document.createElement("a");
      link.id = "foebeSkipLink";
      link.className = "foebe-skip-link";
      link.href = "#" + targetId;
      link.textContent = "Aller au contenu";
      link.addEventListener("click", function () {
        var main = document.getElementById(targetId);
        if (!main) return;
        window.setTimeout(function () {
          try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); }
        }, 0);
      });
      (document.body || document.documentElement).insertBefore(link, (document.body || document.documentElement).firstChild);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", injectSkipLink, { once: true });
    } else {
      injectSkipLink();
    }
  })();

  /* ═══════════════════════════════════════════════════════════════════════════
     10. RETOUR EN HAUT — composant global Shell
     Visible uniquement quand la page a réellement défilé. Aucun fallback local.
  ═══════════════════════════════════════════════════════════════════════════ */
  (function initFoebeBackToTop() {
    var BUTTON_ID = "foebeBackToTop";
    var STYLE_ID = "foebeBackToTopCss";
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    var ticking = false;
    var idleTimer = null;
    var IDLE_DELAY = 1800;

    function injectBackToTopCss(){ /* CSS externalisé */ }

    function createBackToTopButton() {
      var existing = document.getElementById(BUTTON_ID);
      if (existing) return existing;

      var button = document.createElement("button");
      button.id = BUTTON_ID;
      button.type = "button";
      button.className = "foebe-back-to-top";
      button.setAttribute("aria-label", "Revenir en haut de la page");
      button.setAttribute("title", "Revenir en haut");
      button.setAttribute("aria-hidden", "true");
      button.tabIndex = -1;
      button.innerHTML =
        '<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">' +
          '<path d="M12 19V5"></path>' +
          '<path d="m6.5 10.5 5.5-5.5 5.5 5.5"></path>' +
        '</svg>';

      button.addEventListener("click", function () {
        wakeBackToTop(button);
        var behavior = reducedMotion && reducedMotion.matches ? "auto" : "smooth";
        try {
          window.scrollTo({ top: 0, left: 0, behavior: behavior });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      });

      ["pointerenter", "pointerdown", "focusin", "touchstart"].forEach(function (eventName) {
        button.addEventListener(eventName, function () {
          wakeBackToTop(button);
        }, eventName === "touchstart" ? { passive: true } : false);
      });

      ["pointerleave", "focusout"].forEach(function (eventName) {
        button.addEventListener(eventName, function () {
          scheduleBackToTopIdle(button);
        });
      });

      (document.body || document.documentElement).appendChild(button);
      return button;
    }


    function clearBackToTopIdleTimer() {
      if (!idleTimer) return;
      window.clearTimeout(idleTimer);
      idleTimer = null;
    }

    function scheduleBackToTopIdle(button) {
      clearBackToTopIdleTimer();
      if (!button || !button.classList.contains("is-visible")) return;
      idleTimer = window.setTimeout(function () {
        if (!button.matches(":hover") && document.activeElement !== button) {
          button.classList.add("is-idle");
        }
      }, IDLE_DELAY);
    }

    function wakeBackToTop(button) {
      clearBackToTopIdleTimer();
      if (!button) return;
      button.classList.remove("is-idle");
      scheduleBackToTopIdle(button);
    }

    function syncBackToTop(button) {
      ticking = false;
      if (!button || !document.documentElement.contains(button)) return;

      var doc = document.documentElement;
      var body = document.body;
      var scrollTop = window.pageYOffset || doc.scrollTop || (body && body.scrollTop) || 0;
      var fullHeight = Math.max(
        doc.scrollHeight, doc.offsetHeight, doc.clientHeight,
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0
      );
      var viewport = window.innerHeight || doc.clientHeight || 0;
      var maxScroll = Math.max(0, fullHeight - viewport);
      var threshold = Math.max(420, Math.round(viewport * .55));
      var shouldShow = maxScroll > threshold && scrollTop > threshold;

      button.classList.toggle("is-visible", shouldShow);
      button.setAttribute("aria-hidden", shouldShow ? "false" : "true");
      button.tabIndex = shouldShow ? 0 : -1;

      if (shouldShow) {
        wakeBackToTop(button);
      } else {
        clearBackToTopIdleTimer();
        button.classList.remove("is-idle");
      }
    }

    function init() {
      injectBackToTopCss();
      var button = createBackToTopButton();

      function requestSync() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          syncBackToTop(button);
        });
      }

      syncBackToTop(button);
      window.addEventListener("scroll", requestSync, { passive: true });
      window.addEventListener("resize", requestSync, { passive: true });
      window.addEventListener("orientationchange", requestSync, { passive: true });
      window.addEventListener("load", requestSync);
      window.addEventListener("pageshow", requestSync);

      try {
        if (window.ResizeObserver) {
          var observer = new ResizeObserver(requestSync);
          observer.observe(document.documentElement);
          if (document.body) observer.observe(document.body);
        }
      } catch (e) {}
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
      init();
    }
  })();


})();
