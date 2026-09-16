import { BoxProperties } from "@nimbus-ds/components";
import { ReactNode } from "react";

export interface DataTableDropdownProperties {
  /**
   * Placeholder text displayed in the default dropdown trigger button.
   * Ignored when `trigger` is provided.
   */
  placeholder?: string;
  /**
   * Custom node to render as the dropdown trigger. When provided, replaces
   * the default trigger built from `placeholder`.
   * @TJS-type React.ReactNode
   */
  trigger?: ReactNode;
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
