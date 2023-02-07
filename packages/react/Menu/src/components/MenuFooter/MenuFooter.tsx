import React from "react";

import { ChevronRightIcon } from "@tiendanube/icons";
import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";
import { MenuButton } from "@nimbus-ds/menubutton";

import { MenuFooterProps } from "./menuFooter.types";

const MenuFooter: React.FC<MenuFooterProps> = ({
  className: _className,
  style: _style,
  ...rest
}: MenuFooterProps) => (
  <Stack display="flex" flex="0 1 auto">
    <Box paddingX="2" paddingY="4" width="100%">
      <MenuButton {...rest}>
        <ChevronRightIcon />
      </MenuButton>
    </Box>
  </Stack>
);

MenuFooter.displayName = "Menu.Footer";

export { MenuFooter };
