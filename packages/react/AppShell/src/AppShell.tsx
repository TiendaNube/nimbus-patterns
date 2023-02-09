import React from "react";

import { Box } from "@nimbus-ds/box";

import { AppShellHeader } from "./components";

import { AppShellProps, AppShellComponents } from "./appShell.types";

const AppShell: React.FC<AppShellProps> & AppShellComponents = ({
  className: _className,
  style: _style,
  children,
  menu,
  ...rest
}: AppShellProps) => (
  <Box {...rest} display="flex">
    {menu}
    <Box
      display="flex"
      flex="1 1 auto"
      backgroundColor="neutral.surface"
      width="100%"
    >
      {children}
    </Box>
  </Box>
);

AppShell.Header = AppShellHeader;
AppShell.displayName = "AppShell";

export { AppShell };
