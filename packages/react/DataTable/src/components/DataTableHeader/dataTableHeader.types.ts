import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProps } from "@nimbus-ds/components";

export interface DataTableHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Checkbox element rendered on the table header that controls all rows */
  checkbox: CheckboxProps;
  /** Row content */
  children: ReactNode;
}
