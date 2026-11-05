# Druks Foundation adoption

The website consumes the vendored, versioned Foundation package at
`public/foundation/v0.1.0/`. `src/styles/tokens.css` imports its generated CSS
directly. Website styles use Foundation's public `--druks-` names without
legacy color aliases. Chart-series, scrim, and dialog-shadow values also come
from the Foundation package. Site-specific layout and diagram-state variables
remain local; composed demo surfaces derive from Foundation tokens.
`npm run foundation:check` verifies bundle checksums and logo source, rejects
unknown Foundation tokens, legacy color aliases, and literal colors in authored
CSS and Astro style blocks, and checks that referenced Foundation assets exist.
The hero canvas uses black RGB channels with `destination-out` as an alpha
cutout mask; those channels erase pixels and do not paint a black overlay or
replace the Foundation scrim token.

The existing theme control selects System, Light, or Dark. System removes
`data-theme`, allowing Foundation CSS to follow `prefers-color-scheme`. The
shared Druks Logo Lockup embeds the package SVG inline so its fills follow the
active theme. Browser favicons follow the effective theme; the install manifest
references Light PWA icons because manifest icons are static metadata.

Run `npm run foundation:check` to verify the vendored files against the package
checksums. `public/foundation/v0.1.0/RELEASE.sha256` records the local candidate
rebuilt from merged Foundation `main` at `5fbc034`; it is not the official
release checksum. Compare it with the published `v0.1.0` release before merge.
Replace the package and rerun the check if the official bundle differs. This PR
must not merge until the release is available and its checksum matches.
