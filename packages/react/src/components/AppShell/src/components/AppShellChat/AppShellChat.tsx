import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellChatProps } from "./AppShellChat.types";

const AppShellChat: React.FC<AppShellChatProps> = ({
  children,
  ...rest
}: AppShellChatProps) => (
  <Box
    height="100%"
    position="sticky"
    maxWidth="360px"
    top="0"
    flex="1"
    padding="2"
    {...rest}
  >
    {children}
  </Box>
);

export { AppShellChat };
