import { ReactNode, HTMLAttributes } from "react";

import { TableProperties, BoxProps } from "@nimbus-ds/components";

import {
  DataTableBulkActions,
  DataTableHeader,
  DataTableFooter,
  DataTableRow,
  DataTableCell,
} from "./components";

export interface DataTableComponents {
  BulkActions: typeof DataTableBulkActions;
  Header: typeof DataTableHeader;
  Footer: typeof DataTableFooter;
  Row: typeof DataTableRow;
  Cell: typeof DataTableCell;
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
  /**
   * Props passed to the container box element.
   * @TJS-type BoxProps
   */
  containerProps?: BoxProps;
}

export type DataTableProps = DataTableProperties &
  TableProperties &
  HTMLAttributes<HTMLElement>;
