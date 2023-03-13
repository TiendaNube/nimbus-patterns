import { ReactNode, HTMLAttributes } from "react";

import { MenuButton } from "@nimbus-ds/menubutton";

import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

export interface MenuComponents {
  Section: typeof MenuSection;
  Button: typeof MenuButton;
  Header: typeof MenuHeader;
  Body: typeof MenuBody;
  Footer: typeof MenuFooter;
}

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  /** Content of the menu */
  children: ReactNode;
}
