import { games } from '../data/games.js';
import { createCarousel } from './carousel.js';
import { openFrame } from './frame-modal.js';

const ui = {
    ar: { play: 'العب الآن', newTab: 'فتح في صفحة مستقلة', close: 'إغلاق اللعبة', soon: 'قريباً', empty: 'ألعاب جديدة قريباً', dialog: 'نافذة اللعبة' },
    en: { play: 'Play now', newTab: 'Open in a new page', close: 'Close game', soon: 'Coming soon', empty: 'More games coming soon', dialog: 'Game window' }
};

const roadSvg = `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="rr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1030"/><stop offset="1" stop-color="#3a1a6e"/></linearGradient>
    <linearGradient id="rr-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f5a"/><stop offset="1" stop-color="#12162e"/></linearGradient>
  </defs>
  <rect width="400" height="170" fill="url(#rr-sky)"/>
  <circle cx="200" cy="62" r="34" fill="#b44bff" opacity=".28"/>
  <polygon points="188,64 212,64 400,170 0,170" fill="url(#rr-road)"/>
  <line x1="188" y1="64" x2="0" y2="170" stroke="#3a7bff" stroke-width="3"/>
  <line x1="212" y1="64" x2="400" y2="170" stroke="#b44bff" stroke-width="3"/>
  <g stroke="#fff" stroke-opacity=".6" stroke-linecap="round">
    <line x1="196.5" y1="68" x2="193" y2="82" stroke-width="2"/><line x1="203.5" y1="68" x2="207" y2="82" stroke-width="2"/>
    <line x1="191" y1="96" x2="180" y2="128" stroke-width="3"/><line x1="209" y1="96" x2="220" y2="128" stroke-width="3"/>
    <line x1="178" y1="142" x2="150" y2="170" stroke-width="4"/><line x1="222" y1="142" x2="250" y2="170" stroke-width="4"/>
  </g>
  <g>
    <rect x="186" y="96" width="14" height="9" rx="2" fill="#ff3b30"/>
    <rect x="232" y="136" width="30" height="18" rx="4" fill="#ffcc00"/>
    <rect x="166" y="126" width="34" height="20" rx="4" fill="#00d9a3"/>
    <rect x="172" y="152" width="46" height="16" rx="5" fill="#3a7bff"/><rect x="180" y="146" width="30" height="8" rx="3" fill="#8fd4ff" opacity=".8"/>
  </g>
</svg>`;

let lang = localStorage.getItem('khalid-lang') || 'ar';
let carousel = null;
const t = () => ui[lang] || ui.ar;

function renderGames() {
    const grid = document.querySelector('.games-grid');
    if (!grid) return;
    grid.innerHTML = games.map(g => `
        <div class="carousel-slide" role="group" aria-roledescription="slide">
        <article class="game-card reveal active" data-game="${g.id}">
            <div class="game-thumb" aria-hidden="true">${g.id === 'road-rush' ? roadSvg : `<i class="${g.icon}"></i>`}</div>
            <div class="game-body">
                <h4>${g.title[lang] || g.title.ar}</h4>
                <p>${g.description[lang] || g.description.ar}</p>
                <p class="game-controls"><i class="fas fa-keyboard" aria-hidden="true"></i> <span>${g.controls[lang] || g.controls.ar}</span></p>
                <div class="project-tech-tags">${g.technologies.map(x => `<span>${x}</span>`).join('')}</div>
                <button type="button" class="btn btn-primary game-play-btn" data-game="${g.id}"${g.comingSoon ? ' disabled' : ''}>
                    <i class="fas fa-play" aria-hidden="true"></i> <span>${g.comingSoon ? t().soon : t().play}</span>
                </button>
            </div>
        </article>
        </div>
    `).join('');
    if (carousel) carousel.refresh();
}


function openGame(id) {
    const g = games.find(x => x.id === id);
    if (!g) return;
    openFrame({
        title: g.title[lang] || g.title.ar,
        url: g.url,
        dialogLabel: t().dialog,
        labels: { newTab: t().newTab, close: t().close }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('games-carousel');
    if (root) carousel = createCarousel(root);
    renderGames();
    const grid = document.querySelector('.games-grid');
    if (grid) grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.game-play-btn');
        if (btn && !btn.disabled) openGame(btn.dataset.game);
    });
});

document.addEventListener('khalid:langchange', (e) => {
    lang = e.detail.lang;
    renderGames();
});
