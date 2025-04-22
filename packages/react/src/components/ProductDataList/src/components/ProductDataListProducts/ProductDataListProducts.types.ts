import { ReactNode } from "react";

import { SortableItemType } from "@nimbus-ds/sortable";

/**
 * Properties specific to the ProductDataListSortable component
 */
export interface ProductDataListProductsProperties<T extends SortableItemType> {
  sortable: boolean;
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem?: (item: T) => ReactNode;
  children?: ReactNode;
}
