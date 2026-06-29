(function () {
  'use strict';
  var root = document.documentElement;

  function revealFallback() {
    var items = document.querySelectorAll('.reveal, .impact-item, .geste-card');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      items.forEach(function (item) {
        item.classList.add('visible');
        item.classList.add('lit');
      });
    }
  }

  function removeLegacyBackToTop() {
    var selectors = [
      '#backToTop', '#back-top', '.back-top', '.back-to-top',
      '[data-back-to-top]', '[aria-label="Retour en haut"]',
      '[aria-label="Retour en haut de page"]'
    ];
    document.querySelectorAll(selectors.join(',')).forEach(function (node) {
      if (node.id !== 'foebeBackToTop') node.remove();
    });
  }

  function initFallbackProgress() {
    var bar = document.getElementById('foebeScrollProgressFallbackBar');
    if (!bar) return;
    var active = false;
    var ticking = false;

    function disabled() {
      return !!(document.body && document.body.getAttribute('data-foebe-progress') === 'off');
    }
    function update() {
      ticking = false;
      if (!active || disabled()) return;
      var doc = document.documentElement;
      var body = document.body || doc;
      var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
      var fullHeight = Math.max(doc.scrollHeight, body.scrollHeight, doc.offsetHeight, body.offsetHeight, doc.clientHeight);
      var max = Math.max(0, fullHeight - window.innerHeight);
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0) + ')';
    }
    function requestUpdate() {
      if (!active || ticking) return;
      ticking = true;
      (window.requestAnimationFrame || window.setTimeout)(update, 16);
    }
    function activate() {
      if (active || disabled()) return;
      active = true;
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate, { passive: true });
      requestUpdate();
    }
    function deactivate() {
      if (!active) return;
      active = false;
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      bar.style.transform = 'scaleX(0)';
    }
    function sync() {
      if (root.classList.contains('foebe-shell-failed')) activate();
      else deactivate();
    }
    window.addEventListener('foebe:shell-failed', sync);
    window.addEventListener('foebe:shell-ready', sync);
    if ('MutationObserver' in window) {
      new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] });
    }
    sync();
  }

  function ready() {
    removeLegacyBackToTop();
    revealFallback();
    initFallbackProgress();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();
