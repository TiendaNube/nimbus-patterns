import React from "react";

import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";

import { MenuBodyProps } from "./menuBody.types";

const MenuBody: React.FC<MenuBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuBodyProps) => (
  <Stack {...rest} display="flex" flex="1 1 auto">
    <Box paddingX="2" paddingY="4" width="100%">
      <Stack display="flex" flexDirection="column" gap="2" flex="1">
        {children}
      </Stack>
    </Box>
  </Stack>
);

MenuBody.displayName = "Menu.Body";

export { MenuBody };
