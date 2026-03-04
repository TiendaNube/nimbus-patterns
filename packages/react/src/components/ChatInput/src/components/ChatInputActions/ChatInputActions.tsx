import React from "react";

import { Box } from "@nimbus-ds/components";

import { ChatInputActionsProps } from "./chatInputActions.types";

const ChatInputActions: React.FC<ChatInputActionsProps> = ({
  style: _style,
  children,
  ...rest
}: ChatInputActionsProps) => (
  <Box
    {...rest}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    {children}
  </Box>
);

ChatInputActions.displayName = "ChatInput.Actions";

export { ChatInputActions };
