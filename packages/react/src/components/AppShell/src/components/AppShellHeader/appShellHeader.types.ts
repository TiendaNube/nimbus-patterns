import { HTMLAttributes, ReactNode } from "react";

import { BoxProperties } from "@nimbus-ds/components";

export interface AppShellHeaderProperties {
  /**
   * Optional content for the left-hand-side slot.
   * @TJS-type React.ReactNode
   */
  leftSlot?: ReactNode;
  /**
   * Optional content for the right-hand-side slot.
   * @TJS-type React.ReactNode
   */
  rightSlot?: ReactNode;
}

export type AppShellHeaderProps = AppShellHeaderProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProperties, "display" | "justifyContent" | "position" | "top">;
