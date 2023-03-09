import { HTMLAttributes, ReactNode } from "react";

import { BoxProps } from "@nimbus-ds/components";

import { LayoutSection } from "./components";

type Extend = Omit<
  BoxProps,
  "children" | "boxSizing" | "display" | "gridTemplateColumns"
> &
  HTMLAttributes<HTMLElement>;

export interface LayoutComponents {
  Section: typeof LayoutSection;
}

export interface LayoutProps extends Extend {
  /** Content to be rendered inside the layout. */
  children: ReactNode;
  /** Number of columns to be rendered for the children */
  columns?: "1" | "2 - symmetric" | "2 - asymmetric" | "3";
}
