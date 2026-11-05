/* Figuren: Hero-Titel und Navigation im Startbild, ohne Bildbeschnitt. */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.unified-hero, .watercolor-content');
  sections.forEach(section => {
    const background = getComputedStyle(section).backgroundImage;
    const match = background.match(/url\(["']?(.+?)["']?\)/);
    if (!match) return;
    if (!section.querySelector(':scope > .responsive-full-image')) {
      const image = document.createElement('img');
      image.className = 'responsive-full-image';
      image.src = match[1]; image.alt = ''; image.decoding = 'async';
      section.insertBefore(image, section.firstChild);
    }
  });
  document.querySelectorAll('.unified-hero .unified-tabs').forEach((nav, i) => {
    let button = nav.parentNode.querySelector(':scope > .responsive-menu-toggle');
    if (!button) {
      button = document.createElement('button'); button.type = 'button';
      button.className = 'responsive-menu-toggle'; button.textContent = '☰ Menü';
      button.setAttribute('aria-expanded','false');
      nav.id = 'responsive-navigation-' + i;
      button.setAttribute('aria-controls',nav.id);
      nav.parentNode.insertBefore(button,nav);
      button.addEventListener('click', () => {
        const open=nav.classList.toggle('responsive-menu-open');
        button.setAttribute('aria-expanded',String(open));
        button.textContent=open?'✕ Schließen':'☰ Menü';
        requestAnimationFrame(position);
      });
    }
  });
  function position(){
    document.querySelectorAll('.unified-hero').forEach(hero => {
      const nav=hero.querySelector('.unified-tabs');
      const button=hero.querySelector('.responsive-menu-toggle');
      const copy=hero.querySelector('.unified-copy');
      const img=hero.querySelector(':scope > .responsive-full-image');
      if(!nav||!copy||!img)return;
      const narrow=window.matchMedia('(max-width:420px)').matches;
      const navHeight=narrow?(nav.classList.contains('responsive-menu-open')?nav.offsetHeight:button.offsetHeight):nav.offsetHeight;
      const menuTop=Math.max(0,window.innerHeight-navHeight);
      hero.style.setProperty('--figuren-tabs-top',menuTop+'px');
      hero.style.setProperty('--figuren-title-top',Math.max(12,menuTop-copy.offsetHeight-24)+'px');
      hero.style.minHeight=Math.max(window.innerHeight,img.getBoundingClientRect().height)+'px';
    });
  }
  window.addEventListener('resize',position);
  document.querySelectorAll('.responsive-full-image').forEach(img => img.addEventListener('load',position));
  document.fonts?.ready.then(position);
  position();
});