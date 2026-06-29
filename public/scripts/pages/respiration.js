const TECH={apaisement:{label:'Apaisement profond',cycles:4,phases:[{name:'Inspire',dur:4,pos:'top',color:'#BB7E60'},{name:'Retiens',dur:6,pos:'top',color:'#C45279'},{name:'Expire',dur:8,pos:'bottom',color:'#4A7C59'}]},coherence:{label:'Cohérence cardiaque',cycles:6,phases:[{name:'Inspire',dur:5,pos:'top',color:'#BB7E60'},{name:'Expire',dur:5,pos:'bottom',color:'#4A7C59'}]},ancrage:{label:'Ancrage mental',cycles:5,phases:[{name:'Inspire',dur:4,pos:'top',color:'#BB7E60'},{name:'Retiens',dur:4,pos:'top',color:'#C45279'},{name:'Expire',dur:6,pos:'bottom',color:'#4A7C59'},{name:'Pause',dur:2,pos:'bottom',color:'#8C6A5A'}]}};
let running=false,timer=null,currentTech=null,cycle=0,phaseIdx=0,trackH=0;const BALL_DIAM=52;
function showState(id){document.querySelectorAll('.state').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}
function begin(key){currentTech=TECH[key];cycle=0;phaseIdx=0;running=true;const vh=window.innerHeight;trackH=Math.min(Math.max(vh*0.35,180),280);document.getElementById('track').style.height=trackH+'px';setBallPos('bottom',0);document.getElementById('phaseLabel').textContent='';document.getElementById('countLabel').textContent='';updateCyclesLabel();showState('stateExercise');const pl=document.getElementById('phaseLabel');const cl=document.getElementById('countLabel');pl.style.opacity='1';cl.style.opacity='0';let countdown=3;pl.textContent=countdown;pl.style.fontSize='52px';pl.style.color='var(--text-dim)';const cdTimer=setInterval(()=>{countdown--;if(countdown>0){pl.textContent=countdown;}else{clearInterval(cdTimer);pl.textContent='';pl.style.fontSize='';pl.style.color='';cl.style.opacity='0.5';setTimeout(()=>runPhase(),200);}},1000);}
function setBallPos(pos,duration){const ball=document.getElementById('ball');const topPos=-BALL_DIAM/2;const bottomPos=trackH-BALL_DIAM/2;ball.style.transition=duration>0?`top ${duration}s linear`:'none';ball.style.top=(pos==='top'?topPos:bottomPos)+'px';}
function setBallColor(color){const ball=document.getElementById('ball');ball.style.background=color;ball.style.boxShadow=`0 0 32px 8px ${color}44`;}
function updateCyclesLabel(){const total=currentTech.cycles;document.getElementById('cyclesLabel').textContent=cycle<total?`Cycle ${cycle+1} sur ${total}`:'';}
function runPhase(){if(!running)return;const tech=currentTech;if(cycle>=tech.cycles){finish();return;}const phase=tech.phases[phaseIdx];const prevPhase=phaseIdx>0?tech.phases[phaseIdx-1]:tech.phases[tech.phases.length-1];const moving=prevPhase.pos!==phase.pos;setBallColor(phase.color);const pl=document.getElementById('phaseLabel');pl.style.opacity='0';setTimeout(()=>{pl.textContent=phase.name;pl.style.opacity='1';},200);if(moving){setBallPos(phase.pos,phase.dur);}let count=phase.dur;const cl=document.getElementById('countLabel');cl.textContent=count;cl.style.opacity='0.5';const start=Date.now();function tick(){if(!running)return;const elapsed=Math.floor((Date.now()-start)/1000);const remaining=phase.dur-elapsed;if(remaining>0){cl.textContent=remaining;timer=setTimeout(tick,1000-((Date.now()-start)%1000));}else{cl.textContent='';phaseIdx++;if(phaseIdx>=tech.phases.length){phaseIdx=0;cycle++;updateCyclesLabel();}setTimeout(()=>runPhase(),300);}}timer=setTimeout(tick,1000);}
function stop(){running=false;if(timer)clearTimeout(timer);showState('stateIntro');}
function finish(){running=false;document.getElementById('phaseLabel').style.opacity='0';document.getElementById('countLabel').style.opacity='0';setTimeout(()=>showState('stateDone'),800);}
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-tech]').forEach(btn=>{
    btn.addEventListener('click',()=>begin(btn.dataset.tech));
  });
  document.querySelectorAll('[data-stop]').forEach(btn=>{
    btn.addEventListener('click',stop);
  });
  function bindRestart(){
    document.querySelectorAll('[data-restart]').forEach(btn=>{
      btn.addEventListener('click',()=>showState('stateIntro'));
    });
  }
  const from=new URLSearchParams(window.location.search).get('from');
  if(from==='test'){
    document.getElementById('doneActions').innerHTML=`<a href="/echelle-foebe/" class="btn-primary cta-main"><span class="cta-kicker">Si tu veux te lire</span><strong class="cta-title">Faire l’Échelle Foébé</strong></a><a href="/boussole/" class="btn-secondary"><span class="cta-kicker">Si tu veux juste te situer</span><strong class="cta-title">Ouvrir le Sas</strong></a><a href="/zones/" class="btn-secondary"><span class="cta-kicker">Si tu veux comprendre</span><strong class="cta-title">Voir les 7 zones</strong></a><a href="/boussole-scenarios/" class="btn-secondary"><span class="cta-kicker">Si tu veux t’entraîner</span><strong class="cta-title">Lire une situation</strong></a><button class="btn-secondary" type="button" data-restart><span class="cta-kicker">Si tu veux rester ici</span><strong class="cta-title">Recommencer</strong></button>`;
  }
  bindRestart();
});
