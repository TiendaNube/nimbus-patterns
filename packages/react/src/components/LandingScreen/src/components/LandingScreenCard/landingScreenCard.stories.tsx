import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { LandingScreen } from "../../LandingScreen";
import { LandingScreenCard } from "./LandingScreenCard";

const meta: Meta<typeof LandingScreen.Card> = {
  title: "Patterns/LandingScreen/LandingScreen.Card",
  component: LandingScreen.Card,
  argTypes: {},
  tags: ["autodocs"],
  render: () => (
    <LandingScreenCard
      icon={<TiendanubeIcon />}
      title="Card title"
      description="
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti eum
        dolorem inventore quam neque hic doloribus iste commodi. Eligendi quos
        doloribus laborum qui minus aspernatur!"
    />
  ),
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Card>;

export const basic: Story = {
  args: {},
};
