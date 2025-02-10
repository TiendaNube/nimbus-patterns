import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@nimbus-ds/components";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Footer> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Footer",
  component: PlanDisplay.Footer,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  render: (args) => (
    <PlanDisplay.Footer>
      <Text>{args.children}</Text>
    </PlanDisplay.Footer>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Footer>;

export const base: Story = {
  args: {
    children: "Plan display footer, separated by a spacing line",
  },
};
