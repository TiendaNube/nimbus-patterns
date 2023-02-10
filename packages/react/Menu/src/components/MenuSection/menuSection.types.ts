import { HTMLAttributes, ReactNode } from "react";

export interface MenuSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children: ReactNode;
}
