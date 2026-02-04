# `@nimbus-ds/summary-stats`

[![@nimbus-ds/summary-stats](https://img.shields.io/npm/v/@nimbus-ds/summary-stats?label=%40nimbus-ds%2Fsummary-stats)](https://www.npmjs.com/package/@nimbus-ds/summary-stats)

Summary Stats component is intended for displaying key statistics and metrics in a visually organized manner. It supports trend indicators, info tooltips, and an expandable content area for detailed visualizations.

## Installation

```sh
$ yarn add @nimbus-ds/summary-stats
# or
$ npm install @nimbus-ds/summary-stats
```

## Usage

### Basic (Static)

```tsx
import { SummaryStats } from "@nimbus-ds/summary-stats";

function MyComponent() {
  return (
    <SummaryStats>
      <SummaryStats.Stat
        value="$12,450.00"
        description="Total Sales"
        trend="up"
        trendText="15%"
        infoTooltip="Total revenue from all completed orders"
      />
      <SummaryStats.Stat
        value="156"
        description="Orders"
        trend="down"
        trendText="8%"
        infoTooltip="Number of orders placed"
      />
      <SummaryStats.Stat
        value="89"
        description="Customers"
        trend="neutral"
        trendText="0%"
        infoTooltip="Unique customers"
      />
    </SummaryStats>
  );
}
```

### Grid Layout

```tsx
import { SummaryStats } from "@nimbus-ds/summary-stats";

function MyComponent() {
  return (
    <SummaryStats layout="grid">
      <SummaryStats.Stat
        value="$12,450.00"
        description="Total Sales"
        trend="up"
        trendText="15%"
      />
      <SummaryStats.Stat
        value="156"
        description="Orders"
        trend="down"
        trendText="8%"
      />
      <SummaryStats.Stat
        value="89"
        description="Customers"
        trend="up"
        trendText="12%"
      />
      <SummaryStats.Stat
        value="3.2%"
        description="Conversion Rate"
        trend="neutral"
        trendText="0%"
      />
    </SummaryStats>
  );
}
```

### Expandable (Interactive)

Each stat can have its own expanded content as children:

```tsx
import { SummaryStats } from "@nimbus-ds/summary-stats";
import { Text } from "@nimbus-ds/components";

function MyComponent() {
  return (
    <SummaryStats expandable>
      <SummaryStats.Stat
        id="sales"
        value="$12,450.00"
        description="Total Sales"
        trend="up"
        trendText="15%"
      >
        <Text>Sales chart and detailed breakdown would go here.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        id="orders"
        value="156"
        description="Orders"
        trend="down"
        trendText="8%"
      >
        <Text>Orders details and analytics would go here.</Text>
      </SummaryStats.Stat>
    </SummaryStats>
  );
}
```

## Props

### SummaryStats

| Prop              | Type                     | Default        | Description                                             |
| ----------------- | ------------------------ | -------------- | ------------------------------------------------------- |
| children          | `ReactNode`              | -              | Content (composed of `SummaryStats.Stat` subcomponents) |
| layout            | `"horizontal" \| "grid"` | `"horizontal"` | Layout variant: row or 2-column grid                    |
| expandable        | `boolean`                | `false`        | Enables expandable mode where stats can be clicked      |
| defaultSelectedId | `string`                 | -              | ID of the initially selected stat (uncontrolled)        |
| selectedId        | `string`                 | -              | Controlled selected stat ID                             |
| onSelect          | `(id: string) => void`   | -              | Callback fired when a stat is selected                  |

### SummaryStats.Stat

| Prop        | Type                          | Default | Description                                       |
| ----------- | ----------------------------- | ------- | ------------------------------------------------- |
| id          | `string`                      | -       | Unique identifier (required for expandable mode)  |
| value       | `string`                      | -       | The main value to display (required)              |
| description | `string`                      | -       | Brief label text (required)                       |
| trend       | `"up" \| "down" \| "neutral"` | -       | Trend indicator direction                         |
| trendText   | `string`                      | -       | Text describing the trend (e.g., "15%")           |
| infoTooltip | `string`                      | -       | Tooltip content for the info icon                 |
| children    | `ReactNode`                   | -       | Expanded content shown when this stat is selected |

## Accessibility

- Trend indicators include both color and arrow icons for color-blind users
- Interactive stats are keyboard accessible (Tab, Enter, Space)
- ARIA attributes for expanded/collapsed states
- Info tooltips are accessible via keyboard focus
