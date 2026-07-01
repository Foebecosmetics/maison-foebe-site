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
    var lockedTheme = document.documentElement.getAttribute("data-foebe-theme-locked");
    if (lockedTheme === "day" || lockedTheme === "night") {
      document.documentElement.setAttribute("data-theme", lockedTheme);
      return;
    }
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
    if (file === "cadre-editorial" || file.indexOf("cadre-editorial") === 0 || file.indexOf("charte-editoriale") === 0) return "cadre-editorial.html";

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
    var pageSlug = String(currentFile || "page")
      .replace(/\.html?$/i, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");
    document.body.classList.add("foebe-page-" + pageSlug, "page-" + pageSlug);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     3. SHELL RENDU PAR ASTRO — le JavaScript enrichit, il ne remplace plus
  ═══════════════════════════════════════════════════════════════════════════ */
  var shellPathForMode = String(currentPath || window.location.pathname || "/").toLowerCase();
  var shellIsStoryImmersive = (
    currentFile === "lexique.html" ||
    currentFile === "stories.html" ||
    shellPathForMode.indexOf("/stories/") !== -1 ||
    /^(story-|fiche-|lexique-)/.test(currentFile)
  );

  if (shellIsStoryImmersive) {
    document.documentElement.classList.add("foebe-story-immersive");
  }

  var pageMain = document.querySelector("main");
  if (pageMain && !pageMain.id) pageMain.id = "mainContent";
  if (pageMain && !pageMain.hasAttribute("tabindex")) pageMain.setAttribute("tabindex", "-1");

  var mainNav = document.getElementById("mainNav");
  var navMenu = document.getElementById("navMenu");

  if (!mainNav || !navMenu) {
    document.documentElement.classList.remove("foebe-shell-loading");
    document.documentElement.classList.add("foebe-shell-failed");
    return;
  }

  mainNav.setAttribute("aria-label", "Navigation principale");
  navMenu.setAttribute("aria-label", "Menu principal");
  navMenu.setAttribute("aria-hidden", navMenu.classList.contains("open") ? "false" : "true");

  if (mainNav.querySelector(".shell-context-back")) {
    document.documentElement.classList.add("foebe-has-shell-context");
  }


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
        path.indexOf("/lexique/") !== -1
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
        '<p class="footer-description">Un espace structuré du self-care pour comprendre ce qui fatigue, ce qui épuise et ce qui empêche de récupérer, puis choisir un geste concret.</p>' +
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
        '<a class="footer-link" href="/cadre-editorial/">Cadre éditorial & sources</a>' +
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
     6. MENU HAMBURGER — effort minimal et comportement prévisible
     Desktop : le survol ouvre, quitter la zone referme. Un clic épingle le menu.
     Mobile / clavier : le clic ou la touche Entrée garde la commande principale.
  ═══════════════════════════════════════════════════════════════════════════ */

  var menuToggle = document.getElementById("menuToggle");
  var focusTrapHandler = null;
  var scrollLockState = null;
  var menuOpenMode = null;
  var menuPinned = false;
  var hoverCloseTimer = null;
  var mobileMenuQuery = window.matchMedia ? window.matchMedia("(max-width: 767px)") : null;
  var desktopHoverQuery = window.matchMedia ? window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)") : null;

  function isMobileMenuViewport() {
    return mobileMenuQuery ? mobileMenuQuery.matches : window.innerWidth <= 767;
  }

  function supportsDesktopHover() {
    return desktopHoverQuery ? desktopHoverQuery.matches : (window.innerWidth >= 768);
  }

  function cancelHoverClose() {
    if (!hoverCloseTimer) return;
    window.clearTimeout(hoverCloseTimer);
    hoverCloseTimer = null;
  }

  function scheduleHoverClose() {
    cancelHoverClose();
    if (!supportsDesktopHover() || menuPinned || menuOpenMode !== "hover") return;
    hoverCloseTimer = window.setTimeout(function () {
      hoverCloseTimer = null;
      if (!menuPinned && menuOpenMode === "hover") closeMenu();
    }, 180);
  }

  function getFocusables(root) {
    if (!root) return [];
    return Array.prototype.slice.call(
      root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter(function(el){ return el.offsetParent !== null || el === document.activeElement; });
  }

  function activateFocusTrap() {
    if (focusTrapHandler) return;
    focusTrapHandler = function(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu({ returnFocus: true });
        return;
      }
      if (e.key !== "Tab") return;
      var focusables = getFocusables(navMenu);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", focusTrapHandler);
  }

  function deactivateFocusTrap() {
    if (!focusTrapHandler) return;
    document.removeEventListener("keydown", focusTrapHandler);
    focusTrapHandler = null;
  }

  function lockBackgroundScroll() {
    var root = document.documentElement;
    root.classList.add("foebe-nav-menu-open");
    if (!isMobileMenuViewport() || scrollLockState || !document.body) return;

    var body = document.body;
    var y = window.pageYOffset || root.scrollTop || 0;
    scrollLockState = {
      y: y,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow
    };

    root.classList.add("foebe-menu-scroll-locked");
    body.style.position = "fixed";
    body.style.top = (-y) + "px";
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }

  function unlockBackgroundScroll(options) {
    options = options || {};
    var root = document.documentElement;
    root.classList.remove("foebe-nav-menu-open", "foebe-menu-scroll-locked");
    if (!scrollLockState || !document.body) return;

    var body = document.body;
    var state = scrollLockState;
    scrollLockState = null;
    body.style.position = state.position;
    body.style.top = state.top;
    body.style.left = state.left;
    body.style.right = state.right;
    body.style.width = state.width;
    body.style.overflow = state.overflow;

    if (options.restoreScroll !== false) {
      window.scrollTo(0, state.y);
    }
  }

  function openMenu(options) {
    options = options || {};
    cancelHoverClose();

    var requestedMode = options.mode || "click";
    if (requestedMode === "hover" && !supportsDesktopHover()) return;

    menuOpenMode = requestedMode;
    if (typeof options.pinned === "boolean") menuPinned = options.pinned;
    else menuPinned = requestedMode !== "hover";

    if (!navMenu.classList.contains("open")) {
      navMenu.classList.add("open");
      navMenu.setAttribute("aria-hidden", "false");
      navOverlay.classList.add("open");
      navOverlay.setAttribute("aria-hidden", "false");
      lockBackgroundScroll();

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.textContent = "×";
        menuToggle.setAttribute("aria-label", menuPinned ? "Fermer le menu" : "Menu ouvert — cliquer pour le maintenir");
      }
    }

    if (options.trapFocus !== false) activateFocusTrap();
    if (options.focusFirst !== false) {
      var first = getFocusables(navMenu)[0];
      if (first) {
        try { first.focus({ preventScroll: true }); } catch(e) { first.focus(); }
      }
    }
  }

  function closeMenu(options) {
    options = options || {};
    var wasOpen = navMenu.classList.contains("open");
    cancelHoverClose();

    navMenu.classList.remove("open");
    navMenu.setAttribute("aria-hidden", "true");
    navOverlay.classList.remove("open");
    navOverlay.setAttribute("aria-hidden", "true");
    deactivateFocusTrap();
    unlockBackgroundScroll();
    menuOpenMode = null;
    menuPinned = false;

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      if (wasOpen && options.returnFocus) menuToggle.focus();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("pointerenter", function () {
      if (!supportsDesktopHover() || menuPinned) return;
      openMenu({ mode: "hover", pinned: false, focusFirst: false, trapFocus: false });
    });

    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (navMenu.classList.contains("open") && menuOpenMode === "hover" && !menuPinned) {
        menuPinned = true;
        menuOpenMode = "click";
        activateFocusTrap();
        menuToggle.setAttribute("aria-label", "Fermer le menu");
        return;
      }

      if (navMenu.classList.contains("open") && menuPinned) {
        closeMenu({ returnFocus: true });
      } else {
        openMenu({ mode: "click", pinned: true, focusFirst: true, trapFocus: true });
      }
    });
  }

  [mainNav, navMenu].forEach(function (surface) {
    if (!surface) return;
    surface.addEventListener("pointerenter", cancelHoverClose);
    surface.addEventListener("pointerleave", scheduleHoverClose);
  });

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
    if (!navMenu.contains(e.target) && !mainNav.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeMenu({ returnFocus: true });
    }
  });

  window.addEventListener("resize", function () {
    if (!navMenu.classList.contains("open")) return;
    if (isMobileMenuViewport()) lockBackgroundScroll();
    else unlockBackgroundScroll({ restoreScroll: true });
  }, { passive: true });

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
        /^(story-|fiche-|lexique-)/.test(file)
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
