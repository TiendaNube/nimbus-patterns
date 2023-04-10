import { ReactNode, HTMLAttributes } from "react";

export interface PageBodyProperties {
  /**
   * Content of the page body.
   */
  children: ReactNode;
}

export type PageBodyProps = PageBodyProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
