import { ReactNode } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

// Properties specific to the SortableItemHandle component
export interface SortableItemHandleProperties {
  /** The reference callback for the handle element */
  setActivatorNodeRef?: (node: HTMLElement | null) => void;
  /** DND-kit drag attributes */
  attributes?: DraggableAttributes;
  /** DND-kit drag listeners */
  listeners?: SyntheticListenerMap | undefined;
  /** Custom icon or content for the handle */
  children?: ReactNode;
}

// Props that can be passed to the SortableItemHandle component
export type SortableItemHandleProps = SortableItemHandleProperties;
