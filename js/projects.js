import { skillGroups } from '../data/skills.js';
import { projects } from '../data/projects.js';
import ar from '../locales/ar.js';
import en from '../locales/en.js';

const dicts = { ar, en };
const ui = {
    ar: { comingSoon: 'لسه هتضاف', liveDemo: 'Live Demo', github: 'GitHub' },
    en: { comingSoon: 'Coming soon', liveDemo: 'Live Demo', github: 'GitHub' }
};

function renderSkills(lang) {
    const grid = document.querySelector('.skills-grid');
    if (!grid) return;
    grid.innerHTML = skillGroups.map(group => `
        <div class="skills-subgroup reveal active">
            <h5 class="skills-subgroup-title">${group.label[lang] || group.label.ar}</h5>
            <div class="skills-subgroup-pills">
                ${group.skills.map(s => `
                    <div class="skill-pill"><i class="${s.icon}" aria-hidden="true"></i><span>${s.name[lang] || s.name.ar}</span></div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjects(lang) {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    const t = ui[lang] || ui.ar;

    if (!projects.length) {
        const dict = dicts[lang] || dicts.ar;
        grid.classList.add('projects-grid-empty');
        grid.innerHTML = `
            <div class="projects-empty reveal active">
                <div class="projects-empty-icon"><i class="fas fa-hammer" aria-hidden="true"></i></div>
                <h4>${dict.projects_empty_title}</h4>
                <p>${dict.projects_empty_text}</p>
            </div>
        `;
        return;
    }
    grid.classList.remove('projects-grid-empty');
    grid.innerHTML = projects.map(p => `
        <div class="project-card reveal active">
            ${p.comingSoon ? `<span class="project-todo-badge"><i class="fas fa-pen" aria-hidden="true"></i><span>${t.comingSoon}</span></span>` : ''}
            <div class="project-icon"><i class="${p.icon}" aria-hidden="true"></i></div>
            <h4>${p.title[lang] || p.title.ar}</h4>
            <p>${p.description[lang] || p.description.ar}</p>
            <div class="project-tech-tags">${p.technologies.map(tech => `<span>${tech}</span>`).join('')}</div>
            <div class="project-actions">
                <a href="${p.demo}" class="btn btn-primary${p.demo === '#' ? ' disabled-link' : ''}"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> <span>${t.liveDemo}</span></a>
                <a href="${p.github}" class="btn btn-secondary${p.github === '#' ? ' disabled-link' : ''}"><i class="fab fa-github" aria-hidden="true"></i> <span>${t.github}</span></a>
            </div>
        </div>
    `).join('');
}

function renderAll(lang) {
    renderSkills(lang);
    renderProjects(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAll(localStorage.getItem('khalid-lang') || 'ar');
});
document.addEventListener('khalid:langchange', (e) => renderAll(e.detail.lang));
