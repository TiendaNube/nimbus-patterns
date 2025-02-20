import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Spacing> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Spacing",
  component: PlanDisplay.Spacing,
  argTypes: {},
  render: () => <PlanDisplay.Spacing />,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Spacing>;

export const base: Story = {
  args: {},
};
