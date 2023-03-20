import { HTMLAttributes, ReactNode } from "react";

export interface AppShellHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Optional content for the left-hand-side slot */
  leftSlot?: ReactNode;
  /** Optional content for the right-hand-side slot */
  rightSlot?: ReactNode;
}
