// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealTargets = document.querySelectorAll('.card, .about-inner');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => observer.observe(el));

// Language toggle (DE / EN)
const html = document.documentElement;
const langToggle = document.getElementById('lang-toggle');

function applyLang(lang) {
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  langToggle.textContent = lang === 'de' ? 'EN' : 'DE';
  document.title = html.dataset[lang === 'de' ? 'titleDe' : 'titleEn'];
  document.querySelector('meta[name="description"]').setAttribute(
    'content',
    html.dataset[lang === 'de' ? 'descDe' : 'descEn']
  );
}

const savedLang = localStorage.getItem('lang') || 'de';
applyLang(savedLang);

langToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-lang') === 'de' ? 'en' : 'de';
  applyLang(next);
  localStorage.setItem('lang', next);
});
