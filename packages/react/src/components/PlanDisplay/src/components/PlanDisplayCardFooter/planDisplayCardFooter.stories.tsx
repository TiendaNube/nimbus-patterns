import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@nimbus-ds/components";
import { ArrowRightIcon } from "@nimbus-ds/icons";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Footer> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Footer",
  component: PlanDisplay.Footer,
  argTypes: {
    children: {
      control: { type: "text" },
    },
    icon: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <PlanDisplay.Footer icon={args.icon}>
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

// AC-06 — Footer affordance: an optional `icon` rendered before the content.
export const withIcon: Story = {
  args: {
    ...base.args,
    icon: <ArrowRightIcon />,
  },
};
