import { HTMLAttributes, ReactNode } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface ChatInputActionsProperties {
  /**
   * Content to be rendered at both sides of the actions bar.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type ChatInputActionsProps = ChatInputActionsProperties &
  Omit<BoxProperties, "children" | "display"> &
  HTMLAttributes<HTMLElement>;
