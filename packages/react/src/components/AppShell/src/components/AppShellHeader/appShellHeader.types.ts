import { HTMLAttributes, ReactNode } from "react";

export interface AppShellHeaderProperties {
  /**
   * Optional content for the left-hand-side slot.
   */
  leftSlot?: ReactNode;
  /**
   * Optional content for the right-hand-side slot.
   */
  rightSlot?: ReactNode;
}

export type AppShellHeaderProps = AppShellHeaderProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
