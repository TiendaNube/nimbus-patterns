import { ReactNode } from "react";

import { SortableItemType, SortableProps } from "@nimbus-ds/sortable";
import { BoxProps } from "@nimbus-ds/components";

/**
 * Properties specific to the ProductDataListProducts component
 *
 * @template T - The type of each sortable item in the list
 */
export interface ProductDataListProductsProperties<T extends SortableItemType> {
  /**
   * The array of items to be rendered and sorted in the list.
   */
  items: T[];
  /**
   * Callback fired when the order of items changes.
   *
   * @param items - The reordered array of items
   */
  onReorder: (items: T[]) => void;
  /**
   * If true, enables drag-and-drop sorting for the list items.
   * @default false
   */
  sortable?: boolean;
  /**
   * Function to render each item in the list.
   *
   * @param item - The item to render
   * @param index - The index of the item in the list
   * @returns The rendered node for the item
   */
  renderItem: (item: T, index: number) => ReactNode;
  /**
   * Additional properties to pass to the sortable container.
   */
  sortableProps?: object; // Set to object because docs generation doesn't support generics
}

/**
 * Props that can be passed to the ProductDataListProducts component, including sortable and layout properties.
 *
 * @template T - The type of each sortable item in the list
 */
export type ProductDataListProductsProps<T extends SortableItemType> =
  ProductDataListProductsProperties<T> & {
    /**
     * Additional properties for the sortable container, omitting core sortable and layout props.
     */
    // Set here to avoid generating these types into the .docs.json
    sortableProps?: Omit<
      SortableProps<T>,
      | "items"
      | "onReorder"
      | "orientation"
      | "disabled"
      | "renderOverlay"
      | "children"
    >;
  } & Omit<BoxProps, "my" | "display" | "flexDirection" | "gap">;
