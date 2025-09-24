import React from "react";
import { Box, Icon, Text } from "@nimbus-ds/components";

import { ChatInputPopoverButtonProps } from "./chatInputPopoverButton.types";

const ChatInputPopoverButton: React.FC<ChatInputPopoverButtonProps> = ({
  icon,
  text,
  onClick,
  ...rest
}) => (
  <Box
    backgroundColor={{
      xs: "transparent",
      hover: "neutral-surface",
    }}
    {...rest}
    as="button"
    type="button"
    cursor="pointer"
    borderWidth="none"
    display="flex"
    alignItems="center"
    gap="2"
    p="2"
    borderRadius="1"
    onClick={onClick}
  >
    {icon && <Icon source={icon} color="neutral-textHigh" />}
    <Text color="neutral-textHigh" fontSize="base" lineHeight="base">
      {text}
    </Text>
  </Box>
);

ChatInputPopoverButton.displayName = "ChatInput.PopoverButton";

export { ChatInputPopoverButton };
