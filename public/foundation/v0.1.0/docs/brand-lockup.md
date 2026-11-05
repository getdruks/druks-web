# Brand lockup

Shared visual contract for the full Druks Logo Lockup. One canonical SVG contains the outlined wordmark and dragon geometry. Its fills refer to separate semantic CSS tokens, so Light, Dark, and consumer theme overrides use the same SVG. Consumers do not render the wordmark with a font. The stylesheet sets one shared height, and the SVG retains its intrinsic aspect ratio.

## Markup

Inline the exact artwork from [`src/assets/brand-lockup.svg`](../src/assets/brand-lockup.svg) inside the named link or other container. Do not reference this file through `<img>` or create separate Light/Dark logo files: external SVG images cannot inherit the page's CSS custom properties.

```html
<a class="brand-lockup" href="/" aria-label="Druks home">
  <svg aria-hidden="true" viewBox="0 0 1280 423.21" ...>
    <!-- Use the full path data from src/assets/brand-lockup.svg. -->
  </svg>
</a>
```

For non-link use, keep the logo decorative when nearby text supplies the identity. Consumers own link destinations, accessible names, and surrounding layout. The Favicon is a separate first-class base asset contract using the dragon-only artwork; see [Favicon](favicon.md).

## Contract

| Part | Contract |
| --- | --- |
| `.brand-lockup` | Inline flex, vertically centered, no wrapping; no live-text wordmark or font dependency. |
| `.brand-lockup svg` | Full outlined Druks logo; `block-size` is `--druks-identity-logo-height`; inline size stays `auto` so the supplied aspect ratio is preserved. |
| Default size | `--druks-identity-logo-height: 40px`; the full lockup is about 120.98px wide at the supplied 1280 × 423.21 viewBox. |
| Theme | Wordmark uses `--druks-color-text-primary`; dragon uses `--druks-color-brand-mark`. Both follow the base CSS Light, Dark, and System resolution. |
| Accessibility | SVG is decorative inside an accessible named container. |
| Contrast | Dragon mark must meet 3:1 against each applicable composed surface. The wordmark is outlined logo artwork and is not live text. |

## Token dependencies

- `--druks-identity-logo-height`
- `--druks-color-brand-mark`
- `--druks-color-text-primary`


## Consumer boundary

Consumers inline the same SVG asset and use the shared size token. They retain their own link destination, accessible name, and layout. Consumer integration uses a versioned release and a separately reviewed migration. This repository provides no React renderer or application behavior.
