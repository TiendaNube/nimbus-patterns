import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Title,
  Link,
  Text,
  IconButton,
  Button,
  Icon,
} from "@nimbus-ds/components";
import { ProductDataList } from "./ProductDataList";
import Sortable from "@nimbus-ds/sortable";
import { PlusCircleIcon } from "@nimbus-ds/icons";

const meta: Meta<typeof ProductDataList> = {
  title: "Components/ProductDataList",
  component: ProductDataList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductDataList>;

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Running Shoes",
    imageUrl: "static/Thumbnail.png",
    description: "High-performance running shoes for athletes",
  },
  {
    id: "2",
    title: "Sports Watch",
    imageUrl: "static/Thumbnail.png",
    description: "Digital sports watch with heart rate monitor",
  },
  {
    id: "3",
    title: "Yoga Mat",
    imageUrl: "static/Thumbnail.png",
    description: "Premium non-slip yoga mat",
  },
];

const ProductDataListSection = ({
  title,
  description,
  content,
  link,
  children,
}: {
  title: string;
  description: string;
  content?: React.ReactNode;
  link: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Box display="flex" flexDirection="column" gap="4">
        <Box>
          <Text fontSize="highlight">{title}</Text>
          <Text color="neutral-textLow">{description}</Text>
          {content}
        </Box>
        {link}
      </Box>
      {children}
    </>
  );
};

const ProductDataListProducts = ({
  sortable,
  items,
  onReorder,
  onRemove,
}: {
  sortable: boolean;
  items: Product[];
  onReorder: (items: Product[]) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <Box>
      <Sortable items={items} onReorder={onReorder} orientation="vertical">
        <hr
          style={{
            border: "1px solid rgba(163, 156, 156, 0.53)",
            width: "100%",
          }}
        />
        <Box display="flex" flexDirection="column" overflow="hidden">
          {items.map((item) => (
            <>
              <ProductDataList.Item
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                imageAlt={item.title}
                isDraggable={sortable}
                onRemove={() => onRemove(item.id)}
              />
              <hr
                style={{
                  border: "1px solid rgba(163, 156, 156, 0.53)",
                  width: "100%",
                }}
              />
            </>
          ))}
        </Box>
      </Sortable>
    </Box>
  );
};

// Template for interactive stories
const SortableTemplate = () => {
  const [products, setProducts] = useState(mockProducts);
  const [products2, setProducts2] = useState(mockProducts);

  const handleReorder = (newItems: Product[]) => {
    setProducts(newItems);
  };

  const handleReorder2 = (newItems: Product[]) => {
    setProducts2(newItems);
  };

  const handleRemove = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleRemove2 = (id: string) => {
    setProducts2(products2.filter((product) => product.id !== id));
  };

  return (
    <ProductDataList title="Productos relacionados" width="700px" margin="auto">
      <ProductDataListSection
        title="Alternativo"
        description="Productos relacionados"
        content={<Text>Featured Products</Text>}
        link={
          <Link appearance="primary" textDecoration="none">
            <Icon source={<PlusCircleIcon />} color="primary-interactive" />
            Agregar productos
          </Link>
        }
      >
        <ProductDataListProducts
          sortable={true}
          items={products}
          onReorder={handleReorder}
          onRemove={handleRemove}
        />
      </ProductDataListSection>
      <ProductDataListSection
        title="Featured Products"
        description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
        // content={<Text>Featured Products</Text>}
        link={
          <Link appearance="primary" textDecoration="none">
            <Icon source={<PlusCircleIcon />} color="primary-interactive" />
            Agregar productos
          </Link>
        }
      ></ProductDataListSection>
    </ProductDataList>
  );
};

export const Default: Story = {
  args: {
    title: "Featured Products",
    description: "Our top selling items",
    children: mockProducts.map((product) => (
      <ProductDataList.Item
        key={product.id}
        id={product.id}
        title={product.title}
        imageUrl={product.imageUrl}
        imageAlt={product.title}
      >
        <Text color="neutral-textLow">{product.description}</Text>
      </ProductDataList.Item>
    )),
  },
};

export const WithSortableItems: Story = {
  render: () => <SortableTemplate />,
};

export const WithRemoveButton: Story = {
  args: {
    title: "Manage Products",
    description: "Click the trash icon to remove products",
    children: mockProducts.map((product) => (
      <ProductDataList.Item
        key={product.id}
        id={product.id}
        title={product.title}
        imageUrl={product.imageUrl}
        imageAlt={product.title}
        onRemove={() => alert(`Remove ${product.title}`)}
      >
        <Text color="neutral-textLow">{product.description}</Text>
      </ProductDataList.Item>
    )),
  },
};

export const Minimal: Story = {
  args: {
    children: mockProducts
      .slice(0, 2)
      .map((product) => (
        <ProductDataList.Item
          key={product.id}
          id={product.id}
          title={product.title}
          imageUrl={product.imageUrl}
          imageAlt={product.title}
        />
      )),
  },
};
