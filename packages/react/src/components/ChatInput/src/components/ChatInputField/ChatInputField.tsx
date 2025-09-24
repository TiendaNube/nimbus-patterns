import React, { forwardRef, useRef } from "react";

import { Textarea } from "@nimbus-ds/textarea";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";

import { ChatInputFieldBaseProps } from "./chatInputField.types";

const ChatInputField = forwardRef<HTMLTextAreaElement, ChatInputFieldBaseProps>(
  ({ appearance = "none", lines = 1, ...rest }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useRefObjectAsForwardedRef(ref, textAreaRef);

    return (
      <Textarea
        ref={textAreaRef}
        {...rest}
        lines={lines}
        maxLines={7}
        fieldSizing="content"
        appearance={
          appearance === "ai-generative" ? "ai-generative" : "transparent"
        }
      />
    );
  }
);

ChatInputField.displayName = "ChatInput.Field";

export { ChatInputField };
