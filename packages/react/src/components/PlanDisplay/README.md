# `@nimbus-ds/plan-display`

[![@nimbus-ds/plan-display](https://img.shields.io/npm/v/@nimbus-ds/plan-display?label=%40nimbus-ds%2Fplan-display)](https://www.npmjs.com/package/@nimbus-ds/plan-display)

The PlanDisplay component is a reusable and flexible UI layout designed to showcase multiple plans or options side by side. It organizes the plans in a visually appealing manner, with each plan containing a header (e.g., title or name) and content (e.g., features, benefits, or details). The component is ideal for displaying pricing tiers, subscription options, or any comparative data. Its modular structure allows for easy customization and scalability.

## Installation

```sh
$ yarn add @nimbus-ds/plan-display
# or
$ npm install @nimbus-ds/plan-display
```

## Subcomponents

- `PlanDisplay.Card` — wraps a single plan. By default it renders the card with a level-2 shadow.
  Pass `ribbonLabel` to render the featured ribbon on top (e.g. `"Más escogido"`) with a primary 2px
  border, or `gradient` for the gradient background variant.
- `PlanDisplay.Header` — renders the plan `subtitle` and `title`. Pass an optional `tag` slot (e.g. a
  `<Tag>` like `"Plan actual"`) shown to the right of the subtitle.
- `PlanDisplay.Price` — renders the `price` and optional `previousPrice` (line-through), `period`
  (e.g. `"/mes"`) and `annualNote`. Typically passed as the Header `title`.
- `PlanDisplay.Content` — wraps the plan bullets and supporting content.
- `PlanDisplay.Bullet` — a feature row with an `icon`, optional `disabled` state and an optional inline
  `badge` slot (e.g. a `<Tag>` like `"Nuevo"`).
- `PlanDisplay.Footer` — bottom area. Pass an optional `icon` to render an add-on style row (icon + link).
- `PlanDisplay.Spacing` — a standalone divider line. Note that `PlanDisplay.Content` already renders
  this divider at its top to separate the price block from the plan description (as in the Figma master),
  so you usually don't need to add it manually.

## Plans 2.0 example

```tsx
import { PlanDisplay } from "@nimbus-ds/plan-display";
import { Box, Button, Link, Tag, Text } from "@nimbus-ds/components";
import { CashierIcon, CheckIcon } from "@nimbus-ds/icons";

<PlanDisplay minPlanWidth="236px">
  <PlanDisplay.Card ribbonLabel="Más escogido">
    <PlanDisplay.Header
      subtitle="Avanzado"
      title={<PlanDisplay.Price price="$999" period="/mes" />}
    />
    <PlanDisplay.Content>
      <Box display="flex" flexDirection="column" gap="3" pb="2">
        <Text>Gestión avanzada y control total para tu negocio.</Text>
        <Button appearance="primary" fullWidth>
          Subir de plan
        </Button>
      </Box>
      <PlanDisplay.Bullet icon={<CheckIcon />} badge={<Tag appearance="primary">Nuevo</Tag>}>
        Hasta 3 tablas de precios mayoristas
      </PlanDisplay.Bullet>
    </PlanDisplay.Content>
    <PlanDisplay.Footer icon={<CashierIcon />}>
      <Text>
        Obtén{" "}
        <Link as="a" href="#" appearance="primary" textDecoration="underline">
          Punto de venta Plus
        </Link>{" "}
        extra por $149.90/mes
      </Text>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
</PlanDisplay>;
```
