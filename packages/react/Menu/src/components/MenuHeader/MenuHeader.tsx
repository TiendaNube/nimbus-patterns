import React from "react";

import { Box } from "@nimbus-ds/components";

import { MenuHeaderProps } from "./menuHeader.types";

const MenuHeader: React.FC<MenuHeaderProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuHeaderProps) => (
  <Box
    {...rest}
    boxSizing="border-box"
    display="flex"
    flex="0 1 auto"
    padding="4"
    width="100%"
  >
    {children}
  </Box>
);

MenuHeader.displayName = "Menu.Header";

export { MenuHeader };
