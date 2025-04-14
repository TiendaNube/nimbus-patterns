import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SortableItemHandle } from "./SortableItemHandle";
import { SortableItemContext } from "../SortableItem/SortableItemContext";

const mockContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActivatorNodeRef: () => {},
  attributes: {
    role: "button",
    tabIndex: 0,
    "aria-describedby": "draggable-handle",
    "aria-disabled": false,
    "aria-pressed": false,
    "aria-roledescription": "draggable"
  },
  listeners: undefined
};

const meta: Meta<typeof SortableItemHandle> = {
  title: "Components/Sortable/SortableItemHandle",
  component: SortableItemHandle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SortableItemContext.Provider value={mockContextValue}>
        <Story />
      </SortableItemContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SortableItemHandle>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    children: "⋮ Drag Handle",
  },
}; 