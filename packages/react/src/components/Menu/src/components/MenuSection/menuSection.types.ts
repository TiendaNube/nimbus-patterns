import { HTMLAttributes, ReactNode } from "react";

export interface MenuSectionProperties {
  /**
   * Optional title of the section.
   */
  title?: string;
  /**
   * Content of the menu section.
   */
  children: ReactNode;
}

export type MenuSectionProps = MenuSectionProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
