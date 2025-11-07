import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellChatProps } from "./AppShellChat.types";

const AppShellChat: React.FC<AppShellChatProps> = ({
  children,
  ...rest
}: AppShellChatProps) => (
  <Box
    height="100%"
    maxWidth={{
      xs: "300px",
      xl: "378px",
    }}
    minWidth="300px"
    top="0"
    flex="1"
    py="2"
    mx="2"
    zIndex="700"
    {...rest}
    position="sticky"
  >
    {children}
  </Box>
);

export { AppShellChat };
