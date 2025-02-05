import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { LandingScreen } from "../../LandingScreen";
import { LandingScreenSection } from "./LandingScreenSection";

const meta: Meta<typeof LandingScreen.Section> = {
  title: "Patterns/LandingScreen/LandingScreen.Section",
  component: LandingScreen.Section,
  argTypes: {},
  tags: ["autodocs"],
  render: () => (
    <LandingScreenSection title="Section title">
      Section content
    </LandingScreenSection>
  ),
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Section>;

export const basic: Story = {
  args: {},
};
