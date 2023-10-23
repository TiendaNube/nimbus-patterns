import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Thumbnail, Text } from "@nimbus-ds/components";

import { ProductUpdates } from "./ProductUpdates";

const meta: Meta<typeof ProductUpdates> = {
  title: "Patterns/ProductUpdates",
  component: ProductUpdates,
  argTypes: {
    bodyContent: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <ProductUpdates {...args}>
      <Text fontSize="base" color="primary-interactive" textAlign="center">
        This is a new feature that is being showcased by our Product Updates
        component
      </Text>
    </ProductUpdates>
  ),
};

export default meta;
type Story = StoryObj<typeof ProductUpdates>;

export const basic: Story = {
  args: {
    title: "Title",
    text: "Content text",
    visible: true,
  },
};

export const withDismissLink: Story = {
  args: {
    title: "Title",
    text: "Content text",
    dismissLink: "Dismiss Popover",
    visible: true,
  },
};

export const withDismissButton: Story = {
  args: {
    title: "Title",
    text: "Content text",
    visible: true,
  },
};

export const withCustomContent: Story = {
  args: {
    title: "Title",
    text: "Content text",
    visible: true,
    maxWidth: "300px",
    bodyContent: (
      <Thumbnail
        aspectRatio="2/1"
        alt="Thumbnail component"
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2299&q=80"
      />
    ),
  },
};
