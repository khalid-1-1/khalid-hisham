document.addEventListener('DOMContentLoaded', () => {
    const frames = document.querySelectorAll('.journey-frame');
    if (!frames.length) return;


    frames.forEach(frame => {
        const img = frame.querySelector('img');
        if (!img) return;
        const alreadyLoaded = img.complete && img.naturalWidth > 0;
        if (!alreadyLoaded) frame.classList.add('img-loading');
        img.addEventListener('load', () => {
            frame.classList.remove('img-loading', 'no-image');
        });
        img.addEventListener('error', () => {
            frame.classList.remove('img-loading');
            frame.classList.add('no-image');
        });
    });

    // Lightbox
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const counter = document.getElementById('lightbox-counter');
    if (!overlay || !lightboxImg) return;

    let lastFocusedEl = null;
    let images = [];
    let index = 0;

    function availableImages() {
        return Array.from(document.querySelectorAll('.journey-frame:not(.no-image) img'));
    }

    function updateNavState() {
        const multiple = images.length > 1;
        prevBtn.style.display = multiple ? 'flex' : 'none';
        nextBtn.style.display = multiple ? 'flex' : 'none';
        counter.textContent = images.length ? `${index + 1} / ${images.length}` : '';
    }

    function showImage(i) {
        if (!images.length) return;
        index = (i + images.length) % images.length;
        const img = images[index];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        updateNavState();
    }

    function openLightbox(imgEl) {
        images = availableImages();
        const startIndex = images.indexOf(imgEl);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        lastFocusedEl = document.activeElement;
        showImage(startIndex >= 0 ? startIndex : 0);
        closeBtn.focus();
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
        if (lastFocusedEl) lastFocusedEl.focus();
    }

    frames.forEach(frame => {
        frame.setAttribute('tabindex', '0');
        frame.setAttribute('role', 'button');
        frame.addEventListener('click', () => {
            if (frame.classList.contains('no-image')) return;
            const img = frame.querySelector('img');
            if (img) openLightbox(img);
        });
        frame.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !frame.classList.contains('no-image')) {
                e.preventDefault();
                const img = frame.querySelector('img');
                if (img) openLightbox(img);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(index - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(index + 1); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') showImage(index + 1);
        else if (e.key === 'ArrowLeft') showImage(index - 1);
    });
});
