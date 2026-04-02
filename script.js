const openBtn = document.getElementById('openBtn');
const inviteCard = document.getElementById('inviteCard');
const inviteLabel = document.getElementById('inviteLabel');

openBtn.addEventListener('click', () => {
  const isHidden = inviteCard.hasAttribute('hidden');

  if (isHidden) {
    inviteCard.removeAttribute('hidden');
    inviteLabel.removeAttribute('hidden');
    openBtn.textContent = 'Close Invitation';
    openBtn.setAttribute('aria-expanded', 'true');
    return;
  }

  inviteCard.setAttribute('hidden', '');
  inviteLabel.setAttribute('hidden', '');
  openBtn.textContent = 'Open Invitation';
  openBtn.setAttribute('aria-expanded', 'false');
});
