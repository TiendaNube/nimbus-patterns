# Changelog

MenuButton component is meant to be used inside Menus and navigation, and allows the user to navigate between different sections of an application.

## 2025-08-08 `1.8.0`

#### 🎉 New features

- Added `expanded` prop support for MenuButton and MenuButtonAccordion components. ([#117](https://github.com/TiendaNube/nimbus-patterns/pull/117) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-05 `1.7.0`

#### 🎉 New features

- Updated MenuButton icon size from 14px to 16px for better visual consistency. ([#115](https://github.com/TiendaNube/nimbus-patterns/pull/115) by [@noecondoleo](https://github.com/noecondoleo) [@FedeTrevi-se](https://github.com/FedeTrevi-se))

## 2025-03-18 `1.6.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2024-02-07 `1.5.5`

### 🎉 New features

- Add `wordBreak="break-all"` property to allow overflowing text to be trimmed at any position. ([#94](https://github.com/TiendaNube/nimbus-patterns/pull/94) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-01-09 `1.5.4`

#### 🐛 Bug fixes

- Remove visual focus box-shadow from `MenuButton` component because it visually hints the element is on focus even after an action has been performed. ([#93](https://github.com/TiendaNube/nimbus-patterns/pull/93) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-18 `1.5.3`

### 🎉 New features

- Adjust component padding and size of the icon child. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust padding on `MenuButtonAccordion` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-06-15 `1.5.2`

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.5.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-08 `1.4.0`

### 🎉 New features

- Added `as` property to the `MenuButton.Accordion` component API. ([#50](https://github.com/TiendaNube/nimbus-patterns/pull/50) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-24 `1.3.1`

#### 🐛 Bug fixes

- Renamed `controlled` property to `open` in `MenuButton.Accordion` component API. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the background color of the `MenuButton.Accordion` component when it is open. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-12 `1.3.0`

#### 🎉 New features

- Added `MenuButton.Accordion` subcomponent. ([#44](https://github.com/TiendaNube/nimbus-patterns/pull/44) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-04 `1.2.0`

#### 🎉 New features

- Added `as` property to the `MenuButton` component API. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Added `@nimbus-ds/typings@1.1.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.1.2`

### 📚 3rd party library updates

- Updated `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Updated props to match current versions of `components` and `styles`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `1.1.1`

### 📚 Documentation

- Add props documentation. ([#26](https://github.com/TiendaNube/nimbus-patterns/pull/26) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-17 `1.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/#15) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `@nimbus-ds/components@2.8.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/styles@6.11.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/icons@1.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/icon@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/text@5.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/box@2.4.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@tiendanube/icons@0.3.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-10 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/icon@2.0.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/box@2.4.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/text@5.0.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/tokens@6.0.1`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@tiendanube/icons@0.3.2`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `MenuButton` component. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `label`, `onClick`, `startIcon`, `active` and `children` properties to the `MenuButton` component API. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added story documentation in Storybook. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
