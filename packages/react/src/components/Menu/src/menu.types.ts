import { ReactNode, HTMLAttributes } from "react";
import { PopoverPlacement } from "@nimbus-ds/components";
import { MenuButton } from "@nimbus-ds/menubutton";
import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

export interface MenuComponents {
  Section: typeof MenuSection;
  Button: typeof MenuButton;
  ButtonAccordion: typeof MenuButton.Accordion;
  Header: typeof MenuHeader;
  Body: typeof MenuBody;
  Footer: typeof MenuFooter;
}

export interface MenuProperties {
  /**
   * Content of the menu.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Whether the menu should render in expanded mode.
   * If `undefined`, it follows `MenuExpandContext` value.
   * If provided, it overrides the context.
   */
  expanded?: boolean;

  /**
   * Whether to show tooltips for buttons when the menu is collapsed. Defaults to true.
   */
  showPopoversWhenCollapsed?: boolean;

  /**
   * Position of the tooltips for buttons when the menu is collapsed. Defaults to "right".
   */
  popoverPosition?: PopoverPlacement;
}

export type MenuProps = MenuProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
