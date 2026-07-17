# Personal website

A minimal, markdown-based personal site for GitHub Pages.

- **`index.md`** — the landing page. Edit the "about" text here.
- **`photography.md`** — the photography page (the photo roll). It fills itself
  automatically (see below); no editing needed to add photos.
- **`images/photography/`** — drop your photos here. **Any image you add to this
  folder automatically appears in the roll** — no code changes needed. Photos are
  shown in filename order, so prefix names like `01-...`, `02-...` to control
  the order.
- **`images/`** (root) — the site favicon, a LaTeX `\mathcal{V}` rendered to PNG
  (`favicon.ico` + several sizes). Not part of the photo roll.
- **`_layouts/default.html`** — the shared styling (beige background, Cormorant
  Garamond font, favicon) and the photo-roll logic. You rarely need to touch this.
- **`_config.yml`** — site settings.
- **`preview.html`** — a local-only preview so you can see the look without
  deploying (excluded from the published site). Safe to delete.

## The photo roll

The photography page shows one photo at a time in a looping 3D "coverflow": the
centre photo is in front, and the next photos on each side recede into the
background, tilted in 3D. Slide through it by dragging/swiping, using the ‹ ›
arrows or the ← → keys, or by clicking a side photo to bring it to the centre.
Every photo keeps its own aspect ratio (no cropping).

## Publishing to GitHub Pages

1. Create a repository named **`<your-username>.github.io`** on GitHub.
2. Push these files to the `main` branch.
3. In the repo, go to **Settings → Pages** and confirm the source is
   **Deploy from a branch → `main` / (root)**.
4. Your site goes live at `https://<your-username>.github.io` within a minute.

## Editing

Just edit the `.md` files — no build tools needed. Commit and push, and the
site rebuilds automatically.
