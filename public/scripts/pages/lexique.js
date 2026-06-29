"use strict";

/* ══ DONNÉES ════════════════════════════════════════════════ */
var STORIES = [
  {
    emoji: '🔥', label: 'Définition',
    title: 'High-Functioning<br><em>Burnout</em>',
    def: "État d'épuisement profond où la personne continue de fonctionner voire de performer, tout en s'effondrant intérieurement.",
    truth: '<strong>À quoi ça ressemble :</strong> tu coches les cases, tu donnes, tu souris. Mais à l\'intérieur, plus rien ne se recharge. Tu fonctionnes sur les réserves. Et tu ne sais même plus depuis combien de temps.',
    tag: '#selfcare',
    bg: 'linear-gradient(160deg, #3A1A0F 0%, #2C1208 40%, #1a0a04 100%)',
    orb: 'rgba(187,126,96,0.18)', orbPos: 'top:-120px;right:-80px;width:320px;height:320px;'
  },
  {
    emoji: '😶', label: 'Définition',
    title: "L'<em>engourdissement</em><br>émotionnel",
    def: "Mécanisme de protection où les émotions sont mises en veille pour permettre de continuer à fonctionner sans s'effondrer.",
    truth: '<strong>À quoi ça ressemble :</strong> tu ne pleures plus vraiment. Tu ne ris plus vraiment. Tu regardes ta vie de loin, comme derrière une vitre. Tu fonctionnes. Mais tu n\'es plus vraiment là.',
    tag: '#emotions',
    bg: 'linear-gradient(160deg, #1E1028 0%, #140B20 40%, #0c0714 100%)',
    orb: 'rgba(196,82,121,0.16)', orbPos: 'top:-80px;left:-80px;width:300px;height:300px;'
  },
  {
    emoji: '⚡', label: 'Définition',
    title: 'La <em>dette</em><br>de sommeil<br>chronique',
    def: "Accumulation d'un déficit de sommeil réparateur qui ne se comble pas avec quelques nuits correctes.",
    truth: '<strong>À quoi ça ressemble :</strong> tu dors, mais tu te réveilles épuisé·e. Tu as besoin d\'un café pour te sentir fonctionner correctement et démarrer ta journée. Ton corps récupère en surface, mais rarement en profondeur.',
    tag: '#repos',
    bg: 'linear-gradient(160deg, #0F1E12 0%, #091408 40%, #050d04 100%)',
    orb: 'rgba(107,175,128,0.16)', orbPos: 'bottom:-60px;right:-40px;width:280px;height:280px;'
  },
  {
    emoji: '🎭', label: 'Définition',
    title: 'Le <em>masque</em><br>de compétence',
    def: "Masque de contrôle et de performance maintenu pour les autres et pour soi-même, qui dissimule un épuisement réel.",
    truth: '<strong>À quoi ça ressemble :</strong> tout le monde te dit que tu gères, mais tu sais que derrière, tu t\'accroches à un fil. Et tu n\'oses pas le montrer, parce que tu ne sais plus qui tu es sans le masque.',
    tag: '#identite',
    bg: 'linear-gradient(160deg, #200E0E 0%, #160808 40%, #0e0404 100%)',
    orb: 'rgba(195,66,52,0.14)', orbPos: 'top:-100px;right:-60px;width:340px;height:340px;'
  },
  {
    emoji: '🌊', label: 'Définition',
    title: 'La <em>fatigue</em><br>de compassion',
    def: "Épuisement progressif lié au fait de donner aux autres : émotionnellement, énergétiquement, etc. Et ce, sans se remplir soi-même.",
    truth: '<strong>À quoi ça ressemble :</strong> tu t\'occupes des autres par automatisme. Mais un jour tu réalises que tu n\'as plus rien à donner et tu culpabilises d\'avoir cette pensée. La culpabilité est le signal.',
    tag: '#relations',
    bg: 'linear-gradient(160deg, #0C1520 0%, #080F18 40%, #040a10 100%)',
    orb: 'rgba(122,169,255,0.12)', orbPos: 'bottom:-60px;left:-40px;width:300px;height:300px;'
  },
  {
    emoji: '🧠', label: 'Définition',
    title: 'La <em>surcharge</em><br>cognitive',
    def: "État où l'espace mental est saturé par les listes, les inquiétudes et la planification rendant impossible un vrai moment de détente.",
    truth: '<strong>À quoi ça ressemble :</strong> même dans le bain, même dans le lit, ton cerveau tourne. Tu fais des to-do lists mentales à 23h. Tu ne peux pas "juste regarder un film." Ton repos est pollué.',
    tag: '#mental',
    bg: 'linear-gradient(160deg, #1E1A0A 0%, #141205 40%, #0c0e02 100%)',
    orb: 'rgba(187,126,96,0.14)', orbPos: 'top:-80px;left:-60px;width:310px;height:310px;'
  },
  {
    emoji: '🪞', label: 'Définition',
    title: 'La <em>valeur</em><br>conditionnelle',
    def: "Croyance profonde que sa valeur dépend de ce qu'on produit, accomplit ou offre aux autres, jamais de ce qu'on est.",
    truth: '<strong>À quoi ça ressemble :</strong> une journée sans produire, et tu te sens inutile. Tu mesures ta journée à ce que tu as coché. Tu t\'excuses d\'exister quand tu ne donnes pas.',
    tag: '#performance',
    bg: 'linear-gradient(160deg, #0E1E1A 0%, #081514 40%, #030e0c 100%)',
    orb: 'rgba(107,175,128,0.12)', orbPos: 'bottom:-40px;right:-30px;width:270px;height:270px;'
  },
  {
    emoji: '🌀', label: 'Définition',
    title: 'Le <em>repos</em><br>coupable',
    def: "Incapacité à se reposer sans ressentir de la culpabilité ou de l'inconfort, comme si le repos devait se mériter.",
    truth: '<strong>À quoi ça ressemble :</strong> tu prends une pause et tu penses à ce que tu "devrais" faire. Tu te reposes seulement quand tu es à bout de force. Le repos conditionnel n\'est pas du repos ! C\'est du sursis.',
    tag: '#repos',
    bg: 'linear-gradient(160deg, #1E0A1A 0%, #160712 40%, #0e040c 100%)',
    orb: 'rgba(196,82,121,0.12)', orbPos: 'top:-70px;right:-50px;width:310px;height:310px;'
  },
  {
    emoji: '🧭', label: 'Définition',
    title: 'La <em>dérive</em><br>de valeurs',
    def: "Glissement progressif où l'on vit selon les attentes des autres plutôt que selon ce qui compte vraiment pour soi.",
    truth: '<strong>À quoi ça ressemble :</strong> tu réussis, mais tu ne sais plus pourquoi. Tu avances, mais tu ne sais plus vers quoi. Parfois tu te demandes si ta vie est vraiment la tienne.',
    tag: '#sens',
    bg: 'linear-gradient(160deg, #181E0A 0%, #101504 40%, #0a0f02 100%)',
    orb: 'rgba(187,126,96,0.11)', orbPos: 'bottom:-60px;left:-40px;width:290px;height:290px;'
  },
  {
    emoji: '🌿', label: 'Définition',
    title: 'Le <em>self-care</em><br>structuré',
    def: "Pratique intentionnelle et régulière de prendre soin de soi, non pas comme récompense ou dernier recours, mais comme fondation.",
    truth: '<strong>À quoi ça ressemble :</strong> On ne parle pas des bains moussants, ni de wellness Instagram. Il s\'agit ici de s\'écouter avant d\'être à bout. Connaître ses signaux internes. Se remettre au centre parce que tu ne peux pas donner ce que tu n\'as pas.',
    tag: '#foebe',
    bg: 'linear-gradient(160deg, #0A0A1E 0%, #060612 40%, #030308 100%)',
    orb: 'rgba(187,126,96,0.18)', orbPos: 'top:-100px;right:-80px;width:360px;height:360px;'
  }
];

