import React from "react";

import { Box } from "@nimbus-ds/components";

import { ChatInputProps, ChatInputComponents } from "./chatInput.types";
import { ChatInputActions, ChatInputField } from "./components";

const ChatInput: React.FC<ChatInputProps> & ChatInputComponents = ({
  className: _className,
  style: _style,
  children,
  aiFocused,
  ...rest
}: ChatInputProps) => (
  <Box
    borderColor="transparent"
    background="ai-generative-interactive-border"
    borderWidth="1"
    borderStyle="solid"
    borderRadius="2"
    {...(aiFocused && { boxShadow: "aiFocus" })}
    padding="1"
    {...rest}
    display="flex"
    flexDirection="column"
  >
    {children}
  </Box>
);

ChatInput.Actions = ChatInputActions;
ChatInput.Field = ChatInputField;

ChatInput.displayName = "ChatInput";
ChatInput.Actions.displayName = "ChatInput.Actions";
ChatInput.Field.displayName = "ChatInput.Field";

export { ChatInput };
