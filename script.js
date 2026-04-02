const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');

openBtn.addEventListener('click', () => {
  const isOpen = envelope.classList.toggle('open');
  openBtn.textContent = isOpen ? 'Close Invitation' : 'Open Invitation';
  openBtn.setAttribute('aria-expanded', String(isOpen));
});
