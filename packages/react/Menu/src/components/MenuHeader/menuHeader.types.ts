import { HTMLAttributes, ReactNode } from "react";

export interface MenuHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Content of the menu header */
  children: ReactNode;
}
