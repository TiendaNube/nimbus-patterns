import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellChatProps } from "./AppShellChat.types";

const AppShellChat: React.FC<AppShellChatProps> = ({
  children,
  ...rest
}: AppShellChatProps) => (
  <Box
    height="calc(100vh - 50px)"
    width=""
    position="sticky"
    maxWidth="360px"
    top="50px"
    flex="1"
    {...rest}
  >
    {children}
  </Box>
);

export { AppShellChat };
