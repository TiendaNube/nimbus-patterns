import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProperties } from "@nimbus-ds/components";

export interface DataTableHeaderProperties {
  /**
   * Checkbox element rendered on the table header that controls all rows.
   */
  checkbox: CheckboxProperties;
  /**
   * Row content.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataTableHeaderProps = DataTableHeaderProperties &
  HTMLAttributes<HTMLElement>;
