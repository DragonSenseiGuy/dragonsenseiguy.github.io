// Progressive enhancement + theme toggle with system sync and persistence
(function () {
  const setActive = () => {
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('a[data-nav]')?.forEach(a => {
      if (a.getAttribute('href').endsWith(here)) {
        a.classList.add('active');
      }
    });
  };

  const MODE_KEY = 'theme-mode'; // 'system' | 'light' | 'dark'
  const LEGACY_KEY = 'theme-preference'; // legacy: 'light' | 'dark'
  const mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  let systemListenerAttached = false;
  const systemChangeHandler = () => {
    const mode = getMode();
    if (mode === 'system') applyTheme(resolveTheme(mode));
  };

  const getMode = () => {
    const storedMode = localStorage.getItem(MODE_KEY);
    if (storedMode === 'system' || storedMode === 'light' || storedMode === 'dark') return storedMode;
    // Back-compat: migrate legacy preference to explicit mode
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === 'light' || legacy === 'dark') {
      localStorage.setItem(MODE_KEY, legacy);
      return legacy;
    }
    return 'system';
  };

  const resolveTheme = (mode) => {
    if (mode === 'system') return (mql && mql.matches) ? 'dark' : 'light';
    return mode; // 'light' | 'dark'
  };

  const applyTheme = (effectiveTheme) => {
    const root = document.documentElement;
    if (effectiveTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (effectiveTheme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      // system: remove explicit to let CSS @media control it
      root.removeAttribute('data-theme');
    }
    const btns = document.querySelectorAll('[data-theme-toggle]');
    btns.forEach(btn => btn.setAttribute('aria-pressed', effectiveTheme === 'dark' ? 'true' : 'false'));
  };

  const ensureSystemListener = (mode) => {
    if (!mql) return;
    if (mode === 'system' && !systemListenerAttached) {
      if (mql.addEventListener) mql.addEventListener('change', systemChangeHandler);
      else if (mql.addListener) mql.addListener(systemChangeHandler); // Safari fallback
      systemListenerAttached = true;
    }
    if (mode !== 'system' && systemListenerAttached) {
      if (mql.removeEventListener) mql.removeEventListener('change', systemChangeHandler);
      else if (mql.removeListener) mql.removeListener(systemChangeHandler);
      systemListenerAttached = false;
    }
  };

  const cycleMode = () => {
    const current = getMode();
    const next = current === 'system' ? 'dark' : current === 'dark' ? 'light' : 'system';
    localStorage.setItem(MODE_KEY, next);
    ensureSystemListener(next);
    // For 'system', pass a special value to clear explicit override
    applyTheme(next === 'system' ? 'system' : resolveTheme(next));
  };

  const wireToggleButtons = () => {
    document.querySelectorAll('[data-theme-toggle]')?.forEach(btn => {
      btn.addEventListener('click', cycleMode);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cycleMode(); }
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    setActive();
    const mode = getMode();
    ensureSystemListener(mode);
    applyTheme(resolveTheme(mode));
    wireToggleButtons();
  });
})();

