/**
 * foebe-shell.js — Maison Foébé
 * Version routes publiques 2026 — nav/footer/fil d’Ariane unifiés
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
  var SHELL_CSS = [
    "#mainNav{position:fixed!important;top:0!important;left:0!important;right:0!important;height:60px!important;",
    "background:color-mix(in srgb,var(--bg) 92%,transparent)!important;border-bottom:1px solid var(--border,rgba(187,126,96,.25))!important;",
    "display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 clamp(16px,3vw,28px)!important;",
    "z-index:99990!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;",
    "box-shadow:0 8px 28px rgba(0,0,0,.08)!important;transition:background .35s,border-color .35s,box-shadow .35s!important;}",
    "[data-theme='day'] #mainNav{background:rgba(240,234,231,.92)!important;box-shadow:0 8px 26px rgba(78,41,31,.08)!important;}",
    "[data-theme='night'] #mainNav{background:rgba(78,41,31,.90)!important;box-shadow:0 10px 32px rgba(0,0,0,.20)!important;}",

    ".nav-logo{font-family:'Montserrat',sans-serif!important;font-weight:700!important;font-size:18px!important;text-decoration:none!important;letter-spacing:-.06em!important;line-height:1!important;display:inline-flex!important;align-items:center!important;min-height:44px!important;}",
    "[data-theme='night'] .nav-logo span{color:#F0EAE7!important;}",
    "[data-theme='day'] .nav-logo span:nth-child(1),[data-theme='day'] .nav-logo span:nth-child(5){color:#4E291F!important;}",
    "[data-theme='day'] .nav-logo span:nth-child(2){color:#BB7E60!important;}[data-theme='day'] .nav-logo span:nth-child(3){color:#C45279!important;}[data-theme='day'] .nav-logo span:nth-child(4){color:#C34234!important;}",
    ".nav-logo:hover span{filter:brightness(1.08)!important;}",

    ".nav-right{display:flex!important;align-items:center!important;gap:10px!important;}",
    ".theme-toggle,#menuToggle{appearance:none!important;-webkit-appearance:none!important;}",
    ".theme-toggle{background:rgba(187,126,96,.11)!important;border:1px solid rgba(187,126,96,.34)!important;color:var(--text,#F0EAE7)!important;border-radius:999px!important;width:38px!important;height:38px!important;font-size:16px!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;transition:transform .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease!important;}",
    ".theme-toggle:hover{border-color:#BB7E60!important;background:rgba(187,126,96,.18)!important;transform:rotate(18deg) translateY(-1px)!important;box-shadow:0 8px 20px rgba(187,126,96,.18)!important;}",
    "#menuToggle{background:rgba(187,126,96,.08)!important;border:1px solid rgba(187,126,96,.28)!important;border-radius:999px!important;font-size:22px!important;cursor:pointer!important;color:var(--text,#F0EAE7)!important;padding:0!important;line-height:1!important;min-width:44px!important;min-height:44px!important;width:44px!important;height:44px!important;display:flex!important;align-items:center!important;justify-content:center!important;transition:background .22s ease,border-color .22s ease,color .22s ease,transform .22s ease,box-shadow .22s ease!important;}",
    "#menuToggle:hover,#menuToggle[aria-expanded='true']{background:#BB7E60!important;border-color:#BB7E60!important;color:#F0EAE7!important;transform:translateY(-1px)!important;box-shadow:0 12px 26px rgba(187,126,96,.22)!important;}",
    ".theme-toggle:focus-visible,#menuToggle:focus-visible{outline:2px solid #BB7E60!important;outline-offset:3px!important;}",

    "#navMenu{display:block!important;position:fixed!important;top:60px!important;left:0!important;right:0!important;z-index:99989!important;max-height:calc(100vh - 60px)!important;overflow-y:auto!important;",
    "background:linear-gradient(180deg,color-mix(in srgb,var(--bg) 96%,#BB7E60 4%),var(--bg))!important;border-bottom:1px solid rgba(187,126,96,.30)!important;",
    "box-shadow:0 28px 70px rgba(0,0,0,.28)!important;transform:translateY(-14px)!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .22s ease,transform .26s cubic-bezier(.16,1,.3,1),visibility .22s!important;}",
    "#navMenu.open{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:translateY(0)!important;}",
    "[data-theme='day'] #navMenu{background:linear-gradient(180deg,rgba(240,234,231,.98),rgba(232,221,216,.98))!important;box-shadow:0 26px 62px rgba(78,41,31,.16)!important;}",
    "[data-theme='night'] #navMenu{background:linear-gradient(180deg,rgba(78,41,31,.98),rgba(58,26,16,.98))!important;box-shadow:0 30px 76px rgba(0,0,0,.42)!important;}",
    "#navOverlay{display:block!important;position:fixed!important;inset:0!important;top:60px!important;z-index:99988!important;background:rgba(0,0,0,.24)!important;backdrop-filter:blur(2px)!important;-webkit-backdrop-filter:blur(2px)!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .22s ease,visibility .22s!important;}",
    "#navOverlay.open{opacity:1!important;visibility:visible!important;pointer-events:auto!important;}",
    "[data-theme='day'] #navOverlay{background:rgba(78,41,31,.12)!important;}",

    ".nav-panel-inner{max-width:1040px!important;margin:0 auto!important;padding:34px clamp(20px,4vw,40px) 38px!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(18px,3vw,42px)!important;}",
    ".nav-pole{display:flex!important;flex-direction:column!important;min-width:0!important;}",
    ".nav-pole-label{font-family:'Poppins',sans-serif!important;font-size:10px!important;font-weight:700!important;letter-spacing:2.2px!important;text-transform:uppercase!important;color:#BB7E60!important;padding-bottom:12px!important;margin-bottom:8px!important;border-bottom:1px solid rgba(187,126,96,.30)!important;}",
    ".nav-link{font-family:'Poppins',sans-serif!important;font-size:13px!important;font-weight:500!important;color:var(--text,#F0EAE7)!important;text-decoration:none!important;padding:10px 10px!important;border-radius:12px!important;min-height:42px!important;display:flex!important;align-items:center!important;position:relative!important;isolation:isolate!important;transition:color .18s ease,background .18s ease,padding-left .18s ease,transform .18s ease!important;}",
    ".nav-link::before{content:''!important;position:absolute!important;inset:5px!important;border-radius:10px!important;background:rgba(187,126,96,.12)!important;opacity:0!important;transform:scale(.98)!important;z-index:-1!important;transition:opacity .18s ease,transform .18s ease!important;}",
    ".nav-link::after{content:''!important;position:absolute!important;left:10px!important;top:50%!important;width:5px!important;height:5px!important;border-radius:999px!important;background:#BB7E60!important;opacity:0!important;transform:translateY(-50%) scale(.6)!important;transition:opacity .18s ease,transform .18s ease!important;}",
    ".nav-link:hover{color:#BB7E60!important;padding-left:22px!important;transform:translateX(2px)!important;background:transparent!important;}",
    ".nav-link:hover::before,.nav-link[aria-current='page']::before{opacity:1!important;transform:scale(1)!important;}",
    ".nav-link:hover::after,.nav-link[aria-current='page']::after{opacity:1!important;transform:translateY(-50%) scale(1)!important;}",
    ".nav-link[aria-current='page']{color:#BB7E60!important;padding-left:22px!important;font-weight:700!important;}",
    ".nav-link[aria-current='page']{background:#BB7E60!important;color:#F0EAE7!important;border-color:#BB7E60!important;box-shadow:0 12px 26px rgba(187,126,96,.22)!important;}",
    ".nav-link[aria-current='page']::before{opacity:0!important;transform:scale(1)!important;}",
    ".nav-link[aria-current='page']::after{background:#F0EAE7!important;opacity:1!important;transform:translateY(-50%) scale(1)!important;}",
    ".nav-link[aria-current='page']:hover{background:#BB7E60!important;color:#F0EAE7!important;padding-left:22px!important;transform:translateX(2px)!important;}",
    ".nav-link:focus-visible{outline:2px solid #BB7E60!important;outline-offset:3px!important;}",

    "footer{background:#2C1A12!important;color:#F0EAE7!important;padding:60px 24px 40px!important;border-top:1px solid rgba(187,126,96,.28)!important;text-align:center!important;}",
    "[data-theme='day'] footer{background:#DDD0CB!important;color:#4E291F!important;border-top-color:rgba(78,41,31,.18)!important;}",
    "[data-theme='night'] footer{background:#2C1A12!important;color:#F0EAE7!important;border-top-color:rgba(187,126,96,.28)!important;}",
    ".footer-inner{max-width:720px!important;margin:0 auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:18px!important;}",
    ".footer-logo{font-family:'Montserrat',sans-serif!important;font-weight:700!important;font-size:26px!important;letter-spacing:-.06em!important;text-decoration:none!important;line-height:1!important;display:block!important;}",
    "[data-theme='night'] .footer-logo span{color:#F0EAE7!important;}",
    "[data-theme='day'] .footer-logo span:nth-child(1),[data-theme='day'] .footer-logo span:nth-child(5){color:#4E291F!important;}",
    "[data-theme='day'] .footer-logo span:nth-child(2){color:#BB7E60!important;}[data-theme='day'] .footer-logo span:nth-child(3){color:#C45279!important;}[data-theme='day'] .footer-logo span:nth-child(4){color:#C34234!important;}",
    ".footer-sub{font-family:'Poppins',sans-serif!important;font-size:13px!important;line-height:1.5!important;opacity:.86!important;color:currentColor!important;}",
    ".footer-social{display:flex!important;justify-content:center!important;gap:12px!important;}",
    ".social-icon{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:40px!important;height:40px!important;border-radius:999px!important;color:currentColor!important;border:1px solid rgba(187,126,96,.38)!important;background:rgba(187,126,96,.10)!important;text-decoration:none!important;transition:background .2s,border-color .2s,color .2s,transform .2s,box-shadow .2s!important;}",
    ".social-icon:hover,.social-icon:focus-visible{color:#F0EAE7!important;background:#BB7E60!important;border-color:#BB7E60!important;transform:translateY(-1px)!important;box-shadow:0 12px 24px rgba(187,126,96,.22)!important;}",
    ".footer-links{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:12px 20px!important;}",
    ".footer-link{display:inline-flex!important;align-items:center!important;min-height:40px!important;font-family:'Poppins',sans-serif!important;font-size:13px!important;font-weight:500!important;color:currentColor!important;text-decoration:none!important;position:relative!important;transition:color .22s!important;opacity:.78!important;}",
    ".footer-link::after{content:''!important;position:absolute!important;left:0!important;bottom:-3px!important;width:100%!important;height:1px!important;background:currentColor!important;transform:scaleX(0)!important;transform-origin:left!important;transition:transform .22s ease!important;opacity:.55!important;}",
    ".footer-link:hover,.footer-link:focus-visible{color:#BB7E60!important;opacity:1!important;}",
    ".footer-link:hover::after,.footer-link:focus-visible::after{transform:scaleX(1)!important;}",
    ".footer-note{font-family:'Poppins',sans-serif!important;font-size:12px!important;color:currentColor!important;line-height:1.5!important;opacity:.68!important;}",

    "@media(max-width:900px){.nav-panel-inner{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:22px 30px!important;padding:26px 22px 30px!important;}.nav-pole:last-child{grid-column:1/-1!important;}.nav-pole:last-child .nav-link{display:inline-flex!important;margin-right:10px!important;}}",
    "@media(max-width:640px){#mainNav{height:58px!important;padding:0 16px!important;}#navMenu{top:58px!important;max-height:calc(100vh - 58px)!important;}#navOverlay{top:58px!important;}.nav-panel-inner{display:flex!important;flex-direction:column!important;gap:0!important;padding:0!important;}.nav-pole{border-bottom:1px solid rgba(187,126,96,.25)!important;padding:15px 18px 12px!important;}.nav-pole:last-child{border-bottom:none!important;}.nav-pole-label{font-size:10px!important;margin-bottom:6px!important;padding-bottom:10px!important;}.nav-link{font-size:14px!important;min-height:46px!important;padding:12px 10px!important;border-radius:10px!important;}.nav-link:hover,.nav-link[aria-current='page']{padding-left:24px!important;}footer{padding:42px 18px 30px!important;}.footer-inner{gap:14px!important;}.footer-links{gap:6px 16px!important;}.footer-link{font-size:12.5px!important;}}",
    "@media(max-width:380px){.nav-logo{font-size:17px!important;}#menuToggle{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;}.theme-toggle{width:36px!important;height:36px!important;}.nav-panel-inner{padding-bottom:8px!important;}}",

    "",
    "",
    "",
    "@media(prefers-reduced-motion:reduce){#navMenu,#navOverlay,.nav-link,.nav-link::before,.nav-link::after,#menuToggle,.theme-toggle,.social-icon{transition:none!important;}}"
  ].join("\n");

  var oldStyle = document.getElementById("foebe-shell-css");
  if (oldStyle) oldStyle.remove();
  var styleEl = document.createElement("style");
  styleEl.id = "foebe-shell-css";
  styleEl.textContent = SHELL_CSS;
  document.head.appendChild(styleEl);

  /* ═══════════════════════════════════════════════════════════════════════════
     1.1 FIL D'ARIANE — intégré au Shell, sans fichier JS externe
     Objectif : repère détaillé, homogène, sans container global.
     Correction : placement adapté aux pages avec/sans hero + pages animées.
  ═══════════════════════════════════════════════════════════════════════════ */
  (function injectFoebeBreadcrumbFast() {
    /* Sécurité pages chargées différemment (ex. Dictionnaire) :
       si le Shell s'exécute avant que le contenu existe, on relance au DOM prêt. */
    if (!document.body || (document.readyState === "loading" && !document.querySelector("main,.hero,#stateIntro,.dict-hero,.dict-layout"))) {
      if (!window.__foebeBreadcrumbDomReadyQueued) {
        window.__foebeBreadcrumbDomReadyQueued = true;
        document.addEventListener("DOMContentLoaded", function () {
          window.__foebeBreadcrumbDomReadyQueued = false;
          injectFoebeBreadcrumbFast();
        }, { once: true });
      }
      return;
    }

    var root = document.documentElement;
    var body = document.body;

    function attr(name) {
      return (root && root.getAttribute(name)) || (body && body.getAttribute(name)) || "";
    }

    var mode = String(attr("data-foebe-breadcrumb") || "").toLowerCase();
    if (mode === "none" || mode === "off" || mode === "false") return;

    /* Une seule version du fil d'Ariane : on supprime les anciens blocs statiques
       ou les anciennes injections automatiques avant de reconstruire le rendu. */
    document.querySelectorAll(".foebe-breadcrumb").forEach(function (oldBreadcrumb) {
      if (oldBreadcrumb && oldBreadcrumb.parentNode) oldBreadcrumb.parentNode.removeChild(oldBreadcrumb);
    });

    function normalizeFile(file) {
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

      if (
        file === "test" ||
        file === "testpratiquer" ||
        file === "test-pratiquer" ||
        file.indexOf("test") === 0 ||
        file.indexOf("echelle") === 0 ||
        file.indexOf("échelle") === 0 ||
        file.indexOf("echelle-foebe") === 0 ||
        file.indexOf("échelle-foébé") === 0
      ) return "echelle-foebe.html";

      if (
        file === "zones" ||
        file.indexOf("zones-cadre") === 0 ||
        file.indexOf("7-zones") === 0 ||
        file.indexOf("sept-zones") === 0
      ) return "zones.html";

      if (
        file === "respiration" ||
        file.indexOf("respiration") === 0 ||
        file.indexOf("respiration-guidee") === 0 ||
        file.indexOf("respiration-guidée") === 0 ||
        file.indexOf("respiration-foebe") === 0
      ) return "respiration.html";

      if (
        file === "boussole/scenarios" ||
        file === "boussole/scenario" ||
        file === "scenarios" ||
        file === "scenario" ||
        file.indexOf("boussole/scenarios") === 0 ||
        file.indexOf("boussole/scenario") === 0
      ) return "boussole-scenarios.html";

      if (
        file.indexOf("sas-boussole") === 0 ||
        file.indexOf("sas-de-la-boussole") === 0
      ) return "boussole.html";
      if (file === "boussole" || file.indexOf("boussole") === 0) return "boussole.html";

      if (file.indexOf("zone-energie") === 0 || file.indexOf("zone-énergie") === 0) return "zone-energie.html";
      if (file.indexOf("zone-corps") === 0) return "zone-corps.html";
      if (file.indexOf("zone-mental") === 0) return "zone-mental.html";
      if (file.indexOf("zone-emotions") === 0 || file.indexOf("zone-émotions") === 0) return "zone-emotions.html";
      if (file.indexOf("zone-environnement") === 0) return "zone-environnement.html";
      if (file.indexOf("zone-relations") === 0) return "zone-relations.html";
      if (file.indexOf("zone-sens") === 0) return "zone-sens.html";

      if (file === "lexique" || file.indexOf("lexique") === 0) return "lexique.html";
      if (
        file === "dictionnaire" ||
        file.indexOf("dictionnaire") === 0 ||
        file.indexOf("bibliotheque") === 0 ||
        file.indexOf("bibliothèque") === 0
      ) return "dictionnaire.html";

      if (file === "mentions" || file.indexOf("mentions") === 0) return "mentions-legales.html";
      return file;
    }

    function getCurrentFile() {
      var path = window.location.pathname || "/";
      try { path = decodeURIComponent(path); } catch (e) {}
      path = path.split("?")[0].split("#")[0].replace(/\/+$/g, "");
      if (!path || path === "") return "index.html";
      if (/\/boussole\/scenarios$/i.test(path) || /\/boussole\/scenario$/i.test(path)) {
        return "boussole-scenarios.html";
      }
      var last = path.split("/").pop() || "index.html";
      return normalizeFile(last);
    }

    function toPageClass(file) {
      return "foebe-page-" + String(file || "page").replace(/\.html?$/i, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
    }

    var currentFile = getCurrentFile();
    if (body) body.classList.add(toPageClass(currentFile));

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
      "echelle-foebe.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Pratiquer" },
        { label: "Échelle Foébé", current: true }
      ],
      "zones.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Pratiquer" },
        { label: "7 zones", current: true }
      ],
      "respiration.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Pratiquer" },
        { label: "Respiration guidée", current: true }
      ],
      "boussole.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Pratiquer" },
        { label: "Boussole", current: true }
      ],
      "boussole-scenarios.html": [
        { href: "index.html", label: "Accueil" },
        { href: "boussole.html", label: "Boussole" },
        { label: "Scénarios", current: true }
      ],
      "lexique.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Ressources" },
        { label: "Lexique Foébé", current: true }
      ],
      "dictionnaire.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Ressources" },
        { label: "Dictionnaire", current: true }
      ],
      "mentions-legales.html": [
        { href: "index.html", label: "Accueil" },
        { label: "Informations" },
        { label: "Mentions légales", current: true }
      ],
      "zone-corps.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Corps", current: true }
      ],
      "zone-emotions.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Émotions", current: true }
      ],
      "zone-mental.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Mental", current: true }
      ],
      "zone-energie.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Énergie", current: true }
      ],
      "zone-environnement.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Environnement", current: true }
      ],
      "zone-relations.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Relations", current: true }
      ],
      "zone-sens.html": [
        { href: "index.html", label: "Accueil" },
        { href: "zones.html", label: "7 zones" },
        { label: "Sens", current: true }
      ]
    };

    if (currentFile === "index.html") return;

    var trail = trails[currentFile];
    if (!trail) return;

    function injectCss() {
      if (document.getElementById("foebe-breadcrumb-css")) return;
      var css = [
        ".hero.foebe-has-breadcrumb{position:relative!important;}",
        ".hero.foebe-has-breadcrumb .hero-inner,.hero.foebe-has-breadcrumb .hero-content,.hero.foebe-has-breadcrumb .hero-container,.hero.foebe-has-breadcrumb .section-inner{padding-top:clamp(54px,7svh,92px)!important;}",
        ".foebe-breadcrumb{font-family:'Poppins',sans-serif!important;font-size:12px!important;line-height:1.45!important;color:#F0EAE7!important;overflow-x:auto!important;scrollbar-width:none!important;-webkit-overflow-scrolling:touch!important;animation:none!important;transition:none!important;}",
        ".foebe-breadcrumb::-webkit-scrollbar{display:none!important;}",
        "[data-theme='day'] .foebe-breadcrumb{color:#4E291F!important;}",
        "[data-theme='night'] .foebe-breadcrumb{color:#F0EAE7!important;}",
        ".foebe-breadcrumb ol{display:flex!important;align-items:center!important;gap:7px!important;list-style:none!important;margin:0!important;padding:0!important;white-space:nowrap!important;}",
        ".foebe-breadcrumb li{display:inline-flex!important;align-items:center!important;gap:7px!important;min-width:0!important;color:currentColor!important;}",
        ".foebe-breadcrumb li:not(:last-child)::after{content:'›'!important;color:#BB7E60!important;opacity:.95!important;font-weight:800!important;}",
        ".foebe-breadcrumb a,.foebe-breadcrumb span{color:currentColor!important;text-decoration:none!important;}",
        ".foebe-breadcrumb a{transition:color .18s ease,background .18s ease,border-color .18s ease,opacity .18s ease,box-shadow .18s ease!important;}",
        ".foebe-breadcrumb-home{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:31px!important;padding:5px 12px!important;border-radius:999px!important;background:#BB7E60!important;color:#F0EAE7!important;border:1px solid #BB7E60!important;font-weight:800!important;box-shadow:0 0 0 0 rgba(187,126,96,0)!important;}",
        "[data-theme='day'] .foebe-breadcrumb .foebe-breadcrumb-home,[data-theme='night'] .foebe-breadcrumb .foebe-breadcrumb-home{color:#F0EAE7!important;background:#BB7E60!important;border-color:#BB7E60!important;}",
        ".foebe-breadcrumb .foebe-breadcrumb-home,.foebe-breadcrumb .foebe-breadcrumb-home:hover,.foebe-breadcrumb .foebe-breadcrumb-home:focus-visible{color:#F0EAE7!important;transform:none!important;}",
        ".foebe-breadcrumb-home:hover,.foebe-breadcrumb-home:focus-visible{background:#C45279!important;border-color:#C45279!important;color:#F0EAE7!important;outline:none!important;transform:none!important;box-shadow:0 0 0 3px rgba(187,126,96,.22)!important;}",
        ".foebe-breadcrumb-link{font-weight:800!important;text-decoration:none!important;border-bottom:2px solid #BB7E60!important;padding-bottom:1px!important;}",
        ".foebe-breadcrumb-link:hover,.foebe-breadcrumb-link:focus-visible{color:#BB7E60!important;outline:none!important;border-bottom-color:#C45279!important;box-shadow:0 2px 0 rgba(196,82,121,.16)!important;}",
        ".foebe-breadcrumb-section{opacity:.86!important;font-weight:650!important;}",
        ".foebe-breadcrumb-current{font-weight:850!important;opacity:1!important;}",
        "[data-theme='day'] .foebe-breadcrumb-link,[data-theme='day'] .foebe-breadcrumb-section,[data-theme='day'] .foebe-breadcrumb-current{color:#4E291F!important;}",
        "[data-theme='night'] .foebe-breadcrumb-link,[data-theme='night'] .foebe-breadcrumb-section,[data-theme='night'] .foebe-breadcrumb-current{color:#F0EAE7!important;}",
        ".foebe-breadcrumb--hero{position:absolute!important;top:calc(60px + clamp(24px,4.6svh,50px))!important;left:50%!important;transform:translateX(-50%)!important;width:min(calc(100% - 48px),960px)!important;max-width:960px!important;margin:0!important;padding:0!important;z-index:4!important;}",
        ".foebe-breadcrumb--zone{width:min(calc(100% - 48px),980px)!important;}",
        ".foebe-breadcrumb--standalone{position:relative!important;top:auto!important;left:auto!important;transform:none!important;width:min(calc(100% - 48px),960px)!important;max-width:960px!important;margin:calc(60px + clamp(28px,4svh,50px)) auto clamp(26px,4svh,50px)!important;padding:0!important;z-index:2!important;}",
        ".foebe-breadcrumb--inline{position:relative!important;top:auto!important;left:auto!important;transform:none!important;width:min(100%,960px)!important;max-width:960px!important;margin:0 auto clamp(26px,4svh,44px)!important;padding:0!important;z-index:2!important;align-self:stretch!important;}",
        ".dict-hero .foebe-breadcrumb--dict{width:min(100%,960px)!important;margin:0 auto clamp(28px,4.2svh,46px)!important;text-align:left!important;position:relative!important;z-index:2!important;}",
        ".hero .foebe-breadcrumb--boussole{width:min(100%,960px)!important;margin:0 auto clamp(28px,4.2svh,46px)!important;text-align:left!important;position:relative!important;z-index:3!important;}",
        ".foebe-page-respiration .tech-card{padding-bottom:58px!important;}",
        ".foebe-page-respiration .tech-card::after{content:'Choisir cet exercice →'!important;position:absolute!important;left:18px!important;right:18px!important;bottom:16px!important;min-height:30px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:999px!important;background:#BB7E60!important;color:#F0EAE7!important;font-family:'Poppins',sans-serif!important;font-size:12px!important;font-weight:800!important;letter-spacing:.2px!important;}",
        ".foebe-page-respiration .tech-card:hover::after,.foebe-page-respiration .tech-card:focus-visible::after{background:#C45279!important;color:#F0EAE7!important;}",
        "@media(max-width:767px){.hero.foebe-has-breadcrumb .hero-inner,.hero.foebe-has-breadcrumb .hero-content,.hero.foebe-has-breadcrumb .hero-container,.hero.foebe-has-breadcrumb .section-inner{padding-top:clamp(48px,6.5svh,72px)!important;}.foebe-breadcrumb--hero{top:calc(60px + clamp(18px,3.6svh,34px))!important;width:calc(100% - 36px)!important;}.foebe-breadcrumb--standalone{width:calc(100% - 36px)!important;margin:calc(60px + clamp(24px,4svh,42px)) auto clamp(24px,4svh,42px)!important;}.foebe-breadcrumb{font-size:11px!important;}.foebe-breadcrumb ol{gap:5px!important;}.foebe-breadcrumb li{gap:5px!important;}.foebe-breadcrumb-home{min-height:30px!important;padding:5px 10px!important;}.foebe-breadcrumb-link{border-bottom-width:1.5px!important;padding-bottom:1px!important;}.foebe-breadcrumb-section{opacity:.80!important;}.foebe-page-respiration .tech-card{padding-bottom:56px!important;}.foebe-page-respiration .tech-card::after{left:15px!important;right:15px!important;bottom:14px!important;font-size:11.5px!important;}}",
        "@media(max-width:767px){.dict-hero .foebe-breadcrumb--dict{width:100%!important;margin:0 auto clamp(24px,3.8svh,36px)!important;}.hero .foebe-breadcrumb--boussole{width:100%!important;margin:0 auto clamp(24px,3.8svh,36px)!important;}}",
        "@media(max-width:390px){.foebe-breadcrumb{font-size:10.6px!important;}.foebe-breadcrumb--hero,.foebe-breadcrumb--standalone{width:calc(100% - 28px)!important;}.foebe-breadcrumb ol{gap:4px!important;}.foebe-breadcrumb li{gap:4px!important;}.foebe-breadcrumb-home{padding:5px 9px!important;}}",
        "@media(prefers-reduced-motion:reduce){.foebe-breadcrumb a{transition:none!important;}}"
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
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function renderTrail(items) {
      return items.map(function (item, index) {
        var label = escapeHtml(item.label);
        if (item.current) return '<li><span class="foebe-breadcrumb-current" aria-current="page">' + label + '</span></li>';
        if (item.href) {
          var isHome = index === 0 && item.label === "Accueil";
          var cls = isHome ? "foebe-breadcrumb-home" : "foebe-breadcrumb-link";
          var aria = isHome ? ' aria-label="Retour à l’accueil"' : ' aria-label="Aller à ' + label + '"';
          return '<li><a class="' + cls + '" href="' + escapeHtml(item.href) + '"' + aria + ' title="Aller à ' + label + '">' + label + '</a></li>';
        }
        return '<li><span class="foebe-breadcrumb-section">' + label + '</span></li>';
      }).join("");
    }

    injectCss();

    var nav = document.createElement("nav");
    var isZonePage = /^zone-/.test(currentFile);
    nav.className = "foebe-breadcrumb" + (isZonePage ? " foebe-breadcrumb--zone" : "");
    nav.setAttribute("aria-label", "Fil d’Ariane");
    nav.setAttribute("data-foebe-auto", "1");
    nav.innerHTML = "<ol>" + renderTrail(trail) + "</ol>";

    var hero = document.querySelector(".hero");
    var main = document.querySelector("main");
    var stateIntro = document.getElementById("stateIntro");
    var testIntroWrap = document.querySelector("#screenIntro .intro-wrap, .screen.active .intro-wrap, .intro-wrap");
    var dictHero = document.querySelector(".dict-hero");
    var dictLayout = document.querySelector(".dict-layout, .dictionary-layout, .dictionary-shell, .dictionnaire-layout, .dict-page, .library-layout, .lexicon-layout");
    var isBoussolePage = currentFile === "boussole.html" || currentFile === "boussole.html";

    /* Pages sans hero standard : fil intégré au bloc d’introduction, pas collé à la nav. */
    if (currentFile === "respiration.html" && stateIntro) {
      nav.className += " foebe-breadcrumb--inline";
      stateIntro.insertBefore(nav, stateIntro.firstChild);
      return;
    }

    if (currentFile === "echelle-foebe.html" && testIntroWrap) {
      nav.className += " foebe-breadcrumb--inline";
      testIntroWrap.insertBefore(nav, testIntroWrap.firstChild);
      return;
    }

    /* Dictionnaire : structure spéciale. On vise le header .dict-hero,
       pas .dict-layout, pour afficher le fil au-dessus du H1. */
    if (currentFile === "dictionnaire.html" && dictHero) {
      nav.className += " foebe-breadcrumb--inline foebe-breadcrumb--dict";
      dictHero.insertBefore(nav, dictHero.firstChild);
      return;
    }

    /* Fallback Dictionnaire si un ancien fichier n’a pas .dict-hero. */
    if (currentFile === "dictionnaire.html" && dictLayout && dictLayout.parentNode) {
      nav.className += " foebe-breadcrumb--standalone";
      dictLayout.parentNode.insertBefore(nav, dictLayout);
      return;
    }

    /* Boussole : structure spéciale main.site > .wrap > .hero.
       On vise le hero lui-même, comme Dictionnaire vise .dict-hero,
       pour éviter l'erreur insertBefore si .hero n'est pas enfant direct de main. */
    if (isBoussolePage && hero) {
      nav.className += " foebe-breadcrumb--inline foebe-breadcrumb--boussole";
      hero.insertBefore(nav, hero.firstChild);
      return;
    }

    /* Pages avec hero classique : repère éditorial au-dessus du H1, sans container. */
    if (hero) {
      nav.className += " foebe-breadcrumb--hero";
      hero.classList.add("foebe-has-breadcrumb");
      hero.insertBefore(nav, hero.firstChild);
      return;
    }

    if (main && main.firstChild) {
      nav.className += " foebe-breadcrumb--standalone";
      main.insertBefore(nav, main.firstChild);
      return;
    }

    if (main) {
      nav.className += " foebe-breadcrumb--standalone";
      main.appendChild(nav);
      return;
    }

    if (document.body) {
      nav.className += " foebe-breadcrumb--standalone";
      document.body.insertBefore(nav, document.body.firstChild);
    }
  })();

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

    if (file === "boussole/scenarios" || file === "boussole/scenario" || file === "scenarios" || file === "scenario" || file.indexOf("boussole/scenarios") === 0 || file.indexOf("boussole/scenario") === 0) return "boussole-scenarios.html";
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

  var zonesFiles = {
    "zone-energie.html": true,
    "zone-corps.html": true,
    "zone-mental.html": true,
    "zone-emotions.html": true,
    "zone-environnement.html": true,
    "zone-relations.html": true,
    "zone-sens.html": true
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     3. INJECTION DU NAV
  ═══════════════════════════════════════════════════════════════════════════ */
  var NAV_STRUCTURE = [
    { pole: "Accueil", links: [
      { href: "index.html", label: "Accueil" }
    ]},
    { pole: "Découvrir", links: [
      { href: "comprendre.html", label: "Comprendre" },
      { href: "a-propos.html",   label: "À propos"   },
      { href: "methode.html",    label: "La méthode Foébé" }
    ]},
    { pole: "Pratiquer", links: [
      { href: "pratiquer.html",          label: "4 outils" },
      { href: "echelle-foebe.html",      label: "Échelle Foébé" },
      { href: "zones.html",              label: "7 zones", activeWhenZones: true },
      { href: "respiration.html",        label: "Respiration guidée" },
      { href: "boussole.html",           label: "Boussole" },
      { href: "boussole-scenarios.html",     label: "Scénarios" }
    ]},
    { pole: "Ressources", links: [
      { href: "lexique.html",      label: "Lexique Foébé" },
      { href: "dictionnaire.html", label: "Dictionnaire" }
    ]}
  ];

  function isCurrentLink(link) {
    var linkFile = normalizeCurrentFile(link.href);
    return linkFile === currentFile || (link.activeWhenZones && zonesFiles[currentFile]);
  }

  function buildNavHTML() {
    return NAV_STRUCTURE.map(function (pole) {
      var links = pole.links.map(function (l) {
        return '<a class="nav-link" href="' + l.href + '"' +
          (isCurrentLink(l) ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
      }).join("");
      return '<div class="nav-pole"><span class="nav-pole-label">' + pole.pole + '</span>' + links + '</div>';
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
  mainNav.innerHTML =
    '<a aria-label="Maison Foébé — accueil" class="nav-logo" href="index.html">' +
      '<span>F</span><span>o</span><span>é</span><span>b</span><span>é</span>' +
    '</a>' +
          '<div class="nav-right">' +
        '<button aria-label="Changer le thème" class="theme-toggle" id="themeToggle" type="button">☀️</button>' +
        '<button aria-controls="navMenu" aria-expanded="false" aria-label="Ouvrir le menu" id="menuToggle" type="button">☰</button>' +
      '</div>';

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

  var navOverlay = document.getElementById("navOverlay");
  if (!navOverlay) {
    navOverlay = document.createElement("div");
    navOverlay.id = "navOverlay";
    navMenu.insertAdjacentElement("afterend", navOverlay);
  }

  navOverlay.setAttribute("aria-hidden", "true");
  navOverlay.className = "";

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
      '<a aria-label="Retour accueil Maison Foébé" class="footer-logo" href="index.html">' +
        '<span>F</span><span>o</span><span>é</span><span>b</span><span>é</span>' +
      '</a>' +
      '<p class="footer-sub">Maison Foébé · Espace structuré du self-care</p>' +
      '<div class="footer-social">' +
        '<a aria-label="Pinterest Maison Foébé" class="social-icon" href="https://fr.pinterest.com/maisonfoebe/" rel="noopener noreferrer" target="_blank">' + PINTEREST_SVG + '</a>' +
        '<a aria-label="Instagram Maison Foébé" class="social-icon" href="https://www.instagram.com/maisonfoebe/" rel="noopener noreferrer" target="_blank">' + INSTA_SVG + '</a>' +
        '<a aria-label="TikTok Maison Foébé" class="social-icon" href="https://www.tiktok.com/@maisonfoebe" rel="noopener noreferrer" target="_blank">' + TIKTOK_SVG + '</a>' +
        '<a aria-label="Envoyer un email à Maison Foébé" class="social-icon" href="mailto:contact@maisonfoebe.fr">' + EMAIL_SVG + '</a>' +
      '</div>' +
      '<div class="footer-links">' +
        '<a class="footer-link" href="mentions-legales.html">Mentions légales</a>' +
        '<a class="footer-link" href="comprendre.html">Comprendre</a>' +
        '<a class="footer-link" href="pratiquer.html">Pratiquer</a>' +
        '<a class="footer-link" href="a-propos.html">À propos</a>' +
        '<a class="footer-link" href="methode.html">Méthode</a>' +
      '</div>' +
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

  function openMenu() {
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
        openMenu();
      }
    });

    if (canHover) {
      menuToggle.addEventListener("mouseenter", openMenu);
    }
  }

  if (canHover) {
    mainNav.addEventListener("mouseleave", scheduleCloseMenu);
    navMenu.addEventListener("mouseenter", openMenu);
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
    document.documentElement.classList.add("foebe-shell-ready");
    document.documentElement.classList.remove("foebe-shell-loading", "foebe-shell-failed");
  } catch (e) {}



  /* FOEBE AUTO BREADCRUMB LOADER — START
     Charge automatiquement le fil d’Ariane responsive.
     Résultat : pas besoin d’ajouter <script src="/foebe-breadcrumb.js"></script>
     page par page. */
  (function () {
    if (window.__FOEBE_BREADCRUMB_AUTO_LOADER__) return;
    window.__FOEBE_BREADCRUMB_AUTO_LOADER__ = true;

    function loadFoebeBreadcrumb() {
      
      var path = (window.location.pathname || "").toLowerCase();
      var file = path.split("/").pop() || "index.html";
      var isImmersive =
        file === "dictionnaire.html" ||
        file === "lexique.html" ||
        file === "stories.html" ||
        path.indexOf("/stories") !== -1 ||
        path.indexOf("/lexique") !== -1 ||
        path.indexOf("/dictionnaire") !== -1;

      if (isImmersive) return;
      if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) return;

      if (document.querySelector('script[src="/foebe-breadcrumb.js"]')) return;

      var script = document.createElement("script");
      script.src = "/foebe-breadcrumb.js";
      script.defer = true;
      script.setAttribute("data-foebe-auto-breadcrumb", "1");

      (document.body || document.documentElement).appendChild(script);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadFoebeBreadcrumb, { once: true });
    } else {
      loadFoebeBreadcrumb();
    }
  })();
  /* FOEBE AUTO BREADCRUMB LOADER — END */


  /* FOEBE IMMERSIVE PAGE CLEANER — START
     Dictionnaire/Lexique/Stories : expérience immersive.
     On supprime les barres fixes parasites : breadcrumb auto + éventuelle barre de progression. */
  (function () {
    function cleanImmersivePages() {
      var path = (window.location.pathname || "").toLowerCase();
      var file = path.split("/").pop() || "index.html";

      var isImmersive =
        file === "dictionnaire.html" ||
        file === "lexique.html" ||
        file === "stories.html" ||
        path.indexOf("/stories") !== -1 ||
        path.indexOf("/lexique") !== -1 ||
        path.indexOf("/dictionnaire") !== -1;

      if (!isImmersive) return;

      document.documentElement.classList.add("foebe-no-breadcrumb", "foebe-immersive-page");
      document.body && document.body.classList.add("foebe-no-breadcrumb", "foebe-immersive-page");

      document.querySelectorAll(".foebe-breadcrumb, .foebe-scroll-progress").forEach(function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });

      if (!document.getElementById("foebeImmersiveCleanerCss")) {
        var style = document.createElement("style");
        style.id = "foebeImmersiveCleanerCss";
        style.textContent =
          "html.foebe-immersive-page .foebe-breadcrumb,body.foebe-immersive-page .foebe-breadcrumb," +
          "html.foebe-immersive-page .foebe-scroll-progress,body.foebe-immersive-page .foebe-scroll-progress{" +
          "display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}";
        (document.head || document.documentElement).appendChild(style);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", cleanImmersivePages, { once: true });
    } else {
      cleanImmersivePages();
    }
    window.addEventListener("load", cleanImmersivePages);
    window.setTimeout(cleanImmersivePages, 250);
    window.setTimeout(cleanImmersivePages, 1200);
  })();
  /* FOEBE IMMERSIVE PAGE CLEANER — END */


  /* FOEBE LEXIQUE MOBILE IMMERSIF — START
     Lexique/Dictionnaire/Stories : sur mobile, on garde seulement le Shell utile
     et on enlève les barres fixes parasites qui coupent l’avatar/l’intro immersive. */
  (function () {
    function isLexiqueImmersivePage() {
      var path = (window.location.pathname || "").toLowerCase();
      var file = path.split("/").pop() || "index.html";
      return (
        file === "dictionnaire.html" ||
        file === "lexique.html" ||
        file === "stories.html" ||
        path.indexOf("/stories") !== -1 ||
        path.indexOf("/lexique") !== -1 ||
        path.indexOf("/dictionnaire") !== -1
      );
    }

    function applyLexiqueImmersiveMode() {
      if (!isLexiqueImmersivePage()) return;

      var html = document.documentElement;
      var body = document.body;

      html.classList.add("foebe-no-breadcrumb", "foebe-immersive-page", "foebe-lexique-immersive");
      if (body) body.classList.add("foebe-no-breadcrumb", "foebe-immersive-page", "foebe-lexique-immersive");

      /* On retire vraiment les éléments fixes parasites déjà injectés. */
      document.querySelectorAll(
        ".foebe-breadcrumb," +
        ".foebe-scroll-progress," +
        ".story-topbar,.stories-topbar,.story-fixed-bar,.stories-fixed-bar," +
        ".story-progress,.stories-progress,.lexique-topbar,.dictionnaire-topbar," +
        ".lexique-fixed-bar,.dictionnaire-fixed-bar," +
        "[data-story-topbar],[data-stories-topbar],[data-lexique-topbar]"
      ).forEach(function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });

      if (!document.getElementById("foebeLexiqueImmersiveMobileCss")) {
        var style = document.createElement("style");
        style.id = "foebeLexiqueImmersiveMobileCss";
        style.textContent = [
          "html.foebe-lexique-immersive .foebe-breadcrumb,body.foebe-lexique-immersive .foebe-breadcrumb,html.foebe-lexique-immersive .foebe-scroll-progress,body.foebe-lexique-immersive .foebe-scroll-progress{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}",

          "html.foebe-lexique-immersive .story-topbar,body.foebe-lexique-immersive .story-topbar,html.foebe-lexique-immersive .stories-topbar,body.foebe-lexique-immersive .stories-topbar,html.foebe-lexique-immersive .story-fixed-bar,body.foebe-lexique-immersive .story-fixed-bar,html.foebe-lexique-immersive .stories-fixed-bar,body.foebe-lexique-immersive .stories-fixed-bar,html.foebe-lexique-immersive .story-progress,body.foebe-lexique-immersive .story-progress,html.foebe-lexique-immersive .stories-progress,body.foebe-lexique-immersive .stories-progress,html.foebe-lexique-immersive .lexique-topbar,body.foebe-lexique-immersive .lexique-topbar,html.foebe-lexique-immersive .dictionnaire-topbar,body.foebe-lexique-immersive .dictionnaire-topbar{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}",

          "@media(max-width:767px){html.foebe-lexique-immersive #mainNav{height:54px!important;min-height:54px!important;padding:0 14px!important;box-shadow:0 6px 18px rgba(0,0,0,.10)!important;background:color-mix(in srgb,var(--bg) 86%,transparent)!important;}html.foebe-lexique-immersive #navMenu{top:54px!important;max-height:calc(100dvh - 54px)!important;}html.foebe-lexique-immersive #navOverlay{top:54px!important;}html.foebe-lexique-immersive .nav-logo{font-size:17px!important;}html.foebe-lexique-immersive .theme-toggle{display:none!important;}html.foebe-lexique-immersive #menuToggle{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;}html.foebe-lexique-immersive body > nav#fallbackNav.fallback-nav .fallback-links{display:none!important;}html.foebe-lexique-immersive body > nav#fallbackNav.fallback-nav{height:54px!important;min-height:54px!important;}}"
        ].join("\\n");
        (document.head || document.documentElement).appendChild(style);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyLexiqueImmersiveMode, { once: true });
    } else {
      applyLexiqueImmersiveMode();
    }

    window.addEventListener("load", applyLexiqueImmersiveMode);
    window.addEventListener("resize", applyLexiqueImmersiveMode, { passive: true });
    window.addEventListener("orientationchange", applyLexiqueImmersiveMode, { passive: true });

    window.setTimeout(applyLexiqueImmersiveMode, 100);
    window.setTimeout(applyLexiqueImmersiveMode, 450);
    window.setTimeout(applyLexiqueImmersiveMode, 1200);
    window.setTimeout(applyLexiqueImmersiveMode, 2400);
  })();
  /* FOEBE LEXIQUE MOBILE IMMERSIF — END */

})();