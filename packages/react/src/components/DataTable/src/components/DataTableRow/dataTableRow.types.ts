import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProps, TableRowProps } from "@nimbus-ds/components";

type DataTableRowExtends = TableRowProps & HTMLAttributes<HTMLElement>;

export interface DataTableRowProps extends DataTableRowExtends {
  /** Checkbox element rendered on the row that controls whether the row is selected */
  checkbox: CheckboxProps;
  /** Content of the row */
  children: ReactNode;
}
