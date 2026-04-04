const openBtn = document.getElementById('openBtn');
const detailsPages = document.getElementById('detailsPages');
const envelopeWrap = document.getElementById('envelopeWrap');
const countdown = document.getElementById('countdown');
const bgNasheed = document.getElementById('bgNasheed');
const musicToggle = document.getElementById('musicToggle');
const animatedPanels = document.querySelectorAll('.card-panel');

const weddingDate = new Date('2026-04-22T19:30:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    countdown.textContent = 'The wedding celebration has begun!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function setMusicButton(isPlaying) {
  musicToggle.textContent = isPlaying ? '❚❚ Pause Nasheed' : '▶ Play Nasheed';
  musicToggle.dataset.playing = isPlaying ? 'true' : 'false';
}

function startNasheed() {
  if (!bgNasheed) return;

  bgNasheed.volume = 0.75;
  bgNasheed
    .play()
    .then(() => setMusicButton(true))
    .catch(() => setMusicButton(false));
}

function setupPanelAnimations() {
  if (!('IntersectionObserver' in window)) {
    animatedPanels.forEach((panel) => panel.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.35 }
  );

  animatedPanels.forEach((panel) => observer.observe(panel));
}

openBtn.addEventListener('click', () => {
  detailsPages.hidden = false;
  openBtn.setAttribute('aria-expanded', 'true');
  detailsPages.scrollIntoView({ behavior: 'smooth' });

  envelopeWrap.style.minHeight = '100vh';
  startNasheed();
  setupPanelAnimations();
});

musicToggle.addEventListener('click', () => {
  if (!bgNasheed) return;

  if (bgNasheed.paused) {
    bgNasheed.play().then(() => setMusicButton(true)).catch(() => setMusicButton(false));
  } else {
    bgNasheed.pause();
    setMusicButton(false);
  }
});

setMusicButton(false);
updateCountdown();
setInterval(updateCountdown, 1000);
