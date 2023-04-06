import { ReactNode, HTMLAttributes } from "react";

export interface PageHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Main title of the page. Corresponds to an h1 HTML tag */
  title: string;
  /** Optional subtitle for the page */
  subtitle?: string;
  /** Button stack that appears on the right-hand side of the title */
  buttonStack?: ReactNode;
  /** Optional header content that appears underneath the title and button stack */
  children?: ReactNode;
}