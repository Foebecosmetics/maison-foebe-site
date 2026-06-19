/**
 * foebe-shell.js — Maison Foébé
 * Version V8 — navigation contextuelle + progression globale compatible fallback
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
    ":root{--foebe-progress-gradient:linear-gradient(90deg,#4E291F 0%,#BB7E60 22%,#C45279 44%,#C34234 66%,#F0EAE7 84%,#4E291F 100%)!important;}",
    "#mainNav{position:fixed!important;top:0!important;left:0!important;right:0!important;height:60px!important;",
    "background:color-mix(in srgb,var(--bg) 92%,transparent)!important;border-bottom:1px solid var(--border,rgba(187,126,96,.25))!important;",
    "display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;align-items:center!important;gap:clamp(10px,2vw,22px)!important;padding:0 clamp(16px,3vw,28px)!important;",
    "z-index:99990!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;",
    "box-shadow:0 8px 28px rgba(0,0,0,.08)!important;transition:background .35s,border-color .35s,box-shadow .35s!important;}",
    "[data-theme='day'] #mainNav{background:rgba(240,234,231,.92)!important;box-shadow:0 8px 26px rgba(78,41,31,.08)!important;}",
    "[data-theme='night'] #mainNav{background:rgba(78,41,31,.90)!important;box-shadow:0 10px 32px rgba(0,0,0,.20)!important;}",

    ".nav-logo{font-family:'Montserrat',sans-serif!important;font-weight:700!important;font-size:18px!important;text-decoration:none!important;letter-spacing:-.06em!important;line-height:1!important;display:inline-flex!important;align-items:center!important;min-height:44px!important;}",
    "[data-theme='night'] .nav-logo span{color:#F0EAE7!important;}",
    "[data-theme='day'] .nav-logo span:nth-child(1),[data-theme='day'] .nav-logo span:nth-child(5){color:#4E291F!important;}",
    "[data-theme='day'] .nav-logo span:nth-child(2){color:#BB7E60!important;}[data-theme='day'] .nav-logo span:nth-child(3){color:#C45279!important;}[data-theme='day'] .nav-logo span:nth-child(4){color:#C34234!important;}",
    ".nav-logo:hover span{filter:brightness(1.08)!important;}",

    ".nav-left{display:flex!important;align-items:center!important;gap:clamp(8px,1.5vw,16px)!important;min-width:0!important;}",
    ".shell-context-back{display:inline-flex!important;align-items:center!important;gap:7px!important;min-height:44px!important;max-width:150px!important;padding:0 4px!important;font-family:'Poppins',sans-serif!important;font-size:11.5px!important;font-weight:650!important;line-height:1.2!important;letter-spacing:.015em!important;color:#BB7E60!important;text-decoration:none!important;white-space:nowrap!important;position:relative!important;overflow:hidden!important;}",
    ".shell-context-back__arrow{font-size:14px!important;font-weight:800!important;line-height:1!important;flex:0 0 auto!important;}",
    ".shell-context-back__label{overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;}",
    ".shell-context-back::after{content:''!important;position:absolute!important;left:25px!important;right:4px!important;bottom:8px!important;height:1px!important;background:#BB7E60!important;transform:scaleX(0)!important;transform-origin:left!important;transition:transform .18s ease!important;}",
    ".shell-context-back:hover::after,.shell-context-back:focus-visible::after{transform:scaleX(1)!important;}",
    ".shell-context-back:focus-visible{outline:2px solid #BB7E60!important;outline-offset:2px!important;border-radius:4px!important;}",
    ".shell-page-current{justify-self:center!important;align-self:center!important;min-width:0!important;max-width:min(38vw,360px)!important;padding:7px 1px 6px!important;font-family:'Poppins',sans-serif!important;font-size:11.5px!important;font-weight:700!important;line-height:1.2!important;letter-spacing:.055em!important;color:var(--text,#4E291F)!important;text-align:center!important;text-transform:none!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;position:relative!important;}",
    ".shell-page-current::after{content:''!important;position:absolute!important;left:16%!important;right:16%!important;bottom:1px!important;height:2px!important;border-radius:999px!important;background:#BB7E60!important;}",
    ".shell-page-current--home{visibility:hidden!important;}",
    "[data-theme='day'] .shell-context-back{color:#BB7E60!important;}",
    "[data-theme='day'] .shell-page-current{color:#4E291F!important;}",
    "[data-theme='night'] .shell-context-back,[data-theme='night'] .shell-page-current{color:#F0EAE7!important;}",
    "[data-theme='night'] .shell-context-back__arrow{color:#BB7E60!important;}",
    "#foebeReadingProgress{position:absolute!important;left:0!important;right:0!important;bottom:-1px!important;height:3px!important;overflow:hidden!important;background:rgba(187,126,96,.14)!important;pointer-events:none!important;z-index:2!important;}",
    "#foebeReadingProgressBar{display:block!important;width:100%!important;height:100%!important;transform:scaleX(var(--foebe-reading-progress,0))!important;transform-origin:left center!important;will-change:transform!important;background:var(--foebe-progress-gradient)!important;box-shadow:0 0 8px rgba(196,82,121,.26)!important;transition:transform .08s linear!important;}",
    "html.foebe-reading-progress-disabled #foebeReadingProgress{display:none!important;}",

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

    ".nav-panel-inner{max-width:960px!important;margin:0 auto!important;padding:34px clamp(20px,4vw,40px) 38px!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(18px,3vw,42px)!important;}",
    ".nav-pole{display:flex!important;flex-direction:column!important;min-width:0!important;}",
    ".nav-pole-label{font-family:'Poppins',sans-serif!important;font-size:10px!important;font-weight:700!important;letter-spacing:2.2px!important;text-transform:uppercase!important;color:#BB7E60!important;padding-bottom:12px!important;margin-bottom:8px!important;border-bottom:1px solid rgba(187,126,96,.30)!important;}",
    ".nav-link{font-family:'Poppins',sans-serif!important;font-size:13px!important;font-weight:500!important;color:var(--text,#F0EAE7)!important;text-decoration:none!important;padding:10px 10px!important;border-radius:12px!important;min-height:42px!important;display:flex!important;align-items:center!important;position:relative!important;isolation:isolate!important;transition:color .18s ease,background .18s ease,padding-left .18s ease,transform .18s ease!important;}",
    ".nav-link::before{content:''!important;position:absolute!important;inset:5px!important;border-radius:10px!important;background:rgba(187,126,96,.12)!important;opacity:0!important;transform:scale(.98)!important;z-index:-1!important;transition:opacity .18s ease,transform .18s ease!important;}",
    ".nav-link::after{content:''!important;position:absolute!important;left:10px!important;top:50%!important;width:5px!important;height:5px!important;border-radius:999px!important;background:#BB7E60!important;opacity:0!important;transform:translateY(-50%) scale(.6)!important;transition:opacity .18s ease,transform .18s ease!important;}",
    ".nav-link:hover{color:#BB7E60!important;padding-left:22px!important;transform:translateX(2px)!important;background:transparent!important;}",
    ".nav-link:hover::before,.nav-link[aria-current='page']::before{opacity:1!important;transform:scale(1)!important;}",
    ".nav-link:hover::after,.nav-link[aria-current='page']::after{opacity:1!important;transform:translateY(-50%) scale(1)!important;}",
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
    "@media(max-width:767px){html.foebe-has-shell-context #mainNav .nav-logo{display:none!important;}#mainNav{grid-template-columns:minmax(68px,auto) minmax(0,1fr) auto!important;gap:8px!important;}.nav-left{gap:0!important;min-width:0!important;}.shell-context-back{max-width:92px!important;min-height:42px!important;padding:0 2px!important;font-size:11px!important;}.shell-context-back::after{left:22px!important;right:2px!important;bottom:7px!important;}.shell-page-current{max-width:100%!important;font-size:11px!important;letter-spacing:.035em!important;padding-inline:0!important;}.shell-page-current::after{left:18%!important;right:18%!important;}.nav-right{gap:7px!important;}}",
    "@media(max-width:380px){#mainNav{padding-inline:12px!important;grid-template-columns:minmax(62px,auto) minmax(0,1fr) auto!important;gap:6px!important;}.shell-context-back{max-width:78px!important;font-size:10.5px!important;}.shell-page-current{font-size:10.5px!important;letter-spacing:.02em!important;}.nav-right{gap:5px!important;}}",
    "@media(max-width:640px){#mainNav{height:58px!important;padding:0 16px!important;}#navMenu{top:58px!important;max-height:calc(100vh - 58px)!important;}#navOverlay{top:58px!important;}.nav-panel-inner{display:flex!important;flex-direction:column!important;gap:0!important;padding:0!important;}.nav-pole{border-bottom:1px solid rgba(187,126,96,.25)!important;padding:15px 18px 12px!important;}.nav-pole:last-child{border-bottom:none!important;}.nav-pole-label{font-size:10px!important;margin-bottom:6px!important;padding-bottom:10px!important;}.nav-link{font-size:14px!important;min-height:46px!important;padding:12px 10px!important;border-radius:10px!important;}.nav-link:hover,.nav-link[aria-current='page']{padding-left:24px!important;}footer{padding:42px 18px 30px!important;}.footer-inner{gap:14px!important;}.footer-links{gap:6px 16px!important;}.footer-link{font-size:12.5px!important;}}",
    "@media(max-width:380px){.nav-logo{font-size:17px!important;}#menuToggle{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;}.theme-toggle{width:36px!important;height:36px!important;}.nav-panel-inner{padding-bottom:8px!important;}}",
    ".foebe-page-respiration .tech-card{padding-bottom:58px!important;}",
    ".foebe-page-respiration .tech-card::after{content:'Choisir cet exercice →'!important;position:absolute!important;left:18px!important;right:18px!important;bottom:16px!important;min-height:30px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:999px!important;background:#BB7E60!important;color:#F0EAE7!important;font-family:'Poppins',sans-serif!important;font-size:12px!important;font-weight:800!important;letter-spacing:.2px!important;}",
    ".foebe-page-respiration .tech-card:hover::after,.foebe-page-respiration .tech-card:focus-visible::after{background:#C45279!important;color:#F0EAE7!important;}",
    "@media(max-width:767px){.foebe-page-respiration .tech-card{padding-bottom:56px!important;}.foebe-page-respiration .tech-card::after{left:15px!important;right:15px!important;bottom:14px!important;font-size:11.5px!important;}}",

    "",
    "",
    "",
    "@media(prefers-reduced-motion:reduce){#navMenu,#navOverlay,.nav-link,.nav-link::before,.nav-link::after,#menuToggle,.theme-toggle,.social-icon,.shell-context-back::after,#foebeReadingProgressBar{transition:none!important;}}"
  ].join("\n");

  var oldStyle = document.getElementById("foebe-shell-css");
  if (oldStyle) oldStyle.remove();
  var styleEl = document.createElement("style");
  styleEl.id = "foebe-shell-css";
  styleEl.textContent = SHELL_CSS;
  document.head.appendChild(styleEl);

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
      "comprendre.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "Comprendre", aria: "Retour à l’accueil" },
      "a-propos.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "À propos", aria: "Retour à l’accueil" },
      "methode.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "La méthode Foébé", aria: "Retour à l’accueil" },
      "pratiquer.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "4 outils", aria: "Retour à l’accueil" },
      "echelle-foebe.html": { href: "/pratiquer.html", backLabel: "4 outils", currentLabel: "Échelle Foébé", aria: "Retour aux 4 outils" },
      "zones.html": { href: "/pratiquer.html", backLabel: "4 outils", currentLabel: "7 zones", aria: "Retour aux 4 outils" },
      "respiration.html": { href: "/pratiquer.html", backLabel: "4 outils", currentLabel: "Respiration guidée", aria: "Retour aux 4 outils" },
      "boussole.html": { href: "/pratiquer.html", backLabel: "4 outils", currentLabel: "Boussole", aria: "Retour aux 4 outils" },
      "boussole-scenarios.html": { href: "/boussole.html", backLabel: "Boussole", currentLabel: "Scénarios", aria: "Retour à la Boussole Foébé" },
      "lexique.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "Lexique Foébé", aria: "Retour à l’accueil" },
      "dictionnaire.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "Dictionnaire", aria: "Retour à l’accueil" },
      "mentions-legales.html": { href: "/index.html", backLabel: "Accueil", currentLabel: "Mentions légales", aria: "Retour à l’accueil" }
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
      return { href: "/zones.html", backLabel: "7 zones", currentLabel: zoneLabels[currentFile], aria: "Retour à la page des 7 zones" };
    }

    if (
      path.indexOf("/stories/") !== -1 ||
      path.indexOf("/lexique/") !== -1 ||
      path.indexOf("/dictionnaire/") !== -1 ||
      currentFile === "stories.html" ||
      /^(story-|fiche-|lexique-|dictionnaire-)/.test(currentFile)
    ) {
      return { href: "/dictionnaire.html", backLabel: "Dictionnaire", currentLabel: shellPageLabelFallback(), aria: "Retour au Dictionnaire Foébé" };
    }

    return { href: "/index.html", backLabel: "Accueil", currentLabel: shellPageLabelFallback(), aria: "Retour à l’accueil" };
  }

  var shellPageContext = getShellPageContext();
  if (shellPageContext) document.documentElement.classList.add("foebe-has-shell-context");

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

  var shellBackHtml = shellPageContext
    ? '<a class="shell-context-back" href="' + shellEscapeHtml(shellPageContext.href) + '" aria-label="' + shellEscapeHtml(shellPageContext.aria) + '">' +
        '<span class="shell-context-back__arrow" aria-hidden="true">←</span>' +
        '<span class="shell-context-back__label">' + shellEscapeHtml(shellPageContext.backLabel) + '</span>' +
      '</a>'
    : '';
  var shellCurrentLabel = shellPageContext ? shellPageContext.currentLabel : "Accueil";

  mainNav.innerHTML =
    '<div class="nav-left">' +
      '<a aria-label="Maison Foébé — accueil" class="nav-logo" href="index.html">' +
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
        currentFile === "dictionnaire.html" ||
        currentFile === "stories.html" ||
        path.indexOf("/stories") !== -1 ||
        path.indexOf("/lexique") !== -1 ||
        path.indexOf("/dictionnaire") !== -1
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
     - préserve le mode immersif Lexique/Dictionnaire/Stories ;
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
        file === "dictionnaire.html" ||
        file === "lexique.html" ||
        file === "stories.html" ||
        path.indexOf("/stories") !== -1 ||
        path.indexOf("/lexique") !== -1 ||
        path.indexOf("/dictionnaire") !== -1
      );
    }

    var immersive = isImmersivePage();

    function injectCleanupCss() {
      if (document.getElementById("foebeUnifiedCleanupCss")) return;
      var style = document.createElement("style");
      style.id = "foebeUnifiedCleanupCss";
      style.textContent = [
        ".foebe-breadcrumb{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;max-height:0!important;overflow:hidden!important;}",
        "html.foebe-lexique-immersive .foebe-scroll-progress,body.foebe-lexique-immersive .foebe-scroll-progress,",
        "html.foebe-lexique-immersive .story-topbar,body.foebe-lexique-immersive .story-topbar,",
        "html.foebe-lexique-immersive .stories-topbar,body.foebe-lexique-immersive .stories-topbar,",
        "html.foebe-lexique-immersive .story-fixed-bar,body.foebe-lexique-immersive .story-fixed-bar,",
        "html.foebe-lexique-immersive .stories-fixed-bar,body.foebe-lexique-immersive .stories-fixed-bar,",
        "html.foebe-lexique-immersive .story-progress,body.foebe-lexique-immersive .story-progress,",
        "html.foebe-lexique-immersive .stories-progress,body.foebe-lexique-immersive .stories-progress,",
        "html.foebe-lexique-immersive .lexique-topbar,body.foebe-lexique-immersive .lexique-topbar,",
        "html.foebe-lexique-immersive .dictionnaire-topbar,body.foebe-lexique-immersive .dictionnaire-topbar,",
        "html.foebe-lexique-immersive .lexique-fixed-bar,body.foebe-lexique-immersive .lexique-fixed-bar,",
        "html.foebe-lexique-immersive .dictionnaire-fixed-bar,body.foebe-lexique-immersive .dictionnaire-fixed-bar,",
        "html.foebe-lexique-immersive [data-story-topbar],body.foebe-lexique-immersive [data-story-topbar],",
        "html.foebe-lexique-immersive [data-stories-topbar],body.foebe-lexique-immersive [data-stories-topbar],",
        "html.foebe-lexique-immersive [data-lexique-topbar],body.foebe-lexique-immersive [data-lexique-topbar]",
        "{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}",
        "@media(max-width:767px){",
          "html.foebe-lexique-immersive #mainNav{height:54px!important;min-height:54px!important;padding:0 14px!important;box-shadow:0 6px 18px rgba(0,0,0,.10)!important;background:color-mix(in srgb,var(--bg) 86%,transparent)!important;}",
          "html.foebe-lexique-immersive #navMenu{top:54px!important;max-height:calc(100dvh - 54px)!important;}",
          "html.foebe-lexique-immersive #navOverlay{top:54px!important;}",
          "html.foebe-lexique-immersive .nav-logo{font-size:17px!important;}",
          "html.foebe-lexique-immersive .theme-toggle{display:none!important;}",
          "html.foebe-lexique-immersive #menuToggle{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;}",
          "html.foebe-lexique-immersive body > nav#fallbackNav.fallback-nav .fallback-links{display:none!important;}",
          "html.foebe-lexique-immersive body > nav#fallbackNav.fallback-nav{height:54px!important;min-height:54px!important;}",
        "}"
      ].join("");
      (document.head || document.documentElement).appendChild(style);
    }

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

     Variante Lexique / Dictionnaire / Stories : les appuis servant à avancer une
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
      var path = normalizedPath();
      var parts = path.split("/").filter(Boolean);
      var file = parts.length ? parts[parts.length - 1] : "index.html";
      return (
        file === "dictionnaire.html" ||
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
      return isImmersiveStoryPage() ? 2200 : 2700;
    }

    function injectCss() {
      if (document.getElementById(styleId)) return;
      var style = document.createElement("style");
      style.id = styleId;
      style.textContent = [
        "@media(max-width:767px){",
          "html.foebe-nav-auto-hide #mainNav{",
            "transform:translate3d(0,0,0)!important;",
            "opacity:1!important;",
            "visibility:visible!important;",
            "pointer-events:auto!important;",
            "will-change:transform,opacity!important;",
            "transition:transform .28s cubic-bezier(.22,1,.36,1),opacity .20s ease,background .35s,border-color .35s,box-shadow .35s!important;",
          "}",
          "html.foebe-nav-auto-hide.foebe-nav-hidden:not(.foebe-nav-menu-open) #mainNav{",
            "transform:translate3d(0,calc(-100% - 8px),0)!important;",
            "opacity:0!important;",
            "visibility:hidden!important;",
            "pointer-events:none!important;",
          "}",
          "html.foebe-nav-auto-hide.foebe-nav-menu-open #mainNav{",
            "transform:translate3d(0,0,0)!important;",
            "opacity:1!important;",
            "visibility:visible!important;",
            "pointer-events:auto!important;",
          "}",
          "html.foebe-nav-auto-hide.foebe-nav-hidden:not(.foebe-nav-menu-open) #navMenu:not(.open),",
          "html.foebe-nav-auto-hide.foebe-nav-hidden:not(.foebe-nav-menu-open) #navOverlay:not(.open){",
            "pointer-events:none!important;",
          "}",
        "}",
        "@media(max-width:767px) and (prefers-reduced-motion:reduce){",
          "html.foebe-nav-auto-hide #mainNav{transition:none!important;}",
        "}"
      ].join("");
      (document.head || document.documentElement).appendChild(style);
    }

    function setMenuState() {
      var root = document.documentElement;
      if (menuIsOpen()) {
        clearHideTimer();
        root.classList.add(menuOpenClass);
        root.classList.remove(hiddenClass);
      } else {
        root.classList.remove(menuOpenClass);
        if (mobileEnabled()) scheduleHide();
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

    function enableForCurrentViewport() {
      var root = document.documentElement;
      injectCss();
      clearHideTimer();

      if (!mobileEnabled()) {
        root.classList.remove(enabledClass, hiddenClass, menuOpenClass);
        return;
      }

      root.classList.add(enabledClass);
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

      /* Sur les stories, un toucher dans les 76 px supérieurs rappelle le Shell.
         Un toucher ailleurs continue la story sans casser l'immersion. */
      if (pointerStartY !== null && pointerStartY <= 76) {
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
    if (!document.getElementById("foebeV4Css")) {
      var st = document.createElement("style");
      st.id = "foebeV4Css";
      st.textContent =
        ".foebe-skip-link{position:fixed!important;top:8px!important;left:8px!important;z-index:999999!important;" +
          "background:#BB7E60!important;color:#F0EAE7!important;padding:10px 16px!important;border-radius:8px!important;" +
          "font-family:'Poppins',sans-serif!important;font-weight:700!important;font-size:14px!important;" +
          "text-decoration:none!important;transform:translateY(-200%)!important;transition:transform .2s ease!important;" +
          "box-shadow:0 8px 24px rgba(0,0,0,.18)!important;}" +
        ".foebe-skip-link:focus,.foebe-skip-link:focus-visible{transform:translateY(0)!important;outline:2px solid #F0EAE7!important;outline-offset:2px!important;}" +
        "@media(max-width:640px){#navMenu{padding-bottom:env(safe-area-inset-bottom,0px)!important;}}";
      (document.head || document.documentElement).appendChild(st);
    }

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

})();
