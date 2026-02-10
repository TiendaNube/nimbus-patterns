import React from "react";

import { Box } from "@nimbus-ds/components";

import { ChatInputActionsProps } from "./chatInputActions.types";

const ChatInputActions: React.FC<ChatInputActionsProps> = ({
  className: _className,
  style: _style,
  children,
  justifyContent = "space-between",
  alignItems = "center",
  pb = "2",
  px = "1",
  gap,
  ...rest
}: ChatInputActionsProps) => (
  <Box
    {...rest}
    display="flex"
    alignItems={alignItems}
    justifyContent={justifyContent}
    pb={pb}
    px={px}
    gap={gap}
  >
    {children}
  </Box>
);

ChatInputActions.displayName = "ChatInput.Actions";

export { ChatInputActions };
