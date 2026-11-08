// Google Ads conversion tracking
// Fill in once the Google Ads account exists: Ziele > Conversions > Neue Conversion-Aktion > Website.
// ADS_ID looks like 'AW-123456789', each label like 'AbC-D_efG-h12_34-567'.
// Nothing is loaded while ADS_ID is empty.
const ADS_ID = '';
const CONVERSION_LABELS = {
  phone: '',
  whatsapp: '',
  signal: '',
  email: ''
};

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

if (ADS_ID) {
  // Consent Mode v2: everything denied until the visitor agrees in the cookie banner
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });
  gtag('js', new Date());
  gtag('config', ADS_ID);

  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
  document.head.appendChild(gtagScript);
}

function contactMethod(href) {
  if (href.startsWith('tel:')) return 'phone';
  if (href.includes('wa.me')) return 'whatsapp';
  if (href.includes('signal.me')) return 'signal';
  if (href.startsWith('mailto:')) return 'email';
  return null;
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || !ADS_ID) return;
  const method = contactMethod(link.getAttribute('href'));
  const label = method && CONVERSION_LABELS[method];
  if (!label) return;
  gtag('event', 'conversion', { send_to: ADS_ID + '/' + label });
});

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
const revealTargets = document.querySelectorAll('.reveal');
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
