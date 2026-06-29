(function(){
'use strict';
const scenarios = [
  {
    "id": 0,
    "person": "Maya",
    "age": "34 ans",
    "city": "Lyon",
    "level": "Scène 01",
    "text": "J’avais prévu un dimanche pour prendre soin de moi. J’ai tout noté : rangement, masque, repas, yoga, lessive. Le soir, tout était fait, mais j’étais quand même tendue et déçue. J’avais l’impression d’avoir encore raté quelque chose.",
    "dominant": "Mental",
    "secondary": "Corps",
    "visible": "Corps",
    "zones": [
      "Mental",
      "Corps",
      "Énergie",
      "Sens"
    ],
    "signals": [
      "La pression de réussir le soin",
      "La fatigue corporelle",
      "Le manque de plaisir",
      "Le besoin de mieux s’organiser"
    ],
    "correctSignal": "La pression de réussir le soin",
    "skill": "Reconnaître quand le soin devient une performance.",
    "reading": "On voit d’abord le corps : masque, yoga, repas, rangement. Mais ce qui pèse le plus, ici, c’est le mental. L’indice principal, c’est la pression de réussir le soin. Maya ne se repose pas vraiment : elle transforme le self-care en chose à réussir.",
    "good": "Tu as repéré quelque chose d’important : un geste de soin peut devenir une charge quand il faut le réussir.",
    "refine": "Ton choix se comprend, car plusieurs zones apparaissent. Ici, ce qui organise la scène, c’est surtout la pression autour du soin."
  },
  {
    "id": 1,
    "person": "Sarah",
    "age": "29 ans",
    "city": "Marseille",
    "level": "Scène 02",
    "text": "Depuis quelques semaines, je dors plus que d’habitude, mais je me réveille quand même très fatiguée. Je repousse les tâches simples, j’annule des sorties, et je me dis que c’est ma faute, que je manque de discipline. J’arrive même pas à répondre à un message, tellement ça me demande d’effort.",
    "dominant": "Énergie",
    "secondary": "Mental",
    "visible": "Mental",
    "zones": [
      "Énergie",
      "Mental",
      "Corps",
      "Sens"
    ],
    "signals": [
      "Les choses simples demandent trop d’effort.",
      "Le manque de volonté",
      "Le besoin de dormir davantage",
      "L’envie d’être seule"
    ],
    "correctSignal": "Les choses simples demandent trop d’effort.",
    "skill": "Différencier motivation et ressources disponibles.",
    "reading": "Au premier regard, on peut penser au mental, parce que Sarah se juge et parle de discipline. Mais ce qui pèse le plus, ici, c’est l'énergie. Le plus parlant, c’est que répondre, sortir ou commencer une tâche lui demande beaucoup plus qu’avant.",
    "good": "Tu as repéré quelque chose d’important : ce n’est pas une question de volonté, mais bien de ressources qui ne suivent plus.",
    "refine": "Ton choix se comprend, mais la scène ne parle pas de volonté ou d’organisation. Elle montre surtout que les choses simples demandent trop d’effort."
  },
  {
    "id": 2,
    "person": "Noam",
    "age": "38 ans",
    "city": "Lille",
    "level": "Scène 03",
    "text": "Je sais que quelque chose ne va pas quand je recommence à oublier de boire, que je mange n’importe comment et que je repousse les soins basiques, genre me raser la barbe, me faire couper les cheveux, me brosser les dents. C’est comme si mon corps passait en dernier, même quand je sais qu’il a besoin d’attention.",
    "dominant": "Corps",
    "secondary": "Énergie",
    "visible": "Énergie",
    "zones": [
      "Corps",
      "Énergie",
      "Mental",
      "Environnement"
    ],
    "signals": [
      "Les besoins corporels simples passent en dernier",
      "Le manque de rangement",
      "Le fait de penser trop souvent",
      "Le besoin d’être plus productif"
    ],
    "correctSignal": "Les besoins corporels simples passent en dernier",
    "skill": "Reconnaître les signaux corporels ordinaires",
    "reading": "Ce qui pèse le plus est le Corps. L’indice clé est simple : les besoins corporels de base passent en dernier. C’est un signe concret d’une déconnexion à soi.",
    "good": "Tu as reconnu que le corps ne parle pas seulement par des signaux forts. Il parle aussi par ce qui est négligé ou repoussé.",
    "refine": "Ton choix peut avoir du sens, mais ici le cœur de la scène est concret : les besoins de base ne reçoivent plus assez d’attention."
  },
  {
    "id": 3,
    "person": "Inès",
    "age": "41 ans",
    "city": "Nantes",
    "level": "Scène 04",
    "text": "Je réponds vite, j’aide beaucoup, j’anticipe les besoins des autres. On me dit souvent que je suis fiable, qu'on peut compter sur moi. Par contre, quand moi j’ai besoin de soutien, eh bien je ne sais pas quoi demander, ni à qui. Du coup, je finis souvent seule avec ce que je traverse.",
    "dominant": "Relations",
    "secondary": "Émotions",
    "visible": "Émotions",
    "zones": [
      "Relations",
      "Émotions",
      "Énergie",
      "Mental"
    ],
    "signals": [
      "Le lien circule surtout dans un seul sens",
      "Elle manque d’organisation",
      "Elle devrait être plus positive",
      "Elle a seulement besoin de repos"
    ],
    "correctSignal": "Le lien circule surtout dans un seul sens",
    "skill": "Lire la circulation dans le lien",
    "reading": "Ce qui pèse le plus est Relations.  L’indice clé, c’est que le lien circule surtout dans un sens : Inès sait donner, anticiper et soutenir, mais elle ne sait pas toujours recevoir ni formuler son besoin.",
    "good": "Tu as repéré que la qualité d’un lien ne se mesure pas seulement à ce qu’on donne, mais aussi à ce qui peut être reçu.",
    "refine": "Ton choix peut se comprendre, car cette scène touche aussi l’émotion et l’énergie. Mais ce qui pèse le plus reste la place qu’elle prend dans le lien."
  },
  {
    "id": 4,
    "person": "Claire",
    "age": "45 ans",
    "city": "Bordeaux",
    "level": "Scène 05",
    "text": "Je pensais que j’étais juste irritable. Puis j’ai réalisé que je travaillais constamment au milieu du bruit, entre les notifications, le désordre et des demandes qui arrivent de partout. Même quand je veux me poser, il y a toujours quelque chose qui me sollicite.",
    "dominant": "Environnement",
    "secondary": "Mental",
    "visible": "Mental",
    "zones": [
      "Environnement",
      "Mental",
      "Émotions",
      "Énergie"
    ],
    "signals": [
      "Les sollicitations autour d’elle ne s’arrêtent jamais",
      "Elle ne sait pas gérer ses émotions",
      "Elle manque de sens",
      "Elle devrait mieux dormir"
    ],
    "correctSignal": "Les sollicitations autour d’elle ne s’arrêtent jamais",
    "skill": "Repérer l’impact de l'environnement sur l’état intérieur",
    "reading": "Au premier regard, on peut voir Mental, parce que Claire se sent irritable et dispersée. Mais ce qui pèse le plus est Environnement. L’indice principal c'est l'environnement : bruit, notifications, désordre, demandes visibles.",
    "good": "Tu as bien vu que l’environnement n’est pas un décor neutre. Il peut soutenir l'attention ou la fragmenter.",
    "refine": "Ton choix peut se défendre, mais la scène montre d’abord une surcharge venue de l'environnement. Le mental réagit à un environnement trop sollicitant."
  },
  {
    "id": 5,
    "person": "Abel",
    "age": "36 ans",
    "city": "Toulouse",
    "level": "Scène 06",
    "text": "Je dis souvent que ça va, parce que je ne sais même plus quoi répondre d’autre. Je ne pleure pas, je ne m’énerve pas vraiment, mais je sens que quelque chose est fermé et bloqué en moi. Comme si je suis spectateur de ma propre vie, avec une certaine distance que je n’arrive pas à expliquer.",
    "dominant": "Émotions",
    "secondary": "Sens",
    "visible": "Sens",
    "zones": [
      "Émotions",
      "Sens",
      "Mental",
      "Relations"
    ],
    "signals": [
      "Les ressentis deviennent difficiles à nommer",
      "Il devrait parler à plus de monde",
      "Il manque seulement de projet",
      "Il pense trop"
    ],
    "correctSignal": "Les ressentis deviennent difficiles à nommer",
    "skill": "Reconnaître une émotion peu lisible",
    "reading": "Ce qui pèse le plus est Émotions. L’indice clé est la difficulté à reconnaître un état émotionnel. La notion de Sens peut aussi devenir floue, car les émotions sont moins accessibles. Abel se sent à distance de ce qui donne du sens à ce qu’il vit.",
    "good": "Tu as repéré qu’une émotion n’est pas toujours bruyante. Parfois, le signal est justement qu’elle devient difficile à atteindre.",
    "refine": "Ton choix peut avoir du sens, mais ici le point central est la relation aux ressentis : ils sont présents, mais peu accessibles. Cela peut aussi toucher au Sens, car Abel semble à distance de ce qui donne une direction à sa vie."
  },
  {
    "id": 6,
    "person": "Tao",
    "age": "33 ans",
    "city": "Rennes",
    "level": "Scène 07",
    "text": "Je pense sincèrement que je fais ce qu’il faut. Je travaille, je fais du sport, je cuisine, je m'applique, j'ai de la discipline, je réponds aux demandes, je suis à l'écoute,  bref, je coche les cases. De l’extérieur, rien ne semble vraiment aller mal, d'ailleurs mes amis me le disent souvent, je suis : un modèle. Pourtant, j’ai souvent cette impression de traverser mes journées sans direction claire, comme si je m’éloignais doucement de ce qui compte vraiment pour moi.",
    "dominant": "Sens",
    "secondary": "Mental",
    "visible": "Mental",
    "zones": [
      "Sens",
      "Mental",
      "Énergie",
      "Relations"
    ],
    "signals": [
      "Il avance sans direction qui lui semble juste",
      "Il manque uniquement de repos",
      "Il devrait mieux organiser ses tâches",
      "Il ne voit pas assez ses proches"
    ],
    "correctSignal": "Il avance sans direction qui lui semble juste",
    "skill": "Distinguer fonctionnement correct et direction vivante",
    "reading": "Ce qui pèse le plus ici est Sens. Pour Tao, il y a un écart entre ce qu’il fait et ce qui lui donne encore une direction de vie.",
    "good": "Tu as repéré que tout peut sembler fonctionner en surface, alors que la direction intérieure devient floue.",
    "refine": "Ton choix peut se comprendre, mais la scène ne parle pas d’abord de fatigue ou d’organisation. Elle parle du lien entre ce que Tao fait et ce qui a du sens pour lui."
  },
  {
    "id": 7,
    "person": "Léa",
    "age": "32 ans",
    "city": "Toulouse",
    "level": "Scène 08",
    "text": "Le soir, je me dis que je vais enfin me reposer ! Je m’allonge avec mon téléphone et je me dis : “juste dix minutes”, je regarde des réels, des tutos, des vidéos drôles,  je scrolle, je réponds à des messages, j'écoute de la musique, puis je réalise que deux heures sont déjà passées. Et c'est la panique, je sais que je n’ai rien fait de grave, mais je me sens encore plus vide qu’avant, je sais que je manquerai de sommeil et que demain la journée sera difficile, car j'aurai du mal à me concentrer et à rester éveillée.",
    "dominant": "Énergie",
    "secondary": "Environnement",
    "visible": "Mental",
    "zones": [
      "Énergie",
      "Mental",
      "Environnement",
      "Émotions"
    ],
    "signals": [
      "Le repos ne la recharge pas",
      "Elle devrait mieux contrôler son temps",
      "Elle manque d’émotions fortes",
      "Elle a seulement besoin d’un meilleur téléphone"
    ],
    "correctSignal": "Le repos ne la recharge pas",
    "skill": "Distinguer repos réel et distraction qui épuise",
    "reading": "Au premier regard, on peut voir Mental ou Environnement, parce qu’il y a l’écran, les vidéos et les messages. Toutefois, ce qui pèse le plus est Énergie. L’indice clé, c’est que ce temps de pause ne repose pas vraiment : il occupe l’attention et fatigue au lieu de recharger.",
    "good": "Tu as repéré une nuance importante : tout ce qui coupe du quotidien ne recharge pas forcément.",
    "refine": "Ton choix peut se comprendre, car l’écran est très visible. Mais ici, ce qui compte, c’est l’effet produit : après cette pause, Léa a moins de marge pour son self-care et subit les conséquences."
  },
  {
    "id": 8,
    "person": "Camille",
    "age": "39 ans",
    "city": "Pau",
    "level": "Scène 09",
    "text": "J’aime mes proches et je veux être là pour eux. Mais avec certains d’entre eux, après certains appels, je me sens lourde, vidée, presque absente. Je ne sais pas vraiment si cette fatigue vient de moi, ni si c’est la conversation qui m’a rendue triste ou agacée. Mais une chose est sûre : mon corps se sent sans ressources. Je veux juste être là pour eux, alors je me dis que je devrais être plus patiente, et je réponds quand même.",
    "dominant": "Relations",
    "secondary": "Énergie",
    "visible": "Énergie",
    "zones": [
      "Relations",
      "Énergie",
      "Émotions",
      "Mental"
    ],
    "signals": [
      "Certains liens la vident plus qu’ils ne la nourrissent",
      "Elle manque uniquement de sommeil",
      "Elle doit apprendre à mieux argumenter",
      "Elle n’a pas assez d’activités agréables"
    ],
    "correctSignal": "Certains liens la vident plus qu’ils ne la nourrissent",
    "skill": "Reconnaître quand le lien coûte trop",
    "reading": "Au premier regard, on peut voir Énergie, parce que Camille se sent vidée. Mais ce qui pèse le plus est Relations. L’indice clé, c’est que certains liens lui coûtent plus qu’ils ne la nourrissent, tout en restant difficiles à refuser.",
    "good": "Tu as repéré que la fatigue peut parfois venir de la manière dont le lien circule, pas seulement d’un manque de repos.",
    "refine": "Ton choix peut se comprendre, car la fatigue est visible. Mais ici, la question centrale est relationnelle : pourquoi certaines présences prennent autant de place et d’énergie ?"
  },
  {
    "id": 9,
    "person": "Sofia",
    "age": "37 ans",
    "city": "Strasbourg",
    "level": "Scène 10",
    "text": "J’ai acheté des produits cosmétiques ce mois-ci, je suis motivée, j’ai même noté des routines ! J’ai aussi gardé des idées de repas sains et enregistré des exercices fitness et yoga. Mais voilà, ça fait des jours que j’ai fait tout ça et rien, toujours rien. Ma salle de bains, mon téléphone et mon carnet me rappellent sans cesse tout ce que je devrais faire, mais je n’y arrive pas. Je voulais créer un espace pour prendre soin de moi, mais j’ai l’impression d’avoir ajouté une liste de choses à faire en plus.",
    "dominant": "Environnement",
    "secondary": "Mental",
    "visible": "Mental",
    "zones": [
      "Environnement",
      "Mental",
      "Corps",
      "Sens"
    ],
    "signals": [
      "Son cadre lui renvoie trop de choses à faire",
      "Elle n’a pas choisi les bons produits",
      "Elle manque seulement de motivation",
      "Elle devrait trouver une mission plus claire"
    ],
    "correctSignal": "Son cadre lui renvoie trop de choses à faire",
    "skill": "Repérer quand le cadre ajoute de la charge",
    "reading": "Au premier regard, on peut voir Mental, parce que Sofia pense à tout ce qu’elle devrait faire. Mais ce qui pèse le plus est Environnement : les objets, notes et supports autour d’elle renvoient trop de demandes. Le cadre censé aider devient une charge visible.",
    "good": "Tu as repéré que l’environnement peut aussi saturer le self-care quand il multiplie les rappels et les attentes.",
    "refine": "Ton choix peut se comprendre si tu as vu la pression mentale. Ici, la nuance est que cette pression vient beaucoup de l’environnement : ce qui l’entoure lui rappelle sans cesse ce qu’elle n’a pas fait."
  }
];

const state = { current: 0, zoneChoice: null, signalChoice: null, completed: new Set() };
const $ = (id) => document.getElementById(id);

function renderTabs(){
  const list = $('scenarioList');
  list.innerHTML = '';
  scenarios.forEach((s, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scenario-tab' + (index === state.current ? ' active' : '') + (state.completed.has(index) ? ' done' : '');
    const doneLabel = state.completed.has(index) ? `<span class="tab-meta">${s.dominant}</span>` : '';
    btn.innerHTML = `<span class="tab-num">${String(index + 1).padStart(2,'0')}</span><div><span class="tab-label">${s.person}, ${s.age}</span>${doneLabel}</div>`;
    btn.addEventListener('click', () => loadScenario(index, { scroll: true }));
    list.appendChild(btn);
  });
}

function updateProgress(){
  const done = state.completed.size;
  $('progressText').textContent = `${done} sur ${scenarios.length}`;
  $('progressFill').style.width = `${(done / scenarios.length) * 100}%`;
  const mf = $('progressMobileFill'); if(mf) mf.style.width = `${(done / scenarios.length) * 100}%`;
  const mt = $('progressMobileText'); if(mt) mt.textContent = `${done} sur ${scenarios.length}`;
  if(done === scenarios.length){
    renderFinal();
    $('finalCard').classList.add('show');
  }
}

function loadScenario(index, opts = {}){
  state.current = index;
  state.zoneChoice = null;
  state.signalChoice = null;
  const s = scenarios[index];
  $('personMeta').innerHTML = `<strong>${s.person}, ${s.age}</strong>`;
  $('levelChip').textContent = ''; // volontairement vide : aucun indice avant la lecture
  $('scenarioText').textContent = `“${s.text}”`;
  $('qZone').className = 'question-block active';
  $('qSignal').className = 'question-block';
  $('feedback').className = 'feedback';
  $('feedback').innerHTML = '';
  $('resultPanel').classList.remove('show');
  $('readerActions').innerHTML = '';
  renderZoneOptions(s);
  renderSignalOptions(s);
  renderTabs();
  updateProgress();
  if(opts.scroll){
    scrollToReader();
  }
}

function scrollToReader(){
  const el = $('readerCard') || $('experience');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(el) el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
}

function scrollToQuestion(){
  const el = $('qSignal') || $('readerCard');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(el && window.innerWidth <= 920) el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
}

function scrollToFeedback(){
  const el = $('feedback') || $('readerCard');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(el && window.innerWidth <= 920) el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'});
}

function scrollToResult(){
  const el = $('resultPanel') || $('readerCard');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(el) el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
}

function renderZoneOptions(s){
  const box = $('zoneOptions');
  box.innerHTML = '';
  s.zones.forEach(zone => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.textContent = zone;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => chooseZone(zone));
    box.appendChild(btn);
  });
}

