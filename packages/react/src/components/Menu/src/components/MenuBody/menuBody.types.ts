import { ReactNode, HTMLAttributes } from "react";

export interface MenuBodyProperties {
  /**
   * Content of the menu body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type MenuBodyProps = MenuBodyProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
