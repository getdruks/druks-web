# druks-web

Static marketing site for Druks.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run build
```

`build` first fails on a `var()` that names a custom property nothing defines.
It does not check the vendored design system.

## Design Foundation

The Druks design Foundation supplies the logo, its color tokens, and the icons.
`src/foundation/` holds the stylesheet, the logo, and the license, and
`VERSION` names the release. `public/foundation/icons/` holds the icons that
`index.astro` and `site.webmanifest` use. Do not edit these files. To update
them, copy the same files from a newer release.

## Design System

`src/vendor/druks-design-system/` holds the tokens and component styles that
the page uses. They are copied byte for byte from the approved design-system
source. Do not edit these files. Update them only from that source.

The page design comes from `getdruks/druks-web-v2`. `src/styles/global.css`
holds its page styles.
