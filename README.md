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

Safari tab coloring uses the solid red top edge of the fixed navigation, with a matching red document canvas and `theme-color` (`#E83E31`). Keep these colors aligned and retain the white main-content background. Metadata alone is insufficient: [MDN's compatibility data](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color#browser_compatibility) notes that Safari 26 onward only uses `theme-color` for installed web apps, while [WebKit's page color sampler](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/page/PageColorSampler.cpp) samples the rendered page top. Safari's tab layout and “Show color in tab bar” setting ultimately control its browser UI. A headless page screenshot cannot verify the Safari tab strip itself.
