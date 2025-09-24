import { HTMLAttributes } from "react";
import { TextareaProperties, TextareaProps } from "@nimbus-ds/components";

export type ChatInputFieldProperties = Omit<
  TextareaProperties,
  "appearance"
> & {
  /**
   * Predefined appearance values for AI states. When `"ai-generative"` is passed,
   * the field displays the Nimbus AI generative border and focus ring.
   */
  appearance?: "none" | "danger" | "warning" | "success" | "ai-generative";
};

export type ChatInputFieldBaseProps = ChatInputFieldProperties &
  Omit<TextareaProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
