# `@nimbus-ds/plan-display`

[![@nimbus-ds/plan-display](https://img.shields.io/npm/v/@nimbus-ds/plan-display?label=%40nimbus-ds%2Fplan-display)](https://www.npmjs.com/package/@nimbus-ds/plan-display)

The PlanDisplay component is a reusable and flexible UI layout designed to showcase multiple plans or options side by side. It organizes the plans in a visually appealing manner, with each plan containing a header (e.g., title or name) and content (e.g., features, benefits, or details). The component is ideal for displaying pricing tiers, subscription options, or any comparative data. Its modular structure allows for easy customization and scalability.

A card can be emphasized with `ribbonLabel` and/or `gradient` (`ribbonLabel` takes precedence when both are supplied), and `PlanDisplay.Price` is available to present pricing information consistently.

> **Breaking change (v2.0.0):** the `highlighted` prop on `PlanDisplay.Card` was removed. Migrate to `ribbonLabel` and/or `gradient`. See `CHANGELOG.md` for details.

## Installation

```sh
$ yarn add @nimbus-ds/plan-display
# or
$ npm install @nimbus-ds/plan-display
```
