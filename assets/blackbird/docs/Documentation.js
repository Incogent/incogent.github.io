(() => {
  const navigation = document.querySelector('.docs-navigation');
  if (!navigation) return;
  const panels = [...navigation.children];
  const mobile = matchMedia('(max-width:45rem)');
  const sync = () => panels.forEach(panel => { panel.open = !mobile.matches; });
  sync();
  mobile.addEventListener('change', sync);
  const header = document.querySelector('.site-header');
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--docs-header-height', `${header.getBoundingClientRect().height}px`);
  }).observe(header);
  for (const panel of panels) {
    panel.addEventListener('toggle', () => {
      if (mobile.matches && panel.open) {
        for (const other of panels) if (other !== panel) other.open = false;
      }
    });
  }
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!mobile.matches || !link) return;
    panels.forEach(panel => { panel.open = false; });
    if (link.hash && link.pathname === location.pathname) {
      const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (!mobile.matches || event.key !== 'Escape') return;
    const panel = panels.find(panel => panel.open);
    if (panel) {
      panel.open = false;
      panel.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (mobile.matches && !navigation.contains(event.target)) panels.forEach(panel => { panel.open = false; });
  });
})();

(() => {
  const input = document.getElementById('docs-search');
  if (!input) return;
  const results = document.getElementById('docs-search-results');
  const sections = document.getElementById('docs-sections');
  const status = document.getElementById('docs-search-status');
  let index;
  let request;
  input.addEventListener('input', async () => {
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();
    sections.hidden = Boolean(query);
    status.textContent = query ? 'Searching…' : '';
    if (!query) return;
    try {
      request ??= fetch(input.dataset.index).then(r => {
        if (!r.ok) throw new Error('Index unavailable');
        return r.json();
      });
      index ??= await request;
      if (query !== input.value.trim().toLowerCase()) return;
      const terms = query.split(/\s+/);
      const matches = index.filter(p => terms.every(t => (p.title + ' ' + p.text).toLowerCase().includes(t)));
      status.textContent = matches.length + (matches.length === 1 ? ' guide found' : ' guides found');
      for (const page of matches) {
        const link = document.createElement('a');
        link.href = page.url;
        link.textContent = page.title;
        results.append(link);
      }
    } catch {
      request = undefined;
      status.textContent = 'Search is unavailable. Browse the sections below.';
      sections.hidden = false;
    }
  });
})();

(() => {
  const input = document.getElementById('docs-media-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    for (const section of document.querySelectorAll('#docs-media-items > section')) {
      section.hidden = !section.textContent.toLowerCase().includes(query);
    }
  });
})();
