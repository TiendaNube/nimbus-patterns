import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TiendanubeIcon } from "@nimbus-ds/icons";
import { InitialScreen } from "../../InitialScreen";
import { InitialScreenCard } from "./InitialScreenCard";

const meta: Meta<typeof InitialScreen.Card> = {
  title: "Patterns/InitialScreen/InitialScreen.Card",
  component: InitialScreen.Card,
  argTypes: {
    icon: { control: { disabled: true } },
  },
  tags: ["autodocs"],
  render: (args) => <InitialScreenCard {...args} icon={<TiendanubeIcon />} />,
};

export default meta;
type Story = StoryObj<typeof InitialScreen.Card>;

export const basic: Story = {
  args: {
    title: "Card title",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti eum dolorem inventore quam neque hic doloribus iste commodi. Eligendi quo doloribus laborum qui minus aspernatur!",
  },
};
