# Changelog

EmptyApp allows the user to build marketing-style landing pages for apps. It features internal components meant to build hero sections, content sections with images and text with features, and payment plans.

## 2026-08-18 `2.0.0`

#### 🛠 Breaking changes

- Removed the `highlighted` prop from `PlanDisplay.Card`. Migrate to the new `ribbonLabel` and/or `gradient` props for plan emphasis — see the usage examples in `PlanDisplay.spec.md`. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))
- `PlanDisplay.Bullet`'s `disabled`/`unavailableLabel` contract is now a discriminated union: passing `disabled` now requires a localized `unavailableLabel` string, exposed only to assistive technology. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))

#### 🎉 New features

- Added `PlanDisplay.Price` to present the current price, previous price, billing period, and an annual note with a consistent, accessible reading order. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))
- Added `ribbonLabel` and `gradient` to `PlanDisplay.Card` for plan emphasis, with a default level-2 shadow and reserved ribbon space so cards stay aligned across a comparison. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))
- Added `tag` to `PlanDisplay.Header`, rendered next to the subtitle. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))
- Added `badge` to `PlanDisplay.Bullet`, rendered inline after the bullet's content. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))
- Added `icon` to `PlanDisplay.Footer`, rendered before the footer's content. ([#186](https://github.com/TiendaNube/nimbus-patterns/pull/186) by [@claude[bot]](https://github.com/apps/claude))

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