var DURATION = 8000;
var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══ ÉTAT ════════════════════════════════════════════════════ */
var current = 0;
var isPaused = false;
var touchStartX = 0, touchStartY = 0;
var progStart = null, progPausedAt = null, progElapsed = 0;
var rafId = null;

/* ══ ÉLÉMENTS ════════════════════════════════════════════════ */
var bg      = document.getElementById('storyBg');
var orb     = document.getElementById('storyOrb');
var endScr  = document.getElementById('endScreen');
var progBars= document.getElementById('progressBars');

/* ── Éléments animés ──────────────────────────────────────── */
var elEmoji  = document.getElementById('storyEmoji');
var elLabel  = document.getElementById('storyLabel');
var elTitle  = document.getElementById('storyTitle');
var elDef    = document.getElementById('storyDef');
var elTruth  = document.getElementById('storyTruth');
var elTag    = document.getElementById('storyTag');
var animEls  = document.querySelectorAll('.story-animated');

/* ══ INIT BARRES ═════════════════════════════════════════════ */
function buildBars(){
  progBars.innerHTML = '';
  STORIES.forEach(function(_, i){
    var b = document.createElement('div');
    b.className = 'prog-bar'; b.id = 'bar' + i;
    var f = document.createElement('div');
    f.className = 'prog-bar-fill'; f.id = 'fill' + i;
    b.appendChild(f); progBars.appendChild(b);
  });
}

