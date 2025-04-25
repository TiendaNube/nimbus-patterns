import { ReactNode } from "react";

import { SortableItemType, SortableProperties } from "@nimbus-ds/sortable";
import { BoxProps } from "@nimbus-ds/components";

/**
 * Properties specific to the ProductDataListSortable component
 */
export interface ProductDataListProductsProperties<T extends SortableItemType> {
  items: T[];
  onReorder: (items: T[]) => void;
  sortable?: boolean;
  renderItem: (item: T, index: number) => ReactNode;
  sortableProps?: Omit<
    SortableProperties<T>,
    | "items"
    | "onReorder"
    | "orientation"
    | "disabled"
    | "renderOverlay"
    | "children"
  >;
}

export type ProductDataListProductsProps<T extends SortableItemType> =
  ProductDataListProductsProperties<T> &
    Omit<BoxProps, "my" | "display" | "flexDirection" | "gap">;
