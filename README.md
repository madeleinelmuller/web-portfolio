# Madeleine Muller’s portfolio

A static website for AI research, design, dance, and photography. The page renders directly from HTML, with local fonts, images, and a small JavaScript enhancement for image viewing and navigation. It needs no package installation or build step.

Run locally from this checkout:

```sh
python3 -m http.server 8000
```

- `index.html` contains the content, navigation, awards, and photography gallery.
- `Assets/base.css` defines the original typography and brand colors; `Assets/site.css` adds responsive layouts and the image viewer.
- `Assets/site.js` enhances the native navigation and full-resolution photo/award links. The core content and links remain usable without JavaScript.
- `Photography/photos.json` records capture metadata and gallery order. Keep it consistent with the gallery markup when adding photos.
- `Photography/*.jpg` retain the supplied photos’ full pixel dimensions. Original HEIC files, including HDR gain maps where present, live in `Photography/originals/`.

GitHub Pages publishes the repository root from `main`. Follow `AGENTS.md` for the authorized validation, automatic merge, and deployment workflow.
