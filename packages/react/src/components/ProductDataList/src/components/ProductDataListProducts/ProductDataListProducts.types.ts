import { ReactNode } from "react";

import { SortableItemType } from "@nimbus-ds/sortable";
import { BoxProps } from "@nimbus-ds/components";

/**
 * Properties specific to the ProductDataListSortable component
 */
export interface ProductDataListProductsProperties<T extends SortableItemType> {
  items: T[];
  onReorder: (items: T[]) => void;
  sortable?: boolean;
  renderItem?: (item: T) => ReactNode;
  children?: ReactNode;
}

export type ProductDataListProductsProps<T extends SortableItemType> =
  ProductDataListProductsProperties<T> &
    Omit<BoxProps, "padding" | "display" | "flexDirection" | "gap">;
