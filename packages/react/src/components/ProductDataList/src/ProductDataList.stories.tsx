import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link, Icon, Tag, Card, Box, Radio } from "@nimbus-ds/components";
import { EditIcon, PlusCircleIcon, TagIcon } from "@nimbus-ds/icons";
import { ProductDataList } from "./ProductDataList";
import { ProductDataListItem } from "./components/ProductDataListItem";

const meta: Meta<typeof ProductDataList> = {
  title: "Patterns/ProductDataList",
  component: ProductDataList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box maxWidth="700px" mx="auto">
        <Card padding="none">
          <Card.Body padding="none">
            <Story />
          </Card.Body>
        </Card>
      </Box>
    ),
  ],
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
  {
    id: "4",
    title: "Short",
    imageUrl: "static/Thumbnail.png",
    description: "Running shorts with breathable mesh fabric",
  },
  {
    id: "5",
    title: "Sleeveless",
    imageUrl: "static/Thumbnail.png",
    description: "Sleeveless top with breathable mesh fabric",
  },
  {
    id: "6",
    title: "T-Shirt",
    imageUrl: "static/Thumbnail.png",
    description: "T-shirt with breathable mesh fabric",
  },
  {
    id: "7",
    title: "Watch",
    imageUrl: "static/Thumbnail.png",
    description: "Watch with breathable mesh fabric",
  },
  {
    id: "8",
    title: "Belt",
    imageUrl: "static/Thumbnail.png",
    description: "Belt with breathable mesh fabric",
  },
];

export const InitialState: Story = {
  render: () => (
    <ProductDataList title="Productos relacionados">
      <ProductDataList.Section
        title="Alternativo"
        description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
        link={
          <Link appearance="primary" textDecoration="none">
            <Icon source={<PlusCircleIcon />} color="primary-interactive" />
            Agregar productos
          </Link>
        }
      />
      <ProductDataList.ItemDivider />
      <ProductDataList.Section
        title="Complementarios"
        description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
        link={
          <Link appearance="primary" textDecoration="none">
            <Icon source={<PlusCircleIcon />} color="primary-interactive" />
            Agregar productos
          </Link>
        }
      />
    </ProductDataList>
  ),
};

export const OneSection: Story = {
  render: () => {
    const [products, setProducts] = useState(mockProducts.slice(0, 3));
    const [selected, setSelected] = useState("1");

    const radios = [
      {
        name: "1",
        value: "1",
        label: "Toda la tienda",
      },
      {
        name: "2",
        value: "2",
        label: "Categoría",
      },
      {
        name: "3",
        value: "3",
        label: "Productos",
      },
    ];

    const handleReorder = (newItems: Product[]) => {
      setProducts(newItems);
    };

    const handleRemove = (id: string) => {
      setProducts(products.filter((product) => product.id !== id));
    };

    return (
      <ProductDataList title="Productos relacionados">
        <ProductDataList.Section
          content={
            <Box display="flex" gap="2">
              {radios.map((radio) => (
                <Radio
                  as="button"
                  name={radio.name}
                  value={radio.value}
                  label={radio.label}
                  checked={selected === radio.value}
                  onChange={() => setSelected(radio.value)}
                />
              ))}
            </Box>
          }
          link={
            <Link appearance="primary" textDecoration="none">
              <Icon source={<EditIcon />} color="primary-interactive" />
              Editar productos
            </Link>
          }
        >
          <ProductDataList.Products<Product>
            items={products}
            onReorder={handleReorder}
            renderItem={(product, index) => (
              <ProductDataListItem
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                imageAlt={product.title}
                onRemove={() => handleRemove(product.id)}
                withDivider={index !== products.length - 1}
              />
            )}
          />
        </ProductDataList.Section>
      </ProductDataList>
    );
  },
};

export const WithSortableItems: Story = {
  render: () => {
    const [products, setProducts] = useState(mockProducts.slice(0, 5));

    const handleReorder = (newItems: Product[]) => {
      setProducts(newItems);
    };

    const handleRemove = (id: string) => {
      setProducts(products.filter((product) => product.id !== id));
    };

    return (
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
                withDivider
              />
            )}
          />
        </ProductDataList.Section>
        <ProductDataList.Section
          title="Featured Products"
          description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
          link={
            <Link appearance="primary" textDecoration="none">
              <Icon source={<PlusCircleIcon />} color="primary-interactive" />
              Agregar productos
            </Link>
          }
        />
      </ProductDataList>
    );
  },
};

export const WithVerticalScroll: Story = {
  render: () => {
    const [products, setProducts] = useState(mockProducts);

    const handleReorder = (newItems: Product[]) => {
      setProducts(newItems);
    };

    const handleRemove = (id: string) => {
      setProducts(products.filter((product) => product.id !== id));
    };

    return (
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
                withDivider
              />
            )}
          />
        </ProductDataList.Section>
        <ProductDataList.Section
          title="Featured Products"
          description="Pueden ser opciones similares a este producto. Ejemplo: una remera lisa o una rayada."
          link={
            <Link appearance="primary" textDecoration="none">
              <Icon source={<PlusCircleIcon />} color="primary-interactive" />
              Agregar productos
            </Link>
          }
        />
      </ProductDataList>
    );
  },
};
