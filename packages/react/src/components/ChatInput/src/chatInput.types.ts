import React, { HTMLAttributes, ReactNode } from "react";
import { BoxProperties } from "@nimbus-ds/components";

import type { ChatInputActionsProps } from "./components/ChatInputActions";
import type { ChatInputFieldBaseProps } from "./components/ChatInputField";

export interface ChatInputComponents {
  Actions: React.FC<ChatInputActionsProps>;
  Field: React.ForwardRefExoticComponent<
    ChatInputFieldBaseProps & React.RefAttributes<HTMLTextAreaElement>
  >;
}

export interface ChatInputProperties {
  /**
   * Content to be rendered inside ChatInput, usually `ChatInput.Actions` and `ChatInput.Field`.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;

  /**
   * Whether the ChatInput is focused for AI states.
   */
  aiFocused?: boolean;
}

export type ChatInputProps = ChatInputProperties &
  Omit<BoxProperties, "children" | "display"> &
  HTMLAttributes<HTMLElement>;
