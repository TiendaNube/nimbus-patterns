import { HTMLAttributes, ReactNode } from "react";

export interface AppShellHeaderProps extends HTMLAttributes<HTMLElement> {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}
