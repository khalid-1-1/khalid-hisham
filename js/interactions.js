import ar from '../locales/ar.js';
import en from '../locales/en.js';
import { faithData } from '../data/content.js';

const dictionaries = { ar, en };
let activeLang = localStorage.getItem('khalid-lang') || 'ar';
let activeDict = dictionaries[activeLang];
document.addEventListener('khalid:langchange', (e) => { activeLang = e.detail.lang; activeDict = e.detail.dict; });

document.addEventListener('DOMContentLoaded', () => {

    const heroAvatar = document.querySelector('.hero-avatar');
    const heroAvatarImg = heroAvatar ? heroAvatar.querySelector('img') : null;
    if (heroAvatar && heroAvatarImg) {
        const alreadyLoaded = heroAvatarImg.complete && heroAvatarImg.naturalWidth > 0;
        if (!alreadyLoaded) heroAvatar.classList.add('img-loading');
        heroAvatarImg.addEventListener('load', () => {
            heroAvatar.classList.remove('img-loading');
        });
        heroAvatarImg.addEventListener('error', () => {
            heroAvatarImg.style.display = 'none';
            heroAvatar.classList.remove('img-loading');
        });
    }

    
    const toastEl = document.getElementById('toast');
    let toastTimer = null;
    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('visible'), 2000);
    }

    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (e2) {  }
            document.body.removeChild(ta);
        }
    }

   
    const faithText = document.getElementById('faith-text');
    const faithSource = document.getElementById('faith-source');
    const faithTabs = document.querySelectorAll('.faith-tab');
    let faithType = 'ayah';
    let faithIndex = 0;

    function renderFaith() {
        if (!faithText || !faithSource) return;
        const item = faithData[faithType][faithIndex];
        const content = item[activeLang] || item.ar;
        faithText.style.opacity = 0;
        setTimeout(() => {
            faithText.className = 'faith-text ' + (faithType !== 'ayah' ? faithType : '');
            faithText.textContent = content.text;
            faithSource.textContent = content.source;
            faithText.style.opacity = 1;
        }, 200);
    }

    document.addEventListener('khalid:langchange', renderFaith);

    faithTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            faithTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            faithType = tab.getAttribute('data-type');
            faithIndex = 0;
            renderFaith();
        });
    });

    const faithNext = document.getElementById('faith-next');
    const faithPrev = document.getElementById('faith-prev');
    if (faithNext) faithNext.addEventListener('click', () => {
        faithIndex = (faithIndex + 1) % faithData[faithType].length;
        renderFaith();
    });
    if (faithPrev) faithPrev.addEventListener('click', () => {
        faithIndex = (faithIndex - 1 + faithData[faithType].length) % faithData[faithType].length;
        renderFaith();
    });
    if (faithText) renderFaith();

    const faithCopyBtn = document.getElementById('faith-copy');
    if (faithCopyBtn) faithCopyBtn.addEventListener('click', async () => {
        const text = `${faithText.textContent} — ${faithSource.textContent}`;
        await copyText(text);
        showToast(activeDict.toast_copied);
    });

   
    document.querySelectorAll('.copy-phone-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            await copyText(btn.getAttribute('data-phone'));
            showToast(activeDict.toast_phone_copied);
        });
    });
});