/* ══ ANIMATION CONTENU — sans saut ══════════════════════════
   1. Masque instantanément les éléments (sans transition)
   2. Met à jour le texte
   3. Lance la transition visible sur le prochain frame
   Résultat : zéro saut, fondu enchaîné propre.              */
function hideElements(){
  animEls.forEach(function(el){
    el.style.transition = 'none';
    el.classList.remove('visible');
  });
}
function showElements(){
  /* RAF double : nécessaire pour que le navigateur prenne en compte
     le retrait de la classe AVANT d'ajouter transition + visible   */
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      animEls.forEach(function(el){
        el.style.transition = '';  /* remet la transition CSS */
        el.classList.add('visible');
      });
    });
  });
}

/* ══ RENDU DU FOND ═══════════════════════════════════════════ */
function renderStoryBg(idx){
  var s = STORIES[idx];
  bg.style.background = s.bg;
  /* Orbe */
  orb.style.cssText = s.orbPos;
  orb.style.background  = s.orb;
  orb.style.position    = 'absolute';
  orb.style.borderRadius= '50%';
  orb.style.filter      = 'blur(90px)';
  orb.style.zIndex      = '1';
  orb.style.pointerEvents = 'none';
  /* Fond viewer (zone hors wrap sur desktop) */
  var isDark = STORIES[idx].bg.includes('0a') || true;
  document.getElementById('viewer').style.transition = 'background .5s';
}

/* ══ GO TO STORY ═════════════════════════════════════════════ */
function goToStory(idx){
  if(idx >= STORIES.length){ showEnd(); return; }
  if(idx < 0) idx = 0;

  stopProgress();
  endScr.classList.remove('on');
  current = idx;
  var s = STORIES[idx];

  /* 1 — masque les éléments texte IMMÉDIATEMENT */
  hideElements();

  /* 2 — fond + orbe (transition CSS sur #storyBg : .55s) */
  renderStoryBg(idx);

  /* 3 — mise à jour du texte (invisible à ce stade) */
  elEmoji.textContent  = s.emoji;
  elLabel.textContent  = s.label;
  elTitle.innerHTML    = s.title;
  elDef.textContent    = s.def;
  elTruth.innerHTML    = s.truth;
  elTag.textContent    = s.tag;

  /* 4 — barres */
  STORIES.forEach(function(_, i){
    var bar  = document.getElementById('bar'  + i);
    var fill = document.getElementById('fill' + i);
    if(!bar || !fill) return;
    bar.className = 'prog-bar' + (i < idx ? ' done' : '');
    fill.style.width = i < idx ? '100%' : '0%';
  });

  /* 5 — apparition fluide du texte (légèrement décalée pour
     que le fond ait commencé sa transition)                  */
  setTimeout(showElements, 60);

  /* 6 — lance la progression, sauf si l’utilisateur préfère réduire le mouvement */
  if(prefersReducedMotion){
    isPaused = true;
    progPausedAt = 0;
  } else {
    startProgress(0);
  }
}

