import { ReactNode, HTMLAttributes } from "react";
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
}

export type MenuProps = MenuProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
