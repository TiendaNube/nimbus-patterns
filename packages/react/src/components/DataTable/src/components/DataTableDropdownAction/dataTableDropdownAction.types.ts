import { BoxProperties } from "@nimbus-ds/components";
import { ReactNode, MouseEvent } from "react";

export interface DataTableDropdownActionProperties {
  /**
   * Icon element to be displayed before the label.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
  /**
   * Text label for the action item.
   */
  label: string;
  /**
   * Click handler for the action.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export type DataTableDropdownActionProps = DataTableDropdownActionProperties &
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
    | "onClick"
  >;
