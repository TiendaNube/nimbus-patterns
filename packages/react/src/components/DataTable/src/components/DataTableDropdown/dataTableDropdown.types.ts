import { BoxProperties } from "@nimbus-ds/components";
import { ReactNode } from "react";

export interface DataTableDropdownProperties {
  /**
   * Placeholder text displayed in the dropdown trigger button.
   */
  placeholder: string;
  /**
   * Content to be rendered inside the dropdown popover.
   * Typically DataTable.DropdownAction and DataTable.DropdownDivider components.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataTableDropdownProps = DataTableDropdownProperties &
  Omit<
    BoxProperties,
    | "as"
    | "type"
    | "width"
    | "cursor"
    | "backgroundColor"
    | "boxShadow"
    | "borderWidth"
    | "borderStyle"
    | "borderColor"
    | "borderRadius"
    | "display"
    | "alignItems"
    | "justifyContent"
    | "gap"
    | "py"
    | "px"
  >;
