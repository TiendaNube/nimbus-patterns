import { HTMLAttributes, ReactNode } from "react";

export interface MenuHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Content of the menu header */
  children: ReactNode;
}
