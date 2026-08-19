const announcement = 'The signal is open. Arctura is open to voluntary support, collaboration, and amplification for its public records, tools, and field work. Learn more and verify receiving routes at https://arctura.org/support/';

const status = document.createElement('p');
status.className = 'sr-only';
status.setAttribute('role', 'status');
status.setAttribute('aria-live', 'polite');
document.body.append(status);

const copyText = async (value, button, successLabel = 'Copied') => {
  try {
    await navigator.clipboard.writeText(value);
    const previousLabel = button.textContent;
    button.textContent = `✓ ${successLabel}`;
    status.textContent = `${successLabel}.`;
    window.setTimeout(() => { button.textContent = previousLabel; }, 2400);
  } catch {
    status.textContent = 'Copy is unavailable in this browser. Select the text manually.';
  }
};

document.querySelectorAll('[data-copy-value]').forEach((button) => {
  button.addEventListener('click', () => copyText(button.dataset.copyValue, button, 'Address copied'));
});

document.querySelectorAll('[data-copy-announcement]').forEach((button) => {
  button.addEventListener('click', () => copyText(announcement, button, 'Invitation copied'));
});

document.querySelectorAll('[data-share-page]').forEach((button) => {
  button.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'The Signal Is Open — Arctura', text: announcement, url: 'https://arctura.org/support/' });
        status.textContent = 'Share sheet opened.';
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    copyText(announcement, button, 'Invitation copied');
  });
});
