import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "@nimbus-ds/components";
import { CloseIcon, TiendanubeIcon } from "@nimbus-ds/icons";
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
    badge: {
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

// AC-05 — Feature metadata: an optional `badge` rendered inline after the content.
export const withBadge: Story = {
  args: {
    children: "Unlimited products",
    badge: <Tag appearance="success">Upgraded</Tag>,
  },
};

// AC-05 / AC-09 — the disabled feature treatment: the consumer supplies the
// icon (no automatic close icon), plus a required, accessible-only
// `unavailableLabel` that is never visibly rendered.
export const disabled: Story = {
  render: () => (
    <PlanDisplay.Bullet
      icon={<CloseIcon />}
      disabled
      unavailableLabel="Not included"
    >
      Priority support
    </PlanDisplay.Bullet>
  ),
};
