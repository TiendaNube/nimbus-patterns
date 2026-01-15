# Changelog

The Menu component allows the user to create in-app menus that navigate through different sections of an application.

## 2026-01-15 `2.0.2`

#### 📚 3rd party library updates

- Extends support to React 19. ([#138](https://github.com/TiendaNube/nimbus-patterns/pull/138) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-10 `2.0.1`

#### 💡 Others

- Improved menu items alignment when menu is collapsed. ([#133](https://github.com/TiendaNube/nimbus-patterns/pull/133) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-04 `2.0.0`

#### 🛠 Breaking changes

- Renamed `showTooltipsWhenCollapsed` prop to `showPopoversWhenCollapsed` in `Menu` component. ([#131](https://github.com/TiendaNube/nimbus-patterns/pull/131) by [@joacotornello](https://github.com/joacotornello))

#### 🎉 New features

- Adds support for popovers inside `MenuButton.Accordion` component. ([#131](https://github.com/TiendaNube/nimbus-patterns/pull/131) by [@joacotornello](https://github.com/joacotornello))

## 2025-10-09 `1.7.0`

#### 🎉 New features

- Added `showTooltipsWhenCollapsed` prop to control tooltip visibility for menu buttons when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Added `tooltipsPosition` prop to control tooltip position for menu buttons when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))

#### 💡 Others

- Extended `MenuExpandContext` with `showTooltipsWhenCollapsed` and `tooltipsPosition` properties to support tooltip configuration. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-30 `1.6.2`

#### 💡 Others

- Disabled enforce check for `useMenuExpandContext` hook in `MenuBody` component to ensure backward compatibility with clients that were not using the `<Menu>` component as wrapper of `Menu` subcomponents. ([#127](https://github.com/TiendaNube/nimbus-patterns/pull/127) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-28 `1.6.1`

#### 💡 Others

- Disabled enforce check for `useMenuExpandContext` hook to ensure backward compatibility with clients that were not using the `<Menu>` component as wrapper of `Menu` subcomponents. ([#126](https://github.com/TiendaNube/nimbus-patterns/pull/126) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-08 `1.6.0`

#### 🎉 New features

- Added `expanded` prop support for Menu component. ([#117](https://github.com/TiendaNube/nimbus-patterns/pull/117) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-05 `1.5.7`

#### 💡 Others

- Updated MenuFooter ChevronRightIcon size from 14px to 16px for visual consistency with MenuButton icons. ([#115](https://github.com/TiendaNube/nimbus-patterns/pull/115) by [@noecondoleo](https://github.com/noecondoleo) [@FedeTrevi-se](https://github.com/FedeTrevi-se))

## 2025-03-18 `1.5.6`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2023-12-18 `1.5.3`

### 🎉 New features

- Adjust padding of `MenuBody` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust padding and icon sizing on `MenuFooter` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust colors and padding on `MenuSection` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-06-15 `1.5.2`

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.5.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-08 `1.3.0`

### 🎉 New features

- Added `as` property to the `MenuButton.Accordion` component API. ([#50](https://github.com/TiendaNube/nimbus-patterns/pull/50) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-24 `1.2.1`

#### 🐛 Bug fixes

- Renamed `controlled` property to `open` in `MenuButton.Accordion` component API. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the background color of the `MenuButton.Accordion` component when it is open. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-18 `1.2.0`

#### 🎉 New features

- Added `Menu.ButtonAccordion` subcomponent. ([#44](https://github.com/TiendaNube/nimbus-patterns/pull/44) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.1.2`

### 📚 3rd party library updates

- Updated `@nimbus-ds/components@3.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Updated props to match current versions of `components` and `styles`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `1.1.1`

### 📚 Documentation

- Add props documentation. ([#26](https://github.com/TiendaNube/nimbus-patterns/pull/26) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-04 `1.2.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@nimbus-ds/icons@1.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-17 `1.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `@nimbus-ds/components@2.8.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/styles@6.11.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/icons@1.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/icon@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/text@5.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/box@2.4.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@tiendanube/icons@0.3.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/tokens@6.0.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-10 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/box@2.4.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/menubutton@1.0.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/text@5.0.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/tokens@6.0.1`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@tiendanube/icons@0.3.2`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `Menu` component. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to the component API. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories documentation to Storybook. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Menu.Body` subcomponent. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to `Menu.Body` subcomponente API. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Menu.Footer` subcomponent. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Menu.Header` subcomponent. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to `Menu.Header` subcomponent API. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Menu.Section` subcomponent. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Added `title` and `children` properties to `Menu.Section` subcomponent API. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
