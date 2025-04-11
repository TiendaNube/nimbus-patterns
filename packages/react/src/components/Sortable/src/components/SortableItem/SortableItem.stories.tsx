import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const meta: Meta<typeof SortableItem> = {
  title: "Components/Sortable/SortableItem",
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
    item: mockItem,
    children: <div style={{ padding: "1rem", border: "1px solid #ccc" }}>Draggable Item</div>,
  },
};

export const WithHandle: Story = {
  args: {
    id: mockItem.id,
    item: mockItem,
    handle: true,
    children: (
      <div style={{ 
        padding: "1rem", 
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <span data-handle-selector style={{ cursor: "grab" }}>⋮⋮</span>
        Draggable with Handle
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    id: mockItem.id,
    item: mockItem,
    disabled: true,
    children: <div style={{ padding: "1rem", border: "1px solid #ccc", opacity: 0.5 }}>Disabled Item</div>,
  },
};

export const WithRenderFunction: Story = {
  args: {
    id: mockItem.id,
    item: mockItem,
    children: ({ isDragging }: { isDragging: boolean }) => (
      <div style={{ 
        padding: "1rem", 
        border: "1px solid #ccc",
        background: isDragging ? "#f0f0f0" : "white",
        transform: isDragging ? "scale(1.02)" : "none",
        transition: "all 0.2s"
      }}>
        {isDragging ? "Dragging..." : "Drag me!"}
      </div>
    ),
  },
};
