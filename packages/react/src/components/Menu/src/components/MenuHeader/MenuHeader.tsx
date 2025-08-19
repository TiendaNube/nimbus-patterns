import React from "react";

import { Box, BoxProperties } from "@nimbus-ds/components";

import { MenuHeaderProps } from "./menuHeader.types";
import { useMenuContext } from "../../context/MenuContext";

const MenuHeader: React.FC<MenuHeaderProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuHeaderProps) => {
  const { collapsed } = useMenuContext();

  const collapsedProps: BoxProperties = collapsed
    ? {
        justifyContent: "center",
        padding: undefined,
      }
    : {};

  return (
    <Box
      {...rest}
      boxSizing="border-box"
      display="flex"
      flex="0 1 auto"
      width="100%"
      padding="4"
      overflow="hidden"
      {...collapsedProps}
    >
      {children}
    </Box>
  );
};

export { MenuHeader };
