import type { Meta, StoryObj } from "@storybook/react";

import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Price> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Price",
  component: PlanDisplay.Price,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Price>;

// AC-03 — Pricing: only the required current price.
export const base: Story = {
  args: {
    price: "$29",
  },
};

// AC-03 — Pricing: all four fields (price, previousPrice, period, annualNote).
export const allFields: Story = {
  args: {
    price: "$29",
    previousPrice: "$39",
    period: "/month",
    annualNote: "Billed annually",
  },
};
