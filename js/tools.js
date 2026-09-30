import { tools } from '../data/tools.js';
import { createCarousel } from './carousel.js';
import { openFrame } from './frame-modal.js';

const ui = {
    ar: { open: 'افتح الأداة', newTab: 'فتح في صفحة مستقلة', close: 'إغلاق الأداة', dialog: 'نافذة الأداة' },
    en: { open: 'Open tool', newTab: 'Open in a new page', close: 'Close tool', dialog: 'Tool window' }
};

let lang = localStorage.getItem('khalid-lang') || 'ar';
let carousel = null;
const t = () => ui[lang] || ui.ar;

function renderTools() {
    const grid = document.querySelector('.tools-grid');
    if (!grid) return;
    grid.innerHTML = tools.map(tool => `
        <div class="carousel-slide" role="group" aria-roledescription="slide">
            <article class="project-card tool-card reveal active" data-tool="${tool.id}">
                <div class="project-icon"><i class="${tool.icon}" aria-hidden="true"></i></div>
                <h4>${tool.title[lang] || tool.title.ar}</h4>
                <p>${tool.description[lang] || tool.description.ar}</p>
                <div class="project-tech-tags">${tool.tags.map(x => `<span>${x}</span>`).join('')}</div>
                <div class="project-actions">
                    <button type="button" class="btn btn-primary tool-open-btn" data-tool="${tool.id}">
                        <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> <span>${t().open}</span>
                    </button>
                </div>
            </article>
        </div>
    `).join('');
    if (carousel) carousel.refresh();
}

function openTool(id) {
    const tool = tools.find(x => x.id === id);
    if (!tool) return;
    openFrame({
        title: tool.title[lang] || tool.title.ar,
        url: tool.url,
        dialogLabel: t().dialog,
        labels: { newTab: t().newTab, close: t().close }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('tools-carousel');
    if (root) carousel = createCarousel(root);
    renderTools();
    const grid = document.querySelector('.tools-grid');
    if (grid) grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.tool-open-btn');
        if (btn) openTool(btn.dataset.tool);
    });
});

document.addEventListener('khalid:langchange', (e) => {
    lang = e.detail.lang;
    renderTools();
});
