import { ReactNode, HTMLAttributes } from "react";

import { CheckboxProperties } from "@nimbus-ds/components";

export interface DataTableBulkActionsProperties {
  /**
   * Properties of the checkbox element rendered in the Bulk Actions component.
   */
  checkbox: Omit<CheckboxProperties, "label" | "id">;
  /**
   * Optional link element rendered next to the Bulk Actions controller.
   * @TJS-type <Link />
   */
  link?: ReactNode;
  /**
   * Action component that controls the Bulk Actions.
   * @TJS-type React.ReactNode
   */
  action: ReactNode;
  /**
   * Lable for the checkbox element.
   */
  label: string;
}

export type DataTableBulkActionsProps = DataTableBulkActionsProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
