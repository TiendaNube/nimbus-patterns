import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Thumbnail } from "@nimbus-ds/components";
import { InitialScreen } from "../../InitialScreen";
import { InitialScreenFeature } from "./InitialScreenFeature";

const meta: Meta<typeof InitialScreen.Feature> = {
  title: "Patterns/InitialScreen/InitialScreen.Feature",
  component: InitialScreen.Feature,
  argTypes: {
    content: { control: { type: "text" } },
    image: { control: { type: "text" } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InitialScreenFeature
      {...args}
      image={
        // In the args we will receive the image src as a string, so we need to cast it
        <Thumbnail src={args.image as string} alt={args.image as string} />
      }
    />
  ),
};

export default meta;
type Story = StoryObj<typeof InitialScreen.Feature>;

export const basic: Story = {
  args: {
    content: (
      <Box justifyContent="center" alignItems="center">
        Content on the left
      </Box>
    ),
    // We pass the image src so it can be edited in the Storybook web interface
    image: "./static/empty-orders.png",
  },
};
