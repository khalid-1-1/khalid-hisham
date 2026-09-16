document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const themeIcon = themeToggle.querySelector('i');
    const htmlEl = document.documentElement;

    function syncIcon() {
        if (themeIcon) themeIcon.className = htmlEl.classList.contains('light-theme') ? 'fas fa-sun' : 'fas fa-moon';
    }
    syncIcon();

    themeToggle.addEventListener('click', () => {
        const nextIsLight = !htmlEl.classList.contains('light-theme');
        htmlEl.classList.toggle('light-theme', nextIsLight);
        localStorage.setItem('khalid-theme', nextIsLight ? 'light' : 'dark');
        syncIcon();
    });
});
