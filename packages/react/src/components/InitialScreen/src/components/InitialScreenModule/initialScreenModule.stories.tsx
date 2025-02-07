import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@nimbus-ds/components";
import { InitialScreen } from "../../InitialScreen";
import { InitialScreenModule } from "./InitialScreenModule";

const meta: Meta<typeof InitialScreen.Module> = {
  title: "Patterns/InitialScreen/InitialScreen.Module",
  component: InitialScreen.Module,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InitialScreenModule {...args}>
      <Box backgroundColor="primary-surface" borderRadius="2" padding="2">
        {args.children}
      </Box>
    </InitialScreenModule>
  ),
};

export default meta;
type Story = StoryObj<typeof InitialScreen.Module>;

export const basic: Story = {
  args: {
    title: "Module title",
    description: "Module description",
    children: "Module children",
  },
};
