# Build

```
npm install
npm run build
```

`npm run build` first runs `node scripts/check-tokens.mjs` (which fails the
build on a `var()` naming a custom property nothing defines) and then
`astro build`.

# Output

`dist`

# Content

This is an Astro static site.

- Pages live in `src/pages/`. The only page is `src/pages/index.astro`, a
  single-page landing site.
- Page styles live in `src/styles/global.css`.
- The vendored design system (tokens and component styles) lives in
  `src/vendor/druks-design-system/` and must not be edited.
- The brand Foundation (stylesheet, logo, license, VERSION) lives in
  `src/foundation/`; its icons live in `public/foundation/icons/`. Do not edit
  these; update them only from a newer release.
- Static assets live in `public/` and are served from the site root, e.g.
  `public/assets/` holds images, fonts, logos, and social cards, and
  `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`.

There are no numbered photos. New images would be stored under `public/assets/`.

# Preview

Upload the Output directory as a new version of the Cloudflare Worker `druks`
with `wrangler versions upload --preview-alias=preview`.

# Production

Approve promotes the previewed version to production. Nothing is built or
uploaded for it.
