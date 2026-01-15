import React, { HTMLAttributes, ReactNode } from "react";
import { BoxProperties } from "@nimbus-ds/components";

import type { ChatInputActionsProps } from "./components/ChatInputActions";
import type { ChatInputFieldBaseProps } from "./components/ChatInputField";
import type { ChatInputPopoverProps } from "./components/ChatInputPopover";
import type { ChatInputPopoverButtonProps } from "./components/ChatInputPopoverButton";

export interface ChatInputComponents {
  /**
   * ChatInput Actions is a container for the actions, like send button and recording button.
   */
  Actions: React.FC<ChatInputActionsProps>;
  /**
   * ChatInput Field textarea component.
   */
  Field: React.ForwardRefExoticComponent<
    Omit<ChatInputFieldBaseProps, "ref"> &
      React.RefAttributes<HTMLTextAreaElement>
  >;
  /**
   * ChatInput Popover provides pre-configured popover settings for upload actions.
   */
  Popover: React.FC<ChatInputPopoverProps>;
  /**
   * ChatInput PopoverButton is a pre-styled button for popover menu items.
   */
  PopoverButton: React.FC<ChatInputPopoverButtonProps>;
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
