# Changelog

Interactive List allows users to build lists with multiple options that have some kind of interaction. It can be, and is not limited to, checkboxes, radios, toggles and buttons. This component is built on top of the DataList component that allows the creation of scrollable lists with multiple entries of different kinds of data.

## 2025-03-18 `1.3.5`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2023-07-18 `1.3.4`

#### 🐛 Bug fixes

- Adjusted the `toggle` property to contain all properties available in the `InteractiveList.ToggleItemSkeleton` component. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-21 `1.3.3`

#### 🐛 Bug fixes

- Fixed typing of `InteractiveList.CheckboxItem`, `InteractiveList.ButtonItem`, `InteractiveList.RadioItem` and `InteractiveList.ToggleItem` internal components to extend native HTML props. ([#66](https://github.com/TiendaNube/nimbus-patterns/pull/66) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-15 `1.3.2`

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.3.0`

#### 💡 Others

- This component extends the properties of the `Box` component which has undergone some significant changes, so you should consult the `Box` component documentation when performing this update. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-17 `1.2.1`

### 🎉 New features

- Extend `DataList` properties inside `InteractiveList` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.CheckboxItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.RadioItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.ToggleItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `topDivider` property from `DataList.Row` subcomponent inside `InteractiveList.ButtonItem` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-11 `1.2.0`

#### 🎉 New features

- Added new `InteractiveList.StructureSkeleton` subcomponent. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new `InteractiveList.ButtonItemSkeleton` subcomponent. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new `InteractiveList.CheckboxItemSkeleton` subcomponent. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new `InteractiveList.RadioItemSkeleton` subcomponent. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added new `InteractiveList.ToggleItemSkeleton` subcomponent. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))

#### 🐛 Bug fixes

- Fixed bug using Crypto library when generating unique id's for `InteractiveListItem`. ([#38](https://github.com/TiendaNube/nimbus-patterns/pull/38) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-04 `1.1.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@nimbus-ds/components@1.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/components@3.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/icons@1.1.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/data-list@1.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added new `InteractiveList` component. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` prop to the component API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories documentation to storybook. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `InteractiveList.Structure` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `title`, `showTitle`, `description` and `children` props to `InteractiveList.Structure` subcomponente API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `InteractiveList.Row` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` prop to `InteractiveList.Row` subcomponent API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `InteractiveList.CheckboxItem` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `checkbox` prop to `InteractiveList.CheckboxItem` subcomponent API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `InteractiveList.ButtonItem` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `iconButton` prop to `InteractiveList.ButtonItem` subcomponent API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `InteractiveList.RadioItem` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `radio` prop to `InteractiveList.RadioItem` subcomponent API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `InteractiveList.ToggleItem` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Added `toggle` prop to `InteractiveList.ToggleItem` subcomponent API. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
