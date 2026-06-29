(function(){
    const stateData = {
      energie:{label:"À plat", zone:"Zone Énergie", url:"/zone-energie/", title:"Tu sembles arriver à plat, avec peu de marge.", text:"Ici, le premier repère n’est pas d’en faire plus, mais de reconnaître ce qui pèse déjà trop et de voir ce qui peut être allégé.", question:"Qu’est-ce qui pèse déjà trop et que je pourrais alléger, même légèrement ?"},
      mental:{label:"Tête pleine", zone:"Zone Mental", url:"/zone-mental/", title:"Tu sembles arriver avec trop de choses en tête.", text:"Quand tout se mélange, le premier repère n’est pas de trancher tout de suite, mais de poser ce qui prend trop de place pour retrouver un peu de clarté.", question:"Qu’est-ce qui tourne en boucle et pourrait être posé ailleurs que dans ma tête ?"},
      emotions:{label:"Coupé·e", zone:"Zone Émotions", url:"/zone-emotions/", title:"Tu sembles arriver avec peu d’accès à ce que tu ressens.", text:"Le premier repère peut être très simple : ne pas forcer une réponse et commencer par remarquer ce qui est là, même si c’est encore flou.", question:"Qu’est-ce que je ressens, même vaguement, si je n’essaie pas d’être précis·e ?"},
      corps:{label:"À bout", zone:"Zone Corps", url:"/zone-corps/", title:"Tu sembles arriver à bout, avec une charge déjà trop forte.", text:"Quand c’est déjà trop, le premier repère n’est pas de tenir encore, mais de repérer ce qui peut être allégé maintenant : le rythme, une demande, une contrainte, une priorité.", question:"Quel signal concret mérite d’être pris au sérieux avant que je continue ?"},
      sens:{label:"Perdu·e", zone:"Zone Sens", url:"/zone-sens/", title:"Tu sembles arriver avec une direction devenue moins lisible.", text:"Quand on ne sait plus très bien où l’on va, le premier repère n’est pas de tout redéfinir, mais de retrouver une direction assez juste pour aujourd’hui.", question:"Qu’est-ce qui compte encore assez pour me donner une direction aujourd’hui ?"},
      ouverture:{label:"Curieux·se", zone:"La Boussole", url:"/boussole-scenarios/", title:"Tu sembles arriver avec de l’ouverture et de la curiosité.", text:"Tu n’arrives pas forcément avec quelque chose à réparer. C’est peut-être simplement un bon moment pour explorer, en observant ce qui résonne plutôt que ce qu’il faudrait corriger.", question:"Qu'est-ce que j'ai envie de mieux comprendre chez moi en ce moment ?"}
    };
    const wordData = {
      repos:{label:"Repos", zone:"Zone Énergie", url:"/zone-energie/", title:"Repos ne veut pas dire tout arrêter.", text:"Ce mot peut indiquer un besoin de vraie marge : moins de sollicitations, moins d’effort, moins de choses à porter en même temps.", gesture:"Créer dix minutes sans écran, sans tâche et sans justification."},
      signal:{label:"Signal", zone:"Zone Corps", url:"/zone-corps/", title:"Un signal n’est pas un détail à balayer.", text:"Ce mot peut indiquer qu’un indice est déjà là dans ton humeur, ton rythme ou ta façon de réagir. Le but n’est pas de dramatiser : c’est de le repérer plus tôt.", gesture:"Nommer un indice concret : fatigue, agitation, lourdeur, évitement, irritation."},
      clarte:{label:"Clarté", zone:"Zone Mental", url:"/zone-mental/", title:"La clarté revient souvent après avoir déchargé un peu.", text:"Ce mot peut indiquer un besoin de simplifier ce qui tourne dans ta tête. Pas tout résoudre, seulement rendre plus visible ce qui prend trop de place.", gesture:"Écrire trois lignes : ce qui pèse, ce qui est urgent, ce qui peut attendre."},
      vague:{label:"Vague", zone:"Zone Émotions", url:"/zone-emotions/", title:"Une vague peut être observée sans tout comprendre tout de suite.", text:"Ce mot peut indiquer une émotion ou une réaction qui demande à être mieux ressentie. Le premier repère n’est pas de tout expliquer, mais de commencer à nommer ce qui se passe.", gesture:"Chercher le mot émotionnel le plus proche, même s’il reste imparfait."},
      espace:{label:"Espace", zone:"Zone Environnement", url:"/zone-environnement/", title:"L’espace autour de toi change la façon dont tu t’orientes.", text:"Ce mot peut indiquer un besoin de diminuer la pression autour de toi : objets, bruit, demandes, lumière, proximité, interruptions.", gesture:"Retirer une sollicitation de ton environnement pendant cinq minutes."},
      lien:{label:"Lien", zone:"Zone Relations", url:"/zone-relations/", title:"Le lien peut soutenir ou épuiser.", text:"Ce mot peut indiquer quelque chose à regarder dans tes relations : ce que tu donnes, ce que tu retiens, ce que tu n'oses pas demander, ou ce qui manque.", gesture:"Identifier une personne ou une limite qui changerait un peu ton niveau de charge aujourd'hui."},
      nord:{label:"Nord", zone:"Zone Sens", url:"/zone-sens/", title:"Trouver le nord n’a pas besoin d’être parfait.", text:"Ce mot peut indiquer un besoin de retrouver un fil : ce qui compte, ce qui appelle, ce que tu ne veux plus voir disparaître dans l’urgence.", gesture:"Choisir un geste minuscule qui respecte mieux ce qui compte pour toi."}
    };

    let selectedState = null;
    let selectedWord  = null;

    document.querySelectorAll('#etape-02 .word-card').forEach(btn => {
      btn.disabled = true;
      btn.setAttribute('aria-disabled','true');
    });

    const $ = (id) => document.getElementById(id);
    function scrollToId(id){ const el=$(id); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }

    document.querySelectorAll('[data-scroll-target]').forEach(btn =>
      btn.addEventListener('click', () => scrollToId(btn.dataset.scrollTarget))
    );

    function unlockStep2(){
      const s2   = $('etape-02');
      const note = $('lockNote');
      if(s2) s2.classList.remove('locked');
      if(note) note.textContent = 'Tu peux maintenant choisir le mot qui t’appelle le plus.';
      document.querySelectorAll('#etape-02 .word-card').forEach(btn => {
        btn.disabled = false;
        btn.removeAttribute('aria-disabled');
      });
    }

    function updateSynthesis(){
      if(!selectedState || !selectedWord) return;

      const st   = stateData[selectedState];
      const wd   = wordData[selectedWord];
      const same = st.url === wd.url;

      // Déverrouiller la section 03
      const s3 = $('etape-03');
      if(s3) s3.classList.remove('locked');

      $('synthesisEmpty').hidden = true;
      $('synthesisBox').hidden   = false;

      $('synState').textContent = st.label;
      $('synWord').textContent  = wd.label;

      $('synCopy').innerHTML = same
        ? `Ton état et ton mot pointent vers la même direction : ${wd.zone}. Cela ne veut pas dire que tout se joue là, mais c’est une bonne porte d’entrée pour aujourd’hui. Premier geste : <strong>${wd.gesture}</strong>`
        : `Ton état pointe vers ${st.zone}, tandis que ton mot attire ton attention vers ${wd.zone}. Ce n’est pas la même chose, et c’est utile. Commence par le plus simple : <strong>${wd.gesture}</strong>`;

      $('synQuestion').textContent = st.question;

      $('synZoneLink').href = wd.url;
      $('synZoneLink').textContent = `Explorer ${wd.zone}`;
    }

    document.querySelectorAll('.state-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.state-card').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed','false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-pressed','true');
        selectedState = card.dataset.state;
        const st = stateData[selectedState];
        $('stateMirror').hidden = false;
        $('stateTitle').textContent = st.title;
        $('stateText').textContent  = st.text;
        // stateZoneLink supprimé du HTML (v2)
        unlockStep2();
        updateSynthesis();
      });
    });

    document.querySelectorAll('.word-card').forEach(card => {
      card.addEventListener('click', () => {
        if(!selectedState){ scrollToId('etape-01'); return; }
        document.querySelectorAll('.word-card').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed','false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-pressed','true');
        selectedWord = card.dataset.word;
        const wd = wordData[selectedWord];
        $('wordResult').hidden = false;
        $('wordTitle').textContent = wd.title;
        $('wordText').textContent  = wd.text;
        updateSynthesis();
      });
    });

    /* Reveal on scroll */
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if(!('IntersectionObserver' in window)){
      revealEls.forEach(el => el.classList.add('visible'));
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
        });
      }, {threshold:.1});
      revealEls.forEach(el => io.observe(el));
    }
/* Back to top */
    const back = $('backToTop');
    if(back){
      window.addEventListener('scroll', () => back.classList.toggle('visible', window.scrollY > 380), {passive:true});
      back.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }
  })();
