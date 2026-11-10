import { BoxProperties } from "@nimbus-ds/components";
import { ReactNode } from "react";

export interface DataTableDropdownProperties {
  /**
   * Placeholder text displayed in the default dropdown trigger button.
   * Required unless `trigger` is provided. Ignored when `trigger` is set.
   */
  placeholder?: string;
  /**
   * Custom node to render as the dropdown trigger. When provided, replaces
   * the default trigger built from `placeholder`. Required unless
   * `placeholder` is provided.
   *
   * Must be a keyboard-accessible interactive element (e.g. `<button>`,
   * `<Link as="button">`, or `<a>`). Non-interactive nodes like `<span>`
   * or `<div>` will not receive keyboard focus and cannot open the
   * dropdown via keyboard.
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
