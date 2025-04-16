import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Box, Card } from "@nimbus-ds/components";
import { SortableItem } from "./SortableItem";
import { SortableItemHandle } from "../SortableItemHandle";

const meta: Meta<typeof SortableItem> = {
  title: "Patterns/Sortable/SortableItem",
  component: SortableItem,
  decorators: [
    (Story) => (
      <DndContext>
        <SortableContext items={["test-1"]}>
          <Story />
        </SortableContext>
      </DndContext>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SortableItem>;

const mockItem = { id: "test-1", content: "Test Item" };

export const Default: Story = {
  args: {
    id: mockItem.id,
    children: (
      <Card>
        <Card.Body>Draggable Item</Card.Body>
      </Card>
    ),
  },
};

export const WithHandle: Story = {
  args: {
    id: mockItem.id,
    handle: true,
    children: (
      <Card>
        <Card.Body>
          <Box display="flex" alignItems="center" gap="2">
            <SortableItemHandle>⋮⋮</SortableItemHandle>
            Draggable with Handle
          </Box>
        </Card.Body>
      </Card>
    ),
  },
};

export const Disabled: Story = {
  args: {
    id: mockItem.id,
    disabled: true,
    children: (
      <Card>
        <Card.Body>
          <Box cursor="not-allowed">Disabled Item</Box>
        </Card.Body>
      </Card>
    ),
  },
};

export const WithRenderFunction: Story = {
  args: {
    id: mockItem.id,
    renderItem: ({ isDragging, attributes, listeners, setNodeRef, style }) => (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card>
          <Card.Body>{isDragging ? "Dragging..." : "Drag me!"}</Card.Body>
        </Card>
      </div>
    ),
  },
};
