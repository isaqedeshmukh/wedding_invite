const openBtn       = document.getElementById('openBtn');
const envWrap       = document.getElementById('envWrap');
const envelopeScene = document.getElementById('envelopeScene');
const detailsPages  = document.getElementById('detailsPages');
const countdown     = document.getElementById('countdown');
const bgNasheed     = document.getElementById('bgNasheed');
const musicToggle   = document.getElementById('musicToggle');

/* ── Countdown ── */
const weddingDate = new Date('2026-04-22T19:30:00');

function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    countdown.textContent = 'The wedding celebration has begun! 🎉';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  countdown.textContent = `${d}d  ${h}h  ${m}m  ${s}s`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ── Music ── */
function setMusicBtn(on) {
  musicToggle.textContent = on ? '❚❚ Pause Nasheed' : '▶ Play Nasheed';
}

function startNasheed() {
  bgNasheed.volume = 0.6;
  bgNasheed.play()
    .then(() => setMusicBtn(true))
    .catch(() => { musicToggle.textContent = '▶ Tap to Play'; });
}

musicToggle.addEventListener('click', () => {
  if (bgNasheed.paused) {
    bgNasheed.play().then(() => setMusicBtn(true)).catch(() => {});
  } else {
    bgNasheed.pause();
    setMusicBtn(false);
  }
});

/* ── Panel reveal on scroll ── */
function setupPanels() {
  const panels = document.querySelectorAll('.card-panel');
  if (!('IntersectionObserver' in window)) {
    panels.forEach(p => p.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.28 });
  panels.forEach(p => obs.observe(p));
}

/* ── Envelope open sequence ── */
openBtn.addEventListener('click', () => {
  if (envWrap.dataset.opening) return; // prevent double tap
  envWrap.dataset.opening = '1';

  // Start nasheed (must be inside user gesture)
  startNasheed();

  // Step 1: flap swings open
  envWrap.classList.add('opening');

  // Step 2: fade envelope scene out
  setTimeout(() => {
    envelopeScene.style.opacity = '0';
  }, 1200);

  // Step 3: show detail pages
  setTimeout(() => {
    envelopeScene.style.display = 'none';
    detailsPages.hidden = false;
    detailsPages.scrollTop = 0;
    setupPanels();
  }, 1900);
});
