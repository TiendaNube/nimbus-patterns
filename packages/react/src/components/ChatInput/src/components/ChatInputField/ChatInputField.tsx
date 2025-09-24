import React, { forwardRef, useRef } from "react";
import { Textarea } from "@nimbus-ds/components";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";

import { ChatInputFieldBaseProps } from "./chatInputField.types";

const ChatInputField = forwardRef<HTMLTextAreaElement, ChatInputFieldBaseProps>(
  ({ lines = 1, maxLines = 7, ...rest }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useRefObjectAsForwardedRef(ref, textAreaRef);

    return (
      <Textarea
        ref={textAreaRef}
        {...rest}
        lines={lines}
        maxLines={maxLines}
        autoGrow
        resize={false}
        appearance="transparent"
      />
    );
  }
);

ChatInputField.displayName = "ChatInput.Field";

export { ChatInputField };
