const openBtn = document.getElementById('openBtn');
const detailsPages = document.getElementById('detailsPages');
const envelopeWrap = document.getElementById('envelopeWrap');
const countdown = document.getElementById('countdown');
const bgNasheed = document.getElementById('bgNasheed');
const musicToggle = document.getElementById('musicToggle');

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

function startNasheed() {
  if (!bgNasheed) return;

  bgNasheed.volume = 0.35;
  bgNasheed
    .play()
    .then(() => {
      musicToggle.textContent = '❚❚ Pause Nasheed';
      musicToggle.dataset.playing = 'true';
    })
    .catch(() => {
      musicToggle.textContent = '▶ Play Nasheed';
      musicToggle.dataset.playing = 'false';
    });
}

openBtn.addEventListener('click', () => {
  detailsPages.hidden = false;
  openBtn.setAttribute('aria-expanded', 'true');
  detailsPages.scrollIntoView({ behavior: 'smooth' });

  envelopeWrap.style.minHeight = '100vh';
  startNasheed();
});

musicToggle.addEventListener('click', () => {
  if (!bgNasheed) return;

  if (bgNasheed.paused) {
    bgNasheed.play();
    musicToggle.textContent = '❚❚ Pause Nasheed';
    musicToggle.dataset.playing = 'true';
  } else {
    bgNasheed.pause();
    musicToggle.textContent = '▶ Play Nasheed';
    musicToggle.dataset.playing = 'false';
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
styles.css
