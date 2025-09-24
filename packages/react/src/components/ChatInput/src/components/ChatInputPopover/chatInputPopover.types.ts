import { ReactNode } from "react";
import { PopoverProperties } from "@nimbus-ds/components";

export interface ChatInputPopoverProperties {
  /**
   * Content to be rendered inside the popover, usually ChatInput.PopoverButton components.
   * @TJS-type React.ReactNode
   */
  content: ReactNode;

  /**
   * The trigger element that opens the popover, usually an IconButton.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type ChatInputPopoverProps = ChatInputPopoverProperties &
  Omit<
    PopoverProperties,
    "content" | "children" | "arrow" | "position" | "padding" | "color"
  >;
