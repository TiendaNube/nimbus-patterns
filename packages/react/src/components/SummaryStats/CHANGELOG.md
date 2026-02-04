# Changelog

Summary Stats component is intended for displaying key statistics and metrics in a visually organized manner.

## 2026-02-04 `1.0.0`

### 🎉 New features

- Added new `SummaryStats` component with compound pattern structure.
- Added `layout` property to `SummaryStats` with two variants:
  - `horizontal`: Items in a single row (2-6 items recommended).
  - `grid`: Items in a 2-column grid layout (2 or 4 items recommended).
- Added `expandable` property to `SummaryStats` to enable interactive mode where stats can be clicked to show additional content.
- Added `SummaryStats.Stat` subcomponent with the following properties:
  - `value`: The main numerical value to display.
  - `description`: Brief label text identifying the metric.
  - `trend`: Trend indicator (`up`, `down`, `neutral`) with colored arrows.
  - `trendText`: Text describing the trend percentage.
  - `infoTooltip`: Optional tooltip content for the info icon.
  - `children`: Content to display when this stat is active (for expandable variant).
- Added mobile carousel support for more than 3 items with horizontal scrolling.
- Added keyboard navigation support (Tab, Enter, Space) for accessibility.
- Added ARIA attributes for screen reader support.
- Added stories documentation for all components and variants.

### 📚 Documentation

- Added props documentation.
- Added usage examples for static and expandable variants.
- Added accessibility guidelines.
