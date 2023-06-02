import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CogIcon } from "@nimbus-ds/icons";

import { Menu } from "../../Menu";

const meta: Meta<typeof Menu.Footer> = {
  title: "Patterns/Menu/Menu.Footer",
  component: Menu.Footer,
  argTypes: {
    startIcon: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Menu>
      <Menu.Footer {...args} />
    </Menu>
  ),
};

export default meta;
type Story = StoryObj<typeof Menu.Footer>;

export const basic: Story = {
  args: {
    label: "Configuración",
    startIcon: CogIcon,
  },
};
