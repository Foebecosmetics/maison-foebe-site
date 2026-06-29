(function(){
  var fill=document.getElementById('pageProgressFill');
  function update(){
    var s=window.scrollY;
    var m=document.documentElement.scrollHeight-window.innerHeight;
    var p=m>0?Math.round((s/m)*100):0;
    if(fill) fill.style.width=p+'%';
  }
  window.addEventListener('scroll',update,{passive:true});
  update();
})();
