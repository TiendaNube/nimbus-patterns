import React from "react";

import { Box } from "@nimbus-ds/components";

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
    {menu && (
      <Box
        width="18rem"
        height="100vh"
        position="sticky"
        top="0"
        left="0"
        borderStyle="solid"
        borderWidth="0 1px 0 0"
        borderColor="neutral-surfaceHighlight"
        display={{
          xs: "none",
          md: "block",
        }}
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
