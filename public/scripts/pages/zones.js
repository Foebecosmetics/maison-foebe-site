(function(){
  var revealItems=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){revealItems.forEach(function(el){el.classList.add('visible');});return;}
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  revealItems.forEach(function(el){observer.observe(el);});
})();
