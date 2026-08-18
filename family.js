const familyPath = '/content/family.json';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function statusChip(status) {
  return `<span class="chip" data-state="${escapeHtml(status)}">${escapeHtml(status)}</span>`;
}

function itemCard(item) {
  const tags = (item.tags || []).slice(0, 3).join(' · ');
  const isExternal = /^https?:\/\//.test(item.url);
  const target = isExternal ? ' target="_blank" rel="noopener"' : '';
  return `<article class="card">
    <div class="meta">${statusChip(item.status)}<span class="chip">${escapeHtml(item.kind)}</span></div>
    <h3><a href="${escapeHtml(item.url)}"${target}>${escapeHtml(item.title)}</a></h3>
    <p>${escapeHtml(item.summary)}</p>
    <small>${escapeHtml(tags)}</small>
  </article>`;
}

async function renderRegistry() {
  const target = document.querySelector('[data-family-registry]');
  if (!target) return;
  target.innerHTML = '<p class="notice">Loading the family registry…</p>';
  try {
    const response = await fetch(familyPath, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Registry request failed (${response.status})`);
    const registry = await response.json();
    const filter = target.dataset.familyRegistry;
    const items = registry.items.filter((item) => !filter || item.kind === filter || item.id === filter);
    target.innerHTML = items.map(itemCard).join('') || '<p class="notice">No registry records match this view yet.</p>';
  } catch (error) {
    target.innerHTML = '<p class="notice"><strong>Registry unavailable.</strong> The public catalog could not be loaded. Please use the source links in the footer.</p>';
    console.error('Arctura family registry:', error);
  }
}

document.addEventListener('DOMContentLoaded', renderRegistry);
