import { ReactNode, HTMLAttributes } from "react";

import { TableProps } from "@nimbus-ds/components";

import {
  DataTableBulkActions,
  DataTableHeader,
  DataTableFooter,
  DataTableRow,
} from "./components";

type DataTableExtend = TableProps & HTMLAttributes<HTMLElement>;

export interface DataTableComponents {
  BulkActions: typeof DataTableBulkActions;
  Header: typeof DataTableHeader;
  Footer: typeof DataTableFooter;
  Row: typeof DataTableRow;
}

export interface DataTableProps extends DataTableExtend {
  /** Bulk actions component rendered with a sticky position over the top of the table element */
  bulkActions?: ReactNode;
  /** Table header content */
  header: ReactNode;
  /** Optional table footer content */
  footer?: ReactNode;
  /** Table body content */
  children: ReactNode;
}
