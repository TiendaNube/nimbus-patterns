import { HTMLAttributes, ReactNode } from "react";

export interface MenuSectionProps extends HTMLAttributes<HTMLElement> {
  /** Optional title of the section */
  title?: string;
  /** Content of the menu section */
  children: ReactNode;
}
