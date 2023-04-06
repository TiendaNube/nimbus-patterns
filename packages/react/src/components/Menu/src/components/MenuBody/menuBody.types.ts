import { ReactNode, HTMLAttributes } from "react";

export interface MenuBodyProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Content of the menu body */
  children: ReactNode;
}
