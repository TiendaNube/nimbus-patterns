import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Bullet> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Bullet",
  component: PlanDisplay.Bullet,
  argTypes: {
    children: {
      control: { type: "text" },
    },
    icon: {
      control: { disable: true },
    },
  },
  render: (args) => <PlanDisplay.Bullet {...args} icon={<TiendanubeIcon />} />,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Bullet>;

export const base: Story = {
  args: {
    children: "Plan display bullet",
  },
};
