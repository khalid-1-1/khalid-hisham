document.addEventListener('DOMContentLoaded', () => {
    
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOverlay = document.getElementById('nav-overlay');

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('is-active');
        navOverlay.classList.remove('active');
        const bars = mobileMenu.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
    }

    if (mobileMenu && navMenu && navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
        mobileMenu.addEventListener('click', () => {
            const nowActive = !mobileMenu.classList.contains('is-active');
            navMenu.classList.toggle('active', nowActive);
            mobileMenu.classList.toggle('is-active', nowActive);
            navOverlay.classList.toggle('active', nowActive);
            mobileMenu.setAttribute('aria-expanded', String(nowActive));
            const bars = mobileMenu.querySelectorAll('.bar');
            if (nowActive) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) closeMobileMenu();
        });
    }

 
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('sticky');
        else navbar.classList.remove('sticky');

        let currentSection = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) currentSection = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }, { passive: true });

  
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

   
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
