import { HTMLAttributes } from "react";

import { PaginationProps } from "@nimbus-ds/pagination";

export interface DataTableFooterProps extends HTMLAttributes<HTMLElement> {
  /** Left-hand side text intended for displaying an item count */
  itemCount: string;
  /** Pagination element rendered on the right-side of the footer */
  pagination?: PaginationProps;
}