function chooseZone(zone){
  state.zoneChoice = zone;
  [...$('zoneOptions').children].forEach(btn => {
    const selected = btn.textContent === zone;
    btn.classList.toggle('selected', selected);
    btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
  $('qZone').classList.add('answered');
  $('qSignal').classList.add('active');
  $('feedback').className = 'feedback';
  $('readerActions').innerHTML = '';
  scrollToQuestion();
}

function renderSignalOptions(s){
  const box = $('signalOptions');
  box.innerHTML = '';
  s.signals.forEach(signal => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.textContent = signal;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => chooseSignal(signal));
    box.appendChild(btn);
  });
}

function chooseSignal(signal){
  state.signalChoice = signal;
  const s = scenarios[state.current];
  [...$('signalOptions').children].forEach(btn => {
    const selected = btn.textContent === signal;
    btn.classList.remove('selected','correct','near','missed');
    if(selected) btn.classList.add('selected');
    if(btn.textContent === s.correctSignal) btn.classList.add('correct');
    btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
  showFeedback();
}

function showFeedback(){
  const s = scenarios[state.current];
  const zoneOk = state.zoneChoice === s.dominant;
  const signalOk = state.signalChoice === s.correctSignal;
  const title = zoneOk && signalOk
    ? 'Ta lecture rejoint la lecture Foébé.'
    : zoneOk
      ? 'Tu as choisi la bonne zone. L’indice peut s’affiner.'
      : 'La scène peut se lire autrement.';
  const body = zoneOk && signalOk
    ? `${s.good}`
    : zoneOk
      ? `Tu as choisi la zone qui pèse le plus. Le détail à observer maintenant : qu’est-ce qui explique vraiment la scène ? ${s.refine}`
      : `Ton choix se comprend : plusieurs zones peuvent apparaître dans une même scène. Ici, la Boussole regarde ce qui pèse le plus. ${s.refine}`;
  $('feedback').innerHTML = `<h3>${title}</h3><p>${body}</p><div class="skill"><strong>Repère travaillé :</strong> ${s.skill}</div>`;
  $('feedback').className = 'feedback show';
  $('readerActions').innerHTML = '<button class="btn primary" type="button" id="showReadingBtn">Voir la lecture simple</button>';
  $('showReadingBtn').addEventListener('click', showReading);
  scrollToFeedback();
}

function showReading(){
  const s = scenarios[state.current];
  state.completed.add(state.current);
  $('visibleZone').textContent = s.visible || s.secondary;
  $('dominantZone').textContent = s.dominant;
  $('mainSignal').textContent = s.correctSignal;
  $('skillName').textContent = s.skill;
  $('foebeReading').textContent = s.reading;
  $('resultPanel').classList.add('show');
  $('readerActions').innerHTML = '';
  $('qZone').classList.add('answered');
  $('qSignal').classList.add('answered');
  renderTabs();
  updateProgress();
  scrollToResult();
}

function nextScenario(){
  const next = scenarios.findIndex((_, idx) => idx > state.current && !state.completed.has(idx));
  if(next !== -1){
    loadScenario(next, { scroll: true });
    return;
  }
  const anyLeft = scenarios.findIndex((_, idx) => !state.completed.has(idx));
  if(anyLeft !== -1){
    loadScenario(anyLeft, { scroll: true });
    return;
  }
  renderFinal();
  $('finalCard').classList.add('show');
  $('finalCard').scrollIntoView({behavior:'smooth', block:'start'});
}


const skillDesc = {
  "Reconnaître quand le soin devient une performance.": "Voir quand un geste de soin devient lui-même une charge.",
  "Différencier motivation et ressources disponibles.": "Reconnaître la différence entre ne pas vouloir et ne plus avoir assez.",
  "Reconnaître les signaux corporels ordinaires": "Entendre le corps avant qu’il parle plus fort.",
  "Lire la circulation dans le lien": "Voir si le lien nourrit dans les deux sens ou seulement dans un.",
  "Repérer l’impact de l'environnement sur l’état intérieur": "Comprendre ce que l’environnement fait à l’attention.",
  "Reconnaître une émotion peu lisible": "Nommer ce qui est flou avant de chercher à le résoudre.",
  "Distinguer fonctionnement correct et direction vivante": "Voir la différence entre fonctionner et avancer dans une direction juste.",
  "Distinguer repos réel et distraction qui épuise": "Repérer quand une pause occupe l’attention sans rendre d’énergie.",
  "Reconnaître quand le lien coûte trop": "Voir quand la fatigue vient de la circulation du lien, pas seulement du repos.",
  "Repérer quand le cadre ajoute de la charge": "Comprendre quand les objets, rappels ou supports censés aider deviennent une demande de plus."
};

function renderFinal(){
  const skills = [...new Set(scenarios.map(s => s.skill))];
  $('skillsList').innerHTML = skills.map(skill =>
    `<div class="skill-card"><strong>${skill}</strong><span>${skillDesc[skill] || ''}</span></div>`
  ).join('');
}


function initRevealFallback(){
  const revealItems = document.querySelectorAll('.reveal, .impact-item, .geste-card, .traj-item');
  if(!revealItems.length) return;
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }
}

document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'nextScenarioBtn') nextScenario();
});

document.querySelectorAll('[data-start]').forEach(btn => btn.addEventListener('click', () => {
  scrollToReader();
}));

initRevealFallback();
loadScenario(0);

})();
