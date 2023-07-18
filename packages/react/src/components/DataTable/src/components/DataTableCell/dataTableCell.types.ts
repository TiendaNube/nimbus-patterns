import { HTMLAttributes, ReactNode } from "react";

import { TableCellProps } from "@nimbus-ds/components";

export interface DataTableCellProperties {
  /**
   * Content of the List component.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataTableCellProps = DataTableCellProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  TableCellProps;
