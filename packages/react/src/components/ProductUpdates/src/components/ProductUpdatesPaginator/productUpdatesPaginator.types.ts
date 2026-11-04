import { HTMLAttributes } from "react";

export interface ProductUpdatesPaginatorProperties {
  /**
   * Colour scheme of the dots: `primary` for the primary popover surface,
   * `neutral` for a `neutral-background` surface.
   * @default "primary"
   */
  appearance?: "primary" | "neutral";
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
  Omit<HTMLAttributes<HTMLElement>, "color" | "className" | "style">;
