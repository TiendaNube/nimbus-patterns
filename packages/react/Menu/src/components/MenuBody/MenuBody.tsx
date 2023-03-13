import React from "react";

import { Box } from "@nimbus-ds/components";

import { MenuBodyProps } from "./menuBody.types";

const MenuBody: React.FC<MenuBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuBodyProps) => (
  <Box
    {...rest}
    display="flex"
    flexDirection="column"
    flex="1 1 auto"
    gap="2"
    paddingX="2"
    paddingY="4"
    width="100%"
    overflowY="auto"
    boxSizing="border-box"
  >
    {children}
  </Box>
);

export { MenuBody };
