# Portfolio Website — dragonsenseiguy.github.io

This is the source for my professional portfolio hosted with GitHub Pages.

## Structure
- `index.html` — landing page
- `about.html` — extensive about me
- `projects.html` — projects and contributions
- `technologies.html` — technologies grouped by category
- `assets/css/styles.css` — site styles
- `assets/js/main.js` — small enhancements
- `_config.yml` — GitHub Pages/Jekyll config

## Local preview
You can open the HTML files directly in your browser, or use a simple static server:

```bash
# From this folder
python3 -m http.server 4000
# then visit http://localhost:4000
```

## Deploying on GitHub Pages
1. Create a new public repository named exactly `dragonsenseiguy.github.io` under your account.
2. Push this code to the repository's `main` branch.
3. GitHub Pages will automatically serve it at `https://dragonsenseiguy.github.io`.

If you prefer to use a different repo name, enable Pages from Settings → Pages and choose the branch + root. The included `_config.yml` is compatible with GitHub Pages (no theme, plain static files).

## Customization
- Update copy on each page to reflect new projects or roles.
- Add images to `assets/` and reference them in the pages.
- For more complex sites, consider Jekyll collections or a static site generator, but static HTML works great and loads fast.

