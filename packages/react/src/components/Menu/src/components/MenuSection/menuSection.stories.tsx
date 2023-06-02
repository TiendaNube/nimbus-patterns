import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon, StatsIcon } from "@nimbus-ds/icons";

import { Menu } from "../../Menu";

const meta: Meta<typeof Menu.Section> = {
  title: "Patterns/Menu/Menu.Section",
  component: Menu.Section,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Menu>
      <Menu.Section {...args} />
    </Menu>
  ),
};

export default meta;
type Story = StoryObj<typeof Menu.Section>;

export const basic: Story = {
  args: {
    title: "Home",
    children: (
      <>
        <Menu.Button startIcon={HomeIcon} label="Inicio" />
        <Menu.Button startIcon={StatsIcon} label="Estadísticas" />
      </>
    ),
  },
};
