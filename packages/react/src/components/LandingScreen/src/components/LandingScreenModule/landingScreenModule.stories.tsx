import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@nimbus-ds/components";
import { LandingScreen } from "../../LandingScreen";
import { LandingScreenModule } from "./LandingScreenModule";

const meta: Meta<typeof LandingScreen.Module> = {
  title: "Patterns/LandingScreen/LandingScreen.Module",
  component: LandingScreen.Module,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <LandingScreenModule {...args}>
      <Box backgroundColor="primary-surface" borderRadius="2" padding="2">
        {args.children}
      </Box>
    </LandingScreenModule>
  ),
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Module>;

export const basic: Story = {
  args: {
    title: "Module title",
    description: "Module description",
    children: "Module children",
  },
};
