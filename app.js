const dialog = document.querySelector('#project-dialog');

document.querySelectorAll('[data-project]').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelector('#dialog-title').textContent = card.dataset.project;
    document.querySelector('#dialog-headline').textContent = card.dataset.headline;
    document.querySelector('#dialog-description').textContent = card.dataset.description;
    const benefits = card.dataset.benefits.split('|').map((benefit) => {
      const item = document.createElement('li');
      item.textContent = benefit;
      return item;
    });
    document.querySelector('#dialog-benefits').replaceChildren(...benefits);
    document.querySelector('#dialog-outcome').textContent = card.dataset.outcome;
    dialog.querySelector('.dialog-cta-label').textContent = card.dataset.cta;
    dialog.querySelector('.dialog-cta').href = `mailto:MustShip.gushinets@gmail.com?subject=${encodeURIComponent(`Хочу похожее решение: ${card.dataset.project}`)}`;
    dialog.showModal();
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

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
