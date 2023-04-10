import { HTMLAttributes, ReactNode } from "react";

export interface MenuHeaderProperties {
  /**
   * Content of the menu header.
   */
  children: ReactNode;
}

export type MenuHeaderProps = MenuHeaderProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
