import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@nimbus-ds/components';
import { ProductDataListItem } from './ProductDataListItem';

const meta: Meta<typeof ProductDataListItem> = {
  title: 'Patterns/ProductDataList/Item',
  component: ProductDataListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductDataListItem>;

export const Default: Story = {
  args: {
    title: 'Product Name',
    imageUrl: 'static/Thumbnail.png',
    imageAlt: 'Product image',
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    children: (
      <Text color="neutral-textLow">
        This is a description of the product that can span multiple lines if needed.
      </Text>
    ),
  },
};

export const Draggable: Story = {
  args: {
    ...WithDescription.args,
    isDraggable: true,
  },
};

export const WithRemoveButton: Story = {
  args: {
    ...WithDescription.args,
    onRemove: () => alert('Remove clicked'),
  },
}; 