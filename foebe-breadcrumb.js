/**
 * foebe-breadcrumb.js — Maison Foébé
 * Fil d’Ariane responsive.
 *
 * Desktop : fil complet discret.
 * Mobile : barre contextuelle simple : retour + page actuelle.
 *
 * À placer dans : public/foebe-breadcrumb.js
 * À appeler avant </body> : <script src="/foebe-breadcrumb.js"></script>
 */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    var root = document.documentElement;
    var body = document.body;
    if (!body) return;

    var mode =
      (root.getAttribute("data-foebe-breadcrumb") ||
        body.getAttribute("data-foebe-breadcrumb") ||
        "").toLowerCase();

    if (mode === "none" || mode === "off" || mode === "false") return;

    document.querySelectorAll(".foebe-breadcrumb").forEach(function (old) {
      if (old && old.parentNode) old.parentNode.removeChild(old);
    });

    function cleanPath(path) {
      path = String(path || "").toLowerCase();
      try { path = decodeURIComponent(path); } catch (e) {}
      path = path.split("?")[0].split("#")[0];
      path = path.replace(/^\/+|\/+$/g, "");
      return path;
    }

    function normalizeCurrent() {
      var path = cleanPath(window.location.pathname || "/");
      if (!path || path === "index" || path === "index.html") return "index.html";

      if (path === "boussole/scenarios" || path === "boussole-scenarios.htmlindex" || path === "boussole-scenarios.htmlindex.html") {
        return "boussole-scenarios.html";
      }

      var file = path.split("/").pop() || "index.html";
      file = file.replace(/\.html?$/i, "");

      if (!file || file === "index") return "index.html";

      if (file.indexOf("comprendre") === 0) return "comprendre.html";
      if (file.indexOf("methode") === 0 || file.indexOf("méthode") === 0) return "methode.html";
      if (file.indexOf("a-propos") === 0 || file.indexOf("apropos") === 0) return "a-propos.html";

      if (
        file.indexOf("echelle-foebe") === 0 ||
        file.indexOf("échelle-foébé") === 0 ||
        file.indexOf("echelle") === 0 ||
        file.indexOf("échelle") === 0 ||
        file.indexOf("test") === 0
      ) return "echelle-foebe.html";

      if (
        file === "zones" ||
        file.indexOf("foebe-zones-cadre") === 0 ||
        file.indexOf("zones-cadre") === 0 ||
        file.indexOf("7-zones") === 0
      ) return "zones.html";

      if (file.indexOf("zone-corps") === 0) return "zone-corps.html";
      if (file.indexOf("zone-mental") === 0) return "zone-mental.html";
      if (file.indexOf("zone-energie") === 0 || file.indexOf("zone-énergie") === 0) return "zone-energie.html";
      if (file.indexOf("zone-emotions") === 0 || file.indexOf("zone-émotions") === 0) return "zone-emotions.html";
      if (file.indexOf("zone-relations") === 0) return "zone-relations.html";
      if (file.indexOf("zone-environnement") === 0) return "zone-environnement.html";
      if (file.indexOf("zone-sens") === 0) return "zone-sens.html";

      if (file.indexOf("boussole-scenarios") === 0 || file === "scenarios" || file === "scenario") return "boussole-scenarios.html";
      if (file.indexOf("boussole") === 0 || file.indexOf("boussole-accueil") === 0) return "boussole.html";

      if (file.indexOf("dictionnaire") === 0 || file.indexOf("lexique") === 0 || file.indexOf("stories") === 0) return "dictionnaire.html";
      if (file.indexOf("mentions-legales") === 0 || file.indexOf("mentions") === 0) return "mentions-legales.html";

      return file + ".html";
    }

    var current = normalizeCurrent();
    if (current === "index.html") return;

    /* Mobile : pas de breadcrumb. Point.
       Sur téléphone, on ne charge pas de barre contextuelle : les personnes utilisent le Shell/nav. */
    if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) {
      document.querySelectorAll(".foebe-breadcrumb").forEach(function (old) {
        if (old && old.parentNode) old.parentNode.removeChild(old);
      });
      return;
    }


    /* Pages immersives : aucun breadcrumb automatique. */
    if (
      current === "dictionnaire.html" ||
      current === "lexique.html" ||
      current === "stories.html"
    ) {
      document.querySelectorAll(".foebe-breadcrumb").forEach(function (old) {
        if (old && old.parentNode) old.parentNode.removeChild(old);
      });
      return;
    }

    var trails = {
      "comprendre.html": {
        current: "Comprendre",
        back: { href: "/index.html", label: "Retour à l’accueil" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { label: "Découvrir" },
          { label: "Comprendre", current: true }
        ]
      },
      "methode.html": {
        current: "Méthode",
        back: { href: "/index.html", label: "Retour à l’accueil" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { label: "Découvrir" },
          { label: "Méthode", current: true }
        ]
      },
      "a-propos.html": {
        current: "À propos",
        back: { href: "/index.html", label: "Retour à l’accueil" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { label: "Découvrir" },
          { label: "À propos", current: true }
        ]
      },
      "echelle-foebe.html": {
        current: "Échelle Foébé",
        back: { href: "/methode.html", label: "Retour à la méthode" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { href: "/methode.html", label: "Méthode" },
          { label: "Échelle Foébé", current: true }
        ]
      },
      "zones.html": {
        current: "7 zones",
        back: { href: "/methode.html", label: "Retour à la méthode" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { href: "/methode.html", label: "Méthode" },
          { label: "7 zones", current: true }
        ]
      },
      "boussole.html": {
        current: "Boussole",
        back: { href: "/index.html", label: "Retour à l’accueil" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { label: "Boussole", current: true }
        ]
      },
      "boussole-scenarios.html": {
        current: "Scénarios",
        back: { href: "/boussole.html", label: "Retour à la Boussole" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { href: "/boussole.html", label: "Boussole" },
          { label: "Scénarios", current: true }
        ]
      },
      "dictionnaire.html": {
        current: "Dictionnaire",
        back: { href: "/index.html", label: "Retour à l’accueil" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { label: "Ressources" },
          { label: "Dictionnaire", current: true }
        ]
      },
      "mentions-legales.html": {
        current: "Mentions légales",
        back: { href: "/index.html", label: "Retour à l’accueil" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { label: "Informations" },
          { label: "Mentions légales", current: true }
        ]
      }
    };

    var zoneLabels = {
      "zone-corps.html": "Corps",
      "zone-mental.html": "Mental",
      "zone-energie.html": "Énergie",
      "zone-emotions.html": "Émotions",
      "zone-relations.html": "Relations",
      "zone-environnement.html": "Environnement",
      "zone-sens.html": "Sens"
    };

    Object.keys(zoneLabels).forEach(function (file) {
      trails[file] = {
        current: "Zone " + zoneLabels[file],
        back: { href: "/zones.html", label: "Retour aux 7 zones" },
        desktop: [
          { href: "/index.html", label: "Accueil" },
          { href: "/zones.html", label: "7 zones" },
          { label: zoneLabels[file], current: true }
        ]
      };
    });

    var config = trails[current];
    if (!config) return;

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function renderDesktop(items) {
      return items.map(function (item, index) {
        var label = escapeHtml(item.label);
        if (item.current) {
          return '<li><span class="foebe-breadcrumb-current" aria-current="page">' + label + '</span></li>';
        }
        if (item.href) {
          var cls = index === 0 ? "foebe-breadcrumb-home" : "foebe-breadcrumb-link";
          return '<li><a class="' + cls + '" href="' + escapeHtml(item.href) + '">' + label + '</a></li>';
        }
        return '<li><span class="foebe-breadcrumb-section">' + label + '</span></li>';
      }).join("");
    }

    function injectCss() {
      if (document.getElementById("foebe-breadcrumb-css")) return;

      var css = [
        ".hero.foebe-has-breadcrumb{position:relative!important;}",
        ".hero.foebe-has-breadcrumb .hero-inner,.hero.foebe-has-breadcrumb .hero-content,.hero.foebe-has-breadcrumb .hero-container,.hero.foebe-has-breadcrumb .section-inner{padding-top:clamp(42px,6svh,78px)!important;}",

        ".foebe-breadcrumb{font-family:'Poppins',sans-serif!important;width:min(calc(100% - 40px),980px)!important;max-width:980px!important;color:#4E291F!important;z-index:4!important;}",
        "[data-theme='night'] .foebe-breadcrumb{color:#F0EAE7!important;}",

        ".foebe-breadcrumb__desktop{display:flex!important;align-items:center!important;gap:7px!important;list-style:none!important;margin:0!important;padding:8px 12px!important;white-space:nowrap!important;overflow-x:auto!important;scrollbar-width:none!important;border:1px solid rgba(187,126,96,.28)!important;border-radius:999px!important;background:rgba(248,243,240,.78)!important;box-shadow:0 12px 32px rgba(78,41,31,.08)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;}",
        "[data-theme='night'] .foebe-breadcrumb__desktop{background:rgba(58,26,16,.62)!important;border-color:rgba(187,126,96,.32)!important;box-shadow:0 14px 34px rgba(0,0,0,.18)!important;}",
        ".foebe-breadcrumb__desktop::-webkit-scrollbar{display:none!important;}",
        ".foebe-breadcrumb__desktop li{display:inline-flex!important;align-items:center!important;gap:7px!important;min-width:0!important;color:currentColor!important;}",
        ".foebe-breadcrumb__desktop li:not(:last-child)::after{content:'›'!important;color:#BB7E60!important;opacity:.9!important;font-weight:800!important;}",
        ".foebe-breadcrumb a,.foebe-breadcrumb span{color:currentColor!important;text-decoration:none!important;}",
        ".foebe-breadcrumb-home,.foebe-breadcrumb-link{display:inline-flex!important;align-items:center!important;min-height:30px!important;border-radius:999px!important;font-size:12px!important;font-weight:750!important;line-height:1.2!important;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease!important;}",
        ".foebe-breadcrumb-home{padding:5px 11px!important;background:rgba(187,126,96,.12)!important;border:1px solid rgba(187,126,96,.32)!important;}",
        ".foebe-breadcrumb-link{padding:4px 2px!important;border-bottom:2px solid rgba(187,126,96,.72)!important;border-radius:0!important;}",
        ".foebe-breadcrumb-section{font-size:12px!important;font-weight:650!important;opacity:.76!important;}",
        ".foebe-breadcrumb-current{font-size:12px!important;font-weight:850!important;opacity:1!important;}",
        ".foebe-breadcrumb-home:hover,.foebe-breadcrumb-home:focus-visible{background:rgba(187,126,96,.18)!important;border-color:#BB7E60!important;outline:none!important;box-shadow:0 0 0 3px rgba(187,126,96,.18)!important;}",
        ".foebe-breadcrumb-link:hover,.foebe-breadcrumb-link:focus-visible{border-bottom-color:#C45279!important;outline:none!important;box-shadow:0 2px 0 rgba(196,82,121,.12)!important;}",

        ".foebe-breadcrumb__mobile{display:none!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;padding:7px 9px!important;border-radius:18px!important;border:1px solid rgba(187,126,96,.28)!important;background:linear-gradient(135deg,rgba(248,243,240,.88),rgba(240,234,231,.70))!important;box-shadow:0 10px 24px rgba(78,41,31,.08)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;}",
        "[data-theme='night'] .foebe-breadcrumb__mobile{background:linear-gradient(135deg,rgba(58,26,16,.72),rgba(78,41,31,.58))!important;border-color:rgba(187,126,96,.34)!important;box-shadow:0 12px 28px rgba(0,0,0,.18)!important;}",
        ".foebe-breadcrumb-back{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:34px!important;padding:0 11px!important;border-radius:999px!important;border:1px solid rgba(187,126,96,.38)!important;background:rgba(187,126,96,.10)!important;color:#4E291F!important;font-size:12px!important;font-weight:800!important;line-height:1.15!important;text-decoration:none!important;white-space:nowrap!important;}",
        "[data-theme='night'] .foebe-breadcrumb-back{color:#F0EAE7!important;background:rgba(187,126,96,.12)!important;border-color:rgba(187,126,96,.44)!important;}",
        ".foebe-breadcrumb-back:hover,.foebe-breadcrumb-back:focus-visible{outline:none!important;border-color:#BB7E60!important;box-shadow:0 0 0 3px rgba(187,126,96,.18)!important;background:rgba(187,126,96,.16)!important;}",
        ".foebe-breadcrumb-now{display:inline-flex!important;align-items:center!important;justify-content:flex-end!important;min-width:0!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;font-size:11.5px!important;font-weight:800!important;letter-spacing:.06em!important;text-transform:uppercase!important;color:#4E291F!important;opacity:.82!important;}",
        "[data-theme='night'] .foebe-breadcrumb-now{color:#F0EAE7!important;opacity:.84!important;}",
        ".foebe-breadcrumb-now::before{content:''!important;display:inline-block!important;width:6px!important;height:6px!important;margin-right:7px!important;border-radius:999px!important;background:#BB7E60!important;box-shadow:0 0 0 4px rgba(187,126,96,.12)!important;flex:0 0 auto!important;}",

        ".foebe-breadcrumb--hero{position:absolute!important;top:calc(60px + clamp(20px,4svh,42px))!important;left:50%!important;transform:translateX(-50%)!important;margin:0!important;}",
        ".foebe-breadcrumb--standalone{position:relative!important;margin:calc(60px + 24px) auto 26px!important;}",
        ".foebe-breadcrumb--inline{position:relative!important;width:min(100%,980px)!important;margin:0 auto clamp(22px,3.5svh,38px)!important;}",

        "@media(max-width:767px){.hero.foebe-has-breadcrumb .hero-inner,.hero.foebe-has-breadcrumb .hero-content,.hero.foebe-has-breadcrumb .hero-container,.hero.foebe-has-breadcrumb .section-inner{padding-top:clamp(32px,5svh,54px)!important;}.foebe-breadcrumb{width:calc(100% - 28px)!important;}.foebe-breadcrumb__desktop{display:none!important;}.foebe-breadcrumb__mobile{display:flex!important;}.foebe-breadcrumb--hero{top:calc(60px + 12px)!important;}.foebe-breadcrumb--standalone{margin:calc(60px + 16px) auto 20px!important;}.foebe-breadcrumb--inline{margin:0 auto 18px!important;width:100%!important;}.foebe-breadcrumb-back{font-size:11.5px!important;padding:0 10px!important;max-width:68%!important;overflow:hidden!important;text-overflow:ellipsis!important;}.foebe-breadcrumb-now{font-size:10.5px!important;max-width:42%!important;}}",
        "@media(max-width:380px){.foebe-breadcrumb{width:calc(100% - 22px)!important;}.foebe-breadcrumb__mobile{padding:6px 7px!important;border-radius:16px!important;}.foebe-breadcrumb-back{font-size:11px!important;max-width:72%!important;padding:0 9px!important;}.foebe-breadcrumb-now{font-size:10px!important;max-width:38%!important;}}",
        
        "/* Anti-conflit mobile/desktop — priorité finale */",
        ".foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__desktop{display:flex!important;visibility:visible!important;opacity:1!important;}",
        ".foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__mobile{display:none!important;visibility:hidden!important;opacity:0!important;max-height:0!important;overflow:hidden!important;}",
        "@media(max-width:767px){.foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__desktop{display:none!important;visibility:hidden!important;opacity:0!important;max-height:0!important;overflow:hidden!important;pointer-events:none!important;}.foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__mobile{display:flex!important;visibility:visible!important;opacity:1!important;max-height:none!important;overflow:visible!important;pointer-events:auto!important;}}",
        "@media(min-width:768px){.foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__desktop{display:flex!important;visibility:visible!important;opacity:1!important;max-height:none!important;overflow-x:auto!important;}.foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__mobile{display:none!important;visibility:hidden!important;opacity:0!important;max-height:0!important;overflow:hidden!important;pointer-events:none!important;}}",
        "body > .foebe-breadcrumb:not([data-foebe-auto='1']){display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}",

        
        "/* V5 desktop only : aucun breadcrumb mobile */",
        "@media(max-width:767px){.foebe-breadcrumb,.foebe-breadcrumb__desktop,.foebe-breadcrumb__mobile{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;max-height:0!important;overflow:hidden!important;}}",
        "@media(min-width:768px){.foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__desktop{display:flex!important;visibility:visible!important;opacity:1!important;}.foebe-breadcrumb[data-foebe-auto='1'] .foebe-breadcrumb__mobile{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;max-height:0!important;overflow:hidden!important;}}",
        "html.foebe-no-breadcrumb .foebe-breadcrumb,body.foebe-no-breadcrumb .foebe-breadcrumb{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}",

        "@media(prefers-reduced-motion:reduce){.foebe-breadcrumb a{transition:none!important;}}"
      ].join("\n");

      var style = document.createElement("style");
      style.id = "foebe-breadcrumb-css";
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
    }

    injectCss();

    var nav = document.createElement("nav");
    var isZonePage = /^zone-/.test(current);
    nav.className = "foebe-breadcrumb" + (isZonePage ? " foebe-breadcrumb--zone" : "");
    nav.setAttribute("aria-label", "Fil d’Ariane");
    nav.setAttribute("data-foebe-auto", "1");

    /* Sécurité anti-conflit : un seul breadcrumb actif, le nôtre. */
    document.querySelectorAll(".foebe-breadcrumb").forEach(function (node) {
      if (node !== nav && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });


    nav.innerHTML =
      '<ol class="foebe-breadcrumb__desktop">' + renderDesktop(config.desktop) + '</ol>' +
      '<div class="foebe-breadcrumb__mobile">' +
        '<a class="foebe-breadcrumb-back" href="' + escapeHtml(config.back.href) + '">' + escapeHtml("← " + config.back.label) + '</a>' +
        '<span class="foebe-breadcrumb-now" aria-current="page">' + escapeHtml(config.current) + '</span>' +
      '</div>';

    var hero = document.querySelector(".hero");
    var main = document.querySelector("main");
    var dictHero = document.querySelector(".dict-hero");
    var dictLayout = document.querySelector(".dict-layout, .dictionary-layout, .dictionary-shell, .dictionnaire-layout, .dict-page, .library-layout, .lexicon-layout");
    var isBoussolePage = current === "boussole.html" || current === "boussole-scenarios.html";

    if (current === "dictionnaire.html" && dictHero) {
      nav.className += " foebe-breadcrumb--inline foebe-breadcrumb--dict";
      dictHero.insertBefore(nav, dictHero.firstChild);
      return;
    }

    if (current === "dictionnaire.html" && dictLayout && dictLayout.parentNode) {
      nav.className += " foebe-breadcrumb--standalone";
      dictLayout.parentNode.insertBefore(nav, dictLayout);
      return;
    }

    if (isBoussolePage && hero) {
      nav.className += " foebe-breadcrumb--inline foebe-breadcrumb--boussole";
      hero.insertBefore(nav, hero.firstChild);
      return;
    }

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

    document.body.insertBefore(nav, document.body.firstChild);
  });
})();
