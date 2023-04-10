import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProperties, TableRowProperties } from "@nimbus-ds/components";

export interface DataTableRowProperties {
  /**
   * Checkbox element rendered on the row that controls whether the row is selected.
   */
  checkbox: CheckboxProperties;
  /**
   * Content of the row.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataTableRowProps = DataTableRowProperties &
  TableRowProperties &
  HTMLAttributes<HTMLElement>;
