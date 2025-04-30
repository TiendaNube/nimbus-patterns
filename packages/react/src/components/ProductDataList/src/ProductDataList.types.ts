import { ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/components";
import {
  ProductDataListProducts,
  ProductDataListItem,
  ProductDataListSection,
  ProductDataListItemDivider,
} from "./components";

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
  title?: ReactNode;
}

/**
 * Props that can be passed to the ProductDataList component
 */
export type ProductDataListProps = ProductDataListProperties &
  Omit<BoxProps, "padding" | "display" | "flexDirection" | "gap">;

export interface ProductDataListComponents {
  Products: typeof ProductDataListProducts;
  Item: typeof ProductDataListItem;
  Section: typeof ProductDataListSection;
  ItemDivider: typeof ProductDataListItemDivider;
}
