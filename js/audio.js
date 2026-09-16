import ar from '../locales/ar.js';
import en from '../locales/en.js';

const dictionaries = { ar, en };
let activeDict = dictionaries[localStorage.getItem('khalid-lang') || 'ar'];
document.addEventListener('khalid:langchange', (e) => { activeDict = e.detail.dict; });

document.addEventListener('DOMContentLoaded', () => {
    const htmlEl = document.documentElement;
    const cards = document.querySelectorAll('.audio-card');
    let currentPlayingAudio = null;

    function formatTime(seconds) {
        if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    cards.forEach(card => {
        const audio = card.querySelector('.audio-source');
        const playBtn = card.querySelector('.audio-play-btn');
        const playIcon = playBtn.querySelector('i');
        const progressBar = card.querySelector('.audio-progress-bar');
        const progressFill = card.querySelector('.audio-progress-fill');
        const progressHandle = card.querySelector('.audio-progress-handle');
        const currentTimeEl = card.querySelector('.audio-current-time');
        const durationEl = card.querySelector('.audio-duration');
        const muteBtn = card.querySelector('.audio-mute-btn');
        const muteIcon = muteBtn.querySelector('i');
        const volumeSlider = card.querySelector('.audio-volume-slider');
        if (!audio) return;

        progressBar.setAttribute('role', 'slider');
        progressBar.setAttribute('tabindex', '0');
        progressBar.setAttribute('aria-label', 'Seek');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBar.setAttribute('aria-valuenow', '0');

        const errorMsg = document.createElement('div');
        errorMsg.className = 'audio-error-msg';
        errorMsg.innerHTML = '<i class="fas fa-triangle-exclamation" aria-hidden="true"></i><span>' +
            activeDict.audio_error + '</span>';
        card.querySelector('.audio-player').insertAdjacentElement('afterend', errorMsg);

        function setPlayingState(isPlaying) {
            card.classList.toggle('playing', isPlaying);
            playIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
            playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
        }

        function updateMuteIcon() {
            if (audio.muted || audio.volume === 0) muteIcon.className = 'fas fa-volume-mute';
            else if (audio.volume < 0.5) muteIcon.className = 'fas fa-volume-down';
            else muteIcon.className = 'fas fa-volume-up';
        }

        audio.addEventListener('loadedmetadata', () => { durationEl.textContent = formatTime(audio.duration); });
        audio.addEventListener('timeupdate', () => {
            if (!audio.duration) return;
            const pct = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = pct + '%';
            progressHandle.style.insetInlineStart = pct + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
            progressBar.setAttribute('aria-valuenow', Math.round(pct));
        });
        audio.addEventListener('error', () => {
            card.classList.add('audio-error');
            playBtn.disabled = true;
            playBtn.setAttribute('aria-disabled', 'true');
        });
        audio.addEventListener('play', () => {
            if (currentPlayingAudio && currentPlayingAudio !== audio) currentPlayingAudio.pause();
            currentPlayingAudio = audio;
            setPlayingState(true);
        });
        audio.addEventListener('pause', () => {
            setPlayingState(false);
            if (currentPlayingAudio === audio) currentPlayingAudio = null;
        });
        audio.addEventListener('ended', () => {
            setPlayingState(false);
            progressFill.style.width = '0%';
            progressHandle.style.insetInlineStart = '0%';
            currentTimeEl.textContent = '0:00';
            if (currentPlayingAudio === audio) currentPlayingAudio = null;
        });

        playBtn.addEventListener('click', () => {
            if (audio.paused) audio.play().catch(() => {});
            else audio.pause();
        });

        function seek(clientX) {
            const rect = progressBar.getBoundingClientRect();
            if (!rect.width || !audio.duration) return;
            let ratio = (clientX - rect.left) / rect.width;
            ratio = Math.max(0, Math.min(1, ratio));
            if (htmlEl.getAttribute('dir') === 'rtl') ratio = 1 - ratio;
            audio.currentTime = ratio * audio.duration;
        }
        progressBar.addEventListener('click', (e) => seek(e.clientX));

        let isDragging = false;
        progressBar.addEventListener('mousedown', (e) => { isDragging = true; seek(e.clientX); });
        document.addEventListener('mousemove', (e) => { if (isDragging) seek(e.clientX); });
        document.addEventListener('mouseup', () => { isDragging = false; });
        progressBar.addEventListener('touchstart', (e) => seek(e.touches[0].clientX), { passive: true });
        progressBar.addEventListener('touchmove', (e) => seek(e.touches[0].clientX), { passive: true });

        progressBar.addEventListener('keydown', (e) => {
            if (!audio.duration) return;
            const isRtl = htmlEl.getAttribute('dir') === 'rtl';
            const step = audio.duration * 0.05;
            let handled = true;
            if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + (isRtl ? -step : step));
            else if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, audio.currentTime - (isRtl ? -step : step));
            else if (e.key === 'Home') audio.currentTime = 0;
            else if (e.key === 'End') audio.currentTime = audio.duration;
            else handled = false;
            if (handled) e.preventDefault();
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = parseFloat(volumeSlider.value);
            audio.muted = false;
            updateMuteIcon();
        });
        muteBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            updateMuteIcon();
        });

        updateMuteIcon();
    });
});
