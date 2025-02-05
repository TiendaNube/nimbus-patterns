import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { LandingScreen } from "../../LandingScreen";
import { LandingScreenBullet } from "./LandingScreenBullet";

const meta: Meta<typeof LandingScreen.Bullet> = {
  title: "Patterns/LandingScreen/LandingScreen.Bullet",
  component: LandingScreen.Bullet,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: () => (
    <LandingScreenBullet
      icon={<TiendanubeIcon />}
      text="Lorem Ipsum is simply dummy text of the printing."
    />
  ),
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Bullet>;

export const basic: Story = {
  args: {},
};
