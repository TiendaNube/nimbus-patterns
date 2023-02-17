import React from "react";

import { Box } from "@nimbus-ds/components";

import { MenuButton } from "@nimbus-ds/menubutton";

import { MenuProps, MenuComponents } from "./menu.types";
import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

const Menu: React.FC<MenuProps> & MenuComponents = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuProps) => (
  <Box
    {...rest}
    display="flex"
    flexDirection="column"
    flex="0 0 auto"
    height="100%"
    backgroundColor="neutral.background"
    width="100%"
    boxSizing="border-box"
  >
    {children}
  </Box>
);

Menu.Section = MenuSection;
Menu.Button = MenuButton;
Menu.Header = MenuHeader;
Menu.Body = MenuBody;
Menu.Footer = MenuFooter;

Menu.displayName = "Menu";

export { Menu };
