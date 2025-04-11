import React, { ReactNode } from "react";
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier,
  PointerSensorOptions,
} from "@dnd-kit/core";

export interface SortableProps<T extends { id: UniqueIdentifier }> {
  /** The items to be sorted */
  items: T[];
  /** Callback fired when items are reordered */
  onReorder: (items: T[]) => void;
  /** The orientation of the sortable list */
  orientation?: "vertical" | "horizontal";
  /** Custom sensor options for drag detection */
  sensorOptions?: PointerSensorOptions;
  /** Callback fired when drag starts */
  onDragStart?: (event: DragStartEvent) => void;
  /** Callback fired during drag */
  onDragOver?: (event: DragOverEvent) => void;
  /** Callback fired when drag ends */
  onDragEnd?: (event: DragEndEvent) => void;
  /** Whether to disable sorting functionality */
  disabled?: boolean;
  /** Container component or element type */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /** Additional props for the container element */
  containerProps?: React.HTMLAttributes<HTMLElement>;
  /** The children components */
  children: ReactNode;
}

export interface SortableItemProps<T = any> {
  /** The item data */
  item: T;
  /** The unique identifier for the item */
  id: UniqueIdentifier;
  /** Whether the item is disabled from being dragged */
  disabled?: boolean;
  /** Custom drag handle selector */
  handle?: boolean;
  /** Additional props for the item element */
  itemProps?: React.HTMLAttributes<HTMLElement>;
  /** The children components or render function */
  children: ReactNode | ((props: { isDragging: boolean }) => ReactNode);
}

export interface SortableContextValue {
  activeId: UniqueIdentifier | null;
}
