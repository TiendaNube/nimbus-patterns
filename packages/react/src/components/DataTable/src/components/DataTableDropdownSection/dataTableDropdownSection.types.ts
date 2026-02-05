import { BoxProperties } from "@nimbus-ds/components";
import { ReactNode } from "react";

export interface DataTableDropdownSectionProperties {
  /**
   * Content of the section body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type DataTableDropdownSectionProps = DataTableDropdownSectionProperties &
  Omit<
    BoxProperties,
    | "children"
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
