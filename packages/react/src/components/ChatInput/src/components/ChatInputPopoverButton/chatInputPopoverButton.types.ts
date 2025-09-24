import { ReactNode, MouseEvent } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface ChatInputPopoverButtonProperties {
  /**
   * Icon element to be displayed before the text.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;

  /**
   * The text content of the button.
   */
  text: ReactNode;

  /**
   * Click handler for the button.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export type ChatInputPopoverButtonProps = ChatInputPopoverButtonProperties &
  Omit<
    BoxProperties,
    | "children"
    | "as"
    | "type"
    | "cursor"
    | "borderWidth"
    | "color"
    | "display"
    | "alignItems"
    | "gap"
    | "p"
    | "borderRadius"
    | "onClick"
  >;
