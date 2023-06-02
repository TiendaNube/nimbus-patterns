import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { Page } from "../../Page";

const meta: Meta<typeof Page.Body> = {
  title: "Patterns/Page/Page.Body",
  component: Page.Body,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Page.Body>;

export const basic: Story = {
  args: {
    children: (
      <Box
        backgroundColor="primary-surface"
        borderColor="primary-interactive"
        borderStyle="dashed"
        borderWidth="1"
        borderRadius="2"
        width="100%"
        height="500px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="base" color="primary-interactive">
          Body content
        </Text>
      </Box>
    ),
  },
};
