# Changelog

Nimbus is an open-source Design System created by Tiendanube / Nuvesmhop’s team to empower and enhance more stories every day, with simplicity, accessibility, consistency and performance.

## 2023-04-17 `1.1.1`

#### 🎉 New features

- Added new `DataTable.Cell` subcomponent. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added `bottomDivider` property to `DataList` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added `topDivider` property to `DataList.Row` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `DataList` properties inside `InteractiveList` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.CheckboxItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.RadioItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.ToggleItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.ButtonItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `HelpLink` component. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added `link` property to the `HelpLink` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories documentation for `HelpLink` component. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

#### 💡 Others

- Extend `Box` properties inside `Page` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `Box` properties inside `Page.Header` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `Box` properties inside `Page.Body` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `Box` properties inside `AppShell.Header` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ariaLabel` property to `NavTabs.Item` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added `stressed` story to `CalloutCard` stories documentation. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

#### 🐛 Bug fixes

- Fixed a bug on `AppShell.Header` subcomponent where content on `rightSlot` would fall off to the left when `leftSlot` property was empty. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Fixed a bug on `CalloutCard` component where the icon would incorrectly stretch and warp when the text was too long. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-11 `1.1.0`

#### 🎉 New features

- Added new subcomponent `InteractiveList.StructureSkeleton` in component `InteractiveList`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new subcomponent `InteractiveList.ButtonItemSkeleton` in component `InteractiveList`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new subcomponent `InteractiveList.CheckboxItemSkeleton` in component `InteractiveList`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new subcomponent `InteractiveList.RadioItemSkeleton` in component `InteractiveList`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new subcomponent `InteractiveList.ToggleItemSkeleton` in component `InteractiveList`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))

#### 🐛 Bug fixes

- Fixed bug using Crypto library when generating unique id's for `InteractiveListItem`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-06 `1.0.0`

#### 🎉 New features

- Added `@nimbus-ds/app-shell` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/callout-card` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/data-list` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/data-table` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/empty-message` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/formfield` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/interactive-list` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/layout` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/menu` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/menubutton` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/nav-tabs` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/page` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/productupdates` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/sidemodal` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/thumbnail-with-action` to pattern pack. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Added `@nimbus-ds/components@4.x`. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/icons@1.x`. ([#33](https://github.com/TiendaNube/nimbus-patterns/pull/33) by [@juniorconquista](https://github.com/juniorconquista))
