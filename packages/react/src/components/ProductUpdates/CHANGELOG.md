# Changelog

ProductUpdates component allows the user to showcase new features or updates in a non-distractive way by displaying the information in a floating popover with a high-contrast setting that catches the eye of the user.

## 2026-03-04 `1.6.1`

#### 🐛 Bug fixes

- Fixed `className` prop not being passed through to the underlying element. ([#156](https://github.com/TiendaNube/nimbus-patterns/pull/156) by [@joacotornello](https://github.com/joacotornello))

## 2026-03-02 `1.6.0`

### 🎉 New features

- Added `ProductUpdates.Paginator` and `ProductUpdates.Footer` as compound sub-components. ([#155](https://github.com/TiendaNube/nimbus-patterns/pull/155) by [@joacotornello](https://github.com/joacotornello))
- Added `tag` prop to render an optional element inline before the title. ([#155](https://github.com/TiendaNube/nimbus-patterns/pull/155) by [@joacotornello](https://github.com/joacotornello))
- Added `bodyContentProps` prop to pass extra properties to the popover body container. ([#155](https://github.com/TiendaNube/nimbus-patterns/pull/155) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-15 `1.5.1`

#### 📚 3rd party library updates

- Extends support to React 19. ([#138](https://github.com/TiendaNube/nimbus-patterns/pull/138) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `1.5.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2023-10-17 `1.4.3`

#### 🐛 Bug fixes

- Fixed externally controlled visibility working correctly. ([#80](https://github.com/TiendaNube/nimbus-patterns/pull/80)

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-04 `1.3.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.2.3`

### 📚 3rd party library updates

- Updated `@nimbus-ds/components@3.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Updated props to match current versions of `components` and `styles`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `1.2.2`

- Add props documentation. ([#26](https://github.com/TiendaNube/nimbus-patterns/pull/26) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-02 `1.2.1`

### 📚 3rd party library updates

- Updated `@nimbus-ds/components@2.10.0`. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/styles@6.13.0`. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-17 `1.2.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `@nimbus-ds/components@2.8.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/styles@6.11.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/icons@1.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/box@2.4.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/icon-button@3.3.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/link@3.1.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/popover@2.1.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/text@5.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@tiendanube/icons@0.3.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-10 `1.1.0`

- Removed `@nimbus-ds/stack`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/box@2.4.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-01-24 `1.0.0`

### 📚 Documentation

### 📚 3rd party library updates

- Added `@nimbus-ds/box@2.1.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/icon-button@3.3.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/link@3.1.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/popover@2.1.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/stack@2.0.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/text@5.0.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@tiendanube/icons@0.3.2`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `title`, `text`, `bodyContent` and `dismissLink` properties to the Component. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
- Added story documentation in Storybook. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))
