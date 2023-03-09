import { ReactNode, HTMLAttributes } from "react";

export interface PageBodyProps extends HTMLAttributes<HTMLElement> {
  /** Content of the page body */
  children: ReactNode;
}
