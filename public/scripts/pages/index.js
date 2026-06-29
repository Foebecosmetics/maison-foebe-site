(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function prefersReducedMotion() {
    try {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (error) {
      return false;
    }
  }

  function initReveals() {
    var root = document.documentElement;
    var elements = Array.prototype.slice.call(document.querySelectorAll(".reveal:not([data-index-motion])"));
    if (!elements.length) return;

    function revealAll() {
      elements.forEach(function (element) {
        element.classList.add("visible");
      });
    }

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      revealAll();
      return;
    }

    try {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });

      root.classList.add("foebe-reveal-ready");
      elements.forEach(function (element) {
        observer.observe(element);
      });
    } catch (error) {
      root.classList.remove("foebe-reveal-ready");
      revealAll();
    }
  }

  function initGuidedMotion() {
    var root = document.documentElement;
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-index-motion]"));
    if (!items.length) return;

    function revealAll() {
      items.forEach(function (element) {
        element.classList.add("is-visible");
      });
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window) || window.innerWidth <= 767) {
      root.classList.add("foebe-index-no-motion");
      revealAll();
      return;
    }

    try {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

      root.classList.add("foebe-index-motion-ready");
      items.forEach(function (element) {
        observer.observe(element);
      });
    } catch (error) {
      root.classList.remove("foebe-index-motion-ready");
      root.classList.add("foebe-index-no-motion");
      revealAll();
    }
  }

  function initBreathPreview() {
    var visual = document.getElementById("breathPreview");
    var label = document.getElementById("breathLabel");
    if (!visual || !label) return;

    if (prefersReducedMotion()) {
      label.textContent = "Respirer";
      return;
    }

    var phases = [
      { text: "Inspire", duration: 4000 },
      { text: "Pause", duration: 1000 },
      { text: "Expire", duration: 6000 },
      { text: "Pause", duration: 1000 }
    ];
    var totalDuration = phases.reduce(function (total, phase) {
      return total + phase.duration;
    }, 0);
    var startTime = null;
    var currentPhase = "Inspire";
    var fadeTimer = 0;

    function phaseAt(time) {
      var elapsed = time % totalDuration;
      for (var index = 0; index < phases.length; index += 1) {
        elapsed -= phases[index].duration;
        if (elapsed < 0) return phases[index].text;
      }
      return phases[0].text;
    }

    function tick(timestamp) {
      if (startTime === null) startTime = timestamp;
      var nextPhase = phaseAt(timestamp - startTime);

      if (nextPhase !== currentPhase) {
        currentPhase = nextPhase;
        window.clearTimeout(fadeTimer);
        label.style.opacity = "0";
        fadeTimer = window.setTimeout(function () {
          label.textContent = currentPhase;
          label.style.opacity = ".88";
        }, 180);
      }

      window.requestAnimationFrame(tick);
    }

    visual.classList.add("is-running");
    window.requestAnimationFrame(tick);
  }

  function initDictionaryTyping() {
    var element = document.getElementById("bibliotype");
    if (!element || prefersReducedMotion()) return;

    var words = ["Acide", "Sérum", "Corps", "Repos", "Geste", "Signal", "Stress", "Mental", "Besoin", "Rituel"];
    var wordIndex = 0;
    var characterIndex = 0;
    var deleting = false;
    var pauseFrames = 0;

    function tick() {
      var word = words[wordIndex];

      if (pauseFrames > 0) {
        pauseFrames -= 1;
        window.setTimeout(tick, 40);
        return;
      }

      if (!deleting) {
        characterIndex += 1;
        element.textContent = word.slice(0, characterIndex);
        if (characterIndex >= word.length) {
          deleting = true;
          pauseFrames = 40;
          window.setTimeout(tick, 40);
        } else {
          window.setTimeout(tick, 120 + Math.random() * 50);
        }
        return;
      }

      characterIndex -= 1;
      element.textContent = word.slice(0, characterIndex);
      if (characterIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        pauseFrames = 10;
        window.setTimeout(tick, 40);
      } else {
        window.setTimeout(tick, 70 + Math.random() * 25);
      }
    }

    window.setTimeout(tick, 900);
  }

  function initVocabularyAccordion() {
    var root = document.querySelector(".home-vocab");
    if (!root) return;

    var buttons = Array.prototype.slice.call(root.querySelectorAll(".home-vocab-trigger[data-home-vocab-target]"));
    if (!buttons.length) return;

    function panelFor(button) {
      var id = button.getAttribute("data-home-vocab-target");
      return id ? document.getElementById(id) : null;
    }

    function measuredHeight(panel) {
      return Math.ceil(panel.scrollHeight + 28) + "px";
    }

    function close(button) {
      var panel = panelFor(button);
      button.setAttribute("aria-expanded", "false");
      if (!panel) return;

      if (panel.classList.contains("is-open")) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.offsetHeight;
      }

      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      panel.style.maxHeight = "0px";
    }

    function open(button) {
      var panel = panelFor(button);
      button.setAttribute("aria-expanded", "true");
      if (!panel) return;

      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      panel.style.maxHeight = "0px";
      window.requestAnimationFrame(function () {
        panel.style.maxHeight = measuredHeight(panel);
      });
    }

    function activeButton() {
      return buttons.find(function (button) {
        return button.getAttribute("aria-expanded") === "true";
      }) || null;
    }

    buttons.forEach(function (button) {
      var panel = panelFor(button);
      if (panel) {
        panel.style.maxHeight = "0px";
        panel.addEventListener("transitionend", function (event) {
          if (event.propertyName === "max-height" && panel.classList.contains("is-open")) {
            panel.style.maxHeight = "none";
          }
        });
      }

      button.addEventListener("click", function () {
        var current = activeButton();
        if (button.getAttribute("aria-expanded") === "true") {
          close(button);
          return;
        }

        buttons.forEach(close);
        window.setTimeout(function () {
          open(button);
        }, current ? 115 : 0);
      });
    });

    window.addEventListener("resize", function () {
      var current = activeButton();
      var panel = current ? panelFor(current) : null;
      if (!panel || !panel.classList.contains("is-open")) return;

      panel.style.maxHeight = measuredHeight(panel);
      window.setTimeout(function () {
        if (panel.classList.contains("is-open")) panel.style.maxHeight = "none";
      }, 420);
    }, { passive: true });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") buttons.forEach(close);
    });
  }

  function initNewsletterFeedback() {
    var form = document.getElementById("newsletterForm");
    var input = document.getElementById("newsletterEmail");
    var button = document.getElementById("newsletterSubmit");
    var note = document.getElementById("newsletterNote");
    var status = document.getElementById("newsletterStatus");
    var success = document.getElementById("newsletterSuccess");

    if (!form || !input || !button || !status || !success || !("fetch" in window) || !("FormData" in window)) {
      return;
    }

    var defaultLabel = button.textContent;

    function setLoading(isLoading) {
      button.disabled = isLoading;
      button.setAttribute("aria-busy", isLoading ? "true" : "false");
      button.textContent = isLoading ? "Envoi en cours…" : defaultLabel;
    }

    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) return;

      event.preventDefault();
      setLoading(true);
      status.textContent = "";
      status.classList.remove("is-error");

      window.fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (response) {
        if (!response.ok) {
          var error = new Error("Formspree submission failed");
          error.status = response.status;
          throw error;
        }

        form.reset();
        form.hidden = true;
        if (note) note.hidden = true;
        status.hidden = true;
        success.hidden = false;
        success.focus({ preventScroll: true });
      }).catch(function (error) {
        setLoading(false);
        status.hidden = false;
        status.classList.add("is-error");
        status.textContent = error && error.status === 429
          ? "Trop de tentatives rapprochées. Attends un instant puis réessaie."
          : "L’envoi n’a pas abouti. Ton adresse est restée dans le champ : tu peux réessayer.";
      });
    });
  }

  function initFallbackProgress() {
    var root = document.documentElement;
    var bar = document.getElementById("foebeScrollProgressFallbackBar");
    if (!bar) return;

    function progressIsOff() {
      return root.getAttribute("data-foebe-progress") === "off" ||
        (document.body && document.body.getAttribute("data-foebe-progress") === "off");
    }

    function update() {
      if (progressIsOff() || !root.classList.contains("foebe-shell-failed")) return;

      var documentElement = document.documentElement;
      var body = document.body || documentElement;
      var scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
      var fullHeight = Math.max(
        documentElement.scrollHeight,
        documentElement.offsetHeight,
        documentElement.clientHeight,
        body.scrollHeight || 0,
        body.offsetHeight || 0
      );
      var maxScroll = Math.max(0, fullHeight - window.innerHeight);
      var progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
      bar.style.transform = "scaleX(" + progress.toFixed(4) + ")";
    }

    window.addEventListener("foebe:shell-failed", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    window.addEventListener("load", update);
    window.addEventListener("pageshow", update);
    update();
  }

  onReady(function () {
    initReveals();
    initGuidedMotion();
    initBreathPreview();
    initDictionaryTyping();
    initVocabularyAccordion();
    initNewsletterFeedback();
    initFallbackProgress();
  });
})();
