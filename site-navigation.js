(() => {
  const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  const pageTitle = document.title.replace(/\s*[—|-]\s*Arctura.*$/i, '').replace(/\s*[—|-]\s*Arctura Collective.*$/i, '').trim() || 'Arctura';

  const routes = {
    '/': { label: 'Observatory', journey: 'Start', title: 'Arctura Observatory', next: '/field/', nextLabel: 'Choose a path', nextDescription: 'Use the Field Index to find the right public surface for your next step.' },
    '/field': { label: 'Field Index', journey: 'Start', title: 'Field Index', next: '/guardian/', nextLabel: 'Read the source note', nextDescription: 'Begin with the Guardian record to understand the orientation behind the work.' },
    '/guardian': { label: 'Guardian record', journey: 'Orient', title: 'Guardian of the Bear', next: '/tools/', nextLabel: 'Make a working record', nextDescription: 'Move from orientation to practice with a local-first working tool.' },
    '/arcturians': { label: 'Arcturians', journey: 'Orient', title: 'Arcturians', next: '/field/', nextLabel: 'Explore the public record', nextDescription: 'Follow the work and its boundaries through the Field Index.' },
    '/tools': { label: 'Arctura Tools', journey: 'Build', title: 'Tools', next: '/case-studies/', nextLabel: 'Review evidence', nextDescription: 'See how public claims, records, and outcomes are organized for review.' },
    '/products': { label: 'Products', journey: 'Build', title: 'Products', next: '/case-studies/', nextLabel: 'Inspect evidence', nextDescription: 'Move from product records to the evidence surface that supports review.' },
    '/case-studies': { label: 'Evidence', journey: 'Verify', title: 'Evidence', next: '/protocol/', nextLabel: 'Read the protocol', nextDescription: 'Understand the documented system primitives behind the public work.' },
    '/protocol': { label: 'Protocol', journey: 'Verify', title: 'Protocol', next: '/autonomous-resource-management/', nextLabel: 'Explore ARMS', nextDescription: 'Continue into the operating surface for resource management and observability.' },
    '/autonomous-resource-management': { label: 'ARMS', journey: 'Verify', title: 'Autonomous Resource Management', next: '/arcturian-council/', nextLabel: 'Open decision support', nextDescription: 'Review the disclosed Council concept and its decision boundaries.' },
    '/arcturian-council': { label: 'Arcturian Council', journey: 'Verify', title: 'Arcturian Council', next: '/academy/', nextLabel: 'Learn the system', nextDescription: 'Use the Academy to move from system context into practical learning tracks.' },
    '/collective': { label: 'Collective', journey: 'Contribute', title: 'Collective', next: '/support/', nextLabel: 'Find a contribution path', nextDescription: 'Use Support for the current public contact and contribution pathways.' },
    '/academy': { label: 'Academy', journey: 'Learn', title: 'Academy', next: '/signal-archives/', nextLabel: 'Continue in the archives', nextDescription: 'Move from learning tracks into the longer reference record.' },
    '/signal-archives': { label: 'Signal Archives', journey: 'Learn', title: 'Signal Archives', next: '/support/', nextLabel: 'Find support', nextDescription: 'Use the support surface for current public routes and contribution options.' },
    '/support': { label: 'Support', journey: 'Contribute', title: 'Support', next: '/field/', nextLabel: 'Return to the Field Index', nextDescription: 'Reorient from the public route map whenever your next step changes.' }
  };

  const normalize = (path) => path.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  const getRoute = () => {
    const exact = routes[currentPath];
    if (exact) return exact;
    if (currentPath.startsWith('/academy/')) return { ...routes['/academy'], title: pageTitle, next: '/signal-archives/', nextLabel: 'Continue in the archives', nextDescription: 'Move from this learning track into the longer reference record.' };
    return { label: pageTitle, journey: 'Explore', title: pageTitle, next: '/field/', nextLabel: 'Open the Field Index', nextDescription: 'Use the Field Index to choose the right public surface.' };
  };
  const route = getRoute();

  const groups = [
    { title: 'Start', description: 'Find orientation and a clear entry point.', links: [['/field/', 'Field Index'], ['/guardian/', 'Guardian record'], ['/arcturians/', 'Arcturians']] },
    { title: 'Build & verify', description: 'Use tools, product records, and evidence.', links: [['/tools/', 'Tools'], ['/products/', 'Products'], ['/case-studies/', 'Evidence'], ['/protocol/', 'Protocol']] },
    { title: 'Learn & contribute', description: 'Follow learning, archive, and support paths.', links: [['/academy/', 'Academy'], ['/signal-archives/', 'Archives'], ['/collective/', 'Collective'], ['/support/', 'Support']] }
  ];

  const makeLink = ([href, label], className = '') => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (className) link.className = className;
    if (normalize(href) === currentPath) link.setAttribute('aria-current', 'page');
    return link;
  };

  const oldHeader = document.querySelector('header');
  if (!oldHeader) return;
  oldHeader.classList.add('guided-header');
  oldHeader.replaceChildren();

  const nav = document.createElement('nav');
  nav.className = 'guided-nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  const brand = document.createElement('a');
  brand.className = 'guided-brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'Arctura Observatory home');
  const mark = document.createElement('span');
  mark.className = 'guided-brand__mark';
  const brandText = document.createElement('span');
  brandText.textContent = 'Arctura';
  brand.append(mark, brandText, document.createTextNode(' Observatory'));

  const navLinks = document.createElement('div');
  navLinks.className = 'guided-nav__links';
  navLinks.append(
    makeLink(['/', 'Home'], 'guided-nav__link'),
    makeLink(['/field/', 'Index'], 'guided-nav__link'),
    makeLink(['/tools/', 'Tools'], 'guided-nav__link')
  );
  const browseButton = document.createElement('button');
  browseButton.type = 'button';
  browseButton.className = 'guided-menu-toggle';
  browseButton.textContent = 'Browse';
  browseButton.setAttribute('aria-expanded', 'false');
  browseButton.setAttribute('aria-controls', 'guided-menu');
  navLinks.append(browseButton, makeLink(['/support/', 'Support'], 'guided-nav__link guided-nav__support'));
  nav.append(brand, navLinks);

  const menu = document.createElement('div');
  menu.className = 'guided-menu';
  menu.id = 'guided-menu';
  menu.hidden = true;
  menu.setAttribute('aria-label', 'Browse Arctura journeys');
  const menuInner = document.createElement('div');
  menuInner.className = 'guided-menu__inner';
  const intro = document.createElement('div');
  intro.className = 'guided-menu__intro';
  intro.innerHTML = '<p class="guided-menu__eyebrow">Choose a path</p><h2>Start with intent.</h2><p>Each route has a job. Use the path that best matches what you need to understand, make, verify, or contribute.</p>';
  const groupWrap = document.createElement('div');
  groupWrap.className = 'guided-menu__groups';
  groups.forEach((group) => {
    const groupEl = document.createElement('section');
    groupEl.className = 'guided-menu__group';
    const heading = document.createElement('h3');
    heading.textContent = group.title;
    const description = document.createElement('p');
    description.textContent = group.description;
    groupEl.append(heading, description);
    group.links.forEach((link) => groupEl.append(makeLink(link)));
    groupWrap.append(groupEl);
  });
  menuInner.append(intro, groupWrap);
  menu.append(menuInner);
  oldHeader.append(nav);
  document.body.append(menu);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileViewport = window.matchMedia('(max-width: 780px)');
  const menuFocusable = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];
  let closeTimer;

  const setMenuState = (open) => {
    window.clearTimeout(closeTimer);
    browseButton.setAttribute('aria-expanded', String(open));
    browseButton.textContent = open ? 'Close' : 'Browse';
    document.body.classList.toggle('guided-menu-open', open && mobileViewport.matches);
    document.documentElement.classList.toggle('guided-drawer-open', open);

    if (open) {
      menu.hidden = false;
      menu.setAttribute('aria-hidden', 'false');
      menu.classList.remove('is-open');
      void menu.offsetWidth;
      window.requestAnimationFrame(() => {
        menu.classList.add('is-open');
        if (mobileViewport.matches) menuFocusable()[0]?.focus({ preventScroll: true });
      });
      return;
    }

    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    const finish = () => { menu.hidden = true; };
    if (reducedMotion) {
      finish();
    } else {
      closeTimer = window.setTimeout(finish, 240);
    }
  };

  const closeMenu = (returnFocus = false) => {
    if (menu.hidden) return;
    setMenuState(false);
    if (returnFocus) browseButton.focus();
  };

  browseButton.addEventListener('click', () => {
    setMenuState(browseButton.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu(true);
      return;
    }
    if (event.key !== 'Tab' || menu.hidden || !mobileViewport.matches) return;
    const focusable = menuFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      browseButton.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      browseButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !oldHeader.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  mobileViewport.addEventListener('change', () => {
    if (!mobileViewport.matches) document.body.classList.remove('guided-menu-open');
  });

  const context = document.createElement('nav');
  context.className = 'journey-context';
  context.setAttribute('aria-label', 'Page context');
  context.innerHTML = `<span class="journey-context__label">Journey / ${route.journey}</span><span class="journey-context__title">${route.title}</span>`;
  const nextLink = document.createElement('a');
  nextLink.className = 'journey-context__next';
  nextLink.href = route.next;
  nextLink.textContent = `Next: ${route.nextLabel} →`;
  const mapLink = document.createElement('a');
  mapLink.className = 'journey-context__map';
  mapLink.href = '/field/';
  mapLink.textContent = 'All routes';
  context.append(nextLink, mapLink);
  oldHeader.insertAdjacentElement('afterend', context);

  const footer = document.querySelector('footer');
  if (footer) {
    const next = document.createElement('aside');
    next.className = 'journey-next';
    next.setAttribute('aria-label', 'Suggested next step');
    const copy = document.createElement('div');
    copy.innerHTML = `<p class="journey-next__eyebrow">Continue the journey</p><h2>${route.nextLabel}</h2><p>${route.nextDescription}</p>`;
    const action = document.createElement('a');
    action.className = 'journey-next__action';
    action.href = route.next;
    action.textContent = `${route.nextLabel} →`;
    next.append(copy, action);
    footer.insertAdjacentElement('beforebegin', next);
  }
})();
