"use strict";

        /* ── Init palette ─── */
        function initPalette() {
            var p = ZONE_CONFIG.palette,
                r = document.documentElement;
            r.style.setProperty("--z", p.z);
            r.style.setProperty("--z-mid", p.zMid);
            r.style.setProperty("--z-lite", p.zLite);
            r.style.setProperty("--z-dim", "rgba(" + p.zMidR + "," + p.zMidG + "," + p.zMidB + ",0.13)");
            r.style.setProperty("--z-r", String(p.zR));
            r.style.setProperty("--z-g", String(p.zG));
            r.style.setProperty("--z-b", String(p.zB));
            r.style.setProperty("--z-mid-r", String(p.zMidR));
            r.style.setProperty("--z-mid-g", String(p.zMidG));
            r.style.setProperty("--z-mid-b", String(p.zMidB));
            r.style.setProperty("--z-lite-r", String(p.zLiteR));
            r.style.setProperty("--z-lite-g", String(p.zLiteG));
            r.style.setProperty("--z-lite-b", String(p.zLiteB));
        }

        function initMeta() {
            var formZone = document.getElementById("formZoneField");
            if (formZone) formZone.value = ZONE_CONFIG.slug;
        }

        function initHero() {
            var z = ZONE_CONFIG;
            document.getElementById("heroNum").textContent = "Zone " + z.number + " · Maison Foébé";
            document.getElementById("heroEmoji").textContent = z.emoji;
            document.getElementById("heroTitle").textContent = z.slug;
        }

        function initIntro() {
            document.getElementById("zoneIntroText").innerHTML = ZONE_INTRO.text;
            var warn = document.getElementById("zoneWarning");
            if (ZONE_INTRO.warning) {
                warn.textContent = ZONE_INTRO.warning;
                warn.style.display = "";
            }
        }

        /* ── CORRECTION 1 : initIci — flèches pilotées par pointer:fine ─────
           Sur pointer:coarse (tactile) : jamais de flèches, scroll natif.
           Sur pointer:fine (souris/trackpad) : flèches seulement si overflow
           réel mesuré APRÈS layout (requestAnimationFrame pour fiabilité).
           justify-content centré si pas d'overflow, gauche si overflow.     */
        function initIci() {
            var z = ZONE_CONFIG;
            document.getElementById("iciIcon").textContent = z.emoji;
            document.getElementById("iciCardTitle").textContent = "Pour mieux te situer";
            var bar = document.getElementById("iciZonesBar");
            bar.innerHTML = "";
            ZONES_NAV.forEach(function(zone) {
                var dot = zone.active ? document.createElement("div") : document.createElement("a");
                if (!zone.active) dot.href = zone.url;
                dot.className = "ici-zone-dot" + (zone.active ? " active" : "");
                dot.innerHTML = '<div class="ici-dot-circle">' + zone.emoji + '</div><span class="ici-dot-label">' + zone.label + '</span>';
                bar.appendChild(dot);
            });
            var leftBtn = document.getElementById("iciScrollLeft"),
                rightBtn = document.getElementById("iciScrollRight");
            leftBtn.addEventListener("click", function() {
                bar.scrollBy({
                    left: -220,
                    behavior: "smooth"
                });
            });
            rightBtn.addEventListener("click", function() {
                bar.scrollBy({
                    left: 220,
                    behavior: "smooth"
                });
            });

            /* matchMedia pointer:fine = souris/trackpad (desktop).
               pointer:coarse = tactile (mobile/tablette).               */
            var mqlFine = window.matchMedia("(pointer:fine)");

            function updateScrollButtons() {
                /* Sur devices tactiles : jamais de flèches, toujours centré */
                if (!mqlFine.matches) {
                    leftBtn.classList.remove("visible");
                    rightBtn.classList.remove("visible");
                    bar.classList.remove("ici-zones-overflow");
                    return;
                }
                /* Desktop : mesure overflow réel */
                var overflow = bar.scrollWidth - bar.clientWidth;
                var hasOverflow = overflow > 20; /* seuil >20px = overflow significatif */
                bar.classList.toggle("ici-zones-overflow", hasOverflow);
                if (!hasOverflow) {
                    leftBtn.classList.remove("visible");
                    rightBtn.classList.remove("visible");
                    return;
                }
                leftBtn.classList.toggle("visible", bar.scrollLeft > 4);
                rightBtn.classList.toggle("visible", bar.scrollLeft < overflow - 4);
            }

            bar.addEventListener("scroll", function() {
                updateScrollButtons();
            }, {
                passive: true
            });
            window.addEventListener("resize", function() {
                /* RAF pour mesurer après reflow */
                requestAnimationFrame(function() {
                    updateScrollButtons();
                });
            }, {
                passive: true
            });
            if (mqlFine.addEventListener) {
                mqlFine.addEventListener("change", function() {
                    requestAnimationFrame(updateScrollButtons);
                });
            }
            /* Initial : après layout complet */
            window.addEventListener("load", function() {
                updateScrollButtons();
            });
            requestAnimationFrame(function() {
                updateScrollButtons();
            });
        }

        function initPitch() {
            var wrap = document.getElementById("pagePitch");
            wrap.innerHTML = "";
            PITCH_DATA.forEach(function(item) {
                wrap.innerHTML += '<div class="pitch-item"><span class="pitch-icon">' + item.icon + '</span><div><p class="pitch-label">' + item.label + '</p><p class="pitch-val">' + item.val + '</p></div></div>';
            });
        }

        function initComprendre() {
            var sm = SECTIONS_META.comprendre;
            setText("comprendreNum", sm.num);
            setText("comprendreEyebrow", sm.eyebrow);
            setText("comprendreTitle", sm.title);
            setText("vennIntro", COMPRENDRE.intro);
            var list = document.getElementById("facteursList");
            list.innerHTML = "";
            COMPRENDRE.facteurs.forEach(function(f) {
                list.innerHTML += '<div class="facteur-item"><div class="facteur-icon">' + f.icon + '</div><div><p class="facteur-name">' + f.name + '</p><p class="facteur-desc">' + f.desc + '</p></div></div>';
            });
            setText("vrIcon", COMPRENDRE.vrIcon);
            setText("vrTitle", COMPRENDRE.vrTitle);
            setText("vrNote", COMPRENDRE.vrNote);
        }

        function initObs() {
            var sm = SECTIONS_META.minitest;
            setText("miniNum", sm.num);
            setText("miniEyebrow", sm.eyebrow);
            setText("miniTitle", sm.title);
            var stack = document.getElementById("obsStack");
            stack.innerHTML = "";
            OBS_QUESTIONS.forEach(function(q, i) {
                var active = (i === 0) ? " obs-active" : "";
                var opacity = (i === 0) ? "" : " style=\"opacity:0\"";
                stack.innerHTML += '<div class="obs-card' + active + '" data-card="' + i + '"' + opacity + '>' +
                    '<span class="obs-swipe-label label-no">✕ Pas moi</span>' +
                    '<span class="obs-swipe-label label-yes">Moi ✓</span>' +
                    '<span class="obs-card-num">Signal ' + (i + 1) + ' sur 5</span>' +
                    '<p class="obs-card-q">' + q.q + '</p>' +
                    '<p class="obs-card-sub">' + q.sub + '</p>' +
                    '</div>';
            });
            obsCards = document.querySelectorAll(".obs-card");
        }

        function initImpacts() {
            var sm = SECTIONS_META.impacts;
            setText("impactsNum", sm.num);
            setText("impactsEyebrow", sm.eyebrow);
            setText("impactsTitle", sm.title);
            setText("impactsIntro", IMPACTS_INTRO);
            var tl = document.getElementById("impactsTimeline");
            tl.innerHTML = "";
            IMPACTS_DATA.forEach(function(item, i) {
                var primary = (item.tag === "primary") ? " primary" : "";
                var dimHtml = item.url ? '<a href="' + item.url + '" class="impact-dim-link">' + item.dim + '</a>' : item.dim;
                tl.innerHTML += '<div class="impact-item' + primary + '" data-impact="' + i + '">' +
                    '<div class="impact-left"><div class="impact-dot' + primary + '">' + item.emoji + '</div></div>' +
                    '<div class="impact-right"><div class="impact-header"><span class="impact-dim">' + dimHtml + '</span>' +
                    '<span class="impact-tag ' + item.tag + '">' + item.tagLabel + '</span></div>' +
                    '<p class="impact-desc">' + item.desc + '</p></div></div>';
            });
        }

        function initGestes() {
            var sm = SECTIONS_META.gestes;
            setText("gestesNum", sm.num);
            setText("gestesEyebrow", sm.eyebrow);
            setText("gestesTitle", sm.title);
            setText("gestesHeaderEyebrow", GESTES_META.eyebrow);
            setText("gestesName", GESTES_META.name);
            setText("gestesSub", GESTES_META.sub);
            document.getElementById("gestesIntention").textContent = GESTES_META.intention;
            var grid = document.getElementById("gestesGrid");
            grid.innerHTML = "";
            GESTES_DATA.forEach(function(g, i) {
                var n = i + 1;
                var metaSpans = g.meta.map(function(m) {
                    return '<span>' + m + '</span>';
                }).join("");
                var sensorielHtml = g.sensoriel ? '<p class="geste-sensoriel">' + g.sensoriel + '</p>' : '';
                grid.innerHTML += '<div class="geste-card geste-' + n + '">' +
                    '<p class="geste-type">' + g.type + '</p>' +
                    '<div class="geste-meta">' + metaSpans + '</div>' +
                    '<p class="geste-text">' + g.text + '</p>' +
                    '<div class="geste-why"><strong>Ce que ça fait</strong>' + g.why + '</div>' +
                    sensorielHtml + '</div>';
            });
            var freq = document.getElementById("gestesFreq");
            freq.innerHTML = '<span class="freq-icon">' + GESTES_META.freqIcon + '</span><p>' + GESTES_META.freqText + '</p>';
        }

        function initZonesNav() {
            var wrap = document.getElementById("zonesChips");
            wrap.innerHTML = "";
            ZONES_NAV.forEach(function(zone) {
                var a = document.createElement("a");
                a.href = zone.url;
                a.className = "zone-chip" + (zone.active ? " active" : "");
                a.textContent = zone.emoji + " " + zone.label;
                wrap.appendChild(a);
            });
        }

        function setText(id, val) {
            var el = document.getElementById(id);
            if (el) el.textContent = val;
        }

        initPalette();
        initMeta();
        initHero();
        initIntro();
        initIci();
        initPitch();
        initComprendre();
        initObs();
        initImpacts();
                initGestes();
        initZonesNav();

        /* Composants interactifs */
        (function() {
            var btn = document.getElementById('themeBtn');
            if (btn) btn.textContent = document.documentElement.getAttribute('data-theme') === 'night' ? '☀️ Mode jour' : '🌙 Mode nuit';
        })();
        (function() {
            var bar = document.getElementById("foebeScrollProgressFallbackBar");

            function updateFallbackProgress() {
                if (!bar || !document.documentElement.classList.contains("foebe-shell-failed")) return;
                var max = document.documentElement.scrollHeight - window.innerHeight;
                var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
                bar.style.transform = "scaleX(" + progress + ")";
            }

            function updateScrollUi() {
                var s = window.scrollY;
                updateFallbackProgress();
            }

            window.addEventListener("foebe:shell-failed", updateFallbackProgress);
            window.addEventListener("scroll", updateScrollUi, { passive: true });
            window.addEventListener("resize", updateFallbackProgress);
            updateScrollUi();

            var mainNav = document.getElementById("mainNav");
            if (mainNav) {
                mainNav.classList.toggle("scrolled", window.scrollY > 40);
                window.addEventListener("scroll", function() {
                    mainNav.classList.toggle("scrolled", window.scrollY > 40);
                }, { passive: true });
            }
        })();

        /* =========================================================
           PATCH FINAL — STANDARD ENVIRONNEMENT / BOX DES ÉTATS
           Titre toujours crème, clic extérieur + Échap ferment la box.
           ========================================================= */
        var lastStateTag = null;

        function showStateDef(id) {
            var def = STATE_DEFS[id];
            var box = document.getElementById("stateDefBox");
            if (!def || !box) return;

            document.querySelectorAll(".ici-state-tag").forEach(function(t) {
                t.classList.remove("active-state");
            });

            if (lastStateTag === id && box.classList.contains("visible")) {
                closeStateDef();
                return;
            }

            var clicked = document.querySelector(".ici-state-tag." + id);
            if (clicked) {
                clicked.classList.add("active-state");
                lastStateTag = id;
            }

            var titleEl = document.getElementById("stateDefTitle");
            if (titleEl) {
                titleEl.textContent = def.title;
                titleEl.style.color = "";
            }

            var textEl = document.getElementById("stateDefText");
            if (textEl) textEl.textContent = def.text;

            box.dataset.state = id;
            box.classList.add("visible");

            var so = document.getElementById("stateOverlay");
            if (so) {
                so.classList.remove("hiding");
                so.classList.add("visible");
            }

            document.body.classList.add("state-active");
        }

        function closeStateDef() {
            var box = document.getElementById("stateDefBox");
            if (box) box.classList.remove("visible");

            document.querySelectorAll(".ici-state-tag").forEach(function(t) {
                t.classList.remove("active-state");
            });

            lastStateTag = null;

            var so = document.getElementById("stateOverlay");
            if (so) {
                so.classList.remove("visible");
                so.classList.add("hiding");
                setTimeout(function() {
                    so.classList.remove("hiding");
                }, 230);
            }

            document.body.classList.remove("state-active");
        }

        (function() {
            var iciCard = document.querySelector(".ici-card");

            if (iciCard) {
                iciCard.addEventListener("click", function(e) {
                    var btn = e.target.closest("[data-state]");
                    if (btn) {
                        e.stopPropagation();
                        showStateDef(btn.getAttribute("data-state"));
                    }
                });
            }

            document.addEventListener("click", function(e) {
                var box = document.getElementById("stateDefBox");
                if (!box || !box.classList.contains("visible")) return;

                var clickedInsideStateArea = e.target.closest(".ici-card");
                if (!clickedInsideStateArea) {
                    closeStateDef();
                }
            });

            var so = document.getElementById("stateOverlay");
            if (so) {
                so.addEventListener("click", function() {
                    closeStateDef();
                });
            }

            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape") closeStateDef();
            });
        })();

        var obsCards = document.querySelectorAll(".obs-card");
        var obsIdx = 0,
            obsScore = 0,
            OBS_TOTAL = 5;

        function obsAnswer(yes) {
            if (obsIdx >= OBS_TOTAL) return;
            if (yes) obsScore++;
            var current = obsCards[obsIdx];
            setTimeout(function() {
                current.classList.remove("obs-active", "obs-exit-left", "obs-exit-right", "obs-enter");
                current.style.opacity = "0";
                current.style.transform = "";
                current.style.transition = "";
                obsIdx++;
                updateObsProgress();
                if (obsIdx < OBS_TOTAL) {
                    var next = obsCards[obsIdx];
                    next.style.opacity = "1";
                    next.classList.add("obs-active", "obs-enter");
                    setTimeout(function() {
                        next.classList.remove("obs-enter");
                    }, 320);
                } else {
                    var stack = document.getElementById("obsStack");
                    if (stack) stack.classList.add("done");
                    showObsSummary();
                }
            }, 340);
        }

        function updateObsProgress() {
            document.getElementById("obsProgress").style.width = Math.round((obsIdx / OBS_TOTAL) * 100) + "%";
        }

        function showObsSummary() {
            var d = OBS_DATA[obsScore] || OBS_DATA[OBS_DATA.length - 1];
            var panel = document.getElementById("obsResultPanel"),
                numEl = document.getElementById("obsResultNum");
            numEl.textContent = obsScore;
            numEl.className = "obs-result-num " + d.cls;
            document.getElementById("obsResultTitle").textContent = d.title;
            document.getElementById("obsResultText").textContent = d.text;
            var cl = document.getElementById("obsCrossLink");
            if (cl) {
                if (d.crossLink) {
                    cl.textContent = d.crossLink.label;
                    cl.href = d.crossLink.url;
                    cl.classList.add("visible");
                } else {
                    cl.classList.remove("visible");
                }
            }
            var cta = document.getElementById("obsCtaGestes");
            if (cta._ctaHandler) cta.removeEventListener("click", cta._ctaHandler);
            var handler;
            if (obsScore === 0) {
                cta.textContent = "Faire le test complet →";
                handler = function() {
                    window.location.href = "/echelle-foebe/";
                };
            } else if (obsScore <= 3) {
                cta.textContent = "Voir les gestes pour cette zone →";
                handler = scrollToGestes;
            } else {
                cta.textContent = "Découvrir l'accompagnement →";
                handler = function() {
                    var ac = document.querySelector(".accomp-section");
                    if (ac) ac.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                };
            }
            cta._ctaHandler = handler;
            cta.addEventListener("click", handler);
            panel.classList.add("visible");
            var hint = document.querySelector(".obs-swipe-hint");
            if (hint) hint.style.display = "none";
            setTimeout(function() {
                panel.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }, 200);
        }

        function scrollToGestes() {
            document.getElementById("gestesSection").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        function btnTrigger(yes) {
            if (obsIdx >= OBS_TOTAL) return;
            var c = document.querySelector(".obs-card.obs-active");
            if (!c) return;
            var lbl = c.querySelector(yes ? ".obs-swipe-label.label-yes" : ".obs-swipe-label.label-no");
            if (lbl) lbl.style.opacity = 1;
            c.style.transition = "transform 0.28s ease,opacity 0.24s ease";
            c.style.transform = yes ? "translateX(120%) rotate(18deg)" : "translateX(-120%) rotate(-18deg)";
            c.style.opacity = "0";
            setTimeout(function() {
                obsAnswer(yes);
            }, 50);
        }

        function obsReset() {
            obsIdx = 0;
            obsScore = 0;
            document.getElementById("obsResultPanel").classList.remove("visible");
            var cl = document.getElementById("obsCrossLink");
            if (cl) cl.classList.remove("visible");
            var stack = document.getElementById("obsStack");
            if (stack) stack.classList.remove("done");
            document.getElementById("obsProgress").style.width = "0%";
            obsCards = document.querySelectorAll(".obs-card");
            obsCards.forEach(function(c, i) {
                c.classList.remove("obs-active", "obs-exit-left", "obs-exit-right", "obs-enter");
                c.style.opacity = "";
                c.style.transform = "";
                c.style.transition = "";
                if (i === 0) c.classList.add("obs-active");
                else c.style.opacity = "0";
            });
            var hint = document.querySelector(".obs-swipe-hint");
            if (hint) hint.style.display = "";
        }
        (function() {
            var stack = document.getElementById("obsStack");
            if (!stack) return;
            var startX = 0,
                startY = 0,
                curX = 0,
                dragging = false,
                decided = false,
                THRESHOLD = 65;

            function getCard() {
                return stack.querySelector(".obs-card.obs-active");
            }

            function setLabels(card, dx) {
                var no = card.querySelector(".obs-swipe-label.label-no"),
                    yes = card.querySelector(".obs-swipe-label.label-yes");
                if (!no || !yes) return;
                var r = Math.min(1, Math.abs(dx) / 70);
                if (dx < -20) {
                    no.style.opacity = r;
                    yes.style.opacity = 0;
                } else if (dx > 20) {
                    yes.style.opacity = r;
                    no.style.opacity = 0;
                } else {
                    no.style.opacity = 0;
                    yes.style.opacity = 0;
                }
            }

            function resetCard(card) {
                card.style.transition = "transform 0.3s cubic-bezier(.34,1.56,.64,1)";
                card.style.transform = "";
                var no = card.querySelector(".obs-swipe-label.label-no"),
                    yes = card.querySelector(".obs-swipe-label.label-yes");
                if (no) no.style.opacity = 0;
                if (yes) yes.style.opacity = 0;
            }

            function doSwipe(right) {
                if (obsIdx >= OBS_TOTAL || decided) return;
                decided = true;
                var card = getCard();
                if (!card) return;
                var lbl = card.querySelector(right ? ".obs-swipe-label.label-yes" : ".obs-swipe-label.label-no");
                if (lbl) lbl.style.opacity = 1;
                card.style.transition = "transform 0.32s ease,opacity 0.28s ease";
                card.style.transform = right ? "translateX(120%) rotate(18deg)" : "translateX(-120%) rotate(-18deg)";
                card.style.opacity = "0";
                setTimeout(function() {
                    right ? obsAnswer(true) : obsAnswer(false);
                }, 50);
            }
            stack.addEventListener("touchstart", function(e) {
                if (obsIdx >= OBS_TOTAL) return;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                curX = 0;
                dragging = true;
                decided = false;
                var c = getCard();
                if (c) c.style.transition = "none";
            }, {
                passive: true
            });
            stack.addEventListener("touchmove", function(e) {
                if (!dragging || decided) return;
                var dx = e.touches[0].clientX - startX,
                    dy = e.touches[0].clientY - startY;
                if (Math.abs(dy) > Math.abs(dx) + 8) {
                    dragging = false;
                    var c = getCard();
                    if (c) resetCard(c);
                    return;
                }
                e.preventDefault();
                curX = dx;
                var c = getCard();
                if (!c) return;
                c.style.transform = "translateX(" + dx + "px) rotate(" + (dx * 0.07) + "deg)";
                setLabels(c, dx);
            }, {
                passive: false
            });
            stack.addEventListener("touchend", function() {
                if (!dragging) return;
                dragging = false;
                if (obsIdx >= OBS_TOTAL) return;
                var c = getCard();
                if (!c) return;
                if (curX > THRESHOLD) doSwipe(true);
                else if (curX < -THRESHOLD) doSwipe(false);
                else resetCard(c);
            }, {
                passive: true
            });
            var md = false,
                mc = 0;
            stack.addEventListener("mousedown", function(e) {
                if (obsIdx >= OBS_TOTAL) return;
                startX = e.clientX;
                md = true;
                mc = 0;
                decided = false;
                var c = getCard();
                if (c) {
                    c.style.transition = "none";
                    c.style.cursor = "grabbing";
                }
            });
            document.addEventListener("mousemove", function(e) {
                if (!md) return;
                mc = e.clientX - startX;
                var c = getCard();
                if (!c) return;
                c.style.transform = "translateX(" + mc + "px) rotate(" + (mc * 0.07) + "deg)";
                setLabels(c, mc);
            });
            document.addEventListener("mouseup", function() {
                if (!md) return;
                md = false;
                var c = getCard();
                if (c) c.style.cursor = "grab";
                if (obsIdx >= OBS_TOTAL) return;
                if (mc > THRESHOLD) doSwipe(true);
                else if (mc < -THRESHOLD) doSwipe(false);
                else if (c) resetCard(c);
            });
        })();
        (function() {
            var cards = document.querySelectorAll(".geste-card");
            if (!cards.length) return;
            if (!("IntersectionObserver" in window)) {
                cards.forEach(function(card) { card.classList.add("visible"); });
                return;
            }
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) e.target.classList.add("visible");
                });
            }, {
                threshold: 0.15
            });
            cards.forEach(function(c) {
                obs.observe(c);
            });
        })();
        (function() {
            var items = document.querySelectorAll(".impact-item");
            if (!items.length) return;
            if (!("IntersectionObserver" in window)) {
                items.forEach(function(item) { item.classList.add("lit"); });
                return;
            }
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    var idx = parseInt(e.target.getAttribute("data-impact") || "0");
                    if (e.isIntersecting) {
                        items.forEach(function(it) {
                            var ci = parseInt(it.getAttribute("data-impact") || "0");
                            if (ci <= idx) {
                                var delay = ci * 90;
                                setTimeout(function() {
                                    it.classList.add("lit");
                                }, delay);
                            }
                        });
                    } else {
                        var rect = e.boundingClientRect;
                        if (rect.top > 0) {
                            items.forEach(function(it) {
                                var ci = parseInt(it.getAttribute("data-impact") || "0");
                                if (ci >= idx) it.classList.remove("lit");
                            });
                        }
                    }
                });
            }, {
                threshold: 0.2
            });
            items.forEach(function(el) {
                obs.observe(el);
            });
        })();
        (function() {
            var form = document.getElementById('waitlistForm'),
                confirm = document.getElementById('emailConfirm'),
                wrap = document.getElementById('emailFormWrap'),
                errEl = document.getElementById('emailError'),
                input = document.getElementById('emailInput'),
                submitBtn = document.getElementById('emailSubmitBtn');
            if (!form) return;
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var email = (input ? input.value : '').trim();
                if (!email || !email.includes('@') || !email.includes('.')) {
                    if (input) input.classList.add('error');
                    if (errEl) errEl.textContent = 'Adresse email invalide.';
                    return;
                }
                if (input) input.classList.remove('error');
                if (errEl) errEl.textContent = '';
                if (!window.fetch) {
                    form.submit();
                    return;
                }
                if (submitBtn) {
                    submitBtn.textContent = 'Envoi…';
                    submitBtn.disabled = true;
                }
                fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(function(res) {
                        if (res.ok) {
                            if (wrap) wrap.style.display = 'none';
                            if (confirm) confirm.classList.add('visible');
                        } else return res.json().then(function(d) {
                            throw new Error(d.error || 'Erreur réseau');
                        });
                    })
                    .catch(function() {
                        if (submitBtn) {
                            submitBtn.textContent = 'Me tenir au courant →';
                            submitBtn.disabled = false;
                        }
                        if (errEl) errEl.textContent = 'Une erreur est survenue. Réessaie dans un moment.';
                    });
            });
            if (input) input.addEventListener('input', function() {
                input.classList.remove('error');
                if (errEl) errEl.textContent = '';
            });
        })();

        (function() {
            var bar = document.getElementById('obsButtonsBar');
            if (bar) bar.addEventListener('click', function(e) {
                var btn = e.target.closest('[data-answer]');
                if (btn) btnTrigger(btn.getAttribute('data-answer') === 'true');
            });
            var stack = document.getElementById('obsStack');
            if (stack) {
                var observer = new MutationObserver(function() {
                    if (stack.classList.contains('done') && bar) bar.style.display = 'none';
                });
                observer.observe(stack, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
            var resetBtn = document.getElementById('obsResetBtn');
            if (resetBtn) resetBtn.addEventListener('click', function() {
                if (bar) bar.style.display = '';
                obsReset();
            });
        })();