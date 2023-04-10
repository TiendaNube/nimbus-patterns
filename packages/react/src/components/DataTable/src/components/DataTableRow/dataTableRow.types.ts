import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProperties, TableRowProperties } from "@nimbus-ds/components";

export interface DataTableRowProperties {
  /**
   * Checkbox element rendered on the row that controls whether the row is selected.
   */
  checkbox: CheckboxProperties;
  /**
   * Content of the row.
   */
  children: ReactNode;
}

export type DataTableRowProps = DataTableRowProperties &
  TableRowProperties &
  HTMLAttributes<HTMLElement>;