function nextStory(){ if(current < STORIES.length - 1) goToStory(current + 1); else showEnd(); }
function prevStory(){ goToStory(Math.max(0, current - 1)); }

function showEnd(){
  stopProgress();
  STORIES.forEach(function(_, i){
    var fill = document.getElementById('fill' + i);
    if(fill) fill.style.width = '100%';
  });
  endScr.classList.add('on');
}

/* ══ PROGRESSION RAF ═════════════════════════════════════════ */
function stopProgress(){
  if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
}
function startProgress(elapsed){
  stopProgress();
  progElapsed = elapsed || 0;
  progStart   = performance.now() - progElapsed;
  isPaused    = false;
  var fill = document.getElementById('fill' + current);
  if(!fill) return;
  function tick(now){
    if(isPaused) return;
    var e   = now - progStart;
    var pct = Math.min(100, (e / DURATION) * 100);
    fill.style.width = pct + '%';
    if(pct < 100) rafId = requestAnimationFrame(tick);
    else { rafId = null; nextStory(); }
  }
  rafId = requestAnimationFrame(tick);
}
function pauseProgress(){
  if(isPaused) return;
  isPaused = true;
  if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
  progPausedAt = performance.now() - progStart;
}
function resumeProgress(){
  if(!isPaused) return;
  startProgress(progPausedAt);
}

/* ══ TOUCH / SWIPE / APPUI MAINTENU ═════════════════════════
   Mobile : appui long = pause temporaire, relâcher = reprise.
   Desktop : clic maintenu souris = même comportement.
   Un appui long ne déclenche jamais l'avancement de story au relâchement. */
var wrap      = document.getElementById('storyWrap');
var tapLeft   = document.getElementById('tapLeft');
var tapRight  = document.getElementById('tapRight');
var holdTimer = null;
var holdPaused = false;
var suppressNextTap = false;

function clearHoldTimer(){
  if(holdTimer){
    clearTimeout(holdTimer);
    holdTimer = null;
  }
}

function startHoldPause(){
  clearHoldTimer();
  holdPaused = false;
  holdTimer = setTimeout(function(){
    holdPaused = true;
    pauseProgress();
  }, 180);
}

function endHoldPause(){
  clearHoldTimer();
  if(holdPaused){
    holdPaused = false;
    suppressNextTap = true;
    resumeProgress();
    setTimeout(function(){ suppressNextTap = false; }, 0);
    return true;
  }
  return false;
}

wrap.addEventListener('touchstart', function(e){
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  startHoldPause();
}, {passive:true});

wrap.addEventListener('touchend', function(e){
  if(endHoldPause()) return;
  var dx = e.changedTouches[0].clientX - touchStartX;
  var dy = e.changedTouches[0].clientY - touchStartY;
  if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){
    dx < 0 ? nextStory() : prevStory(); return;
  }
  var x = e.changedTouches[0].clientX;
  x < window.innerWidth * 0.35 ? prevStory() : nextStory();
}, {passive:true});

wrap.addEventListener('touchcancel', function(){
  endHoldPause();
}, {passive:true});

/* Desktop : clic maintenu pour lire, comme l'appui long mobile. */
[tapLeft, tapRight].forEach(function(zone){
  if(!zone) return;

  zone.addEventListener('mousedown', function(e){
    if(e.button !== 0) return;
    startHoldPause();
  });

  zone.addEventListener('mouseup', function(){
    endHoldPause();
  });

  zone.addEventListener('mouseleave', function(){
    if(holdPaused) endHoldPause();
    else clearHoldTimer();
  });

  zone.addEventListener('click', function(e){
    if(suppressNextTap){
      e.preventDefault();
      e.stopPropagation();
      suppressNextTap = false;
      return;
    }
    zone === tapLeft ? prevStory() : nextStory();
  });
});

document.addEventListener('mouseup', function(){
  if(holdPaused) endHoldPause();
  else clearHoldTimer();
});

document.getElementById('arrowLeft').addEventListener('click', prevStory);
document.getElementById('arrowRight').addEventListener('click', nextStory);
document.querySelectorAll('[data-restart-story]').forEach(function(btn){ btn.addEventListener('click', function(){ goToStory(0); }); });

