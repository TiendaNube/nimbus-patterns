import React from "react";
import { Popover } from "@nimbus-ds/components";

import { ChatInputPopoverProps } from "./chatInputPopover.types";

const ChatInputPopover: React.FC<ChatInputPopoverProps> = ({
  content,
  children,
  ...rest
}) => (
  <Popover
    content={content}
    arrow={false}
    position="top-start"
    padding="small"
    {...rest}
  >
    {children}
  </Popover>
);

ChatInputPopover.displayName = "ChatInput.Popover";

export { ChatInputPopover };
