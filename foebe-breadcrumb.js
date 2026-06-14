/**
 * foebe-breadcrumb.js — Maison Foébé
 * Mini-module autonome pour le fil d'Ariane.
 *
 * Rôle :
 * - détecter la page actuelle ;
 * - injecter un fil d'Ariane léger dans le hero ;
 * - ne jamais toucher au menu, au footer, au thème ou au fallback ;
 * - ne rien faire si un fil d'Ariane existe déjà ou si la page est désactivée.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  function attr(name) {
    return (root && root.getAttribute(name)) || (body && body.getAttribute(name)) || "";
  }

  var mode = String(attr("data-foebe-breadcrumb") || "").toLowerCase();
  if (mode === "none" || mode === "off" || mode === "false") return;
  if (document.querySelector(".foebe-breadcrumb")) return;

  function normalizeFile(file) {
    file = String(file || "index.html").toLowerCase();
    try { file = decodeURIComponent(file); } catch (e) {}

    if (file === "" || file === "/" || file === "index" || file.indexOf("index-") === 0 || file.indexOf("index_") === 0) return "index.html";

    if (file === "comprendre" || file.indexOf("comprendre") === 0) return "comprendre.html";
    if (file === "pratiquer" || file.indexOf("pratiquer") === 0) return "pratiquer.html";
    if (file === "methode" || file === "méthode" || file.indexOf("methode") === 0 || file.indexOf("méthode") === 0) return "methode.html";
    if (file === "a-propos" || file.indexOf("a-propos") === 0 || file.indexOf("apropos") === 0) return "a-propos.html";

    if (file === "test" || file.indexOf("test") === 0 || file.indexOf("echelle") === 0 || file.indexOf("échelle") === 0) return "test.html";
    if (file === "foebe-zones-cadre" || file.indexOf("foebe-zones-cadre") === 0) return "foebe-zones-cadre.html";
    if (file === "respiration" || file.indexOf("respiration") === 0) return "respiration.html";
    if (file === "boussole-accueil-foebe" || file.indexOf("boussole") === 0) return "boussole-accueil-foebe.html";

    if (file.indexOf("zone-energie") === 0 || file.indexOf("zone-énergie") === 0) return "zone-energie.html";
    if (file.indexOf("zone-corps") === 0) return "zone-corps.html";
    if (file.indexOf("zone-mental") === 0) return "zone-mental.html";
    if (file.indexOf("zone-emotions") === 0 || file.indexOf("zone-émotions") === 0) return "zone-emotions.html";
    if (file.indexOf("zone-environnement") === 0) return "zone-environnement.html";
    if (file.indexOf("zone-relations") === 0) return "zone-relations.html";
    if (file.indexOf("zone-sens") === 0) return "zone-sens.html";

    if (file === "stories" || file.indexOf("stories") === 0 || file.indexOf("lexique") === 0) return "stories.html";
    if (file === "dictionnaire" || file.indexOf("dictionnaire") === 0) return "dictionnaire.html";
    if (file === "mentions" || file.indexOf("mentions") === 0) return "mentions.html";

    return file;
  }

  var currentFile = normalizeFile((window.location.pathname.split("/").pop() || "index.html").split("?")[0].split("#")[0]);

  var trails = {
    "comprendre.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Découvrir" },
      { label: "Comprendre", current: true }
    ],
    "a-propos.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Découvrir" },
      { label: "À propos", current: true }
    ],
    "methode.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Découvrir" },
      { label: "La méthode Foébé", current: true }
    ],
    "pratiquer.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { label: "4 outils", current: true }
    ],
    "test.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { label: "Échelle Foébé", current: true }
    ],
    "foebe-zones-cadre.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { label: "Comprendre les 7 zones", current: true }
    ],
    "respiration.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { label: "Respiration guidée", current: true }
    ],
    "boussole-accueil-foebe.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { label: "La Boussole", current: true }
    ],
    "dictionnaire.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Ressources" },
      { label: "Dictionnaire", current: true }
    ],
    "mentions.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Informations" },
      { label: "Mentions légales", current: true }
    ],
    "zone-corps.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Corps", current: true }
    ],
    "zone-emotions.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Émotions", current: true }
    ],
    "zone-mental.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Mental", current: true }
    ],
    "zone-energie.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Énergie", current: true }
    ],
    "zone-environnement.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Environnement", current: true }
    ],
    "zone-relations.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Relations", current: true }
    ],
    "zone-sens.html": [
      { href: "index.html", label: "Accueil" },
      { label: "Pratiquer" },
      { href: "foebe-zones-cadre.html", label: "7 zones" },
      { label: "Sens", current: true }
    ]
  };

  /* Le Lexique / stories reste immersif par défaut. */
  if (currentFile === "stories.html" && mode !== "force") return;
  if (currentFile === "index.html") return;

  if (currentFile === "stories.html" && mode === "force") {
    trails[currentFile] = [
      { href: "index.html", label: "Accueil" },
      { label: "Ressources" },
      { label: "Lexique Foébé", current: true }
    ];
  }

  var trail = trails[currentFile];
  if (!trail) return;

  function injectCss() {
    if (document.getElementById("foebe-breadcrumb-css")) return;

    var css = [
      ".foebe-breadcrumb{width:min(100%,760px);margin:0 0 clamp(18px,3svh,28px);padding:9px 13px;border-radius:999px;background:rgba(240,234,231,.085);border:1px solid rgba(187,126,96,.28);font-family:'Poppins',sans-serif;font-size:12.5px;line-height:1.45;color:var(--text,#F0EAE7);overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;}",
      ".foebe-breadcrumb::-webkit-scrollbar{display:none;}",
      "[data-theme='day'] .foebe-breadcrumb{background:rgba(78,41,31,.045);border-color:rgba(78,41,31,.14);color:#4E291F;}",
      ".foebe-breadcrumb ol{display:flex;align-items:center;gap:7px;list-style:none;margin:0;padding:0;white-space:nowrap;}",
      ".foebe-breadcrumb li{display:inline-flex;align-items:center;gap:7px;min-width:0;}",
      ".foebe-breadcrumb li:not(:last-child)::after{content:'›';color:#BB7E60;opacity:.68;font-weight:600;}",
      ".foebe-breadcrumb a,.foebe-breadcrumb span{color:currentColor;text-decoration:none;opacity:.78;}",
      ".foebe-breadcrumb a{transition:color .18s ease,opacity .18s ease;}",
      ".foebe-breadcrumb a:hover,.foebe-breadcrumb a:focus-visible{color:#BB7E60;opacity:1;}",
      ".foebe-breadcrumb [aria-current='page']{color:#BB7E60!important;font-weight:700;opacity:1;}",
      "@media(max-width:520px){.foebe-breadcrumb{width:100%;max-width:100%;padding:8px 11px;border-radius:18px;font-size:11.5px;margin-bottom:18px;}.foebe-breadcrumb ol{gap:6px;}.foebe-breadcrumb li{gap:6px;}}",
      "@media(prefers-reduced-motion:reduce){.foebe-breadcrumb a{transition:none;}}"
    ].join("\n");

    var style = document.createElement("style");
    style.id = "foebe-breadcrumb-css";
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderTrail(items) {
    return items.map(function (item) {
      var label = escapeHtml(item.label);
      if (item.current) {
        return '<li><span aria-current="page">' + label + '</span></li>';
      }
      if (item.href) {
        return '<li><a href="' + escapeHtml(item.href) + '">' + label + '</a></li>';
      }
      return '<li><span>' + label + '</span></li>';
    }).join("");
  }

  function injectBreadcrumb() {
    injectCss();

    var nav = document.createElement("nav");
    nav.className = "foebe-breadcrumb";
    nav.setAttribute("aria-label", "Fil d’Ariane");
    nav.setAttribute("data-foebe-auto", "1");
    nav.innerHTML = "<ol>" + renderTrail(trail) + "</ol>";

    var heroInner = document.querySelector(".hero .hero-inner") || document.querySelector(".hero-inner");
    var main = document.querySelector("main");

    if (heroInner) {
      var h1 = heroInner.querySelector("h1");
      heroInner.insertBefore(nav, h1 || heroInner.firstChild);
      return;
    }

    if (main) {
      main.insertBefore(nav, main.firstChild);
      return;
    }

    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectBreadcrumb, { once: true });
  } else {
    injectBreadcrumb();
  }
})();
