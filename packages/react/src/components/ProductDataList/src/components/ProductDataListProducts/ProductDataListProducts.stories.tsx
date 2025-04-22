import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { ProductDataList } from "../../ProductDataList";
import { ProductDataListProducts } from "./ProductDataListProducts";

const meta: Meta<typeof ProductDataList.Products> = {
  title: "Components/ProductDataList/Products",
  component: ProductDataList.Products,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductDataList.Products>;

const ProductItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Box padding="4" borderRadius="2">
    <Text>{title}</Text>
    <Text>{description}</Text>
  </Box>
);

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", title: "Product 1", description: "Description for product 1" },
      { id: "2", title: "Product 2", description: "Description for product 2" },
      { id: "3", title: "Product 3", description: "Description for product 3" },
    ]);

    const handleReorder = (newItems: typeof items) => {
      setItems(newItems);
    };

    return (
      <ProductDataListProducts sortable items={items} onReorder={handleReorder}>
        {items.map((item) => (
          <ProductItem
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </ProductDataListProducts>
    );
  },
};
