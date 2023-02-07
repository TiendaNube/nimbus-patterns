import React from "react";

import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";

import { MenuProps, MenuComponents } from "./menu.types";
import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

import { MenuButton } from "@nimbus-ds/menubutton";

const Menu: React.FC<MenuProps> & MenuComponents = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuProps) => (
  <Stack {...rest} display="flex" flex="0 0 auto" height="100%">
    <Box backgroundColor="neutral.background" width="100%">
      <Stack display="flex" flexDirection="column" height="100%">
        {children}
      </Stack>
    </Box>
  </Stack>
);

Menu.Section = MenuSection;
Menu.Button = MenuButton;
Menu.Header = MenuHeader;
Menu.Body = MenuBody;
Menu.Footer = MenuFooter;

Menu.displayName = "Menu";

export { Menu };
