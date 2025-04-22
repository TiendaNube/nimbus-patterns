import { ReactNode } from "react";
import type {
  SortableProperties,
  SortableItemType,
} from "../../Sortable/src/Sortable.types";
import type { BoxProps } from "@nimbus-ds/components";
export type { SortableItemType };

/**
 * Properties specific to the ProductDataList component
 */
export interface ProductDataListProperties {
  /**
   * The content to be rendered inside the list
   */
  children: ReactNode;
  /**
   * Optional title for the list section
   */
  title?: string;
  /**
   * Optional description for the list section
   */
  description?: string;
}

/**
 * Props that can be passed to the ProductDataList component
 */
export type ProductDataListProps = ProductDataListProperties &
  Omit<BoxProps, "padding" | "display" | "flexDirection" | "gap">;

/**
 * Properties specific to the ProductDataListSortable component
 */
export interface ProductDataListSortableProperties<T extends SortableItemType> {
  /**
   * The content to be rendered inside the sortable list
   */
  children: ReactNode;
  /**
   * Optional title for the list section
   */
  title?: string;
  /**
   * Optional description for the list section
   */
  description?: string;
}

/**
 * Props that can be passed to the ProductDataListSortable component
 */
export type ProductDataListSortableProps<
  T extends SortableItemType = SortableItemType
> = ProductDataListSortableProperties<T> &
  Omit<SortableProperties<T>, "children">;
