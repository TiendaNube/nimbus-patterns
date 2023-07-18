import { HTMLAttributes } from "react";

import { PaginationProperties, PaginationProps } from "@nimbus-ds/components";

export interface DataTableFooterProperties {
  /**
   * Left-hand side text intended for displaying an item count.
   */
  itemCount: string;
  /**
   * Pagination element rendered on the right-side of the footer.
   */
  pagination?: PaginationProperties;
}

export type DataTableFooterProps = DataTableFooterProperties & {
  pagination?: PaginationProps;
} & Omit<HTMLAttributes<HTMLElement>, "color">;
