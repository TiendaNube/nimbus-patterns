import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { LandingScreen } from "../../LandingScreen";
import { LandingScreenCard } from "./LandingScreenCard";

const meta: Meta<typeof LandingScreen.Card> = {
  title: "Patterns/LandingScreen/LandingScreen.Card",
  component: LandingScreen.Card,
  argTypes: {
    icon: { control: { disabled: true } },
  },
  tags: ["autodocs"],
  render: (args) => <LandingScreenCard {...args} icon={<TiendanubeIcon />} />,
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Card>;

export const basic: Story = {
  args: {
    title: "Card title",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti eum dolorem inventore quam neque hic doloribus iste commodi. Eligendi quo doloribus laborum qui minus aspernatur!",
  },
};
