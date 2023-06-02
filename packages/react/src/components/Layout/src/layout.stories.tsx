import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { Layout } from "./Layout";

const ExampleBox: React.FC<{ text: string }> = ({ text }: { text: string }) => (
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
      {text}
    </Text>
  </Box>
);

const meta: Meta<typeof Layout> = {
  title: "Patterns/Layout",
  component: Layout,
  argTypes: {
    children: { control: { disable: true } },
    columns: { control: "select" },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Layout {...args}>
      <Layout.Section>
        <ExampleBox text="1st content" />
      </Layout.Section>
      <Layout.Section>
        <ExampleBox text="2nd content" />
      </Layout.Section>
      <Layout.Section>
        <ExampleBox text="3rd content" />
      </Layout.Section>
      <Layout.Section>
        <ExampleBox text="4th content" />
      </Layout.Section>
      <Layout.Section>
        <ExampleBox text="5th content" />
      </Layout.Section>
      <Layout.Section>
        <ExampleBox text="6th content" />
      </Layout.Section>
    </Layout>
  ),
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const basic: Story = {
  args: {},
};

export const oneColumn: Story = {
  args: {
    columns: "1",
  },
};

export const twoColumnsAsymmetric: Story = {
  args: {
    columns: "2 - asymmetric",
  },
};

export const twoColumnsSymmetric: Story = {
  args: {
    columns: "2 - symmetric",
  },
};

export const threeColumns: Story = {
  args: {
    columns: "3",
  },
};
