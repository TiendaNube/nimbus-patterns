import { ReactNode, HTMLAttributes } from "react";

export interface PageBodyProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Content of the page body */
  children: ReactNode;
}
