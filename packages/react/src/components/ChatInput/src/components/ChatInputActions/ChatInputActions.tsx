import React from "react";

import { Box } from "@nimbus-ds/components";

import { ChatInputActionsProps } from "./chatInputActions.types";

/**
 * Actions bar for ChatInput. Renders a flex container for action buttons
 * (e.g. attachments, send) with configurable layout props.
 *
 * @param justifyContent - Horizontal alignment of actions (default: "space-between")
 * @param alignItems - Vertical alignment of actions (default: "center")
 * @param pb - Bottom padding (default: "2")
 * @param px - Horizontal padding (default: "1")
 * @param gap - Gap between action items
 */
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
