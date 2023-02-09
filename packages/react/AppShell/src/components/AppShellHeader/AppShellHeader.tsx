import React from "react";

import { Box } from "@nimbus-ds/box";

import { AppShellHeaderProps } from "./AppShellHeader.types";

const AppShellHeader: React.FC<AppShellHeaderProps> = ({
  className: _className,
  style: _style,
  leftSlot,
  rightSlot,
  ...rest
}: AppShellHeaderProps) => (
  <Box
    {...rest}
    paddingX="2"
    paddingY="4"
    display="flex"
    justifyContent="space-between"
    gap="2"
  >
    {leftSlot}
    {rightSlot && (
      <Box display="flex" gap="1">
        {rightSlot}
      </Box>
    )}
  </Box>
);

AppShellHeader.displayName = "AppShell.Header";

export { AppShellHeader };
