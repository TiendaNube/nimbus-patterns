import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@nimbus-ds/components";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Content> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Content",
  component: PlanDisplay.Content,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  render: (args) => (
    <PlanDisplay.Content>
      <Text>{args.children}</Text>
    </PlanDisplay.Content>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Content>;

export const base: Story = {
  args: {
    children: "Plan display content, separated by a spacing line",
  },
};
