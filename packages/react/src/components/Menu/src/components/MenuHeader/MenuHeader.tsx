import React from "react";

import { Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";

import { MenuHeaderProps } from "./menuHeader.types";

const MenuHeader: React.FC<MenuHeaderProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest 
}: MenuHeaderProps) => {
  const { expanded } = useMenuExpandContext();

  const collapsedProps: BoxProperties = !expanded
    ? {
        justifyContent: "center",
        paddingX: "none"
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
