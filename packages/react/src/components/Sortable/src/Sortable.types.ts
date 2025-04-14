import { ReactNode } from "react";
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier,
  PointerSensorOptions,
} from "@dnd-kit/core";
import { orientation } from "./Sortable.definitions";

// Type for items that can be sorted
export type SortableItemType = { id: UniqueIdentifier };

/**
 * Activation constraints for drag detection
 */
export interface DragActivationConstraint {
  /** Maximum distance (in pixels) allowed for movement before drag activates */
  distance?: number;
  /** Time in milliseconds to wait before canceling a potential drag */
  delay?: number;
  /** Movement tolerance in pixels before canceling a drag */
  tolerance?: number;
  /** Whether to use pressure-based activation (for Apple Pencil etc) */
  pressure?: number;
}

// Properties specific to the Sortable component
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
   * Custom sensor options for drag detection.
   * @example
   * ```tsx
   * <Sortable
   *   sensorOptions={{
   *     // Allow smoother dragging with more forgiving constraints
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
}

// Props that can be passed to the Sortable component
export type SortableProps<T extends SortableItemType> = SortableProperties<T>;

// Context value for sortable functionality
export interface SortableContextValue {
  /** Currently active (being dragged) item ID */
  activeId: UniqueIdentifier | null;
}
