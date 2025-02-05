import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { LandingScreen } from "../../LandingScreen";
import { LandingScreenBullet } from "./LandingScreenBullet";

const meta: Meta<typeof LandingScreen.Bullet> = {
  title: "Patterns/LandingScreen/LandingScreen.Bullet",
  component: LandingScreen.Bullet,
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
  render: (args) => <LandingScreenBullet {...args} icon={<TiendanubeIcon />} />,
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Bullet>;

export const basic: Story = {
  args: {
    text: "Lorem Ipsum is simply dummy text of the printing.",
  },
};
