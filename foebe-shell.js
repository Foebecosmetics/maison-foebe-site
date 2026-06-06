/**
 * foebe-shell.js — Maison Foébé
 * Version premium responsive v4 — nav, fil d’Ariane structurel, thème explicite et aides de lecture
 *
 * À déposer à la racine du site, au même niveau que index.html.
 * Appel recommandé avant </body> : <script src="/foebe-shell.js"></script>
 */
(function () {
  "use strict";

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
    ".theme-toggle:hover{border-color:#BB7E60!important;background:rgba(187,126,96,.18)!important;transform:translateY(-1px)!important;box-shadow:0 8px 20px rgba(187,126,96,.18)!important;}",
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
    ".theme-toggle{width:auto!important;min-width:44px!important;padding:0 12px!important;gap:7px!important;font-size:13px!important;font-weight:700!important;}",
    ".theme-toggle .theme-icon{font-size:16px!important;line-height:1!important;}",
    ".theme-toggle .theme-label{font-family:'Poppins',sans-serif!important;font-size:12px!important;font-weight:700!important;letter-spacing:.02em!important;white-space:nowrap!important;}",
    "#foebeSkipLink{position:fixed!important;left:16px!important;top:12px!important;z-index:100000!important;transform:translateY(-140%)!important;background:#BB7E60!important;color:#F0EAE7!important;border-radius:999px!important;padding:10px 16px!important;font-family:'Poppins',sans-serif!important;font-size:13px!important;font-weight:800!important;text-decoration:none!important;box-shadow:0 12px 28px rgba(0,0,0,.22)!important;transition:transform .18s ease!important;}",
    "#foebeSkipLink:focus{transform:translateY(0)!important;outline:2px solid #F0EAE7!important;outline-offset:3px!important;}",
    "#foebeProgress{position:fixed!important;top:60px!important;left:0!important;right:0!important;height:3px!important;z-index:99991!important;background:transparent!important;pointer-events:none!important;}",
    "#foebeProgress span{display:block!important;width:0;height:100%!important;background:#BB7E60!important;box-shadow:0 0 12px rgba(187,126,96,.36)!important;transition:width .08s linear!important;}",
    "#foebeBackTop{position:fixed!important;right:18px!important;bottom:18px!important;z-index:99980!important;min-width:46px!important;min-height:46px!important;border:1px solid rgba(187,126,96,.42)!important;border-radius:999px!important;background:rgba(78,41,31,.92)!important;color:#F0EAE7!important;font-family:'Poppins',sans-serif!important;font-size:13px!important;font-weight:800!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;padding:0 14px!important;box-shadow:0 14px 34px rgba(0,0,0,.24)!important;cursor:pointer!important;opacity:0!important;transform:translateY(10px)!important;pointer-events:none!important;transition:opacity .2s ease,transform .2s ease,background .2s ease!important;}",
    "#foebeBackTop.visible{opacity:1!important;transform:translateY(0)!important;pointer-events:auto!important;}",
    "#foebeBackTop:hover,#foebeBackTop:focus-visible{background:#BB7E60!important;outline:2px solid rgba(240,234,231,.45)!important;outline-offset:3px!important;}",
    "[data-theme='day'] #foebeBackTop{background:rgba(240,234,231,.94)!important;color:#4E291F!important;box-shadow:0 12px 30px rgba(78,41,31,.14)!important;}",
    "[data-theme='day'] #foebeBackTop:hover,[data-theme='day'] #foebeBackTop:focus-visible{background:#BB7E60!important;color:#F0EAE7!important;}",
    "#foebeBreadcrumb{position:relative!important;z-index:10!important;width:100%!important;background:transparent!important;padding:72px 0 0!important;}",
    "#foebeBreadcrumb .breadcrumb-shell{max-width:1120px!important;margin:0 auto!important;padding:10px clamp(16px,3vw,32px)!important;display:flex!important;align-items:center!important;gap:10px!important;overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;}",
    "#foebeBreadcrumb .breadcrumb-shell::-webkit-scrollbar{display:none!important;}",
    "#foebeBreadcrumb .breadcrumb-kicker{flex:0 0 auto!important;font-family:'Poppins',sans-serif!important;font-size:10px!important;font-weight:800!important;letter-spacing:1.35px!important;text-transform:uppercase!important;color:var(--warm,#BB7E60)!important;opacity:.95!important;}",
    "#foebeBreadcrumb ol{list-style:none!important;display:flex!important;align-items:center!important;gap:4px 6px!important;margin:0!important;padding:0!important;min-width:0!important;white-space:nowrap!important;}",
    "#foebeBreadcrumb li{display:flex!important;align-items:center!important;gap:6px!important;font-family:'Poppins',sans-serif!important;font-size:11.5px!important;font-weight:600!important;line-height:1.2!important;flex:0 0 auto!important;}",
    "#foebeBreadcrumb li+li::before{content:'›'!important;color:var(--warm,#BB7E60)!important;opacity:.72!important;font-size:12px!important;line-height:1!important;}",
    "#foebeBreadcrumb a{color:var(--warm,#BB7E60)!important;text-decoration:none!important;opacity:.82!important;transition:opacity .18s ease,color .18s ease!important;}",
    "#foebeBreadcrumb a:hover,#foebeBreadcrumb a:focus-visible{opacity:1!important;text-decoration:underline!important;outline:none!important;}",
    "#foebeBreadcrumb [aria-current='page']{display:inline-flex!important;align-items:center!important;min-height:26px!important;padding:0 9px!important;border-radius:999px!important;background:rgba(187,126,96,.14)!important;border:1px solid rgba(187,126,96,.28)!important;color:var(--text,#F0EAE7)!important;opacity:.96!important;font-weight:700!important;}",
    "#foebeBreadcrumb .breadcrumb-current-mobile{display:none!important;}",
    "[data-theme='day'] #foebeBreadcrumb [aria-current='page']{color:#4E291F!important;background:rgba(187,126,96,.12)!important;}",
    "[data-theme='day'] #foebeBreadcrumb a{color:#BB7E60!important;}",
    "@media(max-width:760px){.theme-toggle{padding:0 10px!important;}.theme-toggle .theme-label{display:none!important;}#foebeProgress{top:58px!important;}#foebeBackTop{right:14px!important;bottom:14px!important;min-width:44px!important;min-height:44px!important;padding:0 13px!important;}#foebeBackTop .backtop-label{display:none!important;}#foebeBreadcrumb{padding-top:66px!important;}#foebeBreadcrumb .breadcrumb-shell{padding:8px clamp(14px,4vw,20px)!important;gap:8px!important;}#foebeBreadcrumb .breadcrumb-kicker{font-size:9.5px!important;letter-spacing:1.1px!important;}#foebeBreadcrumb ol{display:none!important;}#foebeBreadcrumb .breadcrumb-current-mobile{display:inline-flex!important;align-items:center!important;min-height:26px!important;padding:0 9px!important;border-radius:999px!important;background:rgba(187,126,96,.14)!important;border:1px solid rgba(187,126,96,.28)!important;color:var(--text,#F0EAE7)!important;font-family:'Poppins',sans-serif!important;font-size:11px!important;font-weight:800!important;white-space:nowrap!important;}}",
    "",
    "/* Correctif V4.2 — menu tablette",
    "   Objectif : éviter le menu trop desktop sur iPad/tablette et garantir une lecture stable.",
    "*/",
    "@media(min-width:641px) and (max-width:1180px){",
    "  #mainNav{height:60px!important;padding:0 18px!important;gap:12px!important;}",
    "  .nav-logo{font-size:18px!important;flex:0 0 auto!important;}",
    "  .theme-toggle{width:auto!important;min-width:42px!important;height:42px!important;min-height:42px!important;padding:0 12px!important;gap:7px!important;}",
    "  .theme-toggle .theme-label{display:inline!important;font-size:12px!important;font-weight:700!important;white-space:nowrap!important;}",
    "  #menuToggle{width:auto!important;min-width:46px!important;height:42px!important;min-height:42px!important;padding:0 14px!important;font-size:20px!important;}",
    "  #navMenu{top:60px!important;max-height:calc(100dvh - 60px)!important;}",
    "  .nav-panel-inner{",
    "    max-width:840px!important;",
    "    padding:24px 22px 30px!important;",
    "    display:grid!important;",
    "    grid-template-columns:repeat(2,minmax(0,1fr))!important;",
    "    gap:22px 24px!important;",
    "  }",
    "  .nav-pole{min-width:0!important;}",
    "  .nav-pole:last-child{grid-column:1 / -1!important;}",
    "  .nav-pole-label{font-size:10px!important;letter-spacing:2px!important;margin-bottom:7px!important;padding-bottom:10px!important;}",
    "  .nav-link{min-height:46px!important;padding:11px 12px!important;font-size:13.5px!important;border-radius:14px!important;}",
    "  .nav-pole:last-child .nav-link{display:inline-flex!important;width:auto!important;margin-right:8px!important;}",
    "}",
    "@media(min-width:641px) and (max-width:820px){",
    "  .theme-toggle{width:42px!important;padding:0!important;}",
    "  .theme-toggle .theme-label{display:none!important;}",
    "  .nav-panel-inner{max-width:680px!important;grid-template-columns:1fr 1fr!important;gap:18px!important;padding:22px 18px 28px!important;}",
    "  .nav-link{font-size:13px!important;min-height:45px!important;}",
    "}",
    "@media(min-width:821px) and (max-width:1180px) and (orientation:landscape){",
    "  .nav-panel-inner{grid-template-columns:repeat(4,minmax(0,1fr))!important;max-width:1040px!important;gap:18px!important;}",
    "  .nav-pole:last-child{grid-column:auto!important;}",
    "  .nav-pole:last-child .nav-link{display:flex!important;margin-right:0!important;}",
    "}",
    "",
    "",
    "/* Correctif V4.4 — boussole exacte + halo jour adouci */",
    "/* Correctif V4.5 — halo jour aligné sur la zone longue */",
    "/* Correctif V4.3 — signature lumineuse Foébé",
    "   Objectif : guider le regard vers le logo sur toutes les pages, sans effet néon.",
    "   Nuit : halo doux type lampadaire.",
    "   Jour : halo chaud discret, sans ombre lourde.",
    "*/",
    "#mainNav .nav-logo{position:relative!important;isolation:isolate!important;text-shadow:none!important;filter:none!important;}",
    "#mainNav .nav-logo::before{content:''!important;position:absolute!important;left:50%!important;top:-34px!important;width:118px!important;height:74px!important;transform:translateX(-50%)!important;pointer-events:none!important;z-index:-1!important;border-radius:999px!important;background:radial-gradient(ellipse at center,rgba(240,234,231,.34) 0%,rgba(187,126,96,.22) 34%,rgba(187,126,96,.09) 58%,transparent 76%)!important;filter:blur(12px)!important;opacity:.82!important;}",
    "#mainNav .nav-logo::after{content:''!important;position:absolute!important;left:50%!important;top:-12px!important;width:72px!important;height:36px!important;transform:translateX(-50%)!important;pointer-events:none!important;z-index:-1!important;border-radius:999px!important;background:radial-gradient(ellipse at center,rgba(240,234,231,.22),transparent 70%)!important;filter:blur(8px)!important;opacity:.55!important;}",
    "[data-theme='day'] #mainNav .nav-logo{text-shadow:none!important;filter:none!important;}",
    "[data-theme='day'] #mainNav .nav-logo::before{top:-34px!important;width:118px!important;height:74px!important;background:radial-gradient(ellipse at center,rgba(187,126,96,.16) 0%,rgba(187,126,96,.085) 42%,rgba(187,126,96,.035) 62%,transparent 78%)!important;filter:blur(15px)!important;opacity:.48!important;}",
    "[data-theme='day'] #mainNav .nav-logo::after{display:none!important;}",
    "@media(max-width:420px){#mainNav .nav-logo::before{width:96px!important;height:58px!important;top:-28px!important;opacity:.72!important;}#mainNav .nav-logo::after{width:62px!important;height:30px!important;top:-10px!important;}}",
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
     2. DÉTECTION DE LA PAGE COURANTE
  ═══════════════════════════════════════════════════════════════════════════ */
  var currentFile = (window.location.pathname.split("/").pop() || "index.html").split("?")[0].split("#")[0];
  if (!currentFile) currentFile = "index.html";

  /*
   * Normalisation page active — Maison Foébé
   * Permet à l'état actif du menu de fonctionner aussi pendant les tests locaux
   * avec des fichiers versionnés : methode-v7.html, pratiquer-maison-foebe-v9.html, etc.
   */
  function normalizeCurrentFile(file) {
    file = (file || "index.html").toLowerCase();
    try { file = decodeURIComponent(file); } catch (e) {}

    if (file === "" || file === "/" || file === "index" || file.indexOf("index-") === 0 || file.indexOf("index_") === 0) return "index.html";

    if (file === "comprendre" || file.indexOf("comprendre") === 0) return "comprendre.html";
    if (file === "pratiquer" || file.indexOf("pratiquer") === 0) return "pratiquer.html";
    if (file === "methode" || file === "méthode" || file.indexOf("methode") === 0 || file.indexOf("méthode") === 0) return "methode.html";
    if (file === "a-propos" || file.indexOf("a-propos") === 0 || file.indexOf("apropos") === 0) return "a-propos.html";

    if (file === "test" || file.indexOf("test") === 0 || file.indexOf("echelle") === 0 || file.indexOf("échelle") === 0) return "test.html";
    if (file === "foebe-zones-cadre" || file.indexOf("foebe-zones-cadre") === 0) return "foebe-zones-cadre.html";
    if (file === "respiration" || file.indexOf("respiration") === 0) return "respiration.html";
    if (file === "boussole.html" || file === "boussole") return "boussole.html";
    if (file === "boussole-accueil-foebe" || file.indexOf("boussole-accueil-foebe") === 0) return "boussole-accueil-foebe.html";
    if (file.indexOf("boussole") === 0) return "boussole.html";

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
     2.5 FIL D’ARIANE — structure du site
     Le fil indique où se situe la page dans l’architecture Maison Foébé.
     Il ne remplace pas le bouton retour du navigateur et n’affiche pas l’historique réel.
  ═══════════════════════════════════════════════════════════════════════════ */
  var BREADCRUMB_MAP = {
    "index.html": null,
    "comprendre.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Découvrir" },
      { label: "Comprendre" }
    ],
    "a-propos.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Découvrir" },
      { label: "À propos" }
    ],
    "methode.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Découvrir" },
      { label: "La méthode Foébé" }
    ],
    "pratiquer.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Pratiquer" }
    ],
    "test.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Pratiquer", href: "pratiquer.html" },
      { label: "Échelle Foébé" }
    ],
    "foebe-zones-cadre.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Pratiquer", href: "pratiquer.html" },
      { label: "Les 7 zones" }
    ],
    "respiration.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Pratiquer", href: "pratiquer.html" },
      { label: "Respiration guidée" }
    ],
    "boussole-accueil-foebe.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Pratiquer", href: "pratiquer.html" },
      { label: "Sas de la Boussole" }
    ],
    "boussole.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Pratiquer", href: "pratiquer.html" },
      { label: "Sas", href: "boussole-accueil-foebe.html" },
      { label: "La Boussole" }
    ],
    "zone-corps.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Corps" }
    ],
    "zone-mental.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Mental" }
    ],
    "zone-energie.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Énergie" }
    ],
    "zone-emotions.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Émotions" }
    ],
    "zone-environnement.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Environnement" }
    ],
    "zone-relations.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Relations" }
    ],
    "zone-sens.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Les 7 zones", href: "foebe-zones-cadre.html" },
      { label: "Sens" }
    ],
    "stories.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Ressources" },
      { label: "Lexique Foébé" }
    ],
    "dictionnaire.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Ressources" },
      { label: "Dictionnaire Foébé" }
    ],
    "mentions.html": [
      { label: "Accueil", href: "index.html" },
      { label: "Mentions légales" }
    ]
  };

  function escapeShellText(value) {
    return String(value).replace(/[&<>\"]/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char];
    });
  }

  function injectBreadcrumb() {
    var oldBreadcrumb = document.getElementById("foebeBreadcrumb");
    if (oldBreadcrumb) oldBreadcrumb.remove();

    var breadcrumbMode = (
      document.documentElement.getAttribute("data-foebe-breadcrumb") ||
      (document.body && document.body.getAttribute("data-foebe-breadcrumb")) ||
      ""
    ).toLowerCase();
    if (breadcrumbMode === "none") return;

    var crumbs = BREADCRUMB_MAP[currentFile];
    if (!crumbs || crumbs.length === 0) return;

    var ol = crumbs.map(function (item, index) {
      var isLast = index === crumbs.length - 1;
      var label = escapeShellText(item.label);
      if (isLast || !item.href) {
        return '<li><span' + (isLast ? ' aria-current="page"' : '') + '>' + label + '</span></li>';
      }
      return '<li><a href="' + escapeShellText(item.href) + '">' + label + '</a></li>';
    }).join("");

    var currentLabel = escapeShellText(crumbs[crumbs.length - 1].label);
    var breadcrumb = document.createElement("div");
    breadcrumb.id = "foebeBreadcrumb";
    breadcrumb.innerHTML = '<nav class="breadcrumb-shell" aria-label="Fil d’Ariane"><span class="breadcrumb-kicker">Tu es ici</span><ol>' + ol + '</ol><span class="breadcrumb-current-mobile">' + currentLabel + '</span></nav>';

    var nav = document.getElementById("mainNav");
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(breadcrumb, nav.nextSibling);
    } else {
      document.body.insertBefore(breadcrumb, document.body.firstChild);
    }
  }

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
      { href: "pratiquer.html",              label: "4 outils" },
      { href: "test.html",                   label: "Échelle Foébé" },
      { href: "foebe-zones-cadre.html",      label: "Comprendre les 7 zones", activeWhenZones: true },
      { href: "respiration.html",            label: "Respiration guidée" },
      { href: "boussole-accueil-foebe.html", label: "La Boussole" }
    ]},
    { pole: "Ressources", links: [
      { href: "stories.html",      label: "Lexique Foébé" },
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

  /* Aide accessibilité — accès direct au contenu */
  var pageMain = document.querySelector("main");
  if (pageMain && !pageMain.id) pageMain.id = "mainContent";
  if (pageMain && !document.getElementById("foebeSkipLink")) {
    var skipLink = document.createElement("a");
    skipLink.id = "foebeSkipLink";
    skipLink.href = "#" + pageMain.id;
    skipLink.textContent = "Aller au contenu";
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

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
        '<button aria-label="Changer le thème" class="theme-toggle" id="themeToggle" type="button"><span class="theme-icon" aria-hidden="true">☀️</span><span class="theme-label">Mode jour</span></button>' +
        '<button aria-controls="navMenu" aria-expanded="false" aria-label="Ouvrir le menu" id="menuToggle" type="button">☰</button>' +
      '</div>';

  var navMenu = document.getElementById("navMenu");
  if (!navMenu) {
    navMenu = document.createElement("div");
    navMenu.id = "navMenu";
    mainNav.insertAdjacentElement("afterend", navMenu);
  }

  navMenu.setAttribute("role", "navigation");
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

  injectBreadcrumb();

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

  var footerMode = (
    document.documentElement.getAttribute("data-foebe-footer") ||
    (document.body && document.body.getAttribute("data-foebe-footer")) ||
    ""
  ).toLowerCase();

  if (footerMode !== "none") {
    var footerEl = document.getElementById("foebeShellFooter") || document.querySelector("footer");
    if (!footerEl) {
      footerEl = document.createElement("footer");
      document.body.appendChild(footerEl);
    }
    footerEl.id = "foebeShellFooter";
    footerEl.setAttribute("data-foebe-shell", "footer");

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
          '<a class="footer-link" href="mentions.html">Mentions légales</a>' +
          '<a class="footer-link" href="comprendre.html">Comprendre</a>' +
          '<a class="footer-link" href="pratiquer.html">Pratiquer</a>' +
          '<a class="footer-link" href="a-propos.html">À propos</a>' +
          '<a class="footer-link" href="methode.html">Méthode</a>' +
        '</div>' +
        '<p class="footer-note">© 2026 Maison Foébé · Tous droits réservés</p>' +
      '</div>';
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     5. THÈME JOUR / NUIT
  ═══════════════════════════════════════════════════════════════════════════ */

  var h = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");

  try {
    var storedTheme = window.localStorage && localStorage.getItem("foebeTheme");
    if (storedTheme === "day" || storedTheme === "night") h.setAttribute("data-theme", storedTheme);
  } catch (e) {}

  function syncThemeButton() {
    if (!themeBtn) return;
    var isNight = h.getAttribute("data-theme") === "night";
    themeBtn.innerHTML = '<span class="theme-icon" aria-hidden="true">' + (isNight ? '☀️' : '🌙') + '</span><span class="theme-label">' + (isNight ? 'Mode jour' : 'Mode sombre') + '</span>';
    themeBtn.setAttribute("aria-label", isNight ? "Passer en mode jour" : "Passer en mode sombre");
  }

  syncThemeButton();

  if (themeBtn) {
    themeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var next = h.getAttribute("data-theme") === "night" ? "day" : "night";
      h.setAttribute("data-theme", next);
      try { if (window.localStorage) localStorage.setItem("foebeTheme", next); } catch (err) {}
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

  function closeMenu() {
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
        closeMenu();
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
      closeMenu();
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
     8. AIDES DE LECTURE — progression et retour haut
  ═══════════════════════════════════════════════════════════════════════════ */
  var progressMode = (
    document.documentElement.getAttribute("data-foebe-progress") ||
    (document.body && document.body.getAttribute("data-foebe-progress")) ||
    ""
  ).toLowerCase();

  if (progressMode !== "none" && !document.getElementById("foebeProgress")) {
    var progress = document.createElement("div");
    progress.id = "foebeProgress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = "<span></span>";
    document.body.appendChild(progress);

    var progressBar = progress.querySelector("span");
    var updateProgress = function () {
      var doc = document.documentElement;
      var scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      var value = Math.max(0, Math.min(100, (window.scrollY / scrollable) * 100));
      progressBar.style.width = value + "%";
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  var backTopMode = (
    document.documentElement.getAttribute("data-foebe-backtop") ||
    (document.body && document.body.getAttribute("data-foebe-backtop")) ||
    ""
  ).toLowerCase();

  if (backTopMode !== "none" && !document.getElementById("backToTop") && !document.getElementById("foebeBackTop")) {
    var backTop = document.createElement("button");
    backTop.id = "foebeBackTop";
    backTop.type = "button";
    backTop.setAttribute("aria-label", "Revenir en haut de la page");
    backTop.innerHTML = '<span aria-hidden="true">↑</span><span class="backtop-label">Haut</span>';
    document.body.appendChild(backTop);

    var toggleBackTop = function () {
      if (window.scrollY > 560) backTop.classList.add("visible");
      else backTop.classList.remove("visible");
    };

    toggleBackTop();
    window.addEventListener("scroll", toggleBackTop, { passive: true });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
})();
