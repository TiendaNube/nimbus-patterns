import { ReactNode, HTMLAttributes } from "react";

export interface MenuBodyProps extends HTMLAttributes<HTMLElement> {
  /** Content of the menu body */
  children: ReactNode;
}
