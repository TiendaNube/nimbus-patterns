import { ReactNode } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface SortableItemProperties {
  /** The item data */
  item: any;
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

export type SortableItemProps = SortableItemProperties; 