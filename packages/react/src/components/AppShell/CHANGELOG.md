# Changelog

The AppShell component is the main outer frame of an application. It provides the basic architecture to build an application inside of our admin.

## 2025-03-18 `1.4.2`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2023-12-22 `1.4.1`

#### 🎉 New features

- Update `AppShell` component with new design requirements. ([#91](https://github.com/TiendaNube/nimbus-patterns/pull/91) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-07-18 `1.4.0`

#### 🎉 New features

- Added new `menuProperties` prop to control menu responsiveness. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-15 `1.3.2`

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.3.0`

#### 💡 Others

- This component extends the properties of the `Box` component which has undergone some significant changes, so you should consult the `Box` component documentation when performing this update. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-17 `1.2.1`

### 💡 Others

- Extend `Box` properties inside `AppShell.Header` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

### 🐛 Bug fixes

- Fixed a bug on `AppShell.Header` subcomponent where content on `rightSlot` would fall off to the left when `leftSlot` property was empty. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-04 `1.2.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.1.2`

### 📚 3rd party library updates

- Updated `@nimbus-ds/components@3.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Updated props to match current versions of `components` and `styles`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `1.1.1`

### 📚 Documentation

- Add props documentation. ([#26](https://github.com/TiendaNube/nimbus-patterns/pull/26) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-17 `1.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `@nimbus-ds/components@2.8.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/styles@6.11.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/icons@1.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/button@2.1.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/icon@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/icon-button@3.3.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/tag@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/text@5.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@tiendanube/icons@0.3.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-14 `1.0.1`

### 💡 Others

- Add conditional rendering for `menu` attribute. ([#17](https://github.com/TiendaNube/nimbus-patterns/pull/17) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-10 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/box@2.5.0`. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added new `AppShell` component. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` and `menu` properties to the `AppShell` component API. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories documentation for `AppShell` component. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `AppShell.Header` subcomponent. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `leftSlot` and `rightSlot` properties to the `AppShell.Header` subcomponent API. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
