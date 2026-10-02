(() => {
  const mobileMenu = document.querySelector('.mobile-navigation');
  const closeMenu = () => { if (mobileMenu) mobileMenu.open = false; };
  document.addEventListener('click', event => {
    if (event.target.closest('.mobile-nav-panel a') || !event.target.closest('.mobile-navigation')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu?.open) {
      closeMenu();
      mobileMenu.querySelector('summary').focus();
    }
  });

  const sectionLinks = [...document.querySelectorAll('.site-navigation a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  function updateCurrentSection() {
    const current = sections.filter(section => section.getBoundingClientRect().top <= innerHeight * .4).at(-1);
    for (const link of sectionLinks) {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  let navigationFrame;
  window.addEventListener('scroll', () => {
    if (navigationFrame) return;
    navigationFrame = requestAnimationFrame(() => {
      navigationFrame = undefined;
      updateCurrentSection();
    });
  }, { passive: true });
  window.addEventListener('resize', updateCurrentSection);
  updateCurrentSection();

  const dialog = document.createElement('dialog');
  dialog.className = 'image-viewer';
  dialog.setAttribute('aria-labelledby', 'viewer-title');
  dialog.innerHTML = `<div class="viewer-header"><div><p class="viewer-counter"></p><h2 id="viewer-title" class="viewer-title"></h2></div><div class="viewer-controls"><button type="button" data-viewer-action="previous" aria-label="Previous photo">←</button><button type="button" data-viewer-action="next" aria-label="Next photo">→</button><button type="button" data-viewer-action="close" aria-label="Close image viewer" autofocus>×</button></div></div><div class="viewer-content"><div class="viewer-image-wrap"><p class="viewer-loading" role="status">Loading image…</p><img class="viewer-image" alt=""></div><div class="viewer-meta"></div></div>`;
  document.body.append(dialog);
  const image = dialog.querySelector('.viewer-image');
  const title = dialog.querySelector('.viewer-title');
  const counter = dialog.querySelector('.viewer-counter');
  const meta = dialog.querySelector('.viewer-meta');
  const loading = dialog.querySelector('.viewer-loading');
  const previous = dialog.querySelector('[data-viewer-action="previous"]');
  const next = dialog.querySelector('[data-viewer-action="next"]');
  const photos = [...document.querySelectorAll('.photograph')];
  let photoIndex = -1;

  image.addEventListener('load', () => { loading.hidden = true; });
  image.addEventListener('error', () => { loading.textContent = 'The image could not load. Use the original link below to try again.'; });
  function setImage(url, alt) {
    loading.textContent = 'Loading image…';
    loading.hidden = false;
    image.alt = alt;
    image.src = url;
  }
  function showPhoto(index) {
    photoIndex = index;
    const card = photos[index];
    dialog.classList.remove('award-viewer');
    title.replaceChildren(...[...card.querySelector('h3').childNodes].map(node => node.cloneNode(true)));
    counter.textContent = `Photo ${index + 1} / ${photos.length}`;
    previous.hidden = next.hidden = false;
    previous.disabled = index === 0;
    next.disabled = index === photos.length - 1;
    meta.replaceChildren();
    const caption = card.querySelector('figcaption');
    for (const child of caption.children) if (child.tagName !== 'H3') meta.append(child.cloneNode(true));
    setImage(card.querySelector('.photograph-image').href, card.querySelector('img').alt);
  }
  function showAward(link) {
    photoIndex = -1;
    dialog.classList.add('award-viewer');
    title.textContent = link.dataset.title;
    counter.textContent = 'From the trophy case';
    previous.hidden = next.hidden = true;
    meta.replaceChildren();
    const description = document.createElement('p');
    description.textContent = link.dataset.subtitle;
    const original = document.createElement('a');
    original.href = link.href;
    original.target = '_blank';
    original.rel = 'noopener';
    original.textContent = 'Open full image';
    meta.append(description, original);
    setImage(link.href, link.dataset.title);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('.photograph-image, .award-piece, .certificate-link');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    closeMenu();
    if (link.classList.contains('photograph-image')) showPhoto(photos.indexOf(link.closest('.photograph')));
    else showAward(link);
    dialog.showModal();
  });
  dialog.addEventListener('click', event => {
    const action = event.target.closest('[data-viewer-action]')?.dataset.viewerAction;
    if (action === 'close' || event.target === dialog) dialog.close();
    if (action === 'previous' && photoIndex > 0) showPhoto(photoIndex - 1);
    if (action === 'next' && photoIndex < photos.length - 1) showPhoto(photoIndex + 1);
  });
  dialog.addEventListener('keydown', event => {
    if (photoIndex < 0) return;
    if (event.key === 'ArrowLeft' && photoIndex > 0) { event.preventDefault(); showPhoto(photoIndex - 1); }
    if (event.key === 'ArrowRight' && photoIndex < photos.length - 1) { event.preventDefault(); showPhoto(photoIndex + 1); }
  });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); });
})();
