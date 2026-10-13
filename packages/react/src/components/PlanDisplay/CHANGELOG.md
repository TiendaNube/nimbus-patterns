# Changelog

PlanDisplay allows the user to present subscription plans and pricing. It features internal components to build plan cards with headers, prices, feature bullets, and footers — including featured-plan and gradient variants.

## 2026-10-13 `1.2.1`

### 🐛 Bug fixes

- Fixed `PlanDisplay.Card` crashing in production with `TypeError: Cannot read properties of undefined (reading 'createElement')` in applications that minify the package with SWC (e.g. Next.js with `swcMinify: true`). The surface treatment (ribbon, deprecated `highlighted`, default) is now selected from module-level constants instead of a helper function, so the published bundle no longer contains the inlined function that SWC re-inlined with a local variable shadowing the React import. No visual or API changes. ([#203](https://github.com/TiendaNube/nimbus-patterns/pull/203) by [@prescillahurbin-tiendanube](https://github.com/prescillahurbin-tiendanube))

## 2026-09-01 `1.2.0`

#### 🎉 New features

- Reworked `PlanDisplay` to the Plans 2.0 design as the canonical layout, matching the Figma master component. `PlanDisplay.Card` now renders the default card with a level-2 shadow, plus two opt-in variants: `ribbonLabel` (a "Más escogido" ribbon with a primary 2px border) and `gradient` (primary-surface → background gradient). The legacy `highlighted` prop remains available with its original treatment for backwards compatibility, but is deprecated in favor of the new variants. Added a `tag` slot on `PlanDisplay.Header` (e.g. "Plan actual"), a new `PlanDisplay.Price` subcomponent (current price + optional previous price, period and annual note), a `badge` slot on `PlanDisplay.Bullet` (e.g. "Nuevo"), and an `icon` slot on `PlanDisplay.Footer` for add-on rows. ([#170](https://github.com/TiendaNube/nimbus-patterns/pull/170) by [@noecondoleo](https://github.com/noecondoleo))

## 2026-01-15 `1.1.1`

#### 📚 3rd party library updates

- Extends support to React 19. ([#138](https://github.com/TiendaNube/nimbus-patterns/pull/138) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-05 `1.1.0`

### 🐛 Bug fixes

- Improved `PlanDisplay` mobile layout. ([#120](https://github.com/TiendaNube/nimbus-patterns/pull/120) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `1.0.4`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2024-03-06 `1.0.1`

- Fixed `PlanDisplay` not working on NextJS because of PlanDisplayBullet not being HTML semantically correct. ([#99](https://github.com/TiendaNube/nimbus-patterns/pull/99) by [@joacotornello](https://github.com/joacotornello))
