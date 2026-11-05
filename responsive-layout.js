/* Figuren: Bild nur einmal rendern und an der Navigationskante abschliessen. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.unified-hero, .watercolor-content').forEach(section => {
    const background = getComputedStyle(section).backgroundImage;
    const match = background.match(/url\(["']?(.+?)["']?\)/);
    if (!match) return;
    if (!section.querySelector(':scope > .responsive-full-image')) {
      const img = document.createElement('img');
      img.className = 'responsive-full-image';
      img.src = match[1];
      img.alt = '';
      img.decoding = 'async';
      section.insertBefore(img, section.firstChild);
    }
    // Den alten CSS-Hintergrund deaktivieren; sonst erscheint das Bild unter den Reitern erneut.
    section.style.setProperty('background-image', 'none', 'important');
  });
  document.querySelectorAll('.unified-hero .unified-tabs').forEach((nav, i) => {
    let button = nav.parentElement.querySelector(':scope > .responsive-menu-toggle');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'responsive-menu-toggle';
      button.textContent = '☰ Menü';
      button.setAttribute('aria-expanded', 'false');
      nav.id = 'responsive-navigation-' + i;
      button.setAttribute('aria-controls', nav.id);
      nav.parentElement.insertBefore(button, nav);
      button.addEventListener('click', () => {
        const open = nav.classList.toggle('responsive-menu-open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? '✕ Schließen' : '☰ Menü';
      });
    }
  });
  function layout() {
    document.querySelectorAll('.unified-hero').forEach(hero => {
      const nav = hero.querySelector('.unified-tabs');
      const button = hero.querySelector('.responsive-menu-toggle');
      const narrow = window.matchMedia('(max-width:420px)').matches;
      const navHeight = narrow ? (button ? button.offsetHeight : 48) : (nav ? nav.offsetHeight : 82);
      hero.style.setProperty('--figuren-nav-height', navHeight + 'px');
    });
  }
  window.addEventListener('resize', layout);
  document.fonts?.ready.then(layout);
  layout();
});