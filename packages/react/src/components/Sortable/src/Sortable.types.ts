import { ReactNode } from "react";
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier,
  PointerSensorOptions,
  DragOverlayProps,
} from "@dnd-kit/core";
import { orientation } from "./Sortable.definitions";

/**
 * Base type for items that can be sorted
 */
export type SortableItemType = {
  /** Unique identifier for the sortable item */
  id: UniqueIdentifier;
};

/**
 * Properties specific to the Sortable component
 */
export interface SortableProperties<T extends SortableItemType> {
  /** The children components */
  children: ReactNode;
  /** Whether to disable sorting functionality */
  disabled?: boolean;
  /** The items to be sorted */
  items: T[];
  /** Callback fired when items are reordered */
  onReorder: (items: T[]) => void;
  /** Callback fired when drag starts */
  onDragStart?: (event: DragStartEvent) => void;
  /** Callback fired during drag */
  onDragOver?: (event: DragOverEvent) => void;
  /** Callback fired when drag ends */
  onDragEnd?: (event: DragEndEvent) => void;
  /** The orientation of the sortable list */
  orientation?: typeof orientation.vertical | typeof orientation.horizontal;
  /**
   * Custom sensor options for drag detection
   * @example
   * ```tsx
   * <Sortable
   *   sensorOptions={{
   *     activationConstraint: {
   *       distance: 20, // Allow movements up to 20px
   *       delay: 150,  // Wait 150ms before canceling
   *       tolerance: 5 // Tolerate 5px of movement
   *     }
   *   }}
   * >
   * ```
   */
  sensorOptions?: PointerSensorOptions;
  /** Configuration for the drag overlay appearance and behavior */
  overlaySettings?: DragOverlayProps;
  /** Render function for the dragged item overlay */
  renderOverlay?: (item: T) => ReactNode;
}

/**
 * Context value for sortable functionality
 */
export interface SortableContextValue {
  /** Currently active (being dragged) item ID */
  activeId: UniqueIdentifier | null;
}
