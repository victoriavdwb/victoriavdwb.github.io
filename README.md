# Personal website

A minimal, markdown-based personal site for GitHub Pages.

- **`index.md`** — the landing page. Edit the "about" text here.
- **`photography.md`** — the photography page. Edit the intro text here; the
  photo grid fills itself automatically (see below).
- **`images/photography/`** — drop your photos here. **Any image you add to this
  folder automatically appears in the grid** — no code changes needed. Files are
  shown in filename order, so prefix names like `01-...`, `02-...` to control
  order. The `mock-*.jpg` files are placeholders — delete them once you add your
  own.
- **`_layouts/default.html`** — the shared styling (beige background, Cormorant
  Garamond font, 🌿 emoji favicon) and the grid logic. You rarely need to touch this.
- **`_config.yml`** — site settings.
- **`preview.html`** — a local-only preview so you can see the look without
  deploying. Safe to delete.

## The photo grid

Photos are laid out in a borderless, justified grid: each row is filled edge to
edge and every photo keeps its own aspect ratio (portrait, landscape, and square
all sit side by side without cropping between rows). It's responsive and
re-flows on window resize.

## Publishing to GitHub Pages

1. Create a repository named **`<your-username>.github.io`** on GitHub.
2. Push these files to the `main` branch.
3. In the repo, go to **Settings → Pages** and confirm the source is
   **Deploy from a branch → `main` / (root)**.
4. Your site goes live at `https://<your-username>.github.io` within a minute.

## Editing

Just edit the `.md` files — no build tools needed. Commit and push, and the
site rebuilds automatically.
