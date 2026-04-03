const openBtn = document.getElementById('openBtn');
const detailsPages = document.getElementById('detailsPages');
const envelopeWrap = document.getElementById('envelopeWrap');
const countdown = document.getElementById('countdown');

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

openBtn.addEventListener('click', () => {
  detailsPages.hidden = false;
  openBtn.setAttribute('aria-expanded', 'true');
  detailsPages.scrollIntoView({ behavior: 'smooth' });

  // keep envelope as first screen; user can scroll back up
  envelopeWrap.style.minHeight = '100vh';
});

updateCountdown();
setInterval(updateCountdown, 1000);
