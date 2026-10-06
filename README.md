# ClearView landing page

A single-page site for **ClearView**, an all-in-one Android app for safer browsing,
focused media, productivity and everyday tools.

Dark, quiet and product-render shaped: near-black canvas (`#0B1214`) with a single
neon-teal accent (`#00E0D2`), Montserrat headings, Inter body copy, and screenshots
shown inside thin-bezel phone frames.

**Stack:** React 19 + Vite + Tailwind CSS v4. No component library, no icon font.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # writes dist/
npm run preview    # serve the built site locally
```

## Hosting

The build is a plain static bundle — `dist/` can go anywhere.

1. `npm run build`
2. Upload the contents of `dist/` to your host.

- **Netlify / Vercel / Cloudflare Pages** — build command `npm run build`, publish
  directory `dist`. Nothing else to configure.
- **GitHub Pages** — push `dist/` to the `gh-pages` branch (or point Pages at a
  `/docs` build output). `vite.config.js` sets `base: './'`, so the site works
  from a project subpath like `user.github.io/clearview-web/` with no changes.
- **Any web host / S3 / nginx** — copy `dist/` into the web root. It is fully
  static; there is no server component.

After deploying, make `og:image` and the canonical link in `index.html` absolute
(crawlers ignore relative URLs for social previews).

To regenerate the share card (`public/og.png`) after changing the copy:

```bash
python tools/make-og.py    # needs Pillow + numpy, run from the project root
```

## Layout of the code

```
index.html                 meta tags, Open Graph, fonts, favicon links
public/images/*.jpeg       the app screenshots (optimised, long edge 1000px)
public/logo.png            the app mark, on its white tile (header + footer)
public/favicon-32.png      the same mark, corners rounded, for the browser tab
public/apple-touch-icon.png
tools/make-logo.py         generates the three logo assets from temp/1.jpeg
public/og.png              1200x630 social share card
src/index.css              the only stylesheet — tokens, phone frames, glow,
                           reveal animation, lightbox
src/data/content.js        all copy + screenshot metadata (single source of truth)
src/hooks/useReveal.js     IntersectionObserver scroll reveals
src/components/            Header, Hero, Section, Cluster, Phone, Gallery,
                           Lightbox, FinalCta, Footer, icons
tools/make-og.py           generates public/og.png
```

### Changing copy or screenshots

Everything editable lives in `src/data/content.js`:

- `SCREENS` — one entry per screenshot: file name, real pixel size and the alt text.
- `SECTIONS` — the five product sections, their copy, which side the text sits on,
  and the phone arrangement (`y` offset, `r` rotation, `mx` overlap per phone).
- `GALLERY` — the order of the screenshot strip.

To add a screen: drop the file into `public/images/`, add a `SCREENS` entry, then
reference its key from a section's `cluster` and from `GALLERY`.

## Notes

- **`temp/1.jpeg` is the app logo, not a screen.** It is a heart split black and
  red on a white background, so it is used as the brand mark rather than as a
  gallery screenshot: it appears in the header, in the footer, as the favicon and
  in the share card. `tools/make-logo.py` rebuilds those assets from it — rerun it
  if the logo is ever replaced. As delivered it keeps its white background:
  `public/logo.png` is the heart centred on a 300x300 white tile, and the header
  and footer round the corners with CSS.
- The gallery holds the 15 screens, so it renders `{items.length}` of them. Adding
  one back is a one-line change in `SCREENS` + `GALLERY`.
- The Quran section has two screens (reminder + surah list). There is no separate
  full-page reading-view screenshot in the upload, so the reminder screen — which
  already shows a verse with its ayah position and copy controls — carries that part.
- Screens are assigned to sections by what they actually show, matched against the
  app's own screen titles.
- Images are lazily loaded, and every one has descriptive alt text. Phone frames
  carry real `width`/`height` so nothing shifts while they load.
- Tested at 390px wide and at desktop width: no horizontal overflow, and every
  reveal element fades in. `prefers-reduced-motion` is honoured — content appears
  immediately and no transitions run.
