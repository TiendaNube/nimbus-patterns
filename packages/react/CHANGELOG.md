# Changelog

Nimbus is an open-source Design System created by Tiendanube / Nuvesmhop's team to empower and enhance more stories every day, with simplicity, accessibility, consistency and performance.

## 2026-02-25 `1.32.3`

#### 🐛 Bug fixes

- Added conditional hover background color to `SummaryStatsItem`, only applied when the stat is expandable. ([#153](https://github.com/TiendaNube/nimbus-patterns/pull/153) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Increased padding on `SummaryStatsItem` to prevent hover background from overlapping separator lines in grid layout. ([#153](https://github.com/TiendaNube/nimbus-patterns/pull/153) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))

## 2026-02-24 `1.32.2`

#### 🐛 Bug fixes

- Replaced React 18's `useId` with a custom `useRandomId` hook in `SummaryStats` to support React 16.8+. ([#152](https://github.com/TiendaNube/nimbus-patterns/pull/152) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))

## 2026-02-23 `1.32.1`

#### 🐛 Bug fixes

- Fixed missing `SummaryStats` export from the `@nimbus-ds/react` package entry point. ([#151](https://github.com/TiendaNube/nimbus-patterns/pull/151) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))

## 2026-02-23 `1.32.0`

#### 🎉 New features

- Added new `SummaryStats` component for displaying key statistics with trend indicators, info tooltips, and expandable content areas. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added Editor `renderModules` prop to allow customization of the toolbar. (by [@edersoares](https://github.com/edersoares))

## 2026-02-13 `1.31.3`

#### 🐛 Bug fixes

- Removed hardcoded `pb` and `px` props from `ChatInput.Actions` to allow proper layout flexibility. ([#149](https://github.com/TiendaNube/nimbus-patterns/pull/149) by [@karemcarvalho-hue](https://github.com/karemcarvalho-hue))

## 2026-02-11 `1.31.2`

#### 🐛 Bug fixes

- Fixed `paddingBottom` prop default value in `DataList.Row` sub-component. ([#148](https://github.com/TiendaNube/nimbus-patterns/pull/148) by [@joacotornello](https://github.com/joacotornello))

## 2026-02-11 `1.31.1`

#### 🐛 Bug fixes

- Fixed `paddingBottom` prop default value to `none` in `DataList.Row` sub-component. ([#147](https://github.com/TiendaNube/nimbus-patterns/pull/147) by [@joacotornello](https://github.com/joacotornello))

## 2026-02-06 `1.31.0`

#### 🎉 New features

- Added auto-close behavior to `DataTable.Dropdown` when an action is clicked. ([#143](https://github.com/TiendaNube/nimbus-patterns/pull/143) by [@joacotornello](https://github.com/joacotornello))

## 2026-02-05 `1.30.0`

#### 🎉 New features

- Added `paddingBottom` prop to `DataList.Row` sub-component to allow custom padding bottom definition to rows. ([#141](https://github.com/TiendaNube/nimbus-patterns/pull/141) by [@joacotornello](https://github.com/joacotornello))

## 2026-02-03 `1.29.0`

#### 🎉 New features

- Added `DataTable.Dropdown` component. ([#141](https://github.com/TiendaNube/nimbus-patterns/pull/141) by [@joacotornello](https://github.com/joacotornello))
- Added `DataTable.DropdownAction` component. ([#141](https://github.com/TiendaNube/nimbus-patterns/pull/141) by [@joacotornello](https://github.com/joacotornello))
- Added `DataTable.DropdownDivider` component. ([#141](https://github.com/TiendaNube/nimbus-patterns/pull/141) by [@joacotornello](https://github.com/joacotornello))
- Added `DataTable.DropdownSection` component. ([#141](https://github.com/TiendaNube/nimbus-patterns/pull/141) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-22 `1.28.1`

#### 🐛 Bug fixes

- Fixed `DataTable.Cell` component to correctly use the `column` prop. ([#140](https://github.com/TiendaNube/nimbus-patterns/pull/140) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-15 `1.28.0`

#### 📚 3rd party library updates

- Extends support to React 19. ([#138](https://github.com/TiendaNube/nimbus-patterns/pull/138) by [@joacotornello](https://github.com/joacotornello))

## 2025-12-23 `1.27.0`

#### 🎉 New features

- Added `containerProps` prop to `DataTable` component to allow passing props to the container element. ([#136](https://github.com/TiendaNube/nimbus-patterns/pull/136) by [@joacotornello](https://github.com/joacotornello))

## 2025-12-11 `1.26.0`

#### 🎉 New features

- Added `tagIcon` and `tagText` props to `ProductDataListItem` component
- Added `tagAppearance` prop to `ProductDataListItem` component
- Added `tagIcon` and `tagText` props to `ProductDataListSortable` component

## 2025-11-14 `1.25.3`

#### 🐛 Bug fixes

- Don't render start icon in popover content when menu is collapsed. ([#134](https://github.com/TiendaNube/nimbus-patterns/pull/134) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-07 `1.25.2`

#### 💡 Others

- Updated `AppShell` chat component sizes for better layout consistency. ([#132](https://github.com/TiendaNube/nimbus-patterns/pull/132) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-10 `1.25.1`

#### 💡 Others

- Improved menu items alignment when menu is collapsed. ([#133](https://github.com/TiendaNube/nimbus-patterns/pull/133) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-04 `1.25.0`

#### 💡 Others

- Adds support for popovers inside `MenuButton.Accordion` component. ([#131](https://github.com/TiendaNube/nimbus-patterns/pull/131) by [@joacotornello](https://github.com/joacotornello))
- Added `noop` utility function to the build output. ([#131](https://github.com/TiendaNube/nimbus-patterns/pull/131) by [@joacotornello](https://github.com/joacotornello))

## 2025-10-16 `1.24.1`

#### 💡 Others

- Fixes background color of `InitialScreen.Card`. ([#130](https://github.com/TiendaNube/nimbus-patterns/pull/130) by [@joacotornello](https://github.com/joacotornello))

## 2025-10-09 `1.24.0`

#### 🎉 New features

- Added `showTooltipsWhenCollapsed` prop to `Menu` component to control tooltip visibility when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Added `tooltipsPosition` prop to `Menu` component to control tooltip position when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Added `tooltipText` prop to `MenuButton` component to display custom tooltip text when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Added `tooltipText` prop to `MenuButton.Accordion` component to display custom tooltip text when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Added tooltip support to `MenuButton` component that automatically displays when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Added tooltip support to `MenuButton.Accordion` component that automatically displays when menu is collapsed. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))

#### 💡 Others

- Updated `AppShell` collapsible menu story with improved UI interactions using `SidebarIcon` for menu toggle. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))
- Extended `MenuExpandContext` with `showTooltipsWhenCollapsed` and `tooltipsPosition` properties. ([#129](https://github.com/TiendaNube/nimbus-patterns/pull/129) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-30 `1.23.3`

#### 🐛 Bug fixes

- Fixed `AppShell` component not showing scrollbar when content is taller than the viewport. ([#128](https://github.com/TiendaNube/nimbus-patterns/pull/128) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-30 `1.23.2`

#### 💡 Others

- Disabled enforce check for `useMenuExpandContext` hook in `MenuBody` component to ensure backward compatibility with clients that were not using the `<Menu>` component as wrapper of `Menu` subcomponents. ([#127](https://github.com/TiendaNube/nimbus-patterns/pull/127) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-28 `1.23.1`

#### 💡 Others

- Disabled enforce check for `useMenuExpandContext` hook to ensure backward compatibility with clients that were not using the `<Menu>` component as wrapper of `Menu` subcomponents. ([#126](https://github.com/TiendaNube/nimbus-patterns/pull/126) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-27 `1.23.0`

#### 🎉 New features

- Added `enforce` parameter to `useAppShellMenuContext` hook to allow for optional use without a provider. ([#125](https://github.com/TiendaNube/nimbus-patterns/pull/125) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-27 `1.22.0`

#### 🎉 New features

- Extended `menuProperties` props to `AppShell` component. ([#124](https://github.com/TiendaNube/nimbus-patterns/pull/124) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-24 `1.21.0`

#### 🎉 New features

- Added `ChatInput` component. ([#123](https://github.com/TiendaNube/nimbus-patterns/pull/123) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-10 `1.20.1`

#### 🐛 Bug fixes

- Fixed `AppShell` default value for `menuExpanded` prop to be true. ([#121](https://github.com/TiendaNube/nimbus-patterns/pull/121) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-04 `1.20.0`

#### 🎉 New features

- Added `Chat` and `Body` subcomponents to `AppShell` component, and improved layout to better support fixed header. ([#119](https://github.com/TiendaNube/nimbus-patterns/pull/119) by [@joacotornello](https://github.com/joacotornello))
- Added `root` prop support to `SideModal` component. ([#119](https://github.com/TiendaNube/nimbus-patterns/pull/119) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-05 `1.19.0`

#### 🎉 New features

- Improved `PlanDisplay` and `InitialScreen` mobile layout. ([#120](https://github.com/TiendaNube/nimbus-patterns/pull/120) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-29 `1.18.0`

#### 🎉 New features

- Added `ai-generative` appearance for `FormField.Input` component. ([#110](https://github.com/TiendaNube/nimbus-patterns/pull/110) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-08 `1.17.0`

#### 🎉 New features

- Added collapsible sidebar support via new props: `menuExpanded`, `menuExpandedWidth`, and `menuCollapsedWidth`. The sidebar width now transitions between expanded and a compact rail. A `MenuProvider` context is used to inform `Menu` descendants about expansion state. ([#117](https://github.com/TiendaNube/nimbus-patterns/pull/117) by [@joacotornello](https://github.com/joacotornello))
- Added `expanded` prop support for Menu component. ([#117](https://github.com/TiendaNube/nimbus-patterns/pull/117) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-05 `1.16.0`

#### 🎉 New features

- Updated MenuFooter ChevronRightIcon size from 14px to 16px for visual consistency with MenuButton icons. ([#115](https://github.com/TiendaNube/nimbus-patterns/pull/115) by [@noecondoleo](https://github.com/noecondoleo) [@FedeTrevi-se](https://github.com/FedeTrevi-se))

- Updated MenuButton icon size from 14px to 16px for better visual consistency. ([#115](https://github.com/TiendaNube/nimbus-patterns/pull/115) by [@noecondoleo](https://github.com/noecondoleo) [@FedeTrevi-se](https://github.com/FedeTrevi-se))

## 2025-06-04 `1.15.0`

#### 🎉 New features

- Added `components-props.json` file to the build output. ([#114](https://github.com/TiendaNube/nimbus-patterns/pull/114) by [@joacotornello](https://github.com/joacotornello))

## 2025-04-25 `1.14.0`

#### 🎉 New features

- Added `ProductDataList` component. ([#111](https://github.com/TiendaNube/nimbus-patterns/pull/111) by [@joacotornello](https://github.com/joacotornello))

## 2025-04-25 `1.13.0`

#### 🎉 New features

- Added `Sortable` component. ([#109](https://github.com/TiendaNube/nimbus-patterns/pull/109) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `1.12.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

- Implemented new webpack configuration to move useful files into the build output directory and inject the `use client` directive. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#104](https://github.com/TiendaNube/nimbus-patterns/pull/104) by [@joacotornello](https://github.com/joacotornello))

## 2025-02-28 `1.11.1`

#### 🐛 Bug fixes

- Fixed `InitialScreen.Hero` missing key warnings. ([#101](https://github.com/TiendaNube/nimbus-patterns/pull/101) by [@joacotornello](https://github.com/joacotornello))

## 2025-02-12 `1.11.0`

- Added new Landing Screen template. ([#100](https://github.com/TiendaNube/nimbus-patterns/pull/100) by [@joacotornello](https://github.com/joacotornello))

## 2025-02-12 `1.10.0`

- Added new `@nimbus-ds/initial-screen` component. ([#97](https://github.com/TiendaNube/nimbus-patterns/pull/97) by [@joacotornello](https://github.com/joacotornello))

## 2024-02-17 `1.9.1`

- Fixed `PlanDisplay` not being exported and not working on NextJS. ([#99](https://github.com/TiendaNube/nimbus-patterns/pull/99) by [@joacotornello](https://github.com/joacotornello))

## 2024-02-17 `1.9.0`

- Added new `PlanDisplay` component. ([#98](https://github.com/TiendaNube/nimbus-patterns/pull/98) by [@joacotornello](https://github.com/joacotornello))

## 2024-03-06 `1.8.0`

### 🎉 New features

- Added new `EmptyApp` component. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `EmptyAppContentImageElement` subcomponent. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `EmptyAppContentSection` subcomponent. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `EmptyAppContentTextElement` subcomponent. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `EmptyAppHeroSection` subcomponent. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `EmptyAppPlanCard` subcomponent. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `EmptyAppPlanItem` subcomponent. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to `EmptyApp` component API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `src` and `alt` properties to `EmptyAppContentImageElement` subcomponent API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `title`, `subtitle`, `actions` and `children` properties to `EmptyAppContentSection` subcomponent API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `title`, `content` and `bottomDivider` properties to `EmptyAppContentTextElement` subcomponent API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `src`, `alt`, `title`, `subtitle`, `content` and `actions` properties to `EmptyAppHeroSection` subcomponent API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `planContext`, `planName` and `children` properties to `EmptyAppPlanCard` subcomponent API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Added `label` and `disabled` properties to `EmptyAppPlanItem` subcomponent API. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))

### 📚 3rd party library updates

- Updated `@nimbus-ds/styles@9.11.0`. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))
- Updated `@nimbus-ds/components@5.5.1`. ([#95](https://github.com/TiendaNube/nimbus-patterns/pull/95) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-02-07 `1.7.8`

### 🎉 New features

- Add `wordBreak="break-all"` property to `MenuButton` component to allow overflowing text to be trimmed at any position. ([#94](https://github.com/TiendaNube/nimbus-patterns/pull/94) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-01-09 `1.7.7`

#### 🐛 Bug fixes

- Remove visual focus box-shadow from `MenuButton` component because it visually hints the element is on focus even after an action has been performed. ([#93](https://github.com/TiendaNube/nimbus-patterns/pull/93) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-01-04 `1.7.6`

#### 🐛 Bug fixes

- Explicitly export type for `FormFieldInput` component. ([#92](https://github.com/TiendaNube/nimbus-patterns/pull/92) by [@juanchigallego](https://github.com/juanchigallego))
- Explicitly export type for `FormFieldSelect` component. ([#92](https://github.com/TiendaNube/nimbus-patterns/pull/92) by [@juanchigallego](https://github.com/juanchigallego))
- Explicitly export type for `FormFieldTextarea` component. ([#92](https://github.com/TiendaNube/nimbus-patterns/pull/92) by [@juanchigallego](https://github.com/juanchigallego))

#### 🎉 New features

- Update `AppShell` component with new design requirements. ([#91](https://github.com/TiendaNube/nimbus-patterns/pull/91) by [@juanchigallego](https://github.com/juanchigallego))
- Update `CalloutCard` component with new design requirements. ([#91](https://github.com/TiendaNube/nimbus-patterns/pull/91) by [@juanchigallego](https://github.com/juanchigallego))
- Update `SideModal` component with new design requirements. ([#91](https://github.com/TiendaNube/nimbus-patterns/pull/91) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-18 `1.7.5`

- Adjust component padding and size of the icon child on `MenuButton` component. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust padding on `MenuButtonAccordion` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust padding of `MenuBody` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust padding and icon sizing on `MenuFooter` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust colors and padding on `MenuSection` subcomponent. ([#90](https://github.com/TiendaNube/nimbus-patterns/pull/90) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-06 `1.7.4`

#### 🐛 Bug fixes

- Added possibility to forward ref of `FormField.Input` component. Fix [issue #88](https://github.com/TiendaNube/nimbus-patterns/issues/88) ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))
- Added possibility to forward ref of `FormField.Select` component. Fix [issue #88](https://github.com/TiendaNube/nimbus-patterns/issues/88) ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))
- Added possibility to forward ref of `FormField.Textarea` component. Fix [issue #88](https://github.com/TiendaNube/nimbus-patterns/issues/88) ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))

#### 📚 3rd party library updates

- Updated `@nimbus-ds/icons@1.x`. ([#89](https://github.com/TiendaNube/nimbus-patterns/pull/89) by [@hrchioest](https://github.com/hrchioest))

## 2023-11-16 `1.7.3`

#### 💡 Others

- Remove `Editor` component from bundle until `lexical` supports SSR to prevent erros with server-side rendering projects. ([#86](https://github.com/TiendaNube/nimbus-patterns/pull/86) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-11-15 `1.7.2`

#### 📚 3rd party library updates

- Update packages. ([#85](https://github.com/TiendaNube/nimbus-patterns/pull/85) by [@juanchigallego](https://github.com/juanchigallego))

#### 💡 Others

- Changed `helpIcon` and `helpText` appearance to `neutral-textDisabled` on `FormField` component. ([#85](https://github.com/TiendaNube/nimbus-patterns/pull/85) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-10-25 `1.7.1`

#### 🐛 Bug fixes

- Fixed text and object alignment issues on `EmptyMessage` component's `illustration` variant. ([#81](https://github.com/TiendaNube/nimbus-patterns/pull/81) by [@juanchigallego](https://github.com/juanchigallego))
- Adjusted text and spacing styles to match `EmptyMessage` component's UI design pattern. ([#81](https://github.com/TiendaNube/nimbus-patterns/pull/81) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-10-17 `1.7.0`

#### 🎉 New features

- Added new `Editor` component. ([#80](https://github.com/TiendaNube/nimbus-patterns/pull/80) by [@juniorconquista](https://github.com/juniorconquista))

#### 🐛 Bug fixes

- Fixed externally controlled visibility working correctly in the `ProductUpdate` component. ([#80](https://github.com/TiendaNube/nimbus-patterns/pull/80)

## 2023-09-25 `1.6.0`

#### 🎉 New features

- Added new `Calendar` component. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added `hideBorder`, `containerProps`, `stickyWeekdays` and `fullWidthDays` properties to the `Calendar` component API. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `CustomCaptionLabel` subcomponent. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `CustomDay` subcomponent. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `Weekdays` subcomponent. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new `Wrapper` subcomponent. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added `children` property to the `Wrapper` subcomponent API. ([#76](https://github.com/TiendaNube/nimbus-patterns/pull/76) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-07-21 `1.5.1`

#### 🐛 Bug fixes

- Fixed a bug on `CalloutCard` where `onClick` attribute would only work when clicking the chevron icon instead of the whole component. ([#72](https://github.com/TiendaNube/nimbus-patterns/pull/72) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-07-18 `1.5.0`

#### 🎉 New features

- Added new `menuProperties` prop to `AppShell` component to control menu responsiveness. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ref` property to `FormField.Input` component API. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `FormField.Select` component API. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `Input.Textarea` component API. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista)).

#### 🐛 Bug fixes

- Adjusted the property typing of the footer buttons so that they contain all the properties available in the `SideModal` component. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted the `toggle` property to contain all properties available in the `InteractiveList.ToggleItemSkeleton` component. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted the `pagination` property to contain all properties available in the `DataTable.Footer` component. ([#69](https://github.com/TiendaNube/nimbus-patterns/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-21 `1.4.3`

#### 🐛 Bug fixes

- Fixed typing of `InteractiveList.CheckboxItem`, `InteractiveList.ButtonItem`, `InteractiveList.RadioItem` and `InteractiveList.ToggleItem` internal components to extend native HTML props. ([#66](https://github.com/TiendaNube/nimbus-patterns/pull/66) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-15 `1.4.2`

#### 💡 Others

- Removed module key from `package.json` in all components. ([#62](https://github.com/TiendaNube/nimbus-patterns/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `1.4.0`

#### 💡 Others

- Some patterns extend the properties of the `Box` component which has undergone some significant changes, so you should consult the `Box` component documentation when performing this update. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@nimbus-ds/components@4.x` to `@nimbus-ds/components@5.x`. ([#56](https://github.com/TiendaNube/nimbus-patterns/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-08 `1.3.0`

#### 🎉 New features

- Added `as` property to the `MenuButton.Accordion` component API. ([#50](https://github.com/TiendaNube/nimbus-patterns/pull/50) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-02 `1.2.2`

#### 🎉 New features

- Update component design styles on `EmptyMessage` component. ([#49](https://github.com/TiendaNube/nimbus-design-system/pull/49) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-24 `1.2.1`

#### 🐛 Bug fixes

- Fixed typing of `Page`, `Page.Header` and `Page.Body` components to correctly extend `Box` properties. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed bug where it was not possible to change the paddings of the `Page.Header` and `Page.Body` components. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))
- Renamed `controlled` property to `open` in `MenuButton.Accordion` component API. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the background color of the `MenuButton.Accordion` component when it is open. ([#48](https://github.com/TiendaNube/nimbus-patterns/pull/48) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-18 `1.2.0`

#### 🎉 New features

- Added `Menu.ButtonAccordion` subcomponent of `Menu` component. ([#44](https://github.com/TiendaNube/nimbus-patterns/pull/44) by [@juniorconquista](https://github.com/juniorconquista))
- Added `MenuButton.Accordion` subcomponent of `MenuButton` component. ([#44](https://github.com/TiendaNube/nimbus-patterns/pull/44) by [@juniorconquista](https://github.com/juniorconquista))

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
- Added `children` property to the `HelpLink` component API. ([#45](https://github.com/TiendaNube/nimbus-patterns/pull/45) by [@juanchigallego](https://github.com/juanchigallego))
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
