import { ReactNode } from "react";
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier,
  PointerSensorOptions,
  DropAnimation,
  Modifiers,
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

/**
 * Configuration for the drag overlay appearance and behavior
 */
export interface DragOverlaySettings {
  /**
   * Animation configuration for when the item is dropped
   * @default { duration: 0, easing: "ease" }
   */
  dropAnimation?: DropAnimation | null;
  /** Modifiers to adjust the overlay position/behavior */
  modifiers?: Modifiers;
  /** Custom transition timing */
  transition?: string;
  /** Z-index for the overlay */
  zIndex?: number;
  /** The HTML element to wrap the overlay content in */
  wrapperElement?: keyof JSX.IntrinsicElements;
}

/**
 * Default overlay settings with no animation duration
 */
export const DEFAULT_OVERLAY_SETTINGS: DragOverlaySettings = {
  dropAnimation: {
    duration: 0,
    easing: "ease",
  },
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
  overlaySettings?: DragOverlaySettings;
  /** Render function for the dragged item overlay */
  renderOverlay?: (item: T) => ReactNode;
}

/**
 * Props that can be passed to the Sortable component
 */
export type SortableProps<T extends SortableItemType> = SortableProperties<T>;

/**
 * Context value for sortable functionality
 */
export interface SortableContextValue {
  /** Currently active (being dragged) item ID */
  activeId: UniqueIdentifier | null;
}
