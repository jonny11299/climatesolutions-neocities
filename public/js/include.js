// js/include.js
(() => {
  const injectPartials = async () => {
    const targets = Array.from(document.querySelectorAll('[data-include]'));
    if (!targets.length) return;

    const get = async (url) => {
      const r = await fetch(url, { credentials: 'same-origin' });
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.text();
    };

    // Replace placeholders with fetched HTML
    for (const el of targets) {
      const url = el.getAttribute('data-include');
      try {
        const html = await get(url);
        el.outerHTML = html;
      } catch (e) {
        console.warn('Include failed:', url, e);
      }
    }

    // Highlight active link
    const page = document.body.dataset.page;
    const map = {
      home: 'index.html',
      solutions: 'solutions.html',
      blog: 'blog.html',
      refs: 'references.html',
      contact: 'contact.html'
    };
    const href = map[page];
    if (href) {
      const a = document.querySelector(`nav.site-nav a[href="${href}"]`);
      if (a) a.classList.add('is-active');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectPartials);
  } else {
    injectPartials();
  }
})();
