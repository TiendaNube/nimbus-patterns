import { ReactNode, HTMLAttributes } from "react";

export interface PageBodyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}
