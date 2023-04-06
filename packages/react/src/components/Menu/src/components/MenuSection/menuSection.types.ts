import { HTMLAttributes, ReactNode } from "react";

export interface MenuSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Optional title of the section */
  title?: string;
  /** Content of the menu section */
  children: ReactNode;
}
