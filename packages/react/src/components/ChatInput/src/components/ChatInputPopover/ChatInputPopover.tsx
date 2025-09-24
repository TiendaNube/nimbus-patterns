import React from "react";
import { Box, Popover } from "@nimbus-ds/components";

import { ChatInputPopoverProps } from "./chatInputPopover.types";

const ChatInputPopover: React.FC<ChatInputPopoverProps> = ({
  content,
  children,
  contentProperties,
  ...rest
}) => (
  <Popover
    content={
      <Box
        minWidth="140px"
        {...contentProperties}
        display="flex"
        flexDirection="column"
        gap="1"
      >
        {content}
      </Box>
    }
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
