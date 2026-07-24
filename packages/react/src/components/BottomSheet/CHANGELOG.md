# Changelog

The BottomSheet component is a mobile-first modal sheet that slides up from the bottom edge, with configurable snap points and a drag gesture to resize between them or dismiss.

## 2026-07-24 `1.0.0`

#### 🎉 New features

- Added `BottomSheet` component. ([#177](https://github.com/TiendaNube/nimbus-patterns/pull/177) by [@jffs](https://github.com/jffs))
- Added `open`, `onRemove`, `snapPoints`, `defaultSnap`, `children`, `closeOnOutsidePress`, `ignoreAttributeName`, `needRemoveScroll`, `zIndex`, and `root` properties to the component API. ([#177](https://github.com/TiendaNube/nimbus-patterns/pull/177) by [@jffs](https://github.com/jffs))
- Added `BottomSheet.Header`, `BottomSheet.Body`, and `BottomSheet.Footer` subcomponents to compose the sheet's content, each accepting a `padding` prop. ([#177](https://github.com/TiendaNube/nimbus-patterns/pull/177) by [@jffs](https://github.com/jffs))
- Added a pointer-driven drag gesture to resize between snap points or dismiss, plus keyboard support on the grabber to step between snaps. ([#177](https://github.com/TiendaNube/nimbus-patterns/pull/177) by [@jffs](https://github.com/jffs))
- Added modal behavior: focus trapping, focus restoration on close, background scroll locking, and an accessible name derived from `BottomSheet.Header`. ([#177](https://github.com/TiendaNube/nimbus-patterns/pull/177) by [@jffs](https://github.com/jffs))
- Added on-screen keyboard handling so the focused input stays above the keyboard on both mobile web and Capacitor native app shells. ([#177](https://github.com/TiendaNube/nimbus-patterns/pull/177) by [@jffs](https://github.com/jffs))
