import React from "react";
import { Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";

import { MenuBodyProps } from "./menuBody.types";

const MenuBody: React.FC<MenuBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuBodyProps) => {
  const { expanded } = useMenuExpandContext();

  const collapsedProps: BoxProperties = !expanded
    ? {
        pb: "none",
        alignItems: "center",
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
      overflowX="hidden"
      boxSizing="border-box"
      {...collapsedProps}
    >
      {children}
    </Box>
  );
};

export { MenuBody };
