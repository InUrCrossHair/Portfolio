/*
  Cody Altman Portfolio JavaScript
  Update selectors only if you rename navigation, reveal, project preview, or copyright elements.
*/
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const yearElement = document.querySelector('#copyright-year');
const lightbox = document.querySelector('#project-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('figcaption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  });
});

// Hide image tags when the matching asset has not been uploaded yet, leaving the clean text placeholder visible.
document.querySelectorAll('.headshot-placeholder img, .project-visual img').forEach((image) => {
  image.addEventListener('error', () => {
    image.classList.add('is-missing');
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  lightboxCaption.textContent = '';
  document.body.classList.remove('nav-open');
}

// Click a project image area to preview the full image. Upload images to assets/projects/ and update data-full-image as needed.
document.querySelectorAll('.project-visual').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    const imagePath = button.dataset.fullImage;
    const title = button.dataset.title || 'Project preview';
    const thumbnail = button.querySelector('img');
    if (!imagePath || thumbnail?.classList.contains('is-missing')) return;
    lightboxImage.src = imagePath;
    lightboxImage.alt = `${title} full-size preview`;
    lightboxCaption.textContent = title;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
  });
});

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
