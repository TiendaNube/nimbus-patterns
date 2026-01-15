# Changelog

The FormField component allows the user to enter or edit information in text format. Additionally, it provides a label, and a conditional help text that can be used to provide additional context on a validation scenario.

## 2026-01-15 `1.8.1`

#### 📚 3rd party library updates

- Extends support to React 19.

## 2025-08-29 `1.8.0`

#### 🎉 New features

- Added `ai-generative` appearance for `FormField.Input` component. ([#118](https://github.com/TiendaNube/nimbus-patterns/pull/118) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `1.7.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2024-01-04 `1.6.4`

#### 🐛 Bug fixes

- Explicitly export type for `FormFieldInput` subcomponent. ([#92](https://github.com/TiendaNube/nimbus-patterns/pull/92) by [@juanchigallego](https://github.com/juanchigallego))
- Explicitly export type for `FormFieldSelect` subcomponent. ([#92](https://github.com/TiendaNube/nimbus-patterns/pull/92) by [@juanchigallego](https://github.com/juanchigallego))
- Explicitly export type for `FormFieldTextarea` subcomponent. ([#92](https://github.com/TiendaNube/nimbus-patterns/pull/92) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-06 `1.6.2`

#### 🐛 Bug fixes

- Added possibility to forward ref of `FormField.Input` component. Fix [issue #88](https://github.com/TiendaNube/nimbus-patterns/issues/88) ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))
- Added possibility to forward ref of `FormField.Select` component. Fix [issue #88](https://github.com/TiendaNube/nimbus-patterns/issues/88) ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))
- Added possibility to forward ref of `FormField.Textarea` component. Fix [issue #88](https://github.com/TiendaNube/nimbus-patterns/issues/88) ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))

## 2023-11-15 `1.6.1`

#### 💡 Others

- Changed `helpIcon` and `helpText` appearance to `neutral-textDisabled`. ([#85](https://github.com/TiendaNube/nimbus-patterns/pull/85) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-07-18 `1.6.0`

#### 🎉 New features

- Added `ref` property to `FormField.Input` component API. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `FormField.Select` component API. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `FormField.Textarea` component API. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista)).

## 2023-06-15 `1.5.2`

#### 💡 Others

- Removed module key from `package.json`. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.5.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-04 `1.4.0`

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/styles@7.0.0`. ([#32](https://github.com/TiendaNube/nimbus-patterns/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-20 `1.3.2`

### 📚 3rd party library updates

- Updated `@nimbus-ds/components@3.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/styles@7.0.0`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Updated props to match current versions of `components` and `styles`. ([#27](https://github.com/TiendaNube/nimbus-patterns/pull/27) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `1.3.1`

### 📚 Documentation

- Add props documentation. ([#26](https://github.com/TiendaNube/nimbus-patterns/pull/26) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-17 `1.3.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/#15) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `@nimbus-ds/components@2.8.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/styles@6.11.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@nimbus-ds/icons@1.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/input@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/icon@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/text@5.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/box@2.4.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/textarea@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/label@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@nimbus-ds/select@2.0.0`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@tiendanube/icons@0.3.1`. ([#20](https://github.com/TiendaNube/nimbus-patterns/pull/20) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-10 `1.2.0`

- Removed `@nimbus-ds/stack`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/box@2.4.0`. ([#14](https://github.com/TiendaNube/nimbus-patterns/pull/14) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-02 `1.1.0`

### 📚 3rd party library updates

- Updated `@nimbus-ds/box` to version `2.1.0`. ([#8](https://github.com/TiendaNube/nimbus-patterns/pull/8) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-01-24 `1.0.0`

### 📚 3rd party library updates

- Added `@nimbus-ds/box@1.2.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/label@2.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/stack@2.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/text@5.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/icon@2.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/input@2.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/select@2.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@nimbus-ds/textarea@2.0.0`. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `label`, `helpText`, `helpIcon`, `appearance`, `showHelpText` and `children` properties to the Component. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added story documentation in storybook. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `FormField.Select` subcomponent. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `FormField.Input` subcomponent. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
- Added `FormField.Textarea` subcomponent. ([#7](https://github.com/TiendaNube/nimbus-patterns/pull/7) by [@juanchigallego](https://github.com/juanchigallego))
