import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@nimbus-ds/icons";

import { NavTabs } from "../../NavTabs";

const meta: Meta<typeof NavTabs.Item> = {
  title: "Patterns/NavTabs/NavTabs.Item",
  component: NavTabs.Item,
  argTypes: {
    icon: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavTabs.Item>;

export const basic: Story = {
  args: {
    active: true,
    icon: <HomeIcon size="medium" />,
    onClick: () => false,
    ariaLabel: "Home",
  },
};
