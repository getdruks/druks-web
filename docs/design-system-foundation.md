# Druks Foundation adoption

The website consumes the vendored, versioned Foundation package at
`public/foundation/v0.1.0/`. `src/styles/tokens.css` imports its generated CSS
directly. Existing website token names are semantic aliases to Foundation
roles; website-only chart colors, scrim, and dialog shadow remain local.

The existing theme control selects System, Light, or Dark. System removes
`data-theme`, allowing Foundation CSS to follow `prefers-color-scheme`. The
shared Druks Logo Lockup embeds the package SVG inline so its fills follow the
active theme. Browser favicons follow the effective theme; the install manifest
references Light PWA icons because manifest icons are static metadata.

Run `npm run foundation:check` to verify the vendored files against the package
checksums. The current expected bundle checksum is recorded in
`public/foundation/v0.1.0/RELEASE.sha256` and is from the local Foundation
candidate. Before this PR is merge-ready, compare it with the published
`v0.1.0` release from the merged Foundation repository. If the published bundle
checksum differs, replace the vendored package and rerun the check. This PR
must not merge before the Foundation release is available and the checksum
matches.
