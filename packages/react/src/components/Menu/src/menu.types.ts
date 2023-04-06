import { ReactNode, HTMLAttributes } from "react";

import { MenuButton } from "packages/react/src/components/MenuButton/src";

import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

export interface MenuComponents {
  Section: typeof MenuSection;
  Button: typeof MenuButton;
  Header: typeof MenuHeader;
  Body: typeof MenuBody;
  Footer: typeof MenuFooter;
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Content of the menu */
  children: ReactNode;
}
