import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellHeader } from "./components";

import { AppShellProps, AppShellComponents } from "./appShell.types";

const AppShell: React.FC<AppShellProps> & AppShellComponents = ({
  className: _className,
  style: _style,
  children,
  menu,
  menuProperties = {
    display: {
      xs: "none",
      md: "block",
    },
  },
  ...rest
}: AppShellProps) => (
  <Box {...rest} display="flex">
    {menu && (
      <Box
        {...menuProperties}
        width="18rem"
        height="100vh"
        position="sticky"
        top="0"
        left="0"
        borderStyle="solid"
        borderWidth="none"
        borderRightWidth="1"
        borderColor="neutral-surfaceHighlight"
      >
        {menu}
      </Box>
    )}
    <Box
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      backgroundColor="neutral-surface"
      width="100%"
    >
      {children}
    </Box>
  </Box>
);

AppShell.Header = AppShellHeader;

AppShell.displayName = "AppShell";
AppShell.Header.displayName = "AppShell.Header";

export { AppShell };
