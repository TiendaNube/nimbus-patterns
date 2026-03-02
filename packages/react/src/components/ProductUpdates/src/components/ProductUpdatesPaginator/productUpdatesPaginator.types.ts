import { HTMLAttributes } from "react";

export interface ProductUpdatesPaginatorProperties {
  /**
   * Total number of items/steps in the pagination.
   */
  totalItems: number;
  /**
   * Zero-based index of the currently active item.
   */
  activeIndex: number;
}

export type ProductUpdatesPaginatorProps = ProductUpdatesPaginatorProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
