import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellBodyProps } from "./AppShellBody.types";

const AppShellBody: React.FC<AppShellBodyProps> = ({
  children,
  ...rest
}: AppShellBodyProps) => (
  <Box
    backgroundColor="neutral-surface"
    width="100%"
    gap="2"
    overflow="auto"
    height="100%"
    {...rest}
    flex="1 1 auto"
    display="flex"
  >
    {children}
  </Box>
);

export { AppShellBody };
