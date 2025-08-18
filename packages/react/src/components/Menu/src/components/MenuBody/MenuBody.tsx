import React from "react";
import { Box, BoxProperties } from "@nimbus-ds/components";

import { MenuBodyProps } from "./menuBody.types";
import { useMenuContext } from "../../context/MenuContext";

const MenuBody: React.FC<MenuBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuBodyProps) => {
  const { collapsed } = useMenuContext();

  const collapsedProps: BoxProperties = collapsed
    ? {
        paddingX: "none",
      }
    : {};

  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      gap="2"
      paddingX="2"
      pb="4"
      width="100%"
      overflowY="auto"
      boxSizing="border-box"
      {...collapsedProps}
    >
      {children}
    </Box>
  );
};

export { MenuBody };
