import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";
import { ProductDataListSection } from "./ProductDataListSection";

const meta: Meta<typeof ProductDataListSection> = {
  title: "Patterns/ProductDataList/ProductDataListSection",
  component: ProductDataListSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "ProductDataListSection is a component that displays a section of product data with a title, description, optional content, and a link."
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ProductDataListSection>;

export const Default: Story = {
  args: {
    title: "Product Information",
    description: "Details about the product specifications",
    link: <a href="#">See more details</a>
  }
};

export const WithContent: Story = {
  args: {
    ...Default.args,
    content: (
      <Box display="flex" flexDirection="column" gap="2" marginTop="2">
        <Text>CPU: Intel i7</Text>
        <Text>RAM: 16GB</Text>
        <Text>Storage: 512GB SSD</Text>
      </Box>
    )
  }
};

export const WithChildren: Story = {
  args: {
    ...Default.args,
    children: (
      <Box marginTop="4" padding="4" backgroundColor="neutral-surface">
        <Text>Additional information can be placed here as children</Text>
      </Box>
    )
  }
};

export const CompleteExample: Story = {
  args: {
    ...Default.args,
    content: (
      <Box display="flex" flexDirection="column" gap="2" marginTop="2">
        <Text>CPU: Intel i7</Text>
        <Text>RAM: 16GB</Text>
      </Box>
    ),
    children: (
      <Box marginTop="4" padding="4" backgroundColor="neutral-surface">
        <Text>Additional specifications and details</Text>
      </Box>
    )
  }
}; 