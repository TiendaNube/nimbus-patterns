import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProps } from "@nimbus-ds/components";

export interface DataTableBulkActionsProps extends HTMLAttributes<HTMLElement> {
  /** Properties of the checkbox element rendered in the Bulk Actions component */
  checkbox: Omit<CheckboxProps, "label" | "id">;
  /** Optional link element rendered next to the Bulk Actions controller */
  link?: ReactNode;
  /** Action component that controls the Bulk Actions */
  action: ReactNode;
  /** Lable for the checkbox element */
  label: string;
}
