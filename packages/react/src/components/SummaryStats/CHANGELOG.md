# Changelog

Summary Stats component is intended for displaying key statistics and metrics in a visually organized manner.

## 2026-02-04 `1.0.0`

### 🎉 New features

- Added new `SummaryStats` component with compound pattern structure. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added `layout` property to `SummaryStats` with two variants:
  - `horizontal`: Items in a single row (2-6 items recommended).
  - `grid`: Items in a 2-column grid layout (2 or 4 items recommended).
- Added `expandable` property to `SummaryStats` to enable interactive mode where stats can be clicked to show additional content. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added `SummaryStats.Item` subcomponent with the following properties. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
  - `value`: The main numerical value to display.
  - `description`: Brief label text identifying the metric.
  - `trend`: Trend indicator (`up`, `down`, `neutral`) with colored arrows.
  - `trendText`: Text describing the trend percentage.
  - `infoTooltip`: Optional tooltip content for the info icon.
  - `children`: Content to display when this stat is active (for expandable variant).
- Added mobile carousel support for more than 3 items with horizontal scrolling. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added keyboard navigation support (Tab, Enter, Space) for accessibility. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added ARIA attributes for screen reader support. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added stories documentation for all components and variants. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))

### 📚 Documentation

- Added props documentation. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added usage examples for static and expandable variants. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
- Added accessibility guidelines. ([#145](https://github.com/TiendaNube/nimbus-patterns/pull/145) by [@jetchart-tiendanube](https://github.com/jetchart-tiendanube))
