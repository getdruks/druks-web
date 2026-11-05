# Foundation token contract

`src/tokens/druks.tokens.json` is the typed source for this contract. `scripts/build.py` validates it against the vendored DTCG schema and generates `dist/druks-base.css`; do not edit the generated stylesheet by hand.

## Included roles

| Public CSS token | Theme values | Contract |
| --- | --- | --- |
| `--druks-color-chart-series-1` through `--druks-color-chart-series-4` | Approved Light and Dark pairs in the token source | Categorical data series only. Each color passes the 3:1 check against the approved surface. Chart labels, category distinction, and non-color alternatives remain part of the consuming chart contract. |
| `--druks-color-scrim` | Light and Dark alpha colors in the token source | Translucent layer behind dialogs. No standalone scrim contrast claim is made. |
| `--druks-shadow-dialog` | Approved structured Light and Dark shadow values in the token source | Shared dialog elevation value. Consumers apply it only where their separately reviewed dialog contract uses this role. |

## Theme resolution

- `:root` supplies Light values.
- `:root[data-theme="dark"]` supplies Dark values.
- With no `data-theme` attribute, `prefers-color-scheme: dark` supplies Dark values; otherwise the root Light values apply.

The generated CSS includes each color and shadow token in all applicable theme branches. Consumers own preference selection and persistence.

## Validation boundaries

- The automated chart gate checks each approved series color against the Foundation surface at 3:1 in Light and Dark.
- The scrim source and alpha are schema-validated and serialized into CSS. The preview composes it over the Foundation background and surface tokens for visual inspection. The Foundation does not treat the alpha color as a foreground/background contrast pair.
- The dialog shadow is schema-validated as a DTCG shadow and checked for correct Light/Dark CSS serialization.
- Consumer chart accessibility and dialog composition remain consumer responsibilities. This Foundation defines tokens, not chart or dialog renderers.
