import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@nimbus-ds/components";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Card> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Card",
  component: PlanDisplay.Card,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <PlanDisplay.Card {...args}>
      <Text>Plan display card</Text>
    </PlanDisplay.Card>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Card>;

// AC-01 — Card hierarchy: level-2 shadow by default, no emphasis.
export const base: Story = {
  args: {},
};

// AC-02 — Plan emphasis: ribbonLabel alone.
export const withRibbonLabel: Story = {
  args: {
    ribbonLabel: "Most popular",
  },
};

// AC-02 — Plan emphasis: gradient alone.
export const withGradient: Story = {
  args: {
    gradient: true,
  },
};

// AC-02 — Plan emphasis precedence: when both are supplied, ribbonLabel
// renders and gradient is fully suppressed.
export const withRibbonLabelAndGradient: Story = {
  args: {
    ribbonLabel: "Best value",
    gradient: true,
  },
};
