(function(){
  var revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});

  revealEls.forEach(function(el){ observer.observe(el); });
})();

(function(){
  var modal = document.getElementById('heroChipModal');
  if(!modal) return;
  var title = document.getElementById('chipModalTitle');
  var text = document.getElementById('chipModalText');
  var close = modal.querySelector('.chip-modal-close');
  var chips = document.querySelectorAll('.hero-chip');
  var lastTrigger = null;

  function openChip(chip){
    lastTrigger = chip;
    title.textContent = chip.getAttribute('data-chip-title') || chip.textContent;
    text.textContent = chip.getAttribute('data-chip-text') || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('chip-modal-open');
    window.setTimeout(function(){ close.focus(); }, 30);
  }
  function closeChip(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('chip-modal-open');
    if(lastTrigger) lastTrigger.focus();
  }

  chips.forEach(function(chip){
    chip.addEventListener('click', function(){ openChip(chip); });
  });
  close.addEventListener('click', closeChip);
  modal.addEventListener('click', function(event){
    if(event.target === modal) closeChip();
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && modal.classList.contains('is-open')) closeChip();
  });
})();
