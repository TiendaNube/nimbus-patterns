# Changelog

DataTable is a highly versatile component used to organize large quantities of tabular data. It supports pagination to help navigate through the data easily and efficiently, and also allows the user to sort and filter the data by columns. Additionally, it offers the ability to select one or multiple rows using checkboxes, which can be useful for performing batch actions or manipulating the data in other ways.

## 2026-01-15 `1.2.7`

#### 📚 3rd party library updates

- Extends support to React 19. ([#138](https://github.com/TiendaNube/nimbus-patterns/pull/138) by [@joacotornello](https://github.com/joacotornello))

## 2025-12-23 `1.2.6`

#### 🎉 New features

- Added `containerProps` prop to `DataTable` component

## 2025-03-18 `1.2.5`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2023-07-18 `1.2.3`

#### 🐛 Bug fixes

- Adjusted the `pagination` property to contain all properties available in the `DataTable.Footer` component. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-15 `1.2.2`

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.2.0`

#### 💡 Others

- This component extends the properties of the `Box` component which has undergone some significant changes, so you should consult the `Box` component documentation when performing this update. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-17 `1.1.1`

### 🎉 New features

- Added new `DataTable.Cell` subcomponent. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to `DataTable.Cell` subcomponent API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-04 `1.1.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.0.2`

### 📚 3rd party library updates

- Updated `@nimbus-ds/components@3.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Updated props to match current versions of `components` and `styles`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-27 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/components@2.10.0`. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/styles@6.13.0`. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added new `DataTable` component. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added `bulkActions`, `header`, `footer` and `children` properties to `DataTable` component API. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories documentation for `DataTable` component. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `DataTable.Header` subcomponent. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added `checkbox` and `children` properties to `DataTable.Header` subcomponent API. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `DataTable.BulkActions` subcomponent. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added `checkbox`, `link`, `action` and `label` properties to `DataTable.BulkActions` subcomponent API. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `DataTable.Footer` subcomponent. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added `pageCount` and `pagination` properties to `DataTable.Footer` subcomponent API. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `DataTable.Row` subcomponent. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
- Added `checkbox` and `children` properties to `DataTable.Row` subcomponent API. ([#22](https://github.com/TiendaNube/nimbus-patterns/pull/22) by [@juanchigallego](https://github.com/juanchigallego))
