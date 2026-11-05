/* Responsive image + navigation test. Existing images and links stay unchanged. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.unified-hero, .watercolor-content').forEach(section => {
    const background = getComputedStyle(section).backgroundImage;
    const match = background.match(/url\(["']?(.+?)["']?\)/);
    if (!match) return;
    const image = document.createElement('img');
    image.className = 'responsive-full-image';
    image.src = match[1];
    image.alt = '';
    image.decoding = 'async';
    section.insertBefore(image, section.firstChild);
  });
  document.querySelectorAll('.unified-hero .unified-tabs').forEach((nav, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'responsive-menu-toggle';
    button.textContent = '☰ Menü';
    button.setAttribute('aria-expanded', 'false');
    const id = 'responsive-navigation-' + i;
    nav.id = id;
    button.setAttribute('aria-controls', id);
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('responsive-menu-open');
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? '✕ Schließen' : '☰ Menü';
    });
    nav.parentNode.insertBefore(button, nav);
  });
});