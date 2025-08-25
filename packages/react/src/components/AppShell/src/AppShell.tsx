import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellHeader } from "./components";

import { AppShellProps, AppShellComponents } from "./appShell.types";
import { defaultDismissExemptAttribute } from "./AppShell.definitions";

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
  right,
  rightProperties = {
    display: {
      xs: "none",
      md: "block",
    },
  },
  rightDismissGuard = false,
  dismissExemptAttribute = defaultDismissExemptAttribute,
  centerChildrenRef,
  ...rest
}: AppShellProps) => {
  return (
    <Box {...rest} display="flex">
      <Box
        position="relative"
        width="100%"
        display="flex"
        ref={centerChildrenRef}
      >
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
            borderColor="neutral-surfaceDisabled"
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
          position="relative"
          ref={centerChildrenRef}
        >
          {children}
        </Box>
      </Box>
      {right && (
        <Box
          {...rightProperties}
          width="18rem"
          height="100vh"
          position="sticky"
          top="0"
          right="0"
          borderStyle="solid"
          borderWidth="none"
          borderLeftWidth="1"
          borderColor="neutral-surfaceDisabled"
          {...(rightDismissGuard && {
            [dismissExemptAttribute]: true,
          })}
        >
          {right}
        </Box>
      )}
    </Box>
  );
};

AppShell.Header = AppShellHeader;

AppShell.displayName = "AppShell";
AppShell.Header.displayName = "AppShell.Header";

export { AppShell };
