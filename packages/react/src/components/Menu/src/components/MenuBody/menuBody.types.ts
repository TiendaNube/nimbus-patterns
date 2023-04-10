import { ReactNode, HTMLAttributes } from "react";

export interface MenuBodyProperties {
  /**
   * Content of the menu body.
   */
  children: ReactNode;
}

export type MenuBodyProps = MenuBodyProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
