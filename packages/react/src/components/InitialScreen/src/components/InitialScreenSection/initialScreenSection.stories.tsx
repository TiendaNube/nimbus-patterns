import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { InitialScreen } from "../../InitialScreen";
import { InitialScreenSection } from "./InitialScreenSection";

const meta: Meta<typeof InitialScreen.Section> = {
  title: "Patterns/InitialScreen/InitialScreen.Section",
  component: InitialScreen.Section,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
  render: (args) => <InitialScreenSection {...args} />,
};

export default meta;
type Story = StoryObj<typeof InitialScreen.Section>;

export const basic: Story = {
  args: {
    title: "Section title",
    children: "Section content",
  },
};
