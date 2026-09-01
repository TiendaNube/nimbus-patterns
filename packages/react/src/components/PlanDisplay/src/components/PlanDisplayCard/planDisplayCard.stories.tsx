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

export const base: Story = {
  args: {},
};

/** @deprecated Migration reference only. New consumers should use ribbonLabel or gradient. */
export const legacyHighlighted: Story = {
  args: {
    highlighted: true,
  },
};
