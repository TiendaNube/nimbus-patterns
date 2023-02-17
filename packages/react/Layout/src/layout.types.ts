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
  children: ReactNode;
  columns?: "1" | "2 - symmetric" | "2 - asymmetric" | "3";
}
