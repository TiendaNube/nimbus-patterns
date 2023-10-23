import { HTMLAttributes, ReactNode } from "react";

export interface ToolbarProperties {
  /**
   * The content of the alert.
   * @TJS-type React.ReactNode
   */
  children: ReactNode | ReactNode[];
}

export type ToolbarProps = ToolbarProperties & HTMLAttributes<HTMLElement>;
