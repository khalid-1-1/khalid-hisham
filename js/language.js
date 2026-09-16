import ar from '../locales/ar.js';
import en from '../locales/en.js';

const translations = { ar, en };
const htmlEl = document.documentElement;
const langToggle = document.getElementById('lang-toggle');

function applyLanguage(lang) {
    const dict = translations[lang] || translations.ar;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    htmlEl.setAttribute('lang', lang === 'en' ? 'en' : 'ar');
    htmlEl.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    if (langToggle) langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';

    localStorage.setItem('khalid-lang', lang);
    document.body.classList.add('i18n-ready');

    document.dispatchEvent(new CustomEvent('khalid:langchange', { detail: { lang, dict } }));
}

let currentLang = localStorage.getItem('khalid-lang') || 'ar';
applyLanguage(currentLang);

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(currentLang);
    });
}

export { applyLanguage, translations };
