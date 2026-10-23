'use strict';
let toastTimer;
document.querySelector('.copy-email').addEventListener('click', async () => {
  const toast = document.querySelector('.toast');
  try {
    await navigator.clipboard.writeText('MustShip.gushinets@gmail.com');
    toast.textContent = 'Email скопирован';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.email-strip a'));
    selection.removeAllRanges();
    selection.addRange(range);
    toast.textContent = 'Email выделен — нажмите Ctrl+C или скопируйте вручную';
  }
  clearTimeout(toastTimer);
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
});
