const DRAG_THRESHOLD = 8;

export function createCarousel(root, options = {}) {
    const viewport = root.querySelector('.carousel-viewport');
    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    const dotsEl = root.querySelector('.carousel-dots');
    if (!viewport || !track) return null;

    let slides = [];
    let index = 0;
    let started = false;       
    let fit = false;           
    let dragging = false;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let curX = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let suppressClick = false;

    const dotsMin = options.dotsMin ?? 3;

    function measure() {
        slides = Array.from(track.children);
        return slides.length;
    }

    
    function targetFor(i) {
        const vw = viewport.clientWidth;
        const s = slides[i];
        return vw / 2 - (s.offsetLeft + s.offsetWidth / 2);
    }

    
    function fitTarget() {
        const vw = viewport.clientWidth;
        const first = slides[0];
        const last = slides[slides.length - 1];
        const contentW = last.offsetLeft + last.offsetWidth - first.offsetLeft;
        return (vw - contentW) / 2 - first.offsetLeft;
    }

    function contentFits() {
        if (slides.length < 1) return true;
        const first = slides[0];
        const last = slides[slides.length - 1];
        const contentW = last.offsetLeft + last.offsetWidth - first.offsetLeft;
        return contentW <= viewport.clientWidth + 1;
    }

    function setX(x, animate) {
        track.style.transition = animate ? '' : 'none';
        track.style.transform = `translate3d(${x}px,0,0)`;
        curX = x;
    }

    function buildDots() {
        if (!dotsEl) return;
        dotsEl.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'carousel-dot';
            b.dataset.i = String(i);
            b.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
            dotsEl.appendChild(b);
        });
    }

    function render(animate = true) {
        const n = slides.length;
        if (!n) return;
        index = Math.max(0, Math.min(n - 1, index));
        fit = n > 1 && contentFits();

        root.classList.toggle('is-single', n === 1);
        root.classList.toggle('is-fit', fit);
        const showNav = n > 1;
        if (prevBtn) prevBtn.hidden = !showNav;
        if (nextBtn) nextBtn.hidden = !showNav;
        if (dotsEl) dotsEl.hidden = !(n >= dotsMin && !fit);

        setX(fit ? fitTarget() : targetFor(index), animate);

        slides.forEach((s, i) => {
            s.classList.toggle('is-active', fit || i === index);
            s.setAttribute('aria-label', `${i + 1} / ${n}`);
        });
        const canPrev = !fit && index > 0;
        const canNext = !fit && index < n - 1;
        if (prevBtn) { prevBtn.disabled = !canPrev; }
        if (nextBtn) { nextBtn.disabled = !canNext; }
        if (dotsEl) {
            dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
                const on = i === index;
                d.classList.toggle('active', on);
                if (on) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
            });
        }
    }

    function goTo(i, animate = true) {
        index = i;
        render(animate);
    }
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    
    function refresh() {
        const n = measure();
        if (!n) {
            root.hidden = true;
            return;
        }
        root.hidden = false;
        if (!started) {
            
            index = n >= 3 ? 1 : 0;
            started = true;
        }
        buildDots();
        render(false);
    }


    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (dotsEl) dotsEl.addEventListener('click', (e) => {
        const d = e.target.closest('.carousel-dot');
        if (d) goTo(Number(d.dataset.i));
    });


    root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });


    root.addEventListener('focusin', (e) => {
        const s = e.target.closest && e.target.closest('.carousel-slide');
        if (!s || fit) return;
        const i = slides.indexOf(s);
        if (i > -1 && i !== index) goTo(i);
    });

    
    viewport.addEventListener('scroll', () => { viewport.scrollLeft = 0; }, { passive: true });

    
    viewport.addEventListener('pointerdown', (e) => {
        if (fit || slides.length < 2) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        pointerId = e.pointerId;
        startX = lastX = e.clientX;
        startY = e.clientY;
        lastT = performance.now();
        velocity = 0;
        baseX = curX;
        dragging = false;
    });

    viewport.addEventListener('pointermove', (e) => {
        if (pointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!dragging) {
            if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
            dragging = true;
            root.classList.add('is-dragging');
            try { viewport.setPointerCapture(pointerId); } catch (_) {  }
        }
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0) velocity = (e.clientX - lastX) / dt;
        lastX = e.clientX;
        lastT = now;

        
        let x = baseX + dx;
        const min = targetFor(slides.length - 1);
        const max = targetFor(0);
        if (x > max) x = max + (x - max) * 0.35;
        if (x < min) x = min + (x - min) * 0.35;
        setX(x, false);
    });

    function endDrag(e) {
        if (pointerId !== e.pointerId) return;
        const wasDragging = dragging;
        pointerId = null;
        dragging = false;
        root.classList.remove('is-dragging');
        if (!wasDragging) return;
        try { viewport.releasePointerCapture(e.pointerId); } catch (_) {  }

        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);

        
        const vw = viewport.clientWidth;
        let best = index;
        let bestDist = Infinity;
        slides.forEach((s, i) => {
            const center = curX + s.offsetLeft + s.offsetWidth / 2;
            const d = Math.abs(center - vw / 2);
            if (d < bestDist) { bestDist = d; best = i; }
        });
        if (best === index && Math.abs(velocity) > 0.35) {
            best = index + (velocity < 0 ? 1 : -1);
        }
        goTo(best);
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    
    viewport.addEventListener('click', (e) => {
        if (suppressClick) { e.preventDefault(); e.stopPropagation(); return; }
        
        const s = e.target.closest('.carousel-slide');
        if (s && !fit && !s.classList.contains('is-active')) {
            e.preventDefault();
            e.stopPropagation();
            goTo(slides.indexOf(s));
        }
    }, true);
    viewport.addEventListener('dragstart', (e) => e.preventDefault());

    
    let resizeFrame = 0;
    const onResize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => { if (slides.length) render(false); });
    };
    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(viewport);
    else window.addEventListener('resize', onResize);

    return { refresh, next, prev, goTo, get index() { return index; } };
}
