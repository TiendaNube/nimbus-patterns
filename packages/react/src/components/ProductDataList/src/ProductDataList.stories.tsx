import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link, Text, Icon, Tag, Card, Box } from "@nimbus-ds/components";
import { EditIcon, PlusCircleIcon, TagIcon } from "@nimbus-ds/icons";
import { ProductDataList } from "./ProductDataList";
import { ProductDataListItem } from "./components/ProductDataListItem";

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

export const Default: Story = {
  args: {
    title: "Featured Products",
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
  render: () => {
    const [products, setProducts] = useState(mockProducts);

    const handleReorder = (newItems: Product[]) => {
      setProducts(newItems);
    };

    const handleRemove = (id: string) => {
      setProducts(products.filter((product) => product.id !== id));
    };

    return (
      <Box maxWidth="700px" mx="auto">
        <Card>
          <Card.Body>
            <ProductDataList title="Productos relacionados">
              <ProductDataList.Section
                title="Alternativo"
                description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
                content={
                  <Tag appearance="warning">
                    <TagIcon size={12} /> 8 de 8 productos
                  </Tag>
                }
                link={
                  <Link appearance="primary" textDecoration="none">
                    <Icon source={<EditIcon />} color="primary-interactive" />
                    Editar productos
                  </Link>
                }
              >
                <ProductDataList.Products<Product>
                  sortable
                  items={products}
                  onReorder={handleReorder}
                  renderItem={(product) => (
                    <ProductDataListItem
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      imageUrl={product.imageUrl}
                      imageAlt={product.title}
                      isDraggable
                      onRemove={() => handleRemove(product.id)}
                    />
                  )}
                ></ProductDataList.Products>
              </ProductDataList.Section>
              <ProductDataList.Section
                title="Featured Products"
                description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
                link={
                  <Link appearance="primary" textDecoration="none">
                    <Icon
                      source={<PlusCircleIcon />}
                      color="primary-interactive"
                    />
                    Agregar productos
                  </Link>
                }
              />
            </ProductDataList>
          </Card.Body>
        </Card>
      </Box>
    );
  },
};

export const WithRemoveButton: Story = {
  args: {
    title: "Manage Products",
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
