import { ReactNode, HTMLAttributes } from "react";

import { TableProperties } from "@nimbus-ds/components";

import {
  DataTableBulkActions,
  DataTableHeader,
  DataTableFooter,
  DataTableRow,
} from "./components";

export interface DataTableComponents {
  BulkActions: typeof DataTableBulkActions;
  Header: typeof DataTableHeader;
  Footer: typeof DataTableFooter;
  Row: typeof DataTableRow;
}

export interface DataTableProperties {
  /**
   * Bulk actions component rendered with a sticky position over the top of the table element.
   * @TJS-type React.ReactNode
   */
  bulkActions?: ReactNode;
  /**
   * Table header content.
   * @TJS-type React.ReactNode
   */
  header: ReactNode;
  /**
   * Optional table footer content.
   * @TJS-type React.ReactNode
   */
  footer?: ReactNode;
  /**
   * Table body content.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataTableProps = DataTableProperties &
  TableProperties &
  HTMLAttributes<HTMLElement>;
