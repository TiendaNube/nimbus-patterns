import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { Layout } from "../../Layout";

const meta: Meta<typeof Layout.Section> = {
  title: "Patterns/Layout/Layout.Section",
  component: Layout.Section,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Layout>
      <Layout.Section {...args} />
    </Layout>
  ),
};

export default meta;
type Story = StoryObj<typeof Layout.Section>;

export const basic: Story = {
  args: {
    children: (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="primary-surface"
        borderColor="primary-interactive"
        borderStyle="dashed"
        borderWidth="1"
        borderRadius="2"
        width="100%"
        padding="4"
        boxSizing="border-box"
      >
        <Text fontSize="caption" textAlign="center" color="primary-interactive">
          content
        </Text>
      </Box>
    ),
  },
};
