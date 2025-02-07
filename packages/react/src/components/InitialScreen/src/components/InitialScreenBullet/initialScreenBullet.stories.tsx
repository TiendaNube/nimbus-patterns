import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { InitialScreen } from "../../InitialScreen";
import { InitialScreenBullet } from "./InitialScreenBullet";

const meta: Meta<typeof InitialScreen.Bullet> = {
  title: "Patterns/InitialScreen/InitialScreen.Bullet",
  component: InitialScreen.Bullet,
  argTypes: {
    text: {
      control: {
        type: "text",
        default: "Lorem Ipsum is simply dummy text of the printing.",
      },
    },
    icon: { control: { disabled: true } },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => <InitialScreenBullet {...args} icon={<TiendanubeIcon />} />,
};

export default meta;
type Story = StoryObj<typeof InitialScreen.Bullet>;

export const basic: Story = {
  args: {
    text: "Lorem Ipsum is simply dummy text of the printing.",
  },
};
