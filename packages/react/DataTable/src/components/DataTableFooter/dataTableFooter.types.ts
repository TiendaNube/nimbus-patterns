import { HTMLAttributes } from "react";

import { PaginationProps } from "@nimbus-ds/components";

export interface DataTableFooterProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Left-hand side text intended for displaying an item count */
  itemCount: string;
  /** Pagination element rendered on the right-side of the footer */
  pagination?: PaginationProps;
}
