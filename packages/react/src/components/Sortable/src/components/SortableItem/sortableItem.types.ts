import { ReactNode, CSSProperties, ReactElement } from "react";
import { UniqueIdentifier, DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export interface SortableItemContainerProperties {
  /** Drag attributes required for drag functionality */
  attributes: DraggableAttributes;
  /** Event listeners for drag functionality */
  listeners: SyntheticListenerMap | undefined;
  /** Reference setter for the draggable node */
  setNodeRef: (node: HTMLElement | null) => void;
  /** Style properties for drag animation */
  style: CSSProperties;
  /** Whether the item is a drag handle */
  handle?: boolean;
  /** The children components */
  children: ReactNode;
}

export interface RenderItemProps
  extends Omit<SortableItemContainerProperties, "children" | "handle"> {
  /** Whether the item is currently being dragged */
  isDragging: boolean;
}

// Properties specific to the SortableItem component
export interface SortableItemProperties {
  /** The unique identifier for the item */
  id: UniqueIdentifier;
  /** Whether the item is disabled from being dragged */
  disabled?: boolean;
  /** Custom drag handle selector */
  handle?: boolean;
  /** The children components */
  children?: ReactNode;
  /** Optional render function that receives drag state and handlers */
  renderItem?: (props: RenderItemProps) => ReactElement;
}

// Props that can be passed to the SortableItem component
export type SortableItemProps = SortableItemProperties &
  (
    | { children: ReactNode; renderItem?: undefined }
    | {
        children?: undefined;
        renderItem: (props: RenderItemProps) => ReactElement;
      }
  );
