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
   * Whether the menu should render in collapsed mode (icon-only).
   * Defaults to false (expanded).
   */
  collapse?: boolean;
  /**
   * Whether the menu should animate its size/appearance transitions internally.
   * Defaults to false to allow parent containers like AppShell to handle transitions.
   */
  transition?: boolean;
}

export type MenuProps = MenuProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
