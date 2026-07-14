# Changelog

EmptyApp allows the user to build marketing-style landing pages for apps. It features internal components meant to build hero sections, content sections with images and text with features, and payment plans.

## 2026-06-11 `2.0.0`

### ✨ Features

- Reworked `PlanDisplay` to the Plans 2.0 design as the canonical layout, matching the Figma master component. `PlanDisplay.Card` now renders the default card with a level-2 shadow, plus two opt-in variants: `ribbonLabel` (a "Más escogido" ribbon with a primary 2px border) and `gradient` (primary-surface → background gradient). Added a `tag` slot on `PlanDisplay.Header` (e.g. "Plan actual"), a new `PlanDisplay.Price` subcomponent (current price + optional previous price, period and annual note), a `badge` slot on `PlanDisplay.Bullet` (e.g. "Nuevo"), and an `icon` slot on `PlanDisplay.Footer` for add-on rows. (by [@noecondoleo](https://github.com/noecondoleo))

### ⚠️ Breaking changes

- Removed the legacy `highlighted` prop on `PlanDisplay.Card`. Use `ribbonLabel` for the featured plan or `gradient` for the gradient variant. (by [@noecondoleo](https://github.com/noecondoleo))

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
