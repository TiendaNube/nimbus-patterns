import React from "react";

import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";

import { MenuHeaderProps } from "./menuHeader.types";

const MenuHeader: React.FC<MenuHeaderProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuHeaderProps) => (
  <Stack {...rest} display="flex" flex="0 1 auto">
    <Box padding="4" width="100%">
      {children}
    </Box>
  </Stack>
);

MenuHeader.displayName = "Menu.Header";

export { MenuHeader };
