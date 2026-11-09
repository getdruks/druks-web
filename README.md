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

## Design Foundation

The Druks design Foundation supplies the color tokens, the logo, and the icons.
`src/foundation/` holds the stylesheet, the logo, and the license, and
`VERSION` names the release. `public/foundation/icons/` holds the icons that
`index.astro` and `site.webmanifest` use. Do not edit these files. To update
them, copy the same files from a newer release.
