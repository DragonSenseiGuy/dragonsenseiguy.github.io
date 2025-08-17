// Inline-safe theme bootstrap to avoid flash of wrong theme
(function(){
  try {
    var MODE_KEY = 'theme-mode';
    var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var mode = localStorage.getItem(MODE_KEY);
    var theme;
    if (mode === 'light' || mode === 'dark') {
      theme = mode;
    } else {
      theme = (mql && mql.matches) ? 'dark' : 'light';
      // don't set localStorage here; keep default as system
    }
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme','dark');
    } else if (theme === 'light') {
      document.documentElement.setAttribute('data-theme','light');
    }
  } catch(e) {}
})();

