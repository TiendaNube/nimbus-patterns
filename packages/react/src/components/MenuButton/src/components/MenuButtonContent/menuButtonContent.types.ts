import { MenuButtonBaseProps } from "../../menuButton.types";

export interface MenuButtonContentProperties {
  /**
   * The HTML element or component type to render as.
   */
  as?: "button" | "a";
  /**
   * Color to apply when the button is disabled.
   */
  disabledColor:
    | "primary-interactive"
    | "neutral-textHigh"
    | "neutral-textDisabled";
  /**
   * Controls the expanded state of the menu button content.
   */
  expanded: boolean;
}

export type MenuButtonContentProps = MenuButtonContentProperties &
  Omit<MenuButtonBaseProps, "expanded" | "showPopoversWhenCollapsed">;