/* ══ ZONE DE RÉVEIL NAV ══════════════════════════════════════
   Le Shell (foebe-shell.js) masque #mainNav après une courte
   inactivité et le réaffiche au moindre tap dans les 64px du
   haut de l'écran. #navWakeZone occupe cette bande en exclusivité :
   un tap ici ne doit JAMAIS avancer/reculer une story, seulement
   réveiller la navigation et mettre la lecture en pause le temps
   qu'elle reste visible. Le Shell se charge lui-même d'afficher
   #mainNav ; on n'a rien à dupliquer ici. */
(function(){
  var navWakeZone = document.getElementById('navWakeZone');
  if(!navWakeZone) return;
  var wakeHideTimer = null;

  function pauseForNavWake(){
    pauseProgress();
    if(wakeHideTimer) clearTimeout(wakeHideTimer);
    wakeHideTimer = setTimeout(function(){
      resumeProgress();
    }, 1800);
  }

  navWakeZone.addEventListener('touchstart', pauseForNavWake, {passive:true});
  navWakeZone.addEventListener('mousedown', pauseForNavWake);
})();


/* V27 — correction minimale PC 15 pouces : conserver les zones clic existantes,
   mais laisser la molette/trackpad faire défiler le texte quand il déborde.
   On ne déplace pas les flèches, on ne désactive pas les zones tap, on ne touche pas au mobile. */
(function(){
  var storyBody = document.getElementById('storyBody');
  if(!storyBody || !wrap) return;

  function isDesktopLike(){
    return window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  }
  function canScrollStoryBody(deltaY){
    if(!storyBody) return false;
    var maxScroll = storyBody.scrollHeight - storyBody.clientHeight;
    if(maxScroll <= 1) return false;
    if(deltaY > 0 && storyBody.scrollTop >= maxScroll - 1) return false;
    if(deltaY < 0 && storyBody.scrollTop <= 1) return false;
    return true;
  }
  function forwardWheelToStoryBody(e){
    if(!isDesktopLike()) return;
    if(!canScrollStoryBody(e.deltaY)) return;
    storyBody.scrollTop += e.deltaY;
    e.preventDefault();
    e.stopPropagation();
  }

  [wrap, tapLeft, tapRight].forEach(function(el){
    if(!el) return;
    el.addEventListener('wheel', forwardWheelToStoryBody, {passive:false});
  });
})();

/* ══ KEYBOARD ════════════════════════════════════════════════ */
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight' || e.key === ' '){ e.preventDefault(); nextStory(); }
  if(e.key === 'ArrowLeft') { e.preventDefault(); prevStory(); }
  if(e.key === 'Escape')    { window.location.href = '/'; }
});

/* ══ GARDE-FOU FALLBACK NAV IMMERSIVE ═══════════════════════
   Si le Shell ne charge pas et que la fallback nav reste visible,
   on décale le contenu story pour éviter qu'elle mange les barres. */
function checkFallbackNavVisibility(){
  var fallbackNav = document.getElementById('fallbackNav');
  if(!fallbackNav) return;
  var cs = window.getComputedStyle(fallbackNav);
  var visible = cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity || '1') > 0;
  document.body.classList.toggle('fallback-nav-visible', visible);
}
window.addEventListener('load', function(){
  setTimeout(checkFallbackNavVisibility, 180);
});
window.addEventListener('foebe:shell-failed', function(){
  setTimeout(checkFallbackNavVisibility, 20);
});

/* ══ DÉMARRAGE ═══════════════════════════════════════════════
   Sur mobile, le Shell laisse la nav visible ~2.2s au premier
   chargement (teaser de découverte). On met la barre de progression
   en pause le temps de ce teaser pour ne pas faire défiler la
   première story sous une nav que la personne est en train de
   regarder. Sur desktop, la nav reste toujours visible : pas de pause. */
buildBars();
goToStory(0);

(function(){
  var isMobileLike = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
  if(!isMobileLike) return;
  pauseProgress();
  window.setTimeout(function(){
    resumeProgress();
  }, 2200);
})();
