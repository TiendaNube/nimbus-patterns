import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { LandingScreen } from "../../LandingScreen";
import { LandingScreenSection } from "./LandingScreenSection";

const meta: Meta<typeof LandingScreen.Section> = {
  title: "Patterns/LandingScreen/LandingScreen.Section",
  component: LandingScreen.Section,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
  render: (args) => <LandingScreenSection {...args} />,
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Section>;

export const basic: Story = {
  args: {
    title: "Section title",
    children: "Section content",
  },
};
