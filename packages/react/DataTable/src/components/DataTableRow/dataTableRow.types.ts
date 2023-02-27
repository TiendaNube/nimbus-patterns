import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProps } from "@nimbus-ds/checkbox";
import { TableRowProps } from "@nimbus-ds/table";

type DataTableRowExtends = TableRowProps & HTMLAttributes<HTMLElement>

export interface DataTableRowProps extends DataTableRowExtends {
  /** Checkbox element rendered on the row that controls whether the row is selected */
  checkbox: CheckboxProps;
  /** Content of the row */
  children: ReactNode;
}
