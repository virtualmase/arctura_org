(() => {
  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.querySelector('[data-identity-field]');
  const routeButtons = [...document.querySelectorAll('[data-route-node]')];
  const panel = document.querySelector('[data-route-panel]');
  const registrySummary = document.querySelector('[data-registry-summary]');
  const registryUpdated = document.querySelector('[data-registry-updated]');
  const registryArtifacts = document.querySelector('[data-registry-artifacts]');

  const routes = {
    field: {
      eyebrow: 'Route / public architecture',
      title: 'Field Index',
      description: 'Start with the public map when you need a clear view of Arctura’s surfaces, their roles, and the boundaries that distinguish them.',
      boundary: 'The index is a route map. It does not make every listed surface operational, verified, or endorsed beyond its own stated record.',
      href: '/field/',
      label: 'Open the Field Index'
    },
    guardian: {
      eyebrow: 'Route / source note',
      title: 'Guardian record',
      description: 'Trace the orientation metaphor back to its public source note: a position, a field of responsibility, and a durable record.',
      boundary: 'The Guardian is narrative and posture. It does not confer authority, affiliation, or a claim of supernatural insight.',
      href: '/guardian/',
      label: 'Read the Guardian record'
    },
    tools: {
      eyebrow: 'Route / local-first work',
      title: 'Arctura Tools',
      description: 'Use browser-based tools to create portable working records with scope, evidence plans, owners, review dates, and stated boundaries.',
      boundary: 'Tools structure the information you enter. They do not research, verify, decide, or provide professional advice.',
      href: '/tools/',
      label: 'Explore Arctura Tools'
    },
    evidence: {
      eyebrow: 'Route / reviewable claims',
      title: 'Evidence surface',
      description: 'Review public case material where claims can be tied to artifacts, sources, and limitations instead of being carried by language alone.',
      boundary: 'A public case record is not a universal performance guarantee or an endorsement of every related concept.',
      href: '/case-studies/',
      label: 'Inspect evidence'
    }
  };

  const setRoute = (routeKey) => {
    const route = routes[routeKey];
    if (!route || !panel) return;

    routeButtons.forEach((button) => {
      const active = button.dataset.routeNode === routeKey;
      button.setAttribute('aria-pressed', String(active));
    });

    panel.replaceChildren();
    const eyebrow = document.createElement('p');
    eyebrow.className = 'workbench-panel__eyebrow';
    eyebrow.textContent = route.eyebrow;
    const title = document.createElement('h3');
    title.textContent = route.title;
    const description = document.createElement('p');
    description.className = 'workbench-panel__description';
    description.textContent = route.description;
    const boundary = document.createElement('p');
    boundary.className = 'workbench-panel__boundary';
    boundary.innerHTML = '<strong>Boundary:</strong> ';
    boundary.append(document.createTextNode(route.boundary));
    const action = document.createElement('a');
    action.className = 'button workbench-panel__action';
    action.href = route.href;
    action.textContent = route.label;

    const content = document.createElement('div');
    content.append(eyebrow, title, description, boundary);
    panel.append(content, action);
  };

  routeButtons.forEach((button) => {
    button.addEventListener('click', () => setRoute(button.dataset.routeNode));
    button.addEventListener('keydown', (event) => {
      const current = routeButtons.indexOf(button);
      if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
      const next = (current + (forward ? 1 : -1) + routeButtons.length) % routeButtons.length;
      routeButtons[next].focus();
      setRoute(routeButtons[next].dataset.routeNode);
    });
  });
  setRoute('field');

  const renderRegistrySignal = async () => {
    if (!registrySummary || !registryUpdated || !registryArtifacts) return;
    try {
      const response = await fetch('/content/arctura.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Registry request failed (${response.status})`);
      const registry = await response.json();
      const artifacts = Array.isArray(registry.artifacts) ? registry.artifacts.length : 0;
      const guardians = Array.isArray(registry.guardians) ? registry.guardians.length : 0;
      const signals = Array.isArray(registry.signals) ? registry.signals.length : 0;
      const updated = registry.updatedAt ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(registry.updatedAt)) : 'No timestamp';
      registrySummary.textContent = `${guardians} disclosed functions`;
      registryUpdated.textContent = updated;
      registryArtifacts.textContent = `${artifacts} artifacts / ${signals} signals`;
    } catch (error) {
      registrySummary.textContent = 'Registry unavailable';
      registryUpdated.textContent = 'Read source records';
      registryArtifacts.textContent = 'Public route map remains available';
      console.error('Arcturians registry signal:', error);
    }
  };
  renderRegistrySignal();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.identity-reveal').forEach((element) => revealObserver.observe(element));

  if (!canvas) return;
  const context = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let points = [];
  const constellation = [
    [0.08, 0.25], [0.22, 0.46], [0.36, 0.28], [0.52, 0.58], [0.7, 0.34], [0.87, 0.62]
  ];

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(160, Math.max(54, Math.floor(width / 10)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.15 + .18,
      alpha: Math.random() * .42 + .1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * .014 + .002
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.save();
    context.strokeStyle = 'rgba(157, 230, 210, .12)';
    context.lineWidth = 1;
    context.setLineDash([3, 9]);
    context.beginPath();
    constellation.forEach(([x, y], index) => {
      const px = x * width;
      const py = y * height;
      if (index === 0) context.moveTo(px, py); else context.lineTo(px, py);
    });
    context.stroke();
    context.setLineDash([]);
    constellation.forEach(([x, y], index) => {
      context.beginPath();
      context.arc(x * width, y * height, index === 3 ? 2.7 : 1.45, 0, Math.PI * 2);
      context.fillStyle = index === 3 ? 'rgba(239, 115, 79, .8)' : 'rgba(157, 230, 210, .55)';
      context.fill();
    });
    context.restore();

    points.forEach((point) => {
      if (!reduceMotion) point.phase += point.speed;
      context.beginPath();
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      const pulse = reduceMotion ? 0 : Math.sin(point.phase) * .12;
      context.fillStyle = `rgba(234, 242, 240, ${point.alpha + pulse})`;
      context.fill();
    });

    if (!reduceMotion) window.requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
})();
