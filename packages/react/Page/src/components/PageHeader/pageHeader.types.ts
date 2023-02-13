import { ReactNode, HTMLAttributes } from "react";

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  buttonStack?: ReactNode;
  children?: ReactNode;
}
