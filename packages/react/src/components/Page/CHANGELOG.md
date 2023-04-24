# Changelog

Page component allows the user to build application pages with all the necessary attributes for constructing a variety of layouts.

## 2023-04-24 `1.2.2`

#### 🐛 Bug fixes

- Fixed typing of `Page`, `Page.Header` and `Page.Body` components to correctly extend `Box` properties. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed bug where it was not possible to change the paddings of the `Page.Header` and `Page.Body` components. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-17 `1.2.1`

### 💡 Others

- Extend `Box` properties inside `Page` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `Box` properties inside `Page.Header` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Extend `Box` properties inside `Page.Body` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

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
- Removed `@nimbus-ds/box@2.5.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/text@5.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/title@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@tiendanube/icons@0.3.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/tokens@6.0.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-10 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/box@2.5.0`. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/text@5.0.0`. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/title@2.0.0`. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added new `Page` component. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` and `maxWidth` properties to the `Page` component API. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories documentation for `Page` component. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Page.Header` subcomponent. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `title`, `subtitle`, `buttonStack` and `children` properties to the `Page.Header` subcomponent API. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Page.Body` subcomponent. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to the `Page.Body` subcomponent API. ([#16](https://github.com/TiendaNube/nimbus-patterns/pull/16) by [@juanchigallego](https://github.com/juanchigallego))
