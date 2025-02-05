import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Thumbnail } from "@nimbus-ds/components";
import { LandingScreen } from "../../LandingScreen";
import { LandingScreenFeature } from "./LandingScreenFeature";

const meta: Meta<typeof LandingScreen.Feature> = {
  title: "Patterns/LandingScreen/LandingScreen.Feature",
  component: LandingScreen.Feature,
  argTypes: {},
  tags: ["autodocs"],
  render: () => (
    <LandingScreenFeature
      content={
        <Box justifyContent="center" alignItems="center">
          Content on the left
        </Box>
      }
      image={
        <Thumbnail
          src="./static/mockup-perfit.jpg"
          alt="./static/mockup-perfit.jpg"
        />
      }
    />
  ),
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Feature>;

export const basic: Story = {
  args: {},
};
