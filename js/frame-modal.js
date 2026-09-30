const modal = document.getElementById('game-modal');
const frame = document.getElementById('game-frame');
const modalTitle = document.getElementById('game-modal-title');
const modalNewTab = document.getElementById('game-modal-newtab');
const modalClose = document.getElementById('game-modal-close');
let lastFocused = null;

export function openFrame({ title, url, labels = {}, dialogLabel = '' }) {
    if (!modal || !frame) return;
    lastFocused = document.activeElement;
    modalTitle.textContent = title;
    modalNewTab.href = url;
    if (labels.newTab) {
        modalNewTab.setAttribute('title', labels.newTab);
        modalNewTab.setAttribute('aria-label', labels.newTab);
    }
    if (labels.close) modalClose.setAttribute('aria-label', labels.close);
    if (dialogLabel) modal.setAttribute('aria-label', dialogLabel);
    frame.setAttribute('title', title);
    frame.src = url;
    modal.classList.add('open');
    document.body.classList.add('game-open');
    modalClose.focus();
}

export function closeFrame() {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.body.classList.remove('game-open');
    frame.src = 'about:blank';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
}

if (modalClose) modalClose.addEventListener('click', closeFrame);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFrame(); });
if (frame) frame.addEventListener('load', () => {
    if (!modal.classList.contains('open')) return;
    try {
        const w = frame.contentWindow;
        w.focus();
        w.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFrame(); });
    } catch (_) { }
});
