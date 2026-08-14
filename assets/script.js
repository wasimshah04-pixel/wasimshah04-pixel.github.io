(function(){
  const menu=document.querySelector('.menu'), links=document.querySelector('.nav-links');
  if(menu&&links){menu.addEventListener('click',()=>{links.classList.toggle('open');menu.setAttribute('aria-expanded',links.classList.contains('open'))});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))}
  const y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
})();
