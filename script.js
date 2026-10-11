(function(){
  var header=document.getElementById('header'),
      burger=document.getElementById('burger'),
      nav=document.getElementById('nav'),
      drop=document.querySelector('.has-drop'),
      btn=drop.querySelector('.drop-btn'),
      desktop=window.matchMedia('(min-width:961px)'), t;

  function setDrop(open){drop.classList.toggle('open',open);btn.setAttribute('aria-expanded',open)}
  function setMenu(open){
    nav.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
    document.body.style.overflow=open?'hidden':'';
    if(!open)setDrop(false);
  }

  window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>20)},{passive:true});
  burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
  btn.addEventListener('click',function(){setDrop(!drop.classList.contains('open'))});

  /* Desktop: open on hover, with a short delay so the pointer can reach the menu */
  drop.addEventListener('mouseenter',function(){if(desktop.matches){clearTimeout(t);setDrop(true)}});
  drop.addEventListener('mouseleave',function(){if(desktop.matches){t=setTimeout(function(){setDrop(false)},180)}});

  document.addEventListener('click',function(e){
    if(desktop.matches&&!drop.contains(e.target))setDrop(false);
    if(!desktop.matches&&e.target.closest('#nav a'))setMenu(false);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){setDrop(false);if(nav.classList.contains('open')){setMenu(false);burger.focus()}}
  });
  desktop.addEventListener('change',function(){setMenu(false);setDrop(false)});

  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    var v=document.querySelector('.hero video');v.removeAttribute('autoplay');v.pause();
  }
})();
