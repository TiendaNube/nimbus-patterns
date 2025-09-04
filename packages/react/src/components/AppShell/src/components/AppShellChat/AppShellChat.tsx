import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellChatProps } from "./AppShellChat.types";

const AppShellChat: React.FC<AppShellChatProps> = ({
  children,
  ...rest
}: AppShellChatProps) => (
  <Box
    height="100%"
    maxWidth="360px"
    top="0"
    flex="1"
    padding="2"
    zIndex="700"
    {...rest}
    position="sticky"
  >
    {children}
  </Box>
);

export { AppShellChat };
