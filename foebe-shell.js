/**
 * foebe-shell.js — Maison Foébé
 * ─────────────────────────────────────────────────────────────────────────────
 * Ce fichier gère, sur TOUTES les pages du site :
 *   • Le nav (injection du HTML, toggle thème, menu hamburger)
 *   • Le footer (injection du HTML)
 *   • Les animations reveal au scroll
 *
 * À DÉPOSER à la racine du site (même dossier que index.html).
 * Instructions dans le guide fourni avec ce fichier.
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════════════
     1. CSS PARTAGÉ — injecté en tête de page
     Remplace et complète les styles nav/footer/overlay des pages existantes.
  ═══════════════════════════════════════════════════════════════════════════ */
  var SHELL_CSS = [
    /* ── Nav bar ── */
    "#mainNav{position:fixed;top:0;left:0;right:0;height:60px;",
    "background:var(--bg);border-bottom:1px solid var(--border);",
    "display:flex;align-items:center;justify-content:space-between;",
    "padding:0 20px;z-index:300;transition:background .5s,border-color .5s;}",

    ".nav-logo{font-family:'Montserrat',sans-serif;font-weight:700;",
    "font-size:18px;text-decoration:none;letter-spacing:-0.06em;}",
    "[data-theme='night'] .nav-logo span{color:#F0EAE7;}",
    "[data-theme='day'] .nav-logo span:nth-child(1){color:#4E291F;}",
    "[data-theme='day'] .nav-logo span:nth-child(2){color:#BB7E60;}",
    "[data-theme='day'] .nav-logo span:nth-child(3){color:#C45279;}",
    "[data-theme='day'] .nav-logo span:nth-child(4){color:#C34234;}",
    "[data-theme='day'] .nav-logo span:nth-child(5){color:#4E291F;}",

    ".nav-right{display:flex;align-items:center;gap:10px;}",
    ".theme-toggle{background:var(--surface,rgba(187,126,96,.08));",
    "border:1px solid var(--border,rgba(187,126,96,.25));border-radius:50%;",
    "width:36px;height:36px;font-size:16px;cursor:pointer;",
    "transition:border-color .2s,transform .2s;flex-shrink:0;}",
    ".theme-toggle:hover{border-color:var(--warm,#BB7E60);transform:rotate(20deg);}",

    "#menuToggle{background:none;border:none;font-size:22px;cursor:pointer;",
    "color:var(--text);padding:4px 8px;line-height:1;",
    "min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;}",

    ".theme-toggle:focus-visible,#menuToggle:focus-visible{",
    "outline:2px solid var(--warm,#BB7E60);outline-offset:3px;border-radius:4px;}",

    /* ── Nav menu dropdown ── */
    "#navMenu{display:none;position:fixed;top:60px;left:0;right:0;",
    "background:var(--bg);border-bottom:1px solid var(--border);",
    "box-shadow:0 16px 40px var(--shadow,rgba(0,0,0,.3));z-index:299;",
    "max-height:calc(100vh - 60px);overflow-y:auto;",
    "border-radius:0;padding:0;min-width:unset;transform:none;animation:none;}",
    "#navMenu.open{display:block;}",

    "#navOverlay{display:none;position:fixed;inset:0;top:60px;",
    "z-index:298;background:rgba(0,0,0,.2);",
    "opacity:1;pointer-events:auto;backdrop-filter:none;transition:none;}",
    "#navOverlay.open{display:block;}",

    ".nav-panel-inner{max-width:960px;margin:0 auto;padding:32px 24px 36px;}",
    "@media(min-width:1024px){.nav-panel-inner{display:grid;grid-template-columns:1fr 1fr 1fr;gap:48px;}}",
    "@media(min-width:768px) and (max-width:1023px){",
    ".nav-panel-inner{display:grid;grid-template-columns:1fr 1fr;gap:32px;}",
    ".nav-pole:last-child{grid-column:1/-1;}",
    ".nav-pole:last-child .nav-link{display:inline-flex;margin-right:24px;}}",
    "@media(min-width:568px) and (max-width:767px){",
    ".nav-panel-inner{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:18px 20px 22px;}",
    ".nav-pole-label{font-size:9px !important;}",
    ".nav-link{padding:8px 6px !important;font-size:12px !important;min-height:40px !important;}}",
    "@media(max-width:567px){",
    ".nav-panel-inner{display:flex;flex-direction:column;gap:0;padding:0;}",
    ".nav-pole{border-bottom:1px solid var(--border);padding:14px 20px 10px;}",
    ".nav-pole:last-child{border-bottom:none;}",
    ".nav-link{padding:12px 6px !important;font-size:14px !important;min-height:44px !important;display:flex;align-items:center;}}",

    ".nav-pole{display:flex;flex-direction:column;}",
    ".nav-pole-label{font-family:'Poppins',sans-serif;font-size:10px;font-weight:700;",
    "letter-spacing:2.2px;text-transform:uppercase;color:var(--warm,#BB7E60);",
    "padding-bottom:12px;margin-bottom:6px;border-bottom:1px solid var(--border);}",

    ".nav-link{font-family:'Poppins',sans-serif;font-size:13px;font-weight:500;",
    "color:var(--text);text-decoration:none;padding:9px 6px;",
    "border-radius:6px;transition:background .15s,color .15s,padding-left .15s;display:block;}",
    ".nav-link:hover{background:var(--surface,rgba(187,126,96,.08));color:var(--warm,#BB7E60);padding-left:12px;}",
    ".nav-link[aria-current='page']{color:var(--warm,#BB7E60);}",
    ".nav-link:focus-visible{outline:2px solid var(--warm,#BB7E60);outline-offset:3px;border-radius:4px;}",

    /* ── Footer ── */
    "footer{background:var(--bg3,#2C1A12);padding:60px 24px 40px;",
    "border-top:1px solid var(--border);text-align:center;}",
    ".footer-inner{max-width:720px;margin:0 auto;",
    "display:flex;flex-direction:column;align-items:center;gap:18px;}",
    ".footer-logo{font-family:'Montserrat',sans-serif;font-weight:700;",
    "font-size:26px;letter-spacing:-.06em;text-decoration:none;line-height:1;display:block;}",
    "[data-theme='night'] .footer-logo span{color:#F0EAE7;}",
    "[data-theme='day'] .footer-logo span:nth-child(1),",
    "[data-theme='day'] .footer-logo span:nth-child(5){color:#4E291F;}",
    "[data-theme='day'] .footer-logo span:nth-child(2){color:#BB7E60;}",
    "[data-theme='day'] .footer-logo span:nth-child(3){color:#C45279;}",
    "[data-theme='day'] .footer-logo span:nth-child(4){color:#C34234;}",
    ".footer-sub{font-family:'Poppins',sans-serif;font-size:13px;",
    "line-height:1.5;opacity:.82;}",
    "[data-theme='night'] .footer-sub{color:#F0EAE7;}",
    "[data-theme='day'] .footer-sub{color:#4E291F;}",
    ".footer-social{display:flex;justify-content:center;gap:12px;}",
    ".social-icon{display:inline-flex;align-items:center;justify-content:center;",
    "width:40px;height:40px;border-radius:999px;",
    "color:var(--text-dim,#8C6A5A);border:1px solid rgba(187,126,96,.34);",
    "background:rgba(187,126,96,.08);text-decoration:none;",
    "transition:background .2s,border-color .2s,color .2s,transform .2s;}",
    ".social-icon:hover,.social-icon:focus-visible{",
    "color:#F0EAE7;background:#BB7E60;border-color:#BB7E60;transform:translateY(-1px);}",
    "[data-theme='night'] .social-icon{color:rgba(240,234,231,0.65);}",
    ".footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 20px;}",
    ".footer-link{display:inline-flex;align-items:center;min-height:40px;",
    "font-family:'Poppins',sans-serif;font-size:13px;font-weight:500;",
    "color:var(--text-dim);text-decoration:none;position:relative;transition:color .22s;}",
    ".footer-link::after{content:'';position:absolute;left:0;bottom:-3px;",
    "width:100%;height:1px;background:currentColor;",
    "transform:scaleX(0);transform-origin:left;transition:transform .22s ease;opacity:.5;}",
    ".footer-link:hover,.footer-link:focus-visible{color:var(--warm,#BB7E60);}",
    ".footer-link:hover::after,.footer-link:focus-visible::after{transform:scaleX(1);}",
    "[data-theme='night'] .footer-link{color:rgba(240,234,231,0.75);}",
    ".footer-note{font-family:'Poppins',sans-serif;font-size:12px;",
    "color:var(--text-dim);line-height:1.5;}",
    "[data-theme='night'] .footer-note{color:rgba(240,234,231,0.66);}",
    "@media(max-width:640px){footer{padding:40px 18px 28px;}.footer-inner{gap:14px;}}",
  ].join("\n");

  var styleEl = document.createElement("style");
  styleEl.id = "foebe-shell-css";
  styleEl.textContent = SHELL_CSS;
  document.head.appendChild(styleEl);


  /* ═══════════════════════════════════════════════════════════════════════════
     2. DÉTECTION DE LA PAGE COURANTE (pour aria-current)
  ═══════════════════════════════════════════════════════════════════════════ */
  var currentFile = (window.location.pathname.split("/").pop() || "index.html").split("?")[0];


  /* ═══════════════════════════════════════════════════════════════════════════
     3. INJECTION DU NAV
     Remplace le contenu de #mainNav + injecte #navMenu et #navOverlay.
  ═══════════════════════════════════════════════════════════════════════════ */
  var NAV_STRUCTURE = [
    { pole: "Comprendre", links: [
      { href: "a-propos.html",  label: "À propos"     },
      { href: "methode.html",   label: "La méthode"   }
    ]},
    { pole: "Explorer", links: [
      { href: "test.html",                   label: "Échelle Foébé"  },
      { href: "foebe-zones-cadre.html",      label: "Les 7 zones"   },
      { href: "respiration.html",            label: "Respiration"   },
      { href: "boussole-accueil-foebe.html", label: "La Boussole"   }
    ]},
    { pole: "Ressources", links: [
      { href: "stories.html",     label: "Lexique Foébé"  },
      { href: "dictionnaire.html", label: "Dictionnaire"  }
    ]}
  ];

  function buildNavHTML() {
    return NAV_STRUCTURE.map(function (pole) {
      var links = pole.links.map(function (l) {
        var isCurrent = l.href === currentFile;
        return '<a class="nav-link" href="' + l.href + '"' +
          (isCurrent ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
      }).join("");
      return '<div class="nav-pole">' +
        '<span class="nav-pole-label">' + pole.pole + '</span>' +
        links + '</div>';
    }).join("");
  }

  /* -- Nav bar (barre fixe en haut) -- */
  var mainNav = document.getElementById("mainNav");
  if (mainNav) {
    mainNav.setAttribute("aria-label", "Navigation principale");
    mainNav.innerHTML =
      '<a aria-label="Maison Foébé — accueil" class="nav-logo" href="index.html">' +
        '<span>F</span><span>o</span><span>é</span><span>b</span><span>é</span>' +
      '</a>' +
      '<div class="nav-right">' +
        '<button aria-label="Changer le thème" class="theme-toggle" id="themeToggle" type="button">☀️</button>' +
        '<button aria-controls="navMenu" aria-expanded="false" aria-label="Ouvrir le menu" id="menuToggle" type="button">☰</button>' +
      '</div>';
  }

  /* -- Dropdown menu panel -- */
  var navMenu = document.getElementById("navMenu");
  if (!navMenu) {
    navMenu = document.createElement("div");
    navMenu.id = "navMenu";
    var insertAfter = mainNav || document.body.firstChild;
    if (insertAfter && insertAfter.nextSibling) {
      insertAfter.parentNode.insertBefore(navMenu, insertAfter.nextSibling);
    } else {
      document.body.appendChild(navMenu);
    }
  }
  navMenu.setAttribute("role", "navigation");
  navMenu.setAttribute("aria-label", "Menu principal");
  navMenu.setAttribute("aria-hidden", "true");
  navMenu.className = "";
  navMenu.innerHTML = '<div class="nav-panel-inner">' + buildNavHTML() + '</div>';

  /* -- Overlay sombre derrière le menu -- */
  var navOverlay = document.getElementById("navOverlay");
  if (!navOverlay) {
    navOverlay = document.createElement("div");
    navOverlay.id = "navOverlay";
    navMenu.parentNode.insertBefore(navOverlay, navMenu.nextSibling);
  }
  navOverlay.setAttribute("aria-hidden", "true");
  navOverlay.className = "";


  /* ═══════════════════════════════════════════════════════════════════════════
     4. INJECTION DU FOOTER
  ═══════════════════════════════════════════════════════════════════════════ */
  var INSTA_SVG = '<svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">' +
    '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>' +
  '</svg>';

  var TIKTOK_SVG = '<svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">' +
    '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.49-3.35-3.98-5.6-.46-2.14.24-4.43 1.71-6.04 1.42-1.57 3.59-2.46 5.77-2.35.62.03 1.23.12 1.83.26v4.14c-.67-.31-1.41-.45-2.14-.38-1.01.09-1.95.69-2.47 1.56-.56.93-.68 2.12-.34 3.14.35 1.06 1.19 1.93 2.23 2.34 1.14.45 2.47.35 3.52-.29 1.05-.64 1.74-1.78 1.81-2.99.02-3.08 0-6.16.01-9.24-.06-1.37-.59-2.71-1.56-3.71-.96-1-2.27-1.63-3.65-1.75-.13-.01-.26-.02-.39-.02v-4.05z"/>' +
  '</svg>';

  var footerEl = document.querySelector("footer");
  if (footerEl) {
    footerEl.innerHTML =
      '<div class="footer-inner">' +
        '<a aria-label="Retour accueil Maison Foébé" class="footer-logo" href="index.html">' +
          '<span>F</span><span>o</span><span>é</span><span>b</span><span>é</span>' +
        '</a>' +
        '<p class="footer-sub">Maison Foébé · Espace structuré du self-care</p>' +
        '<div class="footer-social">' +
          '<a aria-label="Instagram Maison Foébé" class="social-icon" href="https://www.instagram.com/maisonfoebe/" rel="noopener noreferrer" target="_blank">' + INSTA_SVG + '</a>' +
          '<a aria-label="TikTok Maison Foébé" class="social-icon" href="https://www.tiktok.com/@maisonfoebe" rel="noopener noreferrer" target="_blank">' + TIKTOK_SVG + '</a>' +
        '</div>' +
        '<div class="footer-links">' +
          '<a class="footer-link" href="mentions.html">Mentions légales</a>' +
          '<a class="footer-link" href="mailto:foebecosmetics@gmail.com">Contact</a>' +
          '<a class="footer-link" href="a-propos.html">À propos</a>' +
          '<a class="footer-link" href="methode.html">Méthode</a>' +
        '</div>' +
        '<p class="footer-note">© 2026 Maison Foébé · Tous droits réservés</p>' +
      '</div>';
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     5. THÈME TOGGLE (mode jour / mode nuit)
  ═══════════════════════════════════════════════════════════════════════════ */
  var h   = document.documentElement;
  var btn = document.getElementById("themeToggle");

  function syncThemeButton() {
    if (!btn) return;
    var isNight = h.getAttribute("data-theme") === "night";
    btn.textContent = isNight ? "☀️" : "🌙";
    btn.setAttribute("aria-label", isNight ? "Passer en mode jour" : "Passer en mode nuit");
  }

  syncThemeButton();

  if (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var next = h.getAttribute("data-theme") === "night" ? "day" : "night";
      h.setAttribute("data-theme", next);
      syncThemeButton();
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     6. MENU HAMBURGER
  ═══════════════════════════════════════════════════════════════════════════ */
  var menuToggle = document.getElementById("menuToggle");

  function closeMenu() {
    navMenu.classList.remove("open");
    navMenu.setAttribute("aria-hidden", "true");
    navOverlay.classList.remove("open");
    navOverlay.setAttribute("aria-hidden", "true");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  }

  function openMenu() {
    navMenu.classList.add("open");
    navMenu.setAttribute("aria-hidden", "false");
    navOverlay.classList.add("open");
    navOverlay.setAttribute("aria-hidden", "false");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.textContent = "×";
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.contains("open") ? closeMenu() : openMenu();
    });
  }
  navOverlay.addEventListener("click", closeMenu);
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });


  /* ═══════════════════════════════════════════════════════════════════════════
     7. ANIMATIONS REVEAL AU SCROLL
     Déclenche .visible sur les éléments .reveal quand ils entrent dans la vue.
  ═══════════════════════════════════════════════════════════════════════════ */
  var revealEls = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  var revealObs = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function (el) { revealObs.observe(el); });

})();
