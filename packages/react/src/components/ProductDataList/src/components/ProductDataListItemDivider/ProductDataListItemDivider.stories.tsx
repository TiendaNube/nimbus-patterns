import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductDataListItemDivider } from "./ProductDataListItemDivider";

const meta: Meta<typeof ProductDataListItemDivider> = {
  title: "Patterns/ProductDataList/ProductDataListItemDivider",
  component: ProductDataListItemDivider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  render: () => <ProductDataListItemDivider width="100px" />, 
};

export default meta;
type Story = StoryObj<typeof ProductDataListItemDivider>;

/**
 * Basic usage of the ProductDataListItemDivider component.
 */
export const Default: Story = {
  args: {},
};

/**
 * Example with custom width to demonstrate the divider's flexibility.
 */
export const CustomWidth: Story = {
  args: {
    width: "300px",
  },
};