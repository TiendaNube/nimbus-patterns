import { ReactNode, HTMLAttributes } from "react";

import { TableProperties, BoxProps } from "@nimbus-ds/components";

import {
  DataTableBulkActions,
  DataTableCell,
  DataTableDropdown,
  DataTableDropdownAction,
  DataTableDropdownDivider,
  DataTableDropdownSection,
  DataTableFooter,
  DataTableHeader,
  DataTableRow,
} from "./components";

export interface DataTableComponents {
  BulkActions: typeof DataTableBulkActions;
  Cell: typeof DataTableCell;
  Dropdown: typeof DataTableDropdown;
  DropdownAction: typeof DataTableDropdownAction;
  DropdownDivider: typeof DataTableDropdownDivider;
  DropdownSection: typeof DataTableDropdownSection;
  Footer: typeof DataTableFooter;
  Header: typeof DataTableHeader;
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
  /**
   * Props passed to the container box element.
   * @TJS-type BoxProps
   */
  containerProps?: BoxProps;
}

export type DataTableProps = DataTableProperties &
  TableProperties &
  HTMLAttributes<HTMLElement>;
