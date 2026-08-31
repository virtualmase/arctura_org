(() => {
  const shell = document.querySelector('.site-shell');
  if (!shell) return;

  const toggle = shell.querySelector('[data-shell-toggle]');
  const menu = shell.querySelector('[data-shell-menu]');
  if (!toggle || !menu) return;

  toggle.textContent = 'Menu';
  toggle.setAttribute('aria-label', 'Open site menu');

  const closeMenu = ({ focus = false } = {}) => {
    if (menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open site menu');
    if (focus) toggle.focus();
  };

  const openMenu = () => {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close site menu');
  };

  toggle.addEventListener('click', () => {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!menu.hidden && !shell.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu({ focus: true });
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
})();
